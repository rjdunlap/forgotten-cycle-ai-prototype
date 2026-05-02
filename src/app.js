import {
  MAX_WARMTH,
  buyUpgrade,
  canReset,
  createGameState,
  getScavengeTime,
  getWarmthFound,
  resetCycle,
  runTick
} from "./game.js";

const els = {
  cycle: document.querySelector("#cycle"),
  progressBar: document.querySelector("#progressBar"),
  progressText: document.querySelector("#progressText"),
  rate: document.querySelector("#rate"),
  resetButton: document.querySelector("#resetButton"),
  upgradeButton: document.querySelector("#upgradeButton"),
  workButton: document.querySelector("#workButton"),
  memories: document.querySelector("#memories"),
  upgrades: document.querySelector("#upgrades"),
  log: document.querySelector("#log")
};

let state = createGameState();
let scavenging = true;
let lastTick = performance.now();

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  els.log.prepend(item);
}

function render() {
  const percent = (state.innerWarmth / MAX_WARMTH) * 100;
  const scavengeTime = getScavengeTime(state);
  const warmthFound = getWarmthFound(state);

  els.cycle.textContent = state.cycle;
  els.progressBar.style.width = `${percent}%`;
  els.progressText.textContent = state.alive ? `${Math.ceil(state.innerWarmth)} / ${MAX_WARMTH}` : "cold";
  els.rate.textContent = `+${warmthFound} warmth about every ${scavengeTime.toFixed(1)}s`;
  els.memories.textContent = state.memories;
  els.upgrades.textContent = state.upgrades;
  els.resetButton.disabled = !canReset(state);
  els.upgradeButton.disabled = state.memories < 1;
  els.workButton.textContent = scavenging ? "Hold Still" : "Scavenge";
}

function tick(now) {
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

function findWoodMessage(currentState) {
  const messages = [
    "You find soggy driftwood. It smokes, but it burns.",
    "Dry pine needles hide under a stone lip.",
    "A cedar log waits just above the tide mark.",
    "You strip brittle bark from a fallen branch."
  ];
  return messages[(currentState.foundWood - 1) % messages.length];
}

render();
requestAnimationFrame(tick);
