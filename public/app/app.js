(function() {

  var app = angular.module('app', []);

  app.provider('books', ['constants', function( constants) { // annotations - for anonymous function, look where the closing square brackets goes (after functon def).
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
  }]);

  // only providers and constants may be injected in module config...so can't inject dataService but can dataServiceProvider.
  app.config(['booksProvider', 'constants', 'dataServiceProvider', function(booksProvider) { // Angular automatically appends provider to service.
      
    booksProvider.setIncludeVersionInTitle(false);
  }]);
}());

// use factory if you don't need to configure the underlying provider.
// service is a wrapper around factory, gets called with "new" -- use if your function needs a constructor, ie if inheritance hierarchy