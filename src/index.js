import _ from 'lodash'; // весь модуль надо разбить
import * as path from 'path';
import { readFileContent } from './utils.js';
import chooseParser from './parsers.js';
import chooseFormatter from './formatters/index.js';

const fileFormats = {
  '.json': 'JSON', // переименовать или убрать
  '.yml': 'YAML',
  '.yaml': 'YAML',
};

const buildDiffTree = (objLeft, objRight) => {
  // в отдельный модуль
  const diffObject = {};
  const [keys1, keys2] = [_.keys(objLeft), _.keys(objRight)];
  const allKeys = _.sortBy(_.union(keys1, keys2));
  allKeys.forEach((key) => {
    let state;
    let leftValue;
    let rightValue;
    if (_.isPlainObject(objLeft[key]) && _.isPlainObject(objRight[key])) {
      state = 'unchanged';
      leftValue = buildDiffTree(objLeft[key], objRight[key]);
    } else if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (objLeft[key] === objRight[key]) {
          [state, leftValue] = ['unchanged', objLeft[key]];
        } else {
          [state, leftValue, rightValue] = [
            'changed',
            objLeft[key],
            objRight[key],
          ];
        }
      } else {
        [state, rightValue] = ['deleted', objLeft[key]];
      }
    } else {
      [state, rightValue] = ['added', objRight[key]];
    }
    diffObject[key] = { state, leftValue, rightValue };
  });
  return diffObject;
};

const genDiff = (filePathLeft, filePathRight, outputFormat = 'stylish') => {
  const ext = path.extname(filePathLeft);

  const parseStr = chooseParser(fileFormats[ext]);

  const [objLeft, objRight] = [
    parseStr(readFileContent(filePathLeft)) || {},
    parseStr(readFileContent(filePathRight)) || {},
  ];

  const diffObject = buildDiffTree(objLeft, objRight);
  const formatDiff = chooseFormatter(outputFormat);
  const diff = formatDiff(diffObject);
  return diff;
};

export default genDiff;
