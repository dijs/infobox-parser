import getValue from './getValue';
import camelCase from 'camelcase';

const keyValueGlobalPattern = /\|\s*([-\w\s]+)\s*=\s*([^|]+)?/g;
const keyValuePattern = /\|\s*([-\w\s]+)\s*=\s*([^|]+)?/;

export default function findPropertyList(source) {
  const keyValuePairs = source.match(keyValueGlobalPattern);
  if (!keyValuePairs) {
    return [];
  }
  return keyValuePairs
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
