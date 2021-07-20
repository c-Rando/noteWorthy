const fs = require("fs");
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const uuid = require('uuid');

// Our database is a json file
// Therefore we want to read, write and delete from it


// 1. Read the db.json file.
// 2. Parse the content of db.json to an array variable.
// 3. Return that array of notes as a response.
const getNotes = async () => {
    const data = await readFileAsync('./db/db.json', { encoding: 'utf-8' });
    const listOfNotes = JSON.parse(data);
    return listOfNotes;
};

// 1. Read the db.json file.
// 2. Parse the content of db.json to an array variable.
// 3. Get the note with the noteId from the list and return that.
const getNote = async (noteId) => {
    const data = await readFileAsync('./db/db.json', { encoding: 'utf-8' });
    const listOfNotes = JSON.parse(data);
    for (let i = 0; i < listOfNotes.length; i++) {
        const el = listOfNotes[i];
        if (el.id === noteId) {
            return el;
        }
    }
    return null;
};

const deleteNote = async (noteId) => {
    const data = await readFileAsync('./db/db.json', { encoding: 'utf-8' });
    const listOfNotes = JSON.parse(data);
    const listOfNotesWithoutNote = listOfNotes.filter(e => e.id !== noteId);
    const notesString = JSON.stringify(listOfNotesWithoutNote, null, 4);
    await writeFileAsync('./db/db.json', notesString);
    return true;
};

// 1. Read the db.json file.
// 2. Parse the content of db.json to an array variable.
// 3. Assign unique id to the new note.
// 4. Add the new note to the end of the array of notes.
// 5. Convert array of notes back to a string
// 6. Save string to the db.json file.
// 7. Return true if operation completed successfully
const createNote = async (note) => {
    const data = await readFileAsync('./db/db.json', { encoding: 'utf-8' });
    const listOfNotes = JSON.parse(data);
    note.id = uuid.v4();
    listOfNotes.push(note);
    const notesString = JSON.stringify(listOfNotes, null, 4);
    await writeFileAsync('./db/db.json', notesString);
    return true;
};

module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote
}