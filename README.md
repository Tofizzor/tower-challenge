# Tower Challenge

A frontend visualization of the classic **Tower of Hanoi** puzzle — the same challenge from an interview I attempted. This repo is my working proof that I can solve it completely next time.

**Repository:** [github.com/Tofizzor/tower-challenge](https://github.com/Tofizzor/tower-challenge)

**Play online:** [tofizzor.github.io/tower-challenge](https://tofizzor.github.io/tower-challenge/)

## About

The puzzle is based on the real Tower of Hanoi game. Discs of different sizes are stacked on towers (pegs). The goal is to move the entire stack from one tower to another while following the rules below.

This project brings that puzzle to life in the browser so moves are visible and interactive.

## How it works

### Towers and discs

- **Towers** are storage units that can hold any number of discs.
- **Discs** come in different sizes and are stacked on towers.
- There are **3 towers** in total.

### Rules

1. A bigger disc cannot be placed on top of a smaller disc.
2. You may only move **one disc at a time** — remove a single disc from a tower and place it on another. You cannot lift multiple discs in one move.
3. The goal is to move **all discs from one tower to another**.

## Features

- **Visual UI** — discs and towers are rendered on screen, each disc sized and coloured by value.
- **Interactive moves** — click a tower to lift its top disc, then click another tower to drop it.
- **Rule enforcement** — illegal moves are rejected with a shake, and only the top disc of a peg can move.
- **Move tracking** — your move count is shown next to the optimal count (`2^n − 1`).
- **Win detection** — a banner appears when every disc reaches the target tower, flagging an optimal solve.
- **Auto-solver** — watch the optimal recursive solution play out, move by move.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (dev server and build)
- [Vitest](https://vitest.dev/) (unit tests for the game logic and solver)

## Project structure

```
src/
  game/        Pure, framework-free game logic
    hanoi.ts     Types, board setup, move validation, win detection
    solver.ts    Recursive optimal solver + minimum-move count
  hooks/
    useHanoi.ts  React state: selection, move count, auto-solve playback
  components/    Board, Tower, Disc, Controls
  App.tsx        Page layout
  main.tsx       Entry point
```

The game rules live in `src/game` with no UI dependencies, so they are easy to unit test and are reused directly by the auto-solver.

## Getting started

### Play in the browser

The game is hosted on GitHub Pages. Open [tofizzor.github.io/tower-challenge](https://tofizzor.github.io/tower-challenge/) — no install required.

### Run locally

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite prints a local URL)
npm test         # run the unit tests once
npm run build    # type-check and build for production
npm run preview  # preview the production build
```
