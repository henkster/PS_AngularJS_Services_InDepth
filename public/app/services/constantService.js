(function() {

  angular.module('app')
    .constant('constants', { // instead of object, can be function or simple string -- just can't change.
      APP_TITLE: 'Book Logger',
      APP_DESCRIPTION: 'Track which books you read.',
      APP_VERSION: '1.0'
    })

})();