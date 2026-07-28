export interface Card {
  id: number;
  question: string;
  answer: string;
  behavioural: boolean;
  foundation: boolean;
  starred: boolean;
  techStack: string;
}

export type CardInput = Omit<Card, 'id'>;

export interface Filters {
  search: string;
  techStack: string;
  behavioural: boolean;
  foundation: boolean;
  advanced: boolean;
  starred: boolean;
}
