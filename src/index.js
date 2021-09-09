import * as path from 'path';
import { readFileContent } from './utils.js';
import chooseParser from './parsers.js';
import buildDiff from './buildDiff.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filePathLeft, filePathRight, outputFormat = 'stylish') => {
  const ext = path.extname(filePathLeft);

  const parseStr = chooseParser(ext);

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
