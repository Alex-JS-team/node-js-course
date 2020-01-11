const yargs = require('yargs')
const notes = require('./notes')

yargs.command({
  command:'add',
  describe:'Add new note',
  builder:{
    title:{
      describe:"Note title",
      demandOption: true,
      type:"string"
    },
    body:{
      describe:"Note body",
      demandOption: true,
      type:"string"
    }
  },
  handler: function(argv){
    notes.addNote(argv.title, argv.body, 'notes.json')
   
  }
})

yargs.command({
  command:'list',
  describe:'List notes',
  handler: function(){
    notes.list('notes.json')
    
  }
})

yargs.command({
  command:'delete',
  describe:'delete note',
  builder:{
    title:{
      describe:"Note title",
      demandOption: true,
      type:"string"
    }
  },
  handler: function(argv){

    notes.deleteNote(argv.title, 'notes.json')
    
  }
})

yargs.command({
  command:'details',
  describe:'Show note description',
  builder:{
    title:{
      describe:"Note title",
      demandOption: true,
      type:"string"
    }
  },
  handler: function(argv){
    notes.details(argv.title, 'notes.json')
    }
})

yargs.command({
  command:'import',
  describe:'Importing information to notes.json',
  builder:{
    file:{
      describe:"sourse file",
      demandOption: true,
      type:"string"
    }
  },
  handler: function (argv){
    notes.importFile(argv.file, 'notes.json')
}
})

yargs.parse()
