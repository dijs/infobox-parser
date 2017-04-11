const keyValueGlobalPattern = /\|\s?([-\w\s]+)\s*=\s+([,\$#}\{-–\|\[\]\w\d\s.]+)?\n/g;
const keyValuePattern = /\|\s?([-\w\s]+)\s*=\s+([,\$#}\{-–\|\[\]\w\s.]+)/;
const innerValuePattern = /\[\[([#\$\(\)\w\s\|,]+)\]\]/;

const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;

const birthDateVariablePattern = /\$BIRTH_DATE_(\d)/;
const plainListVariablePattern = /\PLAIN_LIST_(\d)/;
const marriageVariablePattern = /\$MARRIAGE_(\d)/;

const commentsPattern = /<!--.*-->/g;

const findPlainLists = require('./data-types/plainLists');
const findMarriages = require('./data-types/marriages');
const findBirthDates = require('./data-types/birthDates');
const getValue = require('./data-types/getValue');

function reduceVariable(value, { plainLists, marriages, birthDates }) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value.match(plainListVariablePattern)) {
    const [, index] = plainListVariablePattern.exec(value);
    return plainLists[parseInt(index, 10)];
  }
  if (value.match(marriageVariablePattern)) {
    const [, index] = marriageVariablePattern.exec(value);
    return marriages[parseInt(index, 10)];
  }
  if (value.match(birthDateVariablePattern)) {
    const [, index] = birthDateVariablePattern.exec(value);
    return birthDates[parseInt(index, 10)];
  }
  return value;
}

function camelCase(string) {
  return string.replace(/^([A-Z])|[\s_-](\w)/g, (match, p1, p2, offset) => {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
}

function findPropertyList(source) {
  return source
    .match(keyValueGlobalPattern)
    .map(match => {
      const result = keyValuePattern.exec(match);
      if (!result) {
        return null;
      }
      const [, rawKey, rawValue] = result;
      return {
        key: camelCase(rawKey.trim()),
        value: getValue(rawValue),
      };
    })
    .filter(item => item);
}

function byVariableReduction(context) {
  return (memo, { key, value }) => {
    return Object.assign({}, memo, {
      [key]: reduceVariable(value, context),
    });
  }
}

module.exports = function (source) {
  const cleanSource = source
    .replace('&nbsp;', ' ')
    .replace(commentsPattern, '')
    .replace('|\'\'See list\'\'', '');

  const marriagesResults = findMarriages(cleanSource);
  const plainListsResults = findPlainLists(marriagesResults.sourceAfter);
  const birthDateResults = findBirthDates(plainListsResults.sourceAfter);

  const propertyList = findPropertyList(birthDateResults.sourceAfter);
  const context = {
    plainLists: plainListsResults.plainLists,
    marriages: marriagesResults.marriages,
    birthDates: birthDateResults.birthDates
  };

  return propertyList.reduce(byVariableReduction(context), {});
};
