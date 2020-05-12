require('should');
import fs from 'fs';
import parse from '../index';

describe('BS Table', () => {
  const source = fs.readFileSync('./data/ligne.txt', 'utf8');
  const properties = parse(source);
  it('should parse BS table', () => {
    properties.bsTables[1].should.be.Array();
    properties.bsTables[1][0].should.startWith('BS');
  });
});
