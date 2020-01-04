const express = require('express');
const path = require('path');
const config = require('./config.js');
const data = require('./data');
const hbs = require("hbs");
const utils = require('./utils');
var bodyParser = require('body-parser')


const app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/hbs', (req, res) => {
  res.render('index.hbs')
})

// app.get('/weather', ((req, res) => {
//   const cityName = req.query.city;
//   if(!cityName) {
//     res.sendStatus(400)
//   } else {
//     utils.getWeatherByString(cityName, (error, weather) => {
//       if (error) {
//         res.sendStatus(500);
//       } else {
//         res.status(200).render('weather.hbs', {
//           city: weather
//         })
//       }
//     });
//   }
//
// }));

app.post('/getweather', urlencodedParser, ((req, res) => {
  console.log(req.body);
  // if(!cityName) {
  //   res.sendStatus(400)
  // } else {
  //   utils.getWeatherByString(cityName, (error, weather) => {
  //     if (error) {
  //       res.sendStatus(500);
  //     } else {
  //       res.status(200).json(weather)
  //     }
  //   });
  // }

}));


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

var err = '';

app.use(express.static(path.join(__dirname, '/public')));

function error404(req, res, next) {
  err = `https://${req.hostname+req.url}`;
  console.log(`Error page - ${err} || ${new Date().toLocaleString()}`);
  next();
}

app.get('/api', (req, res) => {
  res.json(data)
});

app.get('/', (req, res) => {
  res.sendFile('index.html' , { root : __dirname+'/public'});
});

app.use(error404);

app.use(function(req, res) {
  res.status(404).send(`<h1>404</h1><h2>${err?err:null}</h2>`);
});

app.listen(config.port, ()=>console.log('Start on port 3000..'));
