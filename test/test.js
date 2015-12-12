var testable = require('../riot-i18n');

exports.setUp = function(callback) {
    testable.off('*');
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

exports.testSetLocaliseAtOdds = function(test) {
    testable.on('update', function() {
        testable.off('update');
        test.equals(testable.localise('Hello'), 'Hello', "unexpected value returned")
        test.done();
    }.bind(this))
    testable.setLanguage('fr');
}

exports.testSetLocaliseMultiples = function(test) {
    var triggered = 0;
    testable.on('update', function() {
        triggered++;
        test.ok(triggered > 0, 'update not triggered');
        if (triggered === 4) {
            test.done();
        }
    }.bind(this))
    testable.setLanguage('en');
    testable.setLanguage('fr');
    testable.setLanguage('jp');
    testable.setLanguage('zh');
}

