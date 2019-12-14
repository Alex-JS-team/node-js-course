const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const notePath = path.join(__dirname, 'notes.json')

const getNotes = (callback) => {
    fs.readFile(notePath, 'utf-8', (err, content) => {
        if (err) {
            throw new Error(err)
        }
        try {
            callback(JSON.parse(content))
        } catch (err) {
            console.log(chalk.red.inverse('Something went wrong... Check your notes.json'))
            callback([])
        }
    })
}

const saveNote = (content) => {
    fs.writeFile(notePath, JSON.stringify(content), (err) => {
        if (err) {
            console.log(chalk.red.inverse('Something went wrong with writing note to file'))
        } else {
            console.log(chalk.green.inverse('Changes was succsessfully saved'))
        }
    })
}

const addNote = (title, text) => {
    getNotes((notes) => {
        // console.log(notes)
        const dublicateNote = notes.find(note => note.title === title)
        if (dublicateNote) {
            console.log(chalk.red.inverse('Note with this name is exist'))
        } else {
            notes.push({ title, text })
            console.log(chalk.green.inverse('Note is successfully added to list'))
            saveNote(notes)
        }
    })
}

const readNote = (title) => {
    getNotes(notes => {
        const note = notes.find(n => n.title === title)
        if (note) {
            console.log(chalk.blue(note.title))
            console.log(chalk.yellow(note.text))
        } else {
            console.log(chalk.red.inverse(`Note with title "${title}" does not exist`))
        }
    })
}

const deleteNote = (title) => {
    getNotes(notes => {
        const updateNotes = notes.filter(item => item.title !== title)

        if (updateNotes.length !== notes.length) {
            console.log(chalk.green.inverse(`Note with title "${title}" succsessfully removed`))
            saveNote(updateNotes)
        } else {
            console.log(chalk.red.inverse(`Note with title "${title}" does not exist`))
        }
    })
}

const listNote = () => {
    getNotes((notes) => {
        if (notes.length) {
            console.log(chalk.green('------------------------------'))
            console.log(chalk.yellow.inverse('Your Notes'))
            notes.forEach(note => {
                console.log(chalk.blue('------------------------------'))
                console.log(` ~ ${chalk.blue(note.title)} ~ ${'\n'}`)
                console.log(chalk.yellow(note.text) + '\n')
            })
            console.log(chalk.green('------------------------------'))

        } else {
            console.log(chalk.blue.inverse('Not list is empty, add your first note'))
        }
    })
}

module.exports = {
    addNote,
    deleteNote,
    listNote,
    readNote
}