const chalk = require('chalk');
const utils = require('./utils');
const term = require( 'terminal-kit' ).terminal;

const searchQuery = process.argv.slice(2);

utils.getLocation(searchQuery, (error, data) => {
	if (error) {
		console.log(chalk.red(error));
	} else {
		utils.getWeather(data, (error, data) => {
			console.log(`The weather in ${chalk.green(searchQuery)} is ${chalk.blue(data.summary)}`);
            console.log(`It is currently ${chalk.blue(data.temperature)}`);
			console.log(`Wind speed is ${chalk.blue(data.windSpeed)}`);
		});
	}
});