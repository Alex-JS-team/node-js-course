const chalk = require('chalk');
const notesLib = require('./notes');
const notes = notesLib.getNotes();
const arg = process.argv[2];
const yargs = require('yargs')

yargs.command({
    command: 'add',
    describe: 'Add new note',
    handler: function(argv) {
        console.log('ADD');
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete one note by id',
    builder: {
        title: {
            describe: "Title note",
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: "Body note",
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv) {
        console.log('DELETE', argv);
    }
})

yargs.command({
    command: 'view',
    describe: 'View one note by id',
    handler: function() {
        console.log('VIEW');
    }
})

yargs.parse();
