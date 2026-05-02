import { buyUpgrade, canReset, createGameState, resetCycle, runTick } from "./game.js";

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
  const secondsLeft = Math.max(0, state.lifespan - state.timeAlive);
  const percent = (secondsLeft / state.lifespan) * 100;
  const rate = 1 + state.upgrades;

  els.cycle.textContent = state.cycle;
  els.progressBar.style.width = `${percent}%`;
  els.progressText.textContent = state.alive ? `${secondsLeft.toFixed(1)}s left` : "dead";
  els.rate.textContent = `${rate} survival XP / second`;
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
      addLog(`You die with ${Math.floor(state.survivalXp)} survival XP. A memory remains.`);
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
  addLog("You wake on the same shore, carrying a fragment of the last life.");
  render();
});

els.upgradeButton.addEventListener("click", () => {
  if (state.memories < 1) return;
  state = buyUpgrade(state);
  addLog("Memory sharpens into instinct. Survival practice comes faster.");
  render();
});

render();
requestAnimationFrame(tick);
