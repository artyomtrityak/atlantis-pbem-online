import { check, getSentence, mRegExp } from './utils';


const regionRegExp = mRegExp([
  /^(\w+)\s+/, // Region type
  /\((\d+),(\d+),?(underworld)?\)/, // Region coordinates
  /\s+in\s+.+$/ // ...rest
]);
const ordersRegExp = new RegExp(/^Orders Template \(Long Format\)/);
const exitsHeaderRegExp = new RegExp(/^Exits:$/);
const exitsRegExp = new RegExp(/^.+ : (.+) \((\d+),(\d+)(,underworld)?\) in/);


export default function regionsParser(rawReport, state) {
  let currentSentence = getSentence(rawReport, state.__line);
  
  if (!regionRegExp.test(currentSentence.rawRow)) {
    return;
  }
  
  let region = {details: []};
  Object.assign(region, parseRegionHeader(currentSentence.rawRow));
  Object.assign(state, {__line: currentSentence.nextLine + 1}); // +1 because ------ delimiter


  // Max 1000 rows in region block 
  for(var i = 0; i < 1000; i += 1) {
    if (rawReport[state.__line].trim() === '') {
      state.__line += 1;
      continue;
    }

    region.details.push(currentSentence.rawRow);

    //Is regions block end
    if (ordersRegExp.test(rawReport[state.__line])) {
      state.regions[generateRegionId(region)] = region;
      break;
    }

    // Is it start of new region
    currentSentence = getSentence(rawReport, state.__line);
    if (regionRegExp.test(currentSentence.rawRow) || ordersRegExp.test(currentSentence.rawRow)) {
      state.regions[generateRegionId(region)] = region;
      break;
    }

    // Exits: does not a sentence because does not have . or ! in the end, just check this custom case
    if (exitsHeaderRegExp.test(rawReport[state.__line])) {
      currentSentence = {
        rawRow: rawReport[state.__line],
        nextLine: state.__line + 1
      };
    }
    Object.assign(state, {__line: currentSentence.nextLine});
  }


  // Parsing exits and add them to the regions if they have not been already added
  parseAndAddRegionsFromExits(region, state);


  Object.assign(state, {__modified: true});


  if (i === 1000) {
    throw new Error('Region is too big, line:', state.__line);
  }
}


function parseRegionHeader(rawRow, region) {
  let regionHead = regionRegExp.exec(rawRow);
  if (!regionHead) {
    return {};
  }

  return {
    type: regionHead[1],
    x: parseInt(regionHead[2], 10),
    y: parseInt(regionHead[3], 10),
    isUnderworld: regionHead[4] === 'underworld',
    title: rawRow
  };
}


function parseAndAddRegionsFromExits(region, state) {
  // Looking for Exits:
  for(let i = 0; i < region.details.length; i += 1) {
    if (!exitsHeaderRegExp.test(region.details[i])) {
      continue;
    }
    
    // Max 6 border regions
    for(let j = 1; j < 7; j += 1) {
      let result = exitsRegExp.exec(region.details[i + j]);
      if (!result) {
        return;
      }
      let newRegion = {
        type: result[1],
        x: result[2],
        y: result[3],
        isUnderworld: result[4] === ',underworld',
        exitRegion: true
      };
      let regionId = generateRegionId(newRegion);
      if (!state.regions[regionId]) {
        state.regions[regionId] = newRegion;
      }
    }
  }
}


function generateRegionId(region) {
  if (region.isUnderworld) {
    return region.x + '_' + region.y + '_0';
  }
  if (region.isNexus) {
    return region.x + '_' + region.y + '_2';
  }
  return region.x + '_' + region.y + '_1';
}
