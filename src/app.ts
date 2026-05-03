import {
  BEARINGS_TIME,
  MAX_WARMTH,
  type Activity,
  canReset,
  createGameState,
  getColdRate,
  getScavengeTime,
  getWarmthFound,
  resetCycle,
  runTick,
  type GameState
} from "./game.ts";

import "./styles.css";

const els = {
  cycle: requiredElement<HTMLElement>("#cycle"),
  activityTitle: requiredElement<HTMLElement>("#activityTitle"),
  progressBar: requiredElement<HTMLElement>("#progressBar"),
  progressText: requiredElement<HTMLElement>("#progressText"),
  rate: requiredElement<HTMLElement>("#rate"),
  workButton: requiredElement<HTMLButtonElement>("#workButton"),
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

function render(): void {
  const percent = (state.innerWarmth / MAX_WARMTH) * 100;
  const scavengeTime = getScavengeTime(state);
  const warmthFound = getWarmthFound(state);
  const coldRate = getColdRate(state);

  els.cycle.textContent = String(state.cycle);
  els.activityTitle.textContent = getActivityTitle();
  els.progressBar.style.width = `${percent}%`;
  els.progressText.textContent = state.alive ? `${Math.ceil(state.innerWarmth)} / ${MAX_WARMTH}` : "cold";
  els.rate.textContent = getRateText(warmthFound, scavengeTime, coldRate);
  els.workButton.disabled = !state.alive || (!state.fuelSourceKnown && activity === "orienting");
  els.workButton.textContent = getButtonText();
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
    const knewFuelSource = state.fuelSourceKnown;
    state = runTick(state, elapsed, activity);

    if (!knewFuelSource && state.fuelSourceKnown && !fuelDiscoveryLogged) {
      fuelDiscoveryLogged = true;
      activity = "resting";
      addLog("Above the wrack line, pale splinters and dry needles mark a place worth scavenging.");
    }

    if (state.foundWood > previousWood) {
      addLog(findWoodMessage(state));
    }

    if (canReset(state) && !deathShown) {
      showDeathDialog();
    }
    render();
  }

  requestAnimationFrame(tick);
}

els.workButton.addEventListener("click", () => {
  if (!state.alive) return;
  if (!state.fuelSourceKnown) return;

  activity = activity === "scavenging" ? "resting" : "scavenging";
  addLog(activity === "scavenging" ? "You search the tide-line for anything dry." : "You curl against the wind and wait.");
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

  const nextFuelRecognition = state.fuelRecognition + 1;
  const nextColdFamiliarity = state.coldFamiliarity + 1;
  state = resetCycle(state);
  activity = "resting";
  fuelDiscoveryLogged = true;
  deathShown = false;
  els.deathDialog.close();
  addLog(getWakeMessage(nextFuelRecognition, nextColdFamiliarity));
  render();
});

function getActivityTitle(): string {
  if (!state.fuelSourceKnown) return "Get Your Bearings";
  return activity === "scavenging" ? "Scavenge the Tide-Line" : "Hold Still";
}

function getRateText(warmthFound: number, scavengeTime: number, coldRate: number): string {
  const speedNote = speedMultiplier === 5 ? "testing pace" : `${speedMultiplier}x`;

  if (!state.fuelSourceKnown) {
    const remaining = Math.max(0, BEARINGS_TIME - state.bearingsProgress);
    return `Tide-line signs in ${remaining.toFixed(1)}s; cold drains ${coldRate.toFixed(1)}/s at ${speedNote}`;
  }

  return `+${warmthFound} warmth about every ${scavengeTime.toFixed(1)}s; cold drains ${coldRate.toFixed(1)}/s at ${speedNote}`;
}

function getButtonText(): string {
  if (!state.fuelSourceKnown) return "Getting Bearings";
  return activity === "scavenging" ? "Hold Still" : "Scavenge";
}

function findWoodMessage(currentState: GameState): string {
  const messages: readonly [string, string, string, string] = [
    "You find soggy driftwood. It smokes, but it burns.",
    "Dry pine needles hide under a stone lip.",
    "A cedar log waits just above the tide mark.",
    "You strip brittle bark from a fallen branch."
  ];

  const messageIndex = (currentState.foundWood - 1) % messages.length;
  return messages[messageIndex] ?? messages[0];
}

function showDeathDialog(): void {
  deathShown = true;
  els.deathStats.textContent = `You lasted ${formatDuration(state.timeAlive)} and found ${state.foundWood} fuel.`;
  els.deathLesson.textContent = getDeathLesson(state.cycle);
  els.deathDialog.showModal();
}

function getDeathLesson(cycle: number): string {
  const lessons: readonly [string, string, string] = [
    "The cold was a lesson. You remember the shape of dry wood above the tide.",
    "Your hands remember bark from rot, cedar from soaked driftwood.",
    "The shore is less silent now. Useful fuel stands out sooner."
  ];

  return lessons[Math.min(cycle - 1, lessons.length - 1)] ?? lessons[0];
}

function getWakeMessage(fuelRecognition: number, _coldFamiliarity: number): string {
  const messages: readonly [string, string, string] = [
    "You wake on the same shore. The tide-line gives up its secrets a little sooner.",
    "Your hands know what will burn. The wind bites, but not quite as deeply.",
    "The shore is familiar now. Dry fuel catches your eye before the cold can steal your focus."
  ];

  return messages[Math.min(fuelRecognition - 1, messages.length - 1)] ?? messages[0];
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

render();
requestAnimationFrame(tick);
