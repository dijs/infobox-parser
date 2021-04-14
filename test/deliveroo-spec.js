require('should');
import fs from 'fs';
import parse from '../index';

describe("Deliveroo's Information", () => {
  const source = fs.readFileSync('./data/deliveroo.txt', 'utf8');
  const properties = parse(source);
  it('should include proper units parsing', () => {
    console.log(properties);
    properties.general.industry[0].should.equal('Online food ordering');
    properties.general.industry[1].should.equal('Food delivery');
    properties.general.areaServed[0].should.equal('United Kingdom');
  });
});
