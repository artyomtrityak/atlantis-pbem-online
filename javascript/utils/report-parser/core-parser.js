import { check, mRegExp } from './utils';


const factionRegExp = mRegExp([
  /^(.+)\s+/, //Faction name
  /\((\d+)\)\s+/, //Faction number
  /\((.+)\)$/ // Faction power
]);


export default function coreParser(rawReport, state) {
  if (state.factionName && state.factionTax) {
    return;
  }
  
  Object.assign(state, parseFactionName(rawReport, state));
  Object.assign(state, parseGameDate(rawReport, state));
  Object.assign(state, parseVersionInfo(rawReport, state)); 
  Object.assign(state, parseFactionStats(rawReport, state)); 
}


function parseFactionName(rawReport, state) {
  let line = state.__line;

  check(rawReport[line] !== 'Atlantis Report For:', line, rawReport[line], 'parseFactionName');
  line += 1;
  
  const result = factionRegExp.exec(rawReport[line]);
  check(!result, line, rawReport[line], 'parseFactionName');
  line += 1;

  return {
    __line: line,
    __modified: true,
    factionName: result[1],
    factionNumber: result[2],
    factionPower: result[3]
  };
}


function parseGameDate(rawReport, state) {
  let line = state.__line;
  
  const result = (new RegExp(/^(.+),\s+Year\s+(\d+)$/)).exec(rawReport[line]);
  check(!result, line, rawReport[line], 'parseGameDate');
  line += 1;

  return {
    __line: line,
    __modified: true,
    month: result[1],
    year: result[2]
  };
}


function parseVersionInfo(rawReport, state) {
  let line = state.__line;
  while(rawReport[line] === '') {
    line += 1;
  }
  
  const result = (new RegExp(/^Atlantis Engine Version: (.+)$/)).exec(rawReport[line]);
  check(!result, line, rawReport[line], 'parseVersionInfo');
  line += 1;

  const versionDetails = rawReport[line];
  line += 1;

  return {
    __line: line,
    __modified: true,
    version: result[1],
    versionDetails: versionDetails
  };
}


function parseFactionStats(rawReport, state) {
  let line = state.__line;
  while(rawReport[line] === '') {
    line += 1;
  }

  check(rawReport[line] !== 'Faction Status:', line, rawReport[line], 'parseFactionStats');
  line += 1;

  const resultTax = (new RegExp(/^Tax Regions: (\d+) \((\d+)\)$/)).exec(rawReport[line]);
  check(!resultTax, line, rawReport[line], 'parseFactionStats1');
  line += 1;

  const resultTrade = (new RegExp(/^Trade Regions: (\d+) \((\d+)\)$/)).exec(rawReport[line]);
  check(!resultTrade, line, rawReport[line], 'parseFactionStats2');
  line += 1;

  const resultMages = (new RegExp(/^Mages: (\d+) \((\d+)\)$/)).exec(rawReport[line]);
  check(!resultMages, line, rawReport[line], 'parseFactionStats3');
  line += 1;
  
  //TODO: Check is it custom
  const resultAcolytes = (new RegExp(/^Acolytes: (\d+) \((\d+)\)$/)).exec(rawReport[line]);
  if (resultAcolytes) {
    line += 1;  
  }

  return {
    __line: line,
    __modified: true,
    factionTax: resultTax[1],
    factionTaxMax: resultTax[2],
    factionTrade: resultTrade[1],
    factionTradeMax: resultTrade[2],
    factionMages: resultMages[1],
    factionMagesMax: resultMages[2]
  };
}

