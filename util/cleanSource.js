const commentsPattern = /<!--.*-->/g;

export default function cleanSource(source) {
  return source
    .replace(/''/g, '')
    .replace(/\|display=inline/g, '')
    // This is a little iffy
    .replace(/<br\s?\/?>/g, ',')
    .replace(/<ref(\s\w+=[^>]+)?>.*<\/ref>/g, '')
    .replace(/<ref(\s\w+=[^>]+)?\s?\/>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(commentsPattern, '')
    .replace('|\'\'See list\'\'', '');
}
