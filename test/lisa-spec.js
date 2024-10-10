require('should');
import fs from 'fs';
import parse from '../index';

describe("Should Parse Lisa's Information", () => {
  const source = fs.readFileSync('./data/lisa.txt', 'utf8');
  const properties = parse(source);

  it('main image', () => {
    properties.general.should.have.property(
      'image',
      'Blackpink Lisa Vogue 2021.png'
    );
  });
});
