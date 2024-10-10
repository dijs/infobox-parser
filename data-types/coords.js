const coordsGlobalPattern = /\{\{(coord|Coord)\|([^\}\}]+)\}\}/g;
const coordsPattern = /(coord|Coord)\|([^\}\}]+)\}\}/;

export default {
  globalPattern: coordsGlobalPattern,
  parsePattern: coordsPattern,
  parse: (results) => {
    // the coord will always be in the third index:
    const [, , value] = results;
    return value;
  },
  variable: 'COORD',
  name: 'coords',
};
