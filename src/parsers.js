import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.load(data, 'utf8');
const parsers = { json: parseJSON, yml: parseYAML, yaml: parseYAML };

const chooseParser = (format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Uknown file extension: ${format}`);
  }
  return parser;
};

export default chooseParser;
