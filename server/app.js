var express = require('express');
var app = new express();
var path = require('path');

app.use('/', require(path.join(__dirname, './routes')));

var port = 8080 || process.env.PORT;
app.listen(8080, function() {
  console.log('listening on port ' + port);
});

module.exports = app;