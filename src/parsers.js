import yaml from 'js-yaml';

const parseJSON = (str) => JSON.parse(str);
const parseYAML = (str) => yaml.load(str, 'utf8');

const parsers = {
  JSON: parseJSON,
  YAML: parseYAML,
};

const chooseParser = (format) => parsers[format];

export default chooseParser;
