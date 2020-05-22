const nbayGlobalPattern = /\{\{nbay\|([^\}\}]+)\}\}/gi;
const nbayPattern = /nbay\|([^|]+)\|(.*)\}\}/i;

export default {
  globalPattern: nbayGlobalPattern,
  parsePattern: nbayPattern,
  parse: results => {
    const [, year, type] = results;
    return year;
  },
  variable: 'nbay',
  name: 'nbay',
};
