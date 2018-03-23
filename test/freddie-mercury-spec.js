require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Freddie Mercury\'s Information', () => {
  const source = fs.readFileSync('./data/freddie-mercury.txt', 'utf8');
  const properties = parse(source);
  it('nationality', () => {
    properties.general.should.have.property('nationality', 'British');
  });
  it('deathPlace', () => {
    properties.general.deathPlace.should.containEql('London');
  });
  it('deathCause', () => {
    properties.general.should.have.property('deathCause', 'Bronchopneumonia');
  });
  it('death age', () => {
    properties.general.deathDate.should.have.property('age', 45);
  });
  it('associatedActs', () => {
    properties.general.associatedActs.should.containEql('Queen (band)');
  });
});
