const express = require('express')
const path = require('path')
const app = express()

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for data..
app.get('/movies', async function (req, res) {
    const movies = await loadJSONs()
    res.json(movies)
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

async function loadJSONs() {
  const fs = require("fs");

  const folder = path.join(__dirname, "files/json");;

  const array = fs.readdirSync(folder)
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const content = fs.readFileSync(path.join(folder, file));
      return JSON.parse(content);
    });

  return array; // Array mit allen JSON-Inhalten
}

