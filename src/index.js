import * as path from 'path';
import { readFileContent } from './utils.js';
import chooseParser from './parsers.js';
import buildDiff from './buildDiff.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filePathLeft, filePathRight, outputFormat = 'stylish') => {
  const parseStr = chooseParser(path.extname(filePathLeft).slice(1));

  const [dataLeft, dataRight] = [
    parseStr(readFileContent(filePathLeft)) || {},
    parseStr(readFileContent(filePathRight)) || {},
  ];

  const diffTree = buildDiff(dataLeft, dataRight);
  const formatDiff = chooseFormatter(outputFormat);
  return formatDiff(diffTree);
};

export default genDiff;
