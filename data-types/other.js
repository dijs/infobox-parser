const otherGlobalPattern = /\{\{([^|\n]+)\|([^|\n]+)\|?([^\}\n]+)?\}\}/g;
const otherPattern = /\{\{([^|\n]+)\|([^|\n]+)\|?([^\}\n]+)?\}\}/;

export default {
  globalPattern: otherGlobalPattern,
  parsePattern: otherPattern,
  parse: results => {
    const [, label, descriptor, extra] = results;
    return label;
  },
  variable: 'OTHER',
  name: 'others',
};
