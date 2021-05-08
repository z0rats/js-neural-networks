import { transpose } from './utils.js';

const dataNormalization = {
  normalize: {
    image: (data) => data.map((x) => (x / 255) * 0.99 + 0.01),
    minMax: (data) => {
      const normalized = [];
      const transposed = transpose(data);
      const { length } = transposed;
      for (let i = 0; i < length; i += 1) {
        const maxEl = Math.max(...transposed[i]);
        const minEl = Math.min(...transposed[i]);

        for (let j = 0; j < transposed[i].length; j += 1) {
          // normalizing in range [0; 1]
          transposed[i][j] = (transposed[i][j] - minEl) / (maxEl - minEl);
        }
        normalized.push(transposed[i]);
      }
      return transpose(normalized);
    },
    minMaxNegative: (data) => {
      const normalized = [];
      const transposed = transpose(data);
      const { length } = transposed;
      for (let i = 0; i < length; i += 1) {
        const maxEl = Math.max(...transposed[i]);
        const minEl = Math.min(...transposed[i]);

        for (let j = 0; j < transposed[i].length; j += 1) {
          // normalizing in range [-1; 1]
          const currEl = transposed[i][j];
          transposed[i][j] = (currEl - 0.5 * (maxEl + minEl)) / (0.5 * (maxEl - minEl));
        }
        normalized.push(transposed[i]);
      }
      return transpose(normalized);
    },
  },
  denormalize: {
    // minMax: (data) => {
    //
    // },
    minMaxNegative: (dataToRestore, initialData) => {
      const denormalized = [];
      const dataToRestoreT = transpose(dataToRestore);
      const initialDataT = transpose(initialData);
      const { length } = dataToRestoreT;
      for (let i = 0; i < length; i += 1) {
        const maxEl = Math.max(...initialDataT[i]);
        const minEl = Math.min(...initialDataT[i]);

        for (let j = 0; j < dataToRestoreT[i].length; j += 1) {
          // denormalization from range [-1; 1]
          const currEl = dataToRestoreT[i][j];
          dataToRestoreT[i][j] = (0.5 * (maxEl + minEl)) + (0.5 * currEl * (maxEl - minEl));
        }
        denormalized.push(dataToRestoreT[i]);
      }
      return transpose(denormalized);
    },
  },
};

export default dataNormalization;
