import yaml from 'js-yaml';

const parseJSON = (str) => JSON.parse(str);
const parseYAML = (str) => yaml.load(str, 'utf8');
const parsers = { json: parseJSON, yml: parseYAML, yaml: parseYAML };

const chooseParser = (ext) => parsers[ext];

export default chooseParser;
