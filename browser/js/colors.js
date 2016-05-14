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
    },

    moreContrast: function(curr) {
      var targetChroma = curr.colChroma + 1;
      return _colorTable[curr.colIdx][curr.colValue][targetChroma] || curr;

    },

    lessContrast: function(curr) {
      var targetChroma = curr.colChroma - 1;
      return _colorTable[curr.colIdx][curr.colValue][targetChroma] || curr;
    },

    lighter: function(curr) {
      var targetValue = curr.colValue + 1;
      return _colorTable[curr.colIdx][targetValue][curr.colChroma] || curr;
    },

    darker: function(curr) {
      var targetValue = curr.colValue - 1;
      return _colorTable[curr.colIdx][targetValue][curr.colChroma] || curr;
    },

    getCurrentPalette: function(currIdx) {
      return _colorTable[currIdx];
    }

  };
});

app.controller('ColorTableCtrl', function($scope, ColorTableFactory, colorTable) {

    _colorTable = colorTable;
    function _setColor(newColor) {
      $scope.currentColor = {
        hue: _colorTable[newColor.colIdx][0],
        values: newColor
      };
      $scope.currentPalette = _colorTable[newColor.colIdx];
    }

    _setColor( _colorTable[0][5][3] );

  $scope.moreHue = function(targetHue) {
    var newColor = ColorTableFactory.moreHue($scope.currentColor.values, targetHue);
    _setColor(newColor);
    console.log('currentPalette', $scope.currentPalette);
  };

  $scope.moreContrast = function() {
    var newColor = ColorTableFactory.moreContrast($scope.currentColor.values);
    _setColor(newColor);
  };

  $scope.lessContrast = function() {
    var newColor = ColorTableFactory.lessContrast($scope.currentColor.values);
    _setColor(newColor);
  };

  $scope.lighter = function() {
    var newColor = ColorTableFactory.lighter($scope.currentColor.values);
    _setColor(newColor);
  };

  $scope.darker = function() {
    var newColor = ColorTableFactory.darker($scope.currentColor.values);
    _setColor(newColor);
  };

  $scope.save = function() {
    $scope.savedColors.push($scope.currentColor);
  };

  $scope.savedColors = [];


});
