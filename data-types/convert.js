const convertGlobalPattern = /\{\{convert\|([\d\.]+)\|(\w+)/g;
const convertPattern = /\{\{convert\|([\d\.]+)\|(\w+)/;

export default {
  globalPattern: convertGlobalPattern,
  parsePattern: convertPattern,
  parse: results => {
    const [, num, unit] = results;
    return `${num} ${unit}`;
  },
  variable: 'CONVERT',
  name: 'converts',
};
