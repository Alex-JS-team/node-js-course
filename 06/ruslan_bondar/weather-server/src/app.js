const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const utils = require('../utils/utils');
const routes = require('../routes/index');

const app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

app.get('/weather', (req, res) => {
    const cityName = req.query.city;
    if (!cityName) {
        res.sendStatus(400);
    } else utils.getWeatherByString(cityName, (error, response) => {
        if (error) {
            res.sendStatus(500);
        } else {
            res.status(200).send(response);
        }
    });
});

app.listen(3000, () => {
    console.log('Listening port 3000...');
});