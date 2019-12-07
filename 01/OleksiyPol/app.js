const chalk = require('chalk')
const yargs = require('yargs')
const fs = require("fs")


function readNotes(){
  let rawNotes = fs.readFileSync('notes.json')
  let notes = JSON.parse(rawNotes)
  return notes
}
function writeNotes(notes){
  let data = JSON.stringify(notes,null,2)
  fs.writeFileSync('notes.json', data)
}


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
    let newNote = {'title':argv.title, 'body':argv.body}
    let notes = readNotes()
    notes.push(newNote)
    writeNotes(notes)
  }
})

yargs.command({
  command:'list',
  describe:'List notes',
  handler: function(){
    let notes = readNotes()
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
    let notes = readNotes()
    let index = notes.findIndex(element=>element.title==argv.title)
    if (index == -1){
      console.log(chalk.red('Element was not found'))
    }else{
      notes.splice(index, 1)
      writeNotes(notes)
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
    let notes = readNotes()
    let index = notes.findIndex(element=>element.title==argv.title)
    if (index == -1){
      console.log(chalk.red('Element was not found'))
    }else{
      console.log(chalk.green(notes[index].body))
    }
  }
})

yargs.parse()
