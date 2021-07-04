const func = require('./func');
const chalk = require('chalk');
const term = require( 'terminal-kit' ).terminal ;
const cities = require("all-the-cities");

term.cyan( 'Метеоданные Алькатраса.\n' );

func.getCity().then(city => {
  const data = cities.filter(el => {
    return el.name.match(city)
  });
  const coordinates = data.map(el => el.loc.coordinates);
  function showData(item) {
    return new Promise((resolve, reject) => {
      func.getData(coordinates[0])
          .then(response => {
            console.log(chalk.black.bgGreen.bold(`${item}: ${response[item]}`));
            resolve(true)
          })
          .catch(err => reject(err))
    })
  }
  func.getData(coordinates[0])
  .then(items => {
    term.singleColumnMenu( Object.keys(items) , function( error , response ) {
      if(error) {
        console.log(chalk.black.bgRed.bold(error))
      }
      else if(response.selectedText) {
        showData(`${response.selectedText}`)
          .then(() => process.exit())
          .catch(err => console.log(err))
      }
    }) ;
  });
})
