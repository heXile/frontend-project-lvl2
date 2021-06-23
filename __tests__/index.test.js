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
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
  ).toEqual(readFileContent(getFixturePath('result1to2')));
  expect(
    genDiff(getFixturePath('file2.json'), getFixturePath('file1.json'))
  ).toEqual(readFileContent(getFixturePath('result2to1')));
});

test('gendiff main yaml functionality', () => {
  expect(
    genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
  ).toEqual(readFileContent(getFixturePath('result1to2')));
  expect(
    genDiff(getFixturePath('file2.yml'), getFixturePath('file1.yml'))
  ).toEqual(readFileContent(getFixturePath('result2to1')));
});

test('Comparing correct to an empty file', () => {
  expect(
    genDiff(getFixturePath('file2.json'), getFixturePath('empty.json'))
  ).toEqual(readFileContent(getFixturePath('result2toE')));
  expect(
    genDiff(getFixturePath('file2.yml'), getFixturePath('empty.yml'))
  ).toEqual(readFileContent(getFixturePath('result2toE')));
});
