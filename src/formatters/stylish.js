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
      const { state, leftValue, rightValue } = innerDiffObject[key];
      switch (state) {
        case 'added':
          if (_.isPlainObject(rightValue)) {
            result.push(`${indent}  + ${key}: {`);
            result.push(...formatPlainObject(rightValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  + ${key}: ${rightValue}`);
          }
          break;
        case 'deleted':
          if (_.isPlainObject(rightValue)) {
            result.push(`${indent}  - ${key}: {`);
            result.push(...formatPlainObject(rightValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  - ${key}: ${rightValue}`);
          }
          break;
        case 'changed':
          if (_.isPlainObject(leftValue)) {
            result.push(`${indent}  - ${key}: {`);
            result.push(...formatPlainObject(leftValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  - ${key}: ${leftValue}`);
          }
          if (_.isPlainObject(rightValue)) {
            result.push(`${indent}  + ${key}: {`);
            result.push(...formatPlainObject(rightValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}  + ${key}: ${rightValue}`);
          }
          break;
        case 'unchanged':
          if (_.isPlainObject(leftValue)) {
            result.push(`${indent}    ${key}: {`);
            result.push(...iter(leftValue, depth + 1));
            result.push(`${indent}    }`);
          } else {
            result.push(`${indent}    ${key}: ${leftValue}`);
          }
          break;
        default:
          result.push(`${indent}    ${key}: ${leftValue}`);
      }
    });
    return result;
  };
  return ['{', ...iter(diffObject, 0), '}'].join('\n');
};

export default formatStylish;
