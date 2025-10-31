import React from 'react';
import Chatbot from './Chatbot';
import VoiceAssistant from './VoiceAssistant';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  systemInstruction: string;
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ isOpen, onClose, systemInstruction }) => {
  return (
    <div className={`ai-assistant-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="ai-panel-header">
        <h3>AI Assistant</h3>
        <button className="ai-panel-close-button" onClick={onClose} aria-label="Close AI assistant">&times;</button>
      </div>
      <div className="ai-panel-content">
        <Chatbot systemInstruction={systemInstruction} />
        <VoiceAssistant systemInstruction={systemInstruction} />
      </div>
    </div>
  );
};

export default AIAssistantPanel;
