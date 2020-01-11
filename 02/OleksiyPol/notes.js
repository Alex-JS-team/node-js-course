const Note = require("./notemodel")
const utils = require("./Utils")
const fs = require("fs")
const chalk = require('chalk')

function addNote(title, body, file){
let notes = utils.readNotes(file)
    let index = notes.findIndex(element=>element.title==title)
    if (index == -1){
    let newNote = new Note(title, body)
    notes.push(newNote)
    utils.writeNotes(notes, file)
  }else{
    console.log(chalk.red('Element with this title is already exist'))
  }
}

function list(file){
let notes = utils.readNotes(file)
    for (let note of notes){
    console.log(note.title)
    }
}

function deleteNote (title, file){
let notes = utils.readNotes(file)
    let index = notes.findIndex(element=>element.title==title)
    if (index == -1){
      console.log(chalk.red('Element was not found'))
    }else{
      notes.splice(index, 1)
      utils.writeNotes(notes, file)
      console.log(chalk.green('Element was deleted'))
    }
}



function details(title, file){
    let notes = utils.readNotes(file)
    let index = notes.findIndex(element=>element.title==title)
    if (index == -1){
      console.log(chalk.red('Element was not found'))
    }else{
      console.log(chalk.green(notes[index].body))
    }
}



function importFile (fileFrom, fileTo) {
let notes = fs.readFileSync(fileFrom).toString().split('\n')
.map(note=>{
  let splitNote = note.split('-')
  return note = new Note(splitNote[0].trim(), splitNote[1].trim())
})
  utils.writeNotes(notes, fileTo)
}

module.exports = {importFile, details, deleteNote, list, addNote}