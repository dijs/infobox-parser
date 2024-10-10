const otherGlobalPattern = /<ref(\s\w+=[^>]+)?>(.*)<\/ref>/g;
const otherPattern = /<ref(\s\w+=[^>]+)?>(.*)<\/ref>/;

const attributeGlobalPattern = /(\w+)=(["\w]+)/g;
const attributePattern = /(\w+)=(["\w]+)/;

export default {
  globalPattern: otherGlobalPattern,
  parsePattern: otherPattern,
  parse: (results) => {
    const [_, attributesSource, contents] = results;
    const attributes = (
      (attributesSource || '').match(attributeGlobalPattern) || []
    ).reduce((memo, attr) => {
      if (attr) {
        const [_, key, value] = attr.match(attributePattern);
        memo[key] = value.replace(/"/g, '');
      }
      return memo;
    }, {});
    return { attributes, contents };
  },
  variable: 'REF',
  name: 'refs',
};
