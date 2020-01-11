const yargs = require('yargs');
const notesLib = require('./notes');


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
        notesLib.addNote(argv.title,argv.body);
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
        notesLib.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log( notesLib.getNotesList());
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
        console.log( notesLib.readNoteByTitle(argv.title));
    }
})

yargs.command({
    command: 'import',
    describe: 'Extend json file txt file',
    builder: {
        file: {
            describe: 'text file name(with .txt)',
            demandOption: true,
            string: true,
        }
    },
    handler: function (argv) {
        notesLib.importNoteFile(argv.file);
    }
})

yargs.parse()