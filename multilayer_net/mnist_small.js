import path from 'path';
import _ from 'lodash';
import dataNormalization from '../utils/dataNormalization.js';
import { extractFirstColumn, smallValuesArr, readCsv } from '../utils/utils.js';
import NeuralNetwork from './core/NeuralNetwork.js';

(async () => {
  const pathToTrain = path.join(process.cwd(), '../datasets/mnist_train_100.csv');
  const pathToTest = path.join(process.cwd(), '../datasets/mnist_test_10.csv');
  const trainData = await readCsv(pathToTrain);
  const testData = await readCsv(pathToTest);

  const trainExpected = extractFirstColumn(trainData);
  const testExpected = extractFirstColumn(testData);
  const output = _.uniq(trainExpected).sort();

  const learningRate = 0.1;
  const inputNodes = 784;
  const outputNodes = output.length;
  const layers = [inputNodes, 250, 125, outputNodes];
  const net = new NeuralNetwork(layers, learningRate, 'th');

  const start = new Date();
  const hrstart = process.hrtime();
  console.log('Старт обучения: ', start.toTimeString());
  for (let epoch = 0; epoch < 10; epoch += 1) {
    trainData.forEach((data, i) => {
      const inputs = dataNormalization.normalize.image(data);
      const targets = smallValuesArr(outputNodes);
      targets[trainExpected[i]] = 0.99;
      net.train(inputs, targets);
    });
  }
  const end = new Date() - start;
  const hrend = process.hrtime(hrstart);
  console.log('Время исполнения: %dms ', end);
  console.log('Время исполнения (hr): %ds %dms ', hrend[0], hrend[1] / 1000000);

  let wrongCount = 0;
  testData.forEach((data, i) => {
    const inputs = dataNormalization.normalize.image(data);
    net.init(inputs);
    const result = net.runSigmoid();

    const maxVal = Math.max(...result);
    const prediction = result.indexOf(maxVal);
    const expected = testExpected[i];

    if (prediction !== Number(expected)) wrongCount += 1;
  });
  console.log(wrongCount);
  console.log(testData.length);

  const accuracy = 100 - (wrongCount / testData.length) * 100;
  console.log({ 'Количество тестовых примеров:': testData.length, 'Количество ошибок:': wrongCount, 'Точность %:': accuracy });
})();
