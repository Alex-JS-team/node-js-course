const getWeather = require('./utils/connector');
const express = require('express');
const app = express();

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('views'));

app.get('/', (req, res) => {


    const getKyivLocationPromise = getWeather.getLocationPromise('Kyiv');
    const getCairLocationPromise = getWeather.getLocationPromise('Cair');

    Promise.all([getCairLocationPromise, getKyivLocationPromise])
    .then((result)=>{
       return Promise.all(result.map((city)=>{
          return getWeather.getWeatherPromise(city);
       }))
    })
    .then((weather)=>{
        console.log(weather);
    });

    console.log(req.query.city);
    getWeather.getLocationPromise(req.query.city)
        .then(data => getWeather.getWeatherPromise(data))
        .then((weather)=> {
            res.render('index', {
            todayWeateher: weather[0].summary,
            todayTemperature: Math.round((weather[0].temperatureHigh + weather[0].temperatureLow) / 2),
            todayWindSpeed: Math.round(weather[0].windSpeed),
            todayPrecipProbability: Math.round(weather[0].precipProbability * 100),
            todayHumidity: weather[0].humidity,
            todayIcon: `images/icons/${weather[0].icon}.png`,
            tomorrowWeateher: weather[1].summary,
            tomorrowTemperature: Math.round((weather[1].temperatureHigh + weather[1].temperatureLow) / 2),
            tomorrowWindSpeed: Math.round(weather[1].windSpeed),
            tomorrowPrecipProbability: Math.round(weather[1].precipProbability * 100),
            tomorrowHumidity: weather[1].humidity,
            tomorrowIcon: `images/icons/${weather[1].icon}.png`,
            afterTomorrowWeateher: weather[2].summary,
            afterTomorrowTemperature: Math.round((weather[2].temperatureHigh + weather[2].temperatureLow) / 2),
            afterTomorrowWindSpeed: Math.round(weather[2].windSpeed),
            afterTomorrowPrecipProbability: Math.round(weather[2].precipProbability * 100),
            afterTomorrowHumidity: weather[2].humidity,
            afterTomorrowIcon: `images/icons/${weather[2].icon}.png`,
            });
        })
        .catch((error)=>{
            console.log("Error!");
        });
    // getWeather.getWeatherByCity(req.query.city, (error, weather) => {
    //     console.log(weather);
    //     res.render('index', {
    //         todayWeateher: weather[0].summary,
    //         todayTemperature: Math.round((weather[0].temperatureHigh + weather[0].temperatureLow) / 2),
    //         todayWindSpeed: Math.round(weather[0].windSpeed),
    //         todayPrecipProbability: Math.round(weather[0].precipProbability * 100),
    //         todayHumidity: weather[0].humidity,
    //         todayIcon: `images/icons/${weather[0].icon}.png`,
    //         tomorrowWeateher: weather[1].summary,
    //         tomorrowTemperature: Math.round((weather[1].temperatureHigh + weather[1].temperatureLow) / 2),
    //         tomorrowWindSpeed: Math.round(weather[1].windSpeed),
    //         tomorrowPrecipProbability: Math.round(weather[1].precipProbability * 100),
    //         tomorrowHumidity: weather[1].humidity,
    //         tomorrowIcon: `images/icons/${weather[1].icon}.png`,
    //         afterTomorrowWeateher: weather[2].summary,
    //         afterTomorrowTemperature: Math.round((weather[2].temperatureHigh + weather[2].temperatureLow) / 2),
    //         afterTomorrowWindSpeed: Math.round(weather[2].windSpeed),
    //         afterTomorrowPrecipProbability: Math.round(weather[2].precipProbability * 100),
    //         afterTomorrowHumidity: weather[2].humidity,
    //         afterTomorrowIcon: `images/icons/${weather[2].icon}.png`,
    //     });
    //});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
