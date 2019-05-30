require('should');
import fs from 'fs';
import parse from '../index';

describe('Chrysler building information', () => {
  const source = fs.readFileSync('./data/chrysler.txt', 'utf8');
  const properties = parse(source);
  it('should include name', () => {
    properties.general.should.have.property('name', 'Chrysler Building');
  });
  it('should include floor count', () => {
    properties.general.should.have.property('floorCount', '77');
  });
  it('should include original measurements', () => {
    properties.general.should.have.property('roof', '925 ft');
    properties.general.should.have.property('antennaSpire', '318.9 m');
  });
});
