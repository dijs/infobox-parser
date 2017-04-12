const smallGlobalPattern = /\{\{small\|([^\}\}]+)\}\}/g;
const smallPattern = /small\|([^\}\}]+)\}\}/;

export default {
  globalPattern: smallGlobalPattern,
  parsePattern: smallPattern,
  parse: results => {
    const [, value] = results;
    return value;
  },
  variable: 'SMALL',
  name: 'smalls',
};
