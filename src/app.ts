import {
  MAX_FOOD,
  MAX_THIRST,
  MAX_WARMTH,
  MAX_WINDBREAK,
  WINDBREAK_WOOD_COST,
  COMFORT_WARMTH,
  FOOD_FOUND,
  SWIM_COOL_TARGET,
  SURF_PREDATOR_CHANCE_PER_SECOND,
  NIGHT_PREDATOR_CHANCE_PER_SECOND,
  SUNSET_PREDATOR_CHANCE_PER_SECOND,
  WATER_FOUND,
  type Activity,
  canReset,
  createGameState,
  getBuildWindbreakTime,
  getBearingsTime,
  getColdRate,
  getDayNumber,
  getDawnEnd,
  getExposurePhase,
  getFirekeepingLevel,
  getFirekeepingMasteryBonus,
  getFireWarmRate,
  getGatherFoodTime,
  getGatherWaterTime,
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
  getWindbreakProtection,
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
  windbreakSupplyRow: requiredElement<HTMLElement>("#windbreakSupplyRow"),
  woodText: requiredElement<HTMLElement>("#woodText"),
  fireText: requiredElement<HTMLElement>("#fireText"),
  windbreakText: requiredElement<HTMLElement>("#windbreakText"),
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
  windbreakButton: requiredElement<HTMLButtonElement>("#windbreakButton"),
  windbreakTitle: requiredElement<HTMLElement>("#windbreakTitle"),
  windbreakDetail: requiredElement<HTMLElement>("#windbreakDetail"),
  windbreakStatus: requiredElement<HTMLElement>("#windbreakStatus"),
  windbreakProgressBar: requiredElement<HTMLElement>("#windbreakProgressBar"),
  swimButton: requiredElement<HTMLButtonElement>("#swimButton"),
  swimStatus: requiredElement<HTMLElement>("#swimStatus"),
  waterButton: requiredElement<HTMLButtonElement>("#waterButton"),
  waterDetail: requiredElement<HTMLElement>("#waterDetail"),
  waterStatus: requiredElement<HTMLElement>("#waterStatus"),
  waterProgressBar: requiredElement<HTMLElement>("#waterProgressBar"),
  foodButton: requiredElement<HTMLButtonElement>("#foodButton"),
  foodDetail: requiredElement<HTMLElement>("#foodDetail"),
  foodStatus: requiredElement<HTMLElement>("#foodStatus"),
  foodProgressBar: requiredElement<HTMLElement>("#foodProgressBar"),
  placesSection: requiredElement<HTMLElement>("#placesSection"),
  campSiteButton: requiredElement<HTMLButtonElement>("#campSiteButton"),
  campSiteTitle: requiredElement<HTMLElement>("#campSiteTitle"),
  campSiteDetail: requiredElement<HTMLElement>("#campSiteDetail"),
  wreckSiteButton: requiredElement<HTMLButtonElement>("#wreckSiteButton"),
  tidePlaceButton: requiredElement<HTMLButtonElement>("#tidePlaceButton"),
  junglePlaceButton: requiredElement<HTMLButtonElement>("#junglePlaceButton"),
  speedButtons: [...document.querySelectorAll<HTMLButtonElement>(".speedButton")],
  debugToggle: requiredElement<HTMLButtonElement>("#debugToggle"),
  debugEyeOpen: requiredElement<HTMLElement>("#debugEyeOpen"),
  debugEyeClosed: requiredElement<HTMLElement>("#debugEyeClosed"),
  debugPanel: requiredElement<HTMLElement>("#debugPanel"),
  dbgCycle: requiredElement<HTMLElement>("#dbgCycle"),
  dbgAlive: requiredElement<HTMLElement>("#dbgAlive"),
  dbgWarmth: requiredElement<HTMLElement>("#dbgWarmth"),
  dbgThirst: requiredElement<HTMLElement>("#dbgThirst"),
  dbgFood: requiredElement<HTMLElement>("#dbgFood"),
  dbgPhase: requiredElement<HTMLElement>("#dbgPhase"),
  dbgWetness: requiredElement<HTMLElement>("#dbgWetness"),
  dbgCtdShown: requiredElement<HTMLElement>("#dbgCtdShown"),
  dbgCtdCond: requiredElement<HTMLElement>("#dbgCtdCond"),
  dbgDeathShown: requiredElement<HTMLElement>("#dbgDeathShown"),
  logSection: requiredElement<HTMLElement>("#logSection"),
  log: requiredElement<HTMLOListElement>("#log"),
  pageFrame: requiredElement<HTMLElement>("#pageFrame"),
  app: requiredElement<HTMLElement>("#app"),
  closeToDeathDialog: requiredElement<HTMLDialogElement>("#closeToDeathDialog"),
  keepGoingButton: requiredElement<HTMLButtonElement>("#keepGoingButton"),
  deathDialog: requiredElement<HTMLDialogElement>("#deathDialog"),
  deathTitle: requiredElement<HTMLElement>("#deathTitle"),
  deathLineOne: requiredElement<HTMLElement>("#deathLineOne"),
  deathLineTwo: requiredElement<HTMLElement>("#deathLineTwo"),
  deathLineThree: requiredElement<HTMLElement>("#deathLineThree"),
  wakeButton: requiredElement<HTMLButtonElement>("#wakeButton"),
  dejaVuDialog: requiredElement<HTMLDialogElement>("#dejaVuDialog"),
  dejaVuButton: requiredElement<HTMLButtonElement>("#dejaVuButton")
};

type Site = "camp" | "wreckage" | "tide" | "jungle";

let state = createGameState();
let activity: Activity = "orienting";
let currentSite: Site = "tide";
let speedMultiplier = 1;
let lastTick = performance.now();
let deathShown = false;
let closeToDeathShown = false;
let campDiscovered = false;
let campVisited = false;
let fuelDiscoveryLogged = false;
let firstFireLogged = false;
let firstWindbreakLogged = false;
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
  const buildWindbreakTime = getBuildWindbreakTime(state);
  const gatherWaterTime = getGatherWaterTime(state);
  const gatherFoodTime = getGatherFoodTime(state);
  const woodFound = getWoodFound(state);
  const atCamp = currentSite === "camp";
  const coldRate = getColdRate(state, atCamp);
  const heatRate = getHeatRate(state, atCamp);
  const sunWarmRate = getSunWarmRate(state);
  const fireWarmRate = getFireWarmRate(state, atCamp);
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
  const windbreakPercent =
    state.foundWood >= WINDBREAK_WOOD_COST ? Math.min(100, (state.shelterProgress / buildWindbreakTime) * 100) : 0;
  const waterPercent = state.thirst < MAX_THIRST ? Math.min(100, (state.waterProgress / gatherWaterTime) * 100) : 100;
  const foodGatherPercent = state.food < MAX_FOOD ? Math.min(100, (state.foodProgress / gatherFoodTime) * 100) : 100;
  const logKnown = hasLogReadout();
  const bodyKnown = hasBodyReadout();
  const needsKnown = hasNeedsReadout();
  const fireKnown = hasFireReadout();
  const windbreakKnown = hasWindbreakReadout();
  const wreckKnown = hasWreckageSiteReadout();
  const tidePlaceKnown = hasTidePlaceReadout();
  const junglePlaceKnown = hasJunglePlaceReadout();
  const placesKnown =
    (campDiscovered && currentSite !== "camp") ||
    (wreckKnown && currentSite !== "wreckage") ||
    (tidePlaceKnown && currentSite !== "tide") ||
    (junglePlaceKnown && currentSite !== "jungle");
  const systemKnown = hasSystemReadout();

  els.cycle.textContent = `Entry ${toRoman(state.cycle)}`;
  els.bodySection.hidden = !bodyKnown;
  els.logSection.hidden = !logKnown;
  els.pageFrame.classList.toggle("page-frame-compact", !logKnown);
  els.pageFrame.classList.toggle("page-frame-expanded", logKnown);
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
  els.windbreakSupplyRow.hidden = !windbreakKnown;
  els.placesSection.hidden = !placesKnown;
  els.campSiteButton.hidden = !campDiscovered || currentSite === "camp";
  els.campSiteTitle.textContent = campVisited ? "Return to Camp" : "Set Up Camp";
  els.campSiteDetail.textContent = campVisited ? "The sheltered hollow above the wrack line." : "Make use of the hollow you marked above the tide-line.";
  els.wreckSiteButton.hidden = !wreckKnown || currentSite === "wreckage";
  els.tidePlaceButton.hidden = !tidePlaceKnown || currentSite === "tide";
  els.junglePlaceButton.hidden = !junglePlaceKnown || currentSite === "jungle";
  els.campSiteButton.disabled = !state.alive;
  els.wreckSiteButton.disabled = !state.alive;
  els.tidePlaceButton.disabled = !state.alive;
  els.junglePlaceButton.disabled = !state.alive;
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
  els.conditionDetail.textContent = getConditionDetail(coldRate, heatRate, sunWarmRate, fireWarmRate, getWindbreakProtection(state));
  els.woodText.textContent = formatWood(state.foundWood);
  els.fireText.textContent = `${Math.ceil(state.fireStrength)} / ${MAX_WARMTH}`;
  els.windbreakText.textContent = getWindbreakLabel(state.windbreakStrength, systemKnown);

  els.orientButton.hidden = !isActionAvailableAtSite("orienting");
  els.orientButton.disabled = !state.alive;
  els.orientButton.setAttribute("aria-pressed", String(activity === "orienting"));
  els.orientTitle.textContent = getActionTitle("Get Your Bearings", shoreSenseLevel);
  els.orientDetail.textContent = getBearingsDetail(shoreSenseLevel, bearingsTime, shoreSenseMasteryBonus);
  els.orientStatus.textContent = getActionStatus("orienting");
  els.orientProgressBar.style.width = `${orientPercent}%`;

  els.scavengeButton.hidden = !hasFuelReadout() || !isActionAvailableAtSite("scavenging");
  els.scavengeButton.disabled = !state.alive || !state.fuelSourceKnown;
  els.scavengeButton.setAttribute("aria-pressed", String(activity === "scavenging"));
  els.scavengeTitle.textContent = getActionTitle("Scavenge the Wreckage", scavengeLevel);
  els.scavengeDetail.textContent = getScavengeDetail(scavengeLevel, scavengeTime, woodFound, scavengeLightEfficiency, scavengeMasteryBonus);
  els.scavengeStatus.textContent = getActionStatus("scavenging");
  els.scavengeProgressBar.style.width = `${scavengePercent}%`;

  els.fireButton.hidden = !fireKnown || !isActionAvailableAtSite("tending");
  els.fireButton.disabled = !state.alive || !state.fuelSourceKnown || state.foundWood < 1;
  els.fireButton.setAttribute("aria-pressed", String(activity === "tending"));
  els.fireTitle.textContent =
    firekeepingLevel > 0 || state.fireStrength > 0 ? getActionTitle("Tend the Fire", firekeepingLevel) : "Start a Fire";
  els.fireDetail.textContent = getFireDetail(firekeepingLevel, tendFireTime, firekeepingMasteryBonus);
  els.fireStatus.textContent = getActionStatus("tending");
  els.fireProgressBar.style.width = `${state.fireStrength > 0 ? firePercent : tendPercent}%`;

  els.windbreakButton.hidden = !windbreakKnown || !isActionAvailableAtSite("sheltering");

  els.swimButton.hidden = !hasTidePlaceReadout() || !isActionAvailableAtSite("swimming");
  els.swimButton.disabled = !state.alive;
  els.swimButton.setAttribute("aria-pressed", String(activity === "swimming"));
  els.swimStatus.textContent = getActionStatus("swimming");

  els.waterButton.hidden = !hasNeedsReadout() || !isActionAvailableAtSite("drinking");
  els.waterButton.disabled = !state.alive || state.thirst >= MAX_THIRST;
  els.waterButton.setAttribute("aria-pressed", String(activity === "drinking"));
  els.waterDetail.textContent = getWaterDetail(gatherWaterTime);
  els.waterStatus.textContent = getActionStatus("drinking");
  els.waterProgressBar.style.width = `${waterPercent}%`;

  els.foodButton.hidden = !hasNeedsReadout() || !isActionAvailableAtSite("foraging");
  els.foodButton.disabled = !state.alive || state.food >= MAX_FOOD;
  els.foodButton.setAttribute("aria-pressed", String(activity === "foraging"));
  els.foodDetail.textContent = getFoodDetail(gatherFoodTime);
  els.foodStatus.textContent = getActionStatus("foraging");
  els.foodProgressBar.style.width = `${foodGatherPercent}%`;

  els.windbreakButton.disabled =
    !state.alive || !state.fuelSourceKnown || state.foundWood < WINDBREAK_WOOD_COST || state.windbreakStrength >= MAX_WINDBREAK;
  els.windbreakButton.setAttribute("aria-pressed", String(activity === "sheltering"));
  els.windbreakTitle.textContent = "Raise a Windbreak";
  els.windbreakDetail.textContent = getWindbreakDetail(buildWindbreakTime, getWindbreakProtection(state));
  els.windbreakStatus.textContent = getActionStatus("sheltering");
  els.windbreakProgressBar.style.width = `${windbreakPercent}%`;

  els.app.hidden = !state.alive;
  els.app.classList.toggle("opacity-20", !state.alive);

  for (const button of els.speedButtons) {
    const isActive = Number(button.dataset.speed) === speedMultiplier;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("border-ember-accent-strong", isActive);
    button.classList.toggle("text-ember-accent-strong", isActive);
  }

  if (!els.debugPanel.hidden) {
    els.dbgCycle.textContent = String(state.cycle);
    els.dbgAlive.textContent = String(state.alive);
    els.dbgWarmth.textContent = state.innerWarmth.toFixed(1);
    els.dbgThirst.textContent = state.thirst.toFixed(1);
    els.dbgFood.textContent = state.food.toFixed(1);
    els.dbgPhase.textContent = getExposurePhase(state);
    els.dbgWetness.textContent = state.wetness.toFixed(1);
    els.dbgCtdShown.textContent = String(closeToDeathShown);
    els.dbgCtdCond.textContent = String(isCloseToDeath(state));
    els.dbgDeathShown.textContent = String(deathShown);
  }
}

function tick(now: number): void {
  if (els.closeToDeathDialog.open || els.dejaVuDialog.open) {
    lastTick = now;
    requestAnimationFrame(tick);
    return;
  }

  const elapsed = Math.min(0.25, (now - lastTick) / 1000) * (speedMultiplier / 5);
  lastTick = now;

  if (!canReset(state)) {
    const previousWood = state.foundWood;
    const previousFire = state.fireStrength;
    const previousWindbreak = state.windbreakStrength;
    const previousThirst = state.thirst;
    const previousFood = state.food;
    const previousShoreSenseXp = state.shoreSenseXp;
    const previousShoreSenseLevel = getShoreSenseLevel(state);
    const previousScavengeLevel = getScavengeLevel(state);
    const previousFirekeepingLevel = getFirekeepingLevel(state);
    const knewFuelSource = state.fuelSourceKnown;
    const previousExposurePhase = lastExposurePhase;
    const previousJungleThreat = getJungleThreat(state);
    const activeActivity = isActionAvailableAtSite(activity) ? activity : "orienting";
    state = runTick(state, elapsed, activeActivity, currentSite === "camp");

    if (activeActivity === "swimming" && state.alive && Math.random() < elapsed * SURF_PREDATOR_CHANCE_PER_SECOND) {
      state = { ...state, alive: false, deathCause: "surf" };
      addLog("A dark shape rolls under the green water. The surf closes over you before you can draw breath.");
    }

    const fireOut = currentSite !== "camp" || state.fireStrength <= 0;
    const phase = getExposurePhase(state);
    if (state.alive && phase === "night" && fireOut && Math.random() < elapsed * NIGHT_PREDATOR_CHANCE_PER_SECOND) {
      state = { ...state, alive: false, deathCause: "predator" };
      addLog("Something moves at the edge of the dark. Fast. Low. Gone before you understand what happened.");
    }
    if (state.alive && phase === "sunset" && currentSite !== "camp" && Math.random() < elapsed * SUNSET_PREDATOR_CHANCE_PER_SECOND) {
      state = { ...state, alive: false, deathCause: "predator" };
      addLog("The light goes wrong just before it happens. You don't see it. You only feel the weight.");
    }

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
      if (!campDiscovered && previousShoreSenseLevel < 3 && getShoreSenseLevel(state) >= 3) {
        campDiscovered = true;
        addLog("Above the tide-line, a rock shelf out of the direct wind. A place where a fire could last the night. You mark it.");
      }
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

    if (state.windbreakStrength > previousWindbreak + 1) {
      if (!firstWindbreakLogged) {
        firstWindbreakLogged = true;
        addLog("The wreckage stands unevenly, but the wind breaks around it.");
      } else {
        addLog("Another plank finds its place. The shore gives you a little less weather.");
      }
    }

    if (state.thirst > previousThirst + 1) {
      addLog("Cold seep water cuts the salt from your mouth for a while.");
    }

    if (state.food > previousFood + 1) {
      addLog("You swallow what the rocks surrender. It sits strange, but it gives the body something to burn.");
    }

    addJungleNoiseLogs(previousJungleThreat, getJungleThreat(state));

    if (getFirekeepingLevel(state) > previousFirekeepingLevel) {
      addLog(getFirekeepingLevelMessage(getFirekeepingLevel(state)));
    }

    if (canReset(state) && !deathShown) {
      if (els.closeToDeathDialog.open) {
        els.closeToDeathDialog.close();
      }
      showDeathDialog();
    } else if (!closeToDeathShown && !deathShown && isCloseToDeath(state)) {
      showCloseToDeathDialog();
    }
    render();
  }

  requestAnimationFrame(tick);
}

els.orientButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!isActionAvailableAtSite("orienting")) return;

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
  if (!isActionAvailableAtSite("scavenging")) return;

  activity = "scavenging";
  addLog("You pick through the wreckage for anything useful. Dry pieces go aside for fire or shelter.");
  render();
});

els.fireButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!state.fuelSourceKnown || state.foundWood < 1) return;
  if (!isActionAvailableAtSite("tending")) return;

  activity = "tending";
  addLog(state.fireStrength > 0 ? "You crouch near the coals and feed the fire." : "You clear a place above the wash and try to make the first fire.");
  render();
});

els.windbreakButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!state.fuelSourceKnown || state.foundWood < WINDBREAK_WOOD_COST || state.windbreakStrength >= MAX_WINDBREAK) return;
  if (!isActionAvailableAtSite("sheltering")) return;

  activity = "sheltering";
  addLog(state.windbreakStrength > 0 ? "You press more wreckage into the rough windbreak." : "You drag planks above the wash and make the wind go around you.");
  render();
});

els.swimButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!isActionAvailableAtSite("swimming")) return;

  activity = "swimming";
  addLog("You wade into the surf until the cold water reaches your chest. Something brushes past your leg, then is gone.");
  render();
});

els.waterButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (state.thirst >= MAX_THIRST) return;
  if (!isActionAvailableAtSite("drinking")) return;

  activity = "drinking";
  addLog("You kneel where water beads through dark stone and try to catch it before the salt reaches it.");
  render();
});

els.foodButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (state.food >= MAX_FOOD) return;
  if (!isActionAvailableAtSite("foraging")) return;

  activity = "foraging";
  addLog("You work the rocks for tight shells, slick weed, and anything your hunger dares to name as food.");
  render();
});

els.campSiteButton.addEventListener("click", () => {
  goToSite("camp");
});

els.wreckSiteButton.addEventListener("click", () => {
  goToSite("wreckage");
});

els.tidePlaceButton.addEventListener("click", () => {
  goToSite("tide");
});

els.junglePlaceButton.addEventListener("click", () => {
  goToSite("jungle");
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
  currentSite = "tide";
  campDiscovered = false;
  campVisited = false;
  fuelDiscoveryLogged = state.fuelSourceKnown;
  firstFireLogged = false;
  firstWindbreakLogged = false;
  jungleNoiseStage = 0;
  lastExposurePhase = getExposurePhase(state);
  deathShown = false;
  closeToDeathShown = false;
  els.deathDialog.close();
  els.log.replaceChildren();
  addLogs(getWakeMessages(nextFuelRecognition, nextColdFamiliarity, rememberedFuelSource));
  render();

  if (state.cycle === 2) {
    els.dejaVuDialog.showModal();
  }
});

els.debugToggle.addEventListener("click", () => {
  const open = els.debugPanel.hidden;
  els.debugPanel.hidden = !open;
  els.debugEyeOpen.hidden = open;
  els.debugEyeClosed.hidden = !open;
  els.debugToggle.setAttribute("aria-pressed", String(open));
  render();
});

els.keepGoingButton.addEventListener("click", () => {
  els.closeToDeathDialog.close();
});

els.dejaVuButton.addEventListener("click", () => {
  els.dejaVuDialog.close();
});

function getActivitySummary(): string {
  if (speedMultiplier === 0) return "Paused";
  if (!state.alive) return "Ended";
  if (!hasLogReadout()) return "The shore is bright.";
  if (!hasFuelReadout()) return "An entry is forming.";
  if (activity === "orienting") return getSiteSummary();
  if (activity === "scavenging") return "Sorting the wreckage.";
  if (activity === "sheltering") return "Raising a windbreak.";
  if (activity === "swimming") return "In the surf.";
  if (activity === "drinking") return "Catching seep water.";
  if (activity === "foraging") return "Working the rocks.";
  return state.fireStrength > 0 ? "Keeping the dark back." : "Making a first fire.";
}

function getSiteSummary(): string {
  if (currentSite === "camp") return "At camp.";
  if (currentSite === "wreckage") return "At the wreckage.";
  if (currentSite === "tide") return "At the tide-line.";
  return "At the jungle line.";
}

function goToSite(site: Site): void {
  if (!state.alive || currentSite === site) return;

  const previousSite = currentSite;
  currentSite = site;
  if (site === "camp") campVisited = true;
  activity = getDefaultActivityForSite(site);
  addLog(getSiteTravelMessage(previousSite, site));
  render();
}

function getDefaultActivityForSite(site: Site): Activity {
  if (site === "wreckage") return "scavenging";
  return "orienting";
}

function isActionAvailableAtSite(action: Activity): boolean {
  if (action === "orienting") return true;
  if (action === "scavenging") return currentSite === "wreckage";
  if (action === "tending" || action === "sheltering") return currentSite === "camp";
  if (action === "swimming") return currentSite === "tide";
  if (action === "drinking" || action === "foraging") return currentSite === "tide";
  return false;
}

function getSiteTravelMessage(previousSite: Site, nextSite: Site): string {
  if (nextSite === "camp") {
    return previousSite === "wreckage"
      ? "You leave the broken planks and return to the small place you can defend."
      : "You follow your own marks back to camp.";
  }

  if (nextSite === "wreckage") {
    return "You move along the foam to the broken ribs of the wreckage.";
  }

  if (nextSite === "tide") {
    return "You follow the high-water mark where the shore keeps its finds.";
  }

  return "You stop at the jungle line and listen before stepping closer.";
}

function getActionTitle(label: string, level: number): string {
  if (!hasSystemReadout() || level < 1) return label;

  return `${label} - Lv ${level}`;
}

function getBearingsDetail(level: number, bearingsTime: number, masteryBonus: number): string {
  const remaining = Math.max(0, bearingsTime - state.bearingsProgress).toFixed(1);
  if (level < 1) {
    return "Hold still until one clear thing reaches you.";
  }

  if (level < 2) {
    return "Notice light, water, and the shape beneath you.";
  }

  if (level < 3) {
    return "Sort the wreckage from the wider tide-line.";
  }

  if (level < 10) {
    return "Keep reading the shore for the next useful pattern.";
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

function getWindbreakDetail(buildWindbreakTime: number, protection: number): string {
  const remaining = Math.max(0, buildWindbreakTime - state.shelterProgress).toFixed(1);
  if (state.windbreakStrength >= MAX_WINDBREAK) return "The rough wall is as solid as loose wreckage can make it.";
  if (state.foundWood < WINDBREAK_WOOD_COST) return "Gather a real bundle of wreckage before trying to make shelter.";

  if (!hasSystemReadout()) {
    if (state.windbreakStrength <= 0) return "Lean wreckage against the wind and leave a strip of shade.";
    return "Tighten the rough wall where wind and sun still find you.";
  }

  return `Spend ${WINDBREAK_WOOD_COST} wood in ${remaining}s. Heat and cold pressure -${Math.round(protection * 100)}%.`;
}

function getWaterDetail(gatherWaterTime: number): string {
  if (state.thirst >= MAX_THIRST) return "Your mouth is quiet for now.";

  if (!hasSystemReadout()) {
    if (state.thirst < 35) return "The thin freshwater beads vanish almost as quickly as you find them.";
    return "Find the thin places where fresh water threads through stone.";
  }

  return `Restore +${WATER_FOUND} thirst in ${gatherWaterTime.toFixed(1)}s.`;
}

function getFoodDetail(gatherFoodTime: number): string {
  if (state.food >= MAX_FOOD) return "Your belly stops asking for the moment.";

  if (!hasSystemReadout()) {
    if (state.food < 35) return "Shells fight your fingers. Hunger makes the work less delicate.";
    return "Work loose shellfish and edible kelp from the rocks.";
  }

  return `Restore +${FOOD_FOUND} food in ${gatherFoodTime.toFixed(1)}s.`;
}

function getShoreSenseCompletionMessage(previousLevel: number, currentLevel: number, completions: number): string {
  if (previousLevel < 1 && currentLevel >= 1) {
    return "A pale haze clings to everything. The shore is a smear of light, salt, and panic.";
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
    if (bodyTemperature >= MAX_WARMTH) return "dead";
    if (bodyTemperature < 25) return "numb";
    if (bodyTemperature < 40) return "shivering";
    if (bodyTemperature < 60) return "steady";
    if (bodyTemperature < 75) return "flushed";
    if (bodyTemperature < 88) return "searing";
    if (bodyTemperature < 97) return "burning";
    return "collapse";
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

function getWindbreakLabel(strength: number, systemKnown = hasSystemReadout()): string {
  if (systemKnown) return `${Math.ceil(strength)} / ${MAX_WINDBREAK}`;
  if (strength <= 0) return "none";
  if (strength < 75) return "rough";
  if (strength < MAX_WINDBREAK) return "holding";
  return "sheltered";
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
  return getShoreSenseLevel(state) >= 1;
}

function hasBodyReadout(): boolean {
  return hasLightReadout(state);
}

function hasNeedsReadout(): boolean {
  return getShoreSenseLevel(state) >= 3;
}

function hasFuelReadout(): boolean {
  return getShoreSenseLevel(state) >= 2;
}

function hasWreckageSiteReadout(): boolean {
  return hasFuelReadout();
}

function hasFireReadout(): boolean {
  return hasFuelReadout() && (state.foundWood >= 1 || state.fireStrength > 0 || getFirekeepingLevel(state) > 0 || state.maxFirekeepingLevel > 0);
}

function hasWindbreakReadout(): boolean {
  return hasFuelReadout() && (state.foundWood >= 1 || state.windbreakStrength > 0);
}

function hasTidePlaceReadout(): boolean {
  return getShoreSenseLevel(state) >= 3;
}

function hasJunglePlaceReadout(): boolean {
  return getShoreSenseLevel(state) >= 4;
}

function hasSystemReadout(): boolean {
  return getShoreSenseLevel(state) >= 10;
}

function getActionStatus(action: Activity): string {
  if (!state.alive) return "Stopped";
  if (action === "scavenging" && !state.fuelSourceKnown) return "Locked";
  if (action === "tending" && !state.fuelSourceKnown) return "Locked";
  if (action === "sheltering" && !state.fuelSourceKnown) return "Locked";
  if (action === "tending" && state.foundWood < 1) return "No Wood";
  if (action === "sheltering" && state.windbreakStrength >= MAX_WINDBREAK) return "Built";
  if (action === "sheltering" && state.foundWood < WINDBREAK_WOOD_COST) return `Need ${WINDBREAK_WOOD_COST} Wood`;
  if (action === "drinking" && state.thirst >= MAX_THIRST) return "Quiet";
  if (action === "foraging" && state.food >= MAX_FOOD) return "Quiet";
  if (action === "orienting" && activity !== action) {
    return "Idle";
  }
  if (action === "scavenging" && activity !== action) {
    return "Idle";
  }
  if (action === "tending" && activity !== action) {
    return "Idle";
  }
  if (action === "sheltering" && activity !== action) {
    return "Idle";
  }
  if (action === "swimming" && activity !== action) {
    return hasSystemReadout() ? `Cools to ${SWIM_COOL_TARGET}` : "Cold surf";
  }
  if (action === "drinking" && activity !== action) {
    return "Thirst";
  }
  if (action === "foraging" && activity !== action) {
    return "Food";
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

function getConditionDetail(coldRate: number, heatRate: number, sunWarmRate: number, fireWarmRate: number, windbreakProtection: number): string {
  const phase = getExposurePhase(state);
  const needsKnown = hasNeedsReadout();
  const systemKnown = hasSystemReadout();
  const hasWindbreak = windbreakProtection > 0;

  if (phase === "sunlit") {
    if (!hasLightReadout(state)) {
      return `Something in the air is holding the worst of the shore back.`;
    }
    if (getTimeInDay(state) < getDawnEnd(state)) {
      if (!systemKnown) {
        if (hasWindbreak) return `Dawn warms the rough shelter. Wind passes around it instead of through you.`;
        return needsKnown
          ? `Dawn keeps the chill off, though your mouth and belly are beginning to report in.`
          : `Dawn keeps the worst chill off your skin.`;
      }
      return hasWindbreak
        ? `Dawn pulls body temp toward steady ${sunWarmRate.toFixed(1)}/s. Windbreak reduces heat and cold pressure ${Math.round(windbreakProtection * 100)}%.`
        : `Dawn pulls body temp toward steady ${sunWarmRate.toFixed(1)}/s.`;
    }
    if (getDayNumber(state) > 1) {
      if (!systemKnown) {
        return needsKnown
          ? `The returning sun warms you, but the heat asks for water.`
          : `The returning sun holds the shore in a livable glare.`;
      }
      return hasWindbreak
        ? `The returning sun pushes body temp +${heatRate.toFixed(1)}/s. Windbreak reduces heat and cold pressure ${Math.round(windbreakProtection * 100)}%.`
        : `The returning sun pushes body temp +${heatRate.toFixed(1)}/s. Thirst drains faster.`;
    }
    if (!systemKnown) {
      if (hasWindbreak) return `The sun leans hard on the shore, but the rough wall keeps a little shade.`;
      return needsKnown ? `The day warms you, but the heat asks for water.` : `The day holds the shore in a livable glare.`;
    }
    return hasWindbreak
      ? `The day pushes body temp +${heatRate.toFixed(1)}/s. Windbreak reduces heat and cold pressure ${Math.round(windbreakProtection * 100)}%.`
      : `The day pushes body temp +${heatRate.toFixed(1)}/s. Thirst drains faster.`;
  }

  if (phase === "sunset") {
    if (!systemKnown) {
      if (hasWindbreak) return `The light is leaving. Cold finds the gaps, but not your whole skin.`;
      return needsKnown
        ? `The light is leaving. Cold creeps in, and hunger makes it sharper.`
        : `The light is leaving, and the shore stops helping.`;
    }
    return hasWindbreak
      ? `The light is leaving. Windbreak softens the cold to -${coldRate.toFixed(1)}/s.`
      : `The light is leaving. Cold pulls body temp -${coldRate.toFixed(1)}/s. Hunger bites harder.`;
  }

  if (getJungleThreat(state) >= 75) {
    if (!systemKnown) {
      return `The fire is losing its luster. The jungle grows louder at the edge of the light.`;
    }
    return hasWindbreak
      ? `The fire is losing its luster. Windbreak softens the cold; the jungle still presses in.`
      : `The fire is losing its luster. It pulls body temp toward steady ${fireWarmRate.toFixed(1)}/s; cold and the jungle press in.`;
  }

  if (!systemKnown) {
    if (hasWindbreak) return `Firelight and wreckage make a small shape the night has to move around.`;
    return `Firelight holds close. Past it, the dark keeps moving.`;
  }
  return hasWindbreak
    ? `Fire pulls body temp toward steady ${fireWarmRate.toFixed(1)}/s. Windbreak softens the cold to -${coldRate.toFixed(1)}/s.`
    : `Fire pulls body temp toward steady ${fireWarmRate.toFixed(1)}/s. Cold pulls body temp -${coldRate.toFixed(1)}/s.`;
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

function isCloseToDeath(s: GameState): boolean {
  return s.innerWarmth <= 12 || s.innerWarmth >= 88 || s.thirst <= 12 || s.food <= 12;
}

function showCloseToDeathDialog(): void {
  closeToDeathShown = true;
  els.closeToDeathDialog.showModal();
}

function showDeathDialog(): void {
  deathShown = true;
  els.deathTitle.textContent = getDeathTitle(state);
  const deathCopy = getDeathCopy(state);
  els.deathLineOne.textContent = deathCopy[0];
  els.deathLineTwo.textContent = deathCopy[1];
  els.deathLineThree.textContent = deathCopy[2];
  els.deathDialog.showModal();
}

function getDeathTitle(currentState: GameState): string {
  if (currentState.deathCause === "surf") return "Something in the water takes you.";
  if (currentState.thirst <= 0) return "Thirst takes you.";
  if (currentState.food <= 0) return "Hunger hollows you out.";
  if (currentState.innerWarmth >= MAX_WARMTH) return "Heat takes you.";
  if (currentState.innerWarmth <= 0) return "Cold takes you.";
  if (getJungleThreat(currentState) >= 75) return "The jungle reaches the shore.";
  return "The body gives out.";
}

function getDeathCopy(currentState: GameState): readonly [string, string, string] {
  if (currentState.deathCause === "surf") {
    return [
      "The cold was useful for one breath.",
      "Then the water opened beneath you, all pressure and teeth and green-black light.",
      "The shore is gone before fear can become a thought."
    ];
  }

  if (currentState.deathCause === "thirst") {
    return [
      "Your mouth has forgotten how to be wet.",
      "The surf keeps offering itself, bright with salt and no mercy.",
      "You close your eyes with the shape of fresh water still missing from the shore."
    ];
  }

  if (currentState.deathCause === "hunger") {
    return [
      "Your body empties itself into weakness.",
      "Hands, knees, breath - each one becomes too heavy to command.",
      "You close your eyes knowing the shore must have hidden food somewhere."
    ];
  }

  if (currentState.deathCause === "heat") {
    return [
      "The sun presses everything flat and white.",
      "Your thoughts dry out before your body stops moving.",
      "You close your eyes carrying one lesson: heat can kill as cleanly as cold."
    ];
  }

  if (currentState.deathCause === "cold") {
    return [
      "The cold finishes its slow work.",
      "Fingers, breath, flame - all of them go distant, then quiet.",
      "You close your eyes with the shape of shelter still unfinished."
    ];
  }

  return [
    "You are nearing the end of your life.",
    "You feel that you could have achieved much more.",
    "Filled with unwillingness, you close your eyes, hoping to start over."
  ];
}

function getWakeMessages(
  fuelRecognition: number,
  _coldFamiliarity: number,
  rememberedFuelSource: boolean
): readonly string[] {
  if (!rememberedFuelSource) {
    return [
      "Three gull-cries. One broken wave. You wake on the same shore.",
      "A haze lies over the first moments. The cold is familiar, but the tide-line still needs reading."
    ];
  }

  const messages: readonly string[][] = [
    [
      "Three gull-cries. One broken wave. The same salt wind opens your eyes.",
      "The haze thins around one practical certainty: before you look, you know where the first kindling will be."
    ],
    [
      "Three gull-cries. One broken wave. The shore repeats itself exactly.",
      "The haze is still there, but your hands know what will burn. The wind bites, but not quite as deeply."
    ],
    [
      "Three gull-cries. One broken wave. The loop has a rhythm now.",
      "Dry wood catches your eye before the cold can steal your focus."
    ]
  ];

  const messageIndex = Math.min(fuelRecognition - 1, messages.length - 1);
  return messages[messageIndex] ?? [
    "Three gull-cries. One broken wave. The same salt wind opens your eyes.",
    "The haze thins around one practical certainty: before you look, you know where the first kindling will be."
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
