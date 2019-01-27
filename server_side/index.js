const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const PDFParser = require("pdf2json");

const pdf_table_extractor = require("pdf-table-extractor");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
const port = 3000;


app.get("/", function(req, res) {

    // let pdfParser = new PDFParser(this,1);

    // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    // pdfParser.on("pdfParser_dataReady", pdfData => {
    //     // fs.writeFile(path.join(__dirname,"sample.txt"), pdfParser.getRawTextContent(), err => {
    //     //   if(err) throw err;
    //     //   console.log('Data has been recorded...');
    //     // });
    //     res.json(pdfData.formImage.Pages[1]);
    // });

    // pdfParser.loadPDF(path.join(__dirname,"expedia_invoice.pdf"));
    function success(result)
    {
      let resultJSON = {"guestList": []};
      let headerLength = result.pageTables[1].tables[0].length;
      
      for(let i = 1; i <  16; i++){
        let guest = {};
        for(let j = 0; j < headerLength; j++){
          let key = result.pageTables[1].tables[0][j].split(" ").join("");
          let value = result.pageTables[1].tables[i][j];
          if(value != ''){
            guest[key] = value;
          }
          
        }

        resultJSON.guestList.push(guest);
        console.log(JSON.stringify(guest));
      }

      
      res.json(resultJSON);
      
    }
     
    //Error
    function error(err)
    {
       console.error('Error: ' + err);
    }
     
    pdf_table_extractor(path.join(__dirname,"expedia_invoice.pdf"),success,error);


});

app.listen(port, () => {
  console.log('server running on port', port);
  console.log('  Press CTRL-C to stop\n');
});