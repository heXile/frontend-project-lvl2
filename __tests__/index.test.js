import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

test('gendiff main functionality', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    readFileContent('__fixtures__/result1to2')
  );
  expect(genDiff('__fixtures__/file2.json', '__fixtures__/file1.json')).toEqual(
    readFileContent('__fixtures__/result2to1')
  );
});

test('Comparing correct to an empty json file', () => {
  expect(genDiff('__fixtures__/file2.json', '__fixtures__/empty.json')).toEqual(
    readFileContent('__fixtures__/result2toE')
  );
});

test('Comparing 2 empty json files', () => {
  expect(genDiff('__fixtures__/empty.json', '__fixtures__/empty.json')).toEqual('{\n}');
});
