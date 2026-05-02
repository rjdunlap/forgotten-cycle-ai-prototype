import {
  MAX_WARMTH,
  buyUpgrade,
  canReset,
  createGameState,
  getScavengeTime,
  getWarmthFound,
  resetCycle,
  runTick,
  type GameState
} from "./game.js";

const els = {
  cycle: requiredElement<HTMLElement>("#cycle"),
  progressBar: requiredElement<HTMLElement>("#progressBar"),
  progressText: requiredElement<HTMLElement>("#progressText"),
  rate: requiredElement<HTMLElement>("#rate"),
  resetButton: requiredElement<HTMLButtonElement>("#resetButton"),
  upgradeButton: requiredElement<HTMLButtonElement>("#upgradeButton"),
  workButton: requiredElement<HTMLButtonElement>("#workButton"),
  memories: requiredElement<HTMLElement>("#memories"),
  upgrades: requiredElement<HTMLElement>("#upgrades"),
  log: requiredElement<HTMLOListElement>("#log")
};

let state = createGameState();
let scavenging = true;
let lastTick = performance.now();

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

  els.cycle.textContent = String(state.cycle);
  els.progressBar.style.width = `${percent}%`;
  els.progressText.textContent = state.alive ? `${Math.ceil(state.innerWarmth)} / ${MAX_WARMTH}` : "cold";
  els.rate.textContent = `+${warmthFound} warmth about every ${scavengeTime.toFixed(1)}s`;
  els.memories.textContent = String(state.memories);
  els.upgrades.textContent = String(state.upgrades);
  els.resetButton.disabled = !canReset(state);
  els.upgradeButton.disabled = state.memories < 1;
  els.workButton.textContent = scavenging ? "Hold Still" : "Scavenge";
}

function tick(now: number): void {
  const elapsed = Math.min(0.25, (now - lastTick) / 1000);
  lastTick = now;

  if (!canReset(state)) {
    const previousWood = state.foundWood;
    state = runTick(state, elapsed, scavenging);

    if (state.foundWood > previousWood) {
      addLog(findWoodMessage(state));
    }

    if (canReset(state)) {
      addLog("The frost takes you. You remember where the dry wood was.");
    }
    render();
  }

  requestAnimationFrame(tick);
}

els.workButton.addEventListener("click", () => {
  scavenging = !scavenging;
  addLog(scavenging ? "You search the tide-line for anything dry." : "You curl against the wind and wait.");
  render();
});

els.resetButton.addEventListener("click", () => {
  if (!canReset(state)) return;
  state = resetCycle(state);
  addLog("You wake on the same shore. The dunes feel less unfamiliar.");
  render();
});

els.upgradeButton.addEventListener("click", () => {
  if (state.memories < 1) return;
  state = buyUpgrade(state);
  addLog("An echo settles in. Dry fuel will be easier to recognize.");
  render();
});

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

render();
requestAnimationFrame(tick);
