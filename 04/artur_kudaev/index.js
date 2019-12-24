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
        console.log()
        callback()
      }else {
        console.log(chalk.black.bgGreen.bold(`${item}: ${response[item]}`));
        callback()
      }
    }
  });
}

term.cyan( 'Метеоданные Алькатрасе.\n' ) ;

var items = [
  'summary',
  'time',
  'temperature',
  'ozone',
] ;

term.singleColumnMenu( items , function( error , response ) {
  term( '\n' ).eraseLineAfter.green(
      "#%s selected: %s (%s,%s)\n" ,
      response.selectedIndex ,
      response.selectedText ,
      response.x ,
      response.y
  );
  if(response.selectedText) {
    showData(`${response.selectedText}`, process.exit)
  }
} ) ;
