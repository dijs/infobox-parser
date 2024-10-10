const globalPattern = /\{\{formatnum:\d+\}\}/gi;
const parsePattern = /\{\{formatnum:(\d+)\}\}/;

export default {
  globalPattern,
  parsePattern,
  parse: (results) => {
    const [, value] = results;
    return parseFloat(value);
  },
  variable: 'FORMAT_NUM',
  name: 'formatNum',
};
