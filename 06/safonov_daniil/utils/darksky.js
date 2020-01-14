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
            const weather = body.daily.data;
            callback(false, weather);
        }
    });
}

getWeatherPromise = (cityInfo) => {
     return new Promise((resolve, reject) => {
        const url = `https://api.darksky.net/forecast/${token}/${cityInfo.sityCoords}?units=si`;
        request({ url: url, json: true }, function (error, response, body) {
            if (error) {
                console.log(`Error: ${error}`);
                reject(error);
            } else if (response.statusCode != 200) {
                console.log(`Error: ${response.statusCode}`);
                reject(error);
            } else {
                const weather = body.daily.data;
                resolve(weather);
            }
        });
    });
}

module.exports = {
    getWeatherPromise: getWeatherPromise,
    getWeather: getWeather,
}