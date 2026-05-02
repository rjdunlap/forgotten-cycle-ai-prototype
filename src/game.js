export const MAX_WARMTH = 100;
export const STARTING_WARMTH = 45;
export const COLD_RATE = 7;
export const BASE_SCAVENGE_TIME = 2.4;
export const BASE_WARMTH_FOUND = 9;

export function createGameState() {
  return {
    cycle: 1,
    innerWarmth: STARTING_WARMTH,
    foundWood: 0,
    searchProgress: 0,
    coastalKnowledge: 0,
    timeAlive: 0,
    alive: true,
    memories: 0,
    upgrades: 0
  };
}

export function getScavengeTime(state) {
  return Math.max(1.1, BASE_SCAVENGE_TIME - state.upgrades * 0.25);
}

export function getWarmthFound(state) {
  return BASE_WARMTH_FOUND + state.upgrades * 5;
}

export function runTick(state, seconds = 1, isScavenging = true) {
  if (!state.alive) return state;

  let foundWood = state.foundWood;
  let searchProgress = state.searchProgress;
  let innerWarmth = state.innerWarmth - COLD_RATE * seconds;
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

export function canReset(state) {
  return !state.alive;
}

export function resetCycle(state) {
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
    memories: state.memories + 1
  };
}

export function buyUpgrade(state) {
  if (state.memories < 1) return state;

  return {
    ...state,
    memories: state.memories - 1,
    upgrades: state.upgrades + 1
  };
}
