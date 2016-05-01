// var http = require("http");
// var fs = require('fs');

var path = require('path');
var express = require('express');

var app = express();

app.get("/data/:param", function(req, res, next){
  console.log(req);
});

app.use(express.static('public'));

app.listen(8000, function() {
  console.log('listening');
});
