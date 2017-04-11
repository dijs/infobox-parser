const dataTypes = [
  require('./plainLists'),
  require('./marriages'),
  require('./birthDates'),
];

const createDataTypeHandler = require('../util/dataType');

module.exports = dataTypes.map(type => {
  return {
    handler: createDataTypeHandler(type),
    name: type.name,
    pattern: new RegExp(`\\$${type.variable}_(\\d)`),
  };
});
