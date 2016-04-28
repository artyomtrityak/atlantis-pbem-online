export const check = (test, line, reportLine, fnName) => {
  if (test) {
    throw new Error(`Wrong report format, line ${line} in ${fnName}. ${reportLine}`);  
  }
};
