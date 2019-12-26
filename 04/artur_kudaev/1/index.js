const func = require('./func');
const chalk = require('chalk');
const term = require( 'terminal-kit' ).terminal ;

const mycoords = [37.8267,-122.4233];

function showData(item, callback) {
  func.getData(mycoords, (error, response) => {
    if(error) {
      console.log(chalk.red(error));
    }else {
      if(item === 'time') {
        console.log(chalk.black.bgWhite.bold(new Date(response[item])));
        callback()
      }else {
        console.log(chalk.black.bgGreen.bold(`${item}: ${response[item]}`));
        callback()
      }
    }
  });
}

term.cyan( 'Метеоданные Алькатраса.\n' );

var items = [
  'summary',
  'time',
  'temperature',
  'ozone',
] ;

term.singleColumnMenu( items , function( error , response ) {
  if(response.selectedText) {
    showData(`${response.selectedText}`, process.exit)
  }
} ) ;
