# Forgotten Cycle AI Prototype

This is a shared workspace for an AI-assisted idle RPG prototype being explored by Robert and collaborators.

It is intentionally separate from the existing Forgotten Cycle project. The working name and some ideas overlap, but this repo is for testing a smaller, loop-first direction inspired primarily by Idle Reincarnator.

No gameplay implementation has started yet. The first goal is to validate the core direction before expanding systems.

## Current Direction

- Treat the previous Game Design Document as draft material, not a locked foundation.
- Start with the loop and progression feel before designing factions, towns, companions, or lore-heavy systems.
- Aim closer to Idle Reincarnator than to a broad RuneScape/Melvor-style RPG.
- Build small playable tests before committing to large design structures.
- Keep this repository distinct from the existing Forgotten Cycle project.

## Initial AI Prompt

The following prompt started this AI-assisted design pass. It is preserved here so another programmer can understand the intended collaboration style and the draft context.

```text
You are helping a solo game developer (Robert) design and eventually build an idle RPG called Forgotten Cycle. A previous AI session produced a large, detailed Game Design Document. Robert's concern is that the design ran too far ahead without validating core direction first. Your job is to start slow.

Your operating principles for this engagement:

Do not assume the existing design is correct. Treat everything below as a draft hypothesis, not a foundation to build on.
Ask before designing. Before expanding any system, ask Robert what matters most to him about that system. Let his answers shape the design, not your best guess.
Validate before elaborating. When you propose something, present the simplest version first and ask if it resonates before going deeper.
One thing at a time. Do not design three systems when one is being discussed. Stay narrow until Robert signals he wants to expand.
Question the document. If something in the existing GDD seems over-engineered, contradictory, or unclear, flag it rather than carrying it forward uncritically.
Your first task is not to design - it is to understand. Start by asking Robert what he wants to revisit, what feels right, and what feels off about the existing work.


EXISTING GAME DESIGN DOCUMENT (DRAFT - TREAT AS HYPOTHESIS)
Game Identity

Title
Forgotten Cycle

Genre
Idle / Incremental RPG

Platforms
Mobile (primary), PC

Tone
Mysterious, foreboding, but ultimately hopeful

Core Hook
Player arrives as a castaway in a mysterious archipelago. Progress resets in loops, but knowledge, companions, and certain structures persist. The loop is not a mechanic to accept - it is a mystery to solve.

Thematic inspirations: Ixilan (Magic: The Gathering), One Piece, Melvor Idle, RuneScape


Narrative Premise
The player wakes on an unknown shore with no memory of how they arrived. The archipelago is beautiful but strange - ruins of civilisations that should not exist, locals who speak of a "tide that erases", and companions who seem to remember you from lives they shouldn't know about. Each loop, the world resets. Each loop, the player retains a little more. The endgame is understanding why the cycle exists and choosing whether to break it.


Core Loop (Macro Structure - 5 Phases)
This was designed as a five-phase arc across multiple runs:

Arrival - Castaway. No skills, no resources. Scouting and survival.
Survival - Labour unlocked. Fisher, Woodcutter, Miner, Deckhand, Porter.
Settlement - Faction relationships, town development begins, companions found.
Exploration - Deep island delving, ancient ruins, nautical exploration.
Confrontation - Endgame revelation, loop mechanic confronted narratively.

Each loop completes the arc faster. Persistence across loops (what carries over) was not fully defined.


Origins System (Earned, Not Chosen)
One of the more distinctive design decisions: players do not pick a class/origin at the start. Origins are unlocked through gameplay gate conditions - a combination of actions taken, factions cultivated, and loops completed.

Intended unlock ladder:

Origin: Scouting (pre-origin)
Unlock Condition (Draft): Default - available Loop 1

Origin: Labour (Fisher / Woodcutter / Miner / Deckhand / Porter)
Unlock Condition (Draft): Unlocks early Loop 1

Origin: Mercenary
Unlock Condition (Draft): Loop 2-3, combat milestones

Origin: Merchant
Unlock Condition (Draft): Loop 3-5, trade milestones

Origin: Captain
Unlock Condition (Draft): Loop 4-6, leadership + nautical milestones

Origin: Scholar
Unlock Condition (Draft): Loop 6-8, research + ruin milestones

Origin: Tide-Reader (hidden)
Unlock Condition (Draft): Loop 15+, combinatorial secret conditions

Design intent: Origins are earned through play and feel like identity discovery, not a menu selection. The hidden Tide-Reader is the reward for deep mastery.


Factions (Four + Implied More)

Faction: Colonial Port
Description: Maritime trade hub, mercantile, lawful-ish, European Age of Sail flavour

Faction: Pirate Cove
Description: Outlaw haven, volatile, high-risk high-reward

Faction: Native Settlement
Description: Indigenous inhabitants, deep knowledge of the archipelago and the cycle

Faction: Shipwreck Camp
Description: Fellow castaways, community-building, the player's earliest ally

Faction relationships were intended to be persistent across loops (or at least partially so). No faction system mechanics were formally designed.


Companion System (Sketch Only)
Companions were flagged as a major design pillar. Key intentions:

Companions have cross-loop memory - they remember previous runs, creating emotional continuity.
Each companion has their own arc tied to the cycle narrative.
Companions were noted as a differentiating feature vs. competitors.

No companion mechanics, stat systems, or recruitment flows were designed in detail.


World Design
The archipelago is a persistent cartographic world - POI (Point of Interest) locations do not change between loops. Only their state does.
Players accumulate a map across runs.
This was described as providing "cartographic continuity" and a sense of a real, accumulating world.
No specific islands, POIs, or exploration mechanics were formally designed.


Skills Architecture (Sketch)
A skill system was planned but not designed. Notes reference RuneScape and Melvor Idle as models. The intent was a large skill list with both combat and non-combat skills, with early skills (fishing, woodcutting, mining) accessible in Loop 1.


Town Development (Sketch)
Town building was listed as a core pillar. No mechanics were designed. Intent: players invest loop-over-loop resources into a persistent settlement that grows and changes visually.


Monetisation Philosophy (Principles Only)
No pay-to-win.
Cosmetics and quality-of-life, not power.
No energy timers or artificial friction.
Possibly a one-time "supporter" purchase.
No detailed model was designed.


UI Design (In Progress at End of Session)
The UI section (Section 12 of the GDD) was being drafted but not completed. Design references used:

Idle Reincarnator (Steam/Android by Ryuse) - primary UI reference.
A Usual Idle Life - secondary reference.

UI patterns noted from research:

2-column icon nav grid with notification badges.
Scrolling top ticker (activity log).
Card-grid job panels.
Explore cards with hero images, danger/reward metadata.
Automation panel with per-category toggles.
Story accordion.
Codex (persistent lore journal).
Cartographer's Chart (upgrade tree visual).


Technical Architecture (Claude Code Map - Sketch)
A 14-Epic implementation map was drafted for Claude Code. No code was written. Epics covered roughly: game loop engine, skills, factions, companions, world/map, town, combat, UI shell, persistence/save system, narrative/Codex, monetisation, settings, audio, and polish.


Competitive Context

Game: Melvor Idle
Notes: RuneScape-adjacent, deep skill tree, highly respected in the idle genre.

Game: RuneScape
Notes: Grandparent reference - skill breadth, quest narrative integration.

Game: Idle Reincarnator
Notes: Closest UI/loop reference - loop mechanic, idle automation, mobile-first.

Game: A Usual Idle Life
Notes: Casual idle reference.


Open Questions (Left Unresolved)
These were not answered in the previous session and are worth revisiting:

What exactly persists across loops? (Resources? Skills? Companions? Factions? Buildings?)
What does the "loop reset" feel like experientially? Is it abrupt? Ceremonial?
How does the player discover that they are in a loop? Is it gradual?
What is the actual win condition / endgame?
How long is a single loop intended to take? (Minutes? Hours? Days?)
What is the core idle loop - what happens when the player is not actively engaged?
How does combat work? Is it active, semi-idle, or fully idle?
What makes this game feel different from Melvor Idle or Idle Reincarnator in play, not just in concept?
What is the minimum playable version of this game?


SUGGESTED STARTING POINT FOR THE NEW AGENT
Rather than picking up where the old session left off, consider starting here:

"Before we go further on any of these systems - what does a successful version of this game feel like to you? If you played it for an hour, what would you want to have experienced?"

Then work backwards from Robert's answer to figure out which parts of the existing design actually serve that vision, and which parts were designed for their own sake.
```

## Follow-up Clarifications

After the initial prompt, Robert clarified:

```text
Myself and a friend already had a project called Forgotten Cycle. This is a bit of a test of using AI to create a project. The scope and aim are a bit different since we want it to be more of those two games referenced.
```

When asked which referenced game was the main direction, Robert clarified:

```text
Idle Reincarnator
```

## First Design Constraint

Before adding systems, validate what part of Idle Reincarnator this prototype should capture:

- repeated-life acceleration
- class/job unlocks
- automation
- compact UI flow
- discovering better routes
- another specific feeling Robert identifies
