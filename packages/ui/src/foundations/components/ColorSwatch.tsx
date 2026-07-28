/**
 * Renders one token straight from its imported value — never a hand-typed
 * hex. See packages/ui/src/foundations/Colors.mdx for the imports.
 */
export function ColorSwatch({
  name,
  hex,
  note,
}: {
  name: string
  hex: string
  note?: string
}) {
  return (
    <div style={{ width: 132 }}>
      <div
        style={{
          height: 64,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          backgroundColor: hex,
        }}
      />
      <div
        style={{
          marginTop: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          lineHeight: 'var(--text-caption--line-height)',
          color: 'var(--foreground)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          lineHeight: 'var(--text-caption--line-height)',
          color: 'var(--color-neutral-600)',
        }}
      >
        {hex}
      </div>
      {note ? (
        <div
          style={{
            marginTop: 2,
            fontSize: 'var(--text-caption)',
            lineHeight: 'var(--text-caption--line-height)',
            color: 'var(--color-neutral-600)',
          }}
        >
          {note}
        </div>
      ) : null}
    </div>
  )
}
