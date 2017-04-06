const keyValueGlobalPattern = /\|\s?([-\w\s]+)\s+?=\s+([,\$#}\{-\|\[\]\w\s.]+)?\n/g;
const keyValuePattern = /\|\s?([-\w\s]+)\s+?=\s+([,\$#}\{-\|\[\]\w\s.]+)/;
const innerValuePattern = /\[\[([#\$\(\)\w\s\|,]+)\]\]/;

const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;

const plainListGlobalPattern = /\{\{plainlist\|([^\}\}]+)\}\}/g;
const plainListItemPattern = /\*\s?([\(\),#}\{-\|\[\]\w\s.]+)/g;

const commentsPattern = /<!--.*-->/g;
const listItemPrefixPattern = /^\*\s?/;

const plainListVariablePattern = /\$PLAIN_LIST_(\d)/;

function getValue(raw) {
  const cleansed = raw
    .trim()
    .replace(extraPropertyPattern, '')
    .replace(endingPattern, '');
  const result = innerValuePattern.exec(cleansed);
  if (result) {
    const innerValue = result[1];
    const orPosition = innerValue.indexOf('|');
    if (orPosition !== -1) {
      return innerValue.substring(0, orPosition);
    }
    return innerValue;
  }
  if (cleansed === 'y') {
    return true;
  }
  return cleansed;
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
      .map(raw => raw.replace(listItemPrefixPattern, '').trim())
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

function reduceVariable(value, { plainLists }) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value.match(plainListVariablePattern)) {
    const [, index] = plainListVariablePattern.exec(value);
    return plainLists[parseInt(index, 10)];
  }
  return value;
}

module.exports = function (source) {
  const cleanSource = source
    .replace('&nbsp;', ' ')
    .replace('|\'\'See list\'\'', '');

  const { sourceAfterPlainLists, plainLists } = findPlainLists(cleanSource);

  // console.log(plainLists);
  // console.log(sourceAfterPlainLists);

  const propertyMatches = sourceAfterPlainLists
    .match(keyValueGlobalPattern);

  // console.log(propertyMatches);

  const propertyList = propertyMatches
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
    });

  const properties = propertyList.reduce((memo, { key, value }) => {
    return Object.assign({}, memo, {
      [key]: reduceVariable(value, { plainLists }),
    });
  }, {});

  return properties;
};
