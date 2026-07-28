/** Renders one packages/tokens/src/spacing.ts step — bar width = the value itself. */
export function SpacingSample({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div
        style={{
          width: 32,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-neutral-600)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          height: 16,
          width: value,
          backgroundColor: 'var(--color-brand-300)',
          borderRadius: 'var(--radius-sm)',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-neutral-600)',
        }}
      >
        {value}
      </div>
    </div>
  )
}
