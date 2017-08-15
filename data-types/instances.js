const globalPattern = /\[\[([^\]\|]+)\|?([^\]]+)?\]\]/g;
const pattern = /\[\[([^\]\|]+)\|?([^\]]+)?\]\]/;

export default {
  globalPattern: globalPattern,
  parsePattern: pattern,
  parse: results => {
    const [, value, type] = results;
    return value || type;
  },
  variable: 'INSTANCE',
  name: 'instances',
};
