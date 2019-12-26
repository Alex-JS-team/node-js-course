const express = require('express');
const app = express();
const path = require('path');

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

app.get('/about', (req, res) => {
    res.send('about');
});

app.get('/help', (req, res) => {
    res.send('help');
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'it is snowing',
        temperature: '8'
    });
});

app.listen(3000, () => {
    console.log('Listening port 3000');
});