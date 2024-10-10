require('should');
import fs from 'fs';
import parse from '../index';

// Source: https://github.com/dijs/wiki/issues/94
describe('List Parsing', () => {
  const source = fs.readFileSync('./data/team-envy.txt', 'utf8');
  it('should be parsed', () => {
    const data = parse(source)
    data.lists[0].should.deepEqual({
    	heading: "Player Roster",
      subheading: "Active",
  		rows: [
  			['Huke', 'sa', 'Cuyler Garland', 'SMG Slayer', 'joined=2017-11-04'],
  			['ACHES','us','Patrick Price','Flex','joined=2018-09-22'],
				['Apathy','us','Bryan Zhelyazkov','SMG Slayer','joined=2018-09-22'],
				['Assault','us','Adam Garcia','Main AR','joined=2018-09-22'],
				['SiLLY','us','Justin Fargo-Palmer','SMG Support','joined=2018-09-22']
  		]
    });
    data.lists[4].should.deepEqual({
      heading: "Organization",
      subheading: "Former",
      rows: [
        ['Fearless','us','Joseph Stokes','Team Manager','newteam=Automatic Reload'],
        ['Rambo','ca','Raymond Lussier','Head Coach','newteam=retired']
      ]
    });
  });
});
