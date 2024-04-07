var fs = require("fs"); 
// example.txt is an empty file 
fs.writeFile( 
  './data/dates.json', 
  "This is sentences written in a file", 
  function (err) { 
    if (err) { 
      return console.error(err); 
    } 
    
    // Reading the file 
    fs.readFile("example.txt", function (err, data) { 
      if (err) { 
        return console.error(err); 
      } 
      console.log("Data read : " + data.toString()); 
        
    }); 
  } 
); 