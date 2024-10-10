const linkPattern = /\[\[([^\]]+)\]\]/g;
const kmPattern = /{{BSkm\|([\dx]+,[\dx]+)\|([\dx]+,[\dx]+)}}/g;

function clean(text) {
  return text
    .substring(2, text.length - 2)
    .replace(linkPattern, (m, x) => x.split('|')[0])
    .replace(/'''?/g, '');
}

// Source: https://en.wikipedia.org/wiki/Wikipedia:Route_diagram_template#{{BS-map}}_rows_with_icons_and_text
function parseRow(raw) {
  let countMatch = raw[0].match(/BS(\d)/);
  let type = raw[0].substring(2);
  let count = 1;
  let icons = [];
  let index = 1;
  if (countMatch) {
    count = countMatch[1];
    type = raw[0].substring(3);
  }
  for (; index <= count; index++) {
    icons.push(raw[index]);
  }
  const margin = raw[index++];
  const text1 = raw[index++];
  const text2 = raw[index++];
  const comment = raw[index++];
  return {
    type,
    margin,
    text1,
    text2,
    comment,
    icons,
  };
}

export default function (source) {
  const results = source.replace(kmPattern, '$1/$2').match(/{{BS([^}}]+)}}/g);
  if (results) {
    return results
      .map((result) => clean(result).split('|'))
      .map(parseRow)
      .filter(({ type }) => type[0] !== '-');
  }
  return null;
}
