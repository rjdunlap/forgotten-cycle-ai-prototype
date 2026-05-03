# Forgotten Cycle AI Prototype Design Bible

Last updated: 2026-05-03

This document is the working handoff for future code/design sessions. It captures the current prototype direction, research notes, and decisions made so far. Treat it as a living design bible, not a locked specification.

## Project Frame

This repository is an AI-assisted prototype, separate from Robert's existing Forgotten Cycle project with a friend. It can borrow the working name and some thematic DNA, but its purpose is narrower: quickly test whether a reincarnation-style idle loop feels satisfying.

The current target is closer to Idle Reincarnator, A Usual Idle Life, and the opening feel of A Dark Room than to RuneScape or Melvor Idle. The first prototype should stay small enough to play, judge, and revise quickly.

## Collaboration Principles

- Pull before changing code.
- Push after each useful playable change.
- Favor human playtesting over test-driven ceremony during this exploration phase.
- Run quick sanity checks before pushing so GitHub Pages does not receive obviously broken code.
- Do not assume the earlier large GDD is correct. Treat it as hypothesis material.
- Ask before expanding systems.
- Validate one thing at a time.
- Keep changes small enough that Robert and collaborators can react to feel, pacing, and clarity.

## Current Playable Prototype

Live page: https://rjdunlap.github.io/forgotten-cycle-ai-prototype/

Repository: https://github.com/rjdunlap/forgotten-cycle-ai-prototype

Current slice: "The First Ember"

The player wakes on a strange coast with almost no interface at first. The first activity is `Get Your Bearings`, which gradually reveals the log entry, light, body state, wreckage, wood, fire, and slower body needs. The player scavenges the wreckage for wood, tends a fire, and tries to survive the night as body temperature, thirst, food, and jungle pressure become legible. Eventually the player dies from cold, heat, thirst, hunger, or the wider threat implied by the dark. Death opens a short wake-again popup, then the next entry starts with automatic adaptation.

This is testing one question:

> Does dying from exposure, remembering the coast, and surviving longer next life feel satisfying?

## Current Mechanics

- `Body Temp` starts steady at 50 out of 100, with cold danger below the comfort band and heat danger above it.
- The day cycle starts with dawn/daylight, moves through sunset, then into night.
- Sunlight and fire affect body temperature; cold, heat, thirst, and food drain rates are phase-aware.
- `Thirst` and `Food` are real body meters, but they reveal later than the first action so the opening does not become a dashboard immediately.
- The normal simulation pace is slowed down for feel, with `1x`, `5x`, and `10x` testing controls available in the lower-left corner.
- `Get Your Bearings` is the initial first-life activity.
- The log appears only after the player has enough orientation to form `Entry I`.
- Body, light, supplies, fire, thirst, food, and place hooks reveal through early Bearings levels.
- `Scavenge the Wreckage` becomes available after the player recognizes fuel and salvage signs.
- Scavenging collects `Wood`; it does not directly restore body temperature.
- `Tend the Fire` spends wood to strengthen the fire, and the fire pulls body temperature back toward steady during non-sunlit phases.
- Character condition is visually separated from activity choices.
- Body state appears in a side panel on desktop once the player has earned that readout.
- Available actions are shown as action rows with their own progress bars and active/idle/locked status.
- `Get Your Bearings`, `Scavenge the Wreckage`, and `Tend the Fire` each have current-entry action levels.
- Current-entry action levels reset on death, while max-ever mastery activates on the next entry.
- System math is delayed until later Bearings levels; early action details stay narrative.
- The same wake cue returns after death: three gull-cries and one broken wave.
- Death opens a short popup with time survived, wood found, and body-state ending.
- `Wake Again` starts a new cycle from that popup.
- Each death can improve remembered fuel recognition and cold familiarity.
- Visible memory currency and upgrade spending are intentionally hidden for now.

Current implementation files:

- `index.html`: one-screen prototype structure.
- `src/styles.css`: Tailwind input and small base styles imported by the TypeScript app entry.
- `src/game.ts`: tiny typed game state and loop logic.
- `src/app.ts`: typed UI binding and event log.
- `test/game.test.ts`: lightweight sanity tests retained from earlier work.
- `.github/workflows/pages.yml`: builds the TypeScript app and deploys `dist/` to GitHub Pages.

## Research Note: Reincarnation Loop

Robert provided the following research/design synthesis as a stronger direction for the first loop.

## A Dark Room Reference

Robert provided a deep ludonarrative analysis of `A Dark Room` as a reference for minimalist unfolding, action-timer pacing, sparse sensory copy, interface-as-story, and the firelit opening. That material has been ingested into [a-dark-room-reference.md](a-dark-room-reference.md).

Use it as the feel bible for the early coast. The goal is not to clone `A Dark Room`; the goal is to preserve the same disciplined unfolding:

- begin with one grounded action
- let panels appear because the character perceives more
- make fire emotionally central before it is economically optimized
- keep early copy clipped, sensory, and quiet
- make death a practical and uncanny payout

## Long-Horizon Research Ingest

Robert also provided a broader lifecycle-exploration design synthesis covering wellness/mortality, faction career ladders, cartographic discovery, knowledge gates, prestige layers, automation, and an eventual hollow-world arc. That material has been ingested into [lifecycle-exploration-research.md](lifecycle-exploration-research.md).

Use that file as the long-horizon reference when answering future design questions so the project does not drift into invented systems. It does not override the current prototype guardrail: keep "The First Ember" small until Robert explicitly asks to expand beyond the death-driven shoreline loop.

Visual and UI-system research from Gemini has been ingested into [visual-systems-bible.md](visual-systems-bible.md). Use it for copy tone, logbook framing, action-row categories, palette direction, and avoiding generic dashboard language.

### Genre Research

Idle Reincarnator and A Usual Idle Life share a prestige-loop structure where death is not game over. It is the payout phase.

Early play is about managing finite time, stamina, life force, or life duration. The player spends a life doing jobs, training, or skills until death. The next life is better because some form of experience, essence, memory, or multiplier persists.

The satisfying feeling is deja vu made mechanical:

- a task that took 30 seconds in Life 1 takes 20 seconds in Life 2
- the player feels smarter because the character is faster
- death becomes expected, useful, and emotionally recontextualized

### Coastal Survival Triage

In a coastal wash-up scenario, useful early survival priorities are:

- immediate triage: assess injury and get out of tide danger
- exposure: wet clothes, wind, and night cold are urgent
- shelter or windbreak: cliffs, dunes, rocks, fallen logs, treeline
- fire/fuel: dry brush, bark, pine needles, driftwood above the high-tide line
- scouting: learning where useful things are
- water: important soon, but less immediate than cold exposure in this first slice

For the prototype, cold should be the only real friction. The game should not become a full survival sim yet.

## Candidate Tiny Loops From Research

### Option A: Driftwood Loop

Sequence: Toggle or hold "Scour for Wood." Each useful find restores warmth.

Death: Fire/warmth fails and body heat reaches zero.

Persistence: Gathering efficiency or warmth gained from fuel improves.

Pros: Clear feedback loop.

Cons: Can feel like a standard clicker if not given enough discovery flavor.

### Option B: Windbreak Loop

Sequence: Move inland or seek shelter. Distance from spray/wind slows warmth loss.

Death: Heat reaches zero before reaching a safer place.

Persistence: movement speed or remembered route improves.

Pros: Gives spatial progression.

Cons: Harder to make satisfying on one static screen.

### Option C: Surveyor Loop

Sequence: Search the coast to build knowledge. Knowledge unlocks better passive survival.

Death: exposure/nightfall.

Persistence: familiarity or map knowledge persists.

Pros: Directly rewards learning.

Cons: May feel passive if there is no active survival pressure.

## Recommended First Loop

Use the Driftwood/Search loop, framed as "The First Ember."

Player goal:

> Find enough dry fuel to survive the first night's frost.

Prototype copy direction:

- Main action: `Scavenge the Tide-Line`
- Primary meter: `Inner Warmth`
- Persistent upgrade: automatic fuel recognition
- Death copy: "The tide claims the warmth. The dark is total."
- Reset button: `Wake Again`, shown in the death popup
- Log flavor:
  - "The sun is gone. Salt spray numbs your fingers."
  - "You find soggy driftwood. It smokes, but it burns."
  - "Dry pine needles hide under a stone lip."
  - "A cedar log waits just above the tide mark."
  - "You strip brittle bark from a fallen branch."

Why this works:

It replaces a task goal like "light the signal fire" with a survival state: maintain warmth. It makes wood a discovered lifeline rather than a generic currency. It tests the core loop in a playable way: do players care about surviving a little longer next life?

## Notes On What Went Wrong Earlier

The previous implementation moved too quickly from "death/reset should matter" into a generic timer and progress bar. "Signal fire" implied a heroic objective, but the intended early emotional state is vulnerability, cold, confusion, and hard-earned familiarity.

For the next few iterations, avoid language that makes the player feel competent too early. The first life should feel like:

- wet
- cold
- disoriented
- learning by dying
- finding small, practical advantages

## Open Playtest Questions

Use these after Robert or a collaborator tries the current page:

- Did death feel like a payout phase, or just a failure?
- Did Echoes of the Coast make the second life noticeably better?
- Is the Warmth drain too fast, too slow, or readable enough?
- Does Scavenge the Tide-Line feel like a meaningful action, or too passive?
- Should the player start with "Explore the Shore" before "Scavenge" is available?
- Should wood increase warmth instantly, slow warmth loss, or feed a separate ember/fire meter?
- Should the first persistent improvement be better fuel recognition, remembered location, or cold tolerance?

For a living menu of small testing passes, see [initial-testing-todo.md](initial-testing-todo.md).

## Likely Next Iterations

Keep these as small playtestable changes, not all at once.

1. Add an initial "Explore the Shore" action that discovers the tide-line fuel source.
2. Split fuel into "soggy driftwood" and "dry brush" only if the current loop feels too flat.
3. Add a simple "night gets colder" phase if the first minute lacks tension.
4. Compare whether fuel recognition should improve find speed, warmth value, or both.
5. Decide when the second meta layer should reveal Memory as a spendable currency.

## Things To Avoid For Now

- No factions.
- No companions.
- No combat.
- No town building.
- No large skill tree.
- No multi-resource survival sim.
- No origin/class system until the death loop is satisfying.
- No long GDD expansion before playtest feedback.

## Handoff Prompt For A New Code Session

```text
You are working on the Forgotten Cycle AI Prototype repo. This is a small GitHub Pages browser prototype for an idle/reincarnation RPG inspired primarily by Idle Reincarnator and A Usual Idle Life.

Before changing anything, read README.md and docs/design-bible.md. Pull before you work and push after useful playable changes.

Current design target: "The First Ember." The player wakes on a cold shore at night. Inner Warmth drains over time. The player scavenges the tide-line for dry fuel. They die from cold, see a short wake-again popup, and automatically remember the shore better next life. The goal is not to build a full survival game. The goal is to test whether dying from exposure, remembering the coast, and surviving longer next life feels satisfying.

Important process preference: do not force TDD for this exploratory phase. Human playtesting is the main validation loop. Still run lightweight sanity checks before pushing.

Do not expand into factions, companions, combat, towns, origins, or a broad skill tree unless Robert explicitly asks. Keep each change small, playable, and easy to react to.
```
