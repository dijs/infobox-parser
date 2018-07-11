require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Athena\'s Information', () => {
  const source = fs.readFileSync('./data/athena.txt', 'utf8');
  const properties = parse(source);
  it('should get image', () => {
    properties.general.should.have.property('image', 'Mattei Athena Louvre Ma530 n2.jpg');
  });  
});
