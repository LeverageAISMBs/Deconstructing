import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CardGrid from './components/CardGrid';
import Modal from './components/Modal';
import AIAssistantPanel from './components/AIAssistantPanel';
import TextDisplay from './components/TextDisplay';
import FullReport from './components/FullReport';
import { mockCardData, mockReportExcerpt, mockSystemInstruction, mockFullReport } from './mockData';
import type { CardData } from './types';

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const toggleAiPanel = () => {
    setIsAiPanelOpen(prev => !prev);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <h1 className="main-title">Deconstructing Complex Systems</h1>
        <p className="main-subtitle">An Interactive Exploration of Key Leverage Points</p>
        <CardGrid cards={mockCardData} onCardClick={handleCardClick} />
        <TextDisplay content={mockReportExcerpt} />
        <FullReport report={mockFullReport} />
      </main>
      <Footer />
      {selectedCard && <Modal card={selectedCard} onClose={closeModal} />}
      <AIAssistantPanel 
        isOpen={isAiPanelOpen} 
        onClose={toggleAiPanel} 
        systemInstruction={mockSystemInstruction}
      />
      <button 
        className="ai-toggle-button" 
        onClick={toggleAiPanel}
        aria-label={isAiPanelOpen ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={isAiPanelOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 1-9.5 9.5c-.2.2-.3.4-.3.7v9.8c0 .5.5 1 1 1h4c.3 0 .5-.1.7-.3l9.5-9.5c.2-.2.3-.4.3-.7V2c0-.5-.5-1-1-1h-4c-.3 0-.5.1-.7.3Z"/><path d="m12 1-9.5 9.5c-.2.2-.3.4-.3.7v9.8c0 .5.5 1 1 1h4c.3 0 .5-.1.7-.3l9.5-9.5c.2-.2.3-.4.3-.7V2c0-.5-.5-1-1-1h-4c-.3 0-.5.1-.7.3Z"/><path d="M16 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/><path d="m21.5 2.5-1 1"/></svg>
      </button>
    </div>
  );
};

export default App;