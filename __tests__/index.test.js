import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileContent(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('../__fixtures__/result-stylish.txt');
const expectedPlain = readFile('../__fixtures__/result-plain.txt');
const expectedJson = readFile('../__fixtures__/result-json.txt');

const formats = ['json', 'yml'];

test.each(formats)('Gendiff files - %s:', (format) => {
  const fileLeft = getFixturePath(`fileLeft.${format}`);
  const fileRight = getFixturePath(`fileRight.${format}`);

  expect(genDiff(fileLeft, fileRight)).toEqual(expectedStylish);
  expect(genDiff(fileLeft, fileRight, 'plain')).toEqual(expectedPlain);
  expect(genDiff(fileLeft, fileRight, 'json')).toEqual(expectedJson);
});
