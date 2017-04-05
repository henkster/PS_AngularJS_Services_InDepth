(function() {

  angular.module('app')
    .factory('BooksResource', ['$resource', booksResource]);

  function booksResource($resource) {

    return $resource('/api/books/:book_id', {book_id: '@book_id'},
      {
        'update': {method: 'PUT'} // this is a user-defined method, basically an http configuration object
      }
    );

  }

}());