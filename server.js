const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const fs = require('fs');
// const noteData = require ('../../db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// you need to fill all api routes

// HTML routes
//this is what loads when user goes to main page of site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'assets', 'index.html'));
  });

  //this loads when user clicks "get started"
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });


//get notes API
// tbd 

// // Retrieve notes from the database
// app.get('/api/notes', (req, res) => {
//   // Logic to retrieve notes from the database
//   // For example:
//   const notes = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8');
//   res.json(JSON.parse(notes));
// });




//post
//post note api
// tbd

//delete (extra cred)

//listen this one easy
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})