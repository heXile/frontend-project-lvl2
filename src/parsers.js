/* eslint-disable import/prefer-default-export */
import yaml from 'js-yaml';

export const parseJSON = (str) => JSON.parse(str);

export const parseYAML = (str) => yaml.load(str, 'utf8');
