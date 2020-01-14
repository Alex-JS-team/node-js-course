const darkApi = require('./darksky');
const mapBoxApi = require('./mapbox');

getWeatherByCity = (city, callback) => {
    mapBoxApi.getLocation(city, (error, cityInfo) => {
        if (!error) {
            darkApi.getWeatherPromise(cityInfo)
            .then((data)=>{
                callback(false, data);
            })
            .catch((error)=>{
                callback(error, undefined);
            })
        }
    });
}

module.exports = {
    getWeatherByCity: getWeatherByCity,
    getWeatherPromise: darkApi.getWeatherPromise,
    getLocationPromise: mapBoxApi.getLocationPromise,
}

