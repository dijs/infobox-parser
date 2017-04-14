import extractData from './util/extractData';
import extractProperties from './util/extractProperties';

export default function (source, options) {
  return extractProperties(extractData(source), options);
};
