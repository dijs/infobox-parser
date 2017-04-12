const commentsPattern = /<!--.*-->/g;

export default function cleanSource(source) {
  return source
    .replace(/''/g, '')
    // This is a little iffy
    .replace(/<br\s?\/?>/g, ',')
    .replace('&nbsp;', ' ')
    .replace(commentsPattern, '')
    .replace('|\'\'See list\'\'', '');
}
