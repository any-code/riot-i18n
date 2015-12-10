(function(def){
    def(['riot'], function(riot) {

        var DEFAULT_LANG = 'en';

        function I18n() {
            this._entitiies = {}
            this._default = DEFAULT_LANG
            this._language = this._default
            var obs = riot.observable()
            this.on = obs.on
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

        riot.mixin('i18n', { i18n: i18n })

        //
        //
        //BEGIN RIOT TAGS
riot.tag2('i1-8n', '<span name="localised"></span> <span name="original" class="original"><yield></yield></span>', 'i1-8n,[riot-tag="i1-8n"] { display: inline-block; } i1-8n .original,[riot-tag="i1-8n"] .original { display: none; }', '', function(opts) {
        this.mixin('i18n')

        this.i18n.on('update', function() {
            this.update()
        }.bind(this))

        this.on('mount update', function() {
            this.localised.innerHTML = this.i18n.localise(this.original.innerHTML)
        })
});
        //END RIOT TAGS
        //
        //

        return i18n;
    });
}( (function(darr, name){
    if (typeof require === 'undefined') {
        return function (deps, factory) { this[name] = factory.apply(this, darr.map(function(arg) { return window[arg] })); }
    } else if (typeof exports === 'undefined') {
        return function (deps, factory) { define(name, deps, factory); }
    } else {
        return function (deps, factory) { module.exports = factory.apply(this, deps.map(require)); }
    }
})(['riot'], 'i18n') ));


