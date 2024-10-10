import dataTypes from '../data-types/index';
import findPropertyList from './propertyList';
import numberParse from './numberParse';
import fillVariables from './fillVariables';

const smallDataType = dataTypes.find((type) => type.name === 'smalls');

function handleSmallData(value, context, { simplifyDataValues }) {
  if (typeof value === 'string' && value.match(smallDataType.pattern)) {
    const primary = value
      .replace(smallDataType.pattern, '')
      // Cleaning up from inserted commas
      .replace(/,/, '')
      .trim();
    const [, index] = smallDataType.pattern.exec(value);
    const secondary = context[smallDataType.name][parseInt(index, 10)];
    const result = {
      primary: getVariableValue(primary, context, { simplifyDataValues }),
      secondary: getVariableValue(secondary, context, { simplifyDataValues }),
    };
    return simplifyDataValues ? result.primary : result;
  }
  return null;
}

function getVariableValue(value, context, { simplifyDataValues } = {}) {
  // Handling small data differently... I dont like this...
  const smallData = handleSmallData(value, context, { simplifyDataValues });
  if (smallData) {
    return smallData;
  }
  return fillVariables(value, context, { simplifyDataValues });
}

function reduceVariable(key, value, context, options) {
  if (value === null) {
    return null;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  // First array pass...
  if (Array.isArray(value)) {
    return value.map((item) => getVariableValue(item, context, options));
  }
  if (key.match(/areaTotal/) || key.match(/population/)) {
    let float = numberParse(value);
    if (float === false) float = parseFloat(value, 10);
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
  const variableValue = getVariableValue(value, context, options);

  // Second array pass. If first variable was an array of variables.
  if (Array.isArray(variableValue)) {
    return variableValue.map((item) =>
      getVariableValue(item, context, options)
    );
  }
  return variableValue;
}

function byVariableReduction(context, options) {
  return (memo, { key, value }) => {
    const reduced = reduceVariable(key, value, context, options);
    if (reduced === '' || reduced === null) {
      return memo;
    }
    return Object.assign({}, memo, {
      [key]: reduced,
    });
  };
}

export default function extractProperties(
  { source, context },
  { simplifyDataValues = true } = {}
) {
  return findPropertyList(source).reduce(
    byVariableReduction(context, { simplifyDataValues }),
    {}
  );
}
