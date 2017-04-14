import getValue from './getValue';

const keyValueGlobalPattern = /\|\s*([-\w\s]+)\s*=\s*([^|]+)?/g;
const keyValuePattern = /\|\s*([-\w\s]+)\s*=\s*([^|]+)?/;

function camelCase(string) {
  return string.replace(/^([A-Z])|[\s_-](\w)/g, (match, p1, p2, offset) => {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
}

export default function findPropertyList(source) {
  return source
    .match(keyValueGlobalPattern)
    .map(match => {
      const result = keyValuePattern.exec(match);
      if (!result) {
        return null;
      }
      const [, rawKey, rawValue] = result;
      const key = camelCase(rawKey.trim());
      return {
        key,
        value: getValue(rawValue, key),
      };
    })
    .filter(item => item);
}
