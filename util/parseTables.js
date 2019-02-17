import camelcase from 'camelcase';

const tableStartPattern = /{\|(.*)\n?/;
const tableEndPattern = /\n\|}/;
const headersPattern = /!\s?(.*)/g;
const rowPattern = /\|-/;
const cellSeparatorPattern = /(?:\n\|)|(?:\|\|)/;
const linkPattern = /\[\[([^\]]+)\]\]/g;
const linkNamePattern = /^.*\|/;
const inlineHeaderPattern = '!!';
const actionPattern = /{{anchor\|(.*)}}/g;
const ticks = /'''/g;
const rowSpanCountPattern = /rowspan="(\d+)"/;

const stripLinks = source => source.replace(linkPattern, (m, capture) => {
    const result = capture.replace(linkNamePattern, '').trim();
    return result || capture;
})
const removeActions = source => source.replace(actionPattern, '')
const transformCell = source => stripLinks(removeActions(source || ''))
    .replace(rowSpanCountPattern, '')
    .replace(linkNamePattern, '')
    .replace(ticks, '')
    .trim()

const transformCells = row => row.split(cellSeparatorPattern).map(transformCell)

const findIndex = (t, p) => {
    const m = t.match(p);
    return m ? m.index : -1;
}

const findTableStart = source => {
    const m = source.match(tableStartPattern);
    return m ? m.index + m[0].length : -1;
}
const findTableEnd = source => findIndex(source, tableEndPattern)

const getHeaders = source => {
    const headers = [];
    let match;
    while (match = headersPattern.exec(source)) {
        headers.push(...match[1].split(inlineHeaderPattern).map(transformCell));
    }
    return headers;
}

function transformRowSpan(rows) {
    return rows
        .map(transformCells)
        .reduce((merged, cells, index) => {
            const k = index === 0 ? 0 : 1;
            for (let i = 0; i < cells.length; i++) {
                if (!merged[i + k]) merged[i + k] = {};                        
                if (cells[i]) {
                    merged[i + k][cells[i]] = 1;
                }
            }
            return merged;
        }, [])
        .map(o => Object.keys(o).join(','))
        .join(' || ');
}

const getRows = source => {
    const raw = source
        .split(rowPattern)
        .map(e => e.replace(/^.*\n+?\|/, '').trim())
        .filter(e => e);

    const rows = [];
    let spanN = 0;
    let spanCount = 0;
    let rowsInSpan = [];

    for (const row of raw ){
        const match = row.match(rowSpanCountPattern);
        if (match) {
            spanN = 0;
            spanCount = parseInt(match[1]);
            rowsInSpan = [];
        }
        if (spanN < spanCount) {            
            rowsInSpan.push(row);
            if (++spanN === spanCount) {
                rows.push(transformRowSpan(rowsInSpan));
            }
        }else {
            rows.push(row)
        }
    }

    return rows;
}
    
const getNextTable = source => {
    let left = source;
    const start = findTableStart(left);
    
    if (start === -1) return null;    
    left = left.substring(start);
    
    const end = findTableEnd(left);

    if (end === -1) return null;
    left = left.substring(0, end);

    const rows = getRows(left);

    if (!rows.length) return null;
    
    const headers = getHeaders(rows[0]);

    if (!headers.length) return null;

    const data = rows.slice(1).map(transformCells).map(row => {
        return headers.reduce((obj, key, index) => {
            obj[camelcase(key)] = row[index];
            return obj;
        }, {});
    });

    return { data, end: start + end };
}

export default function (source) {
    const tables = [] ;
    let left = source;
    let result = null;
    while(result = getNextTable(left)) {
        if (!result) {
            return tables;
        }        
        tables.push(result.data);
        left = left.substring(result.end);
    }
	return tables;
}
