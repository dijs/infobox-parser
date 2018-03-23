require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Batman\'s Information', () => {
  const source = fs.readFileSync('./data/batman.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('publisher', () => {
    properties.general.should.have.property('publisher', 'DC Comics');
  });
  it('hero', () => {
    properties.general.hero.should.be.true();
  });
  it('partners', () => {
    properties.general.partners.length.should.equal(5);
    properties.general.partners.should.containEql('Superman');
  });
  it('aliases', () => {
    properties.general.aliases.should.containEql('Matches Malone');
    properties.general.aliases.should.containEql('Lefty Knox');
  });
  it('alliances', () => {
    properties.general.alliances.should.containEql('Justice League');
    properties.general.alliances.should.containEql('Batman Incorporated');
  });
  it('powers', () => {
    properties.general.powers.should.containEql('Expert detective');
    properties.general.powers.should.containEql('Genius-level intellect');
  });
});
