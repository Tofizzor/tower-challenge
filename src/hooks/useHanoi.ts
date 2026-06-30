import { useCallback, useEffect, useRef, useState } from 'react'
import {
  INITIAL_DISCS,
  MAX_DISCS,
  MIN_DISCS,
  SOURCE_INDEX,
  TARGET_INDEX,
  VIA_INDEX,
  applyMove,
  canMove,
  createInitialTowers,
  isSolved,
  type Towers,
} from '../game/hanoi'
import { solve } from '../game/solver'

const AUTO_PLAY_INTERVAL_MS = 450
const INVALID_FLASH_MS = 350

export interface HanoiGame {
  towers: Towers
  selectedTower: number | null
  invalidTower: number | null
  moveCount: number
  solved: boolean
  isAutoSolving: boolean
  discCount: number
  minDiscs: number
  maxDiscs: number
  handleTowerClick: (index: number) => void
  reset: () => void
  autoSolve: () => void
  stopAutoSolve: () => void
  increaseDiscCount: () => void
  decreaseDiscCount: () => void
}

/**
 * Owns the interactive game state on top of the pure logic: tower contents, the
 * two-click selection, the move counter, invalid-move feedback, and timed
 * auto-solve playback.
 */
export function useHanoi(): HanoiGame {
  const [discCount, setDiscCount] = useState(INITIAL_DISCS)
  const [towers, setTowers] = useState<Towers>(() => createInitialTowers(INITIAL_DISCS))
  const [selectedTower, setSelectedTower] = useState<number | null>(null)
  const [invalidTower, setInvalidTower] = useState<number | null>(null)
  const [moveCount, setMoveCount] = useState(0)
  const [isAutoSolving, setIsAutoSolving] = useState(false)

  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const invalidTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const solved = isSolved(towers, TARGET_INDEX)

  const clearAutoTimer = useCallback(() => {
    if (autoTimer.current !== null) {
      clearInterval(autoTimer.current)
      autoTimer.current = null
    }
  }, [])

  const stopAutoSolve = useCallback(() => {
    clearAutoTimer()
    setIsAutoSolving(false)
  }, [clearAutoTimer])

  const reset = useCallback(() => {
    clearAutoTimer()
    setIsAutoSolving(false)
    setSelectedTower(null)
    setInvalidTower(null)
    setMoveCount(0)
    setTowers(createInitialTowers(discCount))
  }, [clearAutoTimer, discCount])

  const applyDiscCount = useCallback(
    (next: number) => {
      const clamped = Math.min(MAX_DISCS, Math.max(MIN_DISCS, next))
      if (clamped === discCount) return

      clearAutoTimer()
      setIsAutoSolving(false)
      setSelectedTower(null)
      setInvalidTower(null)
      setMoveCount(0)
      setDiscCount(clamped)
      setTowers(createInitialTowers(clamped))
    },
    [clearAutoTimer, discCount],
  )

  const increaseDiscCount = useCallback(() => {
    applyDiscCount(discCount + 1)
  }, [applyDiscCount, discCount])

  const decreaseDiscCount = useCallback(() => {
    applyDiscCount(discCount - 1)
  }, [applyDiscCount, discCount])

  const flashInvalid = useCallback((index: number) => {
    setInvalidTower(index)
    if (invalidTimer.current !== null) clearTimeout(invalidTimer.current)
    invalidTimer.current = setTimeout(() => setInvalidTower(null), INVALID_FLASH_MS)
  }, [])

  const handleTowerClick = useCallback(
    (index: number) => {
      if (isAutoSolving || solved) return

      // First click: lift the top disc of a non-empty peg.
      if (selectedTower === null) {
        if (towers[index].length === 0) {
          flashInvalid(index)
          return
        }
        setSelectedTower(index)
        return
      }

      // Clicking the same peg again puts the disc back down.
      if (selectedTower === index) {
        setSelectedTower(null)
        return
      }

      // Second click: attempt to drop the lifted disc on the chosen peg.
      if (canMove(towers, selectedTower, index)) {
        setTowers((prev) => applyMove(prev, { from: selectedTower, to: index }))
        setMoveCount((count) => count + 1)
      } else {
        flashInvalid(index)
      }
      setSelectedTower(null)
    },
    [towers, selectedTower, isAutoSolving, solved, flashInvalid],
  )

  const autoSolve = useCallback(() => {
    clearAutoTimer()

    const moves = solve(discCount, SOURCE_INDEX, TARGET_INDEX, VIA_INDEX)
    let current = createInitialTowers(discCount)
    let step = 0

    setTowers(current)
    setSelectedTower(null)
    setInvalidTower(null)
    setMoveCount(0)
    setIsAutoSolving(true)

    autoTimer.current = setInterval(() => {
      if (step >= moves.length) {
        clearAutoTimer()
        setIsAutoSolving(false)
        return
      }
      current = applyMove(current, moves[step])
      step += 1
      setTowers(current)
      setMoveCount(step)
    }, AUTO_PLAY_INTERVAL_MS)
  }, [clearAutoTimer, discCount])

  useEffect(() => {
    return () => {
      if (autoTimer.current !== null) clearInterval(autoTimer.current)
      if (invalidTimer.current !== null) clearTimeout(invalidTimer.current)
    }
  }, [])

  return {
    towers,
    selectedTower,
    invalidTower,
    moveCount,
    solved,
    isAutoSolving,
    discCount,
    minDiscs: MIN_DISCS,
    maxDiscs: MAX_DISCS,
    handleTowerClick,
    reset,
    autoSolve,
    stopAutoSolve,
    increaseDiscCount,
    decreaseDiscCount,
  }
}
