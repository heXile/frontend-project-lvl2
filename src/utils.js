import { readFileSync } from 'fs';

export const readFileContent = (filePath, defaultParams = {
  encoding: 'utf-8',
  flag: 'r',
}) => {
  return readFileSync(filePath, defaultParams);
};
