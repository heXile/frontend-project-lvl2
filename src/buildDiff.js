import _ from 'lodash';

const buildDiff = (dataLeft, dataRight) => {
  const [keysLeft, keysRight] = [_.keys(dataLeft), _.keys(dataRight)];
  const diff = _.sortBy(_.union(keysLeft, keysRight)).map((key) => {
    if (_.isPlainObject(dataLeft[key]) && _.isPlainObject(dataRight[key])) {
      const children = buildDiff(dataLeft[key], dataRight[key]);
      return { key, state: 'nested', children };
    }
    if (!keysLeft.includes(key)) {
      const newValue = dataRight[key];
      return { key, state: 'added', newValue };
    }
    if (!keysRight.includes(key)) {
      const oldValue = dataLeft[key];
      return { key, state: 'deleted', oldValue };
    }
    if (dataLeft[key] === dataRight[key]) {
      const oldValue = dataLeft[key];
      return { key, state: 'unchanged', oldValue };
    }
    const [oldValue, newValue] = [dataLeft[key], dataRight[key]];
    return {
      key, state: 'changed', oldValue, newValue,
    };
  });
  return diff;
};

export default buildDiff;
