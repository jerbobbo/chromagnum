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
  return {
    getColorTable: function() {
      return $http.get('/colors')
      .then(function(colorTable) {
        //console.log(colorTable.data);
        return colorTable.data;
      });
    }
  };
});

app.controller('ColorTableCtrl', function($scope, ColorTableFactory, colorTable) {

    $scope.colorTable = colorTable;
  

  $scope.currentColor = $scope.colorTable[0][0][0];
  console.log('colorTable: ', $scope.colorTable);
  $scope.savedColors = [];

});
