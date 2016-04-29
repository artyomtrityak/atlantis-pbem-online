/**
 * Prints check error if something went wrong 
 */
export const check = (test, line, reportLine, fnName) => {
  if (test) {
    throw new Error(`Wrong report format, line ${line} in ${fnName}. ${reportLine}`);  
  }
};

/**
 * Returns sentence which ends with dot (.) from current line.
 */
export const getSentence = (rawReport, line) => {
  let result = '';

  for(let i = 0; i < 100; i += 1) {
    if (rawReport[line] !== undefined) {
      result += rawReport[line];  
    }
    if (rawReport[line] === undefined || result[result.length-1] === '.' || rawReport[line] === '#end') {
      return {
        rawRow: result,
        nextLine: line+1
      };
    }
    line += 1;
  }

  throw new Error('Wrong parser for getSentence, line ' + line + '. String: ' + rawReport[line]);
};


/**
 * @param  {array} Array or subRegExps
 * @return {RegExp}
 */
export const mRegExp = (regexps) => {
  return new RegExp(regexps.map((reg) => {
    return reg.source;
  }).join(''));
};
