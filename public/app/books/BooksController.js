(function() {

  angular.module('app')
    .controller('BooksController', ['books', 'dataService', 'badgeService', '$q', '$route', '$log', BooksController]); // annotations - inline


  function BooksController(books, dataService, badgeService, $q, $route, $log) { // annotations - this is simplest form (just names), but minification would break.

    var vm = this;

    vm.appName = books.appName;

    dataService.getAllBooks()
      .then(getBooksSuccess, null, getBooksNotification) // success, error, notification callback handling
      .catch(errorCallback)
      .finally(getAllBooksComplete);

    dataService.getAllReaders()
      .then(getReadersSuccess)
      .catch(errorCallback)
      .finally(getAllReadersComplete);
    
    vm.getBadge = badgeService.retrieveBadge;

    function getBooksSuccess(books) {
      vm.allBooks = books;
    }

    function getAllBooksComplete() {
      console.log('getAllBooks has completed.');
    }

    function getReadersSuccess(readers) {
      vm.allReaders = readers;
    }

    function getAllReadersComplete() {
      console.log("getAllReaders has completed.");
    }

    vm.deleteBook = function(bookID) {
      dataService.deleteBook(bookID)
        .then(deleteBookSuccess)
        .catch(deleteBookError);
    }

    function deleteBookSuccess(message) {
      $log.info(message);
      $route.reload();
    }

    function deleteBookError(errorMessage) {
      $log.error(errorMessage);
    }

    function errorCallback(errorMessage) {
      console.log('Error message: ' + errorMessage);
    }

    function getBooksNotification(notification) {
      console.log("Promise notification: " + notification);
    }
  }
}());