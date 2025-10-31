import React from 'react';
import type { CardData } from '../types';

interface CardProps {
  card: CardData;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <h3>{card.title}</h3>
      <p>{card.summary}</p>
    </div>
  );
};

export default Card;
