require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Darth Vaders\'s Information', () => {
  const source = fs.readFileSync('./data/vader.txt', 'utf8');
  const properties = parse(source);
  const propertiesNonSimple = parse(source, { simplifyDataValues: false });
  it('name', () => {
    propertiesNonSimple.general.name.should.have.property('primary', 'Darth Vader');
    propertiesNonSimple.general.name.should.have.property('secondary', 'Anakin Skywalker');
  });
  it('creator', () => {
    properties.general.should.have.property('creator', 'George Lucas');
  });
  it('caption', () => {
    propertiesNonSimple.general.caption.should.equal('David Prowse as Darth Vader,in The Empire Strikes Back (1980)');
  });
  it('portrayer', () => {
    properties.general.portrayer.should.containEql('David Prowse');
    properties.general.portrayer.should.containEql('Hayden Christensen');
  });
  it('voice', () => {
    properties.general.voice.should.containEql('James Earl Jones');
    properties.general.voice.should.containEql('Ben Burtt');
  });
});
