const chalk = require('chalk');
const yargs = require('yargs');
const notesLib = require('./notes');
const getNotesList = notesLib.getNotesList;
const addNote = notesLib.addNote;
const removeNote = notesLib.removeNote;
const readNoteByTitle = notesLib.readNoteByTitle;
const colors = require('colors');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            string: true,
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            string: true,
        }
    },
    handler: function (argv) {
        addNote(argv.title,argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            string: true,
        }
    },
    handler: function (argv) {
        removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log(getNotesList());
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            string: true,
        }
    },
    handler: function (argv) {
        console.log(readNoteByTitle(argv.title));
    }
})

yargs.parse()