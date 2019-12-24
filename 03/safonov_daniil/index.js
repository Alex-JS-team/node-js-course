const mapbox = require('./mapbox.api');
const term = require('terminal-kit').terminal;
const darksky = require('./darksky.api');
const weather = require('./weatherLogger');

const menuItem = ['Show weather by location', 'Show weather by city name'];


term.gridMenu(menuItem, (error, response) => {
    switch (response.selectedIndex) {
        case 0:
            term('Please enter your longitude and latitude(comma separate): ');   
            term.inputField(function (error, input) {
                const coords = input.split(",");
                darksky.getWeatherByCoords(coords, (error, data) => {
                    if (error) {
                        console.log("Error with darksky api!");
                        process.exit();
                    }
                    weather.logByCoords(data);
                    process.exit();
                });
            });
            break;
        case 1:
            term('Please enter your city name: ');
            term.inputField(function (error, input) {
                mapbox.getLocationByCity(input, (error, data) => {
                    if (error) {
                        console.log("Error with mapbox api!");
                        process.exit();
                    }
                    darksky.getWeatherByCity(data, (error, data) => {
                        if (error) {
                            console.log("Error with darksky api!");
                            process.exit();
                        }
                        weather.logByCity(data);
                        process.exit();
                    });
                })
            });
    }
})