require('should');
import fs from 'fs';
import parse from '../index';

describe("Should Parse Cincinnati's Information", () => {
  const source = fs.readFileSync('./data/cincinnati.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('Coordinates', () => {
    properties.general.should.have.property(
      'coordinates',
      '39|06|00|N|84|30|45|W|region:US-OH_type:city(309,000'
    );
  });
});
