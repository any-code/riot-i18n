(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'riot'], function (exports, riot) {
            factory((root.i18n = exports), riot);
        });
    } else if (typeof exports === 'object') {
        factory(exports, require('riot'));
    } else {
        factory((root.i18n = {}), root.riot);
    }
}(this, function (exports, riot) {

    var DEFAULT_LANG = 'en';

    function I18n() {
        this._entities = {};
        this._default = DEFAULT_LANG;
        this._language = this._default;
        var obs = riot.observable();
        this.on = obs.on;
        this.off = obs.off;
        this.trigger = obs.trigger;
        this.on('lang', this.setLanguage);
    }

    I18n.prototype.dictionary = function(dict) {
        this._entities = dict;
    }

    I18n.prototype.defaultLanguage = function(lang) {
        this._default = lang;
    }

    I18n.prototype.localize = function(key, data) {
        var substitute, locale;

        function flatten(n, f, d, k) {
            k = k || "", f = f || {}, d = d || 0
            var nObj = n && !n.length,
                nKeys = nObj ? Object.keys(n).length : 0;

            if (nObj && nKeys > 0) {
                var i;
                for (i in n) {
                    if (k.split('.').length > d) { k = k.split('.').splice(0, d).join('.') }
                    k = (d == 0) ? i : k + "." + i, f = flatten(n[i], f, d + 1, k);
                }
            } else f[k] = n;
            return f;
        }

        if (!this._entities[this._language]) {
            substitute = key;
        }

        if (!substitute) {
            locale = flatten(this._entities[this._language]);

            if (!locale[key]) {
                substitute = key;
            } else {
                substitute = locale[key];
            }
        }

        if (data) {
            var _data = flatten(data),
                _key;
            for (_key in _data) {
                substitute = substitute.replace(new RegExp("{" + _key + "}", "g"), _data[_key]);
            }
        }

        return substitute;
    }

    I18n.prototype.setLanguage = function(lang) {
        this._language = lang || this._default
        this.trigger('update');
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

	riot.tag2('i1-8n', '<span ref="localized"></span><span ref="original"><yield></yield></span>', 'i1-8n,[riot-tag="i1-8n"],[data-is="i1-8n"]{ display: inline; } i1-8n [ref="original"],[riot-tag="i1-8n"] [ref="original"],[data-is="i1-8n"] [ref="original"] { display: none; }', '', function(opts) {
	    this.mixin('i18n')

	    this.i18n.on('update', function() {
	        this.update();
	    }.bind(this))

		this.on('mount', function() {
			this.hasRefs = this.refs != undefined
			this.localize();
		})

	    this.on('update', function() {
			this.localize();
		})

		this.localize = function() {
			var refs = this.hasRefs ? this.refs : this;
			var phrase = this.i18n.localize(refs.original.innerHTML);
			for (var key in this.opts) {
				phrase = phrase.replace('{' + key.replace(/([A-Z])/g, "-$1").toLowerCase() + '}', this.opts[key]);
			}
			refs.localized.innerHTML = phrase;
		}
	});
}));
