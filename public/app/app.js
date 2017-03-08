(function() {

  var app = angular.module('app', []);

  app.provider('books', function(constants) {
        this.$get = function() { // $get must be define.

          var appName = constants.APP_TITLE; // with constants, you don't have to define values everywhere
          var version = constants.APP_VERSION;

          if (includeVersionInTitle) {
            appName += ' ' + version;
          }

          var appDesc = constants.APP_DESCRIPTION

          return {
            appName: appName, // these are just random props, ie appName and appDesc aren't required.
            appDesc: appDesc
          };
        };

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function(value) {
          includeVersionInTitle = value;
        };
    });

  app.config(function(booksProvider, constants) { // Angular automatically appends provider to service.
      
      booksProvider.setIncludeVersionInTitle(false);
    
      console.log('title from constants service: ' + constants.APP_TITLE);
  });
}());

// use factory if you don't need to configure the underlying provider.
// service is a wrapper around factory, gets called with "new" -- use if your function needs a constructor, ie if inheritance hierarchy