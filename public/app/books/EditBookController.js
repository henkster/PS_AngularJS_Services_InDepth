(function() {

  angular.module('app')
    .controller('EditBookController', ['$routeParams', 'dataService', EditBookController]);

  function EditBookController($routeParams, dataService) {

    var vm = this;

    dataService.getAllBooks()
      .then(function(books) {
        vm.currentBook = books.filter(function(item) { // filter function is Arrays
          return item.book_id == $routeParams.bookID;
        })[0];
      });

    // vm.currentBook = books.filter(function(item) { // filter function is Arrays
    //   return item.book_id == $routeParams.bookID;
    // })[0];

  }

}());