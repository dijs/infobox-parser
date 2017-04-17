require('should');
import fs from 'fs';
import parse from '../index';

describe('No infobox', () => {
  const source = fs.readFileSync('./data/coupe-de-france.txt', 'utf8');
  it('Should not blow up when infobox does not exist', () => {
    (function(){
      parse(source);
    }).should.not.throw();
  });
});
