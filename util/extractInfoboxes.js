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

function parse(source) {
	const startMatch = source.match(infoBoxStartPattern);
	if (!startMatch) {
		// May not have a a proper infobox wrapper, let's use the entire source
		// by default
		return { data: source, sourceLeft: null };
	}
	const startIndex = startMatch.index;
	const withStart = source.substring(startIndex);
	const outerIndex = findOuterIndex(withStart);
	if (!outerIndex) {
		return { data: source, sourceLeft: null };
	}
	const data = withStart.substring(0, outerIndex);
	const sourceLeft = source.substring(outerIndex);
	const sourceLeftHasMatch = !!sourceLeft.match(infoBoxStartPattern);
	return {
		data,
		sourceLeft: sourceLeftHasMatch ? sourceLeft : null
	};
}

export default function extractInfoboxes(source) {
  let parsed = parse(source);
  const infoboxes = [parsed.data];
  while(parsed.sourceLeft) {
  	parsed = parse(parsed.sourceLeft);
  	infoboxes.push(parsed.data);
  }
  return infoboxes;
}
