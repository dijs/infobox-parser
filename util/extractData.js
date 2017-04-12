import dataTypes from '../data-types/index';
import cleanSource from './cleanSource';

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
      source: cleanSource(source),
    });
}
