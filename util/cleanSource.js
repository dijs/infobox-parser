export default function cleanSource(
  source,
  { removeSmall = false, removeReferences = true } = {}
) {
  if (removeReferences) {
    source = source
      .replace(/<ref(\s\w+=[^>]+)?>.*<\/ref>/g, '')
      .replace(/<ref(\s\w+=[^>]+)?\s?\/>/g, '');
  }

  if (removeSmall) {
    source = source.replace(/<small>.*<\/small>/g, '');
  }

  return (
    source
      .replace(/''/g, '')
      .replace(/\|display=inline/g, '')
      // This is a little iffy
      .replace(/<br\s?\/?>/g, ',')
      .replace(/&minus;/g, '-')
      .replace(/<sup>/g, '^')
      // Remove shortened footnote templates
      .replace(/\{\{sfn\|([^\}\}]+)\}\}/g, '')
      // Remove explanatory footnotes
      .replace(/\{\{efn\|([^\}\}]+)\}\}/g, '')
      .replace(/−/g, '-')
      .replace(/<\/sup>/g, '')
      // Replace nowrap template with its content
      .replace(/\{\{\s*nowrap\s*\|([^\n\}]+)\}\}/gi, '$1')
      // HTML comments
      .replace(/<!--([\s\S]*?)-->/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace("|''See list''", '')
  );
}
