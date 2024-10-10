require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Islamabad\'s Information', () => {
  const source = fs.readFileSync('./data/islamabad-full.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });

  it('Population Total', () => {
    properties.general.should.have.property('populationTotal');
    properties.general.populationTotal.should.equal('1.9 million');
  });
});
