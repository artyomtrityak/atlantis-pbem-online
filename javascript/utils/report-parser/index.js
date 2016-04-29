import Promise from 'bluebird';

import coreParser from './core-parser';
import regionsParser from './regions-parser';


let PARSED_REPORT = {};


class ReportParser {
  constructor() {
    this.findAndExecuteParser = this.findAndExecuteParser.bind(this);
    this.getState = this.getState.bind(this);
  }

  getState() {
    return this.state;
  }

  parse(rawReport) {
    this.state = {__line: 0, __modified: false, regions: []};
    this.rawReport = rawReport.split('\n');
    this.flushTimer = 20;

    return new Promise((resolve, reject) => {
      this._onDone = resolve;
      this._onReject = reject;

      this.findAndExecuteParser();      
    });
  }

  findAndExecuteParser() {
    if (this.state.__line % 1000 === 0) {
      console.log(this.state.__line);
    }
    coreParser(this.rawReport, this.state);
    regionsParser(this.rawReport, this.state);

    //TODO: tmp for work
    //if (this.state.__line > 2220) {
    //  console.log(this.state);
    //  return;
    //}

    if (this.rawReport[this.state.__line] === undefined) {
      this._onDone();
      console.log('DONE', this.state);
      return;
    } else if (this.state.__modified) {
      this.state.__modified = false;
    } else {
      //Unknown line, go next
      //console.log('Unknown line, go next:', this.rawReport[this.state.__line]);
      this.state.__line += 1; 
    }

    //Flush timer is using for unblock event loop to prevent browser freeze
    if (this.flushTimer) {
      this.flushTimer -= 1;
      this.findAndExecuteParser();
    } else {
      this.flushTimer = 20;
      setTimeout(this.findAndExecuteParser, 0);  
    }
  }
}


export default new ReportParser();
