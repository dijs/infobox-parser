require('should');
import fs from 'fs';
import parse from '../index';

describe('Regex Parsers Table', () => {
  const source = fs.readFileSync('./data/regex-parsers.txt', 'utf8');
  const properties = parse(source);
  it('should parse different type of table data into labeled Objects', () => {
  	properties.tables[0][0].name.should.equal('Alex');
  	properties.tables[0][6].outputLanguages.should.equal('Java');
  });
});
