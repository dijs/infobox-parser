require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Ronaldo\'s Information', () => {
  const source = fs.readFileSync('./data/ronaldo.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('when there is no proper infobox wrapper', () => {
    properties.general.should.have.property('imagen', 'New Zealand-Portugal (20).jpg');
    properties.general.should.have.property('deporte', 'Fútbol');
    properties.general.should.have.property('club', 'Real Madrid Club de Fútbol');
  });
});
