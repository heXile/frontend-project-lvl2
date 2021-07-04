import _ from 'lodash';

const formatPlain = (diffObject) => {
  const iter = (innerDiffObject, propNameAcc) => {
    const result = [];
    const higherLevelProp = propNameAcc.slice();
    const keys = _.sortBy(_.keys(innerDiffObject));
    keys.forEach((key) => {
      const currentProp = [...higherLevelProp, key];
      const propertyName = currentProp.join('.');
      const { state, value, diffValue } = innerDiffObject[key];
      const formattedValue = typeof value === 'string' ? `'${value}'` : value;
      const formattedDiffValue =
        typeof diffValue === 'string' ? `'${diffValue}'` : diffValue;
      switch (state) {
        case 'added':
          result.push(
            `Property '${propertyName}' was added with value: ${
              _.isPlainObject(formattedDiffValue)
                ? '[complex value]'
                : formattedDiffValue
            }`
          );
          break;
        case 'deleted':
          result.push(`Property '${propertyName}' was removed`);
          break;
        case 'changed':
          result.push(
            `Property '${propertyName}' was updated. From ${
              _.isPlainObject(formattedValue)
                ? '[complex value]'
                : formattedValue
            } to ${
              _.isPlainObject(formattedDiffValue)
                ? '[complex value]'
                : formattedDiffValue
            }`
          );
          break;
        case 'unchanged':
          if (_.isPlainObject(formattedValue)) {
            result.push(...iter(formattedValue, currentProp));
          }
          break;
        default:
          console.log('Do nothing');
      }
    });
    return result;
  };
  return [...iter(diffObject, [])].join('\n');
};

export default formatPlain;
