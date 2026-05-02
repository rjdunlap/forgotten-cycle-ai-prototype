export const STARTING_LIFESPAN = 10;

export function createGameState() {
  return {
    cycle: 1,
    survivalXp: 0,
    timeAlive: 0,
    lifespan: STARTING_LIFESPAN,
    alive: true,
    memories: 0,
    upgrades: 0
  };
}

export function runTick(state, seconds = 1) {
  if (!state.alive) return state;

  const survivalRate = 1 + state.upgrades;
  const timeAlive = Math.min(state.lifespan, state.timeAlive + seconds);

  return {
    ...state,
    timeAlive,
    survivalXp: state.survivalXp + seconds * survivalRate,
    alive: timeAlive < state.lifespan
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
    survivalXp: 0,
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
