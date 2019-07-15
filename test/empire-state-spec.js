require('should');
import fs from 'fs';
import parse from '../index';

describe('Empire State building information', () => {
  const source = fs.readFileSync('./data/empire-state.txt', 'utf8');
  const properties = parse(source);
  it('should include dates', () => {
    properties.general.startDate.date.toLocaleDateString('en-US').should.equal('3/17/1930');
    properties.general.completionDate.date.toLocaleDateString('en-US').should.equal('4/11/1931');
    properties.general.opening.date.toLocaleDateString('en-US').should.equal('5/1/1931');
  });
  it('should include floor count', () => {
    properties.general.should.have.property('floorCount', '102');
  });
});
