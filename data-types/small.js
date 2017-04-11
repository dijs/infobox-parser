const smallGlobalPattern = /\{\{small\|([^\}\}]+)\}\}/g;
const smallPattern = /small\|([^\}\}]+)\}\}/;

module.exports = {
  globalPattern: smallGlobalPattern,
  parsePattern: smallPattern,
  parse: results => {
    const [, value] = results;
    return value;
  },
  variable: 'SMALL',
  name: 'smalls',
};
