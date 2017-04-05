const fs = require('fs');

const keyValueGlobalPattern = /\|\s?([-\w\s]+)\s+?=\s+([,#}\{-\|\[\]\w\s.]+)?\n/g;
const keyValuePattern = /\|\s?([-\w\s]+)\s+?=\s+([,#}\{-\|\[\]\w\s.]+)/;
const innerValuePattern = /\[\[([\w\s\|,]+)\]\]/;

const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;

const propertyMatches = fs
  .readFileSync('./batman.txt', 'utf8')
  .replace('&nbsp;', ' ')
  .replace('|\'\'See list\'\'', '')
  .match(keyValueGlobalPattern);

console.log(propertyMatches);

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
  return cleansed;
}

const properties = propertyMatches
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

console.log(JSON.stringify(properties, null, 3));
console.log(properties.length);
