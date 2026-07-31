type TypeScaleEntry = {
  fontSize: string
  lineHeight: string
  fontWeight: number
  letterSpacing?: string
  status: string
}

/**
 * Renders one packages/tokens/src/typography.ts `typeScale` entry with its
 * real size/line-height/weight/letter-spacing applied via inline style —
 * the spec text (and the in-use/proposed status) is read off the same
 * object, not retyped.
 */
export function TypeSpecimen({
  level,
  spec,
  family,
  sample,
}: {
  level: string
  spec: TypeScaleEntry
  family: string
  sample: string
}) {
  const { status } = spec
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 24,
        paddingBlock: 16,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          width: 96,
          flexShrink: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-neutral-600)',
        }}
      >
        {level}
        <br />
        <span
          style={{
            display: 'inline-block',
            marginTop: 4,
            fontSize: 'var(--text-caption)',
            color: status === 'in use' ? 'var(--color-eco-600)' : 'var(--color-warning-600)',
          }}
        >
          {status}
        </span>
      </div>
      <div
        style={{
          fontFamily: family,
          fontSize: spec.fontSize,
          lineHeight: spec.lineHeight,
          fontWeight: spec.fontWeight,
          letterSpacing: spec.letterSpacing,
          color: 'var(--foreground)',
          flexGrow: 1,
        }}
      >
        {sample}
      </div>
      <div
        style={{
          width: 220,
          flexShrink: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-neutral-600)',
          textAlign: 'right',
        }}
      >
        {spec.fontSize} / {spec.lineHeight} / {spec.fontWeight}
        {spec.letterSpacing ? ` / ${spec.letterSpacing}` : ''}
      </div>
    </div>
  )
}
