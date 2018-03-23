require('should');
import fs from 'fs';
import parse from '../index';

describe('Cross game', () => {
  const source = fs.readFileSync('./data/cross-game.txt', 'utf8');
  it('should parse multiple infoboxes', () => {
  	const properties = parse(source);
  	properties.general.should.have.property('name', 'Cross Game');
  	properties.general.should.have.property('genre', 'Sports');
  	properties.manga.should.have.property('publisher', 'Shogakukan');
  	properties.tvSeries.should.have.property('director', 'Osamu Sekita');
  });
});
