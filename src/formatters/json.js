const formatJSON = (diffTree) => JSON.stringify(diffTree.children, null, '  ');

export default formatJSON;
