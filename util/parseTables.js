const headingPattern = /[^=]==\s?([\w\s]+)\s?==/g
const subheadingPattern = /===([\w\s]+)===/g
const tableStartPattern = /{{list.+start.*}}/gi
const tableEndPattern = /{{list.+end.*}}/gi
const rowPattern = /{{(.*)}}/g
const rowPatternSingle = /{{(.*)}}/

function getHeadings(text) {
	let match;
	const headings = [];
	while ((match = headingPattern.exec(text)) !== null) {
		headings.push({
			heading: match[1].trim(),
			start: match.index,
			end: match.index + match[0].length
		})
	}
	return headings;
}

function getSubheadings(text) {
	let match;
	const subheadings = [];
	while ((match = subheadingPattern.exec(text)) !== null) {
		subheadings.push({
			heading: match[1].trim(),
			start: match.index,
			end: match.index + match[0].length
		})
	}
	return subheadings;
}

function getMatches(text, pattern) {
	let match;
	const matches = [];
	while ((match = pattern.exec(text)) !== null) {
		matches.push({
			value: match[1] && match[1].trim(),
			start: match.index,
			end: match.index + match[0].length
		})
	}
	return matches;
}

function parseTableData(raw) {
	const matches = raw.match(rowPattern);
	if (!matches) return [];
	return matches.map(el => {
		const [,text] = el.match(rowPatternSingle);
		const columns = text.trim().split('|');
		return columns.slice(1);
	});
}

function getTables(text) {
	const tableStarts = getMatches(text, tableStartPattern);
	const tableEnds = getMatches(text, tableEndPattern);
	return tableStarts.map((tableStart, index) => {
		const tableEnd = tableEnds[index];
		if (!tableEnd) {
			throw new Error('[Table Parsing] Failed to pair table');
		}
		const raw = text
				.substring(tableStart.end, tableEnd.start)
				.trim()
				.replace(/'''/g, '');
		return {
			rows: parseTableData(raw),
			start: tableStart.start,
			end: tableEnd.end
		}
	});
}

function last(list) {
	return list.length ? list[list.length - 1] : undefined;
}

export default function (source) {
	const headings = getMatches(source, headingPattern);
	const subheadings = getMatches(source, subheadingPattern);
	const tables = getTables(source);

	tables.forEach(table => {
		const headingsBefore = headings.filter(heading => {
			return heading.end < table.start;
		}).map(e => e.value)
		table.heading = last(headingsBefore);
		const subheadingsBefore = subheadings.filter(subheading => {
			return subheading.end < table.start;
		}).map(e => e.value)
		table.subheading = last(subheadingsBefore);
		delete table.start;
		delete table.end;
	});

	return tables;
}