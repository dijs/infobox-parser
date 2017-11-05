require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Freddie Mercury\'s Information', () => {
  const source = fs.readFileSync('./data/freddie-mercury.txt', 'utf8');
  const properties = parse(source);
  it('nationality', () => {
    properties.should.have.property('nationality', 'British');
  });
  it('deathPlace', () => {
    properties.deathPlace.should.containEql('London');
  });
  it('deathCause', () => {
    properties.should.have.property('deathCause', 'Bronchopneumonia');
  });
  it('death age', () => {
    properties.deathDate.should.have.property('age', 45);
  });
  it('associatedActs', () => {
    properties.associatedActs.should.containEql('Queen (band)');
  });
});
