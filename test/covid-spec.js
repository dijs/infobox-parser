require('should');
import fs from 'fs';
import parse from '../index';

describe('COVID Information', () => {
  const source = fs.readFileSync('./data/covid.txt', 'utf8');
  const properties = parse(source);

  it('should include parsed tables', () => {
    properties.tables[0][0].should.have.property('confirmedCases', 6506);
    properties.tables[0][1].should.have.property('province', 'Blida Province');
  });
});
