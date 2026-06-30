import type { Move } from './hanoi'

/**
 * Classic recursive Tower of Hanoi solver: move n-1 discs out of the way onto
 * the spare peg, move the largest disc to the target, then move the n-1 discs
 * on top of it. Produces the optimal sequence of moves.
 */
export function solve(
  n: number,
  from: number,
  to: number,
  via: number,
  acc: Move[] = [],
): Move[] {
  if (n <= 0) return acc
  solve(n - 1, from, via, to, acc)
  acc.push({ from, to })
  solve(n - 1, via, to, from, acc)
  return acc
}

/** Minimum number of moves needed to solve a tower of `discCount` discs. */
export function minimumMoves(discCount: number): number {
  return Math.max(0, 2 ** discCount - 1)
}
