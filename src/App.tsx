import { Board } from './components/Board'
import { Controls } from './components/Controls'
import { useHanoi } from './hooks/useHanoi'

export default function App() {
  const game = useHanoi()

  return (
    <main className="app">
      <header className="app__header">
        <h1>Tower Challenge</h1>
        <p>
          Move every disc onto the right-hand tower. A larger disc can never rest on a smaller one,
          and you may only move one disc at a time.
        </p>
      </header>

      <Controls
        moveCount={game.moveCount}
        discCount={game.discCount}
        minDiscs={game.minDiscs}
        maxDiscs={game.maxDiscs}
        solved={game.solved}
        isAutoSolving={game.isAutoSolving}
        onReset={game.reset}
        onAutoSolve={game.autoSolve}
        onStop={game.stopAutoSolve}
        onIncreaseDiscs={game.increaseDiscCount}
        onDecreaseDiscs={game.decreaseDiscCount}
      />

      <Board
        towers={game.towers}
        selectedTower={game.selectedTower}
        invalidTower={game.invalidTower}
        discCount={game.discCount}
        disabled={game.isAutoSolving || game.solved}
        onTowerClick={game.handleTowerClick}
      />

      <p className="hint">
        {game.isAutoSolving
          ? 'Auto-solving - watch the optimal solution play out.'
          : 'Click a tower to lift its top disc, then click another tower to drop it.'}
      </p>
    </main>
  )
}
