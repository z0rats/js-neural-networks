import Neuron from './Neuron.js';

export default class Layer {
  constructor(size) {
    const neurons = [];
    for (let i = 0; i < size; i += 1) {
      const neuron = new Neuron();
      neurons.push(neuron);
    }
    this.neurons = neurons;
  }
}
