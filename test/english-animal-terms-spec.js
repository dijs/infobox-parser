require('should');
import fs from 'fs';
import parse from '../index';

describe('Enlgish Animal Terms Table', () => {
  const source = fs.readFileSync('./data/english-animal-terms.txt', 'utf8');
  const properties = parse(source);
  it('should parse table data', () => {
    properties.tables[0][0].subject.should.equal('A');
    properties.tables[0][1].subject.should.equal('albatross');
    properties.tables[0][3].collectiveNoun.should.equal('army,colony,nest,swarm');
    properties.tables[0][170].subject.should.equal('wildfowl');
    properties.tables[0][170].collectiveNoun.should.equal('bunch,knob,plump,trip');
  });
});
