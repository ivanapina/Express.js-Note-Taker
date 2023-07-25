const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;
const noteData = require('./db/db.json')
// const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

//const getAndRenderNotes = require('./public/assets/js/index')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.get('/', (req, res) => res.send('Navigate to the public folder'))

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    //res.readFile(path.join(__dirname, 'db/db.json'))
    //res.json(noteData);
    //console.log(noteData);
    res.json(noteData);
});



app.post('/api/notes', (req, res) => {
    console.log('in the post route');
            console.log('in the else of ReadandAppend');
            var newNote = req.body;
            console.log('this is before the id', newNote);
            newNote.id = uniqid();
            console.log('this is after the id is added', newNote);
            noteData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 4) , (err) => {
            err ? console.log(err) : res.send(newNote)
        })
});

app.delete('api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.unlink(id, './db/db.json')
    res.readFile(id, './db/db.json')
});


app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localHost:${PORT}`);
});