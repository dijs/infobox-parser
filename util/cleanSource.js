export default function cleanSource(source) {
	return source
    .replace(/''/g, '')
    .replace(/\|display=inline/g, '')
    // This is a little iffy
    .replace(/<br\s?\/?>/g, ',')
    .replace(/<ref(\s\w+=[^>]+)?>.*<\/ref>/g, '')
    .replace(/&minus;/g, '-')
    .replace(/<sup>/g, '^')
    // Remove shortened footnote templates
    .replace(/\{\{sfn\|([^\}\}]+)\}\}/g, '')
    // Remove explanatory footnotes
    .replace(/\{\{efn\|([^\}\}]+)\}\}/g, '')
    .replace(/−/g, '-')
    .replace(/<\/sup>/g, '')
    .replace(/<ref(\s\w+=[^>]+)?\s?\/>/g, '')
    // HTML comments
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace('|\'\'See list\'\'', '');
}
