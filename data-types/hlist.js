const hlistGlobalPattern = /\{\{hlist\|([^\}\}]+)\}\}/gi;
const hlistPattern = /hlist\|(.*)\}\}/i;

export default {
  globalPattern: hlistGlobalPattern,
  parsePattern: hlistPattern,
  parse: results => {
    let [, elements] = results;
    return elements.split('|')
  },
  variable: 'HLIST',
  name: 'hlists',
};
