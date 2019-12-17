var colors = require('colors');

const fs = require('fs');

const getNotesList = () => {
    const dataJSON = fs.readFileSync("notes.json");
    const data = JSON.parse(dataJSON);
    return data.map((data) => data.title);
}

const addNote = (title, body) => {
    const newNote = {
        title: title,
        body: body,
    }
    const dataJSON = fs.readFileSync("notes.json");
    const data = JSON.parse(dataJSON);
    data.push(newNote);
    const newData = JSON.stringify(data);
    fs.writeFileSync("notes.json",newData);
    console.log('Done.'.green);
}

const removeNote = (title) => {
    const dataJSON = fs.readFileSync("notes.json");
    const data = JSON.parse(dataJSON);
    const findNotes = data.filter((data)=>title != data.title);
    const newData = JSON.stringify(findNotes);
    fs.writeFileSync("notes.json",newData);
    console.log('Done.'.green);
}

const readNoteByTitle = (title) => {
    const dataJSON = fs.readFileSync('notes.json');
    const data = JSON.parse(dataJSON);
    
    return data.find((data)=>title == data.title);
}

module.exports = {
    getNotesList: getNotesList,
    addNote: addNote,
    removeNote: removeNote,
    readNoteByTitle:readNoteByTitle,
};
