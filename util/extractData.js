const dataTypes = require('../data-types');
const cleanSource = require('./cleanSource');

function byDataHandler({ source, context }, handler) {
  const results = handler(source);
  return {
    context: Object.assign({}, context, results.data),
    source: results.sourceAfter,
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
