import { minimumMoves } from '../game/solver'

interface ControlsProps {
  moveCount: number
  discCount: number
  minDiscs: number
  maxDiscs: number
  solved: boolean
  isAutoSolving: boolean
  onReset: () => void
  onAutoSolve: () => void
  onStop: () => void
  onIncreaseDiscs: () => void
  onDecreaseDiscs: () => void
}

/** Stats (moves vs optimal), disc count, action buttons, and the win banner. */
export function Controls({
  moveCount,
  discCount,
  minDiscs,
  maxDiscs,
  solved,
  isAutoSolving,
  onReset,
  onAutoSolve,
  onStop,
  onIncreaseDiscs,
  onDecreaseDiscs,
}: ControlsProps) {
  const optimal = minimumMoves(discCount)

  return (
    <div className="controls">
      <div className="controls__stats">
        <span className="stat">
          <span className="stat__label">Moves</span>
          <span className="stat__value">{moveCount}</span>
        </span>
        <span className="stat">
          <span className="stat__label">Optimal</span>
          <span className="stat__value">{optimal}</span>
        </span>
        <div className="stat stat--stepper">
          <span className="stat__label">Discs</span>
          <div className="disc-stepper">
            <button
              type="button"
              className="btn btn--step"
              onClick={onDecreaseDiscs}
              disabled={isAutoSolving || discCount <= minDiscs}
              aria-label="Fewer discs"
            >
              −
            </button>
            <span className="disc-stepper__value" aria-live="polite">
              {discCount}
            </span>
            <button
              type="button"
              className="btn btn--step"
              onClick={onIncreaseDiscs}
              disabled={isAutoSolving || discCount >= maxDiscs}
              aria-label="More discs"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="controls__buttons">
        {isAutoSolving ? (
          <button type="button" className="btn" onClick={onStop}>
            Stop
          </button>
        ) : (
          <button type="button" className="btn" onClick={onAutoSolve} disabled={solved}>
            Auto-solve
          </button>
        )}
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Reset
        </button>
      </div>

      {solved && (
        <div className="banner" role="status">
          Solved in {moveCount} moves{moveCount === optimal ? ' - optimal!' : ''}
        </div>
      )}
    </div>
  )
}
