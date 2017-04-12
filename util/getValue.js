const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;
const linksPattern = /\[\[([^\]]+)\]\]/g;

function trimLinkWrappers(str) {
  return str
    .replace(/\[\[/g, '')
    .replace(/\]\]/g, '')
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
    .replace(extraPropertyPattern, '')
    .replace(endingPattern, '');

  if (cleansed === 'y') {
    return true;
  }

  const links = cleansed.match(linksPattern);
  const commas = cleansed.match(/,/g);

  // is it a list of links??
  if (links && commas && commas.length === links.length - 1) {
    return links.map(trimLinkWrappers).map(trimOr);
  }

  return trimOr(trimLinkWrappers(cleansed));
}
