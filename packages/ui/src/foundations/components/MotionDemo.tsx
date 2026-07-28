import { useState } from 'react'

/**
 * Hover-triggered translate using the real duration/easing token values
 * (via inline style, not a class) — an actual transition, not a described one.
 */
export function MotionDemo({
  name,
  duration,
  easing,
}: {
  name: string
  duration: string
  easing: string
}) {
  const [active, setActive] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div
        style={{
          width: 140,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-neutral-600)',
        }}
      >
        {name}
      </div>
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        style={{
          position: 'relative',
          width: 220,
          height: 40,
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--muted)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-eco-500)',
            transform: active ? 'translateX(180px)' : 'translateX(0)',
            transitionProperty: 'transform',
            transitionDuration: duration,
            transitionTimingFunction: easing,
          }}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-neutral-600)',
        }}
      >
        {duration}
      </div>
    </div>
  )
}
