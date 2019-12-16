const yargs = require('yargs');

yargs.command({
	command: 'add',
	describe: 'Add your notes',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function () {
		console.log('Adding');
	}
});

yargs.command({
	command: 'delete',
	describe: 'Delete your notes',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function () {
		console.log('deleting');
	}
});

yargs.command({
	command: 'read',
	describe: 'Read your notes',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function () {
		console.log('reading');
	}
});

yargs.command({
	command: 'list',
	describe: 'List notes',
	handler: function () {
		console.log('listing');
	}
});

yargs.parse();
console.log(yargs.argv);