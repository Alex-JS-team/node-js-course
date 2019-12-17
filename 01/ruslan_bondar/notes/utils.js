const fs = require('fs');

const addNote = (title, body) => {
    const note = { title, body };
    const notesJSON = fs.readFileSync('notes.json');
    const data = JSON.parse(notesJSON);

    if (data.find(note => note.title === title)) {
        console.log('Note with this title is exist');
    } else {
        data.push(note);
    }
    
    const newNote = JSON.stringify(data);
    fs.writeFileSync('notes.json', newNote);
};

const deleteNote = title => {
    const notesJSON = fs.readFileSync('notes.json');
    const data = JSON.parse(notesJSON);
    const filteredNotes = data.filter(note => note.title !== title);
    const newNote = JSON.stringify(filteredNotes);
    fs.writeFileSync('notes.json', newNote);
};

const readNote = title => {
    let notes = fs.readFileSync('notes.json');
    let newNotes = JSON.parse(notes);
    let singleNote = newNotes.find(note => note.title === title);
    return singleNote;
};

const listNotes = () => {
    let notes = fs.readFileSync('notes.json');
    let newNotes = JSON.parse(notes);
    return newNotes;
};

module.exports = {
    listNotes,
    addNote,
    deleteNote,
    readNote
};