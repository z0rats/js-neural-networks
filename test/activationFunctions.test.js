import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import activations from '../utils/activationFunctions.js';

describe('activationFunctions', () => {
  it('sigmoid.activate maps 0 to 0.5 and stays within (0, 1)', () => {
    assert.equal(activations.sigmoid.activate(0), 0.5);
    assert.ok(activations.sigmoid.activate(30) < 1);
    assert.ok(activations.sigmoid.activate(-30) > 0);
  });

  it('sigmoid.delta scales error by the derivative at output', () => {
    assert.equal(activations.sigmoid.delta(1, 0.5), 1 * 0.5 * (1 - 0.5));
  });

  it('th (tanh).activate maps 0 to 0 and is bounded by (-1, 1)', () => {
    assert.equal(activations.th.activate(0), 0);
    assert.ok(activations.th.activate(10) < 1);
    assert.ok(activations.th.activate(-10) > -1);
  });

  it('th.delta scales error by the tanh derivative at output', () => {
    assert.equal(activations.th.delta(1, 0.5), 1 * (1 - 0.5 ** 2));
  });

  it('softPlus.activate maps 0 to ln(2) and is always positive', () => {
    assert.ok(Math.abs(activations.softPlus.activate(0) - Math.log(2)) < 1e-9);
    assert.ok(activations.softPlus.activate(-20) > 0);
  });

  it('softSign.activate maps 0 to 0 and is bounded by (-1, 1)', () => {
    assert.equal(activations.softSign.activate(0), 0);
    assert.ok(activations.softSign.activate(1000) < 1);
    assert.ok(activations.softSign.activate(-1000) > -1);
  });
});
