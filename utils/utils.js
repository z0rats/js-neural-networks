import fs from 'fs';
import papa from 'papaparse';

export const readCsv = async (pathToCsv = this.path) => {
  const file = fs.createReadStream(pathToCsv);
  return new Promise((resolve) => {
    papa.parse(file, {
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

export const randomInRange = (min, max) => Math.random() * (max - min) + min;

export const transpose = (arr) => arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));

export const smallValuesArr = (len) => new Array(len).fill(0.01);

export const extractHeaderRow = (data) => data.filter((_, i) => i !== 0);

export const extractFirstColumn = (data) => {
  const column = [];
  data.forEach((row) => {
    column.push(...row.splice(0, 1));
  });
  return column;
};

export const extractLastColumn = (data) => {
  const column = [];
  data.forEach((row) => {
    column.push(...row.splice(-1));
  });
  return column;
};
