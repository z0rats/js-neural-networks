import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  randomInRange,
  transpose,
  smallValuesArr,
  extractHeaderRow,
  extractFirstColumn,
  extractLastColumn,
} from '../utils/utils.js';

describe('utils', () => {
  it('randomInRange returns a value within [min, max)', () => {
    for (let i = 0; i < 50; i += 1) {
      const value = randomInRange(-1, 1);
      assert.ok(value >= -1 && value < 1, `expected ${value} to be within [-1, 1)`);
    }
  });

  it('transpose swaps rows and columns', () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    assert.deepEqual(transpose(input), [
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it('transpose is its own inverse', () => {
    const input = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    assert.deepEqual(transpose(transpose(input)), input);
  });

  it('smallValuesArr creates an array filled with 0.01', () => {
    assert.deepEqual(smallValuesArr(3), [0.01, 0.01, 0.01]);
    assert.equal(smallValuesArr(0).length, 0);
  });

  it('extractHeaderRow drops the first row only', () => {
    const data = [['h1', 'h2'], [1, 2], [3, 4]];
    assert.deepEqual(extractHeaderRow(data), [[1, 2], [3, 4]]);
  });

  it('extractFirstColumn removes and returns the first column', () => {
    const data = [[1, 2, 3], [4, 5, 6]];
    const column = extractFirstColumn(data);
    assert.deepEqual(column, [1, 4]);
    assert.deepEqual(data, [[2, 3], [5, 6]]);
  });

  it('extractLastColumn removes and returns the last column', () => {
    const data = [[1, 2, 3], [4, 5, 6]];
    const column = extractLastColumn(data);
    assert.deepEqual(column, [3, 6]);
    assert.deepEqual(data, [[1, 2], [4, 5]]);
  });
});
