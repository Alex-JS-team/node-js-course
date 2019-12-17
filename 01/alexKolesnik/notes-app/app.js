const yargs = require('yargs')
const notes = require('./notes')

yargs.command({
    command: 'add',
    describe: 'add new note',
    builder: {
        title: {
            type: String,
            demandOption: true,
            describe: 'set note title'
        },
        text: {
            type: String,
            demandOption: true,
            describe: 'set note body'
        }
    },
    handler({ title, text }) {
        notes.addNote(title, text)
    }
})

yargs.command({
    command: 'delete',
    describe: 'delete note',
    builder: {
        title: {
            type: String,
            demandOption: true,
            describe: 'set note title'
        }
    },
    handler({ title }) {
        notes.deleteNote(title)
    }
})

yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        title: {
            type: String,
            demandOption: true,
            describe: 'set note title'
        }
    },
    handler({ title }) {
        notes.readNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        notes.listNote()
    }
})



yargs.parse()