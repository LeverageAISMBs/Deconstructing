import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

type LiveSession = Awaited<ReturnType<InstanceType<typeof GoogleGenAI>['live']['connect']>>;

interface VoiceAssistantProps {
  systemInstruction: string;
}

// Helper functions for audio encoding/decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ systemInstruction }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Click to start conversation');
  const [transcriptionHistory, setTranscriptionHistory] = useState<string[]>([]);
  const [liveTranscript, setLiveTranscript] = useState('');
  
  const sessionRef = useRef<LiveSession | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  const currentInputRef = useRef('');
  const currentOutputRef = useRef('');

  const stopConversation = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if(mediaStreamSourceRef.current) {
        mediaStreamSourceRef.current.disconnect();
        mediaStreamSourceRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsRecording(false);
    setStatus('Click to start conversation');
    setTranscriptionHistory([]);
    setLiveTranscript('');
    currentInputRef.current = '';
    currentOutputRef.current = '';
  }, []);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcriptionHistory, liveTranscript]);

  const startConversation = async () => {
    if (isRecording) {
      stopConversation();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = inputAudioContext;

      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      let nextStartTime = 0;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('Connection open. Start speaking.');
            const source = inputAudioContext.createMediaStreamSource(stream);
            mediaStreamSourceRef.current = source;
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            let liveText = '';
            if (message.serverContent?.inputTranscription) {
              currentInputRef.current += message.serverContent.inputTranscription.text;
              liveText = `You: ${currentInputRef.current}`;
            }
            if (message.serverContent?.outputTranscription) {
              // Reset input ref when model starts talking
              if(currentInputRef.current){
                const finalInput = `You: ${currentInputRef.current.trim()}`;
                setTranscriptionHistory(prev => [...prev, finalInput]);
                currentInputRef.current = '';
              }
              currentOutputRef.current += message.serverContent.outputTranscription.text;
              liveText = `AI: ${currentOutputRef.current}`;
            }
        
            if (liveText) {
              setLiveTranscript(liveText);
            }
        
            if (message.serverContent?.turnComplete) {
              const finalOutput = `AI: ${currentOutputRef.current.trim()}`;
              if (currentOutputRef.current.trim()) {
                setTranscriptionHistory(prev => [...prev, finalOutput]);
              }
              currentOutputRef.current = '';
              setLiveTranscript('');
            }
            
            // FIX: Safely access audio data to prevent the error.
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64EncodedAudioString) {
              nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputAudioContext,
                24000,
                1,
              );
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.start(nextStartTime);
              nextStartTime += audioBuffer.duration;
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live API Error:', e);
            setStatus('An error occurred.');
            stopConversation();
          },
          onclose: (e: CloseEvent) => {
            setStatus('Connection closed.');
            stopConversation();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
      });

      sessionRef.current = await sessionPromise;
      setIsRecording(true);
      setStatus('Listening...');

    } catch (err) {
      console.error('Error starting voice assistant:', err);
      setStatus('Could not start. Check permissions.');
    }
  };

  return (
    <div className="voice-assistant-controls">
      <button
        onClick={startConversation}
        className={`voice-assistant-button ${isRecording ? 'recording' : ''}`}
      >
        {isRecording ? 'Stop Conversation' : 'Start Conversation'}
      </button>
      <div className="voice-assistant-status">{status}</div>
      <div className="voice-assistant-transcription" ref={transcriptContainerRef}>
        <div className="transcription-history">
          {transcriptionHistory.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        {liveTranscript && (
          <p className="transcription-live">{liveTranscript}</p>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
