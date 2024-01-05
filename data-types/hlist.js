const hlistGlobalPattern = /\{\{hlist\|([^\}\}]+)\}\}/gi;
const hlistPattern = /hlist\|(.*)\n?\}\}/i;

export default {
  globalPattern: hlistGlobalPattern,
  parsePattern: hlistPattern,
  parse: (results) => {
    if (!results) {
      return [];
    }
    let [, elements] = results;
    return elements.split('|');
  },
  variable: 'HLIST',
  name: 'hlists',
};
