import _ from 'lodash';
import * as path from 'path';
import { readFileContent } from './utils.js';
import chooseParser from './parsers.js';
import chooseFormatter from './formatters/index.js';

const fileFormats = {
  '.json': 'JSON',
  '.yml': 'YAML',
  '.yaml': 'YAML',
};

const buildDiffObject = (obj1, obj2) => {
  const diffObject = {};
  const [keys1, keys2] = [_.keys(obj1), _.keys(obj2)];
  const allKeys = _.sortBy(_.union(keys1, keys2));
  allKeys.forEach((key) => {
    let state;
    let value;
    let diffValue;
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      state = 'unchanged';
      value = buildDiffObject(obj1[key], obj2[key]);
    } else if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (obj1[key] === obj2[key]) {
          // unchanged
          [state, value] = ['unchanged', obj1[key]];
        } else {
          // changed
          [state, value, diffValue] = ['changed', obj1[key], obj2[key]];
        }
      } else {
        // deleted
        [state, diffValue] = ['deleted', obj1[key]];
      }
    } else {
      // added
      [state, diffValue] = ['added', obj2[key]];
    }
    diffObject[key] = { state, value, diffValue };
    // console.log(`diffObject.${key} = ${diffObject[key]}`);
  });
  return diffObject;
};

const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  const [ext1, ext2] = [path.extname(filePath1), path.extname(filePath2)];
  if (fileFormats[ext1] !== fileFormats[ext2]) {
    throw new Error('File formats must be the same');
  }

  const [fileContent1, fileContent2] = [
    readFileContent(filePath1),
    readFileContent(filePath2),
  ];

  const parseStr = chooseParser(fileFormats[ext1]);

  const [obj1, obj2] = [
    parseStr(fileContent1) || {},
    parseStr(fileContent2) || {},
  ];

  const diffObject = buildDiffObject(obj1, obj2);
  const formatDiff = chooseFormatter(outputFormat);
  const diff = formatDiff(diffObject);
  return diff;
};

export default genDiff;
