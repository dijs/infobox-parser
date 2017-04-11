const dataType = require('./dataType');

const marriageGlobalPattern = /\{\{Marriage\|([^\}\}]+)\}\}/g;
const marriagePattern = /\[\[([^|]+)\]\]\|(.*)\}\}/;

module.exports = dataType({
  globalPattern: marriageGlobalPattern,
  parsePattern: marriagePattern,
  parse: results => {
    const [, who, married] = results;
    return {
      who,
      married,
    };
  },
  variable: 'MARRIAGE',
  name: 'marriages',
});
