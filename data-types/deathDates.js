const deathDateGlobalPattern = /\{\{death\sdate\sand\sage([^\}\}]+)\}\}/ig;
const deathDatePattern = /(\d+)\|(\d+)\|(\d+)\|(\d+)\|?(\d+)?\|?(\d+)?/;

const millisInYear = 1000 * 60 * 60 * 24 * 365;

export default {
  globalPattern: deathDateGlobalPattern,
  parsePattern: deathDatePattern,
  parse: results => {
    // Some articles do not list birth month/day so we just estimate the birth date
    const [, deathYear, deathMonth, deathDay, birthYear, birthMonth = 0, birthDay = 0] = results;
    const deathDate = new Date(deathYear, deathMonth-1, deathDay);
    const birthDate = new Date(birthYear, birthMonth-1, birthDay);
    const age = Math.floor((Number(deathDate) - Number(birthDate)) / millisInYear);
    return {
      date: deathDate,
      age,
    };
  },
  variable: 'DEATH_DATE',
  name: 'deathDates',
};
