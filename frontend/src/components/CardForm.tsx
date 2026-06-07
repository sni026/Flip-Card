import { useEffect, useState } from 'react';
import type { Card, CardInput } from '../types';

interface Props {
  initial?: Card;
  onSave: (data: CardInput & { id?: number }) => void;
  onCancel: () => void;
}

const empty: CardInput = { question: '', answer: '', technical: false, behavioural: false, foundation: false, starred: false, techStack: '' };

export default function CardForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<CardInput>(initial ?? empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CardInput, string>>>({});

  useEffect(() => { setForm(initial ?? empty); }, [initial]);

  const set = (patch: Partial<CardInput>) => setForm(f => ({ ...f, ...patch }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.question.trim()) e.question = 'Question is required.';
    if (!form.answer.trim())   e.answer   = 'Answer is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(initial ? { ...form, id: initial.id } : form);
  };

  return (
    <div className="fc-modal-overlay" onClick={onCancel}>
      <div className="fc-modal" onClick={e => e.stopPropagation()}>
        <h2 className="fc-modal-title">{initial ? 'Edit Card' : 'Add Card'}</h2>
        <form className="fc-form" onSubmit={submit}>
          <div className="form-group">
            <label>Question</label>
            <textarea
              className="fc-textarea"
              rows={3}
              value={form.question}
              onChange={e => set({ question: e.target.value })}
              placeholder="Enter the question..."
            />
            {errors.question && <span className="fc-field-error">{errors.question}</span>}
          </div>

          <div className="form-group">
            <label>Answer</label>
            <textarea
              className="fc-textarea"
              rows={5}
              value={form.answer}
              onChange={e => set({ answer: e.target.value })}
              placeholder="Enter the answer..."
            />
            {errors.answer && <span className="fc-field-error">{errors.answer}</span>}
          </div>

          <div className="form-group">
            <label>Tech Stack</label>
            <input
              className="fc-input"
              value={form.techStack}
              onChange={e => set({ techStack: e.target.value })}
              placeholder="e.g. C#, React, SQL..."
            />
          </div>

          <div className="form-group form-group-inline">
            <label className="fc-checkbox-label">
              <input type="checkbox" checked={form.technical} onChange={e => set({ technical: e.target.checked })} />
              <span>Technical</span>
            </label>
            <label className="fc-checkbox-label">
              <input type="checkbox" checked={form.behavioural} onChange={e => set({ behavioural: e.target.checked })} />
              <span>Behavioural</span>
            </label>
            <label className="fc-checkbox-label">
              <input type="checkbox" checked={form.foundation} onChange={e => set({ foundation: e.target.checked })} />
              <span>Foundation</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Card</button>
            <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
