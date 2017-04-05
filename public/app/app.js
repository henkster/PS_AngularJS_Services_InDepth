(function() {

  var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);

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
  app.config(['booksProvider', '$routeProvider', '$logProvider', '$httpProvider', function(booksProvider, $routeProvider, $logProvider, $httpProvider) { // Angular automatically appends provider to service.
      
    booksProvider.setIncludeVersionInTitle(false);
    // $logProvider.debugEnabled = true;

    // $httpProvider.interceptors.push('bookLoggerInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: '/app/templates/books.html',
        controller: 'BooksController',
        controllerAs: 'books'
      })
      .when('/AddBook', {
        templateUrl: '/app/templates/addBook.html',
        controller: 'AddBookController',
        controllerAs: 'bookAdder'
      })
      .when('/EditBook/:bookID', {
        templateUrl: '/app/templates/editBook.html',
        controller: 'EditBookController',
        controllerAs: 'bookEditor'
      })
      .otherwise('/');
  }]);

  app.run(['$rootScope', function($rootScope) {

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      // console.log('Successfully changed routes.');
    });

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
      // console.log('Error changing routes.')

      // console.log(event);
      // console.log(current);
      // console.log(previous);
      // console.log(rejection);
    });
  }]);
}());

// use factory if you don't need to configure the underlying provider.
// service is a wrapper around factory, gets called with "new" -- use if your function needs a constructor, ie if inheritance hierarchy