require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Hairspray Movie Data', () => {
  const source = fs.readFileSync('./data/hairspray.txt', 'utf8');
  const properties = parse(source);

  it('Handle Arrays with Plain list with space', () => {
    Array.isArray(properties.general.starring).should.equal(true);
    Array.isArray(properties.general.producer).should.equal(true);
  });
});
