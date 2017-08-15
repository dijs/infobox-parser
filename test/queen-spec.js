require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Queen\'s Information', () => {
  const source = fs.readFileSync('./data/queen.txt', 'utf8');
  const properties = parse(source);
  const propertiesNonSimple = parse(source, { simplifyDataValues: false });
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
  it('sucType', () => {
    properties.should.have.property('sucType', 'Heir apparent');
  });
  it('issue', () => {
    properties.issue.should.containEql('Anne, Princess Royal');
  });
  it('successor', () => {
    properties.should.have.property('successor', 'Charles, Prince of Wales');
  });
  it('spouse', () => {
    properties.spouse.should.have.property('who', 'Prince Philip, Duke of Edinburgh');
    properties.spouse.should.have.property('married', '20 November 1947');
  });
  it('full name', () => {
    propertiesNonSimple.should.have.property('fullName', 'Elizabeth Alexandra Mary');
  });
  it('house', () => {
    propertiesNonSimple.should.have.property('house', 'House of Windsor');
  });
  it('father', () => {
    properties.should.have.property('father', 'George VI');
  });
  it('birth place', () => {
    propertiesNonSimple.should.have.property('birthPlace', '17 Bruton Street, Mayfair, London, England, UK');
  });
  it('birth date', () => {
    // Will just update this every year :)
    properties.birthDate.should.have.property('age', 91);
    properties.birthDate.date.should.be.instanceOf(Date);
  });
  it('signature', () => {
    properties.should.have.property('signature', 'Elizabeth II signature 1952.svg');
  });
});
