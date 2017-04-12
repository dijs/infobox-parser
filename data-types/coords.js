const coordsGlobalPattern = /\{\{coord\|([^\}\}]+)\}\}/g;
const coordsPattern = /coord\|([^\}\}]+)\}\}/;

export default {
  globalPattern: coordsGlobalPattern,
  parsePattern: coordsPattern,
  parse: results => {
    const [, value] = results;
    return value;
  },
  variable: 'COORD',
  name: 'coords',
};
