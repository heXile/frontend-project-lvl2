import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFormatDescription = (format) => (format === 'plain' ? 'plain text' : format);

describe.each([
  ['fileLeft.json', 'fileRight.json', 'stylish', 'result-stylish.txt'],
  ['fileLeft.json', 'fileRight.json', 'plain', 'result-plain.txt'],
  ['fileLeft.json', 'fileRight.json', 'json', 'result.json'],
])('JSON files comparison:', (fileLeft, fileRight, outputFormat, expected) => {
  test(`${getFormatDescription(outputFormat)} output: `, () => {
    expect(
      genDiff(
        getFixturePath(fileLeft),
        getFixturePath(fileRight),
        outputFormat,
      ),
    ).toEqual(readFileContent(getFixturePath(expected)));
  });
});

describe.each([
  ['fileLeft.yml', 'fileRight.yml', 'stylish', 'result-stylish.txt'],
  ['fileLeft.yml', 'fileRight.yml', 'plain', 'result-plain.txt'],
  ['fileLeft.yml', 'fileRight.yml', 'json', 'result.json'],
])('YAML files comparison:', (fileLeft, fileRight, outputFormat, expected) => {
  test(`${getFormatDescription(outputFormat)} output: `, () => {
    expect(
      genDiff(
        getFixturePath(fileLeft),
        getFixturePath(fileRight),
        outputFormat,
      ),
    ).toEqual(readFileContent(getFixturePath(expected)));
  });
});
