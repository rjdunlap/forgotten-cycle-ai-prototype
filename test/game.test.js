import assert from "node:assert/strict";
import test from "node:test";

import { createGameState, runTick, canReset, resetCycle, buyUpgrade } from "../src/game.js";

test("second life progresses faster after buying the persistent upgrade", () => {
  let state = createGameState();

  state = runTick(state, 10);
  assert.equal(canReset(state), true);

  state = resetCycle(state);
  state = buyUpgrade(state);
  const upgradedLife = runTick(state, 5);

  assert.equal(upgradedLife.progress, 10);
  assert.equal(upgradedLife.cycle, 2);
  assert.equal(upgradedLife.upgrades, 1);
});

test("reset banks a memory only after completing the life goal", () => {
  let state = createGameState();

  assert.equal(canReset(state), false);

  state = runTick(state, 10);
  state = resetCycle(state);

  assert.equal(state.memories, 1);
  assert.equal(state.progress, 0);
  assert.equal(state.cycle, 2);
});

test("reset does nothing before the life goal is complete", () => {
  const state = createGameState();
  const resetState = resetCycle(state);

  assert.deepEqual(resetState, state);
});
