require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Pacman\'s Information', () => {
  const source = fs.readFileSync('./data/pacman.txt', 'utf8');
  const properties = parse(source);
  it('developer', () => {
    properties.should.have.property('developer', 'Namco');
  });
  it('modes', () => {
    properties.modes.should.have.property('value', 'Single-player video game');
  });
  it('series', () => {
    properties.series.should.have.property('value', 'Pac-Man (series)');
  });
  it('format', () => {
    properties.should.have.property('format', 'PDF');
  });
  it.skip('sound', () => {
    properties.sound.should.containEql('1× Namco WSG');
  });
  it.skip('platforms', () => {
    Array.isArray(properties.platforms).should.be.true();
    properties.platforms.should.containEql('Arcade game');
    properties.platforms.should.containEql('#Remakes and sequels');
  });
  it('accessdate', () => {
    properties.accessdate.should.be.instanceOf(Date);
    properties.accessdate.getFullYear().should.equal(2009);
  });
});
