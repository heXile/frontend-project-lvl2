import _ from 'lodash';
import * as path from 'path';
import { readFileContent } from './utils.js';
import { parseJSON, parseYAML } from './parsers.js';

const formats = {
  '.json': 'JSON',
  '.yml': 'YAML',
  '.yaml': 'YAML',
};

const genDiff = (filePath1, filePath2) => {
  const [ext1, ext2] = [path.extname(filePath1), path.extname(filePath2)];
  if (formats[ext1] !== formats[ext2]) {
    throw new Error('File formats must be the same');
  }

  const [fileContent1, fileContent2] = [
    readFileContent(filePath1),
    readFileContent(filePath2),
  ];

  let parseContent;
  switch (ext1) {
    case '.json':
      parseContent = parseJSON;
      break;
    case '.yml':
    case '.yaml':
      parseContent = parseYAML;
      break;
    default:
      throw new Error(`No handler for the extension ${ext1}`);
  }

  const [obj1, obj2] = [
    parseContent(fileContent1) || {},
    parseContent(fileContent2) || {},
  ];
  const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
  const keysAll = _.sortBy(_.union(keys1, keys2));

  const result = ['{'];
  keysAll.forEach((key) => {
    if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (obj1[key] === obj2[key]) result.push(`    ${key}: ${obj1[key]}`);
        else {
          result.push(`  - ${key}: ${obj1[key]}`);
          result.push(`  + ${key}: ${obj2[key]}`);
        }
      } else {
        result.push(`  - ${key}: ${obj1[key]}`);
      }
    } else {
      result.push(`  + ${key}: ${obj2[key]}`);
    }
  });
  result.push('}');
  return result.join('\n');
};

export default genDiff;
