/**
 * Pure Tower of Hanoi game logic. No UI, no side effects - every function is
 * deterministic and returns new state, which keeps the rules unit-testable and
 * reusable by the auto-solver.
 *
 * A tower is an array of disc sizes where index 0 is the bottom of the peg and
 * the last element is the top (the only disc that may be moved).
 */

export type Tower = number[]
export type Towers = [Tower, Tower, Tower]
export type Move = { from: number; to: number }

export const TOWER_COUNT = 3
export const SOURCE_INDEX = 0
export const VIA_INDEX = 1
export const TARGET_INDEX = 2

/** Default number of discs the board starts with. */
export const INITIAL_DISCS = 4

/** Smallest and largest disc counts the UI allows. */
export const MIN_DISCS = 3
export const MAX_DISCS = 8

/** Builds a fresh board with every disc stacked on the source peg, largest at the bottom. */
export function createInitialTowers(discCount: number): Towers {
  const source: Tower = []
  for (let size = discCount; size >= 1; size -= 1) {
    source.push(size)
  }
  return [source, [], []]
}

/** Returns the top disc of a tower, or `undefined` when the tower is empty. */
export function topDisc(tower: Tower): number | undefined {
  return tower[tower.length - 1]
}

/**
 * A move is legal when the source has a disc, the destination differs from the
 * source, and the moving disc is smaller than whatever it lands on.
 */
export function canMove(towers: Towers, from: number, to: number): boolean {
  if (from === to) return false
  const fromTower = towers[from]
  const toTower = towers[to]
  if (!fromTower || !toTower) return false

  const moving = topDisc(fromTower)
  if (moving === undefined) return false

  const landing = topDisc(toTower)
  return landing === undefined || moving < landing
}

/** Applies a move immutably, returning a new board. Throws on an illegal move. */
export function applyMove(towers: Towers, move: Move): Towers {
  if (!canMove(towers, move.from, move.to)) {
    throw new Error(`Illegal move from tower ${move.from} to tower ${move.to}`)
  }
  const next = towers.map((tower) => [...tower]) as Towers
  const disc = next[move.from].pop() as number
  next[move.to].push(disc)
  return next
}

/** The puzzle is solved once every disc sits on the target peg. */
export function isSolved(towers: Towers, targetIndex: number): boolean {
  const total = towers.reduce((sum, tower) => sum + tower.length, 0)
  return total > 0 && towers[targetIndex].length === total
}
