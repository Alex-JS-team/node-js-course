logByCity = (info) => {
    const weatherInfo = `\nCity: ${info.city}. Today: ${info.summary} Temperature: ${info.temperature}°C. Wind speed: ${info.windSpeed} m/s.\n`;
    console.log(weatherInfo);
}

logByCoords = (info) => {
    const weatherInfo = `\nCoords: ${info.coords[0]},${info.coords[1]}. Today: ${info.summary} Temperature: ${info.temperature}°C. Wind speed: ${info.windSpeed} m/s.\n`;
    console.log(weatherInfo);
}

module.exports = {
    logByCity: logByCity,
    logByCoords: logByCoords,
}
