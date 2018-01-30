
const fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('note-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('note-data.json',JSON.stringify(notes));
};

var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes()
};

var getNote = (title) => {
    console.log('Getting note',title);
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
}

var removeNote = (title) => {
    console.log('Removing note', title);
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}


var logNote = (note) => {
    console.log('----');
    debugger;
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
    console.log('----');
}

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    logNote
}