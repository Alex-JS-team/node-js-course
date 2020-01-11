const chalk = require('chalk');
const yargs = require('yargs');
const darksky = require('./darksky.api');
const mapbox = require('./mapbox.api');
const ipstack = require('./ipstack.api');

yargs.command({
    command: 'weather_coord',
    describe: 'Get weather info by coords',
    builder: {
        longitude: {
            describe: 'Longitude',
            demandOption: true,
            string: true,
        },
        latitude: {
            describe: 'Latitude',
            demandOption: true,
            string: true,
        }
    },
    handler: function (argv) {
        darksky.getWeatherByCoord([argv.longitude, argv.latitude]);
    }
})

yargs.command({
    command: 'weather_city',
    describe: 'Get weather info by city',
    builder: {
        city: {
            describe: 'City',
            demandOption: true,
            string: true,
        },
    },
    handler: function (argv) {
        mapbox.findLocationByCity(argv.city);
    }
})

yargs.command({
    command: 'weather_ip',
    describe: 'Get weather info by ip',
    builder: {
        ip: {
            describe: 'ip',
            demandOption: true,
            string: true,
        },
    },
    handler: function (argv) {
        ipstack.findLocationByIp(argv.ip);
    }
})

yargs.parse();