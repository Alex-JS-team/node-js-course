const request = require('request');

function getData(coords, callback) {

  const url = `https://api.darksky.net/forecast/bbb930df7abf0835186e2c34000cfd81/${coords[0]},${coords[1]}`;

  request({ url: url, json: true }, (error, response) => {
    if(error) {
      callback('Opps.. error..')
    }else {
      callback(null, response.body.currently)
    }
  })
}

module.exports = {getData}
