import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import NeuralNetwork from '../multilayer_net/core/NeuralNetwork.js';

const trainEpochs = (net, dataset, epochs) => {
  for (let epoch = 0; epoch < epochs; epoch += 1) {
    dataset.forEach(({ input, target }) => net.train(input, target));
  }
};

const totalOutputError = (net, dataset) => dataset.reduce((sum, { input, target }) => {
  net.init(input);
  const output = net.runSigmoid();
  const error = output.reduce((acc, value, i) => acc + (target[i] - value) ** 2, 0);
  return sum + error;
}, 0);

describe('NeuralNetwork', () => {
  it('builds the requested layer/neuron topology', () => {
    const net = new NeuralNetwork([2, 4, 1], 0.2, 'sigmoid');
    assert.equal(net.layers.length, 3);
    assert.equal(net.layers[0].neurons.length, 2);
    assert.equal(net.layers[1].neurons.length, 4);
    assert.equal(net.layers[2].neurons.length, 1);
  });

  it('runSigmoid produces one finite output per output neuron', () => {
    const net = new NeuralNetwork([2, 3, 2], 0.2, 'sigmoid');
    net.init([0.5, 0.9]);
    const output = net.runSigmoid();
    assert.equal(output.length, 2);
    output.forEach((value) => assert.ok(Number.isFinite(value)));
  });

  it('learns the AND function well enough to reduce total error over training', () => {
    const dataset = [
      { input: [0.01, 0.01], target: [0.01] },
      { input: [0.01, 0.99], target: [0.01] },
      { input: [0.99, 0.01], target: [0.01] },
      { input: [0.99, 0.99], target: [0.99] },
    ];

    const net = new NeuralNetwork([2, 4, 1], 0.5, 'sigmoid');
    const errorBefore = totalOutputError(net, dataset);

    trainEpochs(net, dataset, 500);
    const errorAfter = totalOutputError(net, dataset);

    assert.ok(
      errorAfter < errorBefore,
      `expected training to reduce error (before=${errorBefore}, after=${errorAfter})`,
    );
    assert.ok(Number.isFinite(errorAfter));
  });
});
