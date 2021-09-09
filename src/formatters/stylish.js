import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const contentIndent = getIndent(depth + 1);
  const bracketIndent = getIndent(depth);
  const keys = _.sortBy(_.keys(value));
  const lines = keys.map((key) => {
    if (!_.isPlainObject(value[key])) {
      return `${contentIndent}${key}: ${value[key]}`;
    }
    return `${contentIndent}${key}: ${formatValue(value[key], depth + 1)}`;
  });
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (diff) => {
  const iter = (innerDiff, depth) => {
    const indent = getIndent(depth);
    const lines = innerDiff.map((entry) => {
      const {
        key, state, oldValue, newValue, children,
      } = entry;
      switch (state) {
        case 'added':
          return `${indent}  + ${key}: ${formatValue(newValue, depth + 1)}`;
        case 'deleted':
          return `${indent}  - ${key}: ${formatValue(oldValue, depth + 1)}`;
        case 'changed':
          return [
            `${indent}  - ${key}: ${formatValue(oldValue, depth + 1)}`,
            `${indent}  + ${key}: ${formatValue(newValue, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}    ${key}: ${formatValue(oldValue, depth + 1)}`;
        case 'nested':
          return `${indent}    ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown node state: ${state}`);
      }
    });
    return ['{', ...lines, `${indent}}`].join('\n');
  };
  return iter(diff, 0);
};

export default formatStylish;
