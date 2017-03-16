(function() {

  angular.module('app')
    .service('logger', BookAppLogger); // will call BookAppLogger with new, guaranteeing the hierarchy is preserved

  function LoggerBase() {
  }

  LoggerBase.prototype.output = function(message) {
    console.log('LoggerBase: ' + message);
  }

  function BookAppLogger() {
    LoggerBase.call(this);

    this.logBook = function(book) {
      console.log('Book: ' + book.title);
    }
  }

  BookAppLogger.prototype = Object.create(LoggerBase.prototype);

})();