require('should');
import fs from 'fs';
import parse from '../index';

describe('Copper\'s Information', () => {
  const source = fs.readFileSync('./data/copper.txt', 'utf8');
  const properties = parse(source);
  it('should include proper units parsing', () => {
  	properties.general.meltingPointC.should.equal('1084.62');
    properties.general.magneticSusceptibility.should.equal('-5.46·10^-6');
  });
});
