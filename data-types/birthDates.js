const birthDateGlobalPattern = /\{\{birth\sdate([^\}\}]+)\}\}/ig;
const birthDatePattern = /(\d+)\|(\d+)\|(\d+)/;

const millisInYear = 1000 * 60 * 60 * 24 * 365;

export default {
  globalPattern: birthDateGlobalPattern,
  parsePattern: birthDatePattern,
  parse: results => {
    const [, year, month, day] = results;
    const date = new Date(year, month-1, day);
    const age = Math.floor((Date.now() - +date) / millisInYear);
    return {
      date,
      age,
    };
  },
  variable: 'BIRTH_DATE',
  name: 'birthDates',
};
