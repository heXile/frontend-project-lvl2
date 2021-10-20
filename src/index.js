import * as path from 'path';
import { readFileContent } from './utils.js';
import chooseParser from './parsers.js';
import buildDiff from './buildDiff.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filePathLeft, filePathRight, outputFormat = 'stylish') => {
  const parser = chooseParser(path.extname(filePathLeft).slice(1));

  const [dataLeft, dataRight] = [
    parser(readFileContent(filePathLeft)) || {},
    parser(readFileContent(filePathRight)) || {},
  ];

  const diffTree = buildDiff(dataLeft, dataRight);
  const format = chooseFormatter(outputFormat);
  return format(diffTree);
};

export default genDiff;
