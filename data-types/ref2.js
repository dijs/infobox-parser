const otherGlobalPattern = /<ref(\s\w+=[^>]+)?\/>/g;
const otherPattern = /<ref(\s\w+=[^>]+)?\/>/;

const attributeGlobalPattern = /(\w+)=(["\w]+)/g;
const attributePattern = /(\w+)=(["\w]+)/;

export default {
  globalPattern: otherGlobalPattern,
  parsePattern: otherPattern,
  parse: (results) => {
    const attributes = results[1]
      .match(attributeGlobalPattern)
      .reduce((memo, attr) => {
        const [_, key, value] = attr.match(attributePattern);
        memo[key] = value.replace(/"/g, '');
        return memo;
      }, {});
    return { attributes };
  },
  variable: 'REF',
  name: 'refs',
};
