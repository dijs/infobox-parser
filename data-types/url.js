const URLGlobalPattern = /\{\{URL\|([^\}\}]+)\}\}/g;
const URLPattern = /URL\|([^\}\}]+)\}\}/;

export default {
  globalPattern: URLGlobalPattern,
  parsePattern: URLPattern,
  parse: results => {
    const [, value] = results;
    return value;
  },
  variable: 'URL',
  name: 'urls',
};
