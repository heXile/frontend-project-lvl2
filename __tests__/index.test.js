import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

const result = readFileContent('__fixtures__/result1');

test('genDiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    result
  );
});
