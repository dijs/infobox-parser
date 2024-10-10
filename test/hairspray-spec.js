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

  it('should parse release date', () => {
    properties.general.released.should.be.an.Array();
    properties.general.released.length.should.equal(2);
    properties.general.released[0].date
      .toDateString()
      .should.equal('Tue Jul 10 2007');
    properties.general.released[0].location.should.equal(
      'Fox Theater, Westwood Village'
    );
  });
});
