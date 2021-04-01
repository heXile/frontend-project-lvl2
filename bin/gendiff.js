#!/usr/bin/env node
/* eslint-disable no-console */
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

program.action((filePath1, filePath2) => {
  console.log(genDiff(filePath1, filePath2));
});

program.parse();
