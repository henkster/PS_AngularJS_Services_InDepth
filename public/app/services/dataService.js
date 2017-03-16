(function() {

  // can use value function instead if don't need parameters for your service (as in below).

  angular.module('app')
    .factory('dataService', ['$q', '$timeout', dataService]); // remember, uses provider

  function dataService($q, $timeout) {
    return { // this is like the API of our service
      getAllBooks: getAllBooks,
      getAllReaders: getAllReaders
    }

    function getAllBooks() {

      var booksArray = [
        {
          book_id: 1,
          title: 'Harry Potter and the Deathly Hallows',
          author: 'J.K. Rowling',
          year_published: 2000
        },
        {
          book_id: 2,
          title: 'The Cat in the Hat',
          author: 'Dr. Seuss',
          year_published: 1957
        },
        {
          book_id: 3,
          title: 'Encyclopedia Brown, Boy Detective',
          author: 'Donald J. Sobol',
          year_published: 1963
        }
      ];

      var deferred = $q.defer();

      $timeout(function() { // manufacturing the async part
        
        var successful = true;
        if (successful) {
          deferred.notify('Just getting started gathering books...'); // deferred can send notifications to client as needed.
          deferred.notify('Almost done gathering books...');
          deferred.resolve(booksArray); // when work has been completed

        } else {
          deferred.reject('Error retrieving books');
        }

      }, 1000);

      return deferred.promise;
    }

    function getAllReaders() {

      return [
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
    }
  }

  dataService.$inject = ['logger']; // annotations - injecting

})();