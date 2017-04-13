import small from './small';
import flag from './flag';
import coords from './coords';
import instances from './instances';
import plainLists from './plainLists';
import marriages from './marriages';
import birthDates from './birthDates';
import createDataTypeHandler from './dataType';

const dataTypes = [
  instances,
  small,
  flag,
  coords,
  plainLists,
  marriages,
  birthDates,
];

export default dataTypes.map(type => {
  return {
    handler: createDataTypeHandler(type),
    name: type.name,
    pattern: new RegExp(`\\$${type.variable}_(\\d)`),
  };
});
