const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const fs = require('fs');
// const noteData = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes
//this is what loads when user goes to main page of site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'assets', 'index.html'));
});

  //this loads when user clicks "get started"
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'assets', 'notes.html'));
});

//get notes API
app.get('/api/notes', (req, res)=> {
  res.sendFile(path.join(__dirname, './db/db.json'));
});


// //post
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated reviews!")
        );
      }
    });
  } else {
    res.status(500).json("Error in posting review");
  }
});

  // const noteString = JSON.stringify(newNote);

//   // Write the string to a file
//   fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
//     err
//       ? console.error(err)
//       // : console.log(`Review forhas been written to JSON file`)
//   );
// });

//delete (extra cred)

//listen this one easy
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})