require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Article with Deprecated Coords\'s Information', () => {
  const source = fs.readFileSync('./data/coords-deprecated.txt', 'utf8');
  const properties = parse(source);
  function assertProp(key, value) {
    it(key, () => {
      properties.general.should.have.property(key, value);
    });
  }
  assertProp('latd', '00');
  assertProp('latm', '47');
  assertProp('lats', '59');
  assertProp('latNs', 'S');
  assertProp('longd', '100');
  assertProp('longm', '39');
  assertProp('longs', '58');
  assertProp('longEw', 'E');
});
