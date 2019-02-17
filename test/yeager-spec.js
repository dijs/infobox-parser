require('should');
import fs from 'fs';
import parse from '../index';

describe('Should Parse Chuck Yeager\'s Information', () => {
  const source = fs.readFileSync('./data/yeager.txt', 'utf8');
  const properties = parse(source);
  it('alt', () => {
    properties.general.should.have.property('alt', 'Brigadier General Charles Elwood Yeager');
  });
  it('age', () => {
    properties.general.birthDate.should.have.property('age', 96);
  });
  it('birthPlace', () => {
    properties.general.should.have.property('birthPlace', 'Myra, West Virginia');
  });
  it('allegiance', () => {
    properties.general.should.have.property('allegiance', 'United States of America');
  });
  it('nickname', () => {
    properties.general.should.have.property('nickname', 'Chuck');
  });
  it('battles', () => {
    Array.isArray(properties.general.battles).should.be.true();
    properties.general.battles.should.containEql('World War II');
    properties.general.battles.should.containEql('Cold War');
    properties.general.battles.should.containEql('Vietnam War');
  });
  it('branch', () => {
    Array.isArray(properties.general.branch).should.be.true();
    properties.general.branch.should.containEql('Air force');
  });
});
