(function() {

  angular.module('app')
    .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location', 'BooksResource', EditBookController]);

  function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location, BooksResource) { // books is being injected from the route provider, which resolved books before transitioning here. So,
                                                                  // no empty form and then data shows up. May or may not want this functionality.
    var vm = this;

    dataService.getBookByID($routeParams.bookID)
      .then(getBookSuccess)
      .catch(getBookError);

    // vm.currentBook = BooksResource.get({ book_id: $routeParams.bookID });
    // $log.info(vm.currentBook);

    function getBookSuccess(book) {
      vm.currentBook = book;
      $cookieStore.put('lastEdited', vm.currentBook);
    }

    function getBookError(reason) {
      // $log.error(reason);
    }

    vm.saveBook = function() {
      dataService.updateBook(vm.currentBook)
        .then(updateBookSuccess)
        .catch(updateBookError);

      // vm.currentBook.$update(); // currentBook is an instance of the $resource
      // $location.path('/');
    }

    function updateBookSuccess(message) {
      // $log.info(message);
      $location.path('/');
    }

    function updateBookError(errorMessage) {
      // $log.error(errorMessage);
    }

    vm.setAsFavorite = function() {
      $cookies.favoriteBook = vm.currentBook.title;
    }
  }

}());