require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Fiorentina', () => {
  const source = fs.readFileSync('./data/fiorentina.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('main image', () => {
    properties.general.should.have.property('image', 'File:ACF Fiorentina 2.svg');
  });
});
