import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';

interface ChatbotProps {
  systemInstruction: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ systemInstruction }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        },
      });
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error);
      setMessages([{ role: 'model', text: 'Error: Could not initialize AI. Please check your API key.' }]);
    }
  }, [systemInstruction]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: input });
      const modelMessage: ChatMessage = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="chat-message model">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Ask a question..."
          aria-label="Chat input"
          disabled={isLoading}
        />
        <button type="submit" className="chat-submit-button" disabled={isLoading}>
          Send
        </button>
      </form>
    </>
  );
};

export default Chatbot;
