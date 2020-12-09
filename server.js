// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// const app = express();
const fs = require('fs');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3001;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//call routefile
const htRoute = require('./routes/htmlroute');
const { json } = require("express");
app.use(express.static("public"));
app.use('/', htRoute);

app.get('/api/notes', (req,res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`err at the database ${err}`);
        }
        res.json(JSON.parse(data))
    })
});
//create new Note
app.post('/api/notes', (req, res) => {
let currentNotes = fs.readFileSync("db/db.json",'utf8')
currentNotes = JSON.parse(currentNotes)
 req.body.id = currentNotes.length;
 currentNotes.push(req.body)
 fs.writeFileSync("db/db.json", JSON.stringify(currentNotes))
 res.json(JSON.parse(currentNotes))
});

//delete Note
app.delete('/api/notes/:id', (req,res) => {
  fs.readFile("db/db.json",'utf8', (err,data) => {
      if(err) {
           throw err;
      }
      let objNew=JSON.parse(data);
      for(let i = 0; i < objNew.length; i++){
          if(req.params.id == objNew[i].id) {
              objNew.splice(i,1);
          }
          else{
              console.log("Id does not match")
          }
      }
      const output = fs.writeFile('db/db.json',JSON.stringify(objNew),(err) => {
          if(err){
              throw err;
          }
          console.log("Note rewritten");
      })
      res.send(output);
  })
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});



// create an empty array to delet the data which has no id from the database 





app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });