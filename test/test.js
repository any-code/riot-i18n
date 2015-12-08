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
//
//exports.testLocalise = function(test) {
//    testable.on('update', function() {
//        test.equals(testable.localise('boo'), 'boo', "unexpected value returned");
//        test.done();
//    }.bind(testable))
//    testable.setLanguage('en');
//}


exports.testSetLanguage = function(test) {
    testable.on('update', function() {
        test.ok(true, "update language callback was not triggered");
        test.done();
    }.bind(this))
    testable.setLanguage('jp');
}

exports.testChangeLanguage = function(test) {
    testable.on('update', function() {
        test.ok(true, "update language callback was not triggered");
        test.done();
    }.bind(this))
    testable.setLanguage('cz');
}

