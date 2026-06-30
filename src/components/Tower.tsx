import type { Tower as TowerType } from '../game/hanoi'
import { Disc } from './Disc'

const TOWER_LABELS = ['A', 'B', 'C']

interface TowerProps {
  index: number
  discs: TowerType
  discCount: number
  selected: boolean
  invalid: boolean
  disabled: boolean
  onClick: () => void
}

/** A single peg: its stacked discs, the pole, a base, and a label. */
export function Tower({ index, discs, discCount, selected, invalid, disabled, onClick }: TowerProps) {
  const className = [
    'tower',
    selected && 'tower--selected',
    invalid && 'tower--invalid',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Tower ${TOWER_LABELS[index]}, ${discs.length} disc${discs.length === 1 ? '' : 's'}`}
    >
      <div className="tower__discs">
        {discs.map((size, i) => (
          <Disc key={size} size={size} discCount={discCount} lifted={selected && i === discs.length - 1} />
        ))}
      </div>
      <div className="tower__pole" />
      <span className="tower__label">{TOWER_LABELS[index]}</span>
    </button>
  )
}
