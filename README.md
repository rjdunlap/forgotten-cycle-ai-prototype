# Forgotten Cycle AI Prototype

This is a shared workspace for an AI-assisted idle/reincarnation RPG prototype being explored by Robert and collaborators.

It is intentionally separate from the existing Forgotten Cycle project. The working name and some thematic DNA overlap, but this repo is for testing a smaller, loop-first direction before committing to large systems.

The current playable slice is **The First Ember**: a minimalist coastal survival loop inspired by Idle Reincarnator, A Usual Idle Life, and the opening unfolding feel of A Dark Room.

## Current North Star

Test whether this feels good:

> The player dies from exposure, wakes again with remembered practical knowledge, and survives a little longer because the coast is becoming familiar.

The prototype should stay small, playable, and easy to react to. Do not expand into factions, towns, companions, combat, origins, or broad skill trees until the early shore loop feels right.

## Current Playable Loop

- The player wakes on a strange shore with almost no interface.
- `Get Your Bearings` is the first and only visible action.
- The log, light, body state, wreckage, wood, fire, slower needs, and place hooks reveal as the player understands more.
- `Scavenge the Wreckage` collects `Wood`; wood does not directly restore body temperature.
- `Start a Fire` / `Tend the Fire` spends wood to build fire, and fire keeps the night at bay.
- `Body Temp`, `Thirst`, and `Food` exist, but early readouts are qualitative rather than numerical.
- Current-entry action progress resets on death, while max-ever mastery can help future entries.
- Death is a payout beat: the player wakes again with the same sensory anchor and small practical memory.

## Design References

Read these before making design or code changes:

- [docs/design-bible.md](docs/design-bible.md): current handoff, project frame, mechanics, and guardrails.
- [docs/initial-testing-todo.md](docs/initial-testing-todo.md): living menu of small prototype passes.
- [docs/a-dark-room-reference.md](docs/a-dark-room-reference.md): feel bible for minimalist unfolding, sparse UI, fire as threshold, and earned reveals.
- [docs/visual-systems-bible.md](docs/visual-systems-bible.md): UI/copy tone and visual direction.
- [docs/lifecycle-exploration-research.md](docs/lifecycle-exploration-research.md): long-horizon research only; do not treat it as ready-to-build scope.

For a pasteable handoff into a fresh AI/code session, use [docs/continuation-prompt.md](docs/continuation-prompt.md).

## Local Development

This prototype is built with TypeScript and Vite and served as static files on GitHub Pages.

```sh
npm install
npm run dev
npm run build
```

The local dev server is usually available at:

```text
http://127.0.0.1:5173/
```

Source overview:

- `index.html`: one-screen prototype structure.
- `src/app.ts`: UI binding, copy, event log, and browser interaction.
- `src/game.ts`: typed game state and simulation logic.
- `src/styles.css`: Tailwind input and small base styles.
- `.github/workflows/pages.yml`: builds and deploys `dist/` to GitHub Pages after pushes to `main`.

Build output is generated into `dist/` and should not be hand-edited.

## Development Principles

- Pull before changing code.
- Push after each useful playable change.
- Favor human playtesting over heavy testing ceremony during this exploratory phase.
- Still run `npm run build` before considering a change safe.
- Keep each pass small enough to play immediately.
- Let the interface unfold because the character perceives more, not because a dashboard needs filling.
- Keep early copy sensory, clipped, and practical.
- Treat the old large GDD as hypothesis material, not a foundation.

## Historical Context

The repo began from a larger AI-generated GDD for an idle RPG named Forgotten Cycle. Robert clarified that this prototype should not pick up that whole design. It should instead validate a narrower loop inspired primarily by Idle Reincarnator, A Usual Idle Life, and now the minimalist opening discipline of A Dark Room.

The first useful question remains:

> Does repeating a short life, dying, and returning with practical memory feel satisfying enough to build on?
