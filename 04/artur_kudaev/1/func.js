const request = require('request');
const term = require( 'terminal-kit' ).terminal ;

function getData(coords) {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/bbb930df7abf0835186e2c34000cfd81/${coords[0]},${coords[1]}`;
    request({ url: url, json: true }, (error, response) => {
      if(error) {
        reject('Opps.. error..')
      }else {
        resolve(response.body.currently)
      }
    })
  })
};

function getCity() {
  return new Promise((resolve, reject) => {
    term.magenta( "Enter city: " ) ;
    term.inputField(
        function( error , input ) {
          if(error) reject(error);
          resolve(input);
        }
    ) ;
  })
};

module.exports = {getData, getCity};
