(function() {

  // can use value function instead if don't need parameters for your service (as in below).

  angular.module('app')
    .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]); // remember, uses provider

  function dataService($q, $timeout, $http, constants) {
    return { // this is like the API of our service
      getAllBooks: getAllBooks,
      getAllReaders: getAllReaders,
      getBookByID: getBookByID,
      updateBook: updateBook,
      addBook: addBook,
      deleteBook: deleteBook
    }

    function getAllBooks() {

      return $http({
        method: 'GET',
        url: 'api/books',
        headers: {
          'PS-BookLogger-Version': constants.APP_VERSION
        },
        transformResponse: transformGetBooks
      })
      .then(sendResponseData)
      .catch(sendGetBooksError);

    }

    function transformGetBooks(data, headersGetter) {
      var transformed = angular.fromJson(data);

      transformed.forEach(function (currentVersion, index, array) {
        currentVersion.dateDownloaded = new Date();
      });

      console.log(transformed);
      return transformed;
    }

    function sendResponseData(response) {
      return response.data;
    }

    function sendGetBooksError(response) {
      return $q.reject('Error retrieving book(s). (HTTP Status: ' + response.status + ')');
    }

    function getBookByID(bookID) {
      return $http.get('api/books/' + bookID)
        .then(sendResponseData)
        .catch(sendGetBooksError);
    }

    function updateBook(book) {
      return $http.put('api/books/' + book.book_id, book)
        .then(updateBookSuccess)
        .catch(updateBookError);
    }

    function updateBookSuccess(response) {
      return 'Book updated: ' + response.config.data.title;
    }

    function updateBookError(response) {
      return $q.reject('Error updating book. (HTTP status: ' + response.status + ')');
    }

    function addBook(newBook) {
      return $http.post('api/books', newBook, {
        transformRequest: transformPostRequest
      })
        .then(addBookSuccess)
        .catch(addBookError);
    }

    function transformPostRequest(data, headersGetter) {
      data.newBook = true;

      console.log(data);

      return JSON.stringify(data);
    }

    function addBookSuccess(response) {
      return 'Book added: ' + response.config.data.title;
    }

    function addBookError(response) {
      return $q.reject('Error adding book. (HTTP status: ' + response.status + ')');
    }

    function deleteBook(bookID) {
      return $http.delete('api/books/' + bookID)
        .then(deleteBookSuccess)
        .catch(deleteBookError);
    }

    function deleteBookSuccess(response) {
      return 'Book deleted.';
    }

    function deleteBookError(response) {
      return $q.reject('Error deleting book. (HTTP status: ' + response.status + ')');
    }

    function getAllReaders() {

      var readersArray = [
        {
          reader_id: 1,
          name: 'Marie',
          weeklyReadingGoal: 315,
          totalMinutesRead: 5600
        },
        {
          reader_id: 2,
          name: 'Daniel',
          weeklyReadingGoal: 210,
          totalMinutesRead: 3000
        },
        {
          reader_id: 3,
          name: 'Lanier',
          weeklyReadingGoal: 140,
          totalMinutesRead: 600
        }
      ];

      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve(readersArray);
      }, 1500);

      return deferred.promise;
    }
  }

  dataService.$inject = ['logger']; // annotations - injecting

})();