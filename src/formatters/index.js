import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const formatters = { stylish: formatStylish, plain: formatPlain, json: formatJSON };

const chooseFormatter = (format) => formatters[format];

export default chooseFormatter;
