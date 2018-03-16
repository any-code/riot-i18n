(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'riot'], function (exports, riot) {
            factory((root.translate = exports), riot);
        });
    } else if (typeof exports === 'object') {
        factory(exports, require('riot'));
    } else {
        factory((root.translate = {}), root.riot);
    }
}(this, function (exports, riot) {

    var DEFAULT_LANG = 'en';

    function Translate() {
        this._entities = {};
        this._default = DEFAULT_LANG;
        this._language = this._default;
        var obs = riot.observable();
        this.on = obs.on;
        this.off = obs.off;
        this.trigger = obs.trigger;
        this.on('lang', this.setLanguage);
    }

    Translate.prototype.dictionary = function(dict) {
        this._entities = dict;
    }

    Translate.prototype.defaultLanguage = function(lang) {
        this._default = lang;
    }

    Translate.prototype.apply = function(key, data) {
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

    Translate.prototype.setLanguage = function(lang) {
        this._language = lang || this._default
        this.trigger('update');
    }

    Translate.prototype.getLanguage = function() {
        return this._language
    }

    var translate = new Translate(),
        property;

    for (property in translate) {
        exports[property] = translate[property];
    }
    riot.mixin('translate', { translate: exports });

	riot.tag2('translate', '<span ref="original"><yield></yield></span>', 'translate,[riot-tag="translate"],[data-is="translate"]{ display: inline; }', '', function(opts) {
	    this.mixin('translate')

	    this.translate.on('update', function() {
	        this.update();
	    }.bind(this))

		this.on('mount', function() {
			this.hasRefs = this.refs != undefined
			this.apply();
		})

	    this.on('update', function() {
			this.apply();
		})

		this.apply = function() {
			var refs = this.hasRefs ? this.refs : this;
			var phrase = this.translate.apply(refs.original.innerHTML);
			for (var key in this.opts) {
				phrase = phrase.replace('{' + key.replace(/([A-Z])/g, "-$1").toLowerCase() + '}', this.opts[key]);
			}
			var parentNode = this.root;
			while (parentNode.hasChildNodes()) {
    			parentNode.removeChild(parentNode.firstChild);
			}
			var span = document.createElement('span');
			span.innerHTML = phrase;
			parentNode.appendChild(span);
		}
	});
}));
