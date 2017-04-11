const dataType = require('./dataType');

const birthDateGlobalPattern = /\{\{Birth\sdate([^\}\}]+)\}\}/g;
const birthDatePattern = /(\d+)\|(\d+)\|(\d+)/;

const millisInYear = 1000 * 60 * 60 * 24 * 365;

module.exports = dataType({
  globalPattern: birthDateGlobalPattern,
  parsePattern: birthDatePattern,
  parse: results => {
    const [, year, month, day] = results;
    const date = new Date(year, month, day);
    const age = Math.floor((Date.now() - +date) / millisInYear);
    return {
      date,
      age,
    };
  },
  variable: 'BIRTH_DATE',
  name: 'birthDates',
});
