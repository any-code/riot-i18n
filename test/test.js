var testable = require('../index'),
    riot = require('riot');

exports.setUp = function(callback) {
  callback();
}

exports.tearDown = function(callback) {
  callback();
}

exports.testGetLanguage = function(test) {
  test.equals(testable.getLanguage(), 'en', "unexpected value returned");
  test.done();
}

exports.testSetLocalise = function(test) {
    testable.on('update', function() {
        test.equals(testable.localise('Hello'), 'こんにちは', "unexpected value returned")
        test.done();
    }.bind(this))
    testable.setLanguage('jp');
}

