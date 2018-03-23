require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Dragon Ball Z\'s Information', () => {
  const source = fs.readFileSync('./data/dbz.txt', 'utf8');
  const properties = parse(source);
  it('foreign properties', () => {
    properties.general.should.have.property('jaRomaji', 'Doragon Bōru Zetto');
    properties.general.should.have.property('jaKanji', 'ドラゴンボールZ');
  });
  it('genre list', () => {
    properties.general.genre.should.containEql('Martial arts (genre)');
    properties.general.genre.should.containEql('Comedy');
    properties.general.genre.should.containEql('Science fantasy');
  });
});
