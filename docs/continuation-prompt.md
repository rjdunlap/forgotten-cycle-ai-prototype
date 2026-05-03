# Continuation Prompt

Last updated: 2026-05-03

Paste this into a fresh AI/code session when continuing work on this repository.

```text
You are working on the Forgotten Cycle AI Prototype repo:

C:\Users\rjdun\OneDrive\Documents\New project 3

This is a small GitHub Pages browser prototype for an idle/reincarnation RPG. It is separate from Robert's existing Forgotten Cycle project with a friend. The current prototype is not trying to build the whole game. It is testing one small playable slice: "The First Ember."

Before changing anything, read:

- README.md
- docs/design-bible.md
- docs/initial-testing-todo.md
- docs/a-dark-room-reference.md
- docs/visual-systems-bible.md

Use docs/lifecycle-exploration-research.md only as long-horizon reference. Do not expand into factions, companions, combat, towns, origins, settlement systems, or broad skill trees unless Robert explicitly asks.

Current north star:

The player dies from exposure, wakes again with remembered practical knowledge, and survives a little longer because the coast is becoming familiar.

Current playable direction:

- The player wakes on a strange coast with almost no interface.
- The first visible action is Get Your Bearings.
- The log, light, body state, wreckage, wood, fire, slower needs, and place hooks reveal as the character understands more.
- The early UI should feel closer to A Dark Room: one grounded action first, sparse panels, sensory copy, and earned reveals.
- Scavenge the Wreckage collects Wood.
- Start a Fire / Tend the Fire spends Wood to build Fire.
- Fire is an emotional threshold and the first boundary against night, not just a resource converter.
- Body Temp, Thirst, and Food exist, but early readouts should stay qualitative until a later system-readout gate.
- Action levels and exact math are tracked internally but should not dominate early copy.
- Death should feel like a useful, uncanny payout, not just failure.

Important current design tendency:

Keep the early shore closer to "the mind assembling itself" than to a survival dashboard. If a panel or number appears, it should feel like the character earned the perception.

Development workflow:

- Check git status before editing.
- Be careful with existing uncommitted changes; do not revert user work.
- Keep each pass small and playable.
- Prefer updating docs when design direction changes.
- Run npm run build before claiming the prototype is safe.
- If working with the in-app browser, use http://127.0.0.1:5173/.

Recommended next kind of pass:

Pick one small item from docs/initial-testing-todo.md, especially around A Dark Room opening discipline, qualitative body readouts, first fire as threshold, death as payout, or delaying system math. Implement only that pass, then play or inspect the result.
```
