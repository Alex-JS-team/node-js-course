const request = require('request');
const token = require('./token_storage');

getWeatherByCoord = (coord) => {
    request(`https://api.darksky.net/forecast/${token.getTokenDarkSky()}/${coord[0]},${coord[1]}?units=si&lang=ru`,
        function (error, response, body) {
            const currentlyWeatherInfo = JSON.parse(body).currently;
            const currentlyWeather = currentlyWeatherInfo.summary;
            const currentlyTemperature = currentlyWeatherInfo.temperature;
            const currentlyWindSpeed = currentlyWeatherInfo.windSpeed;
            console.log(`Погода: ${currentlyWeather}. Температура: ${currentlyTemperature}℃. Ветер: ${currentlyWindSpeed} м/c.`);
        });
}

//getWeather(['48.93', '28.69']);

module.exports = {
    getWeatherByCoord: getWeatherByCoord,
}
