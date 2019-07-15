export const DO_NOT_REPLACE = Symbol('DO NOT REPLACE');

export default function dataType({ globalPattern, parsePattern, parse, variable, name }) {
  return source => {
    const matches = source.match(globalPattern);
    if (!matches) {
      return {
        [name]: [],
        sourceAfter: source,
      }
    }
    const instances = matches.map(match => parse(match.match(parsePattern)));
    const sourceAfter = matches.reduce((memo, match, index) => {
      if (instances[index] === DO_NOT_REPLACE) {
        return memo;
      }
      return memo.replace(match, `$${variable}_${index}`);      
    }, source);
    return {
      data: {
        [name]: instances,
      },
      sourceAfter,
    };
  };
}
