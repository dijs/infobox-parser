import camelCase from 'camelcase';
import extractData from './util/extractData';
import extractProperties from './util/extractProperties';
import transformProperties from './util/transformProperties';
import extractInfoboxes from './util/extractInfoboxes';
import cleanSource from './util/cleanSource';

export default function (source, options) {
	const infoboxes = extractInfoboxes(source);
  return infoboxes.map(infobox => {
	  const cleanedSource = cleanSource(infobox);
	  const data = extractData(cleanedSource);
	  const props = extractProperties(data, options);
	  return transformProperties(props);  	
  }).reduce((info, next) => {
  	const type = next.type;
		if (type) {
			delete next.type;
			info[camelCase(type)] = next;
		} else {
			Object.assign(info, {
				general: Object.assign({}, info.general, next)
			});
		}
		return info;
	}, {});
};
