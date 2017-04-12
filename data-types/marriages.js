const marriageGlobalPattern = /\{\{Marriage\|([^\}\}]+)\}\}/g;
const marriagePattern = /\[\[([^|]+)\]\]\|(.*)\}\}/;

export default {
  globalPattern: marriageGlobalPattern,
  parsePattern: marriagePattern,
  parse: results => {
    const [, who, married] = results;
    return {
      who,
      married,
    };
  },
  variable: 'MARRIAGE',
  name: 'marriages',
};
