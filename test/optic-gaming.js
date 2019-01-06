require('should');
import fs from 'fs';
import parse from '../index';

// Source: https://github.com/dijs/wiki/issues/98
describe('Table Parsing', () => {
  const source = fs.readFileSync('./data/optic-gaming.txt', 'utf8');
  it('should ignore case while parsing table start/end pairs', () => {
    const data = parse(source);
    data.tables[0].rows[0].should.deepEqual([
       "Scump",
       "us",
       "Seth Abner",
       "SMG Slayer",
       "joined=2014-01-20",
       "rejoined=yes"
    ]);
  });
});
