const func = require('./func');
const chalk = require('chalk');
const term = require( 'terminal-kit' ).terminal ;


var fs = require( 'fs' ) ;

term.cyan( 'Choose a file:\n' ) ;

var items = fs.readdirSync( process.cwd() ) ;

term.gridMenu( items , function( error , response ) {
  term( '\n' ).eraseLineAfter.green(
      "#%s selected: %s (%s,%s)\n" ,
      response.selectedIndex ,
      response.selectedText ,
      response.x ,
      response.y
  ) ;
  process.exit() ;
} ) ;

// const mycoords = [37.8267,-122.4233];
//
// func.getData(mycoords, (error, response) => {
//   if(error) {
//     console.log(chalk.red(error));
//   }else {
//     console.log(response)
//     console.log(chalk.black.bgGreen.bold(response.ozone));
//   }
// });