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
