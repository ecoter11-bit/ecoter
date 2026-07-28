/** Renders one packages/tokens/src/radii.ts step — border-radius = the value itself. */
export function RadiusSample({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: value,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--muted)',
        }}
      />
      <div
        style={{
          marginTop: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--foreground)',
        }}
      >
        {name}
      </div>
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
