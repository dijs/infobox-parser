const globalPattern = /\{\{Extra[^}}]+\}\}/gi;
const parsePattern = /\|\s?(\w+)\s+=\s+(.+)/g;
const propPattern = /\|\s?(\w+)\s+=\s+(.+)/;

export default {
  globalPattern,
  parsePattern,
  parse: (obj) => {
    const e = obj.reduce((memo, i) => {
      const [, key, value] = i.match(propPattern);
      memo[key] = value;
      return memo;
    }, {});
    return e;
  },
  variable: 'EXTRA',
  name: 'extra',
};
