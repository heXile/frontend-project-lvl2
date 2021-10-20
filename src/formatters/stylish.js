import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => _.repeat(' ', depth * spaceCount - 2);

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const contentIndent = getIndent(depth + 1);
  const bracketIndent = getIndent(depth);
  const keys = _.sortBy(_.keys(value));
  const lines = keys.map((key) => `${contentIndent}  ${key}: ${formatValue(value[key], depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}  }`].join('\n');
};

const stylish = (diff) => {
  const iter = (node, depth) => {
    const indent = getIndent(depth);
    const {
      key, state, oldValue, newValue, children,
    } = node;
    const lines = children && children.flatMap((child) => iter(child, depth + 1));
    switch (state) {
      case 'root':
        return `{\n${lines.join('\n')}\n}`;
      case 'added':
        return `${indent}+ ${key}: ${formatValue(newValue, depth)}`;
      case 'deleted':
        return `${indent}- ${key}: ${formatValue(oldValue, depth)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${formatValue(oldValue, depth)}`,
          `${indent}+ ${key}: ${formatValue(newValue, depth)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent}  ${key}: ${formatValue(oldValue, depth)}`;
      case 'nested':
        return `${indent}  ${key}: {\n${lines.join('\n')}\n${indent}  }`;
      default:
        throw new Error(`Unknown node state: ${state}`);
    }
  };
  return iter(diff, 0);
};

export default stylish;
