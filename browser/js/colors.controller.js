app.controller('ColorTableCtrl', function($scope, ColorTableFactory, colorTable) {


    _colorTable = colorTable;

    $scope.getCurrentColor = function() {
      return $scope.currentColor;
    };

    $scope.setColor = function (newColor) {
      console.log('newColor: ', newColor);
      $scope.currentColor = {
        hue: _colorTable[newColor.colIdx][0],
        values: newColor
      };
      $scope.currentPalette = _colorTable[newColor.colIdx].slice().reverse();

    };

    $scope.setColor( _colorTable[0][5][3] );

  $scope.moreHue = function(targetHue) {
    var newColor = ColorTableFactory.moreHue($scope.currentColor.values, targetHue);
    $scope.setColor(newColor);
    console.log('currentPalette', $scope.currentPalette);
  };

  $scope.findColor = function(targetHue) {
    var newColor = ColorTableFactory.findColor(targetHue);
    $scope.setColor(newColor);
  };

  $scope.moreContrast = function() {
    var newColor = ColorTableFactory.moreContrast($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.lessContrast = function() {
    var newColor = ColorTableFactory.lessContrast($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.lighter = function() {
    console.log('lighter triggered');
    var newColor = ColorTableFactory.lighter($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.darker = function() {
    var newColor = ColorTableFactory.darker($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.save = function() {
    $scope.savedColors.push($scope.currentColor);
  };

  $scope.savedColors = [];

  // var commands = {
  //   'more :targetHue' : $scope.moreHue,
  //   'less contrast' : $scope.lessContrast,
  //   'more contrast' : $scope.moreContrast,
  //   'lighter' : $scope.lighter,
  //   'darker' : $scope.darker,
  //   'perfect' : function() {
  //     $scope.save();
  //   }
  // };

  var colorNames = ['red', 'blue', 'green', 'violet', 'orange', 'yellow'];

 // //annyang.addCommands(commands);
 //
 //  annyang.addCallback('result', function(userSaid) {
 //    //console.log(userSaid);
 //    var words = [];
 //    userSaid.forEach(function(phrase) {
 //      console.log(phrase);
 //      if (phrase.indexOf('lighter') !== -1) {
 //        $scope.lighter();
 //      }
 //      else if (phrase.indexOf('darker') !== -1) $scope.darker();
 //      else if (phrase.indexOf('perfect') !== -1) $scope.save();
 //      else if (phrase.indexOf('more contrast') !== -1) $scope.moreContrast();
 //      else if (phrase.indexOf('less contrast') !== -1) $scope.lessContrast();
 //      else if (phrase.indexOf('find') !== -1) {
 //        words = phrase.split(' ');
 //          words.forEach(function(word) {
 //            if (colorNames.indexOf(word.toLowerCase()) !== -1) {
 //              $scope.findColor(word.toLowerCase());
 //            }
 //          });
 //      }
 //      else {
 //        words = phrase.split(' ');
 //          words.forEach(function(word) {
 //            if (colorNames.indexOf(word.toLowerCase()) !== -1) {
 //              $scope.moreHue(word.toLowerCase());
 //            }
 //          });
 //        }
 //
 //
 //      $scope.$digest();
 //    });
 //  });
 //
 //      // var words = phrase.split(' ');
 //      // if (words.indexOf('more') !== -1) {
 //      //   words.forEach(function(word) {
 //      //     if (colorNames
 //      //   })
 //      //}
 //  // });
 //
 //  annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
 //    console.log(userSaid); // sample output: 'hello'
 //    console.log(commandText); // sample output: 'hello (there)'
 //    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
 //  });
 //
 //  annyang.start({autoRestart: true});

});
