import _ from 'lodash';

const buildDiff = (objLeft, objRight) => {
  const [keysLeft, keysRight] = [_.keys(objLeft), _.keys(objRight)];
  const allKeys = _.sortBy(_.union(keysLeft, keysRight));
  const diff = allKeys.map((key) => {
    if (_.isPlainObject(objLeft[key]) && _.isPlainObject(objRight[key])) {
      const children = buildDiff(objLeft[key], objRight[key]);
      return { key, state: 'nested', children };
    }
    if (!keysLeft.includes(key)) {
      const newValue = objRight[key];
      return { key, state: 'added', newValue };
    }
    if (!keysRight.includes(key)) {
      const oldValue = objLeft[key];
      return { key, state: 'deleted', oldValue };
    }
    if (objLeft[key] === objRight[key]) {
      const oldValue = objLeft[key];
      return { key, state: 'unchanged', oldValue };
    }
    const [oldValue, newValue] = [objLeft[key], objRight[key]];
    return {
      key, state: 'changed', oldValue, newValue,
    };
  });
  return diff;
};

export default buildDiff;
