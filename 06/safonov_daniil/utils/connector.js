const darkApi = require('./darksky');
const mapBoxApi = require('./mapbox');

getWeatherByCity = (city, callback) => {
    mapBoxApi.getLocation(city, (error, cityInfo) => {
        if (!error) {
            darkApi.getWeather(cityInfo, (error, weather) => {
                if (!error) {
                    callback(false, weather);
                }
            });
        }
    });
}

module.exports = {
    getWeatherByCity: getWeatherByCity,
}

