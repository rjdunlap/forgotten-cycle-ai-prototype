# Lifecycle Exploration Research Reference

Last ingested: 2026-05-02

This document captures Robert's pasted deep research for the Ixalan-inspired exploration incremental. It is a long-horizon reference for future design and implementation sessions, not an instruction to immediately expand the current first playable slice.

Use this document to answer project questions from known project context instead of inventing new systems. If a future idea is not grounded here, in `docs/design-bible.md`, or in explicit user direction, label it as a proposal.

## Status And Scope

- Source status: user-provided research synthesis.
- Verification status: not independently fact-checked against official Magic: The Gathering lore.
- Current prototype status: the playable build should still focus on "The First Ember" until Robert asks to expand.
- IP caution: Ixalan names and Magic-specific terms are useful as inspiration and research shorthand. If this becomes a public commercial direction, convert faction, deity, place, and species names into original equivalents.

## Core Concept

The project direction is an incremental lifecycle exploration game that combines:

- A Usual Idle Life style mortality, wellness, job progression, and life planning.
- Idle Reincarnator style exploration, repeated-life acceleration, automation, and layered prestige.
- Age of Exploration themes: cartography, expeditions, factional patronage, linguistic barriers, and discovery.
- Ixalan-inspired fantasy: jungle empires, vampiric conquistadors, pirates, merfolk, dinosaurs, cosmium, underground cities, and hollow-world revelation.

The key fantasy is not only "numbers go up." It is a generational saga where each life maps more of a dangerous world, deciphers more of its hidden systems, and hands permanent knowledge to descendants through an Ancestral Logbook.

## Primary Design Pillars

### Ancestral Logbook

The Logbook is the project's most important persistence layer. It stores:

- explored map hexes
- story fragments
- landmark discoveries
- linguistic fluencies
- knowledge-gate unlocks
- route knowledge and hidden relationships between places

The Logbook is not just a menu. It is both a meta-progression layer and a thematic UI frame. It should make the player feel that deaths reset a life, but not the lineage's understanding.

### Factional Career Ladder

Careers and unlocks eventually depend on alignment with competing factions. Factions should alter strategy, not just flavor. Faction choice can change:

- available jobs
- lifestyle upgrades
- vehicles and companions
- exploration safety
- knowledge-gate efficiency
- late-game technologies
- prestige strategy

### Mortality Management

Lives are limited by mortality and wellness rather than by a generic run timer. The player chooses between earning, training, exploring, investing, and buying lifestyle upgrades that extend the life.

The interesting tension:

> Spend now to move faster, or spend now to live longer and reach better work, deeper routes, and higher exploration tiers.

### Hollow World Discovery

Late game shifts from surface exploration into the Core or hollow world. This unlocks a second layer of prestige and changes the main resource economy from ordinary wealth and survival into cosmium, temporal essence, divinity, or equivalent original names.

## Core Loop

A full long-term loop should eventually look like:

1. Begin a life with inherited knowledge and some permanent bonuses.
2. Choose an early survival, work, training, or faction plan.
3. Earn money, train skills, and buy lifestyle upgrades to suppress mortality.
4. Use the longer life to unlock careers, routes, languages, or expedition capabilities.
5. Explore hexes, uncover landmarks, and add findings to the Logbook.
6. Hit a wall: death, danger, bureaucracy, language, or insufficient lifespan.
7. Rebirth converts the life into Ancestral Favor and permanent knowledge.
8. Later, major discoveries unlock Regression and deeper prestige.

## Wellness And Mortality Engine

Wellness is the counter-pressure against mortality growth. High wellness early in a life should matter more than high wellness late, because early mortality compounding affects the whole run.

Suggested recurrence:

```text
M_next = M_current * (1 + R / W)
```

Where:

- `M` is mortality pressure.
- `R` is the base decay or aging rate.
- `W` is total wellness from lifestyle categories and related bonuses.
- death occurs when mortality or a related risk reaches its terminal threshold.

Design implication:

- Early poverty and low wellness should visibly shorten the run.
- Lifestyle spending is not cosmetic. It is a lifespan multiplier.
- Bargaining and Charisma style skills are powerful because they make all lifestyle upgrades cheaper.

### Lifestyle Categories

Use these categories as reference, with names rewritten if needed:

| Category | Basic Surface | Imperial / Sun Empire | Vampiric / Legion | Core / Ancient |
| --- | --- | --- | --- | --- |
| Sustenance | Salted Rations | Enchanted Maize | Exquisite Crimson | Sun-Infused Nectar |
| Shelter | Shared Hammock | Sun-Drenched Villa | Baroque Palace | Deep-God Cenote |
| Vessel | Outrigger | Blue-Water Frigate | Dusk-Rose Skyship | Cosmium-Engine Submersible |
| Companion | Cabin Boy | Sun-Priest Navigator | Blood-Cleric Scribe | Ancient One Guide |

## Faction Reference

These are long-horizon faction archetypes, not immediate implementation tasks.

### Sun Empire Archetype

Theme:

- jungle empire
- Threefold Sun inspired religion
- dinosaur mounts
- city-state politics
- merit, discipline, leadership, military prestige

Mechanical identity:

- strong overland exploration
- danger reduction in jungle zones
- leadership and discipline careers
- imperial funding for major construction
- late career target such as Seneschal of the Sun

Useful systems:

- dinosaur or equivalent mount as vehicle/lifestyle upgrade
- military service as career gate
- public works and expedition patronage as late-game spend

### Legion Of Dusk Archetype

Theme:

- vampiric conquistadors
- religious zeal
- immortal aristocracy
- naval power across a dangerous sea

Mechanical identity:

- sacrifice mechanic
- minimum lifespan floor in exchange for wellness penalties
- theological study and naval command careers
- reverse-engineering foreign technologies
- eventual Dawn Fleet style exploration engine

Useful systems:

- trade permanent wellness flexibility for run consistency
- build around death resistance, command, and sea routes
- risk of making high wellness tiers harder to reach

### Brazen Coalition Archetype

Theme:

- pirates
- floating haven
- volatile opportunity
- mobility and risk

Mechanical identity:

- highest gold generation
- high danger
- agility-gated survival
- fast routes, raids, smuggling, opportunistic exploration

Useful systems:

- lucrative but unstable jobs
- premature death risk if agility/defense is too low
- useful for players trying to brute-force lifestyle or investing thresholds

### River Heralds Archetype

Theme:

- merfolk
- secrecy
- nature knowledge
- protecting hidden sacred places

Mechanical identity:

- lower income
- knowledge-gate efficiency
- camouflage and nature meditation
- alternate win pressure: protect secrets rather than exploit them

Useful systems:

- permanent fluency or knowledge multipliers
- stealth exploration
- lower danger through avoidance rather than armor

## Exploration Matrix

Exploration should eventually be a hex-crawl with fog of war. Each zone has:

- danger level
- resource density
- story fragments
- route knowledge
- knowledge gates
- landmark relationships

Suggested zone reference:

| Zone Type | Base Danger | Primary Resources | Story Hook |
| --- | ---: | --- | --- |
| Jungle Surface | 5-15% | Timber, medicinal herbs | ruins from a prior age |
| Stormwreck Sea | 10-25% | Gold, exotic spices | pirate or fleet logs |
| Golden City / Orazca Analog | 20-40% | Cosmium, artifacts | immortal sun history |
| Deep Caverns | 30-60% | Rare minerals, fungi | mycotyrant origins |
| Core / Hollow World | 50-90% | Pure cosmium, divinity | cyclical-time secrets |

Danger should be overcome by a mix of:

- defense
- agility
- vehicles
- companions
- faction tools
- route knowledge
- language or ritual knowledge

## Knowledge Gating

Knowledge gates are a signature system. They replace simple stat gates with understanding gates.

Examples:

- A temple is visible in Life 1 but cannot be entered until Itzocan Script fluency reaches a threshold.
- A landmark appears useless until another story fragment explains its cycle timing.
- A route is dangerous until a faction teaches the correct season, tide, rite, or hidden path.

Design requirements:

- The player should see some future gates before they can solve them.
- Logbook progress should make old places newly meaningful.
- Multi-life linguistic research should feel like permanent map power.
- Unlock thresholds should create "aha" moments rather than only numerical permission checks.

## Career Progression

Career ladders follow the A Usual Idle Life model:

- low jobs unlock higher jobs
- higher jobs require skill thresholds
- training often costs money or time
- careers are constrained by lifespan

A key mid-game trap is the bureaucracy/paperwork wall.

### Expedition Logistics / Paperwork Trap

Administrative work is required for large expeditions, charters, imperial funding, and Core access, but it may produce poor or negative income. The player must prepare passive income before committing.

Design use:

- prevents mindless job climbing
- forces mastery of investing and bargaining
- marks the transition from laborer/mercenary into proprietor/governor/charter holder

### Passive Income

Investing is the bridge into late mid-game. Once investing is high enough, the player can fund lifestyle, bureaucracy, skill training, and exploration without staying in active labor.

Suggested milestone:

- Investing level 100 allows a life to focus mostly on skill research and exploration while wealth grows passively.

## Mathematical Foundations

These formulas are reference anchors, not final tuning.

### Upgrade Cost Scaling

Standard costs:

```text
C = C_base * r_g^n
```

Where `r_g` is typically around `1.07` to `1.15` for sustainable scaling.

Late prestige costs:

```text
C = b * 2^(a * (x - 1))
```

Use this for major walls such as Regression upgrades, not for ordinary early upgrades.

### Skill XP Curve

Suggested shape:

```text
Level = Constant * sqrt(XP)
```

This gives fast early drips and slow late progress. Motivation, concentration, memory, or faction multipliers can bend the curve without replacing it.

### Production Multipliers

Most bonuses should be multiplicative:

```text
P = (B * M_skill) * M_lifestyle * M_faction * M_prestige
```

Because multiplication is commutative, players can pursue bonuses in different orders. Lifestyle still has special strategic weight because it also extends the run.

## Prestige Layers

### Layer 1: Rebirth / Ancestral Favor

Triggered by death. Rewards should depend on:

- maximum earnings
- life duration
- hexes explored
- story fragments found
- meaningful firsts

Spend on:

- permanent skill-gain multipliers
- starting equipment
- small starting route advantages
- early automation

### Layer 2: Regression / Temporal Essence

Triggered by a major milestone such as reaching the Hollow Core or defeating a major boss analog. Resets most Ancestral Favor upgrades in exchange for deeper currency.

Spend on:

- temporal skills
- run-start compression
- structural automation
- world-cycle insight

Regression upgrades are more permanent than Rebirth upgrades.

### Layer 3: Ancestral Logbook / Knowledge Persistence

Never reset. Stores:

- map
- story fragments
- languages
- known gates
- discovered route logic
- historical/cycle clues

This is the non-currency prestige layer and likely the narrative win-condition tracker.

## Automation Ladder

Automation should unfold in phases:

1. Survivor: manual assignment and manual hex exploration.
2. Captain: auto-assign remembers preferred work/training balance between lives.
3. Governor: auto-learning picks efficient skill loops based on career requirements.
4. Emperor: exploration concurrency allows simultaneous exploration, jobs, and training.

Automation should be earned through play and make earlier lives compress, not disappear emotionally before the loop is satisfying.

## Narrative Arc

The long arc has a defined ending rather than infinite-only play.

Suggested shape:

- early lives: survival and shoreline familiarity
- surface expansion: map coast, jungle, factions, and first ruins
- factional phase: careers and ideological choices unlock different routes
- hidden city phase: major knowledge gates reveal old truths
- deep caverns: cosmium economy and underground ecology
- hollow core: cyclical time, ancient city, and final prestige layer
- ending: resolve faction conflict and the world's cycle

The ending should summarize the lineage's achievements across all lives. It is a reward for completing the Logbook, not only for reaching a number.

## Implementation Priorities From Research

When the prototype is ready to expand, prioritize in this order:

1. Robust wellness/lifespan tension.
2. Cartography as progression.
3. Knowledge gates that recontextualize old discoveries.
4. Bureaucracy/investing as a meaningful mid-game wall.
5. Faction careers only after the basic life loop and map loop feel good.
6. Markdown/Logbook UI as both help system and world-memory system.

## Guardrails For Future Answers

Future assistants should:

- use the current `docs/design-bible.md` for near-term prototype scope
- use this file for long-horizon systems, vocabulary, and math
- avoid inventing extra factions, resources, prestige layers, or lore unless clearly labeled as proposals
- avoid presenting Ixalan-specific names as original project canon without Robert confirming that direction
- ask before moving from "The First Ember" into factions, companions, combat, towns, origins, broad skill trees, or hollow-world content
- preserve death-driven lifecycle progression as the center of the game

