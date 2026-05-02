import assert from "node:assert/strict";
import test from "node:test";

import {
  canReset,
  createGameState,
  getColdRate,
  getScavengeTime,
  getWarmthFound,
  resetCycle,
  runTick
} from "../src/game.ts";

test("death automatically improves fuel recognition for the next life", () => {
  let state = createGameState();

  state = runTick(state, 20);
  assert.equal(canReset(state), true);

  state = resetCycle(state);
  const upgradedLife = runTick(state, 2.4);

  assert.equal(upgradedLife.foundWood, 1);
  assert.equal(upgradedLife.innerWarmth, 39.536);
  assert.equal(upgradedLife.cycle, 2);
  assert.equal(upgradedLife.fuelRecognition, 1);
  assert.equal(getWarmthFound(upgradedLife), 11);
  assert.equal(getScavengeTime(upgradedLife), 2.15);
});

test("death automatically starts the next life with subtle cold familiarity", () => {
  let state = createGameState();

  assert.equal(canReset(state), false);

  state = runTick(state, 20);
  assert.equal(state.alive, false);

  state = resetCycle(state);

  assert.equal(state.innerWarmth, 45);
  assert.equal(state.foundWood, 0);
  assert.equal(state.timeAlive, 0);
  assert.equal(state.alive, true);
  assert.equal(state.cycle, 2);
  assert.equal(state.fuelRecognition, 1);
  assert.equal(state.coldFamiliarity, 1);
  assert.equal(getColdRate(state).toFixed(2), "6.86");
});

test("reset does nothing before death", () => {
  const state = createGameState();
  const resetState = resetCycle(state);

  assert.deepEqual(resetState, state);
});
