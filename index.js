/*
            _                   ____          _
           / \   _ __  _   _   / ___|___   __| | ___
          / _ \ | '_ \| | | | | |   / _ \ / _` |/ _ \
         / ___ \| | | | |_| | | |__| (_) | (_| |  __/
        /_/   \_\_| |_|\__, |  \____\___/ \__,_|\___|
                       |___/

        riot-i18n
 */

"use strict";

if (typeof riot === "undefined") {
    try {
        var riot = require('riot');
    } catch (e) {
        throw Error('riotjs dependency not satisfied');
    }
}

(function(exports) {

    var obs = riot.observable()

    exports._language = exports._default = 'en'

    // Load lang.json file using whatever
    // method you want and set _entities with that
    exports._entities = {
        "zh": {
            "Hello": "您好",
            "I love you": "我爱你"
        },
        "jp": {
            "Hello": "こんにちは",
            "I love you": "わたしは、あなたを愛しています"
        }
    }

    exports.localise = function(key) {
        if (!this._entities[this._language] || !this._entities[this._language][key]) {
            // When a language or translation is not
            // provided, just return the original text.
            return key
        }

        // return the language substitue for the original text
        return this._entities[this._language][key]
    }

    exports.setLanguage = function(lang) {
        this._language = lang || this._default
        this.trigger('update')
    }

    exports.getLanguage = function() {
        return this._language
    }

    exports.on = obs.on
    exports.trigger = obs.trigger

    obs.on('lang', exports.setLanguage)
    riot.mixin('i18n', { i18n: exports })

    //
    //
    // Register i1-8n tag
    riot.tag2('i1-8n', '<span name="localised"></span><span name="original" class="original"><yield></yield></span>',
        'i1-8n,[riot-tag="i1-8n"] { display: inline-block; } i1-8n .original,[riot-tag="i1-8n"] ' +
        '.original { display: none; }', '',
        function(opts) {
        this.mixin('i18n'); this.i18n.on('update', function() { this.update() }.bind(this))
        this.on('mount update', function() { this.localised.innerHTML = this.i18n.localise(this.original.innerHTML) })
    });
    // END: Register i1-8n tag
    //
    //

}(typeof exports === "undefined" ? (window.i18n = {}) : exports));


