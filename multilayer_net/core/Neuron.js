const randomInRange = (min, max) => Math.random() * (max - min) + min;

const generateWeights = (length) => {
  const w = [];
  for (let i = 0; i < length; i += 1) {
    const value = randomInRange(-0.1, 0.1);
    w.push(value);
  }
  return w;
};

export default class Neuron {
  constructor() {
    this.weights = [];
    this.bias = 0;
    this.delta = 0;
    this.output = 0;
    this.error = 0;
  }

  getRandomBias() {
    const min = -0.1;
    const max = 0.1;
    return Math.random() * (max - min) + min;
  }

  setWeights(length) {
    this.weights = generateWeights(length);
  }

  setBias(value) {
    this.bias = value;
  }

  setOutput(value) {
    this.output = value;
  }

  setDelta(value) {
    this.delta = value;
  }

  setError(value) {
    this.error = value;
  }
}
