function Module(exports, riot) {
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
    riot.mixin('i18n', { i18n: i18n })

    //
    //
    // BEGIN RIOT TAGS

    // END RIOT TAGS
    //
    //
}

Module.prototype.dependencies = ['riot'] // array of dependencies
Module.prototype.global = ["i18n", "riot-i18n"]; // array of global identifiers for module, useful if module can be required using a hyphenated-name

// Module UMD Loader
(function (g, f) {
    var d=Module.prototype.dependencies,gn=Module.prototype.global
    if (typeof define==='function'&&define.amd){define(['exports'].concat(d||[]),f)}else if(typeof exports==='object'&&
        typeof exports.nodeName!=='string'){f.apply(this,[exports].concat(d?d.map(require):[]))}else{if(typeof gn==='string'
    )gn=[gn];g[gn[0]]={};gn.splice(1).map(function(d){g[d]=g[gn[0]]});f.apply(this, [g[gn[0]]].concat(d?d.map(function(d
    ){return g[d]}):[]))}
}(this, Module));
