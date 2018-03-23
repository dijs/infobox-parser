require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse The Lego Batman Movie\'s Information', () => {
  const source = fs.readFileSync('./data/the-lego-batman-movie.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('country', () => {
    properties.general.country.should.be.an.Array();
    properties.general.country.length.should.equal(3);
    properties.general.country.should.containEql('Denmark');
  });
});
