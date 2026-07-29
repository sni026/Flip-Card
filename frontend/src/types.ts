export interface Card {
  id: number;
  question: string;
  answer: string;
  behavioural: boolean;
  foundation: boolean;
  scenario: boolean;
  starred: boolean;
  techStack: string;
}

export type CardInput = Omit<Card, 'id'>;

export interface Filters {
  search: string;
  techStack: string;
  behavioural: boolean;
  foundation: boolean;
  scenario: boolean;
  advanced: boolean;
  starred: boolean;
}
