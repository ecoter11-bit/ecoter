import { ColorSwatch } from './ColorSwatch'

/**
 * Renders every entry of an imported token scale (e.g. `brand`, `eco`,
 * `neutral` from @ecoter/tokens) — iterates the object, never lists the
 * steps or hex values by hand.
 */
export function ColorScale({ scale }: { scale: Record<string, string> }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {Object.entries(scale).map(([step, hex]) => (
        <ColorSwatch key={step} name={step} hex={hex} />
      ))}
    </div>
  )
}
