const commentsPattern = /<!--.*-->/g;

module.exports = function cleanSource(source) {
  return source
    .replace('&nbsp;', ' ')
    .replace(commentsPattern, '')
    .replace('|\'\'See list\'\'', '');
}
