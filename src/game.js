export const LIFE_GOAL = 10;

export function createGameState() {
  return {
    cycle: 1,
    progress: 0,
    memories: 0,
    upgrades: 0
  };
}

export function runTick(state, seconds = 1) {
  const progressRate = 1 + state.upgrades;
  return {
    ...state,
    progress: Math.min(LIFE_GOAL, state.progress + seconds * progressRate)
  };
}

export function canReset(state) {
  return state.progress >= LIFE_GOAL;
}

export function resetCycle(state) {
  if (!canReset(state)) return state;

  return {
    ...state,
    cycle: state.cycle + 1,
    progress: 0,
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
