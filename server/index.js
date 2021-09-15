var express = require("express");
var app = express();
var serveStatic = require('serve-static');
var path ="../dist";
app.use(serveStatic(path));

app.get('/', function (req,res) {
  res.sendFile(path+"/index.html");
});



app.listen(8081, () => {
 console.log("Server running on port 8081");
});
