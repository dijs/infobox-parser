require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Chuck Yeager\'s Information', () => {
  const source = fs.readFileSync('./data/yeager.txt', 'utf8');
  const properties = parse(source);
  it('alt', () => {
    properties.should.have.property('alt', 'Brigadier General Charles Elwood Yeager');
  });
  it('age', () => {
    properties.birthDate.should.have.property('age', 94);
  });
  it('birthPlace', () => {
    properties.should.have.property('birthPlace', 'Myra, West Virginia, U.S.');
  });
  it('allegiance', () => {
    properties.should.have.property('allegiance', 'United States of America');
  });
  it('nickname', () => {
    properties.should.have.property('nickname', 'Chuck');
  });
  it('battles', () => {
    Array.isArray(properties.battles).should.be.true();
    properties.battles.should.containEql('World War II');
    properties.battles.should.containEql('Cold War');
    properties.battles.should.containEql('Vietnam War');
  });
  it('branch', () => {
    Array.isArray(properties.branch).should.be.true();
    properties.branch.should.containEql('Air force');
  });
});
