const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;
const linksPattern = /\[\[([^\]]+)\]\]/g;
const linkSeparatorPattern = /[,<]/g;

function trimWrappers(str) {
  return str
    .replace(/\[\[/g, '')
    .replace(/\]\]/g, '')
    .replace(/\{\{/g, '')
    .replace(/\}\}/g, '')
    .trim();
}

function trimOr(str) {
  const orPosition = str.indexOf('|');
  if (orPosition !== -1) {
    return str.substring(0, orPosition);
  }
  return str;
}

module.exports = function getValue(raw) {
  const cleansed = raw
    .trim()
    .replace(/File:/, '')
    .replace(extraPropertyPattern, '')
    .replace(endingPattern, '');

  if (cleansed === 'y') {
    return true;
  }

  const links = cleansed.match(linksPattern);
  const separators = cleansed.match(linkSeparatorPattern);

  // is it a list of links??
  if (links && separators && separators.length === links.length - 1) {
    return links
      .map(trimWrappers)
      .map(trimOr)
      .map(value => value.replace(linkSeparatorPattern, ''));
  }

  return trimOr(trimWrappers(cleansed));
}
