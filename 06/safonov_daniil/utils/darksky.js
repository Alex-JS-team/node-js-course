const request = require('request');
const token = '49e0af09ef9ca08901df999a7908e3cd';

getWeather = (cityInfo, callback) => {
    const url = `https://api.darksky.net/forecast/${token}/${cityInfo.sityCoords}?units=si`;
    request({ url: url, json: true }, function (error, response, body) {
        if (error) {
            console.log(`Error: ${error}`);
            callback(error);
        } else if (response.statusCode != 200) {
            console.log(`Error: ${response.statusCode}`);
            callback(error);
        } else {
            const weather = {cityName:cityInfo.cityName, weather: body.daily.data};
            callback(false, weather);
        }
    });
}

module.exports = {
    getWeather: getWeather,
}