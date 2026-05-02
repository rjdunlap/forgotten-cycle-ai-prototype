import assert from "node:assert/strict";
import test from "node:test";

import { createGameState, runTick, canReset, resetCycle, buyUpgrade } from "../src/game.js";

test("second life gains survival experience faster after buying the persistent upgrade", () => {
  let state = createGameState();

  state = runTick(state, 12);
  assert.equal(canReset(state), true);

  state = resetCycle(state);
  state = buyUpgrade(state);
  const upgradedLife = runTick(state, 5);

  assert.equal(upgradedLife.survivalXp, 10);
  assert.equal(upgradedLife.cycle, 2);
  assert.equal(upgradedLife.upgrades, 1);
});

test("death banks a memory and starts a new life on reset", () => {
  let state = createGameState();

  assert.equal(canReset(state), false);

  state = runTick(state, 12);
  assert.equal(state.alive, false);

  state = resetCycle(state);

  assert.equal(state.memories, 1);
  assert.equal(state.survivalXp, 0);
  assert.equal(state.timeAlive, 0);
  assert.equal(state.alive, true);
  assert.equal(state.cycle, 2);
});

test("reset does nothing before death", () => {
  const state = createGameState();
  const resetState = resetCycle(state);

  assert.deepEqual(resetState, state);
});
