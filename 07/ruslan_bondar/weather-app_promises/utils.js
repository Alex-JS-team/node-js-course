const request = require('request');

const getLocation = (searchQuery) => {

    return new Promise((resolve, reject) => {

    const token = 'pk.eyJ1IjoiYm9uZGlrIiwiYSI6ImNrNGQyem42NzB0aWszbW14bDFmZzI5MngifQ._MESARDPYIA7vKywYjD4Lw';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${token}`;

        request(url, (error, response, body) => {
            const locationInfo = JSON.parse(body).features[0];
            const coordinates = [locationInfo.center[1], locationInfo.center[0]];

            if (error) {
                reject('Error');
            } else if (response.statusCode !== 200) {
                reject('Geocoding API error!');
            } else {
                resolve(coordinates);
            }
        });
    });
};

const getWeather = (coords) => {

    return new Promise((resolve, reject) => {

        const token = 'c5b4a80d47ef8ccf58c9cdbdd2f39f4c';
        const url = `https://api.darksky.net/forecast/${token}/${coords[0]},${coords[1]}?units=si`;
    
        request(url, (error, response, body) => {
            const weatherInfo = JSON.parse(body).currently;
    
            if (error) {
                reject('Error');
            } else if (response.statusCode !== 200) {
                reject('Weather API error!');
            } else {
                resolve(weatherInfo);
            }
        });
    });
};

module.exports = {
    getLocation,
    getWeather
};