import type { Card, CardInput, Filters } from './types';

const BASE = '/api';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`API error ${res.status}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function fetchCards(filters: Partial<Filters> = {}): Promise<Card[]> {
  const params = new URLSearchParams();
  if (filters.search)      params.set('search', filters.search);
  if (filters.techStack)   params.set('techStack', filters.techStack);
  if (filters.technical)   params.set('technical', 'true');
  if (filters.behavioural) params.set('behavioural', 'true');
  if (filters.foundation)  params.set('foundation', 'true');
  if (filters.advanced)    params.set('advanced', 'true');
  if (filters.starred)     params.set('starred', 'true');
  return json(await fetch(`${BASE}/cards?${params}`));
}

export async function fetchTechStacks(): Promise<string[]> {
  return json(await fetch(`${BASE}/cards/techstacks`));
}

export async function createCard(card: CardInput): Promise<Card> {
  return json(await fetch(`${BASE}/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  }));
}

export async function updateCard(card: Card): Promise<Card> {
  return json(await fetch(`${BASE}/cards/${card.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  }));
}

export async function setCardStarred(id: number, starred: boolean): Promise<Card> {
  return json(await fetch(`${BASE}/cards/${id}/star`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ starred }),
  }));
}

export async function deleteCard(id: number): Promise<void> {
  return json(await fetch(`${BASE}/cards/${id}`, { method: 'DELETE' }));
}
