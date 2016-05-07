import { check, getSentence, mRegExp } from './utils';


const battlesRegExp = new RegExp(/^Battles during turn:$/);
const eventsRegExp = new RegExp(/^Events during turn:$/);
const unclaimedRegExp = new RegExp(/^Unclaimed silver:$/);
const combatRegExp = new RegExp(/^.+ \(\d+\) attacks .+ \(\d+\) in .+ \((\d+),(\d+)(,underworld)?\)/);


export default function battlesDuringTurnParser(rawReport, state) {
  if (!battlesRegExp.test(rawReport[state.__line])) {
    return;
  }
  //Start from next line
  Object.assign(state, {__line: state.__line + 1});

  //Max 1000 battles
  for(let i = 0; i < 1000; i += 1) {
    //Check end of battles block
    if (eventsRegExp.test(rawReport[state.__line]) || unclaimedRegExp.test(rawReport[state.__line])) {
      Object.assign(state, {__modified: true});
      return;
    }

    let battleData = getBattle(rawReport, state.__line);
    if (!battleData) {
      state.__line += 1;
      continue;
    }
    state.battles.push(battleData.battle);
    Object.assign(state, {__line: battleData.nextLine, __modified: true});
  }
}


function getBattle(rawReport, line) {
  let battle = {details: []},
      currentSentence = getSentence(rawReport, line),
      header = combatRegExp.exec(currentSentence.rawRow);
  if (!header) {
    return undefined;
  }
  battle.region = {
    x: header[1],
    y: header[2],
    isUndegrand: !!header[3]
  };
  battle.header = currentSentence.rawRow;
  line = currentSentence.nextLine;  

  //Max 1000 rows in single battle
  for(let i = 0; i < 1000; i += 1) {
    currentSentence = getSentence(rawReport, line);
    
    if (eventsRegExp.test(rawReport[line]) ||
      unclaimedRegExp.test(rawReport[line]) ||
      combatRegExp.test(currentSentence.rawRow)
    ) {
      return {
        battle: battle,
        nextLine: line
      };
    }

    line = currentSentence.nextLine;
    battle.details.push(currentSentence.rawRow);
  }

  return {
    battle: battle,
    nextLine: line
  };
}
