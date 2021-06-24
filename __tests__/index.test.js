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
});

test('gendiff main yaml functionality', () => {
  expect(
    genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
  ).toEqual(readFileContent(getFixturePath('result1to2')));
});
