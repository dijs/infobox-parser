function findOuterIndex(source) {
	let lastOpen = [];
	for (let i = 0; i < source.length - 1; i++) {
    const nextTwo = source.substr(i, 2);
    if (nextTwo === '{{') {
			lastOpen.push(i);
			// Move forward, so we do not count closures right next to each other
			i++;
			continue;
		}
    if (nextTwo === '}}') {
			const openAt = lastOpen.pop();
			if (lastOpen.length === 0) {
				// Adding 2 here for the closure
				return i + 2;
			}
			// Move forward, so we do not count closures right next to each other
			i++;
		}    
  }
}

const infoBoxStartPattern = /{{\w*box/;

export default function extractInfobox(source) {
	const startMatch = source.match(infoBoxStartPattern);
	if (!startMatch) {
		// May not have a infobox at all
		return '';
	}
	const startIndex = startMatch.index;
	const withStart = source.substring(startIndex);
	const outerIndex = findOuterIndex(withStart);
	return withStart.substring(0, outerIndex);
}
