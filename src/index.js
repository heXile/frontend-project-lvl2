import * as path from 'path';
import { readFileContent } from './utils.js';
import chooseParser from './parsers.js';
import buildDiff from './buildDiff.js';
import chooseFormatter from './formatters/index.js';

const fileFormats = {
  '.json': 'JSON', // переименовать или убрать
  '.yml': 'YAML',
  '.yaml': 'YAML',
};

const genDiff = (filePathLeft, filePathRight, outputFormat = 'stylish') => {
  const ext = path.extname(filePathLeft);

  const parseStr = chooseParser(fileFormats[ext]);

  const [objLeft, objRight] = [
    parseStr(readFileContent(filePathLeft)) || {},
    parseStr(readFileContent(filePathRight)) || {},
  ];

  const diffTree = buildDiff(objLeft, objRight);
  const formatDiff = chooseFormatter(outputFormat);
  const diff = formatDiff(diffTree);
  return diff;
};

export default genDiff;
