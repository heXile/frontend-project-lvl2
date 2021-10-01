import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
])('Gendiff files comparison:', (extension, outputFormat) => {
  test(`${extension} files comparison with ${outputFormat} output format: `, () => {
    expect(
      genDiff(
        getFixturePath(`fileLeft.${extension}`),
        getFixturePath(`fileRight.${extension}`),
        outputFormat,
      ),
    ).toEqual(readFileContent(getFixturePath(`result-${outputFormat}.txt`)));
  });
});
