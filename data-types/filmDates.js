const filmDatesPattern = /\{\{film\sdate([^\}\}]+)\}\}/gi;
const filmDatePatternGlobal = /(\d+)\|?(\d+)\|?(\d+)\|?([^\|\}]*)/g;
const filmDatePattern = /(\d+)\|?(\d+)\|?(\d+)\|?([^\|\}]*)/;

// Format documented here:
// https://en.wikipedia.org/wiki/Template:Film_date/doc
// Target:
// Year required, month day etc. optional...
// {{Film date|year1|month1|day1|location1|ref1=<ref name="xxxxx" />|year2|month2|day2|location2|ref2=<ref name="yyyy" />}}

export default {
  globalPattern: filmDatesPattern,
  parsePattern: filmDatePatternGlobal,
  parse: (results) => {
    return results.map((result) => {
      const [_, year, month, day, location] = result.match(filmDatePattern);
      const date = new Date(year, month && month - 1, day);
      return {
        date,
        location,
      };
    });
  },
  variable: 'FILM_DATES',
  name: 'filmDates',
};
