const request = require('request');
const mapbox = require('./mapbox.api');
const token = require('./token_storage');

findLocationByIp = (ip) => {
    request(`http://api.ipstack.com/${ip}?access_key=${token.getTokenIpStack()}`,
        function (error, response, body) {
            const locationInfoByIp = JSON.parse(body).city;
            console.log(locationInfoByIp);
            mapbox.findLocationByCity(locationInfoByIp);
        });
}

//findLocationByIp('109.108.248.59');

module.exports = {
    findLocationByIp: findLocationByIp,
}