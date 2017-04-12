require('should');
const fs = require('fs');
const parse = require('../index');

describe('Should Parse Darth Vaders\'s Information', () => {
  const source = fs.readFileSync('./data/vader.txt', 'utf8');
  const properties = parse(source);
  it('name', () => {
    properties.name.should.have.property('primary', 'Darth Vader');
    properties.name.should.have.property('secondary', 'Anakin Skywalker');
  });
  it('creator', () => {
    properties.should.have.property('creator', 'George Lucas');
  });
  it('caption', () => {
    properties.caption.should.containEql('David Prowse');
    properties.caption.should.containEql('The Empire Strikes Back');
  });
  it('portrayer', () => {
    properties.portrayer.should.containEql('David Prowse');
    properties.portrayer.should.containEql('Hayden Christensen');
  });
  it('voice', () => {
    properties.voice.should.containEql('James Earl Jones');
    properties.voice.should.containEql('Matt Lanter');
  });
});
