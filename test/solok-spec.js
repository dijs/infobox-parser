require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Solok\'s Information', () => {
  const source = fs.readFileSync('./data/solok.txt', 'utf8');
  const properties = parse(source);
  it('areaTotalKm2', () => {
    properties.general.should.have.property('areaTotalKm2', 57.64);
  });
  it('populationAsOf', () => {
    properties.general.should.have.property('populationAsOf', 2014);
  });
  it('populationTotal', () => {
    properties.general.should.have.property('populationTotal', 62483);
  });
  it('coordinates', () => {
    properties.general.should.have.property('coordinates', '00|47|59|S|100|39|58|E|region:ID');
  });
  it('utcOffset', () => {
    properties.general.should.have.property('utcOffset', '+7');
  });
});
