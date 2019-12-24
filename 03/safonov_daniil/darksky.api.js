const token = require('./tokenStorage');
const request = require('request');

getWeatherByCity = (cityInfo, callback) => {
    
    const longitude = cityInfo.sityCoords[0];
    const latitude = cityInfo.sityCoords[1];
    const url = `https://api.darksky.net/forecast/${token.getTokenDarkSky()}/${longitude},${latitude}?units=si`;
    request({ url: url, json: true },
        function (error, response, body) {
            if (error) {
                console.log(`Error darksky: ${error}`);
                callback(error);
            } else if (response.statusCode !== 200) {
                console.log(`Sataus code: ${response.statusCode}`);
                callback(response.statusCode);
            } else {
                const dailyWeather = body.daily;
                const dailyWeatherInfo = {
                    city: cityInfo.sityName,
                    summary: dailyWeather.summary,
                    temperature: (dailyWeather.data[0].temperatureMax + dailyWeather.data[0].temperatureMin) / 2,
                    windSpeed: dailyWeather.data[0].windSpeed,
                }
                callback(false, dailyWeatherInfo);
            }
        });
}

getWeatherByCoords = (coords, callback) => {
    const longitude = coords[0];
    const latitude = coords[1];
    const url = `https://api.darksky.net/forecast/${token.getTokenDarkSky()}/${longitude},${latitude}?units=si`;
    request({ url: url, json: true },
        function (error, response, body) {
            if (error) {
                console.log(`Error darksky: ${error}`);
                callback(error);
            } else if (response.statusCode !== 200) {
                console.log(`Sataus code: ${response.statusCode}`);
                callback(response.statusCode);
            } else {
                const dailyWeather = body.daily;
                const dailyWeatherInfo = {
                    coords: coords,
                    summary: dailyWeather.summary,
                    temperature: (dailyWeather.data[0].temperatureMax + dailyWeather.data[0].temperatureMin) / 2,
                    windSpeed: dailyWeather.data[0].windSpeed,
                }
                callback(false, dailyWeatherInfo);
            }
        });
}

module.exports = {
    getWeatherByCity: getWeatherByCity,
    getWeatherByCoords: getWeatherByCoords,
}