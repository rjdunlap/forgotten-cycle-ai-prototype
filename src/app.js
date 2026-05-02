import { LIFE_GOAL, buyUpgrade, canReset, createGameState, resetCycle, runTick } from "./game.js";

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
let working = true;
let lastTick = performance.now();

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  els.log.prepend(item);
}

function render() {
  const progress = Math.floor(state.progress * 10) / 10;
  const percent = (state.progress / LIFE_GOAL) * 100;
  const rate = 1 + state.upgrades;

  els.cycle.textContent = state.cycle;
  els.progressBar.style.width = `${percent}%`;
  els.progressText.textContent = `${progress} / ${LIFE_GOAL}`;
  els.rate.textContent = `${rate} progress / second`;
  els.memories.textContent = state.memories;
  els.upgrades.textContent = state.upgrades;
  els.resetButton.disabled = !canReset(state);
  els.upgradeButton.disabled = state.memories < 1;
  els.workButton.textContent = working ? "Pause" : "Work";
}

function tick(now) {
  const elapsed = Math.min(0.25, (now - lastTick) / 1000);
  lastTick = now;

  if (working && !canReset(state)) {
    state = runTick(state, elapsed);
    if (canReset(state)) {
      addLog("The signal fire catches. A new cycle is ready.");
    }
    render();
  }

  requestAnimationFrame(tick);
}

els.workButton.addEventListener("click", () => {
  working = !working;
  addLog(working ? "You return to gathering driftwood." : "You stop to watch the tide.");
  render();
});

els.resetButton.addEventListener("click", () => {
  if (!canReset(state)) return;
  state = resetCycle(state);
  addLog("The tide takes the shore. You wake again with one memory.");
  render();
});

els.upgradeButton.addEventListener("click", () => {
  if (state.memories < 1) return;
  state = buyUpgrade(state);
  addLog("Memory settles into your hands. Future work is faster.");
  render();
});

render();
requestAnimationFrame(tick);
