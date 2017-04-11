const dataTypes = require('../data-types');
const cleanSource = require('./cleanSource');

function byDataHandler({ source, context }, handler) {
  const { data, sourceAfter } = handler(source);
  return {
    context: Object.assign({}, context, data),
    source: sourceAfter,
  };
}

module.exports = function extractData(source) {
  return dataTypes
    .map(type => type.handler)
    .reduce(byDataHandler, {
      context: {},
      source: cleanSource(source),
    });
}
