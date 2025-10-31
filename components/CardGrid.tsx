import React from 'react';
import Card from './Card';
import type { CardData } from '../types';

interface CardGridProps {
  cards: CardData[];
  onCardClick: (card: CardData) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="card-grid">
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card)} />
      ))}
    </div>
  );
};

export default CardGrid;
