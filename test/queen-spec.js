require('should');
const fs = require('fs');
const parse = require('../index');

describe('Should Parse Queen\'s Information', () => {
  const source = fs.readFileSync('./queen.txt', 'utf8');
  const properties = parse(source);
  // console.log(properties);
  it('reign', () => {
    properties.should.have.property('reign', '6 February 1952 – present');
  });
  it('image', () => {
    properties.should.have.property('image', 'Queen Elizabeth II March 2015.jpg');
  });
  it('image caption', () => {
    properties.should.have.property('caption', 'Elizabeth in 2015');
  });
  it('coronation', () => {
    properties.should.have.property('coronation', '2 June 1953');
  });
  it('suc-type', () => {
    properties.should.have.property('suc-type', 'Heir apparent');
  });
  it('issue', () => {
    properties.issue.should.containEql('Anne, Princess Royal');
  });
  it('successor', () => {
    properties.should.have.property('successor', 'Charles, Prince of Wales');
  });
  it('spouse', () => {
    const { spouse } = properties;
    spouse.should.have.property('type', 'marriage');
    spouse.should.have.property('who', 'Prince Philip, Duke of Edinburgh');
    spouse.should.have.property('when', '20 November 1947');
  });
  it('full name', () => {
    properties.should.have.property('full name', 'Elizabeth Alexandra Mary');
  });
  it('house', () => {
    properties.should.have.property('house', 'House of Windsor');
  });
  it('father', () => {
    properties.should.have.property('father', 'George VI');
  });
  it('birth_place', () => {
    properties.should.have.property('birth_place', '17 Bruton Street, Mayfair, London, England, UK');
  });
  it('signature', () => {
    properties.should.have.property('signature', 'Elizabeth II signature 1952.svg');
  });
});
