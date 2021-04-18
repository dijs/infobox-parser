import camelCase from 'camelcase';
import extractData from './util/extractData';
import extractProperties from './util/extractProperties';
import transformProperties from './util/transformProperties';
import extractInfoboxes from './util/extractInfoboxes';
import cleanSource from './util/cleanSource';
import parseTables from './util/parseTables';
import parseBsTables from './util/parseBsTables';
import parseLists from './util/parseLists';

/**
 * Parse Wiki Infobox Text
 * @param {string} source - Infobox source text
 * @param {Object} options - Parsing options
 * @param {boolean} [options.simplifyDataValues=true] - Only use primary data values
 * @param {boolean} [options.removeSmall=false] - Remove <small>...</small> chunks of source data
 * @param {boolean} [options.removeReferences=true] - Remove <ref>...</ref> chunks of source data
 * @returns {Object} Structured information from source text
 */
export default function parseInfobox(source, options) {
  const infoboxes = extractInfoboxes(source).map((infobox) => {
    const cleanedSource = cleanSource(infobox, options);
    const data = extractData(cleanedSource);
    const props = extractProperties(data, options);
    return transformProperties(props);
  });

  if (!infoboxes.length) return {};

  const res = {
    // First infobox should be the main one
    general: infoboxes.shift(),
  };

  infoboxes.forEach((next) => {
    const type = next.type;
    if (type) {
      res[camelCase(type)] = next;
    } else {
      Object.assign(res, {
        general: Object.assign({}, res.general, next),
      });
    }
  });

  res.tables = parseTables(source);
  res.bsTables = parseBsTables(source);
  res.lists = parseLists(source);

  return res;
}
