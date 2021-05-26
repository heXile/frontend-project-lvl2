import _ from 'lodash';
import { readFileContent } from './utils.js';

const genDiff = (filePath1, filePath2) => {
  const fileContent1 = readFileContent(filePath1);
  const fileContent2 = readFileContent(filePath2);
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
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
