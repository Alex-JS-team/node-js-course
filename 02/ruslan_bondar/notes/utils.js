const fs = require('fs');

const addNote = (title, body, id) => {
    const note = { title, body, id };
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

const deleteNote = id => {
    const notesJSON = fs.readFileSync('notes.json');
    const data = JSON.parse(notesJSON);
    const filteredNotes = data.filter(note => note.id !== id);
    const newNote = JSON.stringify(filteredNotes);
    fs.writeFileSync('notes.json', newNote);
};

const readNote = id => {
    const notes = fs.readFileSync('notes.json');
    const newNotes = JSON.parse(notes);
    const singleNote = newNotes.find(note => note.id === id);
    return singleNote;
};

const listNotes = () => {
    const notes = fs.readFileSync('notes.json');
    const newNotes = JSON.parse(notes);
    return newNotes;
};

const importNotes = file => {
    const notes = fs.readFileSync(file).toString().split('\n');

    fs.writeFileSync('notes.json', notes);
};

module.exports = {
    listNotes,
    addNote,
    deleteNote,
    readNote,
    importNotes
};