import type { Card } from '../types';

interface Props {
  cards: Card[];
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
}

function Tags({ card }: { card: Card }) {
  return (
    <div className="fc-list-tags">
      {card.behavioural && <span className="tag tag-behavioural">Behavioural</span>}
      {card.foundation && <span className="tag tag-foundation">Foundation</span>}
      {card.scenario && <span className="tag tag-scenario">Scenario</span>}
      {card.techStack && <span className="tag tag-stack">{card.techStack}</span>}
    </div>
  );
}

export default function CardList({ cards, onEdit, onDelete }: Props) {
  return (
    <div className="fc-list" role="list">
      <div className="fc-list-header" aria-hidden="true">
        <span>Question</span>
        <span>Answer</span>
        <span>Tags</span>
        <span>Actions</span>
      </div>
      {cards.map(card => (
        <div className="fc-list-row" role="listitem" key={card.id}>
          <div className="fc-list-question">
            <span className="fc-list-label">Question</span>
            <strong>{card.question}</strong>
          </div>
          <div className="fc-list-answer">
            <span className="fc-list-label">Answer</span>
            <span>{card.answer}</span>
          </div>
          <div className="fc-list-tag-cell">
            <span className="fc-list-label">Tags</span>
            <Tags card={card} />
          </div>
          <div className="fc-list-actions">
            <button type="button" className="btn-secondary fc-list-edit" onClick={() => onEdit(card)}>
              Edit
            </button>
            <button type="button" className="btn-ghost fc-list-delete" onClick={() => onDelete(card.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
