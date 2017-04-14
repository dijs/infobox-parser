require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Darth Vaders\'s Information', () => {
  const source = fs.readFileSync('./data/vader.txt', 'utf8');
  const properties = parse(source);
  const propertiesNonSimple = parse(source, { simplifyDataValues: false });
  it('name', () => {
    propertiesNonSimple.name.should.have.property('primary', 'Darth Vader');
    propertiesNonSimple.name.should.have.property('secondary', 'Anakin Skywalker');
  });
  it('creator', () => {
    properties.should.have.property('creator', 'George Lucas');
  });
  it('caption', () => {
    propertiesNonSimple.caption.should.equal('David Prowse as Darth Vader,in The Empire Strikes Back (1980)');
  });
  it('portrayer', () => {
    properties.portrayer.should.containEql('David Prowse');
    properties.portrayer.should.containEql('Hayden Christensen');
  });
  it('voice', () => {
    properties.voice.should.containEql('James Earl Jones');
    properties.voice.should.containEql('Ben Burtt');
  });
});
