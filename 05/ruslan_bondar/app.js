const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes/index');

const app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, './public')));
app.use('/', routes);

app.listen(3000, () => {
    console.log('Listening port 3000...');
});