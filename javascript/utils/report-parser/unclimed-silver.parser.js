const unclaimedRegExp = new RegExp(/^Unclaimed silver: (\d+)\.$/);


export default function unclimedSilverParser(rawReport, state) {  
  const result = unclaimedRegExp.exec(rawReport[state.__line]);
  if (!result) {
    return;
  }

  Object.assign(state, {__line: state.__line + 1, __modified: true, unclaimedSilver: result[1]});
}
