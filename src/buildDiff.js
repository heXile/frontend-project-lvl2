import _ from 'lodash';

const buildDiff = (objLeft, objRight) => {
  const diffTree = {};
  const [keys1, keys2] = [_.keys(objLeft), _.keys(objRight)];
  const allKeys = _.sortBy(_.union(keys1, keys2));
  allKeys.forEach((key) => {
    let state;
    let leftValue;
    let rightValue;
    if (_.isPlainObject(objLeft[key]) && _.isPlainObject(objRight[key])) {
      state = 'unchanged';
      leftValue = buildDiff(objLeft[key], objRight[key]);
    } else if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (objLeft[key] === objRight[key]) {
          [state, leftValue] = ['unchanged', objLeft[key]];
        } else {
          [state, leftValue, rightValue] = [
            'changed',
            objLeft[key],
            objRight[key],
          ];
        }
      } else {
        [state, rightValue] = ['deleted', objLeft[key]];
      }
    } else {
      [state, rightValue] = ['added', objRight[key]];
    }
    diffTree[key] = { state, leftValue, rightValue };
  });
  return diffTree;
};

export default buildDiff;
