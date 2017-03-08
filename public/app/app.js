(function() {

  var app = angular.module('app', []);

  app.provider('books', function() {
        this.$get = function() { // $get must be define.

          var appName = 'Book Logger';
          var appDesc = 'Track whick books you read.'

          var version = '1.0';

          if (includeVersionInTitle) {
            appName += ' ' + version;
          }

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

  app.config(function(booksProvider) { // Angular automatically appends provider to service.
      
      booksProvider.setIncludeVersionInTitle(false);
    
  });
}());