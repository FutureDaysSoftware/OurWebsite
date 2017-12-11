(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
	Header: require('./models/Header'),
	User: require('./models/User')
};

},{"./models/Header":8,"./models/User":9}],2:[function(require,module,exports){
'use strict';

module.exports = {
	Footer: require('./views/templates/Footer'),
	Header: require('./views/templates/Header')
};

},{"./views/templates/Footer":17,"./views/templates/Header":18}],3:[function(require,module,exports){
'use strict';

module.exports = {
	Footer: require('./views/Footer'),
	Header: require('./views/Header'),
	Toast: require('./views/Toast')
};

},{"./views/Footer":13,"./views/Header":14,"./views/Toast":24}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {

    CapitalizeFirstLetter: function CapitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    Currency: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }),

    GetFormField: function GetFormField(datum, value, meta) {
        var isNested = datum.range === 'List' || _typeof(datum.range) === 'object';

        var image = datum.range === 'ImageUrl' ? '<div><button class="btn" data-js="previewBtn" type="button">Preview</button><img data-src="' + this.ImageSrc(value) + '" /></div>' : '';

        var options = datum.range === 'Boolean' ? [{ label: 'True', name: 'true' }, { label: 'False', name: 'false' }] : datum.metadata ? datum.metadata.options : false;

        var icon = datum.metadata && datum.metadata.icon ? this.GetIcon(datum.metadata.icon) : options ? this.GetIcon('caret-down') : '';

        var label = isNested || datum.fk || datum.label && !meta.noLabel ? '<label>' + (datum.fk || datum.label) + '</label>' : '';

        value = value === undefined ? '' : value;

        if (options) {
            if (typeof options === 'function') {
                options();return this.GetSelect(datum, value, [], icon, label);
            } else if (Array.isArray(options)) return this.GetSelect(datum, value, options, icon, label);
        }

        var prompt = datum.prompt ? '<div class="prompt">' + datum.prompt + '</div>' : '';

        var input = datum.fk ? '<div data-view="typeAhead" data-name="' + datum.fk + '"></div>' : datum.range === 'Text' ? '<textarea data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" rows="3">' + value + '</textarea>' : datum.range === 'List' || datum.range === 'View' || _typeof(datum.range) === 'object' ? '<div data-js="' + datum.name + '" data-name="' + datum.name + '"></div>' : '<input type="' + this.RangeToInputType[datum.range] + '" data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" value="' + value + '" />';

        return '' + ('<div class="form-group ' + (isNested ? 'nested' : '') + '">\n            ' + label + '\n            ' + prompt + '\n            ' + input + ' \n            ' + icon + '\n        </div>');
    },
    GetFormFields: function GetFormFields(data) {
        var _this = this;

        var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var meta = arguments[2];

        if (!data) return '';

        return data.filter(function (datum) {
            return meta[datum.name] && meta[datum.name].hide ? false : true;
        }).map(function (datum) {
            return _this.GetFormField(datum, model && model[datum.name], meta);
        }).join('');
    },
    GetIcon: function GetIcon(name) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { IconDataJs: this.IconDataJs };
        return Reflect.apply(this.Icons[name], this, [opts]);
    },
    GetListItems: function GetListItems() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return items.map(function (item) {
            var attr = opts.dataAttr ? 'data-' + opts.dataAttr + '="' + item[opts.dataAttr] + '"' : '';
            return '<li ' + attr + '>' + (item.label || item) + '</li>';
        }).join('');
    },
    GetSelect: function GetSelect(datum, selectedValue, optionsData, icon) {
        var label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

        if (typeof selectedValue === 'boolean' || typeof selectedValue === 'number') selectedValue = selectedValue.toString();

        var options = optionsData.length ? this.GetSelectOptions(optionsData, selectedValue, { valueAttr: 'name' }) : '';

        return '' + ('<div class="form-group">\n            ' + label + '\n            <select data-js="' + datum.name + '">\n                <option disabled ' + (!selectedValue ? 'selected' : '') + ' value>' + datum.label + '</option>\n                ' + options + '\n            </select>\n            ' + icon + '\n        </div>');
    },
    GetSelectOptions: function GetSelectOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var selectedValue = arguments[1];
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { valueAttr: 'value' };

        return options.map(function (option) {
            return '<option ' + (selectedValue === option[opts.valueAttr] ? 'selected' : '') + ' value="' + option[opts.valueAttr] + '">' + option.label + '</option>';
        }).join('');
    },


    //Icons: require('./.IconMap'),

    IconDataJs: function IconDataJs(p) {
        return p.name ? 'data-js="' + p.name + '"' : '';
    },
    ImageSrc: function ImageSrc(name) {
        return 'https://storage.googleapis.com/mega-poetry-9665/' + name;
    },
    Range: function Range(int) {
        return Array.from(Array(int).keys());
    },


    RangeToInputType: {
        Email: 'email',
        Password: 'password',
        String: 'text'
    }

};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = Object.create(Object.assign({}, require('../../lib/MyObject'), {

    Request: {
        constructor: function constructor(data) {
            var _this = this;

            var req = new XMLHttpRequest();

            if (data.onProgress) req.addEventListener("progress", function (e) {
                return data.onProgress(e.lengthComputable ? Math.floor(e.loaded / e.total * 100) : 0);
            });

            return new Promise(function (resolve, reject) {

                req.onload = function () {
                    [500, 404, 401].includes(this.status) ? reject(this.response ? JSON.parse(this.response) : this.status) : resolve(JSON.parse(this.response));
                };

                data.method = data.method || "get";

                var path = "/" + data.resource + (data.id ? "/" + data.id : '');
                if (data.method === "get" || data.method === "options") {
                    var qs = data.qs ? "?" + window.encodeURIComponent(data.qs) : '';
                    req.open(data.method, "" + path + qs);
                    _this.setHeaders(req, data.headers);
                    req.send(null);
                } else {
                    req.open(data.method.toUpperCase(), path, true);
                    _this.setHeaders(req, data.headers);
                    req.send(data.data || null);
                }

                if (data.onProgress) data.onProgress('sent');
            });
        },
        setHeaders: function setHeaders(req) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            req.setRequestHeader("Accept", headers.accept || 'application/json');
            req.setRequestHeader("Content-Type", headers.contentType || 'text/plain');
        }
    },

    _factory: function _factory(data) {
        return Object.create(this.Request, {}).constructor(data);
    },
    constructor: function constructor() {

        if (!XMLHttpRequest.prototype.sendAsBinary) {
            XMLHttpRequest.prototype.sendAsBinary = function (sData) {
                var nBytes = sData.length,
                    ui8Data = new Uint8Array(nBytes);
                for (var nIdx = 0; nIdx < nBytes; nIdx++) {
                    ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
                }
                this.send(ui8Data);
            };
        }

        return this._factory.bind(this);
    }
}), {}).constructor();

},{"../../lib/MyObject":21}],6:[function(require,module,exports){
'use strict';

module.exports = Object.create({
    constructor: function constructor() {
        this.range = document.createRange();
        this.range.selectNode(document.getElementsByTagName("div").item(0));
        return this;
    },
    create: function create(name, opts) {
        var lower = name;
        name = (name.charAt(0).toUpperCase() + name.slice(1)).replace('-', '');

        return Object.create(this.Views[name], Object.assign({
            Header: { value: this.Header },
            Toast: { value: this.Toast },
            name: { value: name },
            factory: { value: this },
            range: { value: this.range },
            template: { value: this.Templates[name], writable: true },
            model: { value: this.Models[name] },
            user: { value: this.User }
        })).constructor(opts);
    }
}, {
    Header: { value: require('../views/Header') },
    Models: { value: require('../.ModelMap') },
    Templates: { value: require('../.TemplateMap') },
    Toast: { value: require('../views/Toast') },
    User: { value: require('../models/User') },
    Views: { value: require('../.ViewMap') }
});

},{"../.ModelMap":1,"../.TemplateMap":2,"../.ViewMap":3,"../models/User":9,"../views/Header":14,"../views/Toast":24}],7:[function(require,module,exports){
'use strict';

require('./polyfill');

var User = require('./models/User'),
    router = require('./router'),
    onLoad = new Promise(function (resolve) {
    return window.onload = function () {
        return resolve();
    };
});

User.on('logout', function () {
    return router.onLogout();
});

Promise.all([User.get(), onLoad]).then(function () {
    return router.initialize();
}).catch(function (e) {
    return console.log('Error initializing client -> ' + (e.stack || e));
});

},{"./models/User":9,"./polyfill":11,"./router":12}],8:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__.js'), {

    data: ['home', 'projects', 'contact']

});

},{"./__proto__.js":10}],9:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('./__proto__.js'), {
    isLoggedIn: function isLoggedIn() {
        return Boolean(this.data && this.data.id);
    },
    logout: function logout() {
        document.cookie = 'hzy=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        this.data = {};
        this.emit('logout');
    }
}), { resource: { value: 'me' } });

},{"./__proto__.js":10}],10:[function(require,module,exports){
'use strict';

var _Object$assign;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Object.assign({}, require('../../../lib/Model'), require('events').EventEmitter.prototype, (_Object$assign = {

    Xhr: require('../Xhr'),

    add: function add(datum) {
        this.data.push(datum);

        if (this.storeBy) this._storeOne(datum);

        return this;
    },
    delete: function _delete() {
        var _this = this;

        var keyValue = this.data[this.meta.key];
        return this.Xhr({ method: 'DELETE', resource: this.resource, id: keyValue }).then(function () {
            var key = _this.meta.key;

            if (Array.isArray(_this.data)) {
                var datum = _this.data.find(function (datum) {
                    return datum[key] == keyValue;
                });

                if (_this.store) {
                    Object.keys(_this.store).forEach(function (attr) {
                        _this.store[attr][datum[attr]] = _this.store[attr][datum[attr]].filter(function (datum) {
                            return datum[key] != keyValue;
                        });
                        if (_this.store[attr][datum[attr]].length === 0) {
                            _this.store[attr][datum[attr]] = undefined;
                        }
                    });
                }

                _this.data = _this.data.filter(function (datum) {
                    return datum[key] != keyValue;
                });
            }

            return Promise.resolve(_this.data);
        });
    },
    git: function git(attr) {
        return this.data[attr];
    },
    get: function get() {
        var _this2 = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { query: {} };

        if (opts.query || this.pagination) Object.assign(opts.query, this.pagination);

        return this.Xhr({ method: opts.method || 'get', resource: this.resource, headers: this.headers || {}, qs: opts.query ? JSON.stringify(opts.query) : undefined }).then(function (response) {

            if (Array.isArray(_this2.data)) {
                _this2.data = _this2.data.concat(opts.parse ? opts.parse(response, opts.storeBy) : response);
            } else {
                if (opts.storeBy) _this2._resetStore(opts.storeBy);
                _this2.data = _this2.parse ? _this2.parse(response, opts.storeBy) : response;
                if (opts.storeBy) _this2._store();
            }

            _this2.emit('got');

            return Promise.resolve(response);
        });
    },
    getCount: function getCount() {
        var _this3 = this;

        return this.Xhr({ method: 'get', resource: this.resource, headers: this.headers || {}, qs: JSON.stringify({ countOnly: true }) }).then(function (_ref) {
            var result = _ref.result;

            _this3.meta.count = result;
            return Promise.resolve(result);
        });
    }
}, _defineProperty(_Object$assign, 'git', function git(attr) {
    return this.data[attr];
}), _defineProperty(_Object$assign, 'patch', function patch(id, data) {
    var _this4 = this;

    return this.Xhr({ method: 'patch', id: id, resource: this.resource, headers: this.headers || {}, data: JSON.stringify(data || this.data) }).then(function (response) {

        if (Array.isArray(_this4.data)) {
            _this4.data = _this4.data ? _this4.data.concat(response) : [response];
            if (_this4.store) Object.keys(_this4.store).forEach(function (attr) {
                return _this4._store(response, attr);
            });
        } else {
            _this4.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, '_put', function _put(keyValue, data) {
    var _this5 = this;

    var item = this.data.find(function (datum) {
        return datum[_this5.meta.key] == keyValue;
    });
    if (item) item = data;
    return this;
}), _defineProperty(_Object$assign, 'put', function put(id, data) {
    var _this6 = this;

    return this.Xhr({ method: 'put', id: id, resource: this.resource, headers: this.headers || {}, data: JSON.stringify(data) }).then(function (response) {

        if (Array.isArray(_this6.data)) {} else {
            _this6.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, 'post', function post(model) {
    var _this7 = this;

    return this.Xhr({ method: 'post', resource: this.resource, headers: this.headers || {}, data: JSON.stringify(model || this.data) }).then(function (response) {

        if (Array.isArray(_this7.data)) {
            _this7.data = _this7.data ? _this7.data.concat(response) : [response];
            if (_this7.store) Object.keys(_this7.store).forEach(function (attr) {
                return _this7._store(response, attr);
            });
        } else {
            _this7.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, 'remove', function remove(item) {
    var index = this.data.findIndex(function (datum) {
        return JSON.stringify(datum) === JSON.stringify(item);
    });

    if (index === -1) return;

    this.data.splice(index, 1);
}), _defineProperty(_Object$assign, 'set', function set(attr, value) {
    this.data[attr] = value;
    this.emit(attr + 'Changed');
}), _defineProperty(_Object$assign, 'validate', function validate(data) {
    var _this8 = this;

    var valid = true;

    Object.keys(data).forEach(function (name) {
        var val = data[name],
            attribute = _this8.attributes.find(function (attr) {
            return attr.name === name;
        });

        if (attribute === undefined || !attribute.validate) {
            _this8.data[name] = val ? typeof val === 'string' ? val.trim() : val : undefined;
        } else if (valid && !_this8.validateDatum(attribute, val)) {
            _this8.emit('validationError', attribute);
            valid = false;
        } else if (_this8.validateDatum(attribute, val)) {
            _this8.data[name] = val.trim();
        }
    });

    return valid;
}), _defineProperty(_Object$assign, 'validateDatum', function validateDatum(attr, val) {
    return attr.validate.call(this, val.trim());
}), _Object$assign));

},{"../../../lib/Model":19,"../Xhr":5,"events":22}],11:[function(require,module,exports){
'use strict';

if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
        // .length of function is 2
        'use strict';

        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}

//https://gist.github.com/paulirish/1579671
var requestAnimationFramePolyfill = function () {
    var clock = Date.now();

    return function (callback) {

        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                polyfill(callback);
            }, 0);
        }
    };
}();

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || requestAnimationFramePolyfill;

require('smoothscroll-polyfill').polyfill();

module.exports = true;

},{"smoothscroll-polyfill":23}],12:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('../../lib/MyObject'), {

    ViewFactory: require('./factory/View'),

    Views: require('./.ViewMap'),

    Singletons: ['Header'],

    initialize: function initialize() {
        var _this = this;

        this.contentContainer = document.querySelector('#content');

        this.ViewFactory.constructor();

        this.Singletons.forEach(function (name) {
            return _this.Views[name].constructor({ factory: _this.ViewFactory });
        });

        window.onpopstate = this.handle.bind(this);

        this.Views.Header.on('navigate', function (route) {
            return _this.navigate(route);
        });

        this.footer = this.ViewFactory.create('footer', { insertion: { el: document.body } });

        this.handle();
    },
    handle: function handle() {
        this.handler(window.location.pathname.split('/').slice(1));
    },
    handler: function handler(path) {
        var _this2 = this;

        var name = this.pathToView(path[0]),
            view = this.Views[name] ? name : 'home';

        if (view === this.currentView) return this.views[view].onNavigation(path.slice(1));

        this.scrollToTop();

        Promise.all(Object.keys(this.views).map(function (view) {
            return _this2.views[view].hide();
        })).then(function () {

            _this2.currentView = view;

            if (_this2.views[view]) return _this2.views[view].onNavigation(path);

            return Promise.resolve(_this2.views[view] = _this2.ViewFactory.create(view, { insertion: { el: _this2.contentContainer }, path: path }).on('navigate', function (route, options) {
                return _this2.navigate(route, options);
            }).on('deleted', function () {
                return delete _this2.views[view];
            }));
        }).catch(this.Error);

        this.footer.els.container.classList.toggle('hidden', view === 'Admin');
    },
    navigate: function navigate(location) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (options.replace || options.up) {
            var path = ('' + window.location.pathname).split('/');
            path.pop();
            if (options.replace) path.push(location);
            location = path.join('/');
        } else if (options.append) {
            location = window.location.pathname + '/' + location;
        }

        if (location !== window.location.pathname) history.pushState({}, '', location);
        if (!options.silent) this.handle();
    },
    onLogout: function onLogout() {
        var _this3 = this;

        Promise.all(Object.keys(this.views).map(function (view) {
            return _this3.views[view].delete();
        })).then(function () {
            _this3.currentView = undefined;return _this3.handle();
        }).catch(this.Error);
    },
    pathToView: function pathToView(path) {
        var _this4 = this;

        var hyphenSplit = path.split('-');
        return hyphenSplit.map(function (item) {
            return _this4.capitalizeFirstLetter(item);
        }).join('');
    },
    scrollToTop: function scrollToTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
}), { currentView: { value: '', writable: true }, views: { value: {} } });

},{"../../lib/MyObject":21,"./.ViewMap":3,"./factory/View":6}],13:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {
    postRender: function postRender() {
        this.on('imgLoaded', function (el) {
            if (!el.parentNode) return;
            el.parentNode.nextElementSibling.classList.remove('hidden');
        });

        return this;
    },
    size: function size() {
        if (this.mobile === undefined) this.mobile = false;

        var image = 'footer-image.jpg';

        if (window.matchMedia("(max-width: 767px)").matches) {
            image = 'footer-image-mobile.jpg';
        }

        this.els.footerImage.innerHTML = '';

        this.slurpTemplate({
            template: '<img data-src="' + this.Format.ImageSrc(image) + '"/>',
            insertion: { el: this.els.footerImage }
        });

        return true;
    }
});

},{"./__proto__":15}],14:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('./__proto__'), {

    User: require('../models/User'),

    events: {
        navList: 'click'
    },

    insertion: function insertion() {
        return { el: document.querySelector('#content'), method: 'insertBefore' };
    },


    name: 'Header',

    onNavListClick: function onNavListClick(e) {
        var target = e.target;
        if (target.tagName !== 'SPAN') return;

        this.emit('navigate', '/' + target.textContent.toLowerCase());
    },
    onLogoutClick: function onLogoutClick() {
        this.User.logout();
    },
    onUserLogin: function onUserLogin() {
        this.els.profileBtn.classList.remove('hidden');
        this.els.name.textContent = this.User.data.name || this.User.data.email;
    },
    onUserLogout: function onUserLogout() {
        this.els.profileBtn.classList.add('hidden');
        this.els.name.textContent = '';
    },
    postRender: function postRender() {
        var _this = this;

        if (this.User.isLoggedIn()) this.onUserLogin();

        this.User.on('got', function () {
            if (_this.User.isLoggedIn()) _this.onUserLogin();
        });
        this.User.on('logout', function () {
            return _this.onUserLogout();
        });

        return this;
    },


    template: require('./templates/Header')

}), {});

},{"../models/User":9,"./__proto__":15,"./templates/Header":18}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = Object.assign({}, require('../../../lib/MyObject'), require('events').EventEmitter.prototype, {
    $: function $(el, selector) {
        return Array.from(el.querySelectorAll(selector));
    },


    TemplateContext: require('../TemplateContext'),

    Model: require('../models/__proto__'),

    OptimizedResize: require('./lib/OptimizedResize'),

    Xhr: require('../Xhr'),

    bindEvent: function bindEvent(key, event, el) {
        var _this = this;

        var els = el ? [el] : Array.isArray(this.els[key]) ? this.els[key] : [this.els[key]],
            name = this.getEventMethodName(key, event);

        if (!this['_' + name]) this['_' + name] = function (e) {
            return _this[name](e);
        };

        els.forEach(function (el) {
            return el.addEventListener(event || 'click', _this['_' + name]);
        });
    },
    constructor: function constructor() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


        if (opts.events) {
            Object.assign(this.events, opts.events);delete opts.events;
        }
        Object.assign(this, opts);

        this.subviewElements = [];

        if (this.requiresLogin && !this.user.isLoggedIn()) return this.handleLogin();
        if (this.user && !this.isAllowed(this.user)) return this.scootAway();

        return this.initialize().render();
    },
    delegateEvents: function delegateEvents(key, el) {
        var _this2 = this;

        var type = _typeof(this.events[key]);

        if (type === "string") {
            this.bindEvent(key, this.events[key], el);
        } else if (Array.isArray(this.events[key])) {
            this.events[key].forEach(function (eventObj) {
                return _this2.bindEvent(key, eventObj);
            });
        } else {
            this.bindEvent(key, this.events[key].event);
        }
    },
    delete: function _delete() {
        var _this3 = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { silent: false },
            silent = _ref.silent;

        return this.hide().then(function () {
            var container = _this3.els.container,
                parent = container.parentNode;
            if (container && parent) parent.removeChild(container);
            if (!silent) _this3.emit('deleted');
            return Promise.resolve();
        });
    },


    events: {},

    fadeInImage: function fadeInImage(el) {
        var _this4 = this;

        el.onload = function () {
            _this4.emit('imgLoaded', el);
            el.removeAttribute('data-src');
        };

        el.setAttribute('src', el.getAttribute('data-src'));
    },
    getEventMethodName: function getEventMethodName(key, event) {
        return 'on' + this.capitalizeFirstLetter(key) + this.capitalizeFirstLetter(event);
    },
    getContainer: function getContainer() {
        return this.els.container;
    },
    getTemplateOptions: function getTemplateOptions() {
        var rv = Object.assign(this.user ? { user: this.user.data } : {});

        if (this.model) {
            rv.model = this.model.data;

            if (this.model.meta) rv.meta = this.model.meta;
            if (this.model.attributes) rv.attributes = this.model.attributes;
        }

        if (this.templateOptions) rv.opts = typeof this.templateOptions === 'function' ? this.templateOptions() : this.templateOptions || {};

        return rv;
    },
    handleLogin: function handleLogin() {
        var _this5 = this;

        this.factory.create('login', { insertion: { el: document.querySelector('#content') } }).on("loggedIn", function () {
            return _this5.onLogin();
        });

        return this;
    },
    hide: function hide(isSlow) {
        var _this6 = this;

        //views not hiding consistently with this
        //if( !this.els || this.isHiding ) return Promise.resolve()

        this.isHiding = true;
        return this.hideEl(this.els.container, isSlow).then(function () {
            return Promise.resolve(_this6.hiding = false);
        });
    },
    hideSync: function hideSync() {
        this.els.container.classList.add('hidden');return this;
    },
    _hideEl: function _hideEl(el, resolve, hash, isSlow) {
        el.removeEventListener('animationend', this[hash]);
        el.classList.add('hidden');
        el.classList.remove('animate-out' + (isSlow ? '-slow' : ''));
        delete this[hash];
        this.isHiding = false;
        resolve();
    },
    hideEl: function hideEl(el, isSlow) {
        var _this7 = this;

        if (this.isHidden(el)) return Promise.resolve();

        var time = new Date().getTime(),
            hash = time + 'Hide';

        return new Promise(function (resolve) {
            _this7[hash] = function (e) {
                return _this7._hideEl(el, resolve, hash, isSlow);
            };
            el.addEventListener('animationend', _this7[hash]);
            el.classList.add('animate-out' + (isSlow ? '-slow' : ''));
        });
    },
    htmlToFragment: function htmlToFragment(str) {
        return this.factory.range.createContextualFragment(str);
    },
    initialize: function initialize() {
        return Object.assign(this, { els: {}, slurp: { attr: 'data-js', view: 'data-view', name: 'data-name', img: 'data-src' }, views: {} });
    },
    insertToDom: function insertToDom(fragment, options) {
        var insertion = typeof options.insertion === 'function' ? options.insertion() : options.insertion;

        insertion.method === 'insertBefore' ? insertion.el.parentNode.insertBefore(fragment, insertion.el) : insertion.el[insertion.method || 'appendChild'](fragment);
    },
    isAllowed: function isAllowed(user) {
        if (!this.requiresRole) return true;

        var userRoles = new Set(user.data.roles);

        if (typeof this.requiresRole === 'string') return userRoles.has(this.requiresRole);

        if (Array.isArray(this.requiresRole)) {
            var result = this.requiresRole.find(function (role) {
                return userRoles.has(role);
            });

            return result !== undefined;
        }

        return false;
    },
    isHidden: function isHidden(el) {
        return el ? el.classList.contains('hidden') : this.els.container.classList.contains('hidden');
    },
    onLogin: function onLogin() {

        if (!this.isAllowed(this.user)) return this.scootAway();

        this.initialize().render();
    },
    onNavigation: function onNavigation() {
        return this.show();
    },
    showNoAccess: function showNoAccess() {
        alert("No privileges, son");
        return this;
    },
    postRender: function postRender() {
        return this;
    },
    render: function render() {
        if (this.data) this.model = Object.create(this.Model, {}).constructor(this.data);

        this.slurpTemplate({
            insertion: this.insertion || { el: document.body },
            isView: true,
            storeFragment: this.storeFragment,
            template: Reflect.apply(this.template, this.TemplateContext, [this.getTemplateOptions()])
        });

        this.renderSubviews();

        if (this.size) {
            this.size();this.OptimizedResize.add(this.size.bind(this));
        }

        return this.postRender();
    },
    removeChildren: function removeChildren(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }return this;
    },
    renderSubviews: function renderSubviews() {
        var _this8 = this;

        this.subviewElements.forEach(function (obj) {
            var name = obj.name || obj.view;

            var opts = {};

            if (_this8.Views && _this8.Views[obj.view]) opts = _typeof(_this8.Views[obj.view]) === "object" ? _this8.Views[obj.view] : Reflect.apply(_this8.Views[obj.view], _this8, []);
            if (_this8.Views && _this8.Views[name]) opts = _typeof(_this8.Views[name]) === "object" ? _this8.Views[name] : Reflect.apply(_this8.Views[name], _this8, []);

            _this8.views[name] = _this8.factory.create(obj.view, Object.assign({ insertion: { el: obj.el, method: 'insertBefore' } }, opts));

            if (_this8.events.views) {
                if (_this8.events.views[name]) _this8.events.views[name].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return Reflect.apply(arr[1], _this8, [eventData]);
                    });
                });else if (_this8.events.views[obj.view]) _this8.events.views[obj.view].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return Reflect.apply(arr[1], _this8, [eventData]);
                    });
                });
            }

            if (obj.el.classList.contains('hidden')) _this8.views[name].hideSync();
            obj.el.remove();
        });

        this.subviewElements = [];

        return this;
    },
    scootAway: function scootAway() {
        var _this9 = this;

        this.Toast.showMessage('error', 'You are not allowed here.').catch(function (e) {
            _this9.Error(e);_this9.emit('navigate', '/');
        }).then(function () {
            return _this9.emit('navigate', '/');
        });

        return this;
    },
    show: function show(isSlow) {
        return this.showEl(this.els.container, isSlow);
    },
    showSync: function showSync() {
        this.els.container.classList.remove('hidden');return this;
    },
    _showEl: function _showEl(el, resolve, hash, isSlow) {
        el.removeEventListener('animationend', this[hash]);
        el.classList.remove('animate-in' + (isSlow ? '-slow' : ''));
        delete this[hash];
        resolve();
    },
    showEl: function showEl(el, isSlow) {
        var _this10 = this;

        var time = new Date().getTime(),
            hash = time + 'Show';

        return new Promise(function (resolve) {
            _this10[hash] = function (e) {
                return _this10._showEl(el, resolve, hash, isSlow);
            };
            el.addEventListener('animationend', _this10[hash]);
            el.classList.remove('hidden');
            el.classList.add('animate-in' + (isSlow ? '-slow' : ''));
        });
    },
    slurpEl: function slurpEl(el) {
        var key = el.getAttribute(this.slurp.attr) || 'container';

        if (key === 'container') {
            el.classList.add(this.name);
            if (this.klass) el.classList.add(this.klass);
        }

        this.els[key] = Array.isArray(this.els[key]) ? this.els[key].concat(el) : this.els[key] !== undefined ? [this.els[key], el] : el;

        el.removeAttribute(this.slurp.attr);

        if (this.events[key]) this.delegateEvents(key, el);
    },
    slurpTemplate: function slurpTemplate(options) {
        var _this11 = this;

        var fragment = this.htmlToFragment(options.template),
            selector = '[' + this.slurp.attr + ']',
            viewSelector = '[' + this.slurp.view + ']',
            imgSelector = '[' + this.slurp.img + ']',
            firstEl = fragment.querySelector('*');

        if (options.isView || firstEl.getAttribute(this.slurp.attr)) this.slurpEl(firstEl);
        Array.from(fragment.querySelectorAll(selector + ', ' + viewSelector + ', ' + imgSelector)).forEach(function (el) {
            if (el.hasAttribute(_this11.slurp.attr)) {
                _this11.slurpEl(el);
            } else if (el.hasAttribute(_this11.slurp.img)) _this11.fadeInImage(el);else if (el.hasAttribute(_this11.slurp.view)) {
                _this11.subviewElements.push({ el: el, view: el.getAttribute(_this11.slurp.view), name: el.getAttribute(_this11.slurp.name) });
            }
        });

        if (options.storeFragment) return Object.assign(this, { fragment: fragment });

        this.insertToDom(fragment, options);

        if (options.renderSubviews) this.renderSubviews();

        return this;
    },
    unbindEvent: function unbindEvent(key, event, el) {
        var _this12 = this;

        var els = el ? [el] : Array.isArray(this.els[key]) ? this.els[key] : [this.els[key]],
            name = this.getEventMethodName(key, event);

        els.forEach(function (el) {
            return el.removeEventListener(event || 'click', _this12['_' + name]);
        });
    }
});

},{"../../../lib/MyObject":21,"../TemplateContext":4,"../Xhr":5,"../models/__proto__":10,"./lib/OptimizedResize":16,"events":22}],16:[function(require,module,exports){
'use strict';

module.exports = Object.create({
    add: function add(callback) {
        if (!this.callbacks.length) window.addEventListener('resize', this.onResize.bind(this));
        this.callbacks.push(callback);
    },
    onResize: function onResize() {
        if (this.running) return;

        this.running = true;

        window.requestAnimationFrame ? window.requestAnimationFrame(this.runCallbacks.bind(this)) : setTimeout(this.runCallbacks, 66);
    },
    runCallbacks: function runCallbacks() {
        this.callbacks = this.callbacks.filter(function (callback) {
            return callback();
        });
        this.running = false;
    }
}, { callbacks: { writable: true, value: [] }, running: { writable: true, value: false } });

},{}],17:[function(require,module,exports){
"use strict";

module.exports = function () {
    return;
    "<footer>\n    <div>\n        <span>Contact</span>\n        <span>\n            <a href=\"mailto:info@futuredays.io\">info@futuredays.io</a>\n        </span>\n    </div>\n    <div>\n        <span>Copyright</span>\n        <span>new Date().getFullYear() FutureDays Software</span>\n    </div>\n</footer>";
};

},{}],18:[function(require,module,exports){
"use strict";

module.exports = function (_ref) {
    var _this = this;

    var model = _ref.model;

    var navOptions = model.forEach(function (datum) {
        return "<span>" + _this.CapitalizeFirstLetter(datum) + "</span>";
    });
    return "<nav>\n    <div>\n        <div>\n            <span>Future</span>\n            <span>Days</span>\n        </div>\n        <div>Software</div>\n    </div>\n    <div data-js=\"navList\">" + navOptions + "</div>\n</nav>\n";
};

},{}],19:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Object.assign({}, require('./MyObject'), {
    CreateDefault: function CreateDefault() {
        return this.reducer(this.attributes, function (attr) {
            return _defineProperty({}, attr.name, typeof attr.default === 'function' ? attr.default() : attr.default);
        });
    },


    attributes: [],

    data: {},

    constructor: function constructor() {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        Object.assign(this, { store: {}, data: data }, opts);

        if (this.storeBy) {
            this.storeBy.forEach(function (key) {
                return _this.store[key] = {};
            });
            this._store();
        }

        return this;
    },


    meta: {},

    sort: function sort(opts) {
        var attr = Object.keys(opts)[0],
            value = opts[attr];

        this.data.sort(function (a, b) {
            return value ? a[attr] < b[attr] ? -1 : 1 : b[attr] < a[attr] ? -1 : 1;
        });

        return this;
    },
    _resetStore: function _resetStore(storeBy) {
        var _this2 = this;

        this.store = {};
        storeBy.forEach(function (attr) {
            return _this2.store[attr] = {};
        });
        this.storeBy = storeBy;
    },
    _store: function _store(data) {
        var _this3 = this;

        data = data || this.data;
        data.forEach(function (datum) {
            return _this3.storeBy.forEach(function (attr) {
                return _this3._storeAttr(datum, attr);
            });
        });
    },
    _storeAttr: function _storeAttr(datum, attr) {
        this.store[attr][datum[attr]] = this.store[attr][datum[attr]] ? Array.isArray(this.store[attr][datum[attr]]) ? this.store[attr][datum[attr]].concat(datum) : [this.store[attr][datum[attr]], datum] : datum;
    },
    _storeOne: function _storeOne(datum) {
        var _this4 = this;

        this.storeBy.forEach(function (attr) {
            return _this4._storeAttr(datum, attr);
        });
    }
});

},{"./MyObject":21}],20:[function(require,module,exports){
"use strict";

module.exports = function (err) {
  console.log(err.stack || err);
};

},{}],21:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {

    capitalizeFirstLetter: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getIntRange: function getIntRange(int) {
        return Array.from(Array(int).keys());
    },
    getRandomInclusiveInteger: function getRandomInclusiveInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    omit: function omit(obj, keys) {
        return Object.keys(obj).filter(function (key) {
            return !keys.includes(key);
        }).reduce(function (memo, key) {
            return Object.assign(memo, _defineProperty({}, key, obj[key]));
        }, {});
    },
    pick: function pick(obj, keys) {
        return keys.reduce(function (memo, key) {
            return Object.assign(memo, _defineProperty({}, key, obj[key]));
        }, {});
    },
    reducer: function reducer(arr, fn) {
        return arr.reduce(function (memo, item, i) {
            return Object.assign(memo, fn(item, i));
        }, {});
    },
    shuffleArray: function shuffleArray(arr) {
        var _this = this;

        var rv = Array.from(arr);

        rv.forEach(function (item, i) {
            if (i === rv.length - 1) return;
            var int = _this.getRandomInclusiveInteger(i, rv.length - 1),
                holder = rv[i];

            rv[i] = rv[int];
            rv[int] = holder;
        });

        return rv;
    },


    Error: require('./MyError'),

    P: function P(fun) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var thisArg = arguments[2];
        return new Promise(function (resolve, reject) {
            return Reflect.apply(fun, thisArg || undefined, args.concat(function (e) {
                for (var _len = arguments.length, callback = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    callback[_key - 1] = arguments[_key];
                }

                return e ? reject(e) : resolve(callback);
            }));
        });
    },

    constructor: function constructor() {
        return this;
    }
};

},{"./MyError":20}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],23:[function(require,module,exports){
/* smoothscroll v0.4.0 - 2017 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   */
  var w = window;
  var d = document;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

   // polyfill
  function polyfill() {
    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style
      && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null
        || typeof firstArg !== 'object'
        || firstArg.behavior === undefined
        || firstArg.behavior === 'auto'
        || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions '
        + firstArg.behavior
        + ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return (el.clientHeight + ROUNDING_TOLERANCE) < el.scrollHeight;
      }

      if (axis === 'X') {
        return (el.clientWidth + ROUNDING_TOLERANCE) < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : (w.scrollX || w.pageXOffset),
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : (w.scrollY || w.pageYOffset)
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : (w.scrollX || w.pageXOffset),
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : (w.scrollY || w.pageYOffset)
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
             ? arguments[1]
             : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value couldn\'t be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object'
              ? ~~arguments[0]
              : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined
              ? ~~arguments[1]
              : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined
            ? true
            : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (typeof exports === 'object') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());

},{}],24:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('../../../client/js/views/__proto__'), {

    ToastMessage: require('./ToastMessage'),

    name: 'Toast',

    postRender: function postRender() {
        this.messages = {};

        return this;
    },


    requiresLogin: false,

    createMessage: function createMessage(type, message) {
        if (!this.messages[message]) this.messages[message] = Object.create(this.ToastMessage, {
            insertion: { value: { el: this.els.container } }
        }).constructor();

        return this.messages[message].showMessage(type, message);
    },


    template: require('./templates/Toast')

}), {});

},{"../../../client/js/views/__proto__":15,"./ToastMessage":25,"./templates/Toast":26}],25:[function(require,module,exports){
module.exports = Object.assign( {}, require('../../../client/js/views/__proto__'), {

    name: 'ToastMessage',

    Icons: {
        error: require('./templates/lib/error')(),
        success: require('./templates/lib/checkmark')()
    },

    postRender() {

        this.on( 'shown', () => this.status = 'shown' )
        this.on( 'hidden', () => this.status = 'hidden' )

        return this
    },

    requiresLogin: false,

    showMessage( type, message ) {
        return new Promise( ( resolve, reject )  => {
            if( /show/.test( this.status ) ) this.teardown()

            this.resolution = resolve

            if( type !== 'error' ) this.els.container.classList.add('success')

            this.els.message.textContent = message
            this.els.title.textContent = type === 'error' ? 'Error' : 'Success'
            this.slurpTemplate( { insertion: { el: this.els.icon }, template: type === 'error' ? this.Icons.error : this.Icons.success } )
            
            this.status = 'showing'

            this.show( true )
            .then( () => this.hide( true ) )
            .then( () => this.teardown() )
            .catch( reject )
        } )
    },

    teardown() {
        if( this.els.container.classList.contains('success') ) this.els.container.classList.remove('success')
        this.els.message.textContent = ''
        this.els.message.title = ''
        if( this.els.icon.firstChild ) this.els.icon.removeChild( this.els.icon.firstChild )
        this.resolution()
    },

    template: require('./templates/ToastMessage')

} )

},{"../../../client/js/views/__proto__":15,"./templates/ToastMessage":27,"./templates/lib/checkmark":28,"./templates/lib/error":29}],26:[function(require,module,exports){
module.exports = () => `<div></div>`

},{}],27:[function(require,module,exports){
module.exports = () => 
`<div class="hidden">
    <div data-js="icon"></div>
    <div>
        <div data-js="title"></div>
        <div data-js="message"></div>
    </div>
</div>`
},{}],28:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'checkmark'}" class="checkmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="97.619px" height="97.618px" viewBox="0 0 97.619 97.618" style="enable-background:new 0 0 97.619 97.618;"
	 xml:space="preserve">
<g>
	<path d="M96.939,17.358L83.968,5.959c-0.398-0.352-0.927-0.531-1.449-0.494C81.99,5.5,81.496,5.743,81.146,6.142L34.1,59.688
		L17.372,37.547c-0.319-0.422-0.794-0.701-1.319-0.773c-0.524-0.078-1.059,0.064-1.481,0.385L0.794,47.567
		c-0.881,0.666-1.056,1.92-0.39,2.801l30.974,40.996c0.362,0.479,0.922,0.771,1.522,0.793c0.024,0,0.049,0,0.073,0
		c0.574,0,1.122-0.246,1.503-0.68l62.644-71.297C97.85,19.351,97.769,18.086,96.939,17.358z"/>
</g></svg>`

},{}],29:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'error'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18.978 18.978" style="enable-background:new 0 0 18.978 18.978;" xml:space="preserve">
<g>
    <path d="M16.088,1.675c-0.133-0.104-0.306-0.144-0.47-0.105c-0.013,0.002-1.261,0.29-2.594,0.29
        c-1.788,0-2.789-0.476-2.975-1.415C9.999,0.191,9.779,0.007,9.521,0c-0.257-0.007-0.487,0.167-0.55,0.418
        C8.727,1.386,7.71,1.877,5.95,1.877c-1.332,0-2.571-0.302-2.583-0.305c-0.166-0.04-0.34-0.004-0.474,0.102
        C2.76,1.777,2.681,1.938,2.681,2.108v4.869c0,0.04,0.004,0.078,0.013,0.115c0.057,1.647,0.65,8.714,6.528,11.822
        c0.08,0.043,0.169,0.064,0.258,0.064c0.092,0,0.183-0.021,0.266-0.066c5.74-3.137,6.445-10.115,6.532-11.791
        c0.012-0.046,0.019-0.094,0.019-0.144V2.108C16.297,1.939,16.219,1.78,16.088,1.675z M15.19,6.857
        c-0.007,0.031-0.012,0.064-0.013,0.097c-0.053,1.298-0.574,7.832-5.701,10.838c-5.215-2.965-5.646-9.526-5.68-10.83
        c0-0.029-0.004-0.058-0.009-0.085V2.784C4.322,2.877,5.112,2.982,5.95,2.982c1.911,0,2.965-0.54,3.537-1.208
        c0.553,0.661,1.599,1.191,3.536,1.191c0.839,0,1.631-0.101,2.166-0.188L15.19,6.857L15.19,6.857z"/>
    <polygon points="10.241,11.237 10.529,5.311 8.449,5.311 8.75,11.237 		"/>
    <path d="M9.496,11.891c-0.694,0-1.178,0.498-1.178,1.189c0,0.682,0.471,1.191,1.178,1.191
        c0.706,0,1.164-0.51,1.164-1.191C10.647,12.389,10.189,11.891,9.496,11.891z"/>
</g></svg>`

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvLk1vZGVsTWFwLmpzIiwiY2xpZW50L2pzLy5UZW1wbGF0ZU1hcC5qcyIsImNsaWVudC9qcy8uVmlld01hcC5qcyIsImNsaWVudC9qcy9UZW1wbGF0ZUNvbnRleHQuanMiLCJjbGllbnQvanMvWGhyLmpzIiwiY2xpZW50L2pzL2ZhY3RvcnkvVmlldy5qcyIsImNsaWVudC9qcy9tYWluLmpzIiwiY2xpZW50L2pzL21vZGVscy9IZWFkZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL1VzZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL19fcHJvdG9fXy5qcyIsImNsaWVudC9qcy9wb2x5ZmlsbC5qcyIsImNsaWVudC9qcy9yb3V0ZXIuanMiLCJjbGllbnQvanMvdmlld3MvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL0hlYWRlci5qcyIsImNsaWVudC9qcy92aWV3cy9fX3Byb3RvX18uanMiLCJjbGllbnQvanMvdmlld3MvbGliL09wdGltaXplZFJlc2l6ZS5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL3RlbXBsYXRlcy9IZWFkZXIuanMiLCJsaWIvTW9kZWwuanMiLCJsaWIvTXlFcnJvci5qcyIsImxpYi9NeU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL3Ntb290aHNjcm9sbC1wb2x5ZmlsbC9kaXN0L3Ntb290aHNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL1RvYXN0LmpzIiwibm9kZV9tb2R1bGVzL3RvYXN0L3ZpZXdzL3RlbXBsYXRlcy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9jaGVja21hcmsuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWU7QUFDYixTQUFRLFFBQVEsaUJBQVIsQ0FESztBQUVkLE9BQU0sUUFBUSxlQUFSO0FBRlEsQ0FBZjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFNBQVEsUUFBUSwwQkFBUixDQURLO0FBRWQsU0FBUSxRQUFRLDBCQUFSO0FBRk0sQ0FBZjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFNBQVEsUUFBUSxnQkFBUixDQURLO0FBRWQsU0FBUSxRQUFRLGdCQUFSLENBRk07QUFHZCxRQUFPLFFBQVEsZUFBUjtBQUhPLENBQWY7Ozs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7O0FBRWIsMkJBQXVCO0FBQUEsZUFBVSxPQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLFdBQWpCLEtBQWlDLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FBM0M7QUFBQSxLQUZWOztBQUliLGNBQVUsSUFBSSxLQUFLLFlBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7QUFDeEMsZUFBTyxVQURpQztBQUV4QyxrQkFBVSxLQUY4QjtBQUd4QywrQkFBdUI7QUFIaUIsS0FBaEMsQ0FKRzs7QUFVYixnQkFWYSx3QkFVQyxLQVZELEVBVVEsS0FWUixFQVVlLElBVmYsRUFVc0I7QUFDL0IsWUFBTSxXQUFXLE1BQU0sS0FBTixLQUFnQixNQUFoQixJQUEwQixRQUFPLE1BQU0sS0FBYixNQUF1QixRQUFsRTs7QUFFQSxZQUFNLFFBQVEsTUFBTSxLQUFOLEtBQWdCLFVBQWhCLG1HQUNzRixLQUFLLFFBQUwsQ0FBZSxLQUFmLENBRHRGLG9CQUFkOztBQUlBLFlBQU0sVUFBVSxNQUFNLEtBQU4sS0FBZ0IsU0FBaEIsR0FDVixDQUFFLEVBQUUsT0FBTyxNQUFULEVBQWlCLE1BQU0sTUFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaGNBLE9BQU8sT0FBUCxHQUFpQixPQUFPLE1BQVAsQ0FBZSxPQUFPLE1BQVAsQ0FBZSxFQUFmLEVBQW1CLFFBQVEsb0NBQVIsQ0FBbkIsRUFBa0U7O0FBRTlGLGtCQUFjLFFBQVEsZ0JBQVIsQ0FGZ0Y7O0FBSTlGLFVBQU0sT0FKd0Y7O0FBTTlGLGNBTjhGLHdCQU1qRjtBQUNULGFBQUssUUFBTCxHQUFnQixFQUFoQjs7QUFFQSxlQUFPLElBQVA7QUFDSCxLQVY2Rjs7O0FBWTlGLG1CQUFlLEtBWitFOztBQWM5RixpQkFkOEYseUJBYy9FLElBZCtFLEVBY3pFLE9BZHlFLEVBYy9EO0FBQzNCLFlBQUksQ0FBQyxLQUFLLFFBQUwsQ0FBZSxPQUFmLENBQUwsRUFBZ0MsS0FBSyxRQUFMLENBQWUsT0FBZixJQUEyQixPQUFPLE1BQVAsQ0FBZSxLQUFLLFlBQXBCLEVBQWtDO0FBQ3pGLHVCQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksS0FBSyxHQUFMLENBQVMsU0FBZixFQUFUO0FBRDhFLFNBQWxDLEVBRXZELFdBRnVELEVBQTNCOztBQUloQyxlQUFPLEtBQUssUUFBTCxDQUFlLE9BQWYsRUFBeUIsV0FBekIsQ0FBc0MsSUFBdEMsRUFBNEMsT0FBNUMsQ0FBUDtBQUVILEtBckI2Rjs7O0FBdUI5RixjQUFVLFFBQVEsbUJBQVI7O0FBdkJvRixDQUFsRSxDQUFmLEVBeUJaLEVBekJZLENBQWpCOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcblx0IEhlYWRlcjogcmVxdWlyZSgnLi9tb2RlbHMvSGVhZGVyJyksXG5cdFVzZXI6IHJlcXVpcmUoJy4vbW9kZWxzL1VzZXInKSBcbn0iLCJtb2R1bGUuZXhwb3J0cz17XG5cdCBGb290ZXI6IHJlcXVpcmUoJy4vdmlld3MvdGVtcGxhdGVzL0Zvb3RlcicpLFxuXHRIZWFkZXI6IHJlcXVpcmUoJy4vdmlld3MvdGVtcGxhdGVzL0hlYWRlcicpIFxufSIsIm1vZHVsZS5leHBvcnRzPXtcblx0IEZvb3RlcjogcmVxdWlyZSgnLi92aWV3cy9Gb290ZXInKSxcblx0SGVhZGVyOiByZXF1aXJlKCcuL3ZpZXdzL0hlYWRlcicpLFxuXHRUb2FzdDogcmVxdWlyZSgnLi92aWV3cy9Ub2FzdCcpIFxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyOiBzdHJpbmcgPT4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLFxuXG4gICAgQ3VycmVuY3k6IG5ldyBJbnRsLk51bWJlckZvcm1hdCggJ2VuLVVTJywge1xuICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICBjdXJyZW5jeTogJ1VTRCcsXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJcbiAgICB9ICksXG5cbiAgICBHZXRGb3JtRmllbGQoIGRhdHVtLCB2YWx1ZSwgbWV0YSApIHtcbiAgICAgICAgY29uc3QgaXNOZXN0ZWQgPSBkYXR1bS5yYW5nZSA9PT0gJ0xpc3QnIHx8IHR5cGVvZiBkYXR1bS5yYW5nZSA9PT0gJ29iamVjdCdcblxuICAgICAgICBjb25zdCBpbWFnZSA9IGRhdHVtLnJhbmdlID09PSAnSW1hZ2VVcmwnXG4gICAgICAgICAgICA/IGA8ZGl2PjxidXR0b24gY2xhc3M9XCJidG5cIiBkYXRhLWpzPVwicHJldmlld0J0blwiIHR5cGU9XCJidXR0b25cIj5QcmV2aWV3PC9idXR0b24+PGltZyBkYXRhLXNyYz1cIiR7dGhpcy5JbWFnZVNyYyggdmFsdWUgKX1cIiAvPjwvZGl2PmBcbiAgICAgICAgICAgIDogYGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBvcHRpb25zID0gZGF0dW0ucmFuZ2UgPT09ICdCb29sZWFuJ1xuICAgICAgICAgICAgPyBbIHsgbGFiZWw6ICdUcnVlJywgbmFtZTogJ3RydWUnIH0sIHsgbGFiZWw6ICdGYWxzZScsIG5hbWU6ICdmYWxzZScgfSBdXG4gICAgICAgICAgICA6IGRhdHVtLm1ldGFkYXRhXG4gICAgICAgICAgICAgICAgPyBkYXR1bS5tZXRhZGF0YS5vcHRpb25zIDogZmFsc2VcblxuICAgICAgICBjb25zdCBpY29uID0gZGF0dW0ubWV0YWRhdGEgJiYgZGF0dW0ubWV0YWRhdGEuaWNvblxuICAgICAgICAgICAgPyB0aGlzLkdldEljb24oIGRhdHVtLm1ldGFkYXRhLmljb24gKVxuICAgICAgICAgICAgOiBvcHRpb25zXG4gICAgICAgICAgICAgICAgPyB0aGlzLkdldEljb24oJ2NhcmV0LWRvd24nKVxuICAgICAgICAgICAgICAgIDogYGBcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGlzTmVzdGVkIHx8ICggZGF0dW0uZmsgfHwgZGF0dW0ubGFiZWwgJiYgIW1ldGEubm9MYWJlbCApXG4gICAgICAgICAgICA/IGA8bGFiZWw+JHtkYXR1bS5mayB8fCBkYXR1bS5sYWJlbH08L2xhYmVsPmBcbiAgICAgICAgICAgIDogYGBcblxuICAgICAgICB2YWx1ZSA9ICggdmFsdWUgPT09IHVuZGVmaW5lZCApID8gJycgOiB2YWx1ZVxuXG4gICAgICAgIGlmKCBvcHRpb25zICkge1xuICAgICAgICAgICAgaWYoIHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICkgeyBvcHRpb25zKCk7IHJldHVybiB0aGlzLkdldFNlbGVjdCggZGF0dW0sIHZhbHVlLCBbIF0sIGljb24sIGxhYmVsICkgfVxuICAgICAgICAgICAgZWxzZSBpZiggQXJyYXkuaXNBcnJheSggb3B0aW9ucyApICkgcmV0dXJuIHRoaXMuR2V0U2VsZWN0KCBkYXR1bSwgdmFsdWUsIG9wdGlvbnMsIGljb24sIGxhYmVsIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21wdCA9IGRhdHVtLnByb21wdCA/IGA8ZGl2IGNsYXNzPVwicHJvbXB0XCI+JHtkYXR1bS5wcm9tcHR9PC9kaXY+YCA6IGBgXG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBkYXR1bS5ma1xuICAgICAgICAgICAgPyBgPGRpdiBkYXRhLXZpZXc9XCJ0eXBlQWhlYWRcIiBkYXRhLW5hbWU9XCIke2RhdHVtLmZrfVwiPjwvZGl2PmBcbiAgICAgICAgICAgIDogZGF0dW0ucmFuZ2UgPT09ICdUZXh0J1xuICAgICAgICAgICAgICAgID8gYDx0ZXh0YXJlYSBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIHBsYWNlaG9sZGVyPVwiJHtkYXR1bS5sYWJlbCB8fCAnJ31cIiByb3dzPVwiM1wiPiR7dmFsdWV9PC90ZXh0YXJlYT5gXG4gICAgICAgICAgICAgICAgOiBkYXR1bS5yYW5nZSA9PT0gJ0xpc3QnIHx8IGRhdHVtLnJhbmdlID09PSAnVmlldycgfHwgdHlwZW9mIGRhdHVtLnJhbmdlID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IGA8ZGl2IGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCIgZGF0YS1uYW1lPVwiJHtkYXR1bS5uYW1lfVwiPjwvZGl2PmBcbiAgICAgICAgICAgICAgICAgICAgOiBgPGlucHV0IHR5cGU9XCIke3RoaXMuUmFuZ2VUb0lucHV0VHlwZVsgZGF0dW0ucmFuZ2UgXX1cIiBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIHBsYWNlaG9sZGVyPVwiJHtkYXR1bS5sYWJlbCB8fCAnJ31cIiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gXG5cbiAgICAgICAgcmV0dXJuIGBgICtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwICR7aXNOZXN0ZWQgPyAnbmVzdGVkJyA6ICcnfVwiPlxuICAgICAgICAgICAgJHtsYWJlbH1cbiAgICAgICAgICAgICR7cHJvbXB0fVxuICAgICAgICAgICAgJHtpbnB1dH0gXG4gICAgICAgICAgICAke2ljb259XG4gICAgICAgIDwvZGl2PmBcbiAgICB9LFxuXG4gICAgR2V0Rm9ybUZpZWxkcyggZGF0YSwgbW9kZWw9e30sIG1ldGEgKSB7XG4gICAgICAgIGlmKCAhZGF0YSApIHJldHVybiBgYFxuXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgICAuZmlsdGVyKCBkYXR1bSA9PiBtZXRhWyBkYXR1bS5uYW1lIF0gJiYgbWV0YVsgZGF0dW0ubmFtZSBdLmhpZGUgPyBmYWxzZSA6IHRydWUgKVxuICAgICAgICAgICAgLm1hcCggZGF0dW0gPT4gdGhpcy5HZXRGb3JtRmllbGQoIGRhdHVtLCBtb2RlbCAmJiBtb2RlbFsgZGF0dW0ubmFtZSBdLCBtZXRhICkgKS5qb2luKCcnKVxuICAgIH0sXG5cbiAgICBHZXRJY29uKCBuYW1lLCBvcHRzPXsgSWNvbkRhdGFKczogdGhpcy5JY29uRGF0YUpzIH0gKSB7IHJldHVybiBSZWZsZWN0LmFwcGx5KCB0aGlzLkljb25zWyBuYW1lIF0sIHRoaXMsIFsgb3B0cyBdICkgfSxcblxuICAgIEdldExpc3RJdGVtcyggaXRlbXM9W10sIG9wdHM9e30gKSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoIGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IG9wdHMuZGF0YUF0dHIgPyBgZGF0YS0ke29wdHMuZGF0YUF0dHJ9PVwiJHtpdGVtWyBvcHRzLmRhdGFBdHRyIF19XCJgIDogYGBcbiAgICAgICAgICAgIHJldHVybiBgPGxpICR7YXR0cn0+JHtpdGVtLmxhYmVsIHx8IGl0ZW19PC9saT5gIFxuICAgICAgICB9ICkuam9pbignJylcbiAgICB9LFxuXG4gICAgR2V0U2VsZWN0KCBkYXR1bSwgc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uc0RhdGEsIGljb24sIGxhYmVsPWBgICkge1xuICAgICAgICBpZiggdHlwZW9mIHNlbGVjdGVkVmFsdWUgPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygc2VsZWN0ZWRWYWx1ZSA9PT0gJ251bWJlcicgKSBzZWxlY3RlZFZhbHVlID0gc2VsZWN0ZWRWYWx1ZS50b1N0cmluZygpXG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNEYXRhLmxlbmd0aCA/IHRoaXMuR2V0U2VsZWN0T3B0aW9ucyggb3B0aW9uc0RhdGEsIHNlbGVjdGVkVmFsdWUsIHsgdmFsdWVBdHRyOiAnbmFtZScgfSApIDogYGBcblxuICAgICAgICByZXR1cm4gYGAgK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICR7bGFiZWx9XG4gICAgICAgICAgICA8c2VsZWN0IGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBkaXNhYmxlZCAkeyFzZWxlY3RlZFZhbHVlID8gYHNlbGVjdGVkYCA6IGBgfSB2YWx1ZT4ke2RhdHVtLmxhYmVsfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICR7b3B0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgJHtpY29ufVxuICAgICAgICA8L2Rpdj5gXG4gICAgfSxcblxuICAgIEdldFNlbGVjdE9wdGlvbnMoIG9wdGlvbnM9W10sIHNlbGVjdGVkVmFsdWUsIG9wdHM9eyB2YWx1ZUF0dHI6ICd2YWx1ZScgfSApIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKCBvcHRpb24gPT4gYDxvcHRpb24gJHtzZWxlY3RlZFZhbHVlID09PSBvcHRpb25bIG9wdHMudmFsdWVBdHRyIF0gPyBgc2VsZWN0ZWRgIDogYGB9IHZhbHVlPVwiJHtvcHRpb25bIG9wdHMudmFsdWVBdHRyIF19XCI+JHtvcHRpb24ubGFiZWx9PC9vcHRpb24+YCApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIC8vSWNvbnM6IHJlcXVpcmUoJy4vLkljb25NYXAnKSxcbiAgICBcbiAgICBJY29uRGF0YUpzKCBwICkgeyByZXR1cm4gcC5uYW1lID8gYGRhdGEtanM9XCIke3AubmFtZX1cImAgOiBgYCB9LFxuXG4gICAgSW1hZ2VTcmMoIG5hbWUgKSB7IHJldHVybiBgaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL21lZ2EtcG9ldHJ5LTk2NjUvJHtuYW1lfWAgfSxcblxuICAgIFJhbmdlKCBpbnQgKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKCBBcnJheSggaW50ICkua2V5cygpIClcbiAgICB9LFxuXG4gICAgUmFuZ2VUb0lucHV0VHlwZToge1xuICAgICAgICBFbWFpbDogJ2VtYWlsJyxcbiAgICAgICAgUGFzc3dvcmQ6ICdwYXNzd29yZCcsXG4gICAgICAgIFN0cmluZzogJ3RleHQnXG4gICAgfVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuLi8uLi9saWIvTXlPYmplY3QnKSwge1xuXG4gICAgUmVxdWVzdDoge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCBkYXRhICkge1xuICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgICAgICAgIGlmKCBkYXRhLm9uUHJvZ3Jlc3MgKSByZXEuYWRkRXZlbnRMaXN0ZW5lciggXCJwcm9ncmVzc1wiLCBlID0+XG4gICAgICAgICAgICAgICAgZGF0YS5vblByb2dyZXNzKCBlLmxlbmd0aENvbXB1dGFibGUgPyBNYXRoLmZsb29yKCAoIGUubG9hZGVkIC8gZS50b3RhbCApICogMTAwICkgOiAwICkgXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIFsgNTAwLCA0MDQsIDQwMSBdLmluY2x1ZGVzKCB0aGlzLnN0YXR1cyApXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHJlamVjdCggdGhpcy5yZXNwb25zZSA/IEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2UgKSA6IHRoaXMuc3RhdHVzIClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmVzb2x2ZSggSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZSApIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkYXRhLm1ldGhvZCA9IGRhdGEubWV0aG9kIHx8IFwiZ2V0XCJcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBgLyR7ZGF0YS5yZXNvdXJjZX1gICsgKCBkYXRhLmlkID8gYC8ke2RhdGEuaWR9YCA6ICcnIClcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5tZXRob2QgPT09IFwiZ2V0XCIgfHwgZGF0YS5tZXRob2QgPT09IFwib3B0aW9uc1wiICkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcXMgPSBkYXRhLnFzID8gYD8ke3dpbmRvdy5lbmNvZGVVUklDb21wb25lbnQoIGRhdGEucXMgKX1gIDogJycgXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vcGVuKCBkYXRhLm1ldGhvZCwgYCR7cGF0aH0ke3FzfWAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhlYWRlcnMoIHJlcSwgZGF0YS5oZWFkZXJzIClcbiAgICAgICAgICAgICAgICAgICAgcmVxLnNlbmQobnVsbClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXEub3BlbiggZGF0YS5tZXRob2QudG9VcHBlckNhc2UoKSwgcGF0aCwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJzKCByZXEsIGRhdGEuaGVhZGVycyApXG4gICAgICAgICAgICAgICAgICAgIHJlcS5zZW5kKCBkYXRhLmRhdGEgfHwgbnVsbCApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGEub25Qcm9ncmVzcyApIGRhdGEub25Qcm9ncmVzcyggJ3NlbnQnIClcbiAgICAgICAgICAgIH0gKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldEhlYWRlcnMoIHJlcSwgaGVhZGVycz17fSApIHtcbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCBcIkFjY2VwdFwiLCBoZWFkZXJzLmFjY2VwdCB8fCAnYXBwbGljYXRpb24vanNvbicgKVxuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIGhlYWRlcnMuY29udGVudFR5cGUgfHwgJ3RleHQvcGxhaW4nIClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZmFjdG9yeSggZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoIHRoaXMuUmVxdWVzdCwgeyB9ICkuY29uc3RydWN0b3IoIGRhdGEgKVxuICAgIH0sXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBpZiggIVhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kQXNCaW5hcnkgKSB7XG4gICAgICAgICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmRBc0JpbmFyeSA9IGZ1bmN0aW9uKHNEYXRhKSB7XG4gICAgICAgICAgICB2YXIgbkJ5dGVzID0gc0RhdGEubGVuZ3RoLCB1aThEYXRhID0gbmV3IFVpbnQ4QXJyYXkobkJ5dGVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIG5JZHggPSAwOyBuSWR4IDwgbkJ5dGVzOyBuSWR4KyspIHtcbiAgICAgICAgICAgICAgdWk4RGF0YVtuSWR4XSA9IHNEYXRhLmNoYXJDb2RlQXQobklkeCkgJiAweGZmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kKHVpOERhdGEpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yeS5iaW5kKHRoaXMpXG4gICAgfVxuXG59ICksIHsgfSApLmNvbnN0cnVjdG9yKClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSgge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICB0aGlzLnJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIikuaXRlbSgwKSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgY3JlYXRlKCBuYW1lLCBvcHRzICkge1xuICAgICAgICBjb25zdCBsb3dlciA9IG5hbWVcbiAgICAgICAgbmFtZSA9ICggbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSkgKS5yZXBsYWNlKCAnLScsICcnIClcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICAgICAgICAgIHRoaXMuVmlld3NbIG5hbWUgXSxcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oIHtcbiAgICAgICAgICAgICAgICBIZWFkZXI6IHsgdmFsdWU6IHRoaXMuSGVhZGVyIH0sXG4gICAgICAgICAgICAgICAgVG9hc3Q6IHsgdmFsdWU6IHRoaXMuVG9hc3QgfSxcbiAgICAgICAgICAgICAgICBuYW1lOiB7IHZhbHVlOiBuYW1lIH0sXG4gICAgICAgICAgICAgICAgZmFjdG9yeTogeyB2YWx1ZTogdGhpcyB9LFxuICAgICAgICAgICAgICAgIHJhbmdlOiB7IHZhbHVlOiB0aGlzLnJhbmdlIH0sXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHsgdmFsdWU6IHRoaXMuVGVtcGxhdGVzWyBuYW1lIF0sIHdyaXRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHsgdmFsdWU6IHRoaXMuTW9kZWxzWyBuYW1lIF0gfSxcbiAgICAgICAgICAgICAgICB1c2VyOiB7IHZhbHVlOiB0aGlzLlVzZXIgfVxuICAgICAgICAgICAgfSApXG4gICAgICAgICkuY29uc3RydWN0b3IoIG9wdHMgKVxuICAgIH0sXG5cbn0sIHtcbiAgICBIZWFkZXI6IHsgdmFsdWU6IHJlcXVpcmUoJy4uL3ZpZXdzL0hlYWRlcicpIH0sXG4gICAgTW9kZWxzOiB7IHZhbHVlOiByZXF1aXJlKCcuLi8uTW9kZWxNYXAnKSB9LFxuICAgIFRlbXBsYXRlczogeyB2YWx1ZTogcmVxdWlyZSgnLi4vLlRlbXBsYXRlTWFwJykgfSxcbiAgICBUb2FzdDogeyB2YWx1ZTogcmVxdWlyZSgnLi4vdmlld3MvVG9hc3QnKSB9LFxuICAgIFVzZXI6IHsgdmFsdWU6IHJlcXVpcmUoJy4uL21vZGVscy9Vc2VyJykgfSxcbiAgICBWaWV3czogeyB2YWx1ZTogcmVxdWlyZSgnLi4vLlZpZXdNYXAnKSB9XG59IClcbiIsInJlcXVpcmUoJy4vcG9seWZpbGwnKVxuXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi9tb2RlbHMvVXNlcicpLFxuICAgIHJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyksXG4gICAgb25Mb2FkID0gbmV3IFByb21pc2UoIHJlc29sdmUgPT4gd2luZG93Lm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKSApXG5cblVzZXIub24oICdsb2dvdXQnLCAoKSA9PiByb3V0ZXIub25Mb2dvdXQoKSApXG5cblByb21pc2UuYWxsKCBbIFVzZXIuZ2V0KCksIG9uTG9hZCBdIClcbi50aGVuKCAoKSA9PiByb3V0ZXIuaW5pdGlhbGl6ZSgpIClcbi5jYXRjaCggZSA9PiBjb25zb2xlLmxvZyggYEVycm9yIGluaXRpYWxpemluZyBjbGllbnQgLT4gJHtlLnN0YWNrIHx8IGV9YCApIClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fLmpzJyksIHtcblxuICAgIGRhdGE6IFtcbiAgICAgICAgJ2hvbWUnLFxuICAgICAgICAncHJvamVjdHMnLFxuICAgICAgICAnY29udGFjdCdcbiAgICBdXG5cbn0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18uanMnKSwge1xuXG4gICAgaXNMb2dnZWRJbigpIHtcbiAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuaWQgKSAgXG4gICAgfSxcblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYGh6eT07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMSBHTVQ7YFxuXG4gICAgICAgIHRoaXMuZGF0YSA9IHsgfVxuICAgICAgICB0aGlzLmVtaXQoJ2xvZ291dCcpXG4gICAgfSxcblxufSApLCB7IHJlc291cmNlOiB7IHZhbHVlOiAnbWUnIH0gfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHsgfSwgcmVxdWlyZSgnLi4vLi4vLi4vbGliL01vZGVsJyksIHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICAgIFhocjogcmVxdWlyZSgnLi4vWGhyJyksXG5cbiAgICBhZGQoIGRhdHVtICkge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCggZGF0dW0gKVxuXG4gICAgICAgIGlmKCB0aGlzLnN0b3JlQnkgKSB0aGlzLl9zdG9yZU9uZSggZGF0dW0gKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSB0aGlzLmRhdGFbIHRoaXMubWV0YS5rZXkgXVxuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAnREVMRVRFJywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGlkOiBrZXlWYWx1ZSB9IClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMubWV0YS5rZXlcblxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdHVtID0gdGhpcy5kYXRhLmZpbmQoIGRhdHVtID0+IGRhdHVtWyBrZXkgXSA9PSBrZXlWYWx1ZSApXG5cbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdG9yZSApIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoIHRoaXMuc3RvcmUgKS5mb3JFYWNoKCBhdHRyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdID0gdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0uZmlsdGVyKCBkYXR1bSA9PiBkYXR1bVsga2V5IF0gIT0ga2V5VmFsdWUgKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdLmxlbmd0aCA9PT0gMCApIHsgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0gPSB1bmRlZmluZWQgfVxuICAgICAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCBkYXR1bSA9PiBkYXR1bVsga2V5IF0gIT0ga2V5VmFsdWUgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLmRhdGEgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgZ2l0KCBhdHRyICkgeyByZXR1cm4gdGhpcy5kYXRhWyBhdHRyIF0gfSxcblxuICAgIGdldCggb3B0cz17IHF1ZXJ5Ont9IH0gKSB7XG4gICAgICAgIGlmKCBvcHRzLnF1ZXJ5IHx8IHRoaXMucGFnaW5hdGlvbiApIE9iamVjdC5hc3NpZ24oIG9wdHMucXVlcnksIHRoaXMucGFnaW5hdGlvbiApXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogb3B0cy5tZXRob2QgfHwgJ2dldCcsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIHFzOiBvcHRzLnF1ZXJ5ID8gSlNPTi5zdHJpbmdpZnkoIG9wdHMucXVlcnkgKSA6IHVuZGVmaW5lZCB9IClcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHtcblxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQoIG9wdHMucGFyc2UgPyBvcHRzLnBhcnNlKCByZXNwb25zZSwgb3B0cy5zdG9yZUJ5ICkgOiByZXNwb25zZSApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKCBvcHRzLnN0b3JlQnkgKSB0aGlzLl9yZXNldFN0b3JlKCBvcHRzLnN0b3JlQnkgKVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMucGFyc2UgPyB0aGlzLnBhcnNlKCByZXNwb25zZSwgb3B0cy5zdG9yZUJ5ICkgOiByZXNwb25zZVxuICAgICAgICAgICAgICAgIGlmKCBvcHRzLnN0b3JlQnkgKSB0aGlzLl9zdG9yZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZ290JylcblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzcG9uc2UgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdnZXQnLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBxczogSlNPTi5zdHJpbmdpZnkoIHsgY291bnRPbmx5OiB0cnVlIH0gKSB9IClcbiAgICAgICAgLnRoZW4oICggeyByZXN1bHQgfSApID0+IHtcbiAgICAgICAgICAgIHRoaXMubWV0YS5jb3VudCA9IHJlc3VsdFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzdWx0IClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGdpdCggYXR0ciApIHsgcmV0dXJuIHRoaXMuZGF0YVsgYXR0ciBdIH0sXG5cbiAgICBwYXRjaCggaWQsIGRhdGEgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdwYXRjaCcsIGlkLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBkYXRhOiBKU09OLnN0cmluZ2lmeSggZGF0YSB8fCB0aGlzLmRhdGEgKSB9IClcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSA/IHRoaXMuZGF0YS5jb25jYXQoIHJlc3BvbnNlICkgOiBbIHJlc3BvbnNlIF1cbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdG9yZSApIE9iamVjdC5rZXlzKCB0aGlzLnN0b3JlICkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLl9zdG9yZSggcmVzcG9uc2UsIGF0dHIgKSApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3BvbnNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIF9wdXQoIGtleVZhbHVlLCBkYXRhICkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZGF0YS5maW5kKCBkYXR1bSA9PiBkYXR1bVsgdGhpcy5tZXRhLmtleSBdID09IGtleVZhbHVlICk7XG4gICAgICAgIGlmKCBpdGVtICkgaXRlbSA9IGRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHB1dCggaWQsIGRhdGEgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdwdXQnLCBpZCwgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgZGF0YTogSlNPTi5zdHJpbmdpZnkoIGRhdGEgKSB9IClcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNwb25zZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBwb3N0KCBtb2RlbCApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ3Bvc3QnLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBkYXRhOiBKU09OLnN0cmluZ2lmeSggbW9kZWwgfHwgdGhpcy5kYXRhICkgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHsgXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhID8gdGhpcy5kYXRhLmNvbmNhdCggcmVzcG9uc2UgKSA6IFsgcmVzcG9uc2UgXVxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlICkgT2JqZWN0LmtleXMoIHRoaXMuc3RvcmUgKS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlKCByZXNwb25zZSwgYXR0ciApIClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzcG9uc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzcG9uc2UgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgcmVtb3ZlKCBpdGVtICkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YS5maW5kSW5kZXgoIGRhdHVtID0+IEpTT04uc3RyaW5naWZ5KCBkYXR1bSApID09PSBKU09OLnN0cmluZ2lmeSggaXRlbSApIClcblxuICAgICAgICBpZiggaW5kZXggPT09IC0xICkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZSggaW5kZXgsIDEgKVxuICAgIH0sXG5cbiAgICBzZXQoIGF0dHIsIHZhbHVlICkge1xuICAgICAgICB0aGlzLmRhdGFbIGF0dHIgXSA9IHZhbHVlXG4gICAgICAgIHRoaXMuZW1pdCggYCR7YXR0cn1DaGFuZ2VkYCApXG4gICAgfSxcblxuICAgIHZhbGlkYXRlKCBkYXRhICkge1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlXG4gICAgICAgXG4gICAgICAgIE9iamVjdC5rZXlzKCBkYXRhICkuZm9yRWFjaCggbmFtZSA9PiB7IFxuICAgICAgICAgICAgY29uc3QgdmFsID0gZGF0YVsgbmFtZSBdLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlcy5maW5kKCBhdHRyID0+IGF0dHIubmFtZSA9PT0gbmFtZSApICAgXG4gICAgXG4gICAgICAgICAgICBpZiggYXR0cmlidXRlID09PSB1bmRlZmluZWQgfHwgIWF0dHJpYnV0ZS52YWxpZGF0ZSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbIG5hbWUgXSA9IHZhbFxuICAgICAgICAgICAgICAgICAgICA/IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB2YWwudHJpbSgpIFxuICAgICAgICAgICAgICAgICAgICAgICAgIDogdmFsXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9IGVsc2UgaWYoIHZhbGlkICYmICF0aGlzLnZhbGlkYXRlRGF0dW0oIGF0dHJpYnV0ZSwgdmFsICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCAndmFsaWRhdGlvbkVycm9yJywgYXR0cmlidXRlIClcbiAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2UgaWYoIHRoaXMudmFsaWRhdGVEYXR1bSggYXR0cmlidXRlLCB2YWwgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbIG5hbWUgXSA9IHZhbC50cmltKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApXG5cbiAgICAgICAgcmV0dXJuIHZhbGlkXG4gICAgfSxcblxuICAgIHZhbGlkYXRlRGF0dW0oIGF0dHIsIHZhbCApIHtcbiAgICAgICAgcmV0dXJuIGF0dHIudmFsaWRhdGUuY2FsbCggdGhpcywgdmFsLnRyaW0oKSApXG4gICAgfVxuXG59IClcbiIsImlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPSAnZnVuY3Rpb24nKSB7XG4gIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0YXJnZXQgPT0gbnVsbCkgeyAvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgIH1cblxuICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblxuICAgICAgaWYgKG5leHRTb3VyY2UgIT0gbnVsbCkgeyAvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgLy8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXh0U291cmNlLCBuZXh0S2V5KSkge1xuICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG87XG4gIH07XG59XG5cbi8vaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvY2xvc2VzdFxuaWYgKHdpbmRvdy5FbGVtZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IFxuICAgIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAodGhpcy5kb2N1bWVudCB8fCB0aGlzLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocyksXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgZWwgPSB0aGlzO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSBlbCkge307XG4gICAgICAgIH0gd2hpbGUgKChpIDwgMCkgJiYgKGVsID0gZWwucGFyZW50RWxlbWVudCkpOyBcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG59XG5cbi8vaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcbmNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZVBvbHlmaWxsID0gKCgpID0+IHtcbiAgICBsZXQgY2xvY2sgPSBEYXRlLm5vdygpO1xuXG4gICAgcmV0dXJuIChjYWxsYmFjaykgPT4ge1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAoY3VycmVudFRpbWUgLSBjbG9jayA+IDE2KSB7XG4gICAgICAgICAgICBjbG9jayA9IGN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgY2FsbGJhY2soY3VycmVudFRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9seWZpbGwoY2FsbGJhY2spO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVBvbHlmaWxsXG5cbnJlcXVpcmUoJ3Ntb290aHNjcm9sbC1wb2x5ZmlsbCcpLnBvbHlmaWxsKClcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gdHJ1ZVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vbGliL015T2JqZWN0JyksIHtcbiAgICBcbiAgICBWaWV3RmFjdG9yeTogcmVxdWlyZSgnLi9mYWN0b3J5L1ZpZXcnKSxcbiAgICBcbiAgICBWaWV3czogcmVxdWlyZSgnLi8uVmlld01hcCcpLFxuXG4gICAgU2luZ2xldG9uczogWyAnSGVhZGVyJyBdLFxuXG4gICAgaW5pdGlhbGl6ZSgpIHtcblxuICAgICAgICB0aGlzLmNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpXG5cbiAgICAgICAgdGhpcy5WaWV3RmFjdG9yeS5jb25zdHJ1Y3RvcigpO1xuXG4gICAgICAgIHRoaXMuU2luZ2xldG9ucy5mb3JFYWNoKCBuYW1lID0+IHRoaXMuVmlld3NbbmFtZV0uY29uc3RydWN0b3IoIHsgZmFjdG9yeTogdGhpcy5WaWV3RmFjdG9yeSB9ICkgKVxuXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gdGhpcy5oYW5kbGUuYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuVmlld3MuSGVhZGVyLm9uKCAnbmF2aWdhdGUnLCByb3V0ZSA9PiB0aGlzLm5hdmlnYXRlKCByb3V0ZSApIClcblxuICAgICAgICB0aGlzLmZvb3RlciA9IHRoaXMuVmlld0ZhY3RvcnkuY3JlYXRlKCAnZm9vdGVyJywgeyBpbnNlcnRpb246IHsgZWw6IGRvY3VtZW50LmJvZHkgfSB9IClcblxuICAgICAgICB0aGlzLmhhbmRsZSgpXG4gICAgfSxcblxuICAgIGhhbmRsZSgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVyKCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5zbGljZSgxKSApXG4gICAgfSxcblxuICAgIGhhbmRsZXIoIHBhdGggKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhdGhUb1ZpZXcoIHBhdGhbMF0gKSxcbiAgICAgICAgICAgIHZpZXcgPSB0aGlzLlZpZXdzWyBuYW1lIF0gPyBuYW1lIDogJ2hvbWUnXG5cbiAgICAgICAgaWYoIHZpZXcgPT09IHRoaXMuY3VycmVudFZpZXcgKSByZXR1cm4gdGhpcy52aWV3c1sgdmlldyBdLm9uTmF2aWdhdGlvbiggcGF0aC5zbGljZSgxKSApXG5cbiAgICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpXG5cbiAgICAgICAgUHJvbWlzZS5hbGwoIE9iamVjdC5rZXlzKCB0aGlzLnZpZXdzICkubWFwKCB2aWV3ID0+IHRoaXMudmlld3NbIHZpZXcgXS5oaWRlKCkgKSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB2aWV3XG5cbiAgICAgICAgICAgIGlmKCB0aGlzLnZpZXdzWyB2aWV3IF0gKSByZXR1cm4gdGhpcy52aWV3c1sgdmlldyBdLm9uTmF2aWdhdGlvbiggcGF0aCApXG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3c1sgdmlldyBdID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5WaWV3RmFjdG9yeS5jcmVhdGUoIHZpZXcsIHsgaW5zZXJ0aW9uOiB7IGVsOiB0aGlzLmNvbnRlbnRDb250YWluZXIgfSwgcGF0aCB9IClcbiAgICAgICAgICAgICAgICAgICAgLm9uKCAnbmF2aWdhdGUnLCAoIHJvdXRlLCBvcHRpb25zICkgPT4gdGhpcy5uYXZpZ2F0ZSggcm91dGUsIG9wdGlvbnMgKSApXG4gICAgICAgICAgICAgICAgICAgIC5vbiggJ2RlbGV0ZWQnLCAoKSA9PiBkZWxldGUgdGhpcy52aWV3c1sgdmlldyBdIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSApXG4gICAgICAgIC5jYXRjaCggdGhpcy5FcnJvciApXG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvb3Rlci5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoICdoaWRkZW4nLCB2aWV3ID09PSAnQWRtaW4nIClcbiAgICB9LFxuXG4gICAgbmF2aWdhdGUoIGxvY2F0aW9uLCBvcHRpb25zPXt9ICkge1xuICAgICAgICBpZiggb3B0aW9ucy5yZXBsYWNlIHx8IG9wdGlvbnMudXAgKSB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX1gLnNwbGl0KCcvJylcbiAgICAgICAgICAgIHBhdGgucG9wKClcbiAgICAgICAgICAgIGlmKCBvcHRpb25zLnJlcGxhY2UgKSBwYXRoLnB1c2goIGxvY2F0aW9uIClcbiAgICAgICAgICAgIGxvY2F0aW9uID0gcGF0aC5qb2luKCcvJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKCBvcHRpb25zLmFwcGVuZCApIHsgbG9jYXRpb24gPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9LyR7bG9jYXRpb259YCB9XG5cbiAgICAgICAgaWYoIGxvY2F0aW9uICE9PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKSBoaXN0b3J5LnB1c2hTdGF0ZSgge30sICcnLCBsb2NhdGlvbiApXG4gICAgICAgIGlmKCAhb3B0aW9ucy5zaWxlbnQgKSB0aGlzLmhhbmRsZSgpXG4gICAgfSxcblxuICAgIG9uTG9nb3V0KCkge1xuICAgICAgICBQcm9taXNlLmFsbCggT2JqZWN0LmtleXMoIHRoaXMudmlld3MgKS5tYXAoIHZpZXcgPT4gdGhpcy52aWV3c1sgdmlldyBdLmRlbGV0ZSgpICkgKVxuICAgICAgICAudGhlbiggKCkgPT4geyB0aGlzLmN1cnJlbnRWaWV3ID0gdW5kZWZpbmVkOyByZXR1cm4gdGhpcy5oYW5kbGUoKSB9IClcbiAgICAgICAgLmNhdGNoKCB0aGlzLkVycm9yIClcbiAgICB9LFxuXG4gICAgcGF0aFRvVmlldyggcGF0aCApIHtcbiAgICAgICAgY29uc3QgaHlwaGVuU3BsaXQgPSBwYXRoLnNwbGl0KCctJylcbiAgICAgICAgcmV0dXJuIGh5cGhlblNwbGl0Lm1hcCggaXRlbSA9PiB0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlciggaXRlbSApICkuam9pbignJylcbiAgICB9LFxuXG4gICAgc2Nyb2xsVG9Ub3AoKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGwoIHsgdG9wOiAwLCBsZWZ0OiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSApXG4gICAgfVxuXG59ICksIHsgY3VycmVudFZpZXc6IHsgdmFsdWU6ICcnLCB3cml0YWJsZTogdHJ1ZSB9LCB2aWV3czogeyB2YWx1ZTogeyB9IH0gfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXycpLCB7XG5cbiAgICBwb3N0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLm9uKCAnaW1nTG9hZGVkJywgZWwgPT4ge1xuICAgICAgICAgICAgaWYoICFlbC5wYXJlbnROb2RlICkgcmV0dXJuXG4gICAgICAgICAgICBlbC5wYXJlbnROb2RlLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9IClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBzaXplKCkge1xuICAgICAgICBpZiggdGhpcy5tb2JpbGUgPT09IHVuZGVmaW5lZCApIHRoaXMubW9iaWxlID0gZmFsc2VcblxuICAgICAgICBsZXQgaW1hZ2UgPSAnZm9vdGVyLWltYWdlLmpwZydcblxuICAgICAgICBpZiAoIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY3cHgpXCIpLm1hdGNoZXMgKSB7XG4gICAgICAgICAgICBpbWFnZSA9ICdmb290ZXItaW1hZ2UtbW9iaWxlLmpwZydcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxzLmZvb3RlckltYWdlLmlubmVySFRNTCA9ICcnXG5cbiAgICAgICAgdGhpcy5zbHVycFRlbXBsYXRlKCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxpbWcgZGF0YS1zcmM9XCIke3RoaXMuRm9ybWF0LkltYWdlU3JjKCBpbWFnZSApfVwiLz5gLFxuICAgICAgICAgICAgaW5zZXJ0aW9uOiB7IGVsOiB0aGlzLmVscy5mb290ZXJJbWFnZSB9XG4gICAgICAgIH0gKVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHtcblxuICAgIFVzZXI6IHJlcXVpcmUoJy4uL21vZGVscy9Vc2VyJyksXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgbmF2TGlzdDogJ2NsaWNrJ1xuICAgIH0sXG5cbiAgICBpbnNlcnRpb24oKSB7IHJldHVybiB7IGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpLCBtZXRob2Q6ICdpbnNlcnRCZWZvcmUnIH0gfSxcblxuICAgIG5hbWU6ICdIZWFkZXInLFxuXG4gICAgb25OYXZMaXN0Q2xpY2soZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxuICAgICAgICBpZiggdGFyZ2V0LnRhZ05hbWUgIT09ICdTUEFOJyApIHJldHVyblxuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZW1pdCggJ25hdmlnYXRlJywgYC8ke3RhcmdldC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpfWAgKVxuICAgIH0sXG5cbiAgICBvbkxvZ291dENsaWNrKCkge1xuICAgICAgICB0aGlzLlVzZXIubG9nb3V0KClcbiAgICB9LFxuXG4gICAgb25Vc2VyTG9naW4oKSB7XG4gICAgICAgIHRoaXMuZWxzLnByb2ZpbGVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykgICAgICAgIFxuICAgICAgICB0aGlzLmVscy5uYW1lLnRleHRDb250ZW50ID0gdGhpcy5Vc2VyLmRhdGEubmFtZSB8fCB0aGlzLlVzZXIuZGF0YS5lbWFpbFxuICAgIH0sXG5cbiAgICBvblVzZXJMb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuZWxzLnByb2ZpbGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykgICAgICAgIFxuICAgICAgICB0aGlzLmVscy5uYW1lLnRleHRDb250ZW50ID0gJydcbiAgICB9LFxuXG4gICAgcG9zdFJlbmRlcigpIHtcblxuICAgICAgICBpZiggdGhpcy5Vc2VyLmlzTG9nZ2VkSW4oKSApIHRoaXMub25Vc2VyTG9naW4oKVxuXG4gICAgICAgIHRoaXMuVXNlci5vbiggJ2dvdCcsICgpID0+IHsgaWYoIHRoaXMuVXNlci5pc0xvZ2dlZEluKCkgKSB0aGlzLm9uVXNlckxvZ2luKCkgfSApXG4gICAgICAgIHRoaXMuVXNlci5vbiggJ2xvZ291dCcsICgpID0+IHRoaXMub25Vc2VyTG9nb3V0KCkgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9IZWFkZXInKVxuXG59ICksIHsgfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHsgfSwgcmVxdWlyZSgnLi4vLi4vLi4vbGliL015T2JqZWN0JyksIHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICAgICQoIGVsLCBzZWxlY3RvciApIHsgcmV0dXJuIEFycmF5LmZyb20oIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICkgKSB9LFxuXG4gICAgVGVtcGxhdGVDb250ZXh0OiByZXF1aXJlKCcuLi9UZW1wbGF0ZUNvbnRleHQnKSxcblxuICAgIE1vZGVsOiByZXF1aXJlKCcuLi9tb2RlbHMvX19wcm90b19fJyksXG5cbiAgICBPcHRpbWl6ZWRSZXNpemU6IHJlcXVpcmUoJy4vbGliL09wdGltaXplZFJlc2l6ZScpLFxuICAgIFxuICAgIFhocjogcmVxdWlyZSgnLi4vWGhyJyksXG5cbiAgICBiaW5kRXZlbnQoIGtleSwgZXZlbnQsIGVsICkge1xuICAgICAgICBjb25zdCBlbHMgPSBlbCA/IFsgZWwgXSA6IEFycmF5LmlzQXJyYXkoIHRoaXMuZWxzWyBrZXkgXSApID8gdGhpcy5lbHNbIGtleSBdIDogWyB0aGlzLmVsc1sga2V5IF0gXSxcbiAgICAgICAgICAgbmFtZSA9IHRoaXMuZ2V0RXZlbnRNZXRob2ROYW1lKCBrZXksIGV2ZW50IClcblxuICAgICAgICBpZiggIXRoaXNbIGBfJHtuYW1lfWAgXSApIHRoaXNbIGBfJHtuYW1lfWAgXSA9IGUgPT4gdGhpc1sgbmFtZSBdKGUpXG5cbiAgICAgICAgZWxzLmZvckVhY2goIGVsID0+IGVsLmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50IHx8ICdjbGljaycsIHRoaXNbIGBfJHtuYW1lfWAgXSApIClcbiAgICB9LFxuXG4gICAgY29uc3RydWN0b3IoIG9wdHM9e30gKSB7XG5cbiAgICAgICAgaWYoIG9wdHMuZXZlbnRzICkgeyBPYmplY3QuYXNzaWduKCB0aGlzLmV2ZW50cywgb3B0cy5ldmVudHMgKTsgZGVsZXRlIG9wdHMuZXZlbnRzOyB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oIHRoaXMsIG9wdHMgKVxuXG4gICAgICAgIHRoaXMuc3Vidmlld0VsZW1lbnRzID0gWyBdXG5cbiAgICAgICAgaWYoIHRoaXMucmVxdWlyZXNMb2dpbiAmJiAoICF0aGlzLnVzZXIuaXNMb2dnZWRJbigpICkgKSByZXR1cm4gdGhpcy5oYW5kbGVMb2dpbigpXG4gICAgICAgIGlmKCB0aGlzLnVzZXIgJiYgIXRoaXMuaXNBbGxvd2VkKCB0aGlzLnVzZXIgKSApIHJldHVybiB0aGlzLnNjb290QXdheSgpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6ZSgpLnJlbmRlcigpXG4gICAgfSxcblxuICAgIGRlbGVnYXRlRXZlbnRzKCBrZXksIGVsICkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB0aGlzLmV2ZW50c1trZXldXG5cbiAgICAgICAgaWYoIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7IHRoaXMuYmluZEV2ZW50KCBrZXksIHRoaXMuZXZlbnRzW2tleV0sIGVsICkgfVxuICAgICAgICBlbHNlIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmV2ZW50c1trZXldICkgKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1sga2V5IF0uZm9yRWFjaCggZXZlbnRPYmogPT4gdGhpcy5iaW5kRXZlbnQoIGtleSwgZXZlbnRPYmogKSApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudCgga2V5LCB0aGlzLmV2ZW50c1trZXldLmV2ZW50IClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWxldGUoIHsgc2lsZW50IH0gPSB7IHNpbGVudDogZmFsc2UgfSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVscy5jb250YWluZXIsXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gY29udGFpbmVyLnBhcmVudE5vZGVcbiAgICAgICAgICAgIGlmKCBjb250YWluZXIgJiYgcGFyZW50ICkgcGFyZW50LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKVxuICAgICAgICAgICAgaWYoICFzaWxlbnQgKSB0aGlzLmVtaXQoJ2RlbGV0ZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBldmVudHM6IHt9LFxuXG4gICAgZmFkZUluSW1hZ2UoIGVsICkge1xuICAgICAgICBlbC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoICdpbWdMb2FkZWQnLCBlbCApXG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJylcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSggJ3NyYycsIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSApXG4gICAgfSxcblxuICAgIGdldEV2ZW50TWV0aG9kTmFtZSgga2V5LCBldmVudCApIHsgcmV0dXJuIGBvbiR7dGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoa2V5KX0ke3RoaXMuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGV2ZW50KX1gIH0sXG5cbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLmVscy5jb250YWluZXIgfSxcblxuICAgIGdldFRlbXBsYXRlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgcnYgPSBPYmplY3QuYXNzaWduKCB0aGlzLnVzZXIgPyB7IHVzZXI6IHRoaXMudXNlci5kYXRhIH0gOiB7fSApXG5cbiAgICAgICAgaWYoIHRoaXMubW9kZWwgKSB7XG4gICAgICAgICAgICBydi5tb2RlbCA9IHRoaXMubW9kZWwuZGF0YVxuXG4gICAgICAgICAgICBpZiggdGhpcy5tb2RlbC5tZXRhICkgcnYubWV0YSA9IHRoaXMubW9kZWwubWV0YVxuICAgICAgICAgICAgaWYoIHRoaXMubW9kZWwuYXR0cmlidXRlcyApIHJ2LmF0dHJpYnV0ZXMgPSB0aGlzLm1vZGVsLmF0dHJpYnV0ZXNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCB0aGlzLnRlbXBsYXRlT3B0aW9ucyApIHJ2Lm9wdHMgPSB0eXBlb2YgdGhpcy50ZW1wbGF0ZU9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyB0aGlzLnRlbXBsYXRlT3B0aW9ucygpIDogdGhpcy50ZW1wbGF0ZU9wdGlvbnMgfHwge31cblxuICAgICAgICByZXR1cm4gcnZcbiAgICB9LFxuXG4gICAgaGFuZGxlTG9naW4oKSB7XG4gICAgICAgIHRoaXMuZmFjdG9yeS5jcmVhdGUoICdsb2dpbicsIHsgaW5zZXJ0aW9uOiB7IGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpIH0gfSApXG4gICAgICAgIC5vbiggXCJsb2dnZWRJblwiLCAoKSA9PiB0aGlzLm9uTG9naW4oKSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgaGlkZSggaXNTbG93ICkge1xuICAgICAgICAvL3ZpZXdzIG5vdCBoaWRpbmcgY29uc2lzdGVudGx5IHdpdGggdGhpc1xuICAgICAgICAvL2lmKCAhdGhpcy5lbHMgfHwgdGhpcy5pc0hpZGluZyApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIHRoaXMuaXNIaWRpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlRWwoIHRoaXMuZWxzLmNvbnRhaW5lciwgaXNTbG93IClcbiAgICAgICAgLnRoZW4oICgpID0+IFByb21pc2UucmVzb2x2ZSggdGhpcy5oaWRpbmcgPSBmYWxzZSApIClcbiAgICB9LFxuICAgIFxuICAgIGhpZGVTeW5jKCkgeyB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7IHJldHVybiB0aGlzIH0sXG5cbiAgICBfaGlkZUVsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93ICkge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCAnYW5pbWF0aW9uZW5kJywgdGhpc1sgaGFzaCBdIClcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgYW5pbWF0ZS1vdXQkeyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgZGVsZXRlIHRoaXNbaGFzaF1cbiAgICAgICAgdGhpcy5pc0hpZGluZyA9IGZhbHNlXG4gICAgICAgIHJlc29sdmUoKVxuICAgIH0sXG5cbiAgICBoaWRlRWwoIGVsLCBpc1Nsb3cgKSB7XG4gICAgICAgIGlmKCB0aGlzLmlzSGlkZGVuKCBlbCApICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cbiAgICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgaGFzaCA9IGAke3RpbWV9SGlkZWBcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzWyBoYXNoIF0gPSBlID0+IHRoaXMuX2hpZGVFbCggZWwsIHJlc29sdmUsIGhhc2gsIGlzU2xvdyApXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCAnYW5pbWF0aW9uZW5kJywgdGhpc1sgaGFzaCBdIClcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYGFuaW1hdGUtb3V0JHsgaXNTbG93ID8gJy1zbG93JyA6ICcnfWApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBodG1sVG9GcmFnbWVudCggc3RyICkge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWN0b3J5LnJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCggc3RyIClcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIHRoaXMsIHsgZWxzOiB7IH0sIHNsdXJwOiB7IGF0dHI6ICdkYXRhLWpzJywgdmlldzogJ2RhdGEtdmlldycsIG5hbWU6ICdkYXRhLW5hbWUnLCBpbWc6ICdkYXRhLXNyYycgfSwgdmlld3M6IHsgfSB9IClcbiAgICB9LFxuXG4gICAgaW5zZXJ0VG9Eb20oIGZyYWdtZW50LCBvcHRpb25zICkge1xuICAgICAgICBjb25zdCBpbnNlcnRpb24gPSB0eXBlb2Ygb3B0aW9ucy5pbnNlcnRpb24gPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmluc2VydGlvbigpIDogb3B0aW9ucy5pbnNlcnRpb247XG5cbiAgICAgICAgaW5zZXJ0aW9uLm1ldGhvZCA9PT0gJ2luc2VydEJlZm9yZSdcbiAgICAgICAgICAgID8gaW5zZXJ0aW9uLmVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBmcmFnbWVudCwgaW5zZXJ0aW9uLmVsIClcbiAgICAgICAgICAgIDogaW5zZXJ0aW9uLmVsWyBpbnNlcnRpb24ubWV0aG9kIHx8ICdhcHBlbmRDaGlsZCcgXSggZnJhZ21lbnQgKVxuICAgIH0sXG5cbiAgICBpc0FsbG93ZWQoIHVzZXIgKSB7XG4gICAgICAgIGlmKCAhdGhpcy5yZXF1aXJlc1JvbGUgKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgXG4gICAgICAgIGNvbnN0IHVzZXJSb2xlcyA9IG5ldyBTZXQoIHVzZXIuZGF0YS5yb2xlcyApXG5cbiAgICAgICAgaWYoIHR5cGVvZiB0aGlzLnJlcXVpcmVzUm9sZSA9PT0gJ3N0cmluZycgKSByZXR1cm4gdXNlclJvbGVzLmhhcyggdGhpcy5yZXF1aXJlc1JvbGUgKVxuXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLnJlcXVpcmVzUm9sZSApICkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5yZXF1aXJlc1JvbGUuZmluZCggcm9sZSA9PiB1c2VyUm9sZXMuaGFzKCByb2xlICkgKVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG4gICAgXG4gICAgaXNIaWRkZW4oIGVsICkgeyByZXR1cm4gZWwgPyBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpIDogdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykgfSxcblxuICAgIG9uTG9naW4oKSB7XG5cbiAgICAgICAgaWYoICF0aGlzLmlzQWxsb3dlZCggdGhpcy51c2VyICkgKSByZXR1cm4gdGhpcy5zY29vdEF3YXkoKVxuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpLnJlbmRlcigpXG4gICAgfSxcblxuICAgIG9uTmF2aWdhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvdygpXG4gICAgfSxcblxuICAgIHNob3dOb0FjY2VzcygpIHtcbiAgICAgICAgYWxlcnQoXCJObyBwcml2aWxlZ2VzLCBzb25cIilcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgcG9zdFJlbmRlcigpIHsgcmV0dXJuIHRoaXMgfSxcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYoIHRoaXMuZGF0YSApIHRoaXMubW9kZWwgPSBPYmplY3QuY3JlYXRlKCB0aGlzLk1vZGVsLCB7IH0gKS5jb25zdHJ1Y3RvciggdGhpcy5kYXRhIClcblxuICAgICAgICB0aGlzLnNsdXJwVGVtcGxhdGUoIHtcbiAgICAgICAgICAgIGluc2VydGlvbjogdGhpcy5pbnNlcnRpb24gfHwgeyBlbDogZG9jdW1lbnQuYm9keSB9LFxuICAgICAgICAgICAgaXNWaWV3OiB0cnVlLFxuICAgICAgICAgICAgc3RvcmVGcmFnbWVudDogdGhpcy5zdG9yZUZyYWdtZW50LFxuICAgICAgICAgICAgdGVtcGxhdGU6IFJlZmxlY3QuYXBwbHkoIHRoaXMudGVtcGxhdGUsIHRoaXMuVGVtcGxhdGVDb250ZXh0LCBbIHRoaXMuZ2V0VGVtcGxhdGVPcHRpb25zKCkgXSApXG4gICAgICAgIH0gKVxuXG4gICAgICAgIHRoaXMucmVuZGVyU3Vidmlld3MoKVxuXG4gICAgICAgIGlmKCB0aGlzLnNpemUgKSB7IHRoaXMuc2l6ZSgpOyB0aGlzLk9wdGltaXplZFJlc2l6ZS5hZGQoIHRoaXMuc2l6ZS5iaW5kKHRoaXMpICkgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RSZW5kZXIoKVxuICAgIH0sXG5cbiAgICByZW1vdmVDaGlsZHJlbiggZWwgKSB7XG4gICAgICAgIHdoaWxlKCBlbC5maXJzdENoaWxkICkgZWwucmVtb3ZlQ2hpbGQoIGVsLmZpcnN0Q2hpbGQgKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICByZW5kZXJTdWJ2aWV3cygpIHtcbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMuZm9yRWFjaCggb2JqID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBvYmoubmFtZSB8fCBvYmoudmlld1xuXG4gICAgICAgICAgICBsZXQgb3B0cyA9IHsgfVxuXG4gICAgICAgICAgICBpZiggdGhpcy5WaWV3cyAmJiB0aGlzLlZpZXdzWyBvYmoudmlldyBdICkgb3B0cyA9IHR5cGVvZiB0aGlzLlZpZXdzWyBvYmoudmlldyBdID09PSBcIm9iamVjdFwiID8gdGhpcy5WaWV3c1sgb2JqLnZpZXcgXSA6IFJlZmxlY3QuYXBwbHkoIHRoaXMuVmlld3NbIG9iai52aWV3IF0sIHRoaXMsIFsgXSApXG4gICAgICAgICAgICBpZiggdGhpcy5WaWV3cyAmJiB0aGlzLlZpZXdzWyBuYW1lIF0gKSBvcHRzID0gdHlwZW9mIHRoaXMuVmlld3NbIG5hbWUgXSA9PT0gXCJvYmplY3RcIiA/IHRoaXMuVmlld3NbIG5hbWUgXSA6IFJlZmxlY3QuYXBwbHkoIHRoaXMuVmlld3NbIG5hbWUgXSwgdGhpcywgWyBdIClcblxuICAgICAgICAgICAgdGhpcy52aWV3c1sgbmFtZSBdID0gdGhpcy5mYWN0b3J5LmNyZWF0ZSggb2JqLnZpZXcsIE9iamVjdC5hc3NpZ24oIHsgaW5zZXJ0aW9uOiB7IGVsOiBvYmouZWwsIG1ldGhvZDogJ2luc2VydEJlZm9yZScgfSB9LCBvcHRzICkgKVxuXG4gICAgICAgICAgICBpZiggdGhpcy5ldmVudHMudmlld3MgKSB7XG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuZXZlbnRzLnZpZXdzWyBuYW1lIF0gKSB0aGlzLmV2ZW50cy52aWV3c1sgbmFtZSBdLmZvckVhY2goIGFyciA9PiB0aGlzLnZpZXdzWyBuYW1lIF0ub24oIGFyclswXSwgZXZlbnREYXRhID0+IFJlZmxlY3QuYXBwbHkoIGFyclsxXSwgdGhpcywgWyBldmVudERhdGEgXSApICkgKVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIHRoaXMuZXZlbnRzLnZpZXdzWyBvYmoudmlldyBdICkgdGhpcy5ldmVudHMudmlld3NbIG9iai52aWV3IF0uZm9yRWFjaCggYXJyID0+IHRoaXMudmlld3NbIG5hbWUgXS5vbiggYXJyWzBdLCBldmVudERhdGEgPT4gUmVmbGVjdC5hcHBseSggYXJyWzFdLCB0aGlzLCBbIGV2ZW50RGF0YSBdICkgKSApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBvYmouZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSApIHRoaXMudmlld3NbbmFtZV0uaGlkZVN5bmMoKVxuICAgICAgICAgICAgb2JqLmVsLnJlbW92ZSgpXG4gICAgICAgIH0gKVxuXG4gICAgICAgIHRoaXMuc3Vidmlld0VsZW1lbnRzID0gWyBdXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgc2Nvb3RBd2F5KCkge1xuICAgICAgICB0aGlzLlRvYXN0LnNob3dNZXNzYWdlKCAnZXJyb3InLCAnWW91IGFyZSBub3QgYWxsb3dlZCBoZXJlLicpXG4gICAgICAgIC5jYXRjaCggZSA9PiB7IHRoaXMuRXJyb3IoIGUgKTsgdGhpcy5lbWl0KCAnbmF2aWdhdGUnLCBgL2AgKSB9IClcbiAgICAgICAgLnRoZW4oICgpID0+IHRoaXMuZW1pdCggJ25hdmlnYXRlJywgYC9gICkgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHNob3coIGlzU2xvdyApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0VsKCB0aGlzLmVscy5jb250YWluZXIsIGlzU2xvdyApXG4gICAgfSxcblxuICAgIHNob3dTeW5jKCkgeyB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7IHJldHVybiB0aGlzIH0sXG5cbiAgICBfc2hvd0VsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93ICkge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCAnYW5pbWF0aW9uZW5kJywgdGhpc1toYXNoXSApXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYGFuaW1hdGUtaW4keyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgZGVsZXRlIHRoaXNbIGhhc2ggXVxuICAgICAgICByZXNvbHZlKClcbiAgICB9LFxuXG4gICAgc2hvd0VsKCBlbCwgaXNTbG93ICkge1xuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBoYXNoID0gYCR7dGltZX1TaG93YFxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzWyBoYXNoIF0gPSBlID0+IHRoaXMuX3Nob3dFbCggZWwsIHJlc29sdmUsIGhhc2gsIGlzU2xvdyApXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCAnYW5pbWF0aW9uZW5kJywgdGhpc1sgaGFzaCBdIClcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGBhbmltYXRlLWluJHsgaXNTbG93ID8gJy1zbG93JyA6ICcnfWApXG4gICAgICAgIH0gKSAgICAgICAgXG4gICAgfSxcblxuICAgIHNsdXJwRWwoIGVsICkge1xuICAgICAgICBjb25zdCBrZXkgPSBlbC5nZXRBdHRyaWJ1dGUoIHRoaXMuc2x1cnAuYXR0ciApIHx8ICdjb250YWluZXInXG5cbiAgICAgICAgaWYoIGtleSA9PT0gJ2NvbnRhaW5lcicgKSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCB0aGlzLm5hbWUgKVxuICAgICAgICAgICAgaWYoIHRoaXMua2xhc3MgKSBlbC5jbGFzc0xpc3QuYWRkKCB0aGlzLmtsYXNzIClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxzWyBrZXkgXSA9IEFycmF5LmlzQXJyYXkoIHRoaXMuZWxzWyBrZXkgXSApXG4gICAgICAgICAgICA/IHRoaXMuZWxzWyBrZXkgXS5jb25jYXQoIGVsIClcbiAgICAgICAgICAgIDogKCB0aGlzLmVsc1sga2V5IF0gIT09IHVuZGVmaW5lZCApXG4gICAgICAgICAgICAgICAgPyBbIHRoaXMuZWxzWyBrZXkgXSwgZWwgXVxuICAgICAgICAgICAgICAgIDogZWxcblxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5zbHVycC5hdHRyKVxuXG4gICAgICAgIGlmKCB0aGlzLmV2ZW50c1sga2V5IF0gKSB0aGlzLmRlbGVnYXRlRXZlbnRzKCBrZXksIGVsIClcbiAgICB9LFxuXG4gICAgc2x1cnBUZW1wbGF0ZSggb3B0aW9ucyApIHtcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gdGhpcy5odG1sVG9GcmFnbWVudCggb3B0aW9ucy50ZW1wbGF0ZSApLFxuICAgICAgICAgICAgc2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC5hdHRyfV1gLFxuICAgICAgICAgICAgdmlld1NlbGVjdG9yID0gYFske3RoaXMuc2x1cnAudmlld31dYCxcbiAgICAgICAgICAgIGltZ1NlbGVjdG9yID0gYFske3RoaXMuc2x1cnAuaW1nfV1gLFxuICAgICAgICAgICAgZmlyc3RFbCA9IGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKVxuXG4gICAgICAgIGlmKCBvcHRpb25zLmlzVmlldyB8fCBmaXJzdEVsLmdldEF0dHJpYnV0ZSggdGhpcy5zbHVycC5hdHRyICkgKSB0aGlzLnNsdXJwRWwoIGZpcnN0RWwgKVxuICAgICAgICBBcnJheS5mcm9tKCBmcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKCBgJHtzZWxlY3Rvcn0sICR7dmlld1NlbGVjdG9yfSwgJHtpbWdTZWxlY3Rvcn1gICkgKS5mb3JFYWNoKCBlbCA9PiB7XG4gICAgICAgICAgICBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLmF0dHIgKSApIHsgdGhpcy5zbHVycEVsKCBlbCApIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIGVsLmhhc0F0dHJpYnV0ZSggdGhpcy5zbHVycC5pbWcgKSApIHRoaXMuZmFkZUluSW1hZ2UoIGVsIClcbiAgICAgICAgICAgIGVsc2UgaWYoIGVsLmhhc0F0dHJpYnV0ZSggdGhpcy5zbHVycC52aWV3ICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMucHVzaCggeyBlbCwgdmlldzogZWwuZ2V0QXR0cmlidXRlKHRoaXMuc2x1cnAudmlldyksIG5hbWU6IGVsLmdldEF0dHJpYnV0ZSh0aGlzLnNsdXJwLm5hbWUpIH0gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IClcbiAgIFxuICAgICAgICBpZiggb3B0aW9ucy5zdG9yZUZyYWdtZW50ICkgcmV0dXJuIE9iamVjdC5hc3NpZ24oIHRoaXMsIHsgZnJhZ21lbnQgfSApXG5cbiAgICAgICAgdGhpcy5pbnNlcnRUb0RvbSggZnJhZ21lbnQsIG9wdGlvbnMgKVxuXG4gICAgICAgIGlmKCBvcHRpb25zLnJlbmRlclN1YnZpZXdzICkgdGhpcy5yZW5kZXJTdWJ2aWV3cygpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgdW5iaW5kRXZlbnQoIGtleSwgZXZlbnQsIGVsICkge1xuICAgICAgICBjb25zdCBlbHMgPSBlbCA/IFsgZWwgXSA6IEFycmF5LmlzQXJyYXkoIHRoaXMuZWxzWyBrZXkgXSApID8gdGhpcy5lbHNbIGtleSBdIDogWyB0aGlzLmVsc1sga2V5IF0gXSxcbiAgICAgICAgICAgbmFtZSA9IHRoaXMuZ2V0RXZlbnRNZXRob2ROYW1lKCBrZXksIGV2ZW50IClcblxuICAgICAgICBlbHMuZm9yRWFjaCggZWwgPT4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciggZXZlbnQgfHwgJ2NsaWNrJywgdGhpc1sgYF8ke25hbWV9YCBdICkgKVxuICAgIH1cbn0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCB7XG5cbiAgICBhZGQoY2FsbGJhY2spIHtcbiAgICAgICAgaWYoICF0aGlzLmNhbGxiYWNrcy5sZW5ndGggKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpIClcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjaylcbiAgICB9LFxuXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgaWYoIHRoaXMucnVubmluZyApIHJldHVyblxuXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy5ydW5DYWxsYmFja3MuYmluZCh0aGlzKSApXG4gICAgICAgICAgICA6IHNldFRpbWVvdXQoIHRoaXMucnVuQ2FsbGJhY2tzLCA2NiApXG4gICAgfSxcblxuICAgIHJ1bkNhbGxiYWNrcygpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrcy5maWx0ZXIoIGNhbGxiYWNrID0+IGNhbGxiYWNrKCkgKVxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZSBcbiAgICB9XG5cbn0sIHsgY2FsbGJhY2tzOiB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogW10gfSwgcnVubmluZzogeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IGZhbHNlIH0gfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyByZXR1cm5cbmA8Zm9vdGVyPlxuICAgIDxkaXY+XG4gICAgICAgIDxzcGFuPkNvbnRhY3Q8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgPGEgaHJlZj1cIm1haWx0bzppbmZvQGZ1dHVyZWRheXMuaW9cIj5pbmZvQGZ1dHVyZWRheXMuaW88L2E+XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgICA8c3Bhbj5Db3B5cmlnaHQ8L3NwYW4+XG4gICAgICAgIDxzcGFuPm5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSBGdXR1cmVEYXlzIFNvZnR3YXJlPC9zcGFuPlxuICAgIDwvZGl2PlxuPC9mb290ZXI+YFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggeyBtb2RlbCB9ICkge1xuY29uc3QgbmF2T3B0aW9ucyA9IG1vZGVsLmZvckVhY2goIGRhdHVtID0+IGA8c3Bhbj4ke3RoaXMuQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGRhdHVtKX08L3NwYW4+YCApXG5yZXR1cm4gYDxuYXY+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuPkZ1dHVyZTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPkRheXM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlNvZnR3YXJlPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBkYXRhLWpzPVwibmF2TGlzdFwiPiR7bmF2T3B0aW9uc308L2Rpdj5cbjwvbmF2PlxuYFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7IH0sIHJlcXVpcmUoJy4vTXlPYmplY3QnKSwge1xuXG4gICAgQ3JlYXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlciggdGhpcy5hdHRyaWJ1dGVzLCBhdHRyID0+ICggeyBbYXR0ci5uYW1lXTogdHlwZW9mIGF0dHIuZGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJyA/IGF0dHIuZGVmYXVsdCgpIDogYXR0ci5kZWZhdWx0IH0gKSApXG4gICAgfSxcblxuICAgIGF0dHJpYnV0ZXM6IFsgXSxcblxuICAgIGRhdGE6IHsgfSxcblxuICAgIGNvbnN0cnVjdG9yKCBkYXRhPXt9LCBvcHRzPXt9ICkge1xuICAgICAgICBPYmplY3QuYXNzaWduKCB0aGlzLCB7IHN0b3JlOiB7IH0sIGRhdGEgfSwgb3B0cyApXG5cbiAgICAgICAgaWYoIHRoaXMuc3RvcmVCeSApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBrZXkgPT4gdGhpcy5zdG9yZVsga2V5IF0gPSB7IH0gKVxuICAgICAgICAgICAgdGhpcy5fc3RvcmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgbWV0YTogeyB9LFxuXG4gICAgc29ydCggb3B0cyApIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IE9iamVjdC5rZXlzKCBvcHRzIClbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9IG9wdHNbYXR0cl07XG5cbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoICggYSwgYiApID0+XG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgID8gYVthdHRyXSA8IGJbYXR0cl0gPyAtMSA6IDFcbiAgICAgICAgICAgICAgICA6IGJbYXR0cl0gPCBhW2F0dHJdID8gLTEgOiAxXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBfcmVzZXRTdG9yZSggc3RvcmVCeSApIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHsgfVxuICAgICAgICBzdG9yZUJ5LmZvckVhY2goIGF0dHIgPT4gdGhpcy5zdG9yZVsgYXR0ciBdID0geyB9IClcbiAgICAgICAgdGhpcy5zdG9yZUJ5ID0gc3RvcmVCeVxuICAgIH0sXG5cbiAgICBfc3RvcmUoIGRhdGEgKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXMuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goIGRhdHVtID0+IHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSApIClcbiAgICB9LFxuXG4gICAgX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSB7XG4gICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdID1cbiAgICAgICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdXG4gICAgICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KCB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSApXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0uY29uY2F0KCBkYXR1bSApXG4gICAgICAgICAgICAgICAgICAgIDpbIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdLCBkYXR1bSBdXG4gICAgICAgICAgICAgICAgOiBkYXR1bVxuICAgIH0sXG5cbiAgICBfc3RvcmVPbmUoIGRhdHVtICkge1xuICAgICAgICB0aGlzLnN0b3JlQnkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLl9zdG9yZUF0dHIoIGRhdHVtLCBhdHRyICkgKVxuICAgIH1cblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGVyciA9PiB7IGNvbnNvbGUubG9nKCBlcnIuc3RhY2sgfHwgZXJyICkgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBjYXBpdGFsaXplRmlyc3RMZXR0ZXI6IHN0cmluZyA9PiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSksXG5cbiAgICBnZXRJbnRSYW5nZSggaW50ICkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSggQXJyYXkoIGludCApLmtleXMoKSApXG4gICAgfSxcblxuICAgIGdldFJhbmRvbUluY2x1c2l2ZUludGVnZXIoIG1pbiwgbWF4ICkge1xuICAgICAgICBtaW4gPSBNYXRoLmNlaWwobWluKVxuICAgICAgICBtYXggPSBNYXRoLmZsb29yKG1heClcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cbiAgICB9LFxuXG4gICAgb21pdCggb2JqLCBrZXlzICkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoIG9iaiApLmZpbHRlcigga2V5ID0+ICFrZXlzLmluY2x1ZGVzKCBrZXkgKSApLnJlZHVjZSggKCBtZW1vLCBrZXkgKSA9PiBPYmplY3QuYXNzaWduKCBtZW1vLCB7IFtrZXldOiBvYmpba2V5XSB9ICksIHsgfSApXG4gICAgfSxcblxuICAgIHBpY2soIG9iaiwga2V5cyApIHtcbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKCAoIG1lbW8sIGtleSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIHsgW2tleV06IG9ialtrZXldIH0gKSwgeyB9IClcbiAgICB9LFxuXG4gICAgcmVkdWNlciggYXJyLCBmbiApIHsgcmV0dXJuIGFyci5yZWR1Y2UoICggbWVtbywgaXRlbSwgaSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIGZuKCBpdGVtLCBpICkgKSwgeyB9ICkgfSxcblxuICAgIHNodWZmbGVBcnJheSggYXJyICkge1xuICAgICAgICBjb25zdCBydiA9IEFycmF5LmZyb20oIGFyciApXG4gICAgICAgXG4gICAgICAgIHJ2LmZvckVhY2goICggaXRlbSwgaSApID0+IHtcbiAgICAgICAgICAgIGlmKCBpID09PSBydi5sZW5ndGggLSAxICkgcmV0dXJuIFxuICAgICAgICAgICAgY29uc3QgaW50ID0gdGhpcy5nZXRSYW5kb21JbmNsdXNpdmVJbnRlZ2VyKCBpLCBydi5sZW5ndGggLSAxICksXG4gICAgICAgICAgICAgICAgaG9sZGVyID0gcnZbIGkgXVxuXG4gICAgICAgICAgICBydltpXSA9IHJ2W2ludF1cbiAgICAgICAgICAgIHJ2W2ludF0gPSBob2xkZXJcbiAgICAgICAgfSApXG5cbiAgICAgICAgcmV0dXJuIHJ2XG4gICAgfSxcblxuICAgIEVycm9yOiByZXF1aXJlKCcuL015RXJyb3InKSxcblxuICAgIFA6ICggZnVuLCBhcmdzPVsgXSwgdGhpc0FyZyApID0+XG4gICAgICAgIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IFJlZmxlY3QuYXBwbHkoIGZ1biwgdGhpc0FyZyB8fCB0aGlzLCBhcmdzLmNvbmNhdCggKCBlLCAuLi5jYWxsYmFjayApID0+IGUgPyByZWplY3QoZSkgOiByZXNvbHZlKGNhbGxiYWNrKSApICkgKSxcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHsgcmV0dXJuIHRoaXMgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLyogc21vb3Roc2Nyb2xsIHYwLjQuMCAtIDIwMTcgLSBEdXN0YW4gS2FzdGVuLCBKZXJlbWlhcyBNZW5pY2hlbGxpIC0gTUlUIExpY2Vuc2UgKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKlxuICAgKiBhbGlhc2VzXG4gICAqIHc6IHdpbmRvdyBnbG9iYWwgb2JqZWN0XG4gICAqIGQ6IGRvY3VtZW50XG4gICAqL1xuICB2YXIgdyA9IHdpbmRvdztcbiAgdmFyIGQgPSBkb2N1bWVudDtcblxuICAvKipcbiAgICogaW5kaWNhdGVzIGlmIGEgdGhlIGN1cnJlbnQgYnJvd3NlciBpcyBtYWRlIGJ5IE1pY3Jvc29mdFxuICAgKiBAbWV0aG9kIGlzTWljcm9zb2Z0QnJvd3NlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50XG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNNaWNyb3NvZnRCcm93c2VyKHVzZXJBZ2VudCkge1xuICAgIHZhciB1c2VyQWdlbnRQYXR0ZXJucyA9IFsnTVNJRSAnLCAnVHJpZGVudC8nLCAnRWRnZS8nXTtcblxuICAgIHJldHVybiBuZXcgUmVnRXhwKHVzZXJBZ2VudFBhdHRlcm5zLmpvaW4oJ3wnKSkudGVzdCh1c2VyQWdlbnQpO1xuICB9XG5cbiAgIC8vIHBvbHlmaWxsXG4gIGZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIC8vIHJldHVybiBpZiBzY3JvbGwgYmVoYXZpb3IgaXMgc3VwcG9ydGVkIGFuZCBwb2x5ZmlsbCBpcyBub3QgZm9yY2VkXG4gICAgaWYgKCdzY3JvbGxCZWhhdmlvcicgaW4gZC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICAgICYmIHcuX19mb3JjZVNtb290aFNjcm9sbFBvbHlmaWxsX18gIT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnbG9iYWxzXG4gICAgdmFyIEVsZW1lbnQgPSB3LkhUTUxFbGVtZW50IHx8IHcuRWxlbWVudDtcbiAgICB2YXIgU0NST0xMX1RJTUUgPSA0Njg7XG5cbiAgICAvKlxuICAgICAqIElFIGhhcyByb3VuZGluZyBidWcgcm91bmRpbmcgZG93biBjbGllbnRIZWlnaHQgYW5kIGNsaWVudFdpZHRoIGFuZFxuICAgICAqIHJvdW5kaW5nIHVwIHNjcm9sbEhlaWdodCBhbmQgc2Nyb2xsV2lkdGggY2F1c2luZyBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgKiBvbiBoYXNTY3JvbGxhYmxlU3BhY2VcbiAgICAgKi9cbiAgICB2YXIgUk9VTkRJTkdfVE9MRVJBTkNFID0gaXNNaWNyb3NvZnRCcm93c2VyKHcubmF2aWdhdG9yLnVzZXJBZ2VudCkgPyAxIDogMDtcblxuICAgIC8vIG9iamVjdCBnYXRoZXJpbmcgb3JpZ2luYWwgc2Nyb2xsIG1ldGhvZHNcbiAgICB2YXIgb3JpZ2luYWwgPSB7XG4gICAgICBzY3JvbGw6IHcuc2Nyb2xsIHx8IHcuc2Nyb2xsVG8sXG4gICAgICBzY3JvbGxCeTogdy5zY3JvbGxCeSxcbiAgICAgIGVsZW1lbnRTY3JvbGw6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCB8fCBzY3JvbGxFbGVtZW50LFxuICAgICAgc2Nyb2xsSW50b1ZpZXc6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSB0aW1pbmcgbWV0aG9kXG4gICAgdmFyIG5vdyA9IHcucGVyZm9ybWFuY2UgJiYgdy5wZXJmb3JtYW5jZS5ub3dcbiAgICAgID8gdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3LnBlcmZvcm1hbmNlKVxuICAgICAgOiBEYXRlLm5vdztcblxuICAgIC8qKlxuICAgICAqIGNoYW5nZXMgc2Nyb2xsIHBvc2l0aW9uIGluc2lkZSBhbiBlbGVtZW50XG4gICAgICogQG1ldGhvZCBzY3JvbGxFbGVtZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2Nyb2xsRWxlbWVudCh4LCB5KSB7XG4gICAgICB0aGlzLnNjcm9sbExlZnQgPSB4O1xuICAgICAgdGhpcy5zY3JvbGxUb3AgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgcmVzdWx0IG9mIGFwcGx5aW5nIGVhc2UgbWF0aCBmdW5jdGlvbiB0byBhIG51bWJlclxuICAgICAqIEBtZXRob2QgZWFzZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlYXNlKGspIHtcbiAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGEgc21vb3RoIGJlaGF2aW9yIHNob3VsZCBiZSBhcHBsaWVkXG4gICAgICogQG1ldGhvZCBzaG91bGRCYWlsT3V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBmaXJzdEFyZ1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNob3VsZEJhaWxPdXQoZmlyc3RBcmcpIHtcbiAgICAgIGlmIChmaXJzdEFyZyA9PT0gbnVsbFxuICAgICAgICB8fCB0eXBlb2YgZmlyc3RBcmcgIT09ICdvYmplY3QnXG4gICAgICAgIHx8IGZpcnN0QXJnLmJlaGF2aW9yID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdhdXRvJ1xuICAgICAgICB8fCBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ2luc3RhbnQnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvbnVsbFxuICAgICAgICAvLyBvciBiZWhhdmlvciBpcyBhdXRvLCBpbnN0YW50IG9yIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBmaXJzdEFyZyA9PT0gJ29iamVjdCcgJiYgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdzbW9vdGgnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIGFuIG9iamVjdCBhbmQgYmVoYXZpb3IgaXMgc21vb3RoXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBiZWhhdmlvciBpcyBub3Qgc3VwcG9ydGVkXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnYmVoYXZpb3IgbWVtYmVyIG9mIFNjcm9sbE9wdGlvbnMgJ1xuICAgICAgICArIGZpcnN0QXJnLmJlaGF2aW9yXG4gICAgICAgICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgZW51bWVyYXRpb24gU2Nyb2xsQmVoYXZpb3IuJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBoYXMgc2Nyb2xsYWJsZSBzcGFjZSBpbiB0aGUgcHJvdmlkZWQgYXhpc1xuICAgICAqIEBtZXRob2QgaGFzU2Nyb2xsYWJsZVNwYWNlXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCBheGlzKSB7XG4gICAgICBpZiAoYXhpcyA9PT0gJ1knKSB7XG4gICAgICAgIHJldHVybiAoZWwuY2xpZW50SGVpZ2h0ICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgICAgICByZXR1cm4gKGVsLmNsaWVudFdpZHRoICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBhIHNjcm9sbGFibGUgb3ZlcmZsb3cgcHJvcGVydHkgaW4gdGhlIGF4aXNcbiAgICAgKiBAbWV0aG9kIGNhbk92ZXJmbG93XG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FuT3ZlcmZsb3coZWwsIGF4aXMpIHtcbiAgICAgIHZhciBvdmVyZmxvd1ZhbHVlID0gdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKVsnb3ZlcmZsb3cnICsgYXhpc107XG5cbiAgICAgIHJldHVybiBvdmVyZmxvd1ZhbHVlID09PSAnYXV0bycgfHwgb3ZlcmZsb3dWYWx1ZSA9PT0gJ3Njcm9sbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgY2FuIGJlIHNjcm9sbGVkIGluIGVpdGhlciBheGlzXG4gICAgICogQG1ldGhvZCBpc1Njcm9sbGFibGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Njcm9sbGFibGUoZWwpIHtcbiAgICAgIHZhciBpc1Njcm9sbGFibGVZID0gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCAnWScpICYmIGNhbk92ZXJmbG93KGVsLCAnWScpO1xuICAgICAgdmFyIGlzU2Nyb2xsYWJsZVggPSBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsICdYJykgJiYgY2FuT3ZlcmZsb3coZWwsICdYJyk7XG5cbiAgICAgIHJldHVybiBpc1Njcm9sbGFibGVZIHx8IGlzU2Nyb2xsYWJsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZHMgc2Nyb2xsYWJsZSBwYXJlbnQgb2YgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2QgZmluZFNjcm9sbGFibGVQYXJlbnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHJldHVybnMge05vZGV9IGVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNjcm9sbGFibGVQYXJlbnQoZWwpIHtcbiAgICAgIHZhciBpc0JvZHk7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuXG4gICAgICAgIGlzQm9keSA9IGVsID09PSBkLmJvZHk7XG4gICAgICB9IHdoaWxlIChpc0JvZHkgPT09IGZhbHNlICYmIGlzU2Nyb2xsYWJsZShlbCkgPT09IGZhbHNlKTtcblxuICAgICAgaXNCb2R5ID0gbnVsbDtcblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGYgaW52b2tlZCBmdW5jdGlvbiB0aGF0LCBnaXZlbiBhIGNvbnRleHQsIHN0ZXBzIHRocm91Z2ggc2Nyb2xsaW5nXG4gICAgICogQG1ldGhvZCBzdGVwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0ZXAoY29udGV4dCkge1xuICAgICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBjdXJyZW50WDtcbiAgICAgIHZhciBjdXJyZW50WTtcbiAgICAgIHZhciBlbGFwc2VkID0gKHRpbWUgLSBjb250ZXh0LnN0YXJ0VGltZSkgLyBTQ1JPTExfVElNRTtcblxuICAgICAgLy8gYXZvaWQgZWxhcHNlZCB0aW1lcyBoaWdoZXIgdGhhbiBvbmVcbiAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuXG4gICAgICAvLyBhcHBseSBlYXNpbmcgdG8gZWxhcHNlZCB0aW1lXG4gICAgICB2YWx1ZSA9IGVhc2UoZWxhcHNlZCk7XG5cbiAgICAgIGN1cnJlbnRYID0gY29udGV4dC5zdGFydFggKyAoY29udGV4dC54IC0gY29udGV4dC5zdGFydFgpICogdmFsdWU7XG4gICAgICBjdXJyZW50WSA9IGNvbnRleHQuc3RhcnRZICsgKGNvbnRleHQueSAtIGNvbnRleHQuc3RhcnRZKSAqIHZhbHVlO1xuXG4gICAgICBjb250ZXh0Lm1ldGhvZC5jYWxsKGNvbnRleHQuc2Nyb2xsYWJsZSwgY3VycmVudFgsIGN1cnJlbnRZKTtcblxuICAgICAgLy8gc2Nyb2xsIG1vcmUgaWYgd2UgaGF2ZSBub3QgcmVhY2hlZCBvdXIgZGVzdGluYXRpb25cbiAgICAgIGlmIChjdXJyZW50WCAhPT0gY29udGV4dC54IHx8IGN1cnJlbnRZICE9PSBjb250ZXh0LnkpIHtcbiAgICAgICAgdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcC5iaW5kKHcsIGNvbnRleHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzY3JvbGxzIHdpbmRvdyBvciBlbGVtZW50IHdpdGggYSBzbW9vdGggYmVoYXZpb3JcbiAgICAgKiBAbWV0aG9kIHNtb290aFNjcm9sbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5vZGV9IGVsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsLCB4LCB5KSB7XG4gICAgICB2YXIgc2Nyb2xsYWJsZTtcbiAgICAgIHZhciBzdGFydFg7XG4gICAgICB2YXIgc3RhcnRZO1xuICAgICAgdmFyIG1ldGhvZDtcbiAgICAgIHZhciBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgLy8gZGVmaW5lIHNjcm9sbCBjb250ZXh0XG4gICAgICBpZiAoZWwgPT09IGQuYm9keSkge1xuICAgICAgICBzY3JvbGxhYmxlID0gdztcbiAgICAgICAgc3RhcnRYID0gdy5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQ7XG4gICAgICAgIHN0YXJ0WSA9IHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBtZXRob2QgPSBvcmlnaW5hbC5zY3JvbGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxhYmxlID0gZWw7XG4gICAgICAgIHN0YXJ0WCA9IGVsLnNjcm9sbExlZnQ7XG4gICAgICAgIHN0YXJ0WSA9IGVsLnNjcm9sbFRvcDtcbiAgICAgICAgbWV0aG9kID0gc2Nyb2xsRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLy8gc2Nyb2xsIGxvb3Bpbmcgb3ZlciBhIGZyYW1lXG4gICAgICBzdGVwKHtcbiAgICAgICAgc2Nyb2xsYWJsZTogc2Nyb2xsYWJsZSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICBzdGFydFg6IHN0YXJ0WCxcbiAgICAgICAgc3RhcnRZOiBzdGFydFksXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE9SSUdJTkFMIE1FVEhPRFMgT1ZFUlJJREVTXG4gICAgLy8gdy5zY3JvbGwgYW5kIHcuc2Nyb2xsVG9cbiAgICB3LnNjcm9sbCA9IHcuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbC5jYWxsKFxuICAgICAgICAgIHcsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgICA6ICh3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldCksXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgaWYgcHJlc2VudCBvciBmYWxsYmFjayB0byBzY3JvbGxZXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgOiAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgOiAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxuICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgIDogKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gdy5zY3JvbGxCeVxuICAgIHcuc2Nyb2xsQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEJ5LmNhbGwoXG4gICAgICAgICAgdyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgOiAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgKHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0KSxcbiAgICAgICAgfn5hcmd1bWVudHNbMF0udG9wICsgKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIGFuZCBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUb1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCA9IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBpZiBvbmUgbnVtYmVyIGlzIHBhc3NlZCwgdGhyb3cgZXJyb3IgdG8gbWF0Y2ggRmlyZWZveCBpbXBsZW1lbnRhdGlvblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicgJiYgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1ZhbHVlIGNvdWxkblxcJ3QgYmUgY29udmVydGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcmlnaW5hbC5lbGVtZW50U2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICAvLyB1c2UgbGVmdCBwcm9wLCBmaXJzdCBudW1iZXIgYXJndW1lbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsTGVmdFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIC8vIHVzZSB0b3AgcHJvcCwgc2Vjb25kIGFyZ3VtZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbFRvcFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVmdCA9IGFyZ3VtZW50c1swXS5sZWZ0O1xuICAgICAgdmFyIHRvcCA9IGFyZ3VtZW50c1swXS50b3A7XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLFxuICAgICAgICB0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLnNjcm9sbExlZnQgOiB+fmxlZnQsXG4gICAgICAgIHR5cGVvZiB0b3AgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zY3JvbGxUb3AgOiB+fnRvcFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsQnlcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxCeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0XG4gICAgICAgICAgICA6IH5+YXJndW1lbnRzWzBdICsgdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3AgKyB0aGlzLnNjcm9sbFRvcFxuICAgICAgICAgICAgOiB+fmFyZ3VtZW50c1sxXSArIHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbCh7XG4gICAgICAgIGxlZnQ6IH5+YXJndW1lbnRzWzBdLmxlZnQgKyB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgIHRvcDogfn5hcmd1bWVudHNbMF0udG9wICsgdGhpcy5zY3JvbGxUb3AsXG4gICAgICAgIGJlaGF2aW9yOiBhcmd1bWVudHNbMF0uYmVoYXZpb3JcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxJbnRvVmlld1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEludG9WaWV3LmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1swXVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgdmFyIHNjcm9sbGFibGVQYXJlbnQgPSBmaW5kU2Nyb2xsYWJsZVBhcmVudCh0aGlzKTtcbiAgICAgIHZhciBwYXJlbnRSZWN0cyA9IHNjcm9sbGFibGVQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgY2xpZW50UmVjdHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICBpZiAoc2Nyb2xsYWJsZVBhcmVudCAhPT0gZC5ib2R5KSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluc2lkZSBwYXJlbnRcbiAgICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsTGVmdCArIGNsaWVudFJlY3RzLmxlZnQgLSBwYXJlbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsVG9wICsgY2xpZW50UmVjdHMudG9wIC0gcGFyZW50UmVjdHMudG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gcmV2ZWFsIHBhcmVudCBpbiB2aWV3cG9ydCB1bmxlc3MgaXMgZml4ZWRcbiAgICAgICAgaWYgKHcuZ2V0Q29tcHV0ZWRTdHlsZShzY3JvbGxhYmxlUGFyZW50KS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgICAgbGVmdDogcGFyZW50UmVjdHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogcGFyZW50UmVjdHMudG9wLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluIHZpZXdwb3J0XG4gICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgIGxlZnQ6IGNsaWVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgdG9wOiBjbGllbnRSZWN0cy50b3AsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gY29tbW9uanNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgcG9seWZpbGw6IHBvbHlmaWxsIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gZ2xvYmFsXG4gICAgcG9seWZpbGwoKTtcbiAgfVxuXG59KCkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vLi4vY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXycpLCB7XG5cbiAgICBUb2FzdE1lc3NhZ2U6IHJlcXVpcmUoJy4vVG9hc3RNZXNzYWdlJyksXG5cbiAgICBuYW1lOiAnVG9hc3QnLFxuXG4gICAgcG9zdFJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlcXVpcmVzTG9naW46IGZhbHNlLFxuXG4gICAgY3JlYXRlTWVzc2FnZSggdHlwZSwgbWVzc2FnZSApIHtcbiAgICAgICAgaWYoICF0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0gKSB0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0gPSBPYmplY3QuY3JlYXRlKCB0aGlzLlRvYXN0TWVzc2FnZSwge1xuICAgICAgICAgICAgaW5zZXJ0aW9uOiB7IHZhbHVlOiB7IGVsOiB0aGlzLmVscy5jb250YWluZXIgfSB9XG4gICAgICAgIH0gKS5jb25zdHJ1Y3RvcigpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXNbIG1lc3NhZ2UgXS5zaG93TWVzc2FnZSggdHlwZSwgbWVzc2FnZSApXG5cbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL1RvYXN0JylcblxufSApLCB7IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vLi4vY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXycpLCB7XG5cbiAgICBuYW1lOiAnVG9hc3RNZXNzYWdlJyxcblxuICAgIEljb25zOiB7XG4gICAgICAgIGVycm9yOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9saWIvZXJyb3InKSgpLFxuICAgICAgICBzdWNjZXNzOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9saWIvY2hlY2ttYXJrJykoKVxuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkge1xuXG4gICAgICAgIHRoaXMub24oICdzaG93bicsICgpID0+IHRoaXMuc3RhdHVzID0gJ3Nob3duJyApXG4gICAgICAgIHRoaXMub24oICdoaWRkZW4nLCAoKSA9PiB0aGlzLnN0YXR1cyA9ICdoaWRkZW4nIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICByZXF1aXJlc0xvZ2luOiBmYWxzZSxcblxuICAgIHNob3dNZXNzYWdlKCB0eXBlLCBtZXNzYWdlICkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgID0+IHtcbiAgICAgICAgICAgIGlmKCAvc2hvdy8udGVzdCggdGhpcy5zdGF0dXMgKSApIHRoaXMudGVhcmRvd24oKVxuXG4gICAgICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHZlXG5cbiAgICAgICAgICAgIGlmKCB0eXBlICE9PSAnZXJyb3InICkgdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1Y2Nlc3MnKVxuXG4gICAgICAgICAgICB0aGlzLmVscy5tZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5lbHMudGl0bGUudGV4dENvbnRlbnQgPSB0eXBlID09PSAnZXJyb3InID8gJ0Vycm9yJyA6ICdTdWNjZXNzJ1xuICAgICAgICAgICAgdGhpcy5zbHVycFRlbXBsYXRlKCB7IGluc2VydGlvbjogeyBlbDogdGhpcy5lbHMuaWNvbiB9LCB0ZW1wbGF0ZTogdHlwZSA9PT0gJ2Vycm9yJyA/IHRoaXMuSWNvbnMuZXJyb3IgOiB0aGlzLkljb25zLnN1Y2Nlc3MgfSApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ3Nob3dpbmcnXG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyggdHJ1ZSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gdGhpcy5oaWRlKCB0cnVlICkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHRoaXMudGVhcmRvd24oKSApXG4gICAgICAgICAgICAuY2F0Y2goIHJlamVjdCApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgICAgaWYoIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Y2Nlc3MnKSApIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzdWNjZXNzJylcbiAgICAgICAgdGhpcy5lbHMubWVzc2FnZS50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIHRoaXMuZWxzLm1lc3NhZ2UudGl0bGUgPSAnJ1xuICAgICAgICBpZiggdGhpcy5lbHMuaWNvbi5maXJzdENoaWxkICkgdGhpcy5lbHMuaWNvbi5yZW1vdmVDaGlsZCggdGhpcy5lbHMuaWNvbi5maXJzdENoaWxkIClcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uKClcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL1RvYXN0TWVzc2FnZScpXG5cbn0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiBgPGRpdj48L2Rpdj5gXG4iLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IFxuYDxkaXYgY2xhc3M9XCJoaWRkZW5cIj5cbiAgICA8ZGl2IGRhdGEtanM9XCJpY29uXCI+PC9kaXY+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBkYXRhLWpzPVwidGl0bGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBkYXRhLWpzPVwibWVzc2FnZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCIsIm1vZHVsZS5leHBvcnRzID0gKHA9e30pID0+IGA8c3ZnIHZlcnNpb249XCIxLjFcIiBkYXRhLWpzPVwiJHtwLm5hbWUgfHwgJ2NoZWNrbWFyayd9XCIgY2xhc3M9XCJjaGVja21hcmtcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuXHQgd2lkdGg9XCI5Ny42MTlweFwiIGhlaWdodD1cIjk3LjYxOHB4XCIgdmlld0JveD1cIjAgMCA5Ny42MTkgOTcuNjE4XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDk3LjYxOSA5Ny42MTg7XCJcblx0IHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG48Zz5cblx0PHBhdGggZD1cIk05Ni45MzksMTcuMzU4TDgzLjk2OCw1Ljk1OWMtMC4zOTgtMC4zNTItMC45MjctMC41MzEtMS40NDktMC40OTRDODEuOTksNS41LDgxLjQ5Niw1Ljc0Myw4MS4xNDYsNi4xNDJMMzQuMSw1OS42ODhcblx0XHRMMTcuMzcyLDM3LjU0N2MtMC4zMTktMC40MjItMC43OTQtMC43MDEtMS4zMTktMC43NzNjLTAuNTI0LTAuMDc4LTEuMDU5LDAuMDY0LTEuNDgxLDAuMzg1TDAuNzk0LDQ3LjU2N1xuXHRcdGMtMC44ODEsMC42NjYtMS4wNTYsMS45Mi0wLjM5LDIuODAxbDMwLjk3NCw0MC45OTZjMC4zNjIsMC40NzksMC45MjIsMC43NzEsMS41MjIsMC43OTNjMC4wMjQsMCwwLjA0OSwwLDAuMDczLDBcblx0XHRjMC41NzQsMCwxLjEyMi0wLjI0NiwxLjUwMy0wLjY4bDYyLjY0NC03MS4yOTdDOTcuODUsMTkuMzUxLDk3Ljc2OSwxOC4wODYsOTYuOTM5LDE3LjM1OHpcIi8+XG48L2c+PC9zdmc+YFxuIiwibW9kdWxlLmV4cG9ydHMgPSAocD17fSkgPT4gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIGRhdGEtanM9XCIke3AubmFtZSB8fCAnZXJyb3InfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMTguOTc4IDE4Ljk3OFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOC45NzggMTguOTc4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XHJcbjxnPlxyXG4gICAgPHBhdGggZD1cIk0xNi4wODgsMS42NzVjLTAuMTMzLTAuMTA0LTAuMzA2LTAuMTQ0LTAuNDctMC4xMDVjLTAuMDEzLDAuMDAyLTEuMjYxLDAuMjktMi41OTQsMC4yOVxyXG4gICAgICAgIGMtMS43ODgsMC0yLjc4OS0wLjQ3Ni0yLjk3NS0xLjQxNUM5Ljk5OSwwLjE5MSw5Ljc3OSwwLjAwNyw5LjUyMSwwYy0wLjI1Ny0wLjAwNy0wLjQ4NywwLjE2Ny0wLjU1LDAuNDE4XHJcbiAgICAgICAgQzguNzI3LDEuMzg2LDcuNzEsMS44NzcsNS45NSwxLjg3N2MtMS4zMzIsMC0yLjU3MS0wLjMwMi0yLjU4My0wLjMwNWMtMC4xNjYtMC4wNC0wLjM0LTAuMDA0LTAuNDc0LDAuMTAyXHJcbiAgICAgICAgQzIuNzYsMS43NzcsMi42ODEsMS45MzgsMi42ODEsMi4xMDh2NC44NjljMCwwLjA0LDAuMDA0LDAuMDc4LDAuMDEzLDAuMTE1YzAuMDU3LDEuNjQ3LDAuNjUsOC43MTQsNi41MjgsMTEuODIyXHJcbiAgICAgICAgYzAuMDgsMC4wNDMsMC4xNjksMC4wNjQsMC4yNTgsMC4wNjRjMC4wOTIsMCwwLjE4My0wLjAyMSwwLjI2Ni0wLjA2NmM1Ljc0LTMuMTM3LDYuNDQ1LTEwLjExNSw2LjUzMi0xMS43OTFcclxuICAgICAgICBjMC4wMTItMC4wNDYsMC4wMTktMC4wOTQsMC4wMTktMC4xNDRWMi4xMDhDMTYuMjk3LDEuOTM5LDE2LjIxOSwxLjc4LDE2LjA4OCwxLjY3NXogTTE1LjE5LDYuODU3XHJcbiAgICAgICAgYy0wLjAwNywwLjAzMS0wLjAxMiwwLjA2NC0wLjAxMywwLjA5N2MtMC4wNTMsMS4yOTgtMC41NzQsNy44MzItNS43MDEsMTAuODM4Yy01LjIxNS0yLjk2NS01LjY0Ni05LjUyNi01LjY4LTEwLjgzXHJcbiAgICAgICAgYzAtMC4wMjktMC4wMDQtMC4wNTgtMC4wMDktMC4wODVWMi43ODRDNC4zMjIsMi44NzcsNS4xMTIsMi45ODIsNS45NSwyLjk4MmMxLjkxMSwwLDIuOTY1LTAuNTQsMy41MzctMS4yMDhcclxuICAgICAgICBjMC41NTMsMC42NjEsMS41OTksMS4xOTEsMy41MzYsMS4xOTFjMC44MzksMCwxLjYzMS0wLjEwMSwyLjE2Ni0wLjE4OEwxNS4xOSw2Ljg1N0wxNS4xOSw2Ljg1N3pcIi8+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMC4yNDEsMTEuMjM3IDEwLjUyOSw1LjMxMSA4LjQ0OSw1LjMxMSA4Ljc1LDExLjIzNyBcdFx0XCIvPlxyXG4gICAgPHBhdGggZD1cIk05LjQ5NiwxMS44OTFjLTAuNjk0LDAtMS4xNzgsMC40OTgtMS4xNzgsMS4xODljMCwwLjY4MiwwLjQ3MSwxLjE5MSwxLjE3OCwxLjE5MVxyXG4gICAgICAgIGMwLjcwNiwwLDEuMTY0LTAuNTEsMS4xNjQtMS4xOTFDMTAuNjQ3LDEyLjM4OSwxMC4xODksMTEuODkxLDkuNDk2LDExLjg5MXpcIi8+XHJcbjwvZz48L3N2Zz5gXHJcbiJdfQ==
