require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Transylvania\'s Information', () => {
  const source = fs.readFileSync('./data/transylvania.txt', 'utf8');
  const properties = parse(source);
  it('name', () => {
    properties.general.should.have.property('name', 'Transylvania');
  });
  it('otherName', () => {
    properties.general.otherName.should.containEql('Erdély');
  });
  it('timezone1', () => {
    properties.general.should.have.property('timezone1', 'Eastern European Time');
  });
  it('areaTotalKm2', () => {
    properties.general.should.have.property('areaTotalKm2', 102834);
  });
  it('subdivisionName', () => {
    properties.general.should.have.property('subdivisionName', 'Romania');
  });
});
