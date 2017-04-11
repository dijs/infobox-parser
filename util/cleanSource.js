const commentsPattern = /<!--.*-->/g;

module.exports = function cleanSource(source) {
  return source
    .replace(/''/g, '')
    .replace(/<br\s?\/?>/g, ' ')
    .replace('&nbsp;', ' ')
    .replace(commentsPattern, '')
    .replace('|\'\'See list\'\'', '');
}
