const fs = require('fs');
const  _ = require("lodash");
const yargs = require('yargs');

const notes = require('./note.js');
const titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
} ,bodyOption = {
    describe : 'Body of note',
    demand : true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note',{
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{ title: titleOption})
    .command('remove', 'Remove a note',{title: titleOption})
    .help()
    .argv;
var command = argv._[0];


switch (command){
    case 'add':
        var note = notes.addNote(argv.title, argv.body);
        if(note){
            notes.logNote(note);
        } else {
            console.log('title already token');
        }
        break;
    case 'list':
        var allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach((note) => notes.logNote(note));
        break;
    case 'remove':
       var noteRemoved = notes.removeNote(argv.title);
       var message = noteRemoved ? 'Note Removed' : 'Note Not Found!';
       console.log(message);
        break;
    case 'read':
        var note = notes.getNote(argv.title);
        if(note){
            notes.logNote(note);
        }else {
            console.log('Note not found');
        }
        break;
    default:
        console.log('Command not found');
}


