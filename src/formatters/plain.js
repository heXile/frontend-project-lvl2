import _ from 'lodash';

const isEmpty = (value) => value !== undefined;

const formatPlain = (diffTree) => {
  const iter = (innerDiffTree, propNameAcc) => {
    if (!_.isPlainObject(innerDiffTree)) {
      return;
    }
    const higherLevelProp = propNameAcc.slice();
    const keys = _.sortBy(_.keys(innerDiffTree));
    const lines = keys.map((key) => {
      const currentProp = [...higherLevelProp, key];
      const propertyName = currentProp.join('.');
      const { state, leftValue, rightValue } = innerDiffTree[key];
      const formattedLeftValue =
        typeof leftValue === 'string' ? `'${leftValue}'` : leftValue;
      const formattedRightValue =
        typeof rightValue === 'string' ? `'${rightValue}'` : rightValue;
      switch (state) {
        case 'added':
          return `Property '${propertyName}' was added with value: ${
            _.isPlainObject(formattedRightValue)
              ? '[complex value]'
              : formattedRightValue
          }`;
        case 'deleted':
          return `Property '${propertyName}' was removed`;
        case 'changed':
          return `Property '${propertyName}' was updated. From ${
            _.isPlainObject(formattedLeftValue)
              ? '[complex value]'
              : formattedLeftValue
          } to ${
            _.isPlainObject(formattedRightValue)
              ? '[complex value]'
              : formattedRightValue
          }`;
        case 'unchanged':
          return iter(formattedLeftValue, currentProp);
        default:
          throw new Error(`Unknown node state: ${state}`);
      }
    });
    // eslint-disable-next-line consistent-return
    return lines.filter(isEmpty).join('\n');
  };
  return iter(diffTree, []);
};

export default formatPlain;
