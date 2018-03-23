require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Cedar Bluff\'s Information', () => {
  const source = fs.readFileSync('./data/cedar-bluff.txt', 'utf8');
  const properties = parse(source);
  it('website', () => {
    properties.general.website.url.should.equal('http://ksoutdoors.com/State-Parks/Locations/Cedar-Bluff');
    properties.general.website.title.should.equal('Cedar Bluff State Park');
  });
});
