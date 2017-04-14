require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Beastie Boys\'s Information', () => {
  const source = fs.readFileSync('./data/beastie-boys.txt', 'utf8');
  const properties = parse(source);
  it('landscape', () => {
    properties.should.have.property('landscape', true);
  });
  it('origin', () => {
    properties.should.have.property('origin', 'New York City');
  });
  it('yearsActive', () => {
    properties.should.have.property('yearsActive', '1981–2012');
  });
  it('genre', () => {
    properties.genre.should.containEql('Hip hop');
    properties.genre.should.containEql('rap rock');
  });
  it('label', () => {
    properties.label.should.containEql('Rat Cage');
    properties.label.should.containEql('Def Jam');
    properties.label.should.containEql('Capitol');
  });
  it('pastMembers', () => {
    properties.pastMembers.should.containEql('Michael "Mike D" Diamond');
    properties.pastMembers.should.containEql('Adam "MCA" Yauch');
    properties.pastMembers.should.containEql('Adam "Ad-Rock" Horovitz');
  });
  it('website', () => {
    properties.should.have.property('website', 'http://www.beastieboys.com/');
  });
});
