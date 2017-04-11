const extractData = require('./util/extractData');
const extractProperties = require('./util/extractProperties');

module.exports = function (source) {
  return extractProperties(extractData(source));
};
