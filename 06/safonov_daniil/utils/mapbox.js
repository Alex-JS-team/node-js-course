const request = require('request');
$token = 'pk.eyJ1IjoiZmlyZXNhZmZvIiwiYSI6ImNrNGRzczVwZjA2MDMzZnJtbWVwcmJtdTQifQ.VX4wjFanpM49n2a1s7E6uA';

getLocation = (city, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${$token}`;
    request({ url: url, json: true }, function (error, response, body) {
        if (error) {
            console.log(`Error: ${error}`);
            callback(error);
        } else if (response.statusCode != 200) {
            console.log(`Error: ${response.statusCode}`);
            callback(error);
        } else {
            const sityCoords = [body.features[0].center[1], body.features[0].center[0]];
            const sity = body.features[0].text;
            const sityInfo = { sityCoords: sityCoords, sityName: sity };
            callback(false, sityInfo);
        }
    });
}

module.exports = {
    getLocation: getLocation,
}