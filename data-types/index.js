import small from './small';
import flag from './flag';
import plainLists from './plainLists';
import marriages from './marriages';
import birthDates from './birthDates';
import createDataTypeHandler from './dataType';

const dataTypes = [
  small,
  flag,
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
