require('should');
import fs from 'fs';
import parse from '../index';

describe("Should Parse Queen's Information", () => {
  const source = fs.readFileSync('./data/queen.txt', 'utf8');
  const properties = parse(source);
  const propertiesNonSimple = parse(source, { simplifyDataValues: false });

  console.log(properties, JSON.stringify(properties, null, 2));

  it('reign', () => {
    properties.general.should.have.property(
      'reign',
      '6 February 1952–8 September 2022'
    );
  });
  it('image', () => {
    properties.general.should.have.property(
      'image',
      'Queen Elizabeth II official portrait for 1959 tour (retouched) (cropped) (3-to-4 aspect ratio).jpg'
    );
  });
  it('image caption', () => {
    properties.general.should.have.property('caption', 'Formal portrait, 1959');
  });
  it('coronation', () => {
    properties.general.should.have.property('coronation', '2 June 1953');
  });
  it('issue', () => {
    properties.general.issue.should.containEql('Anne, Princess Royal');
  });
  it('successor', () => {
    properties.general.should.have.property('successor', 'Charles III');
  });
  it('spouse', () => {
    properties.general.spouse.should.have.property(
      'who',
      'Prince Philip, Duke of Edinburgh'
    );
    properties.general.spouse.should.have.property(
      'married',
      '20 November 1947'
    );
  });
  it('full name', () => {
    propertiesNonSimple.general.should.have.property(
      'fullName',
      'Elizabeth Alexandra Mary'
    );
  });
  it('house', () => {
    propertiesNonSimple.general.should.have.property(
      'house',
      'House of Windsor'
    );
  });
  it('father', () => {
    properties.general.should.have.property('father', 'George VI');
  });
  it('birth place', () => {
    propertiesNonSimple.general.should.have.property(
      'birthPlace',
      'Mayfair, London, England'
    );
  });
  it('birth date', () => {
    properties.general.birthDate.age.should.be.above(97);
    properties.general.birthDate.date.should.be.instanceOf(Date);
    properties.general.birthDate.date.getFullYear().should.equal(1926);
    properties.general.birthDate.date.getMonth().should.equal(3);
    properties.general.birthDate.date.getDate().should.equal(21);
  });
  it('signature', () => {
    properties.general.should.have.property(
      'signature',
      'Elizabeth II signature 1952.svg'
    );
  });
});
