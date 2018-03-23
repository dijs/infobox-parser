require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Pacman\'s Information', () => {
  const source = fs.readFileSync('./data/pacman.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('developer', () => {
    properties.general.should.have.property('developer', 'Namco');
  });
  it('modes', () => {
    properties.general.should.have.property('modes', 'Single-player video game');
  });
  it('series', () => {
    properties.general.should.have.property('series', 'Pac-Man (series)');
  });
  it('format', () => {
    properties.general.should.have.property('format', 'PDF');
  });
  it('sound', () => {
    properties.general.sound.should.containEql('1× Namco WSG');
  });
  it('platforms', () => {
    Array.isArray(properties.general.platforms).should.be.true();
    properties.general.platforms.should.containEql('Arcade game');
  });
  it('accessdate', () => {
    properties.general.accessdate.should.be.instanceOf(Date);
    properties.general.accessdate.getFullYear().should.equal(2009);
  });
});
