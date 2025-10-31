import React, { useEffect } from 'react';
import type { CardData } from '../types';

interface ModalProps {
  card: CardData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">&times;</button>
        <h2>{card.title}</h2>
        <p>{card.fullContent}</p>
      </div>
    </div>
  );
};

export default Modal;
