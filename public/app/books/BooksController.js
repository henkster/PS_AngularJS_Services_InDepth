(function() {

  angular.module('app')
    .controller('BooksController', ['books', 'dataService', 'badgeService', BooksController]); // annotations - inline


  function BooksController(books, dataService, badgeService) { // annotations - this is simplest form (just names), but minification would break.

    var vm = this;

    vm.appName = books.appName;

    dataService.getAllBooks()
      .then(getBooksSuccess, null, getBooksNotification) // success, error, notification callback handling
      .catch(errorCallback);
    
    vm.allReaders = dataService.getAllReaders();

    vm.getBadge = badgeService.retrieveBadge;

    function getBooksSuccess(books) {
      throw 'Something happened in success handling!'
      vm.allBooks = books;
    }

    // function getBooksError(reason) {
    //   console.log(reason);
    // }

    function errorCallback(error) {
      console.log('Error message: ' + error);
    }

    function getBooksNotification(notification) {
      console.log("Promise notification: " + notification);
    }
  }
}());