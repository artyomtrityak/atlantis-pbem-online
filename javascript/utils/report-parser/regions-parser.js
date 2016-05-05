import { check, getSentence, mRegExp } from './utils';


const regionRegExp = mRegExp([
  /^(\w+)\s+/, // Region type
  /\((\d+),(\d+),?(underworld)?\)/, // Region coordinates
  /\s+in\s+.+$/ // ...rest
]);
const ordersRegExp = new RegExp(/^Orders Template \(Long Format\)/);


export default function regionsParser(rawReport, state) {
  let currentSentence = getSentence(rawReport, state.__line);
  
  if (!regionRegExp.test(currentSentence.rawRow)) {
    return;
  }
  
  let region = {details: []};
  Object.assign(region, parseRegionHeader(currentSentence.rawRow));
  Object.assign(state, {__line: currentSentence.nextLine + 1, __modified: true}); // +1 because ------ delimiter


  // Go to region details
  // Max 1000 rows in region block 
  for(let i = 0; i < 1000; i += 1) {
    if (rawReport[state.__line].trim() === '') {
      state.__line += 1;
      continue;
    }
    region.details.push(currentSentence.rawRow);



    //Region details processors
    


    //Is regions block end
    if (ordersRegExp.test(rawReport[state.__line])) {
      state.regions[generateRegionId(region)] = region;
      return;
    }

    // Is it start of new region
    currentSentence = getSentence(rawReport, state.__line);
    if (regionRegExp.test(currentSentence.rawRow) || ordersRegExp.test(currentSentence.rawRow)) {
      state.regions[generateRegionId(region)] = region;
      return;
    }
    
    Object.assign(state, {__line: currentSentence.nextLine, __modified: true});
  }

  throw new Error('Region is too big, line:', state.__line);
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
    raw: rawRow
  };
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
