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
      // Remove ticks
      .replace(/'''?/g, '')
      .replace(/\|display=inline/g, '')
      // This is a little iffy
      .replace(/<br\s?\/?>/g, ',')
      .replace(/&minus;/g, '-')
      .replace(/{{Sndash}}/g, '–')
      .replace(/<sup>/g, '^')
      // Remove shortened footnote templates
      .replace(/\{\{sfn\|([^\}\}]+)\}\}/g, '')
      // Remove explanatory footnotes
      .replace(/\{\{efn\|([^\}\}]+)\}\}/g, '')
      .replace(/−/g, '-')
      .replace(/<\/sup>/g, '')
      // Replace wrap templates with its content
      .replace(/\{\{\s*nowrap\s*\|([^\n\}]+)\}\}/gi, '$1')
      .replace(/\{\{\s*Avoid\swrap\s*\|([^\n\}]+)\}\}/gi, '$1')
      // HTML comments
      .replace(/<!--([\s\S]*?)-->/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace("|''See list''", '')
  );
}
