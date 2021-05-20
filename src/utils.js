import { readFileSync } from 'fs';

export const readFileContent = (
  filePath,
  defaultParams = {
    encoding: 'utf-8',
    flag: 'r',
  }
) => readFileSync(filePath, defaultParams);

export default readFileContent;
