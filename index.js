import camelCase from 'camelcase';
import extractData from './util/extractData';
import extractProperties from './util/extractProperties';
import transformProperties from './util/transformProperties';
import extractInfoboxes from './util/extractInfoboxes';
import cleanSource from './util/cleanSource';
import parseTables from './util/parseTables';
import parseLists from './util/parseLists';

export default function (source, options) {
	const infoboxes = extractInfoboxes(source).map(infobox => {
	  const cleanedSource = cleanSource(infobox);
	  const data = extractData(cleanedSource);
	  const props = extractProperties(data, options);
	  return transformProperties(props);  	
  });

  if (!infoboxes.length) return {};

  const res = {
  	// First infobox should be the main one
  	general: infoboxes.shift()
  };

  infoboxes.forEach(next => {
  	const type = next.type;
		if (type) {
			res[camelCase(type)] = next;
		} else {
			Object.assign(res, {
				general: Object.assign({}, res.general, next)
			});
		}
	});

	res.tables = parseTables(source);
	res.lists = parseLists(source);

	return res;
};
