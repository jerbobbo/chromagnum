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

app.config(function($stateProvider) {
  $stateProvider.state('3dview', {
    url: '/3d-view',
    templateUrl: '/js/3d-view.html',
    controller: '3dViewCtrl',
    resolve: {
      colorTable: function(ColorTableFactory) {
        return ColorTableFactory.getColorTable();
      }
    }
  });
});
