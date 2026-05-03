# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Forgotten Cycle AI Prototype** — a browser idle/reincarnation survival game. The current playable slice is called "The First Ember": a minimalist coastal survival loop where dying from exposure, waking with remembered knowledge, and surviving slightly longer each life is the core feel being tested.

Live at: https://rjdunlap.github.io/forgotten-cycle-ai-prototype/

## Commands

```sh
npm run dev       # Vite dev server at http://127.0.0.1:5173 (HMR enabled)
npm run build     # TypeScript type check + Vite bundle → dist/
npm run preview   # Preview the built output locally
```

Always run `npm run build` before pushing — catches TypeScript errors. GitHub Actions auto-deploys `dist/` to GitHub Pages on push to `main`.

No test runner. Playtesting with speed controls (1x/5x/10x/pause) is the validation method.

## Architecture

Two source files do all the work:

**`src/game.ts`** — pure game logic only. Owns the `GameState` interface and all constants (rates, thresholds, timings). Key functions:
- `runTick(state, seconds, activity)` — returns new state after simulating elapsed time; updates vitals, XP, progress
- `resetCycle(state)` — returns new state for the next life; resets meters and current XP but persists max levels

`game.ts` never touches the DOM and never mutates its inputs.

**`src/app.ts`** — UI layer. Owns mutable runtime state (current activity, site, speed, log entries). Drives a `requestAnimationFrame` loop calling `tick()` → `runTick()` → `render()`. The `render()` function controls which UI sections are visible based on **readout gates** (see below).

## Key Design Patterns

### Readout Gates (perception-based UI reveals)
UI elements are hidden until the player's character has "earned" the perception to understand them, not unlocked by a menu. Gates are pure functions in `app.ts` like `hasFireReadout()`, checked in `render()` and keyed to action level thresholds. Example: the fire UI only appears after the player has collected wood.

This is the central design discipline borrowed from *A Dark Room* — the interface appears because the character understands more.

### Activity System
`Activity` type (`"orienting" | "scavenging" | "tending" | "sheltering"`) controls what the player is doing. Only certain activities are valid at certain sites. `runTick()` applies the active activity's effects each frame.

### XP / Mastery Split
Each action (Bearings, Scavenge, Firekeeping) tracks:
- `*Xp` — XP toward the next level this life
- `max*Level` — highest level ever reached across all cycles (persists through death)
- `active*MasteryLevel` — bonus active in the *current* cycle (set from `max*Level` on `resetCycle()`, not mid-cycle)

Mastery bonuses (+10% speed per max level reached) activate on the *next* entry, not when a new max is earned inside the current one. This keeps the first entry coherent.

### XP formula
`level = floor(sqrt(xp))`, `nextLevelXp = (level + 1)²`. Used consistently for all action levels.

## Vital Systems

Three meters (0–100): **Body Temp**, **Thirst**, **Food**. Any hitting its limit kills the player. Rates are per-second deltas × elapsed seconds. Key modifiers:
- `getColdRate()` — warmth drain varies by exposure phase, cold familiarity, and windbreak protection
- `getScavengeLightEfficiency()` — 1.0 daylight / 0.65 sunset / 0.35 night
- `getWindbreakProtection()` — 0.0–0.55 warmth protection

Day/night cycle is 288 seconds at 1× speed. Seasonal calendar exists in code (360-day year) but is not used in the current prototype.

## Narrative Tone

- **Pre–Bearings Lv 10:** Qualitative, sensory, clipped. ("cold," "shivering," "steady")
- **Post–Bearings Lv 10:** Numeric, systematic. ("Body Temp: 45 / 100", "Warmth drains −7.2/s")

Copy follows *A Dark Room* discipline: sparse, never redundant, no tutorial language.

## Design Docs (read before changing mechanics)

- `docs/design-bible.md` — current design frame and collaboration principles
- `docs/initial-testing-todo.md` — living list of small testable passes and parked decisions
- `docs/a-dark-room-reference.md` — feel bible for minimalist UI unfolding
- `docs/visual-systems-bible.md` — UI tone, copy style, color palette
- `docs/lifecycle-exploration-research.md` — long-horizon research; **do not build from this unless explicitly asked**

## Scope Guardrails

Each pass should be one mechanic or feel improvement. Do not add factions, companions, combat, towns, origins, skill trees, map hexes, or multi-layer prestige unless Robert explicitly requests them. Do not treat `lifecycle-exploration-research.md` as ready-to-build scope.
