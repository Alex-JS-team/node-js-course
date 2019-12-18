const chalk = require('chalk')
const yargs = require('yargs')
const Note = require("./notemodel")
const utils = require("./Utils")
const fs = require("fs")

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
    let notes = utils.readNotes('notes.json')
    let index = notes.findIndex(element=>element.title==argv.title)
    if (index == -1){
    let newNote = new Note(argv.title, argv.body)
    notes.push(newNote)
    utils.writeNotes(notes, 'notes.json')
  }else{
    console.log(chalk.red('Element with this title is already exist'))
  }
  }
})

yargs.command({
  command:'list',
  describe:'List notes',
  handler: function(){
    let notes = utils.readNotes('notes.json')
    for (let note of notes){
    console.log(note.title)
    }
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
    let notes = utils.readNotes('notes.json')
    let index = notes.findIndex(element=>element.title==argv.title)
    if (index == -1){
      console.log(chalk.red('Element was not found'))
    }else{
      notes.splice(index, 1)
      utils.writeNotes(notes, 'notes.json')
      console.log(chalk.green('Element was deleted'))
    }
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
    let notes = utils.readNotes('notes.json')
    let index = notes.findIndex(element=>element.title==argv.title)
    if (index == -1){
      console.log(chalk.red('Element was not found'))
    }else{
      console.log(chalk.green(notes[index].body))
    }
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
  let notesArray = []
  let notes = fs.readFileSync(argv.file).toString().split('\n')
  for (let i=0; i<notes.length; i++) {
      let splitNote = notes[i].split('-')
      let note = new Note(splitNote[0].trim(), splitNote[1].trim())
      notesArray.push(note)
  }
  utils.writeNotes(notesArray, 'notes.json')
}
})

yargs.parse()
