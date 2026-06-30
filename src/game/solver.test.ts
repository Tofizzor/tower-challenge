import { describe, expect, it } from 'vitest'
import { minimumMoves, solve } from './solver'
import { applyMove, createInitialTowers, isSolved, TARGET_INDEX, type Towers } from './hanoi'

describe('solve', () => {
  it('produces 2^n - 1 moves', () => {
    expect(solve(1, 0, 2, 1)).toHaveLength(1)
    expect(solve(3, 0, 2, 1)).toHaveLength(7)
    expect(solve(5, 0, 2, 1)).toHaveLength(31)
  })

  it('produces no moves for zero discs', () => {
    expect(solve(0, 0, 2, 1)).toEqual([])
  })

  it('only generates legal moves and reaches the solved state', () => {
    for (const n of [1, 2, 3, 4, 6]) {
      let towers: Towers = createInitialTowers(n)
      for (const move of solve(n, 0, TARGET_INDEX, 1)) {
        // applyMove throws if a move is illegal, which would fail the test.
        towers = applyMove(towers, move)
      }
      expect(isSolved(towers, TARGET_INDEX)).toBe(true)
    }
  })
})

describe('minimumMoves', () => {
  it('matches 2^n - 1', () => {
    expect(minimumMoves(0)).toBe(0)
    expect(minimumMoves(3)).toBe(7)
    expect(minimumMoves(4)).toBe(15)
  })
})
