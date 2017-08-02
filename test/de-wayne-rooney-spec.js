require('should');
import fs from 'fs';
import parse from '../index';

// Source: https://github.com/dijs/infobox-parser/issues/8
describe('Infobox list parsing issue', () => {
  const source = fs.readFileSync('./data/de-wayne-rooney.txt', 'utf8');
  it('Should not blow up while parsing infobox', () => {
    (function(){
      parse(source);
    }).should.not.throw();
  });
});
