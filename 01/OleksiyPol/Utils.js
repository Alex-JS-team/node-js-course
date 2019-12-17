const fs = require("fs")

function readNotes(fileName){
  let rawNotes = fs.readFileSync(fileName)
  let notes = JSON.parse(rawNotes)
  return notes
}
function writeNotes(notes, fileName){
  let data = JSON.stringify(notes,null,2)
  fs.writeFileSync(fileName, data)
}

module.exports = {readNotes, writeNotes}
