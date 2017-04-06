require('should');
const fs = require('fs');
const parse = require('../index');

describe('Should Parse Batman\'s Information', () => {
  const source = fs.readFileSync('./data/batman.txt', 'utf8');
  const properties = parse(source);
  it('publisher', () => {
    properties.should.have.property('publisher', 'DC Comics');
  });
  it('hero', () => {
    properties.hero.should.be.true();
  });
  it('partners', () => {
    properties.partners.length.should.equal(5);
    properties.partners.should.containEql('Superman');
  });
  it('aliases', () => {
    properties.aliases.should.containEql('Matches Malone');
  });
  it('alliances', () => {
    properties.alliances.should.containEql('Justice League');
    properties.alliances.should.containEql('Batman Incorporated');
  });
});
