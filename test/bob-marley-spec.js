require('should');
import fs from 'fs';
import parse from '../index';

describe("Should Parse Bob Marley's Information", () => {
  const source = fs.readFileSync('./data/bob-marley.txt', 'utf8');
  const properties = parse(source);

  it('should get children', () => {
    properties.general.should.have.property('children', []);
  });
});
