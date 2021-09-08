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

const formatStylish = (diffTree) => {
  const iter = (innerDiffTree, depth) => {
    const keys = _.sortBy(_.keys(innerDiffTree));
    const indent = getIndent(depth);
    const lines = keys.map((key) => {
      const { state, leftValue, rightValue } = innerDiffTree[key];
      switch (state) {
        case 'added':
          return `${indent}  + ${key}: ${formatValue(rightValue, depth + 1)}`;
        case 'deleted':
          return `${indent}  - ${key}: ${formatValue(rightValue, depth + 1)}`;
        case 'changed':
          return [
            `${indent}  - ${key}: ${formatValue(leftValue, depth + 1)}`,
            `${indent}  + ${key}: ${formatValue(rightValue, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          if (_.isPlainObject(leftValue)) {
            return `${indent}    ${key}: ${iter(leftValue, depth + 1)}`;
          }
          return `${indent}    ${key}: ${leftValue}`;
        default:
          throw new Error(`Unknown node state: ${state}`);
      }
    });
    return ['{', ...lines, `${indent}}`].join('\n');
  };
  return iter(diffTree, 0);
};

export default formatStylish;
