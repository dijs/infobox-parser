require('should');
const fs = require('fs');
const parse = require('../index');

describe('Should Parse Dragon Ball Z\'s Information', () => {
  const source = fs.readFileSync('./data/dbz.txt', 'utf8');
  const properties = parse(source);
  it('foreign property', () => {
    properties.should.have.property('jaRomaji', 'Doragon Bōru Zetto');
  });
  it('genre', () => {
    properties.genre.should.containEql('Martial arts (genre)');
    properties.genre.should.containEql('Comedy');
  });
});
