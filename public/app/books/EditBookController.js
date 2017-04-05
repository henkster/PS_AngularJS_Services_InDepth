(function() {

  angular.module('app')
    .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location', EditBookController]);

  function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location) { // books is being injected from the route provider, which resolved books before transitioning here. So,
                                                                  // no empty form and then data shows up. May or may not want this functionality.
    var vm = this;

    dataService.getBookByID($routeParams.bookID)
      .then(getBookSuccess)
      .catch(getBookError);

    function getBookSuccess(book) {
      vm.currentBook = book;
      $cookieStore.put('lastEdited', vm.currentBook);
    }

    function getBookError(reason) {
      $log.error(reason);
    }

    vm.saveBook = function() {
      dataService.updateBook(vm.currentBook)
        .then(updateBookSuccess)
        .catch(updateBookError);
    }

    function updateBookSuccess(message) {
      $log.info(message);
      $location.path('/');
    }

    function updateBookError(errorMessage) {
      $log.error(errorMessage);
    }

    vm.setAsFavorite = function() {
      $cookies.favoriteBook = vm.currentBook.title;
    }
  }

}());