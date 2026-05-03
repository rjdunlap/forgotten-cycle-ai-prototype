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

Status: in prototype

Question:

> Is Inner Warmth readable as an urgent survival state?

Small change:

- Split condition display from action choices.
- Move Warmth into a dedicated `Condition` panel.
- Show dormant `Thirst` and `Food` rows as visual placeholders, without adding mechanics.
- Do not add new survival resources.

Test:

- Let warmth fall below 20.
- Check whether the player understands danger before death happens.

Result:

- Direction chosen: condition belongs in a side panel for now, while available actions carry their own progress bars.
- Current activity is represented by the active action row rather than a separate top-level activity card.

### Pass 5A: Action Rows With Progress

Status: in prototype

Question:

> Does putting progress inside each action row make the UI feel more like the idle subgenre?

Small change:

- Convert the single action toggle into rows for `Get Your Bearings` and `Scavenge the Tide-Line`.
- Put progress bars inside the relevant action rows.
- Show active, idle, learned, or locked status inside each row.

Test:

- Start a fresh life and watch `Get Your Bearings` complete.
- Click `Scavenge the Tide-Line` and confirm that row owns the fuel progress.
- Check whether the side `Condition` panel is easier to understand than mixing Warmth into the activity card.

Follow-up:

- Merged `Hold Still` into `Get Your Bearings` to keep the action list smaller.
- `Get Your Bearings` now acts as the initial discovery action and the later observe/endure action when the player is not scavenging.

### Pass 5B: Logbook Copy Frame

Status: in prototype

Question:

> Does logbook/reincarnation copy feel better than generic dashboard labels?

Small change:

- Replace `Choose what this life does` with `Shore Actions`.
- Replace bare `Cycle` numbering with a bottom log header: `Log Entry`, `Entry I`, `Entry II`, etc.
- Avoid a visible elapsed timer in the log-entry header; it reads like an unexplained clock and can spoil the light change.
- Use a qualitative light-state line instead, such as `Light: low sun`, `Light: fading`, and `Light: gone`.
- Keep reincarnation/life bookkeeping away from the main app header until the player understands the loop.
- Remove prototype branding from the top header; make the top area the `You` panel instead.
- Move the log into the right-side panel slot so it remains visible beside the action list.

Test:

- Play into Entry II.
- Check whether the header feels more like a reincarnation log and less like an app counter.
- Confirm the header does not reveal night before the player experiences the shift.
- Confirm `Entry I` feels less awkward than `Life I` and belongs with the event log.
- Confirm the right-side log placement feels more useful than a bottom-only log feed.

### Pass 5C: Repeatable Bearings Action

Status: in prototype

Question:

> Does `Get Your Bearings` still feel worth doing after it reveals the tide-line?

Small change:

- Make `Get Your Bearings` a repeatable action loop instead of a one-time unlock.
- Let the action build a per-entry `Shore Sense` level, inspired by idle games where jobs/trainings/actions improve through repeated use.
- Reset current `Shore Sense` levels on death, but keep the highest level ever reached.
- Give `Get Your Bearings` a permanent +10% speed bonus per highest `Shore Sense` level reached, starting on the next entry. Example: a historical max of Lv 5 means +50%, even if a later entry only reaches Lv 3.
- Use current-entry `Shore Sense` as a light exposure-handling bonus, while keeping `Scavenge the Tide-Line` as wood collection.
- Hide `Scavenge the Tide-Line` during the first run until the player discovers usable fuel signs; after that discovery, it remains part of later lives.
- Unlock the `Light` readout in the Condition panel when `Get Your Bearings` reaches Lv 1.

Test:

- On Entry I, confirm only `Get Your Bearings` is visible at first.
- After the first Bearings completion, confirm Scavenge appears and the Condition panel reveals `Light: low sun`.
- Spend a later entry on Bearings and check whether current levels reset while the max-level mastery bonus remains.
- Confirm mastery earned in an entry does not apply until after death/reset.

Follow-up:

- Give `Scavenge the Tide-Line` and `Tend the Fire` the same current-entry level / max-ever mastery structure as `Get Your Bearings`.
- `Scavenge` levels should improve wood collection feel and show progress in the row.
- `Firekeeping` levels should improve fire tending feel and show progress in the row.
- All action mastery bonuses should activate on the next entry, not immediately inside the entry where a new max is earned.

### Pass 5D: First Loop Epiphany

Status: in prototype

Question:

> Does the first death and wake-again moment feel like a real time-loop realization instead of a normal prestige reset?

Small change:

- Use one repeated sensory anchor at the start of each life: three gull-cries and one broken wave.
- Make the death popup sharper and more sensory, with a hard cut from cold and surf into silence.
- On waking, add a micro-prediction beat: the player knows where the splinters will be before looking.
- Keep this as log and modal copy only; do not add a cutscene or long narrative panel yet.

Test:

- Die once and wake again.
- Check whether the repeated shore cue is noticeable without slowing the game down.
- Confirm the epiphany reads as uncanny memory, not just tutorial text.

### Pass 5E: Daylight Before Exposure

Status: in prototype

Question:

> Does the first life breathe better if the sun gives the player time to understand the shore before cold becomes lethal?

Small change:

- Start each life in `Late Sun`, where warmth does not drain yet.
- Shift into `Sunset`, where cold begins lightly and the log warns that the shore is changing.
- Shift into `First Night`, where warmth belongs to the fire.
- Reframe fuel as kindling/fire tending, while keeping the current single Warmth meter for now.

Test:

- Play Entry I at 1x and check whether the first discovery lands before the survival pressure.
- Confirm the sunset warning makes the coming danger legible.
- Check whether feeding the fire feels like the obvious answer once night arrives.

Follow-up:

- Sunlight should actively warm the body to full before sunset, not merely pause cold loss.
- `Scavenge the Tide-Line` should collect `Wood`; it should not restore Warmth directly.
- Add a small `Tend the Fire` action that spends Wood to keep Fire alive, with Fire providing warmth.
- `Scavenge the Tide-Line` should become less effective as light fades, so late wood searching is possible but worse than gathering before night.

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
- Playtest note: split "how the character is doing" from "what the character is doing"; condition should be a side panel, while action rows should own their progress bars.
- Playtest note: remove the separate `Hold Still` row; merge its messages and purpose into `Get Your Bearings`.
- Playtest note: `Choose what this life does` and bare `Cycle 2` feel too generic; try logbook language and a simple elapsed First Night readout.
- Playtest note: the elapsed `mm:ss` in the log header is confusing and spoils the coming night; replace it with qualitative light-state copy.
- Playtest note: `Life I` feels awkward in the top header; move log-entry framing down to the log panel and call it `Entry I`.
- Playtest note: remove the `Playable slice / Forgotten Cycle` top header; make the top panel about the player and move the log to the right column.
- Playtest note: `Get Your Bearings` should stay useful after the first discovery; try a repeatable action level that grants small exposure-handling benefits.
- Playtest note: action levels should reset on death like A Usual Idle Life / Idle Reincarnator, while the highest level ever reached gives a persistent +10% bonus per level.
- Playtest note: mastery bonuses should not apply inside the same entry where the max level was earned; they should turn on next entry.
- Playtest note: progressive condition readouts feel better; `Get Your Bearings` Lv 1 should unlock the Light readout in the Body panel.
- Playtest note: `Scavenge the Tide-Line` and `Tend the Fire` also need action levels and next-entry mastery, so all core actions follow the same idle progression language.
- Playtest note: the first reset needs a stronger Groundhog Day snap; add a repeated sensory anchor, phantom-memory death copy, and a small prediction beat on waking.
- Playtest note: let the first life start under warm late sun, then warn through sunset before night makes fire necessary.
- Playtest note: separate Wood from Warmth; the sun and fire should warm the player, while scavenging only stocks wood for the fire.
