require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse FC Copenhagen Information', () => {
  const source = fs.readFileSync('./data/fc-copenhagen.txt', 'utf8');
  const properties = parse(source);
  it('main image', () => {
    properties.general.should.have.property('image', 'File:FC København.svg');
  });
});
