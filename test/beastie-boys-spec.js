require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Beastie Boys\'s Information', () => {
  const source = fs.readFileSync('./data/beastie-boys.txt', 'utf8');
  const properties = parse(source);
  it('landscape', () => {
    properties.general.should.have.property('landscape', true);
  });
  it('origin', () => {
    properties.general.should.have.property('origin', 'New York City');
  });
  it('yearsActive', () => {
    properties.general.should.have.property('yearsActive', '1981–2012');
  });
  it('genre', () => {
    properties.general.genre.should.containEql('Hip hop music');
    properties.general.genre.should.containEql('rap rock');
  });
  it('label', () => {
    properties.general.label.should.containEql('Rat Cage Records');
    properties.general.label.should.containEql('Def Jam Recordings');
    properties.general.label.should.containEql('Capitol Records');
  });
  it('pastMembers', () => {
    properties.general.pastMembers.should.containEql('Mike D');
    properties.general.pastMembers.should.containEql('Adam Yauch');
    properties.general.pastMembers.should.containEql('Ad-Rock');
  });
  it('website', () => {
    properties.general.should.have.property('website', 'http://www.beastieboys.com/');
  });
});
