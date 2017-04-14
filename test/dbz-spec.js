require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Dragon Ball Z\'s Information', () => {
  const source = fs.readFileSync('./data/dbz.txt', 'utf8');
  const properties = parse(source);
  it('foreign properties', () => {
    properties.should.have.property('jaRomaji', 'Doragon Bōru Zetto');
    properties.should.have.property('jaKanji', 'ドラゴンボールZ');
  });
  it('genre list', () => {
    properties.genre.should.containEql('Martial arts');
    properties.genre.should.containEql('Comedy');
    properties.genre.should.containEql('Science fantasy');
  });
});
