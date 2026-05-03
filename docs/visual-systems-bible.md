# Visual And Systems Bible

Last ingested: 2026-05-02

This document captures Robert's Gemini research on visual identity, screen structure, and longer-term systems inspiration. Use it as a design reference, not as permission to expand the current prototype beyond small playtestable passes.

## Current Use

For the active prototype, this bible mainly informs:

- copy tone
- panel labels
- action-row layout
- future UI direction
- how to avoid generic mobile-app feeling

The current build should still validate the shoreline death loop before adding tabs, factions, dungeons, routines, or broad survival systems.

## UI Paradigm: Navigator Logbook

The interface should feel like a physical artifact rather than a generic dashboard.

Working metaphor:

> A Sun-Priest's Navigator Log, washed in salt, marked by repeated lives, and slowly filled in by remembered routes.

Visual material directions:

- weathered parchment
- stone tablets
- dark-rose wood
- sun disk motifs
- nautical instruments
- hand-marked log entries
- vine or carved-stone borders

Avoid:

- generic app-card copy
- sterile dashboard phrasing
- modern productivity wording such as "choose what this life does"

## Palette Direction

Use these as long-term palette families, not all at once.

### Surface / Sun Empire

- deep gold
- emerald green
- brilliant amber
- warm stone

### Legion / Dusk

- midnight black
- crimson
- baroque silver
- dark rosewood

### Core / Cosmium

- obsidian
- luminescent blue
- neon cyan
- cold mineral light

## Screen Structure Reference

The long-term UI can borrow from Your Chronicle's category model while keeping Idle Reincarnator's reincarnation loop front and center.

Potential persistent tabs:

- `Action`: main interaction hub
- `Party` or `Bestiary`: recruited creatures, companions, or researched beings
- `Routine`: recurring habits, offline loops, passive growth
- `Chronicle`: ending tracker and major life-path record
- `Logbook`: permanent discoveries, map notes, languages, and story fragments

For the current prototype, only the `Action` idea is active.

## Action Categories

Future action rows may fall into these categories:

| Category | Thematic Equivalent | Behavior |
| --- | --- | --- |
| Instant | Scavenge, Triage, Sacrifice | Immediate resource gain or stat change |
| Loop | Training, Cartography, Ritual | Consumes time or resources, fills over seconds |
| Upgrade | The First Ember, Unlock Orazca analog | Limited-completion milestone |
| Next | Voyage West, Dive into Core | Progression gate to new areas or systems |
| Dungeon | Jungle Delve, Ancient Crypt | Automated danger/combat/research loop |

Current rows:

- `Get Your Bearings`: loop-style discovery/observe action
- `Scavenge the Tide-Line`: loop-style survival action

## Lifecycle And Mortality

Long-term friction should come from lifespan, wellness, exposure, and exhaustion rather than a simple countdown.

Reference recurrence:

```text
M_next = M_current * (1 + R / W)
```

Where:

- `M` is mortality pressure.
- `R` is base environmental hazard.
- `W` is wellness or lifestyle protection.

Current prototype translation:

- only Warmth is active
- Thirst and Food may appear as dormant condition placeholders
- do not add multi-resource survival until Warmth and death payout feel good

## Exploration And Knowledge Gating

Long-term progression should use knowledge gates:

- visible landmarks that cannot be understood yet
- language barriers
- cartography thresholds
- route knowledge
- danger reduction through training, equipment, or remembered paths

Loop shape:

1. Discover a place or pattern.
2. Study or train enough to understand it.
3. Die and return faster.
4. Reach the gate with better multipliers.
5. Reveal a new system, story fragment, or route.

## Prestige And Persistence

Future persistence layers:

- Rebirth / Ancestral Favor: ordinary death payout
- Regression / Temporal Essence: deep reset after major discoveries
- Ancestral Logbook: permanent record that never resets

For current UI copy, prefer reincarnation/logbook language:

- `Life I`, `Life II`, etc.
- `Log Entry`
- `First Night`
- elapsed survival time
- remembered practical lessons

Avoid bare labels like `Cycle 2` if they make the fiction feel too mechanical.

## Mid-Game Wall

The future mid-game can use Administration or Expedition Logistics as a deliberate wall:

- paperwork drains gold
- passive income from Investing becomes necessary
- bureaucratic mastery unlocks larger expeditions

This is not part of the first prototype.

## Near-Term Copy Guidance

Prefer:

- `Shore Actions`
- `Log Entry`
- `Life I`
- `First Night`
- `Current: reading the shore`
- `Current: scavenging fuel`
- `Condition`
- `Body`

Avoid:

- `Choose what this life does`
- `Cycle 2`
- generic "task" or "job" labels too early
- calendar dates before the world has a meaningful calendar

