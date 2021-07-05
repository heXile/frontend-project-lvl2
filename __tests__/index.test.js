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
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'stylish'
    )
  ).toEqual(readFileContent(getFixturePath('result1to2.stylish')));
  expect(
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')
  ).toEqual(readFileContent(getFixturePath('result1to2.plain')));
  expect(
    genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'), 'json')
  ).toEqual(readFileContent(getFixturePath('result2to1.json')));
});

test('gendiff main yaml functionality', () => {
  expect(
    genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')
  ).toEqual(readFileContent(getFixturePath('result1to2.stylish')));
  expect(
    genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')
  ).toEqual(readFileContent(getFixturePath('result1to2.plain')));
  expect(
    genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yml'), 'json')
  ).toEqual(readFileContent(getFixturePath('result2to1.json')));
});
