var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var path = require('path');
require("fs").createReadStream(path.join(__dirname, '../../seed/real_sRGB.csv')).pipe(converter);

var colorMap = {};
var colorAbbr = ['R', 'YR', 'Y', 'GY', 'G', 'BG', 'B', 'PB', 'P', 'RP'];
var levelsArr = ['2.5', '5', '7.5', '10'];

var colorTable = [];
var counter = 0;

colorAbbr.forEach(function(abbr) {
  levelsArr.forEach(function(level) {
    colorMap[level + abbr] = counter;
    colorTable[counter] = [level + abbr];
    for (var j = 1; j <= 9; j++) {
      colorTable[counter][j] = [];
    }
    counter++;
  });
});



// for (var i = 1; i <= 40; i++) {
//   colorTable[i] = [];
//   for (var j = 0; j < 9; j++) {
//     colorTable[i][j] = [];
//   }
// }

function addToArray(color) {
  if (colorMap[color.h] === undefined) return;
  var colIndex = colorMap[color.h];
  var colValue = color.V;
  var colChroma = (color.C/2) - 1;
  var newColorVals = {
    colIdx: colIndex,
    colValue: colValue,
    colChroma: colChroma,
    r: color.dR,
    g: color.dG,
    b: color.dB
  };
  colorTable[colIndex][colValue][colChroma] = newColorVals;
}
//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function(jsonArray) {
    jsonArray.forEach(function(color) {
      addToArray(color);
    });
    //console.log(JSON.stringify(colorTable));
});

module.exports = {
  colorTable: colorTable
};
