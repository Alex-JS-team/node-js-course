const request = require('request');


const cityUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Vinnytsia.json?access_token=pk.eyJ1Ijoib2xla3NpeXBvbHlhbm92c2t5eSIsImEiOiJjazRkMzFkYmcwdHdpM3BwOHVmbTRtMTByIn0.ND0RA7cOs6h2oAz0dmN2jA'

request({url:cityUrl, json:true}, (error, response)=>{
    let coordinates = response.body.features[0].geometry.coordinates
    let lon = coordinates[0]
    let alt = coordinates[1]

    const weatherUrl = 'https://api.darksky.net/forecast/18031f54577c3519569219fb6bef85ad/'+lon+','+alt
    request({url: weatherUrl, json: true}, (error, response)=>{
        console.log(response.body.daily.data[0].summary + ' Temperature' + response.body.daily.data[0].temperatureHigh)
   })
})