const keyValueGlobalPattern = /\|\s?([-\w\s]+)\s*=\s+([,\$#}\{-–\|\[\]\w\d\s.]+)?\n/g;
const keyValuePattern = /\|\s?([-\w\s]+)\s*=\s+([,\$#}\{-–\|\[\]\w\s.]+)/;
const innerValuePattern = /\[\[([#\$\(\)\w\s\|,]+)\]\]/;

const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;

const plainListGlobalPattern = /\{\{p?P?lainlist\|([^\}\}]+)\}\}/g;
const plainListItemPattern = /\*\s?([\(\),#}\{-\|\[\]\w\s.]+)/g;
const plainListVariablePattern = /\$PLAIN_LIST_(\d)/;

const marriageGlobalPattern = /\{\{Marriage\|([^\}\}]+)\}\}/g;
const marriagePattern = /\[\[([^|]+)\]\]\|(.*)\}\}/;
const marriageVariablePattern = /\$MARRIAGE_(\d)/;

const birthDateGlobalPattern = /\{\{Birth\sdate([^\}\}]+)\}\}/g;
const birthDatePattern = /(\d+)\|(\d+)\|(\d+)/;
const birthDateVariablePattern = /\$BIRTH_DATE_(\d)/;

const commentsPattern = /<!--.*-->/g;
const listItemPrefixPattern = /^\*\s?/;

function getValue(raw) {
  const cleansed = raw
    .trim()
    .replace(extraPropertyPattern, '')
    .replace(endingPattern, '')
    .replace(/\[\[/g, '')
    .replace(/\]\]/g, '')
    .trim();
  const orPosition = cleansed.indexOf('|');
  if (orPosition !== -1) {
    return cleansed.substring(0, orPosition);
  }
  if (cleansed === 'y') {
    return true;
  }
  return cleansed;
}

function findMarriages(source) {
  const marriageMatches = source
    .match(marriageGlobalPattern);
  if (!marriageMatches) {
    return {
      marriages: [],
      sourceAfterMarriages: source,
    }
  }
  const marriages = marriageMatches.map(match => {
    const [, who, married] = marriagePattern.exec(match);
    return {
      who,
      married,
    };
  });
  const sourceAfterMarriages = marriageMatches.reduce((memo, match, index) => {
    return memo.replace(match, `$MARRIAGE_${index}`);
  }, source);
  return {
    marriages,
    sourceAfterMarriages,
  };
}

function findBirthDates(source) {
  const birthDateMatches = source
    .match(birthDateGlobalPattern);
  if (!birthDateMatches) {
    return {
      birthDates: [],
      sourceAfterBirthDates: source,
    }
  }
  const millisInYear = 1000 * 60 * 60 * 24 * 365;
  const birthDates = birthDateMatches.map(match => {
    const [, year, month, day] = birthDatePattern.exec(match);
    const date = new Date(year, month, day);
    const age = Math.floor((Date.now() - +date) / millisInYear);
    return {
      type: 'birthDate',
      date,
      age,
    };
  });
  const sourceAfterBirthDates = birthDateMatches.reduce((memo, match, index) => {
    return memo.replace(match, `$BIRTH_DATE_${index}`);
  }, source);
  return {
    birthDates,
    sourceAfterBirthDates,
  };
}

function findPlainLists(source) {
  const plainListMatches = source
    .match(plainListGlobalPattern);
  if (!plainListMatches) {
    return {
      plainLists: [],
      sourceAfterPlainLists: source,
    }
  }
  const plainLists = plainListMatches.map(match => {
    const cleanMatch = match.replace(commentsPattern, '');
    const plainListItemsRaw = cleanMatch.match(plainListItemPattern);
    const plainListItems = plainListItemsRaw
      .map(raw => raw.replace(listItemPrefixPattern, ''))
      .map(getValue);
    return plainListItems;
  });
  const sourceAfterPlainLists = plainListMatches.reduce((memo, match, index) => {
    return memo.replace(match, `$PLAIN_LIST_${index}`);
  }, source);
  return {
    plainLists,
    sourceAfterPlainLists,
  };
}

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
        key: rawKey.trim(),
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
    .replace('|\'\'See list\'\'', '');
  const { sourceAfterPlainLists, plainLists } = findPlainLists(cleanSource);
  const { sourceAfterMarriages, marriages } = findMarriages(sourceAfterPlainLists);
  const { sourceAfterBirthDates, birthDates } = findBirthDates(sourceAfterMarriages);
  const propertyList = findPropertyList(sourceAfterBirthDates);
  const context = { plainLists, marriages, birthDates };
  return propertyList.reduce(byVariableReduction(context), {});
};
