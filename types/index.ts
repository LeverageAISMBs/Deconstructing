export interface CardData {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
