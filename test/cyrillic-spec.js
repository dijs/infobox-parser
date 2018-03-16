require('should');
import fs from 'fs';
import parse from '../index';

describe('Parsing cyrillic text', () => {
  const source = fs.readFileSync('./data/cyrillic.txt', 'utf8');
  const properties = parse(source);
  it('should parse simple properties', () => {
    properties.constellation.should.equal('Оріон (сузір\'я)');
  });
});
