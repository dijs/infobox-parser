const dataTypes = require('../data-types');
const findPropertyList = require('./propertyList');

const smallDataType = dataTypes.find(type => type.name === 'smalls');

function reduceVariable(key, value, context) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (key === 'areaTotalKm2') {
    return parseInt(value, 10);
  }
  if (value.match(smallDataType.pattern)) {
    const primary = value.replace(smallDataType.pattern, '').trim();
    const [, index] = smallDataType.pattern.exec(value);
    const secondary = context[smallDataType.name][parseInt(index, 10)];
    return {
      primary,
      secondary,
    };
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
      [key]: reduceVariable(key, value, context),
    });
  }
}

module.exports = function extractProperties({ source, context }) {
  return findPropertyList(source).reduce(byVariableReduction(context), {});
}
