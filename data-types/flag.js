const flagGlobalPattern = /\{\{flag\|([^\}\}]+)\}\}/g;
const flagPattern = /flag\|([^\}\}]+)\}\}/;

module.exports = {
  globalPattern: flagGlobalPattern,
  parsePattern: flagPattern,
  parse: results => {
    const [, value] = results;
    return value;
  },
  variable: 'FLAG',
  name: 'flags',
};
