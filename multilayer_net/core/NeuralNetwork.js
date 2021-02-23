import activations from '../../utils/activationFunctions.js';
import Layer from './Layer.js';

export default class NeuralNetwork {
  constructor(layersNumber, learningRate = 0.2, activationName) {
    this.layers = layersNumber.map((layerSize, index) => {
      const layer = new Layer(layerSize);
      layer.neurons.forEach((neuron) => {
        neuron.setWeights(layersNumber[index + 1]);
        if (index !== 0) neuron.setBias(neuron.getRandomBias());
      });
      return layer;
    });

    this.activation = activations[activationName].activate;
    this.delta = activations[activationName].delta;

    this.learningRate = learningRate;
  }

  train(inputs, targets) {
    this.init(inputs);

    this.runSigmoid();
    this.calculateDeltas(targets);
    this.adjustWeights();
  }

  init(values) {
    this.layers[0].neurons.forEach((n, i) => {
      n.setOutput(values[i]);
    });
  }

  runSigmoid() {
    for (let lIndex = 1; lIndex < this.layers.length; lIndex += 1) {
      const layer = this.layers[lIndex];
      for (let j = 0; j < layer.neurons.length; j += 1) {
        const neuron = layer.neurons[j];
        // const b = neuron.bias;
        const connectionsValue = this.layers[lIndex - 1].neurons.reduce((prev, curN) => (
          prev + curN.weights[j] * curN.output), 0);

        neuron.setOutput(this.activation(connectionsValue));
      }
    }

    return this.layers[this.layers.length - 1].neurons.map((n) => n.output);
  }

  calculateDeltas(targets) {
    for (let lIndex = this.layers.length - 1; lIndex >= 0; lIndex -= 1) {
      const currLayer = this.layers[lIndex];

      for (let nIndex = 0; nIndex < currLayer.neurons.length; nIndex += 1) {
        const currNeuron = currLayer.neurons[nIndex];
        const { output } = currNeuron;

        let error = 0;
        if (lIndex === this.layers.length - 1) {
          error = targets[nIndex] - output;
        } else {
          const nextLayer = this.layers[lIndex + 1];
          error = currNeuron.weights.reduce((prev, curr, index) => (
            prev + curr * nextLayer.neurons[index].delta), 0);
        }
        currNeuron.setError(error);
        const delta = this.delta(error, output);
        currNeuron.setDelta(delta);
      }
    }
  }

  adjustWeights() {
    for (let i = 1; i <= this.layers.length - 1; i += 1) {
      const prevLayer = this.layers[i - 1];
      const currLayer = this.layers[i];

      currLayer.neurons.forEach((currNeuron, nIndex) => {
        const { delta } = currNeuron;

        prevLayer.neurons.forEach((n) => {
          n.weights[nIndex] += this.learningRate * delta * n.output;
        });

        // currNeuron.setBias(currNeuron.bias + this.learningRate * delta);
      });
    }
  }
}
