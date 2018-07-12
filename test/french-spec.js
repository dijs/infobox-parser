require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse French Information', () => {
  const source = fs.readFileSync('./data/french.txt', 'utf8');
  const properties = parse(source);
  it('should not return comments', () => {
    properties.general.personnages[0].should.equal('Hippolyte fils de Thésée');
  });  
});
