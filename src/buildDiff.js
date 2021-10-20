import _ from 'lodash';

const buildDiff = (dataLeft, dataRight) => {
  const keysLeft = _.keys(dataLeft);
  const keysRight = _.keys(dataRight);
  const diff = _.sortBy(_.union(keysLeft, keysRight)).map((key) => {
    if (_.isPlainObject(dataLeft[key]) && _.isPlainObject(dataRight[key])) {
      return { key, state: 'nested', children: buildDiff(dataLeft[key], dataRight[key]) };
    }
    if (!keysLeft.includes(key)) {
      return { key, state: 'added', newValue: dataRight[key] };
    }
    if (!keysRight.includes(key)) {
      return { key, state: 'deleted', oldValue: dataLeft[key] };
    }
    if (dataLeft[key] === dataRight[key]) {
      return { key, state: 'unchanged', oldValue: dataLeft[key] };
    }
    return {
      key, state: 'changed', oldValue: dataLeft[key], newValue: dataRight[key],
    };
  });
  return diff;
};

export default (dataLeft, dataRight) => ({ state: 'root', children: buildDiff(dataLeft, dataRight) });
