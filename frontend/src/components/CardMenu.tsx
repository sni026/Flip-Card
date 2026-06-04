import { useEffect, useRef, useState } from 'react';
import type { Card } from '../types';

interface Props {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
}

export default function CardMenu({ card, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div
      className="fc-menu"
      ref={ref}
      onClick={e => e.stopPropagation()}
    >
      <button
        className="fc-menu-btn"
        aria-label="Card actions"
        onClick={() => setOpen(o => !o)}
      >
        &#8943;
      </button>
      {open && (
        <div className="fc-dropdown open">
          <button
            className="fc-dropdown-item"
            onClick={() => { setOpen(false); onEdit(card); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          <button
            className="fc-dropdown-item fc-dropdown-danger"
            onClick={() => { setOpen(false); onDelete(card.id); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
