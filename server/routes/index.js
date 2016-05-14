var router = require('express').Router();
var path = require('path');
var colorTable = require(path.join( __dirname, '../db/color.table')).colorTable;

router.get('/', function (req, res, next) {
  res.sendFile('index.html');
});

router.get('/colors', function (req, res, next) {
  res.json(colorTable);
  next();
});

module.exports = router;
