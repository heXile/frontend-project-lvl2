import _ from 'lodash';

const joinKeys = (key, name) => {
  if (!name) return '';
  if (key === '') return `${name}`;
  return `${key}.${name}`;
};

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff) => {
  const iter = (node, name) => {
    const {
      key, state, oldValue, newValue, children,
    } = node;
    const newKey = joinKeys(name, key);
    const lines = children && children.flatMap((child) => iter(child, newKey));
    switch (state) {
      case 'root':
        return lines;
      case 'added':
        return `Property '${newKey}' was added with value: ${formatValue(
          newValue,
        )}`;
      case 'deleted':
        return `Property '${newKey}' was removed`;
      case 'changed':
        return `Property '${newKey}' was updated. From ${formatValue(
          oldValue,
        )} to ${formatValue(newValue)}`;
      case 'nested':
        return lines;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown node state: ${state}`);
    }
  };
  return iter(diff, '').filter((el) => !_.isNull(el)).join('\n');
};

export default plain;
