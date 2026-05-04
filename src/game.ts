export const MAX_WARMTH = 100;
export const MAX_THIRST = 100;
export const MAX_FOOD = 100;
export const COMFORT_WARMTH = 50;
export const STARTING_WARMTH = 40;
export const STARTING_THIRST = 100;
export const STARTING_FOOD = 100;
export const COLD_RATE = 7;
export const HEAT_RATE = 0.55;
export const THIRST_DECAY_RATE = 0.16;
export const FOOD_DECAY_RATE = 0.035;
export const HEAT_THIRST_RATE_BONUS = 0.08;
export const COLD_FOOD_RATE_BONUS = 0.035;
export const SUN_WARM_RATE = 5;
export const DAY_LENGTH = 288;
export const DAWN_LENGTH = 24;
export const SUNSET_LENGTH = 36;
export const YEAR_LENGTH_DAYS = 360;
export const START_DAY_OF_YEAR = 10;
export const EQUINOX_DAY = 80;
export const MIN_DAYLIGHT = 132;
export const MAX_DAYLIGHT = 164;
export const BASE_SCAVENGE_TIME = 2.4;
export const BEARINGS_TIME = 3.5;
export const BASE_WOOD_FOUND = 1;
export const TEND_FIRE_TIME = 2.8;
export const FIRE_FROM_WOOD = 28;
export const FIRE_DECAY_RATE = 3.2;
export const FIRE_WARM_RATE = 8;
export const BUILD_WINDBREAK_TIME = 6.2;
export const WINDBREAK_WOOD_COST = 3;
export const WINDBREAK_FROM_BUILD = 70;
export const MAX_WINDBREAK = 100;
export const MAX_WINDBREAK_PROTECTION = 0.55;
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
export const SWIM_COOL_RATE = 5;
export const SWIM_COOL_TARGET = 25;
export const GATHER_WATER_TIME = 4.8;
export const WATER_FOUND = 24;
export const GATHER_FOOD_TIME = 5.6;
export const FOOD_FOUND = 18;
export const SURF_PREDATOR_CHANCE_PER_SECOND = 0.0015;

export type Activity = "orienting" | "scavenging" | "tending" | "sheltering" | "swimming" | "drinking" | "foraging";
export type DeathCause = "cold" | "heat" | "thirst" | "hunger" | "surf";
export type ExposurePhase = "sunlit" | "sunset" | "night";
export type SeasonalEventWindow = "year-start" | "spring-equinox" | "summer-solstice" | "late-year";

export interface GameState {
  cycle: number;
  innerWarmth: number;
  thirst: number;
  food: number;
  foundWood: number;
  searchProgress: number;
  fireProgress: number;
  fireStrength: number;
  shelterProgress: number;
  windbreakStrength: number;
  waterProgress: number;
  foodProgress: number;
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
  deathCause?: DeathCause;
  fuelSourceKnown: boolean;
  fuelRecognition: number;
  coldFamiliarity: number;
}

export function createGameState(): GameState {
  return {
    cycle: 1,
    innerWarmth: STARTING_WARMTH,
    thirst: STARTING_THIRST,
    food: STARTING_FOOD,
    foundWood: 0,
    searchProgress: 0,
    fireProgress: 0,
    fireStrength: 0,
    shelterProgress: 0,
    windbreakStrength: 0,
    waterProgress: 0,
    foodProgress: 0,
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
    deathCause: undefined,
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

export function getBuildWindbreakTime(_state: GameState): number {
  return BUILD_WINDBREAK_TIME;
}

export function getGatherWaterTime(_state: GameState): number {
  return GATHER_WATER_TIME;
}

export function getGatherFoodTime(_state: GameState): number {
  return GATHER_FOOD_TIME;
}

export function hasLightReadout(state: GameState): boolean {
  return getShoreSenseLevel(state) >= 2;
}

export function getTimeInDay(state: GameState): number {
  return state.timeAlive % DAY_LENGTH;
}

export function getExposurePhase(state: GameState): ExposurePhase {
  const timeInDay = getTimeInDay(state);
  if (timeInDay < getDaylightEnd(state)) return "sunlit";
  if (timeInDay < getNightStart(state)) return "sunset";
  return "night";
}

export function getDayNumber(state: GameState): number {
  return Math.floor(state.timeAlive / DAY_LENGTH) + 1;
}

export function getDayOfYear(state: GameState): number {
  return ((START_DAY_OF_YEAR + getDayNumber(state) - 2) % YEAR_LENGTH_DAYS) + 1;
}

export function getSeasonalDaylight(state: GameState): number {
  const dayOfYear = getDayOfYear(state);
  const seasonalWave = Math.sin(((dayOfYear - EQUINOX_DAY) / YEAR_LENGTH_DAYS) * Math.PI * 2);
  const midpoint = (MIN_DAYLIGHT + MAX_DAYLIGHT) / 2;
  const amplitude = (MAX_DAYLIGHT - MIN_DAYLIGHT) / 2;

  return midpoint + amplitude * seasonalWave;
}

export function getDaylightEnd(state: GameState): number {
  return getSeasonalDaylight(state);
}

export function getDawnEnd(state: GameState): number {
  return Math.min(DAWN_LENGTH, getDaylightEnd(state));
}

export function getNightStart(state: GameState): number {
  return Math.min(DAY_LENGTH, getDaylightEnd(state) + SUNSET_LENGTH);
}

export function getSeasonalEventWindow(state: GameState): SeasonalEventWindow {
  const dayOfYear = getDayOfYear(state);
  if (dayOfYear <= 20 || dayOfYear >= 350) return "year-start";
  if (dayOfYear >= 72 && dayOfYear <= 88) return "spring-equinox";
  if (dayOfYear >= 162 && dayOfYear <= 178) return "summer-solstice";
  return "late-year";
}

export function getColdRate(state: GameState, atCamp = true): number {
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
  const windbreak = atCamp ? getWindbreakProtection(state) : 0;

  return COLD_RATE * phaseMultiplier * (1 - familiarityBonus - shoreSenseBonus) * (1 - windbreak);
}

export function getSunWarmRate(state: GameState): number {
  return getExposurePhase(state) === "sunlit" && getTimeInDay(state) < getDawnEnd(state) ? SUN_WARM_RATE : 0;
}

export function getFireWarmRate(state: GameState, atCamp = true): number {
  return atCamp && state.fireStrength > 0 && getExposurePhase(state) !== "sunlit" ? FIRE_WARM_RATE : 0;
}

export function getJungleThreat(state: GameState): number {
  const phase = getExposurePhase(state);
  if (phase === "sunlit") return 5;
  if (phase === "sunset") return 30;

  return Math.min(100, Math.max(35, 35 + (MAX_WARMTH - state.fireStrength) * 0.65));
}

export function getHeatRate(state: GameState, atCamp = true): number {
  const phaseHeat = getExposurePhase(state) === "sunlit" && getTimeInDay(state) >= getDawnEnd(state) ? HEAT_RATE : 0;
  const windbreak = atCamp ? getWindbreakProtection(state) : 0;
  return phaseHeat * (1 - windbreak);
}

export function getWindbreakProtection(state: GameState): number {
  return Math.min(MAX_WINDBREAK_PROTECTION, (state.windbreakStrength / MAX_WINDBREAK) * MAX_WINDBREAK_PROTECTION);
}

export function getScavengeLightEfficiency(state: GameState): number {
  const phase = getExposurePhase(state);
  if (phase === "sunlit") return 1;
  if (phase === "sunset") return SUNSET_SCAVENGE_EFFICIENCY;
  return NIGHT_SCAVENGE_EFFICIENCY;
}

export function runTick(state: GameState, seconds = 1, activity: Activity = "scavenging", atCamp = true): GameState {
  if (!state.alive) return state;

  let foundWood = state.foundWood;
  let searchProgress = state.searchProgress;
  let fireProgress = state.fireProgress;
  let fireStrength = Math.max(0, state.fireStrength - FIRE_DECAY_RATE * seconds);
  let shelterProgress = state.shelterProgress;
  let windbreakStrength = state.windbreakStrength;
  let waterProgress = state.waterProgress;
  let foodProgress = state.foodProgress;
  let bearingsProgress = state.bearingsProgress;
  let shoreSenseXp = state.shoreSenseXp;
  let maxShoreSenseLevel = state.maxShoreSenseLevel;
  let scavengeXp = state.scavengeXp;
  let maxScavengeLevel = state.maxScavengeLevel;
  let firekeepingXp = state.firekeepingXp;
  let maxFirekeepingLevel = state.maxFirekeepingLevel;
  let fuelSourceKnown = state.fuelSourceKnown;
  const coldRate = getColdRate(state, atCamp);
  const heatRate = getHeatRate(state, atCamp);
  let innerWarmth = state.innerWarmth + (heatRate - coldRate) * seconds;
  let thirst = Math.max(0, state.thirst - (THIRST_DECAY_RATE + heatRate * HEAT_THIRST_RATE_BONUS) * seconds);
  let food = Math.max(0, state.food - (FOOD_DECAY_RATE + coldRate * COLD_FOOD_RATE_BONUS) * seconds);
  if (innerWarmth < COMFORT_WARMTH) {
    innerWarmth = Math.min(COMFORT_WARMTH, innerWarmth + getSunWarmRate(state) * seconds);
  }
  if (innerWarmth < COMFORT_WARMTH) {
    innerWarmth = Math.min(COMFORT_WARMTH, innerWarmth + getFireWarmRate(state, atCamp) * seconds);
  }
  if (activity === "swimming") {
    innerWarmth = Math.max(SWIM_COOL_TARGET, innerWarmth - SWIM_COOL_RATE * seconds);
  }
  innerWarmth = Math.min(MAX_WARMTH, Math.max(0, innerWarmth));
  const scavengeTime = getScavengeTime(state);
  const bearingsTime = getBearingsTime(state);
  const gatherWaterTime = getGatherWaterTime(state);
  const gatherFoodTime = getGatherFoodTime(state);

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
  }

  const buildWindbreakTime = getBuildWindbreakTime(state);
  if (activity === "sheltering" && foundWood >= WINDBREAK_WOOD_COST && windbreakStrength < MAX_WINDBREAK) {
    shelterProgress += seconds;
    while (shelterProgress >= buildWindbreakTime && foundWood >= WINDBREAK_WOOD_COST && windbreakStrength < MAX_WINDBREAK) {
      shelterProgress -= buildWindbreakTime;
      foundWood -= WINDBREAK_WOOD_COST;
      windbreakStrength = Math.min(MAX_WINDBREAK, windbreakStrength + WINDBREAK_FROM_BUILD);
    }
  }

  if (activity === "drinking" && thirst < MAX_THIRST) {
    waterProgress += seconds;
    while (waterProgress >= gatherWaterTime && thirst < MAX_THIRST) {
      waterProgress -= gatherWaterTime;
      thirst = Math.min(MAX_THIRST, thirst + WATER_FOUND);
    }
  }

  if (activity === "foraging" && food < MAX_FOOD) {
    foodProgress += seconds;
    while (foodProgress >= gatherFoodTime && food < MAX_FOOD) {
      foodProgress -= gatherFoodTime;
      food = Math.min(MAX_FOOD, food + FOOD_FOUND);
    }
  }

  let deathCause: DeathCause | undefined;
  if (innerWarmth <= 0) deathCause = "cold";
  if (innerWarmth >= MAX_WARMTH) deathCause = "heat";
  if (thirst <= 0) deathCause = "thirst";
  if (food <= 0) deathCause = "hunger";

  return {
    ...state,
    innerWarmth,
    thirst,
    food,
    foundWood,
    searchProgress,
    fireProgress,
    fireStrength,
    shelterProgress,
    windbreakStrength,
    waterProgress,
    foodProgress,
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
    alive: deathCause === undefined,
    deathCause
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
    thirst: STARTING_THIRST,
    food: STARTING_FOOD,
    foundWood: 0,
    searchProgress: 0,
    fireProgress: 0,
    fireStrength: 0,
    shelterProgress: 0,
    windbreakStrength: 0,
    waterProgress: 0,
    foodProgress: 0,
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
    deathCause: undefined,
    fuelSourceKnown: state.fuelSourceKnown,
    fuelRecognition: state.fuelRecognition + (state.fuelSourceKnown ? 1 : 0),
    coldFamiliarity: state.coldFamiliarity + 1
  };
}
