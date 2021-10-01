import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.load(data, 'utf8');
const parsers = { json: parseJSON, yml: parseYAML, yaml: parseYAML };

const chooseParser = (ext) => {
  const parser = parsers[ext];
  if (!parser) {
    throw new Error(`Uknown file extension: ${ext}`);
  }
  return parser;
};

export default chooseParser;
