const yargs = require('yargs');
const utils = require('./utils');

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
	handler: function ({ title, body }) {
        utils.addNote(title, body);
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
	handler: function ({ title }) {
		utils.deleteNote(title);
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
	handler: function ({ title }) {
		console.log(utils.readNote(title));
	}
});

yargs.command({
	command: 'list',
	describe: 'List notes',
	handler: function(){
		console.log(utils.listNotes());
	}
});

yargs.parse();