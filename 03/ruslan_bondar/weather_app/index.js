const chalk = require('chalk');
const utils = require('./utils');
const term = require('terminal-kit').terminal;

const searchQuery = process.argv.slice(2);

let progress = 0;
let progressBar = term.progressBar({
	width: 50,
	title: 'Loading',
	eta: true,
	percent: true
});

const doProgress = () => {
	progress += Math.random() / 10;
	progressBar.update(progress);
	
	if (progress < 1) {
		setTimeout(doProgress, 50 + Math.random() * 50);
	} else {
		utils.getLocation(searchQuery, (error, data) => {
			term('\n');
			if (error) {
				console.log(chalk.red(error));
			} else {
				utils.getWeather(data, (error, data) => {
					console.log(`The weather in ${chalk.green(searchQuery)} is ${chalk.blue(data.summary)}`);
					console.log(`It is currently ${chalk.blue(Math.ceil(data.temperature))}${chalk.blue(`℃`)}`);
					console.log(`Wind speed is ${chalk.blue(data.windSpeed)} m/s`);
				});
			}
		});
	}
};
doProgress();