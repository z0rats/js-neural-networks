import path from 'path';
import _ from 'lodash';
import dataNormalization from '../utils/dataNormalization.js';
import { extractLastColumn, smallValuesArr, readCsv } from '../utils/utils.js';
import NeuralNetwork from './core/NeuralNetwork.js';

(async () => {
  const pathToTrain = path.join(process.cwd(), '../datasets/iris_train.csv');
  const pathToTest = path.join(process.cwd(), '../datasets/iris_test.csv');
  const trainData = await readCsv(pathToTrain);
  const testData = await readCsv(pathToTest);

  const trainExpected = extractLastColumn(trainData);
  const testExpected = extractLastColumn(testData);
  const output = _.uniq(trainExpected).sort();

  const normalisedTestData = dataNormalization.normalize.minMaxNegative(testData);
  const normalisedTrainData = dataNormalization.normalize.minMaxNegative(trainData);

  const learningRate = 0.1;
  const inputNodes = 4;
  const outputNodes = output.length;
  const layers = [inputNodes, 500, 250, 125, outputNodes];
  const net = new NeuralNetwork(layers, learningRate, 'softSign');

  const start = new Date();
  const hrstart = process.hrtime();
  console.log('Старт обучения: ', start.toTimeString());
  for (let epoch = 0; epoch < 1; epoch += 1) {
    normalisedTrainData.forEach((record, i) => {
      const targets = smallValuesArr(outputNodes);
      targets[trainExpected[i]] = 0.99;
      net.train(record, targets);
    });
  }

  const end = new Date() - start;
  const hrend = process.hrtime(hrstart);
  console.log('Время исполнения: %dms ', end);
  console.log('Время исполнения (hr): %ds %dms ', hrend[0], hrend[1] / 1000000);

  let wrongCount = 0;
  normalisedTestData.forEach((record, i) => {
    net.init(record);
    const result = net.runSigmoid();

    const maxVal = Math.max(...result);
    const prediction = result.indexOf(maxVal);
    const expected = testExpected[i];

    // console.log('exp', expected);
    // console.log('predict', result);

    if (prediction !== Number(expected)) wrongCount += 1;
  });
  console.log(wrongCount);
  console.log(testData.length);

  const accuracy = 100 - (wrongCount / testData.length) * 100;
  console.log({ inputsCount: testData.length, wrongCount, accuracy });
})();
