import { check, getSentence, mRegExp } from './utils';


const eventsRegExp = new RegExp(/^Errors during turn:$/);
const unclaimedRegExp = new RegExp(/^Unclaimed silver:$/);


export default function eventsDuringTurnParser(rawReport, state) {  
  if (!eventsRegExp.test(rawReport[state.__line])) {
    return;
  }
  //Start from next line
  Object.assign(state, {__line: state.__line + 1});

  //Max 1000 errors
  /*
  for(let i = 0; i < 1000; i += 1) {
    //Check end of errors block
    if (rawReport[state.__line].trim() === '' || battlesRegExp.test(rawReport[state.__line])) {
      Object.assign(state, {__modified: true});
      return;
    }

    let currentSentence = getSentence(rawReport, state.__line);
    state.errors.push(currentSentence.rawRow);

    Object.assign(state, {__line: currentSentence.nextLine, __modified: true});
  }*/
}
