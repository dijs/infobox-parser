require('should');
import fs from 'fs';
import parse from '../index';

describe('Should parse information from zh wiki', () => {
  const source = fs.readFileSync('./data/zh-term.txt', 'utf8');
  const properties = parse(source);
  it('should parse partial death date data', () => {
    properties.general.deathDate.should.have.property('age', 55);
  });
});

