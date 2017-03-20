(function() {

  angular.module('app')
    .controller('EditBookController', ['$routeParams', 'books', EditBookController]);

  function EditBookController($routeParams, books, dataService) { // books is being injected from the route provider, which resolved books before transitioning here. So,
                                                                  // no empty form and then data shows up. May or may not want this functionality.
    var vm = this;

    vm.currentBook = books.filter(function(item) { // filter function is Arrays
      return item.book_id == $routeParams.bookID;
    })[0];

  }

}());