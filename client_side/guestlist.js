//Getting pdf file and extracting data for later use
//PDF file is located in the same folder. If not - change the route
pdfjsLib.getDocument('./expedia.pdf').then(doc => {
  doc.getPage(2).then(page => {
    page.getTextContent().then(text => {

      let contentLength = text.items.length;
      result = {"guestList": []};
      let guestListArray = [];
      let guest = [];
      let guestJSON = {};

      for(let i = 20; i < contentLength-2; i++){
        if(text.items[i].transform[4] < text.items[i+1].transform[4]){
          guestInfo = text.items[i].str;
          guest.push(guestInfo);
        } else {
          guest.push(text.items[i].str);

        if(guest.length > 8){
            guest.splice(4, 1);
        }
          guestListArray.push(guest);
          guest = [];
        }
      }
      let headerArray = ["reservationID", "checkInDate", "nights", "guestName", "currency", "amountBeforeTax", "tax", "totalAmountDue"];
      
      guestListArray.forEach(e => {
        for(let x = 0; x < 8; x++){
          let key = headerArray[x];
          let value = e[x];
          guestJSON[ key ] = value;
        }
        result.guestList.push(guestJSON);
        guestJSON = {};
      });

      //Variable 'result' contains an object with guest data
      //Outputting JSON data to the console
      console.log(JSON.stringify(result));
    });

    //Rendering pdf file to index.html file logic
    let myCanvas = document.getElementById("my_canvas");
    let context = myCanvas.getContext("2d");
            
     let viewport = page.getViewport(2);
     myCanvas.width = viewport.width;
     myCanvas.height = viewport.height;
     page.render({
       canvasContext: context,
       viewport: viewport
     });
   });
 });