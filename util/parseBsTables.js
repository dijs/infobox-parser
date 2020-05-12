const linkPattern = /\[\[([^\]]+)\]\]/g;

function clean(text) {
  return text
    .substring(2, text.length - 2)
    .replace(linkPattern, (m, x) => x.split('|')[0])
    .replace(/'''?/g, '');
}

export default function (source) {
  const results = source.match(/{{BS([^}}]+)}}/g);
  if (results) {
    return results.map((result) => clean(result).split('|'));
  }
  return null;
}
