import dataTypes from '../data-types/index';
import findPropertyList from './propertyList';

const smallDataType = dataTypes.find(type => type.name === 'smalls');

function reduceVariable(key, value, context) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (key.match(/areaTotal/) || key.match(/population/)) {
    const float = parseFloat(value, 10);
    if (!isNaN(float)) {
      return float;
    }
  }
  if (key.match(/date/i)) {
    const dateValue = +new Date(value);
    if (!isNaN(dateValue)) {
      return new Date(value);
    }
  }
  if (value.match(smallDataType.pattern)) {
    const primary = value
      .replace(smallDataType.pattern, '')
      // Cleaning up from inserted commas
      .replace(/,/, '')
      .trim();
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
    const reduced = reduceVariable(key, value, context);
    if (reduced === '') {
      return memo;
    }
    return Object.assign({}, memo, {
      [key]: reduced,
    });
  }
}

export default function extractProperties({ source, context }) {
  return findPropertyList(source).reduce(byVariableReduction(context), {});
}
