require('should');
import fs from 'fs';
import parse from '../index';

describe('Animal Nouns Table', () => {
  const source = fs.readFileSync('./data/animal-nouns.txt', 'utf8');
  const properties = parse(source);
  it('should parse table data into labeled Objects', () => {
  	properties.tables[0][0].animalName.should.equal('alligator; crocodile');
  	properties.tables[0][0].female.should.equal('cow');
  	properties.tables[0][2].male.should.equal('drone');
  });
  it('should parse mulitple tables in same source', () => {
    properties.tables[1][0].id.should.equal('123');
    properties.tables[1][1].name.should.equal('bob');
  });
});
