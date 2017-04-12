require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Solok\'s Information', () => {
  const source = fs.readFileSync('./data/solok.txt', 'utf8');
  const properties = parse(source);
  it('areaTotalKm2', () => {
    properties.should.have.property('areaTotalKm2', 57.64);
  });
  it('populationAsOf', () => {
    properties.should.have.property('populationAsOf', 2014);
  });
  it('populationTotal', () => {
    properties.should.have.property('populationTotal', 62483);
  });
  it('coordinates', () => {
    properties.should.have.property('coordinates', '00|47|59|S|100|39|58|E|region:ID');
  });
  it('utcOffset', () => {
    properties.should.have.property('utcOffset', '+7');
  });
});
