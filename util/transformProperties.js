// import getValue from './getValue';
import camelCase from 'camelcase';

const blankNamePattern = /blank(\d+)?NameSec2/;
const blankInfoPattern = /blank(\d+)?InfoSec2/;

export default function transformProperties(properties) {
  return Object.keys(properties)
    .reduce((transformed, key) => {
      const value = properties[key];
      const match = key.match(blankNamePattern);
      if (match) {
        const id = match[1] || '';
        const blankName = properties[`blank${id}NameSec2`];
        const blankInfo = properties[`blank${id}InfoSec2`];
        if (typeof blankName !== 'string') return transformed;
        return Object.assign(transformed, {
          [camelCase(blankName)]: blankInfo,
        });
      }
      if (key.match(blankInfoPattern)) {
        return transformed;
      }
      return Object.assign(transformed, {
        [key]: value,
      });
    }, {});
}
