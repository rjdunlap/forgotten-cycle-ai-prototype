# Initial Testing Todo

Last updated: 2026-05-02

This is a living parking lot for small prototype passes. Use it when the project wanders into design-forward exploration and needs a grounded next step again.

The goal is not to execute this list top to bottom. The goal is to keep a menu of limited, testable changes that can each answer one question about the early loop.

## How To Use This List

- Pick one item per pass.
- Keep each pass small enough to play immediately.
- After playing, write a short note under "Playtest Notes."
- Move, split, or delete items freely when the design changes.
- Do not treat long-horizon systems from `lifecycle-exploration-research.md` as ready-to-build unless Robert explicitly chooses that direction.

## Current North Star

The current slice is "The First Ember."

Test whether this feels good:

> The player dies from exposure, wakes again with remembered practical knowledge, and survives a little longer because the coast is becoming familiar.

## Immediate Candidate Passes

### Pass 1: Baseline Feel Check

Status: observed

Question:

> Does the current loop already communicate vulnerability, death, and improvement?

Small work:

- Play 3-5 lives without changing code.
- Record first death time, second death time, and whether the improvement is noticeable.
- Note one confusing label, one satisfying moment, and one thing that feels flat.

Done when:

- There is a short note under "Playtest Notes" describing what the current build feels like.

Result:

- First playtest found that death comes too quickly for normal feel, though the fast pace is useful for testing.
- Add a testing speed toggle so the normal loop can slow down without losing rapid iteration.

### Pass 2: First Discovery Before Scavenging

Status: in prototype

Question:

> Does starting with a small "Explore the Shore" discovery make the loop feel more like learning and less like clicking a known button?

Small change:

- Add an initial `Get Your Bearings` action.
- Hide or disable `Scavenge the Tide-Line` until the player discovers usable fuel signs.
- Keep the discovery very short so Life 1 does not become tedious.

Test:

- Play two lives.
- Check whether discovering the tide-line feels satisfying or merely delays the real action.

Result:

- Chosen direction: start with `Get Your Bearings`, then let the player start `Scavenge the Tide-Line`.
- Avoid `Search Your Memory` for now because it may reveal the loop too early.

### Pass 2A: Testing Speed Toggle

Status: in prototype

Question:

> Can the normal loop breathe while still allowing rapid testing?

Small change:

- Slow normal simulation speed to one-fifth of the previous pace.
- Add `1x`, `5x`, and `10x` controls in the bottom-left testing area.
- Treat `5x` as roughly the old rapid testing pace.

Test:

- Use `1x` for feel.
- Use `5x` or `10x` when checking repeated deaths and wake-again pacing.

### Pass 3: Fuel Recognition Tuning

Status: candidate

Question:

> Should remembered fuel recognition improve find speed, warmth value, or both?

Small change options:

- Option A: recognition reduces time between finds.
- Option B: recognition increases warmth restored per useful find.
- Option C: recognition does a small amount of both.

Test:

- Compare Life 1 and Life 3.
- Improvement should be felt without making death disappear too early.

### Pass 4: Death As Payout

Status: candidate

Question:

> Does the death popup feel like useful progress, not only failure?

Small change:

- Add one clear remembered lesson to the death popup.
- Keep the language practical and grounded.
- Avoid exposing a full currency shop yet.

Example lessons:

- "You remember where dry needles collect."
- "You learn to ignore blackened driftwood."
- "You wake knowing the tide line by smell and slope."

Test:

- Die once.
- Check whether the player understands why the next life should be better.

### Pass 5: Warmth Readability

Status: candidate

Question:

> Is Inner Warmth readable as an urgent survival state?

Small change:

- Improve the meter copy, color, or event log messages at low warmth.
- Add one low-warmth warning state if needed.
- Do not add new survival resources.

Test:

- Let warmth fall below 20.
- Check whether the player understands danger before death happens.

### Pass 6: Night Gets Colder

Status: later candidate

Question:

> Does a simple cold escalation add tension, or does it make early play feel unfair?

Small change:

- Add a single phase shift where warmth drains faster after a short time.
- Present it as weather or deep night, not as an abstract difficulty spike.

Test:

- Play Life 1 and Life 2.
- The phase should create tension without erasing the benefit of remembered fuel.

### Pass 7: Separate Ember From Body Warmth

Status: later candidate

Question:

> Would a tiny fire/ember meter make fuel feel more grounded than instant warmth restoration?

Small change:

- Add an `Ember` or `Fire` meter only if the current fuel loop feels too abstract.
- Fuel feeds the ember.
- Ember slows warmth loss or restores warmth over time.

Risk:

- This could turn the first slice into a multi-resource survival sim too early.

Test:

- Only attempt this after simpler fuel tuning fails to make scavenging feel meaningful.

### Pass 8: First Logbook Hint

Status: later candidate

Question:

> Can the Ancestral Logbook appear as flavor without opening a large codex system?

Small change:

- Add a tiny remembered-note area after death or on the next life.
- Store one or two unlocked notes.
- Avoid a full research UI.

Test:

- Check whether the note makes memory feel persistent without distracting from survival.

## Design Parking Lot

These are interesting but should wait until the basic shoreline loop feels good.

- Spendable memory currency.
- Multiple jobs or training actions.
- Wellness as a broader lifespan system.
- Map hexes or cartography.
- Faction choice.
- Companions.
- Combat.
- Town building.
- Multi-layer prestige.
- Hollow-world content.

## Playtest Notes

Add notes here after each pass.

### 2026-05-02

- Created this todo list as a working guide for small testing passes.
- Current priority is still validating the death-driven shoreline loop before adding larger systems.
- Playtest note: death speed is too fast for normal play, but useful for testing; add speed controls and slow the default loop.
- Playtest note: starting directly on `Scavenge the Tide-Line` feels premature; try `Get Your Bearings` as the first activity.
