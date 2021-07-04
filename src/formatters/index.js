import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  another: formatPlain,
};

const chooseFormatter = (format) => formatters[format];

export default chooseFormatter;
