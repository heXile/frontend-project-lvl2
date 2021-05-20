import { readFileSync } from 'fs';

export const readFileContent = (filePath) => {
  return readFileSync(filePath, {
    encoding: 'utf-8',
    flag: 'r',
  });
};
