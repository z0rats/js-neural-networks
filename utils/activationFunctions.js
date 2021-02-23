const activations = {
  sigmoid: {
    activate: (x) => 1 / (1 + Math.exp(-x)),
    delta: (error, output) => error * output * (1 - output),
  },
  th: {
    activate: (x) => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x)),
    delta: (error, output) => error * (1 - output ** 2),
  },
  softPlus: {
    activate: (x) => Math.log(1 + Math.exp(x)),
    delta: (error, output) => error * (1 / (1 + Math.exp(-output))),
  },
  softSign: {
    activate: (x) => x / (1 + Math.abs(x)),
    delta: (error, output) => error * (1 / ((1 + Math.abs(output)) ** 2)),
  },
};

export default activations;
