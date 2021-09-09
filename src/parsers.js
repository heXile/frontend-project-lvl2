import yaml from 'js-yaml';

const extensions = {
  '.json': 'JSON',
  '.yml': 'YAML',
  '.yaml': 'YAML',
};

const parseJSON = (str) => JSON.parse(str);
const parseYAML = (str) => yaml.load(str, 'utf8');

const parsers = {
  JSON: parseJSON,
  YAML: parseYAML,
};

const chooseParser = (ext) => parsers[extensions[ext]];

export default chooseParser;
