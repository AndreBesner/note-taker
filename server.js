const express = require("express");
const path = require("path");
const fs = require("fs");

//uuid to be added for delete
const unique = require('./helpers/unique');


const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML routes
//this is what loads when user goes to main page of site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "assets", "index.html"));
});

//this loads when user clicks "get started"
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "assets", "notes.html"));
});

//get notes API
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

//post
app.post("/api/notes", (req, res) => {

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: unique(),
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

//delete (extra cred)

//listen
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
