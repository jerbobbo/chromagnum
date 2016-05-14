app.config(function($stateProvider) {
  $stateProvider.state('colors', {
    url: '/colors',
    templateUrl: '/js/colors.html',
    controller: 'ColorTableCtrl',
    resolve: {
      colorTable: function(ColorTableFactory) {
        return ColorTableFactory.getColorTable();
      }
    }
  });
});

app.factory('ColorTableFactory', function($http) {

  function _findHueIndex(color) {
    var hueMap = {
      red: 1,
      violet: 37,
      blue: 25,
      green: 17,
      yellow: 9,
      orange: 5
    };
    return hueMap[color];
  }

  return {
    getColorTable: function() {
      return $http.get('/colors')
      .then(function(colorTable) {
        _colorTable = colorTable.data;
        return colorTable.data;
      });
    },
    moreHue: function(curr, targetHue) {
      var targetIdx = _findHueIndex(targetHue);
      console.log(curr.colIdx, targetIdx);
      if (targetIdx === curr.colIdx) return curr;
      var newColIdx;

      if (targetIdx > curr.colIdx) {
        if ((targetIdx - curr.colIdx) >= _colorTable.length/2) {
          if (curr.colIdx !== 0) newColIdx = curr.colIdx - 1;
          else newColIdx = _colorTable.length - 1;
        }
        else newColIdx = curr.colIdx + 1;
      }
      else {
        if ((curr.colIdx - targetIdx) >= _colorTable.length/2) {
          if (curr.colIdx !== _colorTable.length - 1) newColIdx = curr.colIdx + 1;
          else newColIdx = 0;
        }
        else newColIdx = curr.colIdx - 1;
      }
      console.log('_colorTable: ', _colorTable);
      console.log(newColIdx,curr.colValue, curr.colChroma );
      var targetChroma = curr.colChroma;

      if (targetChroma > _colorTable[newColIdx][curr.colValue].length - 1)
        targetChroma = _colorTable[newColIdx][curr.colValue].length - 1;

      return _colorTable[newColIdx][curr.colValue][targetChroma];
    }
  };
});

app.controller('ColorTableCtrl', function($scope, ColorTableFactory, colorTable) {

    $scope.colorTable = colorTable;

  $scope.currentColor = {
    hue: $scope.colorTable[0][0],
    values: $scope.colorTable[0][5][5]
  };

  $scope.moreHue = function(targetHue) {
    var newColor = ColorTableFactory.moreHue($scope.currentColor.values, targetHue);
    $scope.currentColor = {
      hue: $scope.colorTable[newColor.colIdx][0],
      values: newColor
    };
  };

  $scope.savedColors = [];



});