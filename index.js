const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require("fs");
const PDFParser = require("pdf2json");

const pdf_table_extractor = require("pdf-table-extractor");

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(express.static(__dirname + "/public"));

//Main page route
app.get('/', (req, res) => {
  res.render('index.ejs');
});

//Upload PDF file route
app.post('/data', (req, res) => {
  
  if (Object.keys(req.files).length == 0) {
    console.log('No files were uploaded.');
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("img/invoice.pdf", function(err) {
    if (err){
      return res.status(500).send(err);
    } 
    console.log('File uploaded!');
  });

  res.redirect('/data');
});

//Upload File Form route
app.get('/data/new', (req, res) => {
  res.render('input');
})

//JSON data display route
app.get("/data", function(req, res) {

    //Logic for pdf-table-extracto module
    function success(result)
    {
      let resultJSON = {"guestList": []};
      let headerLength = result.pageTables[1].tables[0].length;
      let guestArray = result.pageTables[1].tables;
            
      for(let i = 1; i <  guestArray.length - 3; i++){
        let guest = {};
        for(let j = 0; j < headerLength; j++){
          let key = result.pageTables[1].tables[0][j].split(" ").join("");
          let value = result.pageTables[1].tables[i][j];
          if(value != ''){
            guest[key] = value;
          }
        }

        resultJSON.guestList.push(guest);
      }
      
      res.json(resultJSON);
      
    }
     
    //Error
    function error(err)
    {
       console.error('Error: ' + err);
    }
     
    pdf_table_extractor('img/invoice.pdf',success,error);
});


//Change port to process.env.PORT for deployment on heroku
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`App running at http://localhost:3000`);
});