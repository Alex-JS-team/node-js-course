const request = require('request');
const darksky = require('./darksky.api');
const token = require('./token_storage');

findLocationByCity = (city) => {
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${token.getTokenMapBox()}`,
        function (error, response, body) {
            const locationInfo = JSON.parse(body).features[0];
            let locationCoord = [locationInfo.center[1], locationInfo.center[0]];
            darksky.getWeatherByCoord(locationCoord);
        });
}

//findLocation('vinnitsa');

module.exports = {
    findLocationByCity: findLocationByCity,
}
