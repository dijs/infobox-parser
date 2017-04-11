const getValue = require('./getValue');

const keyValueGlobalPattern = /\|\s?([-\w\s]+)\s*=\s+([,\$#}\{-–\|\[\]\w\d\s.]+)?\n/g;
const keyValuePattern = /\|\s?([-\w\s]+)\s*=\s+([,\$#}\{-–\|\[\]\w\s.]+)/;

function camelCase(string) {
  return string.replace(/^([A-Z])|[\s_-](\w)/g, (match, p1, p2, offset) => {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
}

module.exports = function findPropertyList(source) {
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
