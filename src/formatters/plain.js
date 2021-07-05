import _ from 'lodash';

const formatPlain = (diffObject) => {
  const iter = (innerDiffObject, propNameAcc) => {
    const result = [];
    const higherLevelProp = propNameAcc.slice();
    const keys = _.sortBy(_.keys(innerDiffObject));
    keys.forEach((key) => {
      const currentProp = [...higherLevelProp, key];
      const propertyName = currentProp.join('.');
      const { state, leftValue, rightValue } = innerDiffObject[key];
      const formattedLeftValue =
        typeof leftValue === 'string' ? `'${leftValue}'` : leftValue;
      const formattedRightValue =
        typeof rightValue === 'string' ? `'${rightValue}'` : rightValue;
      switch (state) {
        case 'added':
          result.push(
            `Property '${propertyName}' was added with value: ${
              _.isPlainObject(formattedRightValue)
                ? '[complex value]'
                : formattedRightValue
            }`
          );
          break;
        case 'deleted':
          result.push(`Property '${propertyName}' was removed`);
          break;
        case 'changed':
          result.push(
            `Property '${propertyName}' was updated. From ${
              _.isPlainObject(formattedLeftValue)
                ? '[complex value]'
                : formattedLeftValue
            } to ${
              _.isPlainObject(formattedRightValue)
                ? '[complex value]'
                : formattedRightValue
            }`
          );
          break;
        case 'unchanged':
          if (_.isPlainObject(formattedLeftValue)) {
            result.push(...iter(formattedLeftValue, currentProp));
          }
          break;
        default:
          throw new Error(`Unknown node state: ${state}`);
      }
    });
    return result;
  };
  return [...iter(diffObject, [])].join('\n');
};

export default formatPlain;
