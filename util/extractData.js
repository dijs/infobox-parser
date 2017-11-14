import dataTypes from '../data-types/index';

function byDataHandler({ source, context }, handler) {
  const { data, sourceAfter } = handler(source);
  return {
    context: Object.assign({}, context, data),
    source: sourceAfter,
  };
}

export default function extractData(source) {
  return dataTypes
    .map(type => type.handler)
    .reduce(byDataHandler, {
      context: {},
      source,
    });
}
