const note = require('./notes.js');
 validator = require('validator'),
 chalk = require('chalk'),
 yargs = require('yargs');

 let MyArgv = process.argv.slice(2);

//console.log(chalk.yellow.bgGreen.bold('Succses'));

yargs.command({
    command: 'add',
    description: 'Add a new element',
    handler : note.addNotes
});

yargs.command({
    command: 'delete',
    description: 'Delete element',
    handler : note.deleteNotes
    
});

yargs.command({
    command: 'list',
    description: 'its a Notest list:)',
    handler : note.readNotes
    
});

yargs.command({
    command: 'detail',
    description: 'help to write help for this command',
    handler : note.detailNote
    
});


console.log(yargs.argv);
