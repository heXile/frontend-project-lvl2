import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const formatPlainObject = (obj, depth) => {
  const result = [];
  const indent = getIndent(depth + 1);
  const keys = _.sortBy(_.keys(obj));
  keys.forEach((key) => {
    if (!_.isPlainObject(obj[key])) {
      result.push(`${indent}${key}: ${obj[key]}`);
    } else {
      result.push(`${indent}${key}: {`);
      result.push(...formatPlainObject(obj[key], depth + 1));
      result.push(`${indent}}`);
    }
  });
  return result;
};

const formatStylish = (diffObject) => {
  const iter = (innerDiffObject, depth) => {
    const result = [];
    const keys = _.sortBy(_.keys(innerDiffObject));
    const indent = getIndent(depth);
    keys.forEach((key) => {
      const { state, value, diffValue } = innerDiffObject[key];
      switch (state) {
        case 'added':
          if (_.isPlainObject(diffValue)) {
            result.push(`${indent}  + ${key}: {`);
            result.push(...formatPlainObject(diffValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  + ${key}: ${diffValue}`);
          }
          break;
        case 'deleted':
          if (_.isPlainObject(diffValue)) {
            result.push(`${indent}  - ${key}: {`);
            result.push(...formatPlainObject(diffValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  - ${key}: ${diffValue}`);
          }
          break;
        case 'changed':
          if (_.isPlainObject(value)) {
            result.push(`${indent}  - ${key}: {`);
            result.push(...formatPlainObject(value, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  - ${key}: ${value}`);
          }
          if (_.isPlainObject(diffValue)) {
            result.push(`${indent}  + ${key}: {`);
            result.push(...formatPlainObject(diffValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  + ${key}: ${diffValue}`);
          }
          break;
        case 'unchanged':
          if (_.isPlainObject(value)) {
            result.push(`${indent}    ${key}: {`);
            result.push(...iter(value, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}    ${key}: ${value}`);
          }
          break;
        default:
          result.push(`${indent}    ${key}: ${value}`);
      }
    });
    return result;
  };
  return ['{', ...iter(diffObject, 0), '}'].join('\n');
};

export default formatStylish;
