import {
  MAX_FOOD,
  MAX_THIRST,
  MAX_WARMTH,
  COMFORT_WARMTH,
  type Activity,
  canReset,
  createGameState,
  getBearingsTime,
  getColdRate,
  getDayNumber,
  getDawnEnd,
  getExposurePhase,
  getFirekeepingLevel,
  getFirekeepingMasteryBonus,
  getFireWarmRate,
  getHeatRate,
  getJungleThreat,
  getScavengeLevel,
  getScavengeLightEfficiency,
  getScavengeMasteryBonus,
  getShoreSenseMasteryBonus,
  getScavengeTime,
  getShoreSenseLevel,
  getSunWarmRate,
  getTendFireTime,
  getTimeInDay,
  getWoodFound,
  hasLightReadout,
  resetCycle,
  runTick,
  type GameState
} from "./game.ts";

import "./styles.css";

const els = {
  bodySection: requiredElement<HTMLElement>("#bodySection"),
  cycle: requiredElement<HTMLElement>("#cycle"),
  lightRow: requiredElement<HTMLElement>("#lightRow"),
  lightText: requiredElement<HTMLElement>("#lightText"),
  activitySummary: requiredElement<HTMLElement>("#activitySummary"),
  exposureBarRow: requiredElement<HTMLElement>("#exposureBarRow"),
  warmthBar: requiredElement<HTMLElement>("#warmthBar"),
  warmthText: requiredElement<HTMLElement>("#warmthText"),
  thirstBar: requiredElement<HTMLElement>("#thirstBar"),
  thirstBarRow: requiredElement<HTMLElement>("#thirstBarRow"),
  thirstRow: requiredElement<HTMLElement>("#thirstRow"),
  thirstText: requiredElement<HTMLElement>("#thirstText"),
  foodBar: requiredElement<HTMLElement>("#foodBar"),
  foodBarRow: requiredElement<HTMLElement>("#foodBarRow"),
  foodRow: requiredElement<HTMLElement>("#foodRow"),
  foodText: requiredElement<HTMLElement>("#foodText"),
  conditionDetail: requiredElement<HTMLElement>("#conditionDetail"),
  suppliesSection: requiredElement<HTMLElement>("#suppliesSection"),
  fireSupplyRow: requiredElement<HTMLElement>("#fireSupplyRow"),
  woodText: requiredElement<HTMLElement>("#woodText"),
  fireText: requiredElement<HTMLElement>("#fireText"),
  orientButton: requiredElement<HTMLButtonElement>("#orientButton"),
  orientTitle: requiredElement<HTMLElement>("#orientTitle"),
  orientDetail: requiredElement<HTMLElement>("#orientDetail"),
  orientStatus: requiredElement<HTMLElement>("#orientStatus"),
  orientProgressBar: requiredElement<HTMLElement>("#orientProgressBar"),
  scavengeButton: requiredElement<HTMLButtonElement>("#scavengeButton"),
  scavengeTitle: requiredElement<HTMLElement>("#scavengeTitle"),
  scavengeDetail: requiredElement<HTMLElement>("#scavengeDetail"),
  scavengeStatus: requiredElement<HTMLElement>("#scavengeStatus"),
  scavengeProgressBar: requiredElement<HTMLElement>("#scavengeProgressBar"),
  fireButton: requiredElement<HTMLButtonElement>("#fireButton"),
  fireTitle: requiredElement<HTMLElement>("#fireTitle"),
  fireDetail: requiredElement<HTMLElement>("#fireDetail"),
  fireStatus: requiredElement<HTMLElement>("#fireStatus"),
  fireProgressBar: requiredElement<HTMLElement>("#fireProgressBar"),
  placesSection: requiredElement<HTMLElement>("#placesSection"),
  tidePlaceButton: requiredElement<HTMLButtonElement>("#tidePlaceButton"),
  junglePlaceButton: requiredElement<HTMLButtonElement>("#junglePlaceButton"),
  speedButtons: [...document.querySelectorAll<HTMLButtonElement>(".speedButton")],
  logSection: requiredElement<HTMLElement>("#logSection"),
  log: requiredElement<HTMLOListElement>("#log"),
  app: requiredElement<HTMLElement>("#app"),
  deathDialog: requiredElement<HTMLDialogElement>("#deathDialog"),
  deathTitle: requiredElement<HTMLElement>("#deathTitle"),
  deathIntro: requiredElement<HTMLElement>("#deathIntro"),
  deathStats: requiredElement<HTMLElement>("#deathStats"),
  deathLesson: requiredElement<HTMLElement>("#deathLesson"),
  wakeButton: requiredElement<HTMLButtonElement>("#wakeButton")
};

let state = createGameState();
let activity: Activity = "orienting";
let speedMultiplier = 1;
let lastTick = performance.now();
let deathShown = false;
let fuelDiscoveryLogged = false;
let firstFireLogged = false;
let jungleNoiseStage = 0;
let lastExposurePhase = getExposurePhase(state);

function requiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }

  return element;
}

function addLog(message: string): void {
  const item = document.createElement("li");
  item.textContent = message;
  els.log.prepend(item);
}

function addLogs(messages: readonly string[]): void {
  for (const message of [...messages].reverse()) {
    addLog(message);
  }
}

function render(): void {
  const bodyTemperature = state.innerWarmth;
  const bodyTemperaturePercent = (bodyTemperature / MAX_WARMTH) * 100;
  const thirstPercent = (state.thirst / MAX_THIRST) * 100;
  const foodPercent = (state.food / MAX_FOOD) * 100;
  const firePercent = (state.fireStrength / MAX_WARMTH) * 100;
  const bearingsTime = getBearingsTime(state);
  const scavengeTime = getScavengeTime(state);
  const tendFireTime = getTendFireTime(state);
  const woodFound = getWoodFound(state);
  const coldRate = getColdRate(state);
  const heatRate = getHeatRate(state);
  const sunWarmRate = getSunWarmRate(state);
  const fireWarmRate = getFireWarmRate(state);
  const shoreSenseLevel = getShoreSenseLevel(state);
  const shoreSenseMasteryBonus = getShoreSenseMasteryBonus(state);
  const scavengeLevel = getScavengeLevel(state);
  const scavengeMasteryBonus = getScavengeMasteryBonus(state);
  const scavengeLightEfficiency = getScavengeLightEfficiency(state);
  const firekeepingLevel = getFirekeepingLevel(state);
  const firekeepingMasteryBonus = getFirekeepingMasteryBonus(state);
  const orientPercent = Math.min(100, (state.bearingsProgress / bearingsTime) * 100);
  const scavengePercent = state.fuelSourceKnown ? Math.min(100, (state.searchProgress / scavengeTime) * 100) : 0;
  const tendPercent = state.foundWood >= 1 ? Math.min(100, (state.fireProgress / tendFireTime) * 100) : 0;
  const logKnown = hasLogReadout();
  const bodyKnown = hasBodyReadout();
  const needsKnown = hasNeedsReadout();
  const fireKnown = hasFireReadout();
  const tidePlaceKnown = hasTidePlaceReadout();
  const junglePlaceKnown = hasJunglePlaceReadout();
  const systemKnown = hasSystemReadout();

  els.cycle.textContent = `Entry ${toRoman(state.cycle)}`;
  els.bodySection.hidden = !bodyKnown;
  els.logSection.hidden = !logKnown;
  els.app.classList.toggle("app-shell-compact", !logKnown);
  els.app.classList.toggle("app-shell-expanded", logKnown);
  els.lightRow.hidden = !hasLightReadout(state);
  els.thirstRow.hidden = !needsKnown;
  els.exposureBarRow.hidden = !systemKnown;
  els.thirstBarRow.hidden = !needsKnown || !systemKnown;
  els.foodRow.hidden = !needsKnown;
  els.foodBarRow.hidden = !needsKnown || !systemKnown;
  els.suppliesSection.hidden = !hasFuelReadout();
  els.fireSupplyRow.hidden = !fireKnown;
  els.placesSection.hidden = !tidePlaceKnown && !junglePlaceKnown;
  els.tidePlaceButton.hidden = !tidePlaceKnown;
  els.junglePlaceButton.hidden = !junglePlaceKnown;
  els.lightText.textContent = getLightLabel();
  els.activitySummary.textContent = getActivitySummary();
  els.warmthBar.style.width = `${bodyTemperaturePercent}%`;
  els.warmthBar.style.backgroundColor = getBodyTemperatureColor(bodyTemperature);
  els.warmthText.textContent = state.alive
    ? getBodyTemperatureLabel(bodyTemperature, systemKnown)
    : systemKnown
      ? "spent"
      : "gone";
  els.thirstBar.style.width = `${thirstPercent}%`;
  els.thirstText.textContent = getThirstLabel(state.thirst, systemKnown);
  els.foodBar.style.width = `${foodPercent}%`;
  els.foodText.textContent = getFoodLabel(state.food, systemKnown);
  els.conditionDetail.textContent = getConditionDetail(coldRate, heatRate, sunWarmRate, fireWarmRate);
  els.woodText.textContent = formatWood(state.foundWood);
  els.fireText.textContent = `${Math.ceil(state.fireStrength)} / ${MAX_WARMTH}`;

  els.orientButton.disabled = !state.alive;
  els.orientButton.setAttribute("aria-pressed", String(activity === "orienting"));
  els.orientTitle.textContent = getActionTitle("Get Your Bearings", shoreSenseLevel);
  els.orientDetail.textContent = getBearingsDetail(shoreSenseLevel, bearingsTime, shoreSenseMasteryBonus);
  els.orientStatus.textContent = getActionStatus("orienting");
  els.orientProgressBar.style.width = `${orientPercent}%`;

  els.scavengeButton.hidden = !hasFuelReadout();
  els.scavengeButton.disabled = !state.alive || !state.fuelSourceKnown;
  els.scavengeButton.setAttribute("aria-pressed", String(activity === "scavenging"));
  els.scavengeTitle.textContent = getActionTitle("Scavenge the Wreckage", scavengeLevel);
  els.scavengeDetail.textContent = getScavengeDetail(scavengeLevel, scavengeTime, woodFound, scavengeLightEfficiency, scavengeMasteryBonus);
  els.scavengeStatus.textContent = getActionStatus("scavenging");
  els.scavengeProgressBar.style.width = `${scavengePercent}%`;

  els.fireButton.hidden = !fireKnown;
  els.fireButton.disabled = !state.alive || !state.fuelSourceKnown || state.foundWood < 1;
  els.fireButton.setAttribute("aria-pressed", String(activity === "tending"));
  els.fireTitle.textContent =
    firekeepingLevel > 0 || state.fireStrength > 0 ? getActionTitle("Tend the Fire", firekeepingLevel) : "Start a Fire";
  els.fireDetail.textContent = getFireDetail(firekeepingLevel, tendFireTime, firekeepingMasteryBonus);
  els.fireStatus.textContent = getActionStatus("tending");
  els.fireProgressBar.style.width = `${activity === "tending" ? tendPercent : firePercent}%`;

  els.app.hidden = !state.alive;
  els.app.classList.toggle("opacity-20", !state.alive);

  for (const button of els.speedButtons) {
    const isActive = Number(button.dataset.speed) === speedMultiplier;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("border-ember-accent-strong", isActive);
    button.classList.toggle("text-ember-accent-strong", isActive);
  }
}

function tick(now: number): void {
  const elapsed = Math.min(0.25, (now - lastTick) / 1000) * (speedMultiplier / 5);
  lastTick = now;

  if (!canReset(state)) {
    const previousWood = state.foundWood;
    const previousFire = state.fireStrength;
    const previousShoreSenseXp = state.shoreSenseXp;
    const previousShoreSenseLevel = getShoreSenseLevel(state);
    const previousScavengeLevel = getScavengeLevel(state);
    const previousFirekeepingLevel = getFirekeepingLevel(state);
    const knewFuelSource = state.fuelSourceKnown;
    const previousExposurePhase = lastExposurePhase;
    const previousJungleThreat = getJungleThreat(state);
    state = runTick(state, elapsed, activity);
    lastExposurePhase = getExposurePhase(state);

    if (!knewFuelSource && state.fuelSourceKnown && !fuelDiscoveryLogged) {
      fuelDiscoveryLogged = true;
      activity = "orienting";
    }

    if (lastExposurePhase !== previousExposurePhase) {
      addLog(getExposureShiftMessage(state));
      if (lastExposurePhase === "sunlit") {
        jungleNoiseStage = 0;
      }
      if (lastExposurePhase === "sunset") {
        jungleNoiseStage = 1;
      }
    }

    if (state.shoreSenseXp > previousShoreSenseXp) {
      addLog(getShoreSenseCompletionMessage(previousShoreSenseLevel, getShoreSenseLevel(state), state.shoreSenseXp));
    }

    if (state.foundWood > previousWood) {
      addLog(findWoodMessage(state));
      if (previousWood < 1 && state.foundWood >= 1) {
        addLog("The wood in your hands changes the problem. Now there can be fire.");
      }
    }

    if (getScavengeLevel(state) > previousScavengeLevel) {
      addLog(getScavengeLevelMessage(getScavengeLevel(state)));
    }

    if (state.fireStrength > previousFire + 1) {
      if (!firstFireLogged && previousFire <= 0) {
        firstFireLogged = true;
        addLog("The first flame takes. The dark now has an edge.");
      } else {
        addLog("The fire catches higher. Heat pushes back against the shore.");
      }
    }

    addJungleNoiseLogs(previousJungleThreat, getJungleThreat(state));

    if (getFirekeepingLevel(state) > previousFirekeepingLevel) {
      addLog(getFirekeepingLevelMessage(getFirekeepingLevel(state)));
    }

    if (canReset(state) && !deathShown) {
      showDeathDialog();
    }
    render();
  }

  requestAnimationFrame(tick);
}

els.orientButton.addEventListener("click", () => {
  if (!state.alive) return;

  activity = "orienting";
  addLog(
    state.fuelSourceKnown
      ? "You stay low and keep reading the shore."
      : "You force yourself to read the shore instead of the panic."
  );
  render();
});

els.scavengeButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!state.fuelSourceKnown) return;

  activity = "scavenging";
  addLog("You pick through the wreckage for anything useful. Dry pieces go aside for fire or shelter.");
  render();
});

els.fireButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!state.fuelSourceKnown || state.foundWood < 1) return;

  activity = "tending";
  addLog(state.fireStrength > 0 ? "You crouch near the coals and feed the fire." : "You clear a place above the wash and try to make the first fire.");
  render();
});

for (const button of els.speedButtons) {
  button.addEventListener("click", () => {
    const nextSpeed = Number(button.dataset.speed);
    speedMultiplier = Number.isFinite(nextSpeed) ? nextSpeed : 1;
    render();
  });
}

els.wakeButton.addEventListener("click", () => {
  if (!canReset(state)) return;

  const rememberedFuelSource = state.fuelSourceKnown;
  const nextFuelRecognition = state.fuelRecognition + (rememberedFuelSource ? 1 : 0);
  const nextColdFamiliarity = state.coldFamiliarity + 1;
  state = resetCycle(state);
  activity = "orienting";
  fuelDiscoveryLogged = state.fuelSourceKnown;
  firstFireLogged = false;
  jungleNoiseStage = 0;
  lastExposurePhase = getExposurePhase(state);
  deathShown = false;
  els.deathDialog.close();
  addLogs(getWakeMessages(nextFuelRecognition, nextColdFamiliarity, rememberedFuelSource));
  render();
});

function getActivitySummary(): string {
  if (speedMultiplier === 0) return "Paused";
  if (!state.alive) return "Ended";
  if (!hasLogReadout()) return "The shore is bright.";
  if (!hasFuelReadout()) return "An entry is forming.";
  if (activity === "orienting") return "Reading the shore.";
  if (activity === "scavenging") return "Sorting the wreckage.";
  return state.fireStrength > 0 ? "Keeping the dark back." : "Making a first fire.";
}

function getActionTitle(label: string, level: number): string {
  if (!hasSystemReadout() || level < 1) return label;

  return `${label} - Lv ${level}`;
}

function getBearingsDetail(level: number, bearingsTime: number, masteryBonus: number): string {
  const remaining = Math.max(0, bearingsTime - state.bearingsProgress).toFixed(1);
  if (level < 1) {
    return `Hold still until one clear thing reaches you in ${remaining}s.`;
  }

  if (level < 2) {
    return "Notice light, water, and the shape beneath you.";
  }

  if (level < 3) {
    return "Sort the wreckage from the wider tide-line.";
  }

  if (level < 10) {
    return `Read the shore for the next useful pattern in ${remaining}s.`;
  }

  return `Progress ${formatLevelProgress(state.shoreSenseXp)} - next insight in ${remaining}s. Mastery +${Math.round(masteryBonus * 100)}%.`;
}

function getScavengeDetail(
  level: number,
  scavengeTime: number,
  woodFound: number,
  lightEfficiency: number,
  masteryBonus: number
): string {
  if (!state.fuelSourceKnown) return "Find wood signs before scavenging.";

  if (!hasSystemReadout()) {
    if (level < 1) return "Search the broken line for anything useful enough to keep.";
    if (level < 3) return "Sort planks, spars, rope, and dry pieces that might burn or build.";
    return "Work the wreckage by memory, separating fuel from future shelter.";
  }

  return `Progress ${formatLevelProgress(state.scavengeXp)} - collect +${formatWood(woodFound)} wood about every ${scavengeTime.toFixed(1)}s.${getScavengeLightNote(lightEfficiency)} Mastery +${Math.round(masteryBonus * 100)}%.`;
}

function getFireDetail(level: number, tendFireTime: number, masteryBonus: number): string {
  if (state.foundWood < 1) return "Find dry salvage before you can choose a camp spot.";

  if (!hasSystemReadout()) {
    if (level < 1) return "Clear a small place above the wash and coax a first flame.";
    return "Keep the coals breathing without spending the wood too fast.";
  }

  return `Progress ${formatLevelProgress(state.firekeepingXp)} - spend 1 wood in ${tendFireTime.toFixed(1)}s. Mastery +${Math.round(masteryBonus * 100)}%.`;
}

function getShoreSenseCompletionMessage(previousLevel: number, currentLevel: number, completions: number): string {
  if (previousLevel < 1 && currentLevel >= 1) {
    return "Light breaks white behind your eyelids. Something cold drags past your legs and pulls away.";
  }

  if (completions === 2) {
    return "Three gull-cries. One broken wave. Something wooden knocks beyond the foam.";
  }

  if (previousLevel < 2 && currentLevel >= 2) {
    return "Above the wrack line, driftwood ribs and snapped planks bleach in the early sun.";
  }

  if (previousLevel < 3 && currentLevel >= 3) {
    return "Past the wreckage, the tide-line keeps going. Your dry mouth notices before your courage does.";
  }

  if (previousLevel < 4 && currentLevel >= 4) {
    return "The jungle edge stops being a wall. It becomes a place you might study before entering.";
  }

  if (currentLevel > previousLevel) {
    if (!hasSystemReadout()) {
      return "You read the wind and wrack more cleanly. The shore gives up another small rule.";
    }

    return `You read the wind and wrack more cleanly. Get Your Bearings reaches Lv ${currentLevel} this entry.`;
  }

  const messages: readonly string[] = [
    "You line up sun, surf, and wind until the shore quits spinning.",
    "A high-water mark bends away into haze, farther than panic first allowed.",
    "The tree line moves with small sounds, then settles when you stare.",
    "The surf keeps time. Your breath learns to follow it."
  ];

  const messageIndex = Math.max(0, (completions - 3) % messages.length);
  return messages[messageIndex] ?? "You keep reading the shore. One more small pattern holds still long enough to name.";
}

function getScavengeLevelMessage(level: number): string {
  if (!hasSystemReadout()) {
    if (level < 2) return "Your hands begin to know which wreckage is worth keeping.";
    if (level < 4) return "Planks, spars, rope, shavings. The useful pieces separate faster now.";
    return "The broken line looks less random when your hands move through it.";
  }

  return `Your hands sort salvage from wreckage faster. Scavenge reaches Lv ${level} this entry.`;
}

function getFirekeepingLevelMessage(level: number): string {
  if (!hasSystemReadout()) {
    if (level < 2) return "You learn the first small patience of coals.";
    if (level < 4) return "The fire answers better when you feed it less like panic.";
    return "Your hands learn when the flame wants air and when it wants wood.";
  }

  return `You learn how the coals breathe. Firekeeping reaches Lv ${level} this entry.`;
}

function getBodyTemperatureLabel(bodyTemperature: number, systemKnown = hasSystemReadout()): string {
  if (!systemKnown) {
    if (bodyTemperature <= 0) return "cold";
    if (bodyTemperature >= MAX_WARMTH) return "fevered";
    if (bodyTemperature < 25) return "numb";
    if (bodyTemperature < 40) return "shivering";
    if (bodyTemperature < 62) return "steady";
    if (bodyTemperature < 78) return "overwarm";
    return "burning";
  }

  const offset = Math.round(bodyTemperature - COMFORT_WARMTH);
  if (bodyTemperature <= 0) return "cold end";
  if (bodyTemperature >= MAX_WARMTH) return "heat end";
  if (bodyTemperature < 30) return `${offset} cold`;
  if (bodyTemperature > 70) return `+${offset} hot`;
  if (offset === 0) return "0 steady";
  return `${offset > 0 ? "+" : ""}${offset} steady`;
}

function getThirstLabel(thirst: number, systemKnown = hasSystemReadout()): string {
  if (systemKnown) return thirst > 0 ? `${Math.ceil(thirst)} / ${MAX_THIRST}` : "empty";
  if (thirst <= 0) return "empty";
  if (thirst < 25) return "cracked";
  if (thirst < 55) return "dry";
  if (thirst < 85) return "aware";
  return "quiet";
}

function getFoodLabel(food: number, systemKnown = hasSystemReadout()): string {
  if (systemKnown) return food > 0 ? `${Math.ceil(food)} / ${MAX_FOOD}` : "empty";
  if (food <= 0) return "hollow";
  if (food < 25) return "weak";
  if (food < 55) return "gnawing";
  if (food < 85) return "thin";
  return "quiet";
}

function getBodyTemperatureColor(bodyTemperature: number): string {
  if (bodyTemperature < 30) return "#4f8fd6";
  if (bodyTemperature > 70) return "#b54b3f";
  return "#d6a84f";
}

function formatLevelProgress(xp: number): string {
  const level = Math.floor(Math.sqrt(xp));
  const levelStart = level ** 2;
  const nextLevelStart = (level + 1) ** 2;
  return `${xp - levelStart}/${nextLevelStart - levelStart}`;
}

function hasLogReadout(): boolean {
  return getShoreSenseLevel(state) >= 1 || state.maxShoreSenseLevel >= 1;
}

function hasBodyReadout(): boolean {
  return hasLightReadout(state);
}

function hasNeedsReadout(): boolean {
  return getShoreSenseLevel(state) >= 3 || state.maxShoreSenseLevel >= 3;
}

function hasFuelReadout(): boolean {
  return getShoreSenseLevel(state) >= 2 || state.maxShoreSenseLevel >= 2;
}

function hasFireReadout(): boolean {
  return hasFuelReadout() && (state.foundWood >= 1 || state.fireStrength > 0 || getFirekeepingLevel(state) > 0 || state.maxFirekeepingLevel > 0);
}

function hasTidePlaceReadout(): boolean {
  return getShoreSenseLevel(state) >= 3 || state.maxShoreSenseLevel >= 3;
}

function hasJunglePlaceReadout(): boolean {
  return getShoreSenseLevel(state) >= 4 || state.maxShoreSenseLevel >= 4;
}

function hasSystemReadout(): boolean {
  return getShoreSenseLevel(state) >= 10 || state.maxShoreSenseLevel >= 10;
}

function getActionStatus(action: Activity): string {
  if (!state.alive) return "Stopped";
  if (action === "scavenging" && !state.fuelSourceKnown) return "Locked";
  if (action === "tending" && !state.fuelSourceKnown) return "Locked";
  if (action === "tending" && state.foundWood < 1) return "No Wood";
  if (action === "orienting" && activity !== action) {
    return "Idle";
  }
  if (action === "scavenging" && activity !== action) {
    return "Idle";
  }
  if (action === "tending" && activity !== action) {
    return "Idle";
  }
  return activity === action ? "Active" : "Idle";
}

function getLightLabel(): string {
  const phase = getExposurePhase(state);
  const day = getDayNumber(state);
  const dayPrefix = day > 1 ? `day ${day}, ` : "";
  if (phase === "sunlit" && getTimeInDay(state) < getDawnEnd(state)) return `${dayPrefix}dawn`;
  if (phase === "sunlit") return `${dayPrefix}daylight`;
  if (phase === "sunset") return `${dayPrefix}fading`;
  return `${dayPrefix}gone`;
}

function getConditionDetail(coldRate: number, heatRate: number, sunWarmRate: number, fireWarmRate: number): string {
  const phase = getExposurePhase(state);
  const needsKnown = hasNeedsReadout();
  const systemKnown = hasSystemReadout();

  if (phase === "sunlit") {
    if (!hasLightReadout(state)) {
      return `Something in the air is holding the worst of the shore back.`;
    }
    if (getTimeInDay(state) < getDawnEnd(state)) {
      if (!systemKnown) {
        return needsKnown
          ? `Dawn keeps the chill off, though your mouth and belly are beginning to report in.`
          : `Dawn keeps the worst chill off your skin.`;
      }
      return `Dawn pulls body temp toward steady ${sunWarmRate.toFixed(1)}/s.`;
    }
    if (getDayNumber(state) > 1) {
      if (!systemKnown) {
        return needsKnown
          ? `The returning sun warms you, but the heat asks for water.`
          : `The returning sun holds the shore in a livable glare.`;
      }
      return `The returning sun pushes body temp +${heatRate.toFixed(1)}/s. Thirst drains faster.`;
    }
    if (!systemKnown) {
      return needsKnown ? `The day warms you, but the heat asks for water.` : `The day holds the shore in a livable glare.`;
    }
    return `The day pushes body temp +${heatRate.toFixed(1)}/s. Thirst drains faster.`;
  }

  if (phase === "sunset") {
    if (!systemKnown) {
      return needsKnown
        ? `The light is leaving. Cold creeps in, and hunger makes it sharper.`
        : `The light is leaving, and the shore stops helping.`;
    }
    return `The light is leaving. Cold pulls body temp -${coldRate.toFixed(1)}/s. Hunger bites harder.`;
  }

  if (getJungleThreat(state) >= 75) {
    if (!systemKnown) {
      return `The fire is losing its luster. The jungle grows louder at the edge of the light.`;
    }
    return `The fire is losing its luster. It pulls body temp toward steady ${fireWarmRate.toFixed(1)}/s; cold and the jungle press in.`;
  }

  if (!systemKnown) {
    return `Firelight holds close. Past it, the dark keeps moving.`;
  }
  return `Fire pulls body temp toward steady ${fireWarmRate.toFixed(1)}/s. Cold pulls body temp -${coldRate.toFixed(1)}/s.`;
}

function getScavengeLightNote(efficiency: number): string {
  if (efficiency >= 1) return "";

  return ` Low light ${Math.round(efficiency * 100)}%.`;
}

function getExposureShiftMessage(currentState: GameState): string {
  const phase = getExposurePhase(currentState);
  if (phase === "sunset") {
    return "The sun slips behind the black trees. The jungle begins ticking and calling to itself.";
  }

  if (phase === "night") {
    return "Night settles in. Beyond the firelight, leaves drag against leaves.";
  }

  return `The sun finds your skin again. Day ${getDayNumber(currentState)} begins on the same shore.`;
}

function findWoodMessage(currentState: GameState): string {
  const messages: readonly [string, string, string, string] = [
    "You find a tar-dark plank, too worked to be a branch.",
    "A curl of dry shavings waits inside a split rib of hull.",
    "A cedar spar waits just above the tide mark.",
    "You strip brittle bark and rope fiber from a fallen beam."
  ];

  const messageIndex = Math.max(0, Math.floor(currentState.foundWood - 1)) % messages.length;
  return messages[messageIndex] ?? messages[0];
}

function addJungleNoiseLogs(previousThreat: number, currentThreat: number): void {
  if (getExposurePhase(state) !== "night") return;

  if (currentThreat >= 75 && jungleNoiseStage < 2) {
    jungleNoiseStage = 2;
    addLog("The fire loses its luster. Something heavy tests the jungle line.");
    return;
  }

  if (currentThreat >= 50 && previousThreat < 50 && jungleNoiseStage < 1) {
    jungleNoiseStage = 1;
    addLog("The night insects cut out all at once. Something is listening from the trees.");
    return;
  }

  if (previousThreat >= 75 && currentThreat < 65 && state.fireStrength > 0) {
    jungleNoiseStage = 1;
    addLog("The flame lifts. The heavy movement withdraws into smaller sounds.");
  }
}

function showDeathDialog(): void {
  deathShown = true;
  els.deathTitle.textContent = getDeathTitle(state);
  els.deathIntro.textContent = getDeathIntro(state);
  els.deathStats.textContent = getDeathStats(state);
  els.deathLesson.textContent = getDeathLesson(state.cycle);
  els.deathDialog.showModal();
}

function getDeathStats(currentState: GameState): string {
  if (!hasSystemReadout()) {
    if (currentState.foundWood < 1) return "The entry ends before your hands can name what would burn.";
    if (currentState.fireStrength <= 0) return "The entry ends with wood gathered and no lasting flame.";
    return "The entry ends past the first fire. The shore has changed shape in memory.";
  }

  return `You lasted ${formatDuration(currentState.timeAlive)}, found ${formatWood(currentState.foundWood)} wood, and ended with ${Math.ceil(currentState.thirst)} thirst / ${Math.ceil(currentState.food)} food.`;
}

function getDeathTitle(currentState: GameState): string {
  if (currentState.thirst <= 0) return "Thirst takes you.";
  if (currentState.food <= 0) return "Hunger hollows you out.";
  if (currentState.innerWarmth >= MAX_WARMTH) return "Heat takes you.";
  if (currentState.innerWarmth <= 0) return "Cold takes you.";
  if (getJungleThreat(currentState) >= 75) return "The jungle reaches the shore.";
  return "The body gives out.";
}

function getDeathIntro(currentState: GameState): string {
  if (currentState.thirst <= 0) {
    return "Your tongue sticks. The surf keeps speaking, useless and bright.";
  }

  if (currentState.food <= 0) {
    return "Your hands shake around nothing. The jungle waits out the weakness.";
  }

  if (currentState.innerWarmth >= MAX_WARMTH) {
    return "The sun becomes a weight. Salt dries on your skin and the shade stays too far away.";
  }

  if (currentState.innerWarmth <= 0) {
    return "The firelight thins. Cold closes over your fingers first, then the rest.";
  }

  if (getJungleThreat(currentState) >= 75) {
    return "The fire gutters. Leaves split. Something vast moves faster than thought.";
  }

  return "Cold, thirst, hunger, salt. Then silence.";
}

function getDeathLesson(cycle: number): string {
  const lessons: readonly [string, string, string] = [
    "The snap is not only cold. Your fingers remember where dry wood waits, and your mouth remembers the cost of salt.",
    "Your chest still expects the last breath. Your hands remember bark from rot, cedar from soaked driftwood.",
    "The shore is less silent now. Useful wood stands out before hunger or the jungle can steal your focus."
  ];

  return lessons[Math.min(cycle - 1, lessons.length - 1)] ?? lessons[0];
}

function getWakeMessages(
  fuelRecognition: number,
  _coldFamiliarity: number,
  rememberedFuelSource: boolean
): readonly string[] {
  if (!rememberedFuelSource) {
    return [
      "Three gull-cries. One broken wave. You wake on the same shore.",
      "The cold is familiar, but the tide-line still needs reading."
    ];
  }

  const messages: readonly string[][] = [
    [
      "Three gull-cries. One broken wave. The same salt wind opens your eyes.",
      "Before you look, you know where the first kindling will be."
    ],
    [
      "Three gull-cries. One broken wave. The shore repeats itself exactly.",
      "Your hands know what will burn. The wind bites, but not quite as deeply."
    ],
    [
      "Three gull-cries. One broken wave. The loop has a rhythm now.",
      "Dry wood catches your eye before the cold can steal your focus."
    ]
  ];

  const messageIndex = Math.min(fuelRecognition - 1, messages.length - 1);
  return messages[messageIndex] ?? [
    "Three gull-cries. One broken wave. The same salt wind opens your eyes.",
    "Before you look, you know where the first kindling will be."
  ];
}

function formatDuration(seconds: number): string {
  const wholeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}

function formatWood(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function toRoman(value: number): string {
  const numerals: readonly [number, string][] = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let remaining = Math.max(1, Math.floor(value));
  let result = "";

  for (const [amount, symbol] of numerals) {
    while (remaining >= amount) {
      result += symbol;
      remaining -= amount;
    }
  }

  return result;
}

render();
requestAnimationFrame(tick);
