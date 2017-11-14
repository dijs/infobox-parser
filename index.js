import extractData from './util/extractData';
import extractProperties from './util/extractProperties';
import transformProperties from './util/transformProperties';
import extractInfobox from './util/extractInfobox';
import cleanSource from './util/cleanSource';

export default function (source, options) {
  const cleanInfoBoxSource = cleanSource(extractInfobox(source));
  return transformProperties(extractProperties(extractData(cleanInfoBoxSource), options));
};
