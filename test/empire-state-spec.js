require('should');
import fs from 'fs';
import parse from '../index';

describe('Empire State building information', () => {
  const source = fs.readFileSync('./data/empire-state.txt', 'utf8');
  const properties = parse(source);
  it('should include dates', () => {
    properties.general.startDate.date
      .toDateString()
      .should.equal('Sun Mar 16 1930');
    properties.general.completionDate.date
      .toDateString()
      .should.equal('Fri Apr 10 1931');
    properties.general.opening.date
      .toDateString()
      .should.equal('Thu Apr 30 1931');
  });
  it('should include floor count', () => {
    properties.general.should.have.property('floorCount', '102');
  });
});
