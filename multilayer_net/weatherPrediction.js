import path from 'path';
import { extractFirstColumn, extractHeaderRow, readCsv } from '../utils/utils.js';
import dataNormalization from '../utils/dataNormalization.js';
import NeuralNetwork from './core/NeuralNetwork.js';

(async () => {
  const pathToDataset = path.join(process.cwd(), '../datasets/weather_forecast.csv');
  const dataset = await readCsv(pathToDataset);

  extractFirstColumn(dataset);
  const trainData = extractHeaderRow(dataset);

  const normalizedData = dataNormalization.normalize.minMaxNegative(trainData);

  const learningRate = 0.1;
  const inputNodes = trainData[0].length;
  const outputNodes = trainData[0].length;
  const layers = [inputNodes, 150, 100, 50, outputNodes];
  const net = new NeuralNetwork(layers, learningRate, 'th');

  const start = new Date();
  const hrstart = process.hrtime();
  console.info('Старт обучения: ', start.toTimeString());
  for (let epoch = 0; epoch < 1; epoch += 1) {
    normalizedData.forEach((record, i) => {
      if (i !== dataset.length - 2) {
        const targets = normalizedData[i + 1];
        // console.log('rec:\n', record);
        // console.log('target:\n', targets);
        net.train(record, targets);
      } else {
        const result = [net.runSigmoid(record)];
        console.log('Погода сегодня: ', dataNormalization.denormalize.minMaxNegative([record], trainData));
        const denormalizedResult = dataNormalization.denormalize.minMaxNegative(result, trainData);
        console.log('Прогноз сети на завтра: ', denormalizedResult);
      }
    });
  }

  const end = new Date() - start;
  const hrend = process.hrtime(hrstart);
  console.info('Время исполнения: %dms ', end);
  console.info('Время исполнения (hr): %ds %dms ', hrend[0], hrend[1] / 1000000);
})();
