import parse from '../../util/numberParse'

const tests = {

  // English format cases
       '1111'     : 1111,
      '1,111'     : 1111,
  '1,111,111'     : 1111111,
  '1,111,111.11'  : 1111111.11,
      '1,111.11'  : 1111.11,
       '1111.11'  : 1111.11,
         '11.11'  : 11.11,
          '1.1111': 1.1111,

  // Spanish format cases
      '1.111'     : 1111,
  '1.111.111'     : 1111111,
  '1.111.111,11'  : 1111111.11,
      '1.111,11'  : 1111.11,
       '1111,11'  : 1111.11,
         '11,11'  : 11.11,
          '1,1111': 1.1111,

  // If whitespaces
  '1 111 111.11'  : 1111111.11,
  '1 111 111,11'  : 1111111.11,

  // Not numbers
  '$100': false,
  'wiki': false,
  '100 $': false,
  '': false
}

describe('Number Parser', () => {

  Object.keys(tests).forEach((str) => {
    it(`parses ${str}`, () => {
      parse(str).should.equal(tests[str])
    })
  })
})

