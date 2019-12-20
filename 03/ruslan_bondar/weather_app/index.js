const request = require('request');

const url = 'https://api.darksky.net/forecast/c5b4a80d47ef8ccf58c9cdbdd2f39f4c/49.2320935,28.4671801?units=si';

request({ url: url, json: true }, function (error, response) {
    console.log(`The weather is ${response.body.daily.data[0].summary} It is currently ${response.body.daily.data[0].temperatureHigh}`);
});