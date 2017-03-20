(function() {

  // can use value function instead if don't need parameters for your service (as in below).

  angular.module('app')
    .factory('dataService', ['$q', '$timeout', '$http', '$constants', dataService]); // remember, uses provider

  function dataService($q, $timeout, $http, $constants) {
    return { // this is like the API of our service
      getAllBooks: getAllBooks,
      getAllReaders: getAllReaders
    }

    function getAllBooks() {

      return $http({
        method: 'GET',
        url: 'api/books',
        headers: {
          'PS-BookLogger-Version': constansts.APP_VERSION
        }
      });

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