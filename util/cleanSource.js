const commentsPattern = /<!--.*-->/g;

module.exports = function cleanSource(source) {
  return source
    .replace('<br />', ' ')
    .replace('&nbsp;', ' ')
    .replace(commentsPattern, '')
    .replace('|\'\'See list\'\'', '');
}
