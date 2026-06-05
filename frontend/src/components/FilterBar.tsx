import { type Filters } from '../types';

interface Props {
  filters: Filters;
  techStacks: string[];
  onChange: (f: Filters) => void;
  onShuffle: () => void;
}

export default function FilterBar({ filters, techStacks, onChange, onShuffle }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <form className="fc-filters" onSubmit={e => e.preventDefault()}>
      <input
        className="fc-search"
        type="text"
        placeholder="Search questions or answers..."
        value={filters.search}
        onChange={e => set({ search: e.target.value })}
      />

      <select
        className="fc-select"
        value={filters.techStack}
        onChange={e => set({ techStack: e.target.value })}
      >
        <option value="">All Tech Stacks</option>
        {techStacks.map(ts => (
          <option key={ts} value={ts}>{ts}</option>
        ))}
      </select>

      <label className="fc-checkbox-label">
        <input
          type="checkbox"
          checked={filters.technical}
          onChange={e => set({ technical: e.target.checked })}
        />
        Technical
      </label>

      <label className="fc-checkbox-label">
        <input
          type="checkbox"
          checked={filters.behavioural}
          onChange={e => set({ behavioural: e.target.checked })}
        />
        Behavioural
      </label>

      <span className="fc-divider" />
      <button
        type="button"
        className="btn-ghost"
        onClick={() => onChange({ search: '', techStack: '', technical: false, behavioural: false })}
      >
        Clear
      </button>
      <button type="button" className="btn-ghost" onClick={onShuffle}>
        Shuffle
      </button>
    </form>
  );
}
