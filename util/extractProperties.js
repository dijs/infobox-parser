const dataTypes = require('../data-types');
const findPropertyList = require('./propertyList');

function reduceVariable(value, context) {
  if (typeof value === 'boolean') {
    return value;
  }
  const dataType = dataTypes.find(type => value.match(type.pattern));
  if (dataType) {
    const [, index] = dataType.pattern.exec(value);
    return context[dataType.name][parseInt(index, 10)];
  }
  return value;
}

function byVariableReduction(context) {
  return (memo, { key, value }) => {
    return Object.assign({}, memo, {
      [key]: reduceVariable(value, context),
    });
  }
}

module.exports = function extractProperties({ source, context }) {
  return findPropertyList(source).reduce(byVariableReduction(context), {});
}
