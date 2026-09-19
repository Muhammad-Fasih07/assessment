'use client';

type Props = {
  people: { _id: string; name: string }[];
  personId: string | null;
  onChange: (id: string) => void;
};

export function PersonPicker({ people, personId, onChange }: Props) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: 'var(--muted)' }}>as</span>
      <select
        value={personId ?? ''}
        disabled={people.length === 0}
        onChange={(e) => onChange(e.target.value)}
        style={{
          border: '1px solid var(--line)',
          background: '#fff',
          padding: '4px 8px',
        }}
      >
        <option value="" disabled>
          choose person
        </option>
        {people.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
    </label>
  );
}
