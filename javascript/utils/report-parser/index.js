import Promise from 'bluebird';

import coreParser from './core-parser';
import regionsParser from './regions-parser';


let PARSED_REPORT = {};


class ReportParser {
  constructor() {
    this.findAndExecuteParser = this.findAndExecuteParser.bind(this);
  }

  parse(rawReport) {
    this.state = {__line: 0, __modified: false};
    this.rawReport = rawReport.split('\n');

    return new Promise((resolve, reject) => {
      this._onDone = resolve;
      this._onReject = reject;

      this.findAndExecuteParser();      
    });
  }

  findAndExecuteParser() {
    while(this.rawReport[this.state.__line].trim() === '') {
      this.state.__line += 1;
    }

    coreParser(this.rawReport, this.state);
    regionsParser(this.rawReport, this.state);

    if (this.rawReport[this.state.__line] === undefined) {
      this._onDone();
      return;
    } else if (this.state.__modified) {
      this.state.__modified = false;
    } else {
      //Unknown line, go next
      console.log('Unknown line, go next:', this.rawReport[this.state.__line]);
      this.state.__line += 1; 

      //TODO: tmp for work
      if (this.state.__line > 30) {
        return;
      }
    }
    setTimeout(this.findAndExecuteParser, 0);
  }
}


export default new ReportParser();
