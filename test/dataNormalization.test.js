import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import dataNormalization from '../utils/dataNormalization.js';

describe('dataNormalization', () => {
  it('normalize.image scales byte values into [0.01, 1.0]', () => {
    const result = dataNormalization.normalize.image([0, 255, 128]);
    assert.ok(Math.abs(result[0] - 0.01) < 1e-9);
    assert.ok(Math.abs(result[1] - 1) < 1e-9);
    assert.ok(result[2] > 0.01 && result[2] < 1);
  });

  it('normalize.minMax scales each column into [0, 1]', () => {
    const data = [
      [0, 10],
      [5, 20],
      [10, 30],
    ];
    const result = dataNormalization.normalize.minMax(data);
    assert.deepEqual(result, [
      [0, 0],
      [0.5, 0.5],
      [1, 1],
    ]);
  });

  it('normalize.minMaxNegative scales each column into [-1, 1]', () => {
    const data = [
      [0, 10],
      [5, 20],
      [10, 30],
    ];
    const result = dataNormalization.normalize.minMaxNegative(data);
    assert.deepEqual(result, [
      [-1, -1],
      [0, 0],
      [1, 1],
    ]);
  });

  it('denormalize.minMaxNegative reverses normalize.minMaxNegative', () => {
    const original = [
      [0, 10],
      [5, 20],
      [10, 30],
    ];
    const normalized = dataNormalization.normalize.minMaxNegative(
      original.map((row) => [...row]),
    );
    const restored = dataNormalization.denormalize.minMaxNegative(normalized, original);

    restored.forEach((row, i) => {
      row.forEach((value, j) => {
        assert.ok(Math.abs(value - original[i][j]) < 1e-9);
      });
    });
  });
});
