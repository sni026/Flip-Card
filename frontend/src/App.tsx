import { useCallback, useEffect, useMemo, useState } from 'react';
import { createCard, deleteCard, fetchCards, fetchTechStacks, updateCard } from './api';
import CardForm from './components/CardForm';
import FilterBar from './components/FilterBar';
import FlipCard from './components/FlipCard';
import type { Card, CardInput, Filters } from './types';

const defaultFilters: Filters = { search: '', techStack: '', technical: false, behavioural: false };

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [editing, setEditing] = useState<Card | null | 'new'>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [data, stacks] = await Promise.all([fetchCards(filters), fetchTechStacks()]);
      setCards(data);
      setOrder(data.map(c => c.id));
      setTechStacks(stacks);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const displayed = useMemo(
    () => order.map(id => cards.find(c => c.id === id)).filter(Boolean) as Card[],
    [cards, order]
  );

  const shuffle = () => {
    setOrder(o => {
      const arr = [...o];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  const handleSave = async (data: CardInput & { id?: number }) => {
    if (data.id !== undefined) {
      const updated = await updateCard(data as Card);
      setCards(cs => cs.map(c => c.id === updated.id ? updated : c));
    } else {
      const created = await createCard(data);
      setCards(cs => [...cs, created]);
      setOrder(o => [...o, created.id]);
      setTechStacks(ts =>
        created.techStack && !ts.includes(created.techStack)
          ? [...ts, created.techStack].sort()
          : ts
      );
    }
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deleteCard(id);
    setCards(cs => cs.filter(c => c.id !== id));
    setOrder(o => o.filter(x => x !== id));
  };

  return (
    <>
      <nav className="fc-nav">
        <span className="fc-nav-brand">&#x1F0A0; How hard can it be</span>
      </nav>

      <main className="fc-main">
        <div className="fc-header">
          <h1 className="fc-title">Flip Cards</h1>
          <button className="btn-primary" onClick={() => setEditing('new')}>+ Add Card</button>
        </div>

        <FilterBar
          filters={filters}
          techStacks={techStacks}
          onChange={setFilters}
          onShuffle={shuffle}
        />

        {loading ? (
          <p className="fc-empty">Loading...</p>
        ) : displayed.length === 0 ? (
          <p className="fc-empty">No cards found.</p>
        ) : (
          <>
            <p className="fc-count">{displayed.length} card(s) — click a card to flip it</p>
            <div className="fc-grid">
              {displayed.map(card => (
                <FlipCard
                  key={card.id}
                  card={card}
                  onEdit={c => setEditing(c)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="fc-footer">&copy; 2026 Flip Cards</footer>

      {editing !== null && (
        <CardForm
          initial={editing === 'new' ? undefined : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}
