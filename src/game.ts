export const MAX_WARMTH = 100;
export const STARTING_WARMTH = 45;
export const COLD_RATE = 7;
export const SUN_WARM_RATE = 5;
export const DAYLIGHT_END = 18;
export const SUNSET_END = 30;
export const BASE_SCAVENGE_TIME = 2.4;
export const BEARINGS_TIME = 3.5;
export const BASE_WOOD_FOUND = 1;
export const TEND_FIRE_TIME = 2.8;
export const FIRE_FROM_WOOD = 28;
export const FIRE_DECAY_RATE = 3.2;
export const FIRE_WARM_RATE = 8;
export const FUEL_RECOGNITION_TIME_BONUS = 0.25;
export const COLD_FAMILIARITY_RATE_BONUS = 0.02;
export const MAX_COLD_FAMILIARITY_BONUS = 0.12;
export const SHORE_SENSE_COLD_RATE_BONUS = 0.015;
export const MAX_SHORE_SENSE_COLD_RATE_BONUS = 0.1;
export const SHORE_SENSE_BEARINGS_TIME_BONUS = 0.12;
export const ACTION_MASTERY_BONUS = 0.1;
export const SCAVENGE_LEVEL_TIME_BONUS = 0.08;
export const FIREKEEPING_LEVEL_TIME_BONUS = 0.1;
export const SUNSET_SCAVENGE_EFFICIENCY = 0.65;
export const NIGHT_SCAVENGE_EFFICIENCY = 0.35;

export type Activity = "orienting" | "scavenging" | "tending";
export type ExposurePhase = "sunlit" | "sunset" | "night";

export interface GameState {
  cycle: number;
  innerWarmth: number;
  foundWood: number;
  searchProgress: number;
  fireProgress: number;
  fireStrength: number;
  bearingsProgress: number;
  coastalKnowledge: number;
  shoreSenseXp: number;
  maxShoreSenseLevel: number;
  activeShoreSenseMasteryLevel: number;
  scavengeXp: number;
  maxScavengeLevel: number;
  activeScavengeMasteryLevel: number;
  firekeepingXp: number;
  maxFirekeepingLevel: number;
  activeFirekeepingMasteryLevel: number;
  timeAlive: number;
  alive: boolean;
  fuelSourceKnown: boolean;
  fuelRecognition: number;
  coldFamiliarity: number;
}

export function createGameState(): GameState {
  return {
    cycle: 1,
    innerWarmth: STARTING_WARMTH,
    foundWood: 0,
    searchProgress: 0,
    fireProgress: 0,
    fireStrength: 0,
    bearingsProgress: 0,
    coastalKnowledge: 0,
    shoreSenseXp: 0,
    maxShoreSenseLevel: 0,
    activeShoreSenseMasteryLevel: 0,
    scavengeXp: 0,
    maxScavengeLevel: 0,
    activeScavengeMasteryLevel: 0,
    firekeepingXp: 0,
    maxFirekeepingLevel: 0,
    activeFirekeepingMasteryLevel: 0,
    timeAlive: 0,
    alive: true,
    fuelSourceKnown: false,
    fuelRecognition: 0,
    coldFamiliarity: 0
  };
}

export function getScavengeTime(state: GameState): number {
  const levelBonus = getScavengeLevel(state) * SCAVENGE_LEVEL_TIME_BONUS;
  return Math.max(1.1, BASE_SCAVENGE_TIME - state.fuelRecognition * FUEL_RECOGNITION_TIME_BONUS - levelBonus);
}

export function getWoodFound(_state: GameState): number {
  return BASE_WOOD_FOUND;
}

export function getActionLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp));
}

export function getNextActionXp(level: number): number {
  return (level + 1) ** 2;
}

export function getShoreSenseLevel(state: GameState): number {
  return getActionLevel(state.shoreSenseXp);
}

export function getNextShoreSenseXp(state: GameState): number {
  return getNextActionXp(getShoreSenseLevel(state));
}

export function getBearingsTime(state: GameState): number {
  const levelBonus = getShoreSenseLevel(state) * SHORE_SENSE_BEARINGS_TIME_BONUS;
  return Math.max(2.2, BEARINGS_TIME - levelBonus);
}

export function getShoreSenseMasteryBonus(state: GameState): number {
  return state.activeShoreSenseMasteryLevel * ACTION_MASTERY_BONUS;
}

export function getScavengeLevel(state: GameState): number {
  return getActionLevel(state.scavengeXp);
}

export function getNextScavengeXp(state: GameState): number {
  return getNextActionXp(getScavengeLevel(state));
}

export function getScavengeMasteryBonus(state: GameState): number {
  return state.activeScavengeMasteryLevel * ACTION_MASTERY_BONUS;
}

export function getFirekeepingLevel(state: GameState): number {
  return getActionLevel(state.firekeepingXp);
}

export function getNextFirekeepingXp(state: GameState): number {
  return getNextActionXp(getFirekeepingLevel(state));
}

export function getFirekeepingMasteryBonus(state: GameState): number {
  return state.activeFirekeepingMasteryLevel * ACTION_MASTERY_BONUS;
}

export function getTendFireTime(state: GameState): number {
  return Math.max(1.2, TEND_FIRE_TIME - getFirekeepingLevel(state) * FIREKEEPING_LEVEL_TIME_BONUS);
}

export function hasLightReadout(state: GameState): boolean {
  return getShoreSenseLevel(state) >= 1 || state.maxShoreSenseLevel >= 1;
}

export function getExposurePhase(state: GameState): ExposurePhase {
  if (state.timeAlive < DAYLIGHT_END) return "sunlit";
  if (state.timeAlive < SUNSET_END) return "sunset";
  return "night";
}

export function getColdRate(state: GameState): number {
  const phase = getExposurePhase(state);
  const phaseMultiplier = phase === "sunlit" ? 0 : phase === "sunset" ? 0.35 : 1;
  const familiarityBonus = Math.min(
    MAX_COLD_FAMILIARITY_BONUS,
    state.coldFamiliarity * COLD_FAMILIARITY_RATE_BONUS
  );
  const shoreSenseBonus = Math.min(
    MAX_SHORE_SENSE_COLD_RATE_BONUS,
    getShoreSenseLevel(state) * SHORE_SENSE_COLD_RATE_BONUS
  );

  return COLD_RATE * phaseMultiplier * (1 - familiarityBonus - shoreSenseBonus);
}

export function getSunWarmRate(state: GameState): number {
  return getExposurePhase(state) === "sunlit" ? SUN_WARM_RATE : 0;
}

export function getFireWarmRate(state: GameState): number {
  return state.fireStrength > 0 ? FIRE_WARM_RATE : 0;
}

export function getScavengeLightEfficiency(state: GameState): number {
  const phase = getExposurePhase(state);
  if (phase === "sunlit") return 1;
  if (phase === "sunset") return SUNSET_SCAVENGE_EFFICIENCY;
  return NIGHT_SCAVENGE_EFFICIENCY;
}

export function runTick(state: GameState, seconds = 1, activity: Activity = "scavenging"): GameState {
  if (!state.alive) return state;

  let foundWood = state.foundWood;
  let searchProgress = state.searchProgress;
  let fireProgress = state.fireProgress;
  let fireStrength = Math.max(0, state.fireStrength - FIRE_DECAY_RATE * seconds);
  let bearingsProgress = state.bearingsProgress;
  let shoreSenseXp = state.shoreSenseXp;
  let maxShoreSenseLevel = state.maxShoreSenseLevel;
  let scavengeXp = state.scavengeXp;
  let maxScavengeLevel = state.maxScavengeLevel;
  let firekeepingXp = state.firekeepingXp;
  let maxFirekeepingLevel = state.maxFirekeepingLevel;
  let fuelSourceKnown = state.fuelSourceKnown;
  let innerWarmth = state.innerWarmth - getColdRate(state) * seconds;
  innerWarmth = Math.min(MAX_WARMTH, innerWarmth + getSunWarmRate(state) * seconds);
  if (state.fireStrength > 0) {
    innerWarmth = Math.min(MAX_WARMTH, innerWarmth + getFireWarmRate(state) * seconds);
  }
  const scavengeTime = getScavengeTime(state);
  const bearingsTime = getBearingsTime(state);

  if (activity === "orienting") {
    bearingsProgress += seconds * (1 + getShoreSenseMasteryBonus(state));
    while (bearingsProgress >= bearingsTime) {
      bearingsProgress -= bearingsTime;
      shoreSenseXp += 1;
      maxShoreSenseLevel = Math.max(maxShoreSenseLevel, Math.floor(Math.sqrt(shoreSenseXp)));
      fuelSourceKnown = true;
    }
  }

  if (activity === "scavenging" && fuelSourceKnown) {
    searchProgress += seconds * (1 + getScavengeMasteryBonus(state)) * getScavengeLightEfficiency(state);
    while (searchProgress >= scavengeTime) {
      searchProgress -= scavengeTime;
      foundWood += getWoodFound(state);
      scavengeXp += 1;
      maxScavengeLevel = Math.max(maxScavengeLevel, getActionLevel(scavengeXp));
    }
  }

  const tendFireTime = getTendFireTime(state);
  if (activity === "tending" && foundWood >= 1) {
    fireProgress += seconds * (1 + getFirekeepingMasteryBonus(state));
    while (fireProgress >= tendFireTime && foundWood >= 1) {
      fireProgress -= tendFireTime;
      foundWood -= 1;
      fireStrength = Math.min(MAX_WARMTH, fireStrength + FIRE_FROM_WOOD);
      firekeepingXp += 1;
      maxFirekeepingLevel = Math.max(maxFirekeepingLevel, getActionLevel(firekeepingXp));
    }
  } else if (activity !== "tending") {
    fireProgress = 0;
  }

  return {
    ...state,
    innerWarmth: Math.max(0, innerWarmth),
    foundWood,
    searchProgress,
    fireProgress,
    fireStrength,
    bearingsProgress,
    shoreSenseXp,
    maxShoreSenseLevel,
    scavengeXp,
    maxScavengeLevel,
    firekeepingXp,
    maxFirekeepingLevel,
    coastalKnowledge: state.coastalKnowledge + seconds,
    timeAlive: state.timeAlive + seconds,
    fuelSourceKnown,
    alive: innerWarmth > 0
  };
}

export function canReset(state: GameState): boolean {
  return !state.alive;
}

export function resetCycle(state: GameState): GameState {
  if (!canReset(state)) return state;

  return {
    ...state,
    cycle: state.cycle + 1,
    innerWarmth: STARTING_WARMTH,
    foundWood: 0,
    searchProgress: 0,
    fireProgress: 0,
    fireStrength: 0,
    bearingsProgress: 0,
    coastalKnowledge: 0,
    shoreSenseXp: 0,
    activeShoreSenseMasteryLevel: state.maxShoreSenseLevel,
    scavengeXp: 0,
    activeScavengeMasteryLevel: state.maxScavengeLevel,
    firekeepingXp: 0,
    activeFirekeepingMasteryLevel: state.maxFirekeepingLevel,
    timeAlive: 0,
    alive: true,
    fuelSourceKnown: state.fuelSourceKnown,
    fuelRecognition: state.fuelRecognition + (state.fuelSourceKnown ? 1 : 0),
    coldFamiliarity: state.coldFamiliarity + 1
  };
}
