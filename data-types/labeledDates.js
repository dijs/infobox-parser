import { DO_NOT_REPLACE } from './dataType'
const labeledDateGlobalPattern = /\{\{([^\n\}\}]+)\}\}/g;
const labeledDatePattern = /(.*)/;

export default {
  globalPattern: labeledDateGlobalPattern,
  parsePattern: labeledDatePattern,
  parse: results => {
    const firstPipeIndex = results[0].indexOf('|');
    if (firstPipeIndex > -1) {
      const str = results[0]
        .substring(firstPipeIndex + 1)
        .slice(0, -2)
      let potentialDate = new Date(str + ' GMT');
      if (!isNaN(potentialDate.getTime())) {
        return { date: potentialDate };
      }
      potentialDate = new Date(str.split('|').join('-') + ' GMT')
      if (!isNaN(potentialDate.getTime())) {
        return { date: potentialDate };
      }
    }
    return DO_NOT_REPLACE;
  },
  variable: 'LABELED_DATE',
  name: 'labeledDates',
};
