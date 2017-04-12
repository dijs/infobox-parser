require('should');
const fs = require('fs');
const parse = require('../index');

describe('Should Parse Pacman\'s Information', () => {
  const source = fs.readFileSync('./data/pacman.txt', 'utf8');
  const properties = parse(source);
  it('developer', () => {
    properties.should.have.property('developer', 'Namco');
  });
  it('modes', () => {
    properties.should.have.property('modes', 'Single-player video game');
  });
  it('series', () => {
    properties.should.have.property('series', 'Pac-Man (series)');
  });
  it('format', () => {
    properties.should.have.property('format', 'PDF');
  });
  it('sound', () => {
    properties.sound.should.containEql('1× Namco WSG');
  });
  it('platforms', () => {
    Array.isArray(properties.platforms).should.be.true();
    properties.platforms.should.containEql('Arcade game');
    properties.platforms.should.containEql('#Remakes and sequels');
  });
  it('accessdate', () => {
    properties.accessdate.should.be.instanceOf(Date);
    properties.accessdate.getFullYear().should.equal(2009);
  });
});
