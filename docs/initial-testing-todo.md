# Initial Testing Todo

Last updated: 2026-05-03

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

Use [a-dark-room-reference.md](a-dark-room-reference.md) as the feel bible for the early coast: one action first, sparse interface, sensory copy, earned reveal, fire as emotional center, and death as a useful uncanny payout.

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
- Unlock the first `Log Entry` at `Get Your Bearings` Lv 1, then move the Body/Light readout to Lv 2 so the first awareness step stays smaller.

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
- If the player keeps enough fire through the night, the light should cycle back into a new day instead of remaining night forever.
- On death, hide the stale play surface behind the death prompt so the player is not looking at old light/action state.
- Stretch the day rhythm toward a Minecraft-like read: at `1x`, a full in-game day is 24 real minutes, with night arriving late enough that the first entry starts at dawn and has time to breathe.
- Keep an internal seasonal calendar that begins near a mythic El Dorado winter/new-year window, then lengthens daylight toward spring equinox and summer solstice. Do not expose the calendar UI yet; use it as scaffolding for future repeating events that occur in the same seasonal windows each cycle.
- Make survival feel broader than warmth alone. Keep Warmth as the only active death meter for now, but stage future danger through jungle-noise log entries that rise after dark and are held back by fire.
- Reframe night and death copy so darkness suggests predation, jungle noise, and large animals testing the firelight, not only cold exposure.
- Add `Thirst` and `Food` as real body meters. They drain more slowly than Warmth and can end an entry, but there are no refill actions yet.
- Flatten the Body panel so Warmth, Thirst, and Food have equal visual weight under `Vitals`; keep Wood and Fire under `Supplies` so future resources have room to join without making Warmth dominate the UI.
- Superseded direction: visible `Exposure` read as a one-ended danger meter, but hot and cold need opposite ends. Use `Body Temp` instead, while heat still increases thirst drain and cold still increases food drain.
- Start disoriented: only `Get Your Bearings` is visible at first. Bearings Lv 1 reveals the Log Entry; Bearings Lv 2 reveals Body/Light and the fuel loop; Bearings Lv 3 reveals Thirst and Food.
- Soften the Bearings Lv 1 reveal: show Wood once fuel is understood, but hide Fire and `Tend the Fire` until the player actually has wood or an existing fire.
- Push the first log-entry clarity into Bearings Lv 1. Move the fuel loop to Bearings Lv 2 and slower body needs to Bearings Lv 3 so each awareness step is smaller.
- Hide the Log Entry panel itself before Bearings Lv 1; the opening screen should be only the first action until the character can form a coherent entry.
- Replace the one-ended Exposure danger meter with centered `Body Temp`: starts at 50 steady, yellow from 30-70, blue below 30 for cold, red above 70 for heat, and can kill at either end.
- Revealing `Scavenge the Tide-Line` should not auto-select it. Stay on `Get Your Bearings` until the player chooses to switch actions.
- Add a `Pause` speed for playtest reading and inspection.
- Make `Get Your Bearings` log one message per completed loop, with reveal-level messages replacing stacked generic messages.
- Keep the pre-log opening shell compact so the future log column does not reserve empty background space before the player has formed an entry.
- Show action XP as progress within the current level, not total XP against the next square threshold. Example: Lv 2 starts at `0/5`, not `4/9`.
- Rotate repeat `Get Your Bearings` completion log text so repeated loops do not stack identical entries.
- Let early tide-line copy imply shipwreck salvage without stating the backstory outright. Worked planks, rope fiber, crate corners, pitch, and bent nails can explain why Wood and later Supplies come from this shore.
- Later candidate: let repeated salvage reveal small non-persistent supply discoveries or log fragments from the wreckage, so the shoreline tells how the player arrived before it becomes a full inventory system.
- Split place discovery from salvage: `Get Your Bearings` should reveal places and routes; `Scavenge the Wreckage` should own wreckage/plank/crate/rope flavor.
- Use Shore Sense Lv 3/Lv 4 to reveal inert place hooks like `Explore the Tide-Line` and `Watch the Jungle Line`, then activate those as future small passes.
- Make action levels player-facing by action name. Show `Get Your Bearings Lv X` rather than a separate `Shore Sense` skill, and delay XP/mastery math until later Bearings levels make that kind of system readout feel earned.
- Put early action levels adjacent to the action title, such as `Get Your Bearings - Lv 1`, while keeping the detail line narrative. Push XP/mastery readouts closer to Lv 10.
- Move Light unlock to `Get Your Bearings` Lv 2.
- Use `Get Your Bearings` Lv 10 as the global system-readout gate. Before then, all action detail lines should stay narrative and avoid XP, timings, output rates, and mastery math.
- Keep early Body readouts qualitative until the system-readout gate: words like `shivering`, `dry`, and `thin` should appear before bars or exact values.
- Removed early countdown seconds from `Get Your Bearings` detail copy so the opening timer feels like waiting and perception, not exposed system math.
- Added a small `Raise a Windbreak` pass: wreckage wood can become a rough current-entry structure that softens both cold and heat without opening a broader shelter-building system yet.
- Tuned windbreak after playtest: one wood felt too cheap and too weak, so each build now needs a 3-wood bundle and gives stronger heat/cold protection.
- Tuned fire tending after playtest: partial tending progress now persists when switching away, while an existing fire's row keeps showing flame strength so clicking back does not visually pull the bar backward.
- Moved testing speed controls out of fixed bottom-left overlay and into normal page flow below the prototype so growing UI panels cannot hide or be hidden by them.
- Matched the outer page frame to the app's compact/expanded state so the speed controls align under the opening screen before the log entry appears.
- Converted inert place hooks into a small site navigation shell: Camp, Wreckage, Tide-Line, and Jungle Line are real places, actions filter by current site, and route buttons include return paths instead of disabled promises.
- Tuned respawn reveal flow: remembered max Bearings now speeds the next entry but does not keep log/body/sites/system readouts open; each wake must re-form perception through current-entry Bearings again.
- Added an early haze beat to the first coherent log/wake copy, borrowing the survival-confusion setup without adding a separate tutorial popup yet.
- Added a small tide-line needs pass: once Thirst and Food are legible, `Cup Seep Water` and `Gather Shore Food` restore those meters directly, while `Wade In` now hints that something lives under the surf and can very rarely end the cycle outright.
- Removed width tweening from action-row progress bars so fast action completion does not visibly rebound backward; vitals can still animate smoothly.

### Pass 5F: A Dark Room Opening Discipline

Status: candidate

Question:

> Does the opening feel like minimalist discovery rather than an exposed prototype dashboard?

Small change:

- Compare the first 60-90 seconds against `docs/a-dark-room-reference.md`.
- Confirm the first screen has one unmistakable action and no empty decorative panel.
- Confirm each visible panel appears because the character has perceived something.
- Keep the first fire as a felt boundary against night and jungle pressure, not merely a resource converter.

Test:

- Start a fresh Entry I at `1x`.
- Do not click ahead quickly; watch whether waiting creates curiosity or friction.
- Note the first moment where the UI feels too game-like, too numerical, or too explained.

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

### Pass 5G: Close to Death and Death Modals

Status: next

Question:

> Do modal interruptions at near-death and death make dying feel more like a narrative moment and less like a UI state change?

Small change:

- Add a **Close to Death** warning modal that pauses the game when any vital reaches a critical threshold. Dismiss to resume; the player still has a chance to recover.
- Replace the existing death popup with a **Death modal** that also pauses the game:
  - Copy: "You are nearing the end of your life. / You feel that you could have achieved much more. / Filled with unwillingness, you close your eyes, hoping to start over."
  - Single button: **REBIRTH**
- Add a **Deja Vu story popup** at the start of Entry II onward, before the first action is available:
  - Title: Deja Vu
  - Copy: "Even while remembering little, you seem to learn things faster than normal people. Strange. Also, you found a book in your pocket. It seems to be a journal of some sort."
  - Dismiss to continue playing.
- All modals sit over a darkened overlay that freezes the game tick; tick resumes on close.
- If Close to Death is showing and the vital hits zero, skip directly to the Death modal without stacking.

Test:

- Let a vital reach the critical threshold and confirm the Close to Death modal appears and pauses the game.
- Confirm the game resumes from the same state when the warning is dismissed.
- Let death occur and confirm the Death modal copy and REBIRTH button work correctly.
- Play into Entry II and confirm the Deja Vu popup appears once before the first action, then never again.
- Confirm Entry I has no Deja Vu popup.

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
