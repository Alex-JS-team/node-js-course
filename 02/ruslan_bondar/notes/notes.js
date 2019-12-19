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
		},
		id: {
			describe: 'Note id',
			demandOption: true,
			type: 'number'
		}
	},
	handler: ({ title, body, id }) => utils.addNote(title, body, id)
});

yargs.command({
	command: 'delete',
	describe: 'Delete your notes',
	builder: {
		id: {
			describe: 'Note id',
			demandOption: true,
			type: 'number'
		}
	},
	handler: ({ id }) => utils.deleteNote(id)
});

yargs.command({
	command: 'read',
	describe: 'Read your notes',
	builder: {
		id: {
			describe: 'Note id',
			demandOption: true,
			type: 'number'
		}
	},
	handler: ({ id }) => console.log(utils.readNote(id))
});

yargs.command({
	command: 'list',
	describe: 'List notes',
	handler: () => console.log(utils.listNotes())
});

yargs.command({
	command: 'import',
	describe: 'import your notes',
	builder: {
		file: {
			describe: 'backup file',
			demandOption: true,
			type: 'string'
		}
	},
	handler: ({ file }) => utils.importNotes(file)
});

yargs.parse();