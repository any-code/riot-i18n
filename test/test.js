var testable = require('../riot-i18n'),
    riot = require('riot');

exports.setUp = function(callback) {
    testable.dictionary({
        "zh": {
            "Hello": "您好",
            "I love you": "我爱你"
        },
        "jp": {
            "Hello": "こんにちは",
            "I love you": "わたしは、あなたを愛しています"
        }
    })
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

