import extractData from './util/extractData';
import extractProperties from './util/extractProperties';
import transformProperties from './util/transformProperties';

export default function (source, options) {
  return transformProperties(extractProperties(extractData(source), options));
};
