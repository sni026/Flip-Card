import { useState } from 'react';
import type { Card } from '../types';
import CardMenu from './CardMenu';

interface Props {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
}

export default function FlipCard({ card, onEdit, onDelete }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`fc-card${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="fc-face fc-front">
        <div className="fc-tags">
          {card.technical  && <span className="tag tag-technical">Technical</span>}
          {card.behavioural && <span className="tag tag-behavioural">Behavioural</span>}
          {card.foundation   && <span className="tag tag-foundation">Foundation</span>}
          {card.techStack   && <span className="tag tag-stack">{card.techStack}</span>}
          <CardMenu card={card} onEdit={onEdit} onDelete={onDelete} />
        </div>
        <div className="fc-question" style={{ whiteSpace: 'pre-wrap' }}>{card.question}</div>
        <div className="fc-hint">Tap to reveal answer</div>
      </div>
      <div className="fc-face fc-back">
        <div className="fc-answer" style={{ whiteSpace: 'pre-wrap' }} onClick={e => e.stopPropagation()}>{card.answer}</div>
        <div className="fc-hint">Tap to see question</div>
      </div>
    </div>
  );
}
