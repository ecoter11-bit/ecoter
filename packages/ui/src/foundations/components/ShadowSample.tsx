/** Renders one packages/tokens/src/shadows.ts step — box-shadow = the value itself, on a light surface. */
export function ShadowSample({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 96,
          height: 72,
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--card)',
          boxShadow: value,
        }}
      />
      <div
        style={{
          marginTop: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--foreground)',
        }}
      >
        {name}
      </div>
    </div>
  )
}
