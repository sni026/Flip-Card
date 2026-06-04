export interface Card {
  id: number;
  question: string;
  answer: string;
  technical: boolean;
  behavioural: boolean;
  techStack: string;
}

export type CardInput = Omit<Card, 'id'>;

export interface Filters {
  search: string;
  techStack: string;
  technical: boolean;
  behavioural: boolean;
}
