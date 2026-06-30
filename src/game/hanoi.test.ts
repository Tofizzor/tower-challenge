import { describe, expect, it } from 'vitest'
import {
  applyMove,
  canMove,
  createInitialTowers,
  isSolved,
  topDisc,
  type Towers,
} from './hanoi'

describe('createInitialTowers', () => {
  it('stacks every disc on the source peg, largest at the bottom', () => {
    expect(createInitialTowers(3)).toEqual([[3, 2, 1], [], []])
  })

  it('produces an empty source for zero discs', () => {
    expect(createInitialTowers(0)).toEqual([[], [], []])
  })
})

describe('topDisc', () => {
  it('returns the last element of the tower', () => {
    expect(topDisc([3, 2, 1])).toBe(1)
  })

  it('returns undefined for an empty tower', () => {
    expect(topDisc([])).toBeUndefined()
  })
})

describe('canMove', () => {
  it('allows the top disc onto an empty tower', () => {
    expect(canMove(createInitialTowers(3), 0, 1)).toBe(true)
  })

  it('allows a smaller disc onto a larger disc', () => {
    const towers: Towers = [[3], [2], []]
    expect(canMove(towers, 1, 0)).toBe(true)
  })

  it('rejects a larger disc onto a smaller disc', () => {
    const towers: Towers = [[1], [2], []]
    expect(canMove(towers, 1, 0)).toBe(false)
  })

  it('rejects moving from an empty tower', () => {
    const towers: Towers = [[], [1], []]
    expect(canMove(towers, 0, 1)).toBe(false)
  })

  it('rejects moving onto the same tower', () => {
    expect(canMove(createInitialTowers(3), 0, 0)).toBe(false)
  })
})

describe('applyMove', () => {
  it('moves the top disc to the destination', () => {
    expect(applyMove(createInitialTowers(3), { from: 0, to: 1 })).toEqual([[3, 2], [1], []])
  })

  it('does not mutate the input board', () => {
    const towers = createInitialTowers(3)
    applyMove(towers, { from: 0, to: 1 })
    expect(towers).toEqual([[3, 2, 1], [], []])
  })

  it('throws on an illegal move', () => {
    const towers: Towers = [[1], [2], []]
    expect(() => applyMove(towers, { from: 1, to: 0 })).toThrow()
  })
})

describe('isSolved', () => {
  it('is false at the start', () => {
    expect(isSolved(createInitialTowers(3), 2)).toBe(false)
  })

  it('is true when every disc is on the target tower', () => {
    const towers: Towers = [[], [], [3, 2, 1]]
    expect(isSolved(towers, 2)).toBe(true)
  })

  it('is false for an empty board', () => {
    expect(isSolved([[], [], []], 2)).toBe(false)
  })
})
