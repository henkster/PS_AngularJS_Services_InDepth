(function() {

  angular.module('app')
    .controller('BooksController', ['books', 'dataService', 'badgeService', '$q', BooksController]); // annotations - inline


  function BooksController(books, dataService, badgeService, $q) { // annotations - this is simplest form (just names), but minification would break.

    var vm = this;

    vm.appName = books.appName;

    var booksPromise = dataService.getAllBooks();
    var readersPromise = dataService.getAllReaders();

    $q.all([booksPromise, readersPromise])
      .then(getAllDataSuccess)
      .catch(getAllDataError);

    function getAllDataSuccess(dataArray) { // array and index position of promises isn't great.
      vm.allBooks = dataArray[0];
      vm.allReaders = dataArray[1];
    }

    function getAllDataError(reason) {
      console.log(reason);
    }

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
      //console.log('getAllBooks has completed.');
    }

    // // function getBooksError(reason) {
    // //   console.log(reason);
    // // }

    function getReadersSuccess(readers) {
      vm.allReaders = readers;
    }

    function getAllReadersComplete() {
      console.log("getAllReaders has completed.");
    }

    function errorCallback(error) {
      console.log('Error message: ' + error);
    }

    function getBooksNotification(notification) {
      console.log("Promise notification: " + notification);
    }//
  }
}());