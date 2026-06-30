import type { CSSProperties } from 'react'
import type { Towers } from '../game/hanoi'
import { Tower } from './Tower'

interface BoardProps {
  towers: Towers
  selectedTower: number | null
  invalidTower: number | null
  discCount: number
  disabled: boolean
  onTowerClick: (index: number) => void
}

/** Lays out the three towers side by side. */
export function Board({ towers, selectedTower, invalidTower, discCount, disabled, onTowerClick }: BoardProps) {
  const discHeight = Math.min(22, Math.floor(200 / discCount))
  const towerHeight = discCount * (discHeight + 3) + 80
  const poleHeight = discCount * (discHeight + 3) + 20

  const boardStyle = {
    '--disc-height': `${discHeight}px`,
    '--tower-height': `${towerHeight}px`,
    '--pole-height': `${poleHeight}px`,
  } as CSSProperties

  return (
    <div className="board" style={boardStyle}>
      {towers.map((discs, index) => (
        <Tower
          key={index}
          index={index}
          discs={discs}
          discCount={discCount}
          selected={selectedTower === index}
          invalid={invalidTower === index}
          disabled={disabled}
          onClick={() => onTowerClick(index)}
        />
      ))}
    </div>
  )
}
