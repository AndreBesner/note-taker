const express = require('express');

// const fs = require

const app = express();

const PORT = 3001;

const path = require('path');


// you need to fill all api routes
// HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', '..','..','..', 'index.html'));
  });
//get 

//post

//delete

//listen this one easy
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})