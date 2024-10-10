require('should');
import fs from 'fs';
import parse from '../index';

describe('BS Table', () => {
  const source = fs.readFileSync('./data/ligne.txt', 'utf8');
  const properties = parse(source);
  it('should parse BS table', () => {
    properties.bsTables[0].type.should.equal('bis');
    properties.bsTables[0].text2.should.equal('Ligne de Bourges à Miécaze');

    properties.bsTables[7].text2.should.equal(
      'Viaduc de Sainte-Agathe (ruisseau)'
    );
    properties.bsTables[7].comment.should.equal('(165m)');
    properties.bsTables[7].margin.should.equal('332,721');

    properties.bsTables[20].margin.should.equal('372,2xx/378,931');
    properties.bsTables[20].text1.should.equal('Gare de Gouttières');
    properties.bsTables[20].text2.should.equal('(658m)');
  });
});
