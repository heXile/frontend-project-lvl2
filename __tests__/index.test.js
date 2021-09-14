import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff main json functionality', () => {
  expect(
    genDiff(
      getFixturePath('fileLeft.json'),
      getFixturePath('fileRight.json'),
      'stylish'
    )
  ).toEqual(readFileContent(getFixturePath('result-stylish.txt')));
  expect(
    genDiff(
      getFixturePath('fileLeft.json'),
      getFixturePath('fileRight.json'),
      'plain'
    )
  ).toEqual(readFileContent(getFixturePath('result-plain.txt')));
  expect(
    genDiff(
      getFixturePath('fileLeft.json'),
      getFixturePath('fileRight.json'),
      'json'
    )
  ).toEqual(readFileContent(getFixturePath('result.json')));
});

test('gendiff main yaml functionality', () => {
  expect(
    genDiff(
      getFixturePath('fileLeft.yml'),
      getFixturePath('fileRight.yml'),
      'stylish'
    )
  ).toEqual(readFileContent(getFixturePath('result-stylish.txt')));
  expect(
    genDiff(
      getFixturePath('fileLeft.yml'),
      getFixturePath('fileRight.yml'),
      'plain'
    )
  ).toEqual(readFileContent(getFixturePath('result-plain.txt')));
  expect(
    genDiff(
      getFixturePath('fileLeft.yml'),
      getFixturePath('fileRight.yml'),
      'json'
    )
  ).toEqual(readFileContent(getFixturePath('result.json')));
});
