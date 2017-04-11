require('should');
const fs = require('fs');
const parse = require('../index');

describe('Should Parse Transylvania\'s Information', () => {
  const source = fs.readFileSync('./data/transylvania.txt', 'utf8');
  const properties = parse(source);
  it('name', () => {
    properties.should.have.property('name', 'Transylvania');
  });
  it('timezone1', () => {
    properties.should.have.property('timezone1', 'Eastern European Time');
  });
  it('otherName', () => {
    properties.otherName.should.containEql('Erdély');
  });
  it('timezone1', () => {
    properties.should.have.property('timezone1', 'Eastern European Time');
  });
  it('areaTotalKm2', () => {
    properties.should.have.property('areaTotalKm2', 102834);
  });
  it('subdivisionName', () => {
    properties.should.have.property('subdivisionName', 'Romania');
  });
});
