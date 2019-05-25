require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Queen\'s Information', () => {
  const source = fs.readFileSync('./data/queen.txt', 'utf8');
  const properties = parse(source);
  const propertiesNonSimple = parse(source, { simplifyDataValues: false });
  it('reign', () => {
    properties.general.should.have.property('reign', '6 February 1952 – present');
  });
  it('image', () => {
    properties.general.should.have.property('image', 'Queen Elizabeth II March 2015.jpg');
  });
  it('image caption', () => {
    properties.general.should.have.property('caption', 'Elizabeth in 2015');
  });
  it('coronation', () => {
    properties.general.should.have.property('coronation', '2 June 1953');
  });
  it('sucType', () => {
    properties.general.should.have.property('sucType', 'Heir apparent');
  });
  it('issue', () => {
    properties.general.issue.should.containEql('Anne, Princess Royal');
  });
  it('successor', () => {
    properties.general.should.have.property('successor', 'Charles, Prince of Wales');
  });
  it('spouse', () => {
    properties.general.spouse.should.have.property('who', 'Prince Philip, Duke of Edinburgh');
    properties.general.spouse.should.have.property('married', '20 November 1947');
  });
  it('full name', () => {
    propertiesNonSimple.general.should.have.property('fullName', 'Elizabeth Alexandra Mary');
  });
  it('house', () => {
    propertiesNonSimple.general.should.have.property('house', 'House of Windsor');
  });
  it('father', () => {
    properties.general.should.have.property('father', 'George VI');
  });
  it('birth place', () => {
    propertiesNonSimple.general.should.have.property('birthPlace', '17 Bruton Street, Mayfair, London, England, UK');
  });
  it('birth date', () => {
    // Will just update this every year :)
    properties.general.birthDate.should.have.property('age', 93);
    properties.general.birthDate.date.should.be.instanceOf(Date);
    properties.general.birthDate.date.getFullYear().should.equal(1926);
    properties.general.birthDate.date.getMonth().should.equal(3);
    properties.general.birthDate.date.getDate().should.equal(21);
  });
  it('signature', () => {
    properties.general.should.have.property('signature', 'Elizabeth II signature 1952.svg');
  });
});
