#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option(
    '-f --format [type]',
    'Output format: stylish | plain | json',
    'stylish',
  )
  .arguments('<filepath1> <filepath2>');

program.action((filePath1, filePath2) => {
  const outputFormat = program.opts().format;
  console.log(genDiff(filePath1, filePath2, outputFormat));
});

program.parse();
