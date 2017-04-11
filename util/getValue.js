const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;

module.exports = function getValue(raw) {
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
