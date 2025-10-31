import React from 'react';

interface TextDisplayProps {
  content: {
    title: string;
    content: string;
  };
}

const TextDisplay: React.FC<TextDisplayProps> = ({ content }) => {
  return (
    <section className="text-display">
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </section>
  );
};

export default TextDisplay;
