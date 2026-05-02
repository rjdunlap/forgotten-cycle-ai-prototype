export const MAX_WARMTH = 100;
export const STARTING_WARMTH = 45;
export const COLD_RATE = 7;
export const BASE_SCAVENGE_TIME = 2.4;
export const BASE_WARMTH_FOUND = 9;
export const FUEL_RECOGNITION_TIME_BONUS = 0.25;
export const FUEL_RECOGNITION_WARMTH_BONUS = 2;
export const COLD_FAMILIARITY_RATE_BONUS = 0.02;
export const MAX_COLD_FAMILIARITY_BONUS = 0.12;

export interface GameState {
  cycle: number;
  innerWarmth: number;
  foundWood: number;
  searchProgress: number;
  coastalKnowledge: number;
  timeAlive: number;
  alive: boolean;
  fuelRecognition: number;
  coldFamiliarity: number;
}

export function createGameState(): GameState {
  return {
    cycle: 1,
    innerWarmth: STARTING_WARMTH,
    foundWood: 0,
    searchProgress: 0,
    coastalKnowledge: 0,
    timeAlive: 0,
    alive: true,
    fuelRecognition: 0,
    coldFamiliarity: 0
  };
}

export function getScavengeTime(state: GameState): number {
  return Math.max(1.1, BASE_SCAVENGE_TIME - state.fuelRecognition * FUEL_RECOGNITION_TIME_BONUS);
}

export function getWarmthFound(state: GameState): number {
  return BASE_WARMTH_FOUND + state.fuelRecognition * FUEL_RECOGNITION_WARMTH_BONUS;
}

export function getColdRate(state: GameState): number {
  const familiarityBonus = Math.min(
    MAX_COLD_FAMILIARITY_BONUS,
    state.coldFamiliarity * COLD_FAMILIARITY_RATE_BONUS
  );

  return COLD_RATE * (1 - familiarityBonus);
}

export function runTick(state: GameState, seconds = 1, isScavenging = true): GameState {
  if (!state.alive) return state;

  let foundWood = state.foundWood;
  let searchProgress = state.searchProgress;
  let innerWarmth = state.innerWarmth - getColdRate(state) * seconds;
  const scavengeTime = getScavengeTime(state);

  if (isScavenging) {
    searchProgress += seconds;
    while (searchProgress >= scavengeTime) {
      searchProgress -= scavengeTime;
      foundWood += 1;
      innerWarmth = Math.min(MAX_WARMTH, innerWarmth + getWarmthFound(state));
    }
  }

  return {
    ...state,
    innerWarmth: Math.max(0, innerWarmth),
    foundWood,
    searchProgress,
    coastalKnowledge: state.coastalKnowledge + (isScavenging ? seconds : 0),
    timeAlive: state.timeAlive + seconds,
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
    coastalKnowledge: 0,
    timeAlive: 0,
    alive: true,
    fuelRecognition: state.fuelRecognition + 1,
    coldFamiliarity: state.coldFamiliarity + 1
  };
}
