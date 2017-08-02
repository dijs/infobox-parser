const extraPropertyPattern = /\n?\s?\|\s?\w+$/;
const endingPattern = /\n\}\}$/;
const linksPattern = /((\$\w+_\d+)\s*,?\s*){2,}/g;
const linkSeparatorPattern = /[,\s?]/g;

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

export default function getValue(raw, key) {
  if (!raw) {
    return null;
  }

  const cleansed = raw
    .trim()
    .replace(/File:/, '')
    // Have not found reason for this but it breaks parsing, so we are just
    // removing it for now
    .replace(/\{\{\d+\}\}/g, '')
    .replace(extraPropertyPattern, '')
    .replace(endingPattern, '');

  if (cleansed === 'y' || cleansed === 'yes') {
    return true;
  }

  if (key == 'birthPlace') {
    return raw.trim();
  }

  // Is it a list of links??
  const links = cleansed.match(linksPattern);
  if (links) {
    return links[0].split(linkSeparatorPattern).filter(text => text);
  }

  return trimOr(trimWrappers(cleansed));
}
