import extractData from './util/extractData';
import extractProperties from './util/extractProperties';

export default function (source) {
  return extractProperties(extractData(source));
};
