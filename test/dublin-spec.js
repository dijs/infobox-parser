require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Dublins\'s Information', () => {
  const source = fs.readFileSync('./data/dublin.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('Population Total', () => {
    properties.should.have.property('populationTotal');
    properties.populationTotal.should.equal(553165);
  });
  it('GDP Per Capita blank data', () => {
    properties.should.have.property('gdpPerCapita', 'US$ 51,319');
  });
  it('GDP Blank data', () => {
    properties.should.have.property('gdp', 'US$ 90.1 billion');
  });
});
