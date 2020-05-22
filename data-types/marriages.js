const marriageGlobalPattern = /\{\{Marriage\|([^\}\}]+)\}\}/gi;
const marriagePattern = /Marriage\|([^|]+)\|(.*)\}\}/i;

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
