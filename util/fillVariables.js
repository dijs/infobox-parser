import dataTypes from '../data-types/index';

export function fillVariable(value, context, { simplifyDataValues } = {}) {
  if (typeof value !== 'string') {
    console.log(
      `Warning: Something went wrong. Could not fill variables in: (${typeof value}) ${JSON.stringify(
        value
      )}`
    );
    return {};
  }
  const dataType = dataTypes.find((type) => value.match(type.pattern));
  if (dataType) {
    const [matched, index] = dataType.pattern.exec(value);
    const dataValue = context[dataType.name][parseInt(index, 10)];
    if (!simplifyDataValues && typeof dataValue === 'string') {
      return value.replace(matched, dataValue);
    }
    return dataValue;
  }
  return value;
}

// Recursive varaible filling... even handles arrays of values
export default function fillVariables(value, context, options) {
  if (value === undefined) {
    return value;
  }
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === 'number') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => fillVariables(item, context, options));
  }
  if (typeof value === 'object') {
    return Object.keys(value).reduce((memo, key) => {
      return Object.assign(memo, {
        [key]: fillVariables(value[key], context, options),
      });
    }, {});
    // return value.map(item => fillVariables(item, context, options));
  }
  const filled = fillVariable(value, context, options);
  if (filled === value) {
    return value;
  }
  return fillVariables(filled, context, options);
}
