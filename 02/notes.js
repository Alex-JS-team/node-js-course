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
    fs.writeFileSync("notes.json", newData);
    console.log('New note add.'.green);
}

const removeNote = (title) => {
    const dataJSON = fs.readFileSync("notes.json");
    const data = JSON.parse(dataJSON);
    const findNotes = data.filter((data) => title != data.title);
    const newData = JSON.stringify(findNotes);
    fs.writeFileSync("notes.json", newData);
    console.log('Done.'.green);
}

const readNoteByTitle = (title) => {
    const dataJSON = fs.readFileSync('notes.json');
    const data = JSON.parse(dataJSON);

    return data.find((data) => title == data.title);
}

const importNoteFile = (fileName) => {
    const readStream = fs.createReadStream(fileName, 'utf8');
    readStream.on('data', function (chunk) {
        let newData = chunk.split("\r\n");
        for(let i = 0; i < newData.length; i++){
            let splitData = newData[i].split("-");
            addNote(splitData[0].trim(), splitData[1].trim());
        }
    }).on('end', function () {
        console.log("Merge file done.".rainbow);
    });
}

module.exports = {
    importNoteFile: importNoteFile,
    getNotesList: getNotesList,
    addNote: addNote,
    removeNote: removeNote,
    readNoteByTitle: readNoteByTitle,
};
