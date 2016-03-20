// var http = require("http");
// var fs = require('fs');

var path = require('path');
var express = require('express');

var app = express();


app.use(express.static('public'));

app.listen(8000, function() {
  console.log('listening');
});
