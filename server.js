// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// const app = express();
const fs = require('fs');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//call routefile
const htRoute = require('./routes/htmlroute');
app.use(express.static("public"));
app.use('/', htRoute);

app.get('/api/notes', (req,res) => {
  
});
//create new Note
app.post('/api/notes', (req, res) => {

  let noteNew = req.body;

      fs.readFile('db/db.json', 'utf8', (err, data) => {
          if (err) {
              console.log(`err at the database ${err}`);
          } 
          
          else if (data.length > 2) {
              obj = JSON.parse(data);
              obj.push(noteNew);

              fs.writeFile('db/db.json', JSON.stringify(obj), 'utf8', (err) => {
                  if(err) {
                      throw err;
                  }
                  console.log('Note saved.')
              });
         }
          else {
              obj = [];
              obj.push(noteNew);
              fs.writeFile('db/db.json', JSON.stringify(obj), 'utf8', (err) => {
                  if(err) {
                      throw err;
                  }
                  console.log('Note saved.')
              });
          }
      });
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









app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });