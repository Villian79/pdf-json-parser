# pdf-json-parser

JS parser which allows transforming tables from PDF files to JSON format

This project consists of two separate parts that work independently
___

### Client Side

Allows to parse pdf files without server connection. 

Consists of two main files in the `client_side` folder: 

`index.html` - outputs pdf file to the screen
`guestlist.js` - includes rendering logic and outputs JSON data from the table to the browser console.

**IMPORTANT:** 

1) if you work off-line you should use FIREFOX browser. There is a problem with CHROME concerning cross-origin error

2) Because of the nature of pdf files guestlist.js code is adjusted to a particular pdf file. You have to review the logic if you use another table prototype.

___

### Server Side

Project files are located in `server_side` folder. 

How to run locally on your PC

1. Make sure you have Git, Node and NPM installed on your machine
2. Open you command terminal and run: git clone https://github.com/Villian79/pdf-json-parser.git
3. cd into `pdf-json-parser` folder
4. Run: `npm install`   
   ---> this way you install all npm modules for this project

5. cd into `server_side` folder and run: `node index.js`  
---> this way you start the app

6. Open your browser and go to: localhost:3000/
7. Once you enter localhost:3000/ you'll get JSON formatted data from the table located in expedia_invoice.pdf


