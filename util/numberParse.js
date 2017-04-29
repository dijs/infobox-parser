
/**
 * Given a string meant to contain a number, tries to find out
 * the number considering comma or point separators
 * @param  {String} number
 * @return {Number} with the parsed number, false, if the parsing is
 *                  not possible
 */
export default (number) => {

  if (typeof number !== 'string') return false

  number = number.trim().replace(/ /g, '')

  // Find out if commas are used as thousand or decimal separators.
  // If the string has both, and commas are first, then commas are
  // thousand separators (english style)
  if (number.match(/,/) && number.match(/\./)) {
    if (number.indexOf(',') < number.indexOf('.')) {
      return parseEnglish(number)
    } else {
      return parseSpanish(number)
    }
  }

  if (number.match(/,/) && !number.match(/\./)) {
    if (number.match(/,/g).length > 1) {

      // If there is more than one, then it's a thousand separator
      return parseEnglish(number)
    } else {

      // If it's follwed by 3 digits, it's proably a thousand separator
      if (number.match(/,[0-9]{3}($|^[0-9])/)) {
        return parseEnglish(number)
      } else {
        return parseSpanish(number)
      }

    }
  }

  if (!number.match(/,/) && number.match(/\./)) {
    if (number.match(/\./g).length > 1) {

      // If there is more than one, then it's a thousand separator
      return parseSpanish(number)
    } else {

      // If it's follwed by 3 digits, it's proably a thousand separator
      if (number.match(/\.[0-9]{3}($|^[0-9])/)) {
        return parseSpanish(number)
      } else {
        return parseEnglish(number)
      }

    }
  }

  // If it looks the same as number or string, just cast it
  if ((+number).toString() === number) return +number

  return false
}

const parseEnglish = (str) => {
  return +str.replace(/,/g, '')
}

const parseSpanish = (str) => {
  return +str.replace(/\./g, '').replace(/,/g, '.')
}

