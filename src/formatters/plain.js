import _ from 'lodash';

const isEmpty = (value) => value !== undefined;

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return value;
};

const formatPlain = (diff) => {
  const iter = (innerDiff, propNameAcc) => {
    const higherLevelProp = propNameAcc.slice();
    const lines = innerDiff.map((entry) => {
      const {
        key, state, oldValue, newValue, children,
      } = entry;
      const currentProp = [...higherLevelProp, key];
      const propertyName = currentProp.join('.');
      switch (state) {
        case 'added':
          return `Property '${propertyName}' was added with value: ${formatValue(
            newValue,
          )}`;
        case 'deleted':
          return `Property '${propertyName}' was removed`;
        case 'changed':
          return `Property '${propertyName}' was updated. From ${formatValue(
            oldValue,
          )} to ${formatValue(newValue)}`;
        case 'nested':
          return iter(children, currentProp);
        case 'unchanged':
          return undefined;
        default:
          throw new Error(`Unknown node state: ${state}`);
      }
    });
    return lines.filter(isEmpty).join('\n');
  };
  return iter(diff, []);
};

export default formatPlain;
