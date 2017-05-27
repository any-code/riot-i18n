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
        this._openCharacter = '{';
        this._closeCharacter = '}';
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

    I18n.prototype.localise = function(key, data) {
        var substitute, locale;

        function flatten(n, f, d, k) {
            k = k || "", f = f || {}, d = d || 0
            var nObj = n && !n.length,
                nKeys = nObj ? Object.keys(n).length : 0;

            if (nObj && nKeys > 0) {
                var i;
                for (i in n) {
                    if (k.split('.').length > d) { k = k.split('.').splice(0, d).join('.') }
                    k = (d == 0) ? i : k + "." + i, f = flatten(n[i], f, d + 1, k)
                }
            } else f[k] = n;
            return f;
        }

        if (!this._entities[this._language]) {
            // When a language is not provided,
            // treat the key as substitution
            substitute = key;
        }

        if (!substitute) {
            locale = flatten(this._entities[this._language]);

            if (!locale[key]) {
                // When a translation is not
                // provided, just return the original text.
                substitute = key
            } else {
                // return the language substitue for the original text
                substitute = locale[key];
            }
        }

        if (data) {
            var _data = flatten(data),
                _key;
            for (_key in _data) {
                substitute = substitute.replace(new RegExp(this._openCharacter + _key + this._closeCharacter, "g"), _data[_key]);
            }
        }

        return substitute;
    }

    I18n.prototype.setSpecialCharacters = function(open, close) {
        if(open) this._openCharacter = open;
        if(close) this._closeCharacter = close;
        this.trigger('update')
    }

    I18n.prototype.setLanguage = function(lang) {
        this._language = lang || this._default
        this.trigger('update')
    }

    I18n.prototype.getLanguage = function() {
        return this._language
    }

    var i18n = new I18n(),
        property;

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
