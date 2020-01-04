const token = require('./tokenStorage');
const request = require('request');

getLocationByCity = (cityName, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${token.getTokenMapBox()}`;
    request({ url: url, json: true },
        function (error, response, body) {
            if(error){
                console.log(`Error mapbox: ${error}`);
                callback(error);
            } else if(response.statusCode !== 200){
                console.log(`Sataus code: ${response.statusCode}`);
                callback(response.statusCode);
            } else {
                const sityCoords = [body.features[0].center[1], body.features[0].center[0]];
                const sity = body.features[0].text;
                const sityInfo = { sityCoords: sityCoords, sityName: sity};
                callback(false, sityInfo);
            }
        });
}

module.exports = {
    getLocationByCity: getLocationByCity,
}