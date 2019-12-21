const request = require('request');
const chalk = require('chalk');
var term = require( 'terminal-kit' ).terminal;

const queryLocation = 'Vinnytsia';
const weatherToken = 'c5b4a80d47ef8ccf58c9cdbdd2f39f4c';
const locationToken = 'pk.eyJ1IjoiYm9uZGlrIiwiYSI6ImNrNGQyem42NzB0aWszbW14bDFmZzI5MngifQ._MESARDPYIA7vKywYjD4Lw';
const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryLocation}.json?access_token=${locationToken}`;

request({ url: locationUrl, json: true }, (error, response) => {
    const coordinates = [response.body.features[0].center[1], response.body.features[0].center[0]];

    if (error) {
        console.log('Error', error);
    } else {
        console.log('Coordinates:', coordinates);
    }

    const weatherUrl = `https://api.darksky.net/forecast/${weatherToken}/${coordinates[0]},${coordinates[1]}?units=si`;

    request({ url: weatherUrl, json: true }, (error, response) => {
        const weatherSummary = response.body.daily.data[0].summary;
        const maxTemperature = response.body.daily.data[0].temperatureHigh;
        const windSpeed = response.body.daily.data[0].windSpeed;

        if (error) {
            console.log('Error', error);
        } else {
            console.log(`The weather in ${chalk.green(queryLocation)} is ${chalk.blue(weatherSummary)}`);
            console.log(`It is currently ${chalk.blue(maxTemperature)}`);
            console.log(`Wind speed is ${chalk.blue(windSpeed)}`);
        }
    });
});