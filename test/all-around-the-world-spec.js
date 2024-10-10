require('should');
import fs from 'fs';
import parse from '../index';

describe('All Around The World Song', () => {
  const source = fs.readFileSync('./data/all-around-the-world.txt', 'utf8');
  const properties = parse(source);

  it('should parse artist', () => {
    properties.general.artist.should.equal('Lisa Stansfield');
  });
  it('should parse writer and producer lists', () => {
    properties.general.writer
      .join(',')
      .should.equal('Lisa Stansfield,Ian Devaney,Andy Morris');
    properties.general.producer
      .join(',')
      .should.equal('Ian Devaney,Andy Morris');
  });
});
