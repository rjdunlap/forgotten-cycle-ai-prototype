import {
  MAX_WARMTH,
  type Activity,
  canReset,
  createGameState,
  getBearingsTime,
  getColdRate,
  getExposurePhase,
  getFirekeepingLevel,
  getFirekeepingMasteryBonus,
  getFireWarmRate,
  getNextFirekeepingXp,
  getNextScavengeXp,
  getNextShoreSenseXp,
  getScavengeLevel,
  getScavengeLightEfficiency,
  getScavengeMasteryBonus,
  getShoreSenseMasteryBonus,
  getScavengeTime,
  getShoreSenseLevel,
  getSunWarmRate,
  getTendFireTime,
  getWoodFound,
  hasLightReadout,
  resetCycle,
  runTick,
  type GameState
} from "./game.ts";

import "./styles.css";

const els = {
  cycle: requiredElement<HTMLElement>("#cycle"),
  lightRow: requiredElement<HTMLElement>("#lightRow"),
  lightText: requiredElement<HTMLElement>("#lightText"),
  activitySummary: requiredElement<HTMLElement>("#activitySummary"),
  warmthBar: requiredElement<HTMLElement>("#warmthBar"),
  warmthText: requiredElement<HTMLElement>("#warmthText"),
  conditionDetail: requiredElement<HTMLElement>("#conditionDetail"),
  woodText: requiredElement<HTMLElement>("#woodText"),
  fireText: requiredElement<HTMLElement>("#fireText"),
  orientButton: requiredElement<HTMLButtonElement>("#orientButton"),
  orientDetail: requiredElement<HTMLElement>("#orientDetail"),
  orientStatus: requiredElement<HTMLElement>("#orientStatus"),
  orientProgressBar: requiredElement<HTMLElement>("#orientProgressBar"),
  scavengeButton: requiredElement<HTMLButtonElement>("#scavengeButton"),
  scavengeDetail: requiredElement<HTMLElement>("#scavengeDetail"),
  scavengeStatus: requiredElement<HTMLElement>("#scavengeStatus"),
  scavengeProgressBar: requiredElement<HTMLElement>("#scavengeProgressBar"),
  fireButton: requiredElement<HTMLButtonElement>("#fireButton"),
  fireDetail: requiredElement<HTMLElement>("#fireDetail"),
  fireStatus: requiredElement<HTMLElement>("#fireStatus"),
  fireProgressBar: requiredElement<HTMLElement>("#fireProgressBar"),
  speedButtons: [...document.querySelectorAll<HTMLButtonElement>(".speedButton")],
  log: requiredElement<HTMLOListElement>("#log"),
  app: requiredElement<HTMLElement>("#app"),
  deathDialog: requiredElement<HTMLDialogElement>("#deathDialog"),
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
  const percent = (state.innerWarmth / MAX_WARMTH) * 100;
  const firePercent = (state.fireStrength / MAX_WARMTH) * 100;
  const bearingsTime = getBearingsTime(state);
  const scavengeTime = getScavengeTime(state);
  const tendFireTime = getTendFireTime(state);
  const woodFound = getWoodFound(state);
  const coldRate = getColdRate(state);
  const sunWarmRate = getSunWarmRate(state);
  const fireWarmRate = getFireWarmRate(state);
  const shoreSenseLevel = getShoreSenseLevel(state);
  const nextShoreSenseXp = getNextShoreSenseXp(state);
  const shoreSenseMasteryBonus = getShoreSenseMasteryBonus(state);
  const scavengeLevel = getScavengeLevel(state);
  const nextScavengeXp = getNextScavengeXp(state);
  const scavengeMasteryBonus = getScavengeMasteryBonus(state);
  const scavengeLightEfficiency = getScavengeLightEfficiency(state);
  const firekeepingLevel = getFirekeepingLevel(state);
  const nextFirekeepingXp = getNextFirekeepingXp(state);
  const firekeepingMasteryBonus = getFirekeepingMasteryBonus(state);
  const orientPercent = Math.min(100, (state.bearingsProgress / bearingsTime) * 100);
  const scavengePercent = state.fuelSourceKnown ? Math.min(100, (state.searchProgress / scavengeTime) * 100) : 0;
  const tendPercent = state.foundWood >= 1 ? Math.min(100, (state.fireProgress / tendFireTime) * 100) : 0;

  els.cycle.textContent = `Entry ${toRoman(state.cycle)}`;
  els.lightRow.hidden = !hasLightReadout(state);
  els.lightText.textContent = getLightLabel();
  els.activitySummary.textContent = getActivitySummary();
  els.warmthBar.style.width = `${percent}%`;
  els.warmthText.textContent = state.alive ? `${Math.ceil(state.innerWarmth)} / ${MAX_WARMTH}` : "cold";
  els.conditionDetail.textContent = getConditionDetail(coldRate, sunWarmRate, fireWarmRate);
  els.woodText.textContent = formatWood(state.foundWood);
  els.fireText.textContent = `${Math.ceil(state.fireStrength)} / ${MAX_WARMTH}`;

  els.orientButton.disabled = !state.alive;
  els.orientButton.setAttribute("aria-pressed", String(activity === "orienting"));
  els.orientDetail.textContent = state.fuelSourceKnown
    ? `Shore Sense Lv ${shoreSenseLevel} (${state.shoreSenseXp}/${nextShoreSenseXp}) - next insight in ${Math.max(0, bearingsTime - state.bearingsProgress).toFixed(1)}s. Mastery +${Math.round(shoreSenseMasteryBonus * 100)}%.`
    : `Notice tide-line signs in ${Math.max(0, bearingsTime - state.bearingsProgress).toFixed(1)}s.`;
  els.orientStatus.textContent = getActionStatus("orienting");
  els.orientProgressBar.style.width = `${orientPercent}%`;

  els.scavengeButton.hidden = !state.fuelSourceKnown;
  els.scavengeButton.disabled = !state.alive || !state.fuelSourceKnown;
  els.scavengeButton.setAttribute("aria-pressed", String(activity === "scavenging"));
  els.scavengeDetail.textContent = state.fuelSourceKnown
    ? `Scavenge Lv ${scavengeLevel} (${state.scavengeXp}/${nextScavengeXp}) - collect +${formatWood(woodFound)} wood about every ${scavengeTime.toFixed(1)}s.${getScavengeLightNote(scavengeLightEfficiency)} Mastery +${Math.round(scavengeMasteryBonus * 100)}%.`
    : "Find wood signs before scavenging.";
  els.scavengeStatus.textContent = getActionStatus("scavenging");
  els.scavengeProgressBar.style.width = `${scavengePercent}%`;

  els.fireButton.hidden = !state.fuelSourceKnown;
  els.fireButton.disabled = !state.alive || !state.fuelSourceKnown || state.foundWood < 1;
  els.fireButton.setAttribute("aria-pressed", String(activity === "tending"));
  els.fireDetail.textContent =
    state.foundWood >= 1
      ? `Firekeeping Lv ${firekeepingLevel} (${state.firekeepingXp}/${nextFirekeepingXp}) - spend 1 wood in ${tendFireTime.toFixed(1)}s. Mastery +${Math.round(firekeepingMasteryBonus * 100)}%.`
      : "Collect wood before the fire can help.";
  els.fireStatus.textContent = getActionStatus("tending");
  els.fireProgressBar.style.width = `${activity === "tending" ? tendPercent : firePercent}%`;

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
    const previousShoreSenseLevel = getShoreSenseLevel(state);
    const previousScavengeLevel = getScavengeLevel(state);
    const previousFirekeepingLevel = getFirekeepingLevel(state);
    const knewFuelSource = state.fuelSourceKnown;
    const previousExposurePhase = lastExposurePhase;
    state = runTick(state, elapsed, activity);
    lastExposurePhase = getExposurePhase(state);

    if (!knewFuelSource && state.fuelSourceKnown && !fuelDiscoveryLogged) {
      fuelDiscoveryLogged = true;
      activity = "orienting";
      addLog("The light resolves into low sun. Above the wrack line, pale splinters and dry needles mark kindling for a first fire.");
    }

    if (lastExposurePhase !== previousExposurePhase) {
      addLog(getExposureShiftMessage(lastExposurePhase));
    }

    if (knewFuelSource && getShoreSenseLevel(state) > previousShoreSenseLevel) {
      addLog(`You read the wind and wrack more cleanly. Shore Sense reaches Lv ${getShoreSenseLevel(state)} this entry.`);
    }

    if (state.foundWood > previousWood) {
      addLog(findWoodMessage(state));
    }

    if (getScavengeLevel(state) > previousScavengeLevel) {
      addLog(`Your hands sort the tide-line faster. Scavenge reaches Lv ${getScavengeLevel(state)} this entry.`);
    }

    if (state.fireStrength > previousFire + 1) {
      addLog("The fire catches higher. Heat pushes back against the shore.");
    }

    if (getFirekeepingLevel(state) > previousFirekeepingLevel) {
      addLog(`You learn how the coals breathe. Firekeeping reaches Lv ${getFirekeepingLevel(state)} this entry.`);
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
  addLog("You search the tide-line for wood the fire might accept.");
  render();
});

els.fireButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!state.fuelSourceKnown || state.foundWood < 1) return;

  activity = "tending";
  addLog("You crouch near the coals and feed the fire.");
  render();
});

for (const button of els.speedButtons) {
  button.addEventListener("click", () => {
    speedMultiplier = Number(button.dataset.speed) || 1;
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
  lastExposurePhase = getExposurePhase(state);
  deathShown = false;
  els.deathDialog.close();
  addLogs(getWakeMessages(nextFuelRecognition, nextColdFamiliarity, rememberedFuelSource));
  render();
});

function getActivitySummary(): string {
  if (activity === "orienting") return "Current: reading the shore";
  if (activity === "scavenging") return "Current: collecting wood";
  return "Current: tending the fire";
}

function getActionStatus(action: Activity): string {
  if (!state.alive) return "Stopped";
  if (action === "scavenging" && !state.fuelSourceKnown) return "Locked";
  if (action === "tending" && !state.fuelSourceKnown) return "Locked";
  if (action === "tending" && state.foundWood < 1) return "No Wood";
  if (action === "orienting" && activity !== action) {
    return `Lv ${getShoreSenseLevel(state)}`;
  }
  if (action === "scavenging" && activity !== action) {
    return `Lv ${getScavengeLevel(state)}`;
  }
  if (action === "tending" && activity !== action) {
    return `Lv ${getFirekeepingLevel(state)}`;
  }
  return activity === action ? "Active" : "Idle";
}

function getLightLabel(): string {
  const phase = getExposurePhase(state);
  if (phase === "sunlit") return "low sun";
  if (phase === "sunset") return "fading";
  return "gone";
}

function getConditionDetail(coldRate: number, sunWarmRate: number, fireWarmRate: number): string {
  const phase = getExposurePhase(state);
  if (phase === "sunlit") {
    if (!hasLightReadout(state)) {
      return `Something warm still holds the cold back.`;
    }
    return `The sun warms +${sunWarmRate.toFixed(1)}/s. Shadows are still short.`;
  }

  if (phase === "sunset") {
    return `The light is leaving. Cold drains ${coldRate.toFixed(1)}/s.`;
  }

  return `Fire warms +${fireWarmRate.toFixed(1)}/s. Cold drains ${coldRate.toFixed(1)}/s.`;
}

function getScavengeLightNote(efficiency: number): string {
  if (efficiency >= 1) return "";

  return ` Low light ${Math.round(efficiency * 100)}%.`;
}

function getExposureShiftMessage(phase: ReturnType<typeof getExposurePhase>): string {
  if (phase === "sunset") {
    return "The sun slips behind the black trees. The shore stops feeling harmless.";
  }

  if (phase === "night") {
    return "Night settles in. Warmth now belongs to the fire, or it leaves you.";
  }

  return "The sun finds your skin again.";
}

function findWoodMessage(currentState: GameState): string {
  const messages: readonly [string, string, string, string] = [
    "You find soggy driftwood. It might burn if the coals are patient.",
    "Dry pine needles hide under a stone lip.",
    "A cedar log waits just above the tide mark.",
    "You strip brittle bark from a fallen branch."
  ];

  const messageIndex = Math.max(0, Math.floor(currentState.foundWood - 1)) % messages.length;
  return messages[messageIndex] ?? messages[0];
}

function showDeathDialog(): void {
  deathShown = true;
  els.deathStats.textContent = `You lasted ${formatDuration(state.timeAlive)} and found ${formatWood(state.foundWood)} wood.`;
  els.deathLesson.textContent = getDeathLesson(state.cycle);
  els.deathDialog.showModal();
}

function getDeathLesson(cycle: number): string {
  const lessons: readonly [string, string, string] = [
    "The cold snaps shut. Then, impossibly, your fingers remember where dry wood waits.",
    "Your chest still expects the last breath. Your hands remember bark from rot, cedar from soaked driftwood.",
    "The shore is less silent now. Useful wood stands out before the thought is finished."
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
