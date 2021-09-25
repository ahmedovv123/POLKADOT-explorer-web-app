var express = require("express");
var app = express();
var serveStatic = require('serve-static');
var path ="/home/dist";
app.use(serveStatic(path));

app.get('/', function (req,res) {
  res.sendFile(path+"/index.html");
});



app.listen(4000, () => {
 console.log("Server running on port 4000");
});
