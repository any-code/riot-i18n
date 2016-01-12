(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'riot'], function (exports, riot) {
            factory((root.i18n = exports), riot);
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('riot'));
    } else {
        // Browser globals
        factory((root.i18n = {}), root.riot);
    }
}(this, function (exports, riot) {

    var DEFAULT_LANG = 'en';

    function I18n() {
        this._entities = {}
        this._default = DEFAULT_LANG
        this._language = this._default
        var obs = riot.observable()
        this.on = obs.on
        this.off = obs.off
        this.trigger = obs.trigger
        this.on('lang', this.setLanguage)
    }

    I18n.prototype.dictionary = function(dict) {
        this._entities = dict;
    }

    I18n.prototype.defaultLanguage = function(lang) {
        this._default = lang;
    }

    I18n.prototype.localise = function(key) {
        if (!this._entities[this._language] || !this._entities[this._language][key]) {
            // When a language or translation is not
            // provided, just return the original text.
            return key
        }

        // return the language substitue for the original text
        return this._entities[this._language][key]
    }

    I18n.prototype.setLanguage = function(lang) {
        this._language = lang || this._default
        this.trigger('update')
    }

    I18n.prototype.getLanguage = function() {
        return this._language
    }

    var i18n = new I18n()
    for (property in i18n) {
        exports[property] = i18n[property];
    }
    riot.mixin('i18n', { i18n: exports })

    //
    //
    // BEGIN RIOT TAGS

    // END RIOT TAGS
    //
    //

}));
