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

        console.log(name);
        console.log(this.Models[name]);
        return Object.create(this.Views[name], Object.assign({
            Header: { value: this.Header },
            Toast: { value: this.Toast },
            name: { value: name },
            factory: { value: this },
            range: { value: this.range },
            template: { value: this.Templates[name], writable: true },
            model: { value: Object.create(this.Models[name]) },
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


    model: require('../models/Header'),

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

},{"../models/Header":8,"../models/User":9,"./__proto__":15,"./templates/Header":18}],15:[function(require,module,exports){
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

        console.log(this.model);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvLk1vZGVsTWFwLmpzIiwiY2xpZW50L2pzLy5UZW1wbGF0ZU1hcC5qcyIsImNsaWVudC9qcy8uVmlld01hcC5qcyIsImNsaWVudC9qcy9UZW1wbGF0ZUNvbnRleHQuanMiLCJjbGllbnQvanMvWGhyLmpzIiwiY2xpZW50L2pzL2ZhY3RvcnkvVmlldy5qcyIsImNsaWVudC9qcy9tYWluLmpzIiwiY2xpZW50L2pzL21vZGVscy9IZWFkZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL1VzZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL19fcHJvdG9fXy5qcyIsImNsaWVudC9qcy9wb2x5ZmlsbC5qcyIsImNsaWVudC9qcy9yb3V0ZXIuanMiLCJjbGllbnQvanMvdmlld3MvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL0hlYWRlci5qcyIsImNsaWVudC9qcy92aWV3cy9fX3Byb3RvX18uanMiLCJjbGllbnQvanMvdmlld3MvbGliL09wdGltaXplZFJlc2l6ZS5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL3RlbXBsYXRlcy9IZWFkZXIuanMiLCJsaWIvTW9kZWwuanMiLCJsaWIvTXlFcnJvci5qcyIsImxpYi9NeU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL3Ntb290aHNjcm9sbC1wb2x5ZmlsbC9kaXN0L3Ntb290aHNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL1RvYXN0LmpzIiwibm9kZV9tb2R1bGVzL3RvYXN0L3ZpZXdzL3RlbXBsYXRlcy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9jaGVja21hcmsuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWU7QUFDYixTQUFRLFFBQVEsaUJBQVIsQ0FESztBQUVkLE9BQU0sUUFBUSxlQUFSO0FBRlEsQ0FBZjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFNBQVEsUUFBUSwwQkFBUixDQURLO0FBRWQsU0FBUSxRQUFRLDBCQUFSO0FBRk0sQ0FBZjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFNBQVEsUUFBUSxnQkFBUixDQURLO0FBRWQsU0FBUSxRQUFRLGdCQUFSLENBRk07QUFHZCxRQUFPLFFBQVEsZUFBUjtBQUhPLENBQWY7Ozs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7O0FBRWIsMkJBQXVCO0FBQUEsZUFBVSxPQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLFdBQWpCLEtBQWlDLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FBM0M7QUFBQSxLQUZWOztBQUliLGNBQVUsSUFBSSxLQUFLLFlBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7QUFDeEMsZUFBTyxVQURpQztBQUV4QyxrQkFBVSxLQUY4QjtBQUd4QywrQkFBdUI7QUFIaUIsS0FBaEMsQ0FKRzs7QUFVYixnQkFWYSx3QkFVQyxLQVZELEVBVVEsS0FWUixFQVVlLElBVmYsRUFVc0I7QUFDL0IsWUFBTSxXQUFXLE1BQU0sS0FBTixLQUFnQixNQUFoQixJQUEwQixRQUFPLE1BQU0sS0FBYixNQUF1QixRQUFsRTs7QUFFQSxZQUFNLFFBQVEsTUFBTSxLQUFOLEtBQWdCLFVBQWhCLG1HQUNzRixLQUFLLFFBQUwsQ0FBZSxLQUFmLENBRHRGLG9CQUFkOztBQUlBLFlBQU0sVUFBVSxNQUFNLEtBQU4sS0FBZ0IsU0FBaEIsR0FDVixDQUFFLEVBQUUsT0FBTyxNQUFULEVBQWlCLE1BQU0sTUFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaGNBLE9BQU8sT0FBUCxHQUFpQixPQUFPLE1BQVAsQ0FBZSxPQUFPLE1BQVAsQ0FBZSxFQUFmLEVBQW1CLFFBQVEsb0NBQVIsQ0FBbkIsRUFBa0U7O0FBRTlGLGtCQUFjLFFBQVEsZ0JBQVIsQ0FGZ0Y7O0FBSTlGLFVBQU0sT0FKd0Y7O0FBTTlGLGNBTjhGLHdCQU1qRjtBQUNULGFBQUssUUFBTCxHQUFnQixFQUFoQjs7QUFFQSxlQUFPLElBQVA7QUFDSCxLQVY2Rjs7O0FBWTlGLG1CQUFlLEtBWitFOztBQWM5RixpQkFkOEYseUJBYy9FLElBZCtFLEVBY3pFLE9BZHlFLEVBYy9EO0FBQzNCLFlBQUksQ0FBQyxLQUFLLFFBQUwsQ0FBZSxPQUFmLENBQUwsRUFBZ0MsS0FBSyxRQUFMLENBQWUsT0FBZixJQUEyQixPQUFPLE1BQVAsQ0FBZSxLQUFLLFlBQXBCLEVBQWtDO0FBQ3pGLHVCQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksS0FBSyxHQUFMLENBQVMsU0FBZixFQUFUO0FBRDhFLFNBQWxDLEVBRXZELFdBRnVELEVBQTNCOztBQUloQyxlQUFPLEtBQUssUUFBTCxDQUFlLE9BQWYsRUFBeUIsV0FBekIsQ0FBc0MsSUFBdEMsRUFBNEMsT0FBNUMsQ0FBUDtBQUVILEtBckI2Rjs7O0FBdUI5RixjQUFVLFFBQVEsbUJBQVI7O0FBdkJvRixDQUFsRSxDQUFmLEVBeUJaLEVBekJZLENBQWpCOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcblx0IEhlYWRlcjogcmVxdWlyZSgnLi9tb2RlbHMvSGVhZGVyJyksXG5cdFVzZXI6IHJlcXVpcmUoJy4vbW9kZWxzL1VzZXInKSBcbn0iLCJtb2R1bGUuZXhwb3J0cz17XG5cdCBGb290ZXI6IHJlcXVpcmUoJy4vdmlld3MvdGVtcGxhdGVzL0Zvb3RlcicpLFxuXHRIZWFkZXI6IHJlcXVpcmUoJy4vdmlld3MvdGVtcGxhdGVzL0hlYWRlcicpIFxufSIsIm1vZHVsZS5leHBvcnRzPXtcblx0IEZvb3RlcjogcmVxdWlyZSgnLi92aWV3cy9Gb290ZXInKSxcblx0SGVhZGVyOiByZXF1aXJlKCcuL3ZpZXdzL0hlYWRlcicpLFxuXHRUb2FzdDogcmVxdWlyZSgnLi92aWV3cy9Ub2FzdCcpIFxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyOiBzdHJpbmcgPT4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLFxuXG4gICAgQ3VycmVuY3k6IG5ldyBJbnRsLk51bWJlckZvcm1hdCggJ2VuLVVTJywge1xuICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICBjdXJyZW5jeTogJ1VTRCcsXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJcbiAgICB9ICksXG5cbiAgICBHZXRGb3JtRmllbGQoIGRhdHVtLCB2YWx1ZSwgbWV0YSApIHtcbiAgICAgICAgY29uc3QgaXNOZXN0ZWQgPSBkYXR1bS5yYW5nZSA9PT0gJ0xpc3QnIHx8IHR5cGVvZiBkYXR1bS5yYW5nZSA9PT0gJ29iamVjdCdcblxuICAgICAgICBjb25zdCBpbWFnZSA9IGRhdHVtLnJhbmdlID09PSAnSW1hZ2VVcmwnXG4gICAgICAgICAgICA/IGA8ZGl2PjxidXR0b24gY2xhc3M9XCJidG5cIiBkYXRhLWpzPVwicHJldmlld0J0blwiIHR5cGU9XCJidXR0b25cIj5QcmV2aWV3PC9idXR0b24+PGltZyBkYXRhLXNyYz1cIiR7dGhpcy5JbWFnZVNyYyggdmFsdWUgKX1cIiAvPjwvZGl2PmBcbiAgICAgICAgICAgIDogYGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBvcHRpb25zID0gZGF0dW0ucmFuZ2UgPT09ICdCb29sZWFuJ1xuICAgICAgICAgICAgPyBbIHsgbGFiZWw6ICdUcnVlJywgbmFtZTogJ3RydWUnIH0sIHsgbGFiZWw6ICdGYWxzZScsIG5hbWU6ICdmYWxzZScgfSBdXG4gICAgICAgICAgICA6IGRhdHVtLm1ldGFkYXRhXG4gICAgICAgICAgICAgICAgPyBkYXR1bS5tZXRhZGF0YS5vcHRpb25zIDogZmFsc2VcblxuICAgICAgICBjb25zdCBpY29uID0gZGF0dW0ubWV0YWRhdGEgJiYgZGF0dW0ubWV0YWRhdGEuaWNvblxuICAgICAgICAgICAgPyB0aGlzLkdldEljb24oIGRhdHVtLm1ldGFkYXRhLmljb24gKVxuICAgICAgICAgICAgOiBvcHRpb25zXG4gICAgICAgICAgICAgICAgPyB0aGlzLkdldEljb24oJ2NhcmV0LWRvd24nKVxuICAgICAgICAgICAgICAgIDogYGBcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGlzTmVzdGVkIHx8ICggZGF0dW0uZmsgfHwgZGF0dW0ubGFiZWwgJiYgIW1ldGEubm9MYWJlbCApXG4gICAgICAgICAgICA/IGA8bGFiZWw+JHtkYXR1bS5mayB8fCBkYXR1bS5sYWJlbH08L2xhYmVsPmBcbiAgICAgICAgICAgIDogYGBcblxuICAgICAgICB2YWx1ZSA9ICggdmFsdWUgPT09IHVuZGVmaW5lZCApID8gJycgOiB2YWx1ZVxuXG4gICAgICAgIGlmKCBvcHRpb25zICkge1xuICAgICAgICAgICAgaWYoIHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICkgeyBvcHRpb25zKCk7IHJldHVybiB0aGlzLkdldFNlbGVjdCggZGF0dW0sIHZhbHVlLCBbIF0sIGljb24sIGxhYmVsICkgfVxuICAgICAgICAgICAgZWxzZSBpZiggQXJyYXkuaXNBcnJheSggb3B0aW9ucyApICkgcmV0dXJuIHRoaXMuR2V0U2VsZWN0KCBkYXR1bSwgdmFsdWUsIG9wdGlvbnMsIGljb24sIGxhYmVsIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21wdCA9IGRhdHVtLnByb21wdCA/IGA8ZGl2IGNsYXNzPVwicHJvbXB0XCI+JHtkYXR1bS5wcm9tcHR9PC9kaXY+YCA6IGBgXG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBkYXR1bS5ma1xuICAgICAgICAgICAgPyBgPGRpdiBkYXRhLXZpZXc9XCJ0eXBlQWhlYWRcIiBkYXRhLW5hbWU9XCIke2RhdHVtLmZrfVwiPjwvZGl2PmBcbiAgICAgICAgICAgIDogZGF0dW0ucmFuZ2UgPT09ICdUZXh0J1xuICAgICAgICAgICAgICAgID8gYDx0ZXh0YXJlYSBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIHBsYWNlaG9sZGVyPVwiJHtkYXR1bS5sYWJlbCB8fCAnJ31cIiByb3dzPVwiM1wiPiR7dmFsdWV9PC90ZXh0YXJlYT5gXG4gICAgICAgICAgICAgICAgOiBkYXR1bS5yYW5nZSA9PT0gJ0xpc3QnIHx8IGRhdHVtLnJhbmdlID09PSAnVmlldycgfHwgdHlwZW9mIGRhdHVtLnJhbmdlID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IGA8ZGl2IGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCIgZGF0YS1uYW1lPVwiJHtkYXR1bS5uYW1lfVwiPjwvZGl2PmBcbiAgICAgICAgICAgICAgICAgICAgOiBgPGlucHV0IHR5cGU9XCIke3RoaXMuUmFuZ2VUb0lucHV0VHlwZVsgZGF0dW0ucmFuZ2UgXX1cIiBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIHBsYWNlaG9sZGVyPVwiJHtkYXR1bS5sYWJlbCB8fCAnJ31cIiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gXG5cbiAgICAgICAgcmV0dXJuIGBgICtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwICR7aXNOZXN0ZWQgPyAnbmVzdGVkJyA6ICcnfVwiPlxuICAgICAgICAgICAgJHtsYWJlbH1cbiAgICAgICAgICAgICR7cHJvbXB0fVxuICAgICAgICAgICAgJHtpbnB1dH0gXG4gICAgICAgICAgICAke2ljb259XG4gICAgICAgIDwvZGl2PmBcbiAgICB9LFxuXG4gICAgR2V0Rm9ybUZpZWxkcyggZGF0YSwgbW9kZWw9e30sIG1ldGEgKSB7XG4gICAgICAgIGlmKCAhZGF0YSApIHJldHVybiBgYFxuXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgICAuZmlsdGVyKCBkYXR1bSA9PiBtZXRhWyBkYXR1bS5uYW1lIF0gJiYgbWV0YVsgZGF0dW0ubmFtZSBdLmhpZGUgPyBmYWxzZSA6IHRydWUgKVxuICAgICAgICAgICAgLm1hcCggZGF0dW0gPT4gdGhpcy5HZXRGb3JtRmllbGQoIGRhdHVtLCBtb2RlbCAmJiBtb2RlbFsgZGF0dW0ubmFtZSBdLCBtZXRhICkgKS5qb2luKCcnKVxuICAgIH0sXG5cbiAgICBHZXRJY29uKCBuYW1lLCBvcHRzPXsgSWNvbkRhdGFKczogdGhpcy5JY29uRGF0YUpzIH0gKSB7IHJldHVybiBSZWZsZWN0LmFwcGx5KCB0aGlzLkljb25zWyBuYW1lIF0sIHRoaXMsIFsgb3B0cyBdICkgfSxcblxuICAgIEdldExpc3RJdGVtcyggaXRlbXM9W10sIG9wdHM9e30gKSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoIGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IG9wdHMuZGF0YUF0dHIgPyBgZGF0YS0ke29wdHMuZGF0YUF0dHJ9PVwiJHtpdGVtWyBvcHRzLmRhdGFBdHRyIF19XCJgIDogYGBcbiAgICAgICAgICAgIHJldHVybiBgPGxpICR7YXR0cn0+JHtpdGVtLmxhYmVsIHx8IGl0ZW19PC9saT5gIFxuICAgICAgICB9ICkuam9pbignJylcbiAgICB9LFxuXG4gICAgR2V0U2VsZWN0KCBkYXR1bSwgc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uc0RhdGEsIGljb24sIGxhYmVsPWBgICkge1xuICAgICAgICBpZiggdHlwZW9mIHNlbGVjdGVkVmFsdWUgPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygc2VsZWN0ZWRWYWx1ZSA9PT0gJ251bWJlcicgKSBzZWxlY3RlZFZhbHVlID0gc2VsZWN0ZWRWYWx1ZS50b1N0cmluZygpXG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNEYXRhLmxlbmd0aCA/IHRoaXMuR2V0U2VsZWN0T3B0aW9ucyggb3B0aW9uc0RhdGEsIHNlbGVjdGVkVmFsdWUsIHsgdmFsdWVBdHRyOiAnbmFtZScgfSApIDogYGBcblxuICAgICAgICByZXR1cm4gYGAgK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICR7bGFiZWx9XG4gICAgICAgICAgICA8c2VsZWN0IGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBkaXNhYmxlZCAkeyFzZWxlY3RlZFZhbHVlID8gYHNlbGVjdGVkYCA6IGBgfSB2YWx1ZT4ke2RhdHVtLmxhYmVsfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICR7b3B0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgJHtpY29ufVxuICAgICAgICA8L2Rpdj5gXG4gICAgfSxcblxuICAgIEdldFNlbGVjdE9wdGlvbnMoIG9wdGlvbnM9W10sIHNlbGVjdGVkVmFsdWUsIG9wdHM9eyB2YWx1ZUF0dHI6ICd2YWx1ZScgfSApIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKCBvcHRpb24gPT4gYDxvcHRpb24gJHtzZWxlY3RlZFZhbHVlID09PSBvcHRpb25bIG9wdHMudmFsdWVBdHRyIF0gPyBgc2VsZWN0ZWRgIDogYGB9IHZhbHVlPVwiJHtvcHRpb25bIG9wdHMudmFsdWVBdHRyIF19XCI+JHtvcHRpb24ubGFiZWx9PC9vcHRpb24+YCApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIC8vSWNvbnM6IHJlcXVpcmUoJy4vLkljb25NYXAnKSxcbiAgICBcbiAgICBJY29uRGF0YUpzKCBwICkgeyByZXR1cm4gcC5uYW1lID8gYGRhdGEtanM9XCIke3AubmFtZX1cImAgOiBgYCB9LFxuXG4gICAgSW1hZ2VTcmMoIG5hbWUgKSB7IHJldHVybiBgaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL21lZ2EtcG9ldHJ5LTk2NjUvJHtuYW1lfWAgfSxcblxuICAgIFJhbmdlKCBpbnQgKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKCBBcnJheSggaW50ICkua2V5cygpIClcbiAgICB9LFxuXG4gICAgUmFuZ2VUb0lucHV0VHlwZToge1xuICAgICAgICBFbWFpbDogJ2VtYWlsJyxcbiAgICAgICAgUGFzc3dvcmQ6ICdwYXNzd29yZCcsXG4gICAgICAgIFN0cmluZzogJ3RleHQnXG4gICAgfVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuLi8uLi9saWIvTXlPYmplY3QnKSwge1xuXG4gICAgUmVxdWVzdDoge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCBkYXRhICkge1xuICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgICAgICAgIGlmKCBkYXRhLm9uUHJvZ3Jlc3MgKSByZXEuYWRkRXZlbnRMaXN0ZW5lciggXCJwcm9ncmVzc1wiLCBlID0+XG4gICAgICAgICAgICAgICAgZGF0YS5vblByb2dyZXNzKCBlLmxlbmd0aENvbXB1dGFibGUgPyBNYXRoLmZsb29yKCAoIGUubG9hZGVkIC8gZS50b3RhbCApICogMTAwICkgOiAwICkgXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIFsgNTAwLCA0MDQsIDQwMSBdLmluY2x1ZGVzKCB0aGlzLnN0YXR1cyApXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHJlamVjdCggdGhpcy5yZXNwb25zZSA/IEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2UgKSA6IHRoaXMuc3RhdHVzIClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcmVzb2x2ZSggSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZSApIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkYXRhLm1ldGhvZCA9IGRhdGEubWV0aG9kIHx8IFwiZ2V0XCJcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBgLyR7ZGF0YS5yZXNvdXJjZX1gICsgKCBkYXRhLmlkID8gYC8ke2RhdGEuaWR9YCA6ICcnIClcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5tZXRob2QgPT09IFwiZ2V0XCIgfHwgZGF0YS5tZXRob2QgPT09IFwib3B0aW9uc1wiICkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcXMgPSBkYXRhLnFzID8gYD8ke3dpbmRvdy5lbmNvZGVVUklDb21wb25lbnQoIGRhdGEucXMgKX1gIDogJycgXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vcGVuKCBkYXRhLm1ldGhvZCwgYCR7cGF0aH0ke3FzfWAgKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhlYWRlcnMoIHJlcSwgZGF0YS5oZWFkZXJzIClcbiAgICAgICAgICAgICAgICAgICAgcmVxLnNlbmQobnVsbClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXEub3BlbiggZGF0YS5tZXRob2QudG9VcHBlckNhc2UoKSwgcGF0aCwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJzKCByZXEsIGRhdGEuaGVhZGVycyApXG4gICAgICAgICAgICAgICAgICAgIHJlcS5zZW5kKCBkYXRhLmRhdGEgfHwgbnVsbCApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGEub25Qcm9ncmVzcyApIGRhdGEub25Qcm9ncmVzcyggJ3NlbnQnIClcbiAgICAgICAgICAgIH0gKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldEhlYWRlcnMoIHJlcSwgaGVhZGVycz17fSApIHtcbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCBcIkFjY2VwdFwiLCBoZWFkZXJzLmFjY2VwdCB8fCAnYXBwbGljYXRpb24vanNvbicgKVxuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIGhlYWRlcnMuY29udGVudFR5cGUgfHwgJ3RleHQvcGxhaW4nIClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZmFjdG9yeSggZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoIHRoaXMuUmVxdWVzdCwgeyB9ICkuY29uc3RydWN0b3IoIGRhdGEgKVxuICAgIH0sXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBpZiggIVhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kQXNCaW5hcnkgKSB7XG4gICAgICAgICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmRBc0JpbmFyeSA9IGZ1bmN0aW9uKHNEYXRhKSB7XG4gICAgICAgICAgICB2YXIgbkJ5dGVzID0gc0RhdGEubGVuZ3RoLCB1aThEYXRhID0gbmV3IFVpbnQ4QXJyYXkobkJ5dGVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIG5JZHggPSAwOyBuSWR4IDwgbkJ5dGVzOyBuSWR4KyspIHtcbiAgICAgICAgICAgICAgdWk4RGF0YVtuSWR4XSA9IHNEYXRhLmNoYXJDb2RlQXQobklkeCkgJiAweGZmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kKHVpOERhdGEpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZmFjdG9yeS5iaW5kKHRoaXMpXG4gICAgfVxuXG59ICksIHsgfSApLmNvbnN0cnVjdG9yKClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSgge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICB0aGlzLnJhbmdlLnNlbGVjdE5vZGUoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIikuaXRlbSgwKSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgY3JlYXRlKCBuYW1lLCBvcHRzICkge1xuICAgICAgICBjb25zdCBsb3dlciA9IG5hbWVcbiAgICAgICAgbmFtZSA9ICggbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSkgKS5yZXBsYWNlKCAnLScsICcnIClcblxuICAgICAgICBjb25zb2xlLmxvZyhuYW1lKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1vZGVsc1tuYW1lXSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgICAgICAgICAgdGhpcy5WaWV3c1sgbmFtZSBdLFxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbigge1xuICAgICAgICAgICAgICAgIEhlYWRlcjogeyB2YWx1ZTogdGhpcy5IZWFkZXIgfSxcbiAgICAgICAgICAgICAgICBUb2FzdDogeyB2YWx1ZTogdGhpcy5Ub2FzdCB9LFxuICAgICAgICAgICAgICAgIG5hbWU6IHsgdmFsdWU6IG5hbWUgfSxcbiAgICAgICAgICAgICAgICBmYWN0b3J5OiB7IHZhbHVlOiB0aGlzIH0sXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHsgdmFsdWU6IHRoaXMucmFuZ2UgfSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogeyB2YWx1ZTogdGhpcy5UZW1wbGF0ZXNbIG5hbWUgXSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDogeyB2YWx1ZTogT2JqZWN0LmNyZWF0ZSggdGhpcy5Nb2RlbHNbIG5hbWUgXSApIH0sXG4gICAgICAgICAgICAgICAgdXNlcjogeyB2YWx1ZTogdGhpcy5Vc2VyIH1cbiAgICAgICAgICAgIH0gKVxuICAgICAgICApLmNvbnN0cnVjdG9yKCBvcHRzIClcbiAgICB9LFxuXG59LCB7XG4gICAgSGVhZGVyOiB7IHZhbHVlOiByZXF1aXJlKCcuLi92aWV3cy9IZWFkZXInKSB9LFxuICAgIE1vZGVsczogeyB2YWx1ZTogcmVxdWlyZSgnLi4vLk1vZGVsTWFwJykgfSxcbiAgICBUZW1wbGF0ZXM6IHsgdmFsdWU6IHJlcXVpcmUoJy4uLy5UZW1wbGF0ZU1hcCcpIH0sXG4gICAgVG9hc3Q6IHsgdmFsdWU6IHJlcXVpcmUoJy4uL3ZpZXdzL1RvYXN0JykgfSxcbiAgICBVc2VyOiB7IHZhbHVlOiByZXF1aXJlKCcuLi9tb2RlbHMvVXNlcicpIH0sXG4gICAgVmlld3M6IHsgdmFsdWU6IHJlcXVpcmUoJy4uLy5WaWV3TWFwJykgfVxufSApXG4iLCJyZXF1aXJlKCcuL3BvbHlmaWxsJylcblxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4vbW9kZWxzL1VzZXInKSxcbiAgICByb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcicpLFxuICAgIG9uTG9hZCA9IG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHdpbmRvdy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCkgKVxuXG5Vc2VyLm9uKCAnbG9nb3V0JywgKCkgPT4gcm91dGVyLm9uTG9nb3V0KCkgKVxuXG5Qcm9taXNlLmFsbCggWyBVc2VyLmdldCgpLCBvbkxvYWQgXSApXG4udGhlbiggKCkgPT4gcm91dGVyLmluaXRpYWxpemUoKSApXG4uY2F0Y2goIGUgPT4gY29uc29sZS5sb2coIGBFcnJvciBpbml0aWFsaXppbmcgY2xpZW50IC0+ICR7ZS5zdGFjayB8fCBlfWAgKSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXy5qcycpLCB7XG5cbiAgICBkYXRhOiBbXG4gICAgICAgICdob21lJyxcbiAgICAgICAgJ3Byb2plY3RzJyxcbiAgICAgICAgJ2NvbnRhY3QnXG4gICAgXVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fLmpzJyksIHtcblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgICAgIHJldHVybiBCb29sZWFuKCB0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmlkICkgIFxuICAgIH0sXG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBoenk9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UO2BcblxuICAgICAgICB0aGlzLmRhdGEgPSB7IH1cbiAgICAgICAgdGhpcy5lbWl0KCdsb2dvdXQnKVxuICAgIH0sXG5cbn0gKSwgeyByZXNvdXJjZTogeyB2YWx1ZTogJ21lJyB9IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7IH0sIHJlcXVpcmUoJy4uLy4uLy4uL2xpYi9Nb2RlbCcpLCByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG5cbiAgICBYaHI6IHJlcXVpcmUoJy4uL1hocicpLFxuXG4gICAgYWRkKCBkYXR1bSApIHtcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goIGRhdHVtIClcblxuICAgICAgICBpZiggdGhpcy5zdG9yZUJ5ICkgdGhpcy5fc3RvcmVPbmUoIGRhdHVtIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gdGhpcy5kYXRhWyB0aGlzLm1ldGEua2V5IF1cbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ0RFTEVURScsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBpZDoga2V5VmFsdWUgfSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLm1ldGEua2V5XG5cbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXR1bSA9IHRoaXMuZGF0YS5maW5kKCBkYXR1bSA9PiBkYXR1bVsga2V5IF0gPT0ga2V5VmFsdWUgKVxuXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmUgKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKCB0aGlzLnN0b3JlICkuZm9yRWFjaCggYXR0ciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSA9IHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdLmZpbHRlciggZGF0dW0gPT4gZGF0dW1bIGtleSBdICE9IGtleVZhbHVlIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXS5sZW5ndGggPT09IDAgKSB7IHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdID0gdW5kZWZpbmVkIH1cbiAgICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlciggZGF0dW0gPT4gZGF0dW1bIGtleSBdICE9IGtleVZhbHVlIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5kYXRhIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGdpdCggYXR0ciApIHsgcmV0dXJuIHRoaXMuZGF0YVsgYXR0ciBdIH0sXG5cbiAgICBnZXQoIG9wdHM9eyBxdWVyeTp7fSB9ICkge1xuICAgICAgICBpZiggb3B0cy5xdWVyeSB8fCB0aGlzLnBhZ2luYXRpb24gKSBPYmplY3QuYXNzaWduKCBvcHRzLnF1ZXJ5LCB0aGlzLnBhZ2luYXRpb24gKVxuXG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6IG9wdHMubWV0aG9kIHx8ICdnZXQnLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBxczogb3B0cy5xdWVyeSA/IEpTT04uc3RyaW5naWZ5KCBvcHRzLnF1ZXJ5ICkgOiB1bmRlZmluZWQgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KCBvcHRzLnBhcnNlID8gb3B0cy5wYXJzZSggcmVzcG9uc2UsIG9wdHMuc3RvcmVCeSApIDogcmVzcG9uc2UgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiggb3B0cy5zdG9yZUJ5ICkgdGhpcy5fcmVzZXRTdG9yZSggb3B0cy5zdG9yZUJ5IClcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnBhcnNlID8gdGhpcy5wYXJzZSggcmVzcG9uc2UsIG9wdHMuc3RvcmVCeSApIDogcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBpZiggb3B0cy5zdG9yZUJ5ICkgdGhpcy5fc3RvcmUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2dvdCcpXG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAnZ2V0JywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgcXM6IEpTT04uc3RyaW5naWZ5KCB7IGNvdW50T25seTogdHJ1ZSB9ICkgfSApXG4gICAgICAgIC50aGVuKCAoIHsgcmVzdWx0IH0gKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1ldGEuY291bnQgPSByZXN1bHRcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3VsdCApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBnaXQoIGF0dHIgKSB7IHJldHVybiB0aGlzLmRhdGFbIGF0dHIgXSB9LFxuXG4gICAgcGF0Y2goIGlkLCBkYXRhICkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAncGF0Y2gnLCBpZCwgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgZGF0YTogSlNPTi5zdHJpbmdpZnkoIGRhdGEgfHwgdGhpcy5kYXRhICkgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgPyB0aGlzLmRhdGEuY29uY2F0KCByZXNwb25zZSApIDogWyByZXNwb25zZSBdXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmUgKSBPYmplY3Qua2V5cyggdGhpcy5zdG9yZSApLmZvckVhY2goIGF0dHIgPT4gdGhpcy5fc3RvcmUoIHJlc3BvbnNlLCBhdHRyICkgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNwb25zZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBfcHV0KCBrZXlWYWx1ZSwgZGF0YSApIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmRhdGEuZmluZCggZGF0dW0gPT4gZGF0dW1bIHRoaXMubWV0YS5rZXkgXSA9PSBrZXlWYWx1ZSApO1xuICAgICAgICBpZiggaXRlbSApIGl0ZW0gPSBkYXRhO1xuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBwdXQoIGlkLCBkYXRhICkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAncHV0JywgaWQsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIGRhdGE6IEpTT04uc3RyaW5naWZ5KCBkYXRhICkgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkgeyBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzcG9uc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzcG9uc2UgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgcG9zdCggbW9kZWwgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdwb3N0JywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgZGF0YTogSlNPTi5zdHJpbmdpZnkoIG1vZGVsIHx8IHRoaXMuZGF0YSApIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSA/IHRoaXMuZGF0YS5jb25jYXQoIHJlc3BvbnNlICkgOiBbIHJlc3BvbnNlIF1cbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdG9yZSApIE9iamVjdC5rZXlzKCB0aGlzLnN0b3JlICkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLl9zdG9yZSggcmVzcG9uc2UsIGF0dHIgKSApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3BvbnNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIHJlbW92ZSggaXRlbSApIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuZmluZEluZGV4KCBkYXR1bSA9PiBKU09OLnN0cmluZ2lmeSggZGF0dW0gKSA9PT0gSlNPTi5zdHJpbmdpZnkoIGl0ZW0gKSApXG5cbiAgICAgICAgaWYoIGluZGV4ID09PSAtMSApIHJldHVyblxuXG4gICAgICAgIHRoaXMuZGF0YS5zcGxpY2UoIGluZGV4LCAxIClcbiAgICB9LFxuXG4gICAgc2V0KCBhdHRyLCB2YWx1ZSApIHtcbiAgICAgICAgdGhpcy5kYXRhWyBhdHRyIF0gPSB2YWx1ZVxuICAgICAgICB0aGlzLmVtaXQoIGAke2F0dHJ9Q2hhbmdlZGAgKVxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZSggZGF0YSApIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZVxuICAgICAgIFxuICAgICAgICBPYmplY3Qua2V5cyggZGF0YSApLmZvckVhY2goIG5hbWUgPT4geyBcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGRhdGFbIG5hbWUgXSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZXMuZmluZCggYXR0ciA9PiBhdHRyLm5hbWUgPT09IG5hbWUgKSAgIFxuICAgIFxuICAgICAgICAgICAgaWYoIGF0dHJpYnV0ZSA9PT0gdW5kZWZpbmVkIHx8ICFhdHRyaWJ1dGUudmFsaWRhdGUgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWyBuYW1lIF0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgPyB0eXBlb2YgdmFsID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgID8gdmFsLnRyaW0oKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IHZhbFxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSBlbHNlIGlmKCB2YWxpZCAmJiAhdGhpcy52YWxpZGF0ZURhdHVtKCBhdHRyaWJ1dGUsIHZhbCApICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCggJ3ZhbGlkYXRpb25FcnJvcicsIGF0dHJpYnV0ZSApXG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIGlmKCB0aGlzLnZhbGlkYXRlRGF0dW0oIGF0dHJpYnV0ZSwgdmFsICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWyBuYW1lIF0gPSB2YWwudHJpbSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKVxuXG4gICAgICAgIHJldHVybiB2YWxpZFxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZURhdHVtKCBhdHRyLCB2YWwgKSB7XG4gICAgICAgIHJldHVybiBhdHRyLnZhbGlkYXRlLmNhbGwoIHRoaXMsIHZhbC50cmltKCkgKVxuICAgIH1cblxufSApXG4iLCJpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCB2YXJBcmdzKSB7IC8vIC5sZW5ndGggb2YgZnVuY3Rpb24gaXMgMlxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG5cbiAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gbmV4dFNvdXJjZSkge1xuICAgICAgICAgIC8vIEF2b2lkIGJ1Z3Mgd2hlbiBoYXNPd25Qcm9wZXJ0eSBpcyBzaGFkb3dlZFxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvO1xuICB9O1xufVxuXG4vL2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2Nsb3Nlc3RcbmlmICh3aW5kb3cuRWxlbWVudCAmJiAhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBcbiAgICBmdW5jdGlvbihzKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGVsID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWwpIHt9O1xuICAgICAgICB9IHdoaWxlICgoaSA8IDApICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTsgXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xufVxuXG4vL2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG5jb25zdCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQb2x5ZmlsbCA9ICgoKSA9PiB7XG4gICAgbGV0IGNsb2NrID0gRGF0ZS5ub3coKTtcblxuICAgIHJldHVybiAoY2FsbGJhY2spID0+IHtcblxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIC0gY2xvY2sgPiAxNikge1xuICAgICAgICAgICAgY2xvY2sgPSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnRUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvbHlmaWxsKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQb2x5ZmlsbFxuXG5yZXF1aXJlKCdzbW9vdGhzY3JvbGwtcG9seWZpbGwnKS5wb2x5ZmlsbCgpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWVcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4uLy4uL2xpYi9NeU9iamVjdCcpLCB7XG4gICAgXG4gICAgVmlld0ZhY3Rvcnk6IHJlcXVpcmUoJy4vZmFjdG9yeS9WaWV3JyksXG4gICAgXG4gICAgVmlld3M6IHJlcXVpcmUoJy4vLlZpZXdNYXAnKSxcblxuICAgIFNpbmdsZXRvbnM6IFsgJ0hlYWRlcicgXSxcblxuICAgIGluaXRpYWxpemUoKSB7XG5cbiAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKVxuXG4gICAgICAgIHRoaXMuVmlld0ZhY3RvcnkuY29uc3RydWN0b3IoKTtcblxuICAgICAgICB0aGlzLlNpbmdsZXRvbnMuZm9yRWFjaCggbmFtZSA9PiB0aGlzLlZpZXdzW25hbWVdLmNvbnN0cnVjdG9yKCB7IGZhY3Rvcnk6IHRoaXMuVmlld0ZhY3RvcnkgfSApIClcblxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IHRoaXMuaGFuZGxlLmJpbmQodGhpcylcblxuICAgICAgICB0aGlzLlZpZXdzLkhlYWRlci5vbiggJ25hdmlnYXRlJywgcm91dGUgPT4gdGhpcy5uYXZpZ2F0ZSggcm91dGUgKSApXG5cbiAgICAgICAgdGhpcy5mb290ZXIgPSB0aGlzLlZpZXdGYWN0b3J5LmNyZWF0ZSggJ2Zvb3RlcicsIHsgaW5zZXJ0aW9uOiB7IGVsOiBkb2N1bWVudC5ib2R5IH0gfSApXG5cbiAgICAgICAgdGhpcy5oYW5kbGUoKVxuICAgIH0sXG5cbiAgICBoYW5kbGUoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlciggd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykuc2xpY2UoMSkgKVxuICAgIH0sXG5cbiAgICBoYW5kbGVyKCBwYXRoICkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5wYXRoVG9WaWV3KCBwYXRoWzBdICksXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5WaWV3c1sgbmFtZSBdID8gbmFtZSA6ICdob21lJ1xuXG4gICAgICAgIGlmKCB2aWV3ID09PSB0aGlzLmN1cnJlbnRWaWV3ICkgcmV0dXJuIHRoaXMudmlld3NbIHZpZXcgXS5vbk5hdmlnYXRpb24oIHBhdGguc2xpY2UoMSkgKVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKVxuXG4gICAgICAgIFByb21pc2UuYWxsKCBPYmplY3Qua2V5cyggdGhpcy52aWV3cyApLm1hcCggdmlldyA9PiB0aGlzLnZpZXdzWyB2aWV3IF0uaGlkZSgpICkgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmlld1xuXG4gICAgICAgICAgICBpZiggdGhpcy52aWV3c1sgdmlldyBdICkgcmV0dXJuIHRoaXMudmlld3NbIHZpZXcgXS5vbk5hdmlnYXRpb24oIHBhdGggKVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbIHZpZXcgXSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVmlld0ZhY3RvcnkuY3JlYXRlKCB2aWV3LCB7IGluc2VydGlvbjogeyBlbDogdGhpcy5jb250ZW50Q29udGFpbmVyIH0sIHBhdGggfSApXG4gICAgICAgICAgICAgICAgICAgIC5vbiggJ25hdmlnYXRlJywgKCByb3V0ZSwgb3B0aW9ucyApID0+IHRoaXMubmF2aWdhdGUoIHJvdXRlLCBvcHRpb25zICkgKVxuICAgICAgICAgICAgICAgICAgICAub24oICdkZWxldGVkJywgKCkgPT4gZGVsZXRlIHRoaXMudmlld3NbIHZpZXcgXSApXG4gICAgICAgICAgICApXG4gICAgICAgIH0gKVxuICAgICAgICAuY2F0Y2goIHRoaXMuRXJyb3IgKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5mb290ZXIuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCAnaGlkZGVuJywgdmlldyA9PT0gJ0FkbWluJyApXG4gICAgfSxcblxuICAgIG5hdmlnYXRlKCBsb2NhdGlvbiwgb3B0aW9ucz17fSApIHtcbiAgICAgICAgaWYoIG9wdGlvbnMucmVwbGFjZSB8fCBvcHRpb25zLnVwICkge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9YC5zcGxpdCgnLycpXG4gICAgICAgICAgICBwYXRoLnBvcCgpXG4gICAgICAgICAgICBpZiggb3B0aW9ucy5yZXBsYWNlICkgcGF0aC5wdXNoKCBsb2NhdGlvbiApXG4gICAgICAgICAgICBsb2NhdGlvbiA9IHBhdGguam9pbignLycpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiggb3B0aW9ucy5hcHBlbmQgKSB7IGxvY2F0aW9uID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfS8ke2xvY2F0aW9ufWAgfVxuXG4gICAgICAgIGlmKCBsb2NhdGlvbiAhPT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICkgaGlzdG9yeS5wdXNoU3RhdGUoIHt9LCAnJywgbG9jYXRpb24gKVxuICAgICAgICBpZiggIW9wdGlvbnMuc2lsZW50ICkgdGhpcy5oYW5kbGUoKVxuICAgIH0sXG5cbiAgICBvbkxvZ291dCgpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoIE9iamVjdC5rZXlzKCB0aGlzLnZpZXdzICkubWFwKCB2aWV3ID0+IHRoaXMudmlld3NbIHZpZXcgXS5kZWxldGUoKSApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHsgdGhpcy5jdXJyZW50VmlldyA9IHVuZGVmaW5lZDsgcmV0dXJuIHRoaXMuaGFuZGxlKCkgfSApXG4gICAgICAgIC5jYXRjaCggdGhpcy5FcnJvciApXG4gICAgfSxcblxuICAgIHBhdGhUb1ZpZXcoIHBhdGggKSB7XG4gICAgICAgIGNvbnN0IGh5cGhlblNwbGl0ID0gcGF0aC5zcGxpdCgnLScpXG4gICAgICAgIHJldHVybiBoeXBoZW5TcGxpdC5tYXAoIGl0ZW0gPT4gdGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoIGl0ZW0gKSApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIHNjcm9sbFRvVG9wKCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsKCB7IHRvcDogMCwgbGVmdDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0gKVxuICAgIH1cblxufSApLCB7IGN1cnJlbnRWaWV3OiB7IHZhbHVlOiAnJywgd3JpdGFibGU6IHRydWUgfSwgdmlld3M6IHsgdmFsdWU6IHsgfSB9IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwge1xuXG4gICAgcG9zdFJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5vbiggJ2ltZ0xvYWRlZCcsIGVsID0+IHtcbiAgICAgICAgICAgIGlmKCAhZWwucGFyZW50Tm9kZSApIHJldHVyblxuICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgaWYoIHRoaXMubW9iaWxlID09PSB1bmRlZmluZWQgKSB0aGlzLm1vYmlsZSA9IGZhbHNlXG5cbiAgICAgICAgbGV0IGltYWdlID0gJ2Zvb3Rlci1pbWFnZS5qcGcnXG5cbiAgICAgICAgaWYgKCB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2N3B4KVwiKS5tYXRjaGVzICkge1xuICAgICAgICAgICAgaW1hZ2UgPSAnZm9vdGVyLWltYWdlLW1vYmlsZS5qcGcnXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVscy5mb290ZXJJbWFnZS5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgIHRoaXMuc2x1cnBUZW1wbGF0ZSgge1xuICAgICAgICAgICAgdGVtcGxhdGU6IGA8aW1nIGRhdGEtc3JjPVwiJHt0aGlzLkZvcm1hdC5JbWFnZVNyYyggaW1hZ2UgKX1cIi8+YCxcbiAgICAgICAgICAgIGluc2VydGlvbjogeyBlbDogdGhpcy5lbHMuZm9vdGVySW1hZ2UgfVxuICAgICAgICB9IClcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXycpLCB7XG5cbiAgICBVc2VyOiByZXF1aXJlKCcuLi9tb2RlbHMvVXNlcicpLFxuXG4gICAgZXZlbnRzOiB7XG4gICAgICAgIG5hdkxpc3Q6ICdjbGljaydcbiAgICB9LFxuXG4gICAgaW5zZXJ0aW9uKCkgeyByZXR1cm4geyBlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKSwgbWV0aG9kOiAnaW5zZXJ0QmVmb3JlJyB9IH0sXG5cbiAgICBtb2RlbDogcmVxdWlyZSgnLi4vbW9kZWxzL0hlYWRlcicpLFxuXG4gICAgbmFtZTogJ0hlYWRlcicsXG5cbiAgICBvbk5hdkxpc3RDbGljayhlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XG4gICAgICAgIGlmKCB0YXJnZXQudGFnTmFtZSAhPT0gJ1NQQU4nICkgcmV0dXJuXG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy5lbWl0KCAnbmF2aWdhdGUnLCBgLyR7dGFyZ2V0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCl9YCApXG4gICAgfSxcblxuICAgIG9uTG9nb3V0Q2xpY2soKSB7XG4gICAgICAgIHRoaXMuVXNlci5sb2dvdXQoKVxuICAgIH0sXG5cbiAgICBvblVzZXJMb2dpbigpIHtcbiAgICAgICAgdGhpcy5lbHMucHJvZmlsZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSAgICAgICAgXG4gICAgICAgIHRoaXMuZWxzLm5hbWUudGV4dENvbnRlbnQgPSB0aGlzLlVzZXIuZGF0YS5uYW1lIHx8IHRoaXMuVXNlci5kYXRhLmVtYWlsXG4gICAgfSxcblxuICAgIG9uVXNlckxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5lbHMucHJvZmlsZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSAgICAgICAgXG4gICAgICAgIHRoaXMuZWxzLm5hbWUudGV4dENvbnRlbnQgPSAnJ1xuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkge1xuXG4gICAgICAgIGlmKCB0aGlzLlVzZXIuaXNMb2dnZWRJbigpICkgdGhpcy5vblVzZXJMb2dpbigpXG5cbiAgICAgICAgdGhpcy5Vc2VyLm9uKCAnZ290JywgKCkgPT4geyBpZiggdGhpcy5Vc2VyLmlzTG9nZ2VkSW4oKSApIHRoaXMub25Vc2VyTG9naW4oKSB9IClcbiAgICAgICAgdGhpcy5Vc2VyLm9uKCAnbG9nb3V0JywgKCkgPT4gdGhpcy5vblVzZXJMb2dvdXQoKSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL0hlYWRlcicpXG5cbn0gKSwgeyB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiggeyB9LCByZXF1aXJlKCcuLi8uLi8uLi9saWIvTXlPYmplY3QnKSwgcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuXG4gICAgJCggZWwsIHNlbGVjdG9yICkgeyByZXR1cm4gQXJyYXkuZnJvbSggZWwucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKSApIH0sXG5cbiAgICBUZW1wbGF0ZUNvbnRleHQ6IHJlcXVpcmUoJy4uL1RlbXBsYXRlQ29udGV4dCcpLFxuXG4gICAgTW9kZWw6IHJlcXVpcmUoJy4uL21vZGVscy9fX3Byb3RvX18nKSxcblxuICAgIE9wdGltaXplZFJlc2l6ZTogcmVxdWlyZSgnLi9saWIvT3B0aW1pemVkUmVzaXplJyksXG4gICAgXG4gICAgWGhyOiByZXF1aXJlKCcuLi9YaHInKSxcblxuICAgIGJpbmRFdmVudCgga2V5LCBldmVudCwgZWwgKSB7XG4gICAgICAgIGNvbnN0IGVscyA9IGVsID8gWyBlbCBdIDogQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdICkgPyB0aGlzLmVsc1sga2V5IF0gOiBbIHRoaXMuZWxzWyBrZXkgXSBdLFxuICAgICAgICAgICBuYW1lID0gdGhpcy5nZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKVxuXG4gICAgICAgIGlmKCAhdGhpc1sgYF8ke25hbWV9YCBdICkgdGhpc1sgYF8ke25hbWV9YCBdID0gZSA9PiB0aGlzWyBuYW1lIF0oZSlcblxuICAgICAgICBlbHMuZm9yRWFjaCggZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lciggZXZlbnQgfHwgJ2NsaWNrJywgdGhpc1sgYF8ke25hbWV9YCBdICkgKVxuICAgIH0sXG5cbiAgICBjb25zdHJ1Y3Rvciggb3B0cz17fSApIHtcblxuICAgICAgICBpZiggb3B0cy5ldmVudHMgKSB7IE9iamVjdC5hc3NpZ24oIHRoaXMuZXZlbnRzLCBvcHRzLmV2ZW50cyApOyBkZWxldGUgb3B0cy5ldmVudHM7IH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbiggdGhpcywgb3B0cyApXG5cbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMgPSBbIF1cblxuICAgICAgICBpZiggdGhpcy5yZXF1aXJlc0xvZ2luICYmICggIXRoaXMudXNlci5pc0xvZ2dlZEluKCkgKSApIHJldHVybiB0aGlzLmhhbmRsZUxvZ2luKClcbiAgICAgICAgaWYoIHRoaXMudXNlciAmJiAhdGhpcy5pc0FsbG93ZWQoIHRoaXMudXNlciApICkgcmV0dXJuIHRoaXMuc2Nvb3RBd2F5KClcblxuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplKCkucmVuZGVyKClcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVFdmVudHMoIGtleSwgZWwgKSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHRoaXMuZXZlbnRzW2tleV1cblxuICAgICAgICBpZiggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHsgdGhpcy5iaW5kRXZlbnQoIGtleSwgdGhpcy5ldmVudHNba2V5XSwgZWwgKSB9XG4gICAgICAgIGVsc2UgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZXZlbnRzW2tleV0gKSApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzWyBrZXkgXS5mb3JFYWNoKCBldmVudE9iaiA9PiB0aGlzLmJpbmRFdmVudCgga2V5LCBldmVudE9iaiApIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50KCBrZXksIHRoaXMuZXZlbnRzW2tleV0uZXZlbnQgKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRlbGV0ZSggeyBzaWxlbnQgfSA9IHsgc2lsZW50OiBmYWxzZSB9ICkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlKClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxzLmNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBjb250YWluZXIucGFyZW50Tm9kZVxuICAgICAgICAgICAgaWYoIGNvbnRhaW5lciAmJiBwYXJlbnQgKSBwYXJlbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApXG4gICAgICAgICAgICBpZiggIXNpbGVudCApIHRoaXMuZW1pdCgnZGVsZXRlZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGV2ZW50czoge30sXG5cbiAgICBmYWRlSW5JbWFnZSggZWwgKSB7XG4gICAgICAgIGVsLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCggJ2ltZ0xvYWRlZCcsIGVsIClcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCAnc3JjJywgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIClcbiAgICB9LFxuXG4gICAgZ2V0RXZlbnRNZXRob2ROYW1lKCBrZXksIGV2ZW50ICkgeyByZXR1cm4gYG9uJHt0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihrZXkpfSR7dGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoZXZlbnQpfWAgfSxcblxuICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuZWxzLmNvbnRhaW5lciB9LFxuXG4gICAgZ2V0VGVtcGxhdGVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCBydiA9IE9iamVjdC5hc3NpZ24oIHRoaXMudXNlciA/IHsgdXNlcjogdGhpcy51c2VyLmRhdGEgfSA6IHt9IClcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGVsKVxuICAgICAgICBpZiggdGhpcy5tb2RlbCApIHtcbiAgICAgICAgICAgIHJ2Lm1vZGVsID0gdGhpcy5tb2RlbC5kYXRhXG5cbiAgICAgICAgICAgIGlmKCB0aGlzLm1vZGVsLm1ldGEgKSBydi5tZXRhID0gdGhpcy5tb2RlbC5tZXRhXG4gICAgICAgICAgICBpZiggdGhpcy5tb2RlbC5hdHRyaWJ1dGVzICkgcnYuYXR0cmlidXRlcyA9IHRoaXMubW9kZWwuYXR0cmlidXRlc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHRoaXMudGVtcGxhdGVPcHRpb25zICkgcnYub3B0cyA9IHR5cGVvZiB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMudGVtcGxhdGVPcHRpb25zKCkgOiB0aGlzLnRlbXBsYXRlT3B0aW9ucyB8fCB7fVxuXG4gICAgICAgIHJldHVybiBydlxuICAgIH0sXG5cbiAgICBoYW5kbGVMb2dpbigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3J5LmNyZWF0ZSggJ2xvZ2luJywgeyBpbnNlcnRpb246IHsgZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JykgfSB9IClcbiAgICAgICAgLm9uKCBcImxvZ2dlZEluXCIsICgpID0+IHRoaXMub25Mb2dpbigpIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBoaWRlKCBpc1Nsb3cgKSB7XG4gICAgICAgIC8vdmlld3Mgbm90IGhpZGluZyBjb25zaXN0ZW50bHkgd2l0aCB0aGlzXG4gICAgICAgIC8vaWYoICF0aGlzLmVscyB8fCB0aGlzLmlzSGlkaW5nICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cbiAgICAgICAgdGhpcy5pc0hpZGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGVFbCggdGhpcy5lbHMuY29udGFpbmVyLCBpc1Nsb3cgKVxuICAgICAgICAudGhlbiggKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLmhpZGluZyA9IGZhbHNlICkgKVxuICAgIH0sXG4gICAgXG4gICAgaGlkZVN5bmMoKSB7IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgcmV0dXJuIHRoaXMgfSxcblxuICAgIF9oaWRlRWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBhbmltYXRlLW91dCR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICBkZWxldGUgdGhpc1toYXNoXVxuICAgICAgICB0aGlzLmlzSGlkaW5nID0gZmFsc2VcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgfSxcblxuICAgIGhpZGVFbCggZWwsIGlzU2xvdyApIHtcbiAgICAgICAgaWYoIHRoaXMuaXNIaWRkZW4oIGVsICkgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBoYXNoID0gYCR7dGltZX1IaWRlYFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXNbIGhhc2ggXSA9IGUgPT4gdGhpcy5faGlkZUVsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93IClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChgYW5pbWF0ZS1vdXQkeyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGh0bWxUb0ZyYWdtZW50KCBzdHIgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY3RvcnkucmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KCBzdHIgKVxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggdGhpcywgeyBlbHM6IHsgfSwgc2x1cnA6IHsgYXR0cjogJ2RhdGEtanMnLCB2aWV3OiAnZGF0YS12aWV3JywgbmFtZTogJ2RhdGEtbmFtZScsIGltZzogJ2RhdGEtc3JjJyB9LCB2aWV3czogeyB9IH0gKVxuICAgIH0sXG5cbiAgICBpbnNlcnRUb0RvbSggZnJhZ21lbnQsIG9wdGlvbnMgKSB7XG4gICAgICAgIGNvbnN0IGluc2VydGlvbiA9IHR5cGVvZiBvcHRpb25zLmluc2VydGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuaW5zZXJ0aW9uKCkgOiBvcHRpb25zLmluc2VydGlvbjtcblxuICAgICAgICBpbnNlcnRpb24ubWV0aG9kID09PSAnaW5zZXJ0QmVmb3JlJ1xuICAgICAgICAgICAgPyBpbnNlcnRpb24uZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGZyYWdtZW50LCBpbnNlcnRpb24uZWwgKVxuICAgICAgICAgICAgOiBpbnNlcnRpb24uZWxbIGluc2VydGlvbi5tZXRob2QgfHwgJ2FwcGVuZENoaWxkJyBdKCBmcmFnbWVudCApXG4gICAgfSxcblxuICAgIGlzQWxsb3dlZCggdXNlciApIHtcbiAgICAgICAgaWYoICF0aGlzLnJlcXVpcmVzUm9sZSApIHJldHVybiB0cnVlXG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlclJvbGVzID0gbmV3IFNldCggdXNlci5kYXRhLnJvbGVzIClcblxuICAgICAgICBpZiggdHlwZW9mIHRoaXMucmVxdWlyZXNSb2xlID09PSAnc3RyaW5nJyApIHJldHVybiB1c2VyUm9sZXMuaGFzKCB0aGlzLnJlcXVpcmVzUm9sZSApXG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMucmVxdWlyZXNSb2xlICkgKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnJlcXVpcmVzUm9sZS5maW5kKCByb2xlID0+IHVzZXJSb2xlcy5oYXMoIHJvbGUgKSApXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBcbiAgICBpc0hpZGRlbiggZWwgKSB7IHJldHVybiBlbCA/IGVsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykgOiB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSB9LFxuXG4gICAgb25Mb2dpbigpIHtcblxuICAgICAgICBpZiggIXRoaXMuaXNBbGxvd2VkKCB0aGlzLnVzZXIgKSApIHJldHVybiB0aGlzLnNjb290QXdheSgpXG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCkucmVuZGVyKClcbiAgICB9LFxuXG4gICAgb25OYXZpZ2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93KClcbiAgICB9LFxuXG4gICAgc2hvd05vQWNjZXNzKCkge1xuICAgICAgICBhbGVydChcIk5vIHByaXZpbGVnZXMsIHNvblwiKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkgeyByZXR1cm4gdGhpcyB9LFxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiggdGhpcy5kYXRhICkgdGhpcy5tb2RlbCA9IE9iamVjdC5jcmVhdGUoIHRoaXMuTW9kZWwsIHsgfSApLmNvbnN0cnVjdG9yKCB0aGlzLmRhdGEgKVxuXG4gICAgICAgIHRoaXMuc2x1cnBUZW1wbGF0ZSgge1xuICAgICAgICAgICAgaW5zZXJ0aW9uOiB0aGlzLmluc2VydGlvbiB8fCB7IGVsOiBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICBpc1ZpZXc6IHRydWUsXG4gICAgICAgICAgICBzdG9yZUZyYWdtZW50OiB0aGlzLnN0b3JlRnJhZ21lbnQsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogUmVmbGVjdC5hcHBseSggdGhpcy50ZW1wbGF0ZSwgdGhpcy5UZW1wbGF0ZUNvbnRleHQsIFsgdGhpcy5nZXRUZW1wbGF0ZU9wdGlvbnMoKSBdIClcbiAgICAgICAgfSApXG5cbiAgICAgICAgdGhpcy5yZW5kZXJTdWJ2aWV3cygpXG5cbiAgICAgICAgaWYoIHRoaXMuc2l6ZSApIHsgdGhpcy5zaXplKCk7IHRoaXMuT3B0aW1pemVkUmVzaXplLmFkZCggdGhpcy5zaXplLmJpbmQodGhpcykgKSB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdFJlbmRlcigpXG4gICAgfSxcblxuICAgIHJlbW92ZUNoaWxkcmVuKCBlbCApIHtcbiAgICAgICAgd2hpbGUoIGVsLmZpcnN0Q2hpbGQgKSBlbC5yZW1vdmVDaGlsZCggZWwuZmlyc3RDaGlsZCApXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlbmRlclN1YnZpZXdzKCkge1xuICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cy5mb3JFYWNoKCBvYmogPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IG9iai5uYW1lIHx8IG9iai52aWV3XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0geyB9XG5cbiAgICAgICAgICAgIGlmKCB0aGlzLlZpZXdzICYmIHRoaXMuVmlld3NbIG9iai52aWV3IF0gKSBvcHRzID0gdHlwZW9mIHRoaXMuVmlld3NbIG9iai52aWV3IF0gPT09IFwib2JqZWN0XCIgPyB0aGlzLlZpZXdzWyBvYmoudmlldyBdIDogUmVmbGVjdC5hcHBseSggdGhpcy5WaWV3c1sgb2JqLnZpZXcgXSwgdGhpcywgWyBdIClcbiAgICAgICAgICAgIGlmKCB0aGlzLlZpZXdzICYmIHRoaXMuVmlld3NbIG5hbWUgXSApIG9wdHMgPSB0eXBlb2YgdGhpcy5WaWV3c1sgbmFtZSBdID09PSBcIm9iamVjdFwiID8gdGhpcy5WaWV3c1sgbmFtZSBdIDogUmVmbGVjdC5hcHBseSggdGhpcy5WaWV3c1sgbmFtZSBdLCB0aGlzLCBbIF0gKVxuXG4gICAgICAgICAgICB0aGlzLnZpZXdzWyBuYW1lIF0gPSB0aGlzLmZhY3RvcnkuY3JlYXRlKCBvYmoudmlldywgT2JqZWN0LmFzc2lnbiggeyBpbnNlcnRpb246IHsgZWw6IG9iai5lbCwgbWV0aG9kOiAnaW5zZXJ0QmVmb3JlJyB9IH0sIG9wdHMgKSApXG5cbiAgICAgICAgICAgIGlmKCB0aGlzLmV2ZW50cy52aWV3cyApIHtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5ldmVudHMudmlld3NbIG5hbWUgXSApIHRoaXMuZXZlbnRzLnZpZXdzWyBuYW1lIF0uZm9yRWFjaCggYXJyID0+IHRoaXMudmlld3NbIG5hbWUgXS5vbiggYXJyWzBdLCBldmVudERhdGEgPT4gUmVmbGVjdC5hcHBseSggYXJyWzFdLCB0aGlzLCBbIGV2ZW50RGF0YSBdICkgKSApXG4gICAgICAgICAgICAgICAgZWxzZSBpZiggdGhpcy5ldmVudHMudmlld3NbIG9iai52aWV3IF0gKSB0aGlzLmV2ZW50cy52aWV3c1sgb2JqLnZpZXcgXS5mb3JFYWNoKCBhcnIgPT4gdGhpcy52aWV3c1sgbmFtZSBdLm9uKCBhcnJbMF0sIGV2ZW50RGF0YSA9PiBSZWZsZWN0LmFwcGx5KCBhcnJbMV0sIHRoaXMsIFsgZXZlbnREYXRhIF0gKSApIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIG9iai5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpICkgdGhpcy52aWV3c1tuYW1lXS5oaWRlU3luYygpXG4gICAgICAgICAgICBvYmouZWwucmVtb3ZlKClcbiAgICAgICAgfSApXG5cbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMgPSBbIF1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBzY29vdEF3YXkoKSB7XG4gICAgICAgIHRoaXMuVG9hc3Quc2hvd01lc3NhZ2UoICdlcnJvcicsICdZb3UgYXJlIG5vdCBhbGxvd2VkIGhlcmUuJylcbiAgICAgICAgLmNhdGNoKCBlID0+IHsgdGhpcy5FcnJvciggZSApOyB0aGlzLmVtaXQoICduYXZpZ2F0ZScsIGAvYCApIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gdGhpcy5lbWl0KCAnbmF2aWdhdGUnLCBgL2AgKSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgc2hvdyggaXNTbG93ICkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93RWwoIHRoaXMuZWxzLmNvbnRhaW5lciwgaXNTbG93IClcbiAgICB9LFxuXG4gICAgc2hvd1N5bmMoKSB7IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsgcmV0dXJuIHRoaXMgfSxcblxuICAgIF9zaG93RWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzW2hhc2hdIClcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgYW5pbWF0ZS1pbiR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICBkZWxldGUgdGhpc1sgaGFzaCBdXG4gICAgICAgIHJlc29sdmUoKVxuICAgIH0sXG5cbiAgICBzaG93RWwoIGVsLCBpc1Nsb3cgKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIGhhc2ggPSBgJHt0aW1lfVNob3dgXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXNbIGhhc2ggXSA9IGUgPT4gdGhpcy5fc2hvd0VsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93IClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYGFuaW1hdGUtaW4keyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgfSApICAgICAgICBcbiAgICB9LFxuXG4gICAgc2x1cnBFbCggZWwgKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGVsLmdldEF0dHJpYnV0ZSggdGhpcy5zbHVycC5hdHRyICkgfHwgJ2NvbnRhaW5lcidcblxuICAgICAgICBpZigga2V5ID09PSAnY29udGFpbmVyJyApIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoIHRoaXMubmFtZSApXG4gICAgICAgICAgICBpZiggdGhpcy5rbGFzcyApIGVsLmNsYXNzTGlzdC5hZGQoIHRoaXMua2xhc3MgKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbHNbIGtleSBdID0gQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdIClcbiAgICAgICAgICAgID8gdGhpcy5lbHNbIGtleSBdLmNvbmNhdCggZWwgKVxuICAgICAgICAgICAgOiAoIHRoaXMuZWxzWyBrZXkgXSAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICA/IFsgdGhpcy5lbHNbIGtleSBdLCBlbCBdXG4gICAgICAgICAgICAgICAgOiBlbFxuXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnNsdXJwLmF0dHIpXG5cbiAgICAgICAgaWYoIHRoaXMuZXZlbnRzWyBrZXkgXSApIHRoaXMuZGVsZWdhdGVFdmVudHMoIGtleSwgZWwgKVxuICAgIH0sXG5cbiAgICBzbHVycFRlbXBsYXRlKCBvcHRpb25zICkge1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSB0aGlzLmh0bWxUb0ZyYWdtZW50KCBvcHRpb25zLnRlbXBsYXRlICksXG4gICAgICAgICAgICBzZWxlY3RvciA9IGBbJHt0aGlzLnNsdXJwLmF0dHJ9XWAsXG4gICAgICAgICAgICB2aWV3U2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC52aWV3fV1gLFxuICAgICAgICAgICAgaW1nU2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC5pbWd9XWAsXG4gICAgICAgICAgICBmaXJzdEVsID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvcignKicpXG5cbiAgICAgICAgaWYoIG9wdGlvbnMuaXNWaWV3IHx8IGZpcnN0RWwuZ2V0QXR0cmlidXRlKCB0aGlzLnNsdXJwLmF0dHIgKSApIHRoaXMuc2x1cnBFbCggZmlyc3RFbCApXG4gICAgICAgIEFycmF5LmZyb20oIGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGAke3NlbGVjdG9yfSwgJHt2aWV3U2VsZWN0b3J9LCAke2ltZ1NlbGVjdG9yfWAgKSApLmZvckVhY2goIGVsID0+IHtcbiAgICAgICAgICAgIGlmKCBlbC5oYXNBdHRyaWJ1dGUoIHRoaXMuc2x1cnAuYXR0ciApICkgeyB0aGlzLnNsdXJwRWwoIGVsICkgfVxuICAgICAgICAgICAgZWxzZSBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLmltZyApICkgdGhpcy5mYWRlSW5JbWFnZSggZWwgKVxuICAgICAgICAgICAgZWxzZSBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLnZpZXcgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cy5wdXNoKCB7IGVsLCB2aWV3OiBlbC5nZXRBdHRyaWJ1dGUodGhpcy5zbHVycC52aWV3KSwgbmFtZTogZWwuZ2V0QXR0cmlidXRlKHRoaXMuc2x1cnAubmFtZSkgfSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKVxuICAgXG4gICAgICAgIGlmKCBvcHRpb25zLnN0b3JlRnJhZ21lbnQgKSByZXR1cm4gT2JqZWN0LmFzc2lnbiggdGhpcywgeyBmcmFnbWVudCB9IClcblxuICAgICAgICB0aGlzLmluc2VydFRvRG9tKCBmcmFnbWVudCwgb3B0aW9ucyApXG5cbiAgICAgICAgaWYoIG9wdGlvbnMucmVuZGVyU3Vidmlld3MgKSB0aGlzLnJlbmRlclN1YnZpZXdzKClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICB1bmJpbmRFdmVudCgga2V5LCBldmVudCwgZWwgKSB7XG4gICAgICAgIGNvbnN0IGVscyA9IGVsID8gWyBlbCBdIDogQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdICkgPyB0aGlzLmVsc1sga2V5IF0gOiBbIHRoaXMuZWxzWyBrZXkgXSBdLFxuICAgICAgICAgICBuYW1lID0gdGhpcy5nZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKVxuXG4gICAgICAgIGVscy5mb3JFYWNoKCBlbCA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCBldmVudCB8fCAnY2xpY2snLCB0aGlzWyBgXyR7bmFtZX1gIF0gKSApXG4gICAgfVxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIHtcblxuICAgIGFkZChjYWxsYmFjaykge1xuICAgICAgICBpZiggIXRoaXMuY2FsbGJhY2tzLmxlbmd0aCApIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykgKVxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuICAgIH0sXG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICBpZiggdGhpcy5ydW5uaW5nICkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICAgICAgICBcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLnJ1bkNhbGxiYWNrcy5iaW5kKHRoaXMpIClcbiAgICAgICAgICAgIDogc2V0VGltZW91dCggdGhpcy5ydW5DYWxsYmFja3MsIDY2IClcbiAgICB9LFxuXG4gICAgcnVuQ2FsbGJhY2tzKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzLmZpbHRlciggY2FsbGJhY2sgPT4gY2FsbGJhY2soKSApXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlIFxuICAgIH1cblxufSwgeyBjYWxsYmFja3M6IHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBbXSB9LCBydW5uaW5nOiB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogZmFsc2UgfSB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHJldHVyblxuYDxmb290ZXI+XG4gICAgPGRpdj5cbiAgICAgICAgPHNwYW4+Q29udGFjdDwvc3Bhbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICA8YSBocmVmPVwibWFpbHRvOmluZm9AZnV0dXJlZGF5cy5pb1wiPmluZm9AZnV0dXJlZGF5cy5pbzwvYT5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICAgIDxzcGFuPkNvcHlyaWdodDwvc3Bhbj5cbiAgICAgICAgPHNwYW4+bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIEZ1dHVyZURheXMgU29mdHdhcmU8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Zvb3Rlcj5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCB7IG1vZGVsIH0gKSB7XG5jb25zdCBuYXZPcHRpb25zID0gbW9kZWwuZm9yRWFjaCggZGF0dW0gPT4gYDxzcGFuPiR7dGhpcy5DYXBpdGFsaXplRmlyc3RMZXR0ZXIoZGF0dW0pfTwvc3Bhbj5gIClcbnJldHVybiBgPG5hdj5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHNwYW4+RnV0dXJlPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+RGF5czwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+U29mdHdhcmU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGRhdGEtanM9XCJuYXZMaXN0XCI+JHtuYXZPcHRpb25zfTwvZGl2PlxuPC9uYXY+XG5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHsgfSwgcmVxdWlyZSgnLi9NeU9iamVjdCcpLCB7XG5cbiAgICBDcmVhdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VyKCB0aGlzLmF0dHJpYnV0ZXMsIGF0dHIgPT4gKCB7IFthdHRyLm5hbWVdOiB0eXBlb2YgYXR0ci5kZWZhdWx0ID09PSAnZnVuY3Rpb24nID8gYXR0ci5kZWZhdWx0KCkgOiBhdHRyLmRlZmF1bHQgfSApIClcbiAgICB9LFxuXG4gICAgYXR0cmlidXRlczogWyBdLFxuXG4gICAgZGF0YTogeyB9LFxuXG4gICAgY29uc3RydWN0b3IoIGRhdGE9e30sIG9wdHM9e30gKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oIHRoaXMsIHsgc3RvcmU6IHsgfSwgZGF0YSB9LCBvcHRzIClcblxuICAgICAgICBpZiggdGhpcy5zdG9yZUJ5ICkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZUJ5LmZvckVhY2goIGtleSA9PiB0aGlzLnN0b3JlWyBrZXkgXSA9IHsgfSApXG4gICAgICAgICAgICB0aGlzLl9zdG9yZSgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBtZXRhOiB7IH0sXG5cbiAgICBzb3J0KCBvcHRzICkge1xuICAgICAgICBjb25zdCBhdHRyID0gT2JqZWN0LmtleXMoIG9wdHMgKVswXSxcbiAgICAgICAgICAgIHZhbHVlID0gb3B0c1thdHRyXTtcblxuICAgICAgICB0aGlzLmRhdGEuc29ydCggKCBhLCBiICkgPT5cbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgPyBhW2F0dHJdIDwgYlthdHRyXSA/IC0xIDogMVxuICAgICAgICAgICAgICAgIDogYlthdHRyXSA8IGFbYXR0cl0gPyAtMSA6IDFcbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIF9yZXNldFN0b3JlKCBzdG9yZUJ5ICkge1xuICAgICAgICB0aGlzLnN0b3JlID0geyB9XG4gICAgICAgIHN0b3JlQnkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLnN0b3JlWyBhdHRyIF0gPSB7IH0gKVxuICAgICAgICB0aGlzLnN0b3JlQnkgPSBzdG9yZUJ5XG4gICAgfSxcblxuICAgIF9zdG9yZSggZGF0YSApIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwgdGhpcy5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCggZGF0dW0gPT4gdGhpcy5zdG9yZUJ5LmZvckVhY2goIGF0dHIgPT4gdGhpcy5fc3RvcmVBdHRyKCBkYXR1bSwgYXR0ciApICkgKVxuICAgIH0sXG5cbiAgICBfc3RvcmVBdHRyKCBkYXR1bSwgYXR0ciApIHtcbiAgICAgICAgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0gPVxuICAgICAgICAgICAgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF1cbiAgICAgICAgICAgICAgICA/IEFycmF5LmlzQXJyYXkoIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdIClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXS5jb25jYXQoIGRhdHVtIClcbiAgICAgICAgICAgICAgICAgICAgOlsgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0sIGRhdHVtIF1cbiAgICAgICAgICAgICAgICA6IGRhdHVtXG4gICAgfSxcblxuICAgIF9zdG9yZU9uZSggZGF0dW0gKSB7XG4gICAgICAgIHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSApXG4gICAgfVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gZXJyID0+IHsgY29uc29sZS5sb2coIGVyci5zdGFjayB8fCBlcnIgKSB9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGNhcGl0YWxpemVGaXJzdExldHRlcjogc3RyaW5nID0+IHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKSxcblxuICAgIGdldEludFJhbmdlKCBpbnQgKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKCBBcnJheSggaW50ICkua2V5cygpIClcbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tSW5jbHVzaXZlSW50ZWdlciggbWluLCBtYXggKSB7XG4gICAgICAgIG1pbiA9IE1hdGguY2VpbChtaW4pXG4gICAgICAgIG1heCA9IE1hdGguZmxvb3IobWF4KVxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pblxuICAgIH0sXG5cbiAgICBvbWl0KCBvYmosIGtleXMgKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyggb2JqICkuZmlsdGVyKCBrZXkgPT4gIWtleXMuaW5jbHVkZXMoIGtleSApICkucmVkdWNlKCAoIG1lbW8sIGtleSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIHsgW2tleV06IG9ialtrZXldIH0gKSwgeyB9IClcbiAgICB9LFxuXG4gICAgcGljayggb2JqLCBrZXlzICkge1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoICggbWVtbywga2V5ICkgPT4gT2JqZWN0LmFzc2lnbiggbWVtbywgeyBba2V5XTogb2JqW2tleV0gfSApLCB7IH0gKVxuICAgIH0sXG5cbiAgICByZWR1Y2VyKCBhcnIsIGZuICkgeyByZXR1cm4gYXJyLnJlZHVjZSggKCBtZW1vLCBpdGVtLCBpICkgPT4gT2JqZWN0LmFzc2lnbiggbWVtbywgZm4oIGl0ZW0sIGkgKSApLCB7IH0gKSB9LFxuXG4gICAgc2h1ZmZsZUFycmF5KCBhcnIgKSB7XG4gICAgICAgIGNvbnN0IHJ2ID0gQXJyYXkuZnJvbSggYXJyIClcbiAgICAgICBcbiAgICAgICAgcnYuZm9yRWFjaCggKCBpdGVtLCBpICkgPT4ge1xuICAgICAgICAgICAgaWYoIGkgPT09IHJ2Lmxlbmd0aCAtIDEgKSByZXR1cm4gXG4gICAgICAgICAgICBjb25zdCBpbnQgPSB0aGlzLmdldFJhbmRvbUluY2x1c2l2ZUludGVnZXIoIGksIHJ2Lmxlbmd0aCAtIDEgKSxcbiAgICAgICAgICAgICAgICBob2xkZXIgPSBydlsgaSBdXG5cbiAgICAgICAgICAgIHJ2W2ldID0gcnZbaW50XVxuICAgICAgICAgICAgcnZbaW50XSA9IGhvbGRlclxuICAgICAgICB9IClcblxuICAgICAgICByZXR1cm4gcnZcbiAgICB9LFxuXG4gICAgRXJyb3I6IHJlcXVpcmUoJy4vTXlFcnJvcicpLFxuXG4gICAgUDogKCBmdW4sIGFyZ3M9WyBdLCB0aGlzQXJnICkgPT5cbiAgICAgICAgbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4gUmVmbGVjdC5hcHBseSggZnVuLCB0aGlzQXJnIHx8IHRoaXMsIGFyZ3MuY29uY2F0KCAoIGUsIC4uLmNhbGxiYWNrICkgPT4gZSA/IHJlamVjdChlKSA6IHJlc29sdmUoY2FsbGJhY2spICkgKSApLFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkgeyByZXR1cm4gdGhpcyB9XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvKiBzbW9vdGhzY3JvbGwgdjAuNC4wIC0gMjAxNyAtIER1c3RhbiBLYXN0ZW4sIEplcmVtaWFzIE1lbmljaGVsbGkgLSBNSVQgTGljZW5zZSAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qXG4gICAqIGFsaWFzZXNcbiAgICogdzogd2luZG93IGdsb2JhbCBvYmplY3RcbiAgICogZDogZG9jdW1lbnRcbiAgICovXG4gIHZhciB3ID0gd2luZG93O1xuICB2YXIgZCA9IGRvY3VtZW50O1xuXG4gIC8qKlxuICAgKiBpbmRpY2F0ZXMgaWYgYSB0aGUgY3VycmVudCBicm93c2VyIGlzIG1hZGUgYnkgTWljcm9zb2Z0XG4gICAqIEBtZXRob2QgaXNNaWNyb3NvZnRCcm93c2VyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyQWdlbnRcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBpc01pY3Jvc29mdEJyb3dzZXIodXNlckFnZW50KSB7XG4gICAgdmFyIHVzZXJBZ2VudFBhdHRlcm5zID0gWydNU0lFICcsICdUcmlkZW50LycsICdFZGdlLyddO1xuXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAodXNlckFnZW50UGF0dGVybnMuam9pbignfCcpKS50ZXN0KHVzZXJBZ2VudCk7XG4gIH1cblxuICAgLy8gcG9seWZpbGxcbiAgZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gICAgLy8gcmV0dXJuIGlmIHNjcm9sbCBiZWhhdmlvciBpcyBzdXBwb3J0ZWQgYW5kIHBvbHlmaWxsIGlzIG5vdCBmb3JjZWRcbiAgICBpZiAoJ3Njcm9sbEJlaGF2aW9yJyBpbiBkLmRvY3VtZW50RWxlbWVudC5zdHlsZVxuICAgICAgJiYgdy5fX2ZvcmNlU21vb3RoU2Nyb2xsUG9seWZpbGxfXyAhPT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGdsb2JhbHNcbiAgICB2YXIgRWxlbWVudCA9IHcuSFRNTEVsZW1lbnQgfHwgdy5FbGVtZW50O1xuICAgIHZhciBTQ1JPTExfVElNRSA9IDQ2ODtcblxuICAgIC8qXG4gICAgICogSUUgaGFzIHJvdW5kaW5nIGJ1ZyByb3VuZGluZyBkb3duIGNsaWVudEhlaWdodCBhbmQgY2xpZW50V2lkdGggYW5kXG4gICAgICogcm91bmRpbmcgdXAgc2Nyb2xsSGVpZ2h0IGFuZCBzY3JvbGxXaWR0aCBjYXVzaW5nIGZhbHNlIHBvc2l0aXZlc1xuICAgICAqIG9uIGhhc1Njcm9sbGFibGVTcGFjZVxuICAgICAqL1xuICAgIHZhciBST1VORElOR19UT0xFUkFOQ0UgPSBpc01pY3Jvc29mdEJyb3dzZXIody5uYXZpZ2F0b3IudXNlckFnZW50KSA/IDEgOiAwO1xuXG4gICAgLy8gb2JqZWN0IGdhdGhlcmluZyBvcmlnaW5hbCBzY3JvbGwgbWV0aG9kc1xuICAgIHZhciBvcmlnaW5hbCA9IHtcbiAgICAgIHNjcm9sbDogdy5zY3JvbGwgfHwgdy5zY3JvbGxUbyxcbiAgICAgIHNjcm9sbEJ5OiB3LnNjcm9sbEJ5LFxuICAgICAgZWxlbWVudFNjcm9sbDogRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIHx8IHNjcm9sbEVsZW1lbnQsXG4gICAgICBzY3JvbGxJbnRvVmlldzogRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXdcbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIHRpbWluZyBtZXRob2RcbiAgICB2YXIgbm93ID0gdy5wZXJmb3JtYW5jZSAmJiB3LnBlcmZvcm1hbmNlLm5vd1xuICAgICAgPyB3LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHcucGVyZm9ybWFuY2UpXG4gICAgICA6IERhdGUubm93O1xuXG4gICAgLyoqXG4gICAgICogY2hhbmdlcyBzY3JvbGwgcG9zaXRpb24gaW5zaWRlIGFuIGVsZW1lbnRcbiAgICAgKiBAbWV0aG9kIHNjcm9sbEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzY3JvbGxFbGVtZW50KHgsIHkpIHtcbiAgICAgIHRoaXMuc2Nyb2xsTGVmdCA9IHg7XG4gICAgICB0aGlzLnNjcm9sbFRvcCA9IHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyByZXN1bHQgb2YgYXBwbHlpbmcgZWFzZSBtYXRoIGZ1bmN0aW9uIHRvIGEgbnVtYmVyXG4gICAgICogQG1ldGhvZCBlYXNlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGtcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVhc2Uoaykge1xuICAgICAgcmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYSBzbW9vdGggYmVoYXZpb3Igc2hvdWxkIGJlIGFwcGxpZWRcbiAgICAgKiBAbWV0aG9kIHNob3VsZEJhaWxPdXRcbiAgICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IGZpcnN0QXJnXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2hvdWxkQmFpbE91dChmaXJzdEFyZykge1xuICAgICAgaWYgKGZpcnN0QXJnID09PSBudWxsXG4gICAgICAgIHx8IHR5cGVvZiBmaXJzdEFyZyAhPT0gJ29iamVjdCdcbiAgICAgICAgfHwgZmlyc3RBcmcuYmVoYXZpb3IgPT09IHVuZGVmaW5lZFxuICAgICAgICB8fCBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ2F1dG8nXG4gICAgICAgIHx8IGZpcnN0QXJnLmJlaGF2aW9yID09PSAnaW5zdGFudCcpIHtcbiAgICAgICAgLy8gZmlyc3QgYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdC9udWxsXG4gICAgICAgIC8vIG9yIGJlaGF2aW9yIGlzIGF1dG8sIGluc3RhbnQgb3IgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGZpcnN0QXJnID09PSAnb2JqZWN0JyAmJiBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ3Ntb290aCcpIHtcbiAgICAgICAgLy8gZmlyc3QgYXJndW1lbnQgaXMgYW4gb2JqZWN0IGFuZCBiZWhhdmlvciBpcyBzbW9vdGhcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIGJlaGF2aW9yIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdiZWhhdmlvciBtZW1iZXIgb2YgU2Nyb2xsT3B0aW9ucyAnXG4gICAgICAgICsgZmlyc3RBcmcuYmVoYXZpb3JcbiAgICAgICAgKyAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciBlbnVtZXJhdGlvbiBTY3JvbGxCZWhhdmlvci4nXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBzY3JvbGxhYmxlIHNwYWNlIGluIHRoZSBwcm92aWRlZCBheGlzXG4gICAgICogQG1ldGhvZCBoYXNTY3JvbGxhYmxlU3BhY2VcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsIGF4aXMpIHtcbiAgICAgIGlmIChheGlzID09PSAnWScpIHtcbiAgICAgICAgcmV0dXJuIChlbC5jbGllbnRIZWlnaHQgKyBST1VORElOR19UT0xFUkFOQ0UpIDwgZWwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBpZiAoYXhpcyA9PT0gJ1gnKSB7XG4gICAgICAgIHJldHVybiAoZWwuY2xpZW50V2lkdGggKyBST1VORElOR19UT0xFUkFOQ0UpIDwgZWwuc2Nyb2xsV2lkdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgaGFzIGEgc2Nyb2xsYWJsZSBvdmVyZmxvdyBwcm9wZXJ0eSBpbiB0aGUgYXhpc1xuICAgICAqIEBtZXRob2QgY2FuT3ZlcmZsb3dcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjYW5PdmVyZmxvdyhlbCwgYXhpcykge1xuICAgICAgdmFyIG92ZXJmbG93VmFsdWUgPSB3LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpWydvdmVyZmxvdycgKyBheGlzXTtcblxuICAgICAgcmV0dXJuIG92ZXJmbG93VmFsdWUgPT09ICdhdXRvJyB8fCBvdmVyZmxvd1ZhbHVlID09PSAnc2Nyb2xsJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBjYW4gYmUgc2Nyb2xsZWQgaW4gZWl0aGVyIGF4aXNcbiAgICAgKiBAbWV0aG9kIGlzU2Nyb2xsYWJsZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzU2Nyb2xsYWJsZShlbCkge1xuICAgICAgdmFyIGlzU2Nyb2xsYWJsZVkgPSBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsICdZJykgJiYgY2FuT3ZlcmZsb3coZWwsICdZJyk7XG4gICAgICB2YXIgaXNTY3JvbGxhYmxlWCA9IGhhc1Njcm9sbGFibGVTcGFjZShlbCwgJ1gnKSAmJiBjYW5PdmVyZmxvdyhlbCwgJ1gnKTtcblxuICAgICAgcmV0dXJuIGlzU2Nyb2xsYWJsZVkgfHwgaXNTY3JvbGxhYmxlWDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmaW5kcyBzY3JvbGxhYmxlIHBhcmVudCBvZiBhbiBlbGVtZW50XG4gICAgICogQG1ldGhvZCBmaW5kU2Nyb2xsYWJsZVBhcmVudFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gZWxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU2Nyb2xsYWJsZVBhcmVudChlbCkge1xuICAgICAgdmFyIGlzQm9keTtcblxuICAgICAgZG8ge1xuICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG5cbiAgICAgICAgaXNCb2R5ID0gZWwgPT09IGQuYm9keTtcbiAgICAgIH0gd2hpbGUgKGlzQm9keSA9PT0gZmFsc2UgJiYgaXNTY3JvbGxhYmxlKGVsKSA9PT0gZmFsc2UpO1xuXG4gICAgICBpc0JvZHkgPSBudWxsO1xuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZiBpbnZva2VkIGZ1bmN0aW9uIHRoYXQsIGdpdmVuIGEgY29udGV4dCwgc3RlcHMgdGhyb3VnaCBzY3JvbGxpbmdcbiAgICAgKiBAbWV0aG9kIHN0ZXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RlcChjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFyIGN1cnJlbnRYO1xuICAgICAgdmFyIGN1cnJlbnRZO1xuICAgICAgdmFyIGVsYXBzZWQgPSAodGltZSAtIGNvbnRleHQuc3RhcnRUaW1lKSAvIFNDUk9MTF9USU1FO1xuXG4gICAgICAvLyBhdm9pZCBlbGFwc2VkIHRpbWVzIGhpZ2hlciB0aGFuIG9uZVxuICAgICAgZWxhcHNlZCA9IGVsYXBzZWQgPiAxID8gMSA6IGVsYXBzZWQ7XG5cbiAgICAgIC8vIGFwcGx5IGVhc2luZyB0byBlbGFwc2VkIHRpbWVcbiAgICAgIHZhbHVlID0gZWFzZShlbGFwc2VkKTtcblxuICAgICAgY3VycmVudFggPSBjb250ZXh0LnN0YXJ0WCArIChjb250ZXh0LnggLSBjb250ZXh0LnN0YXJ0WCkgKiB2YWx1ZTtcbiAgICAgIGN1cnJlbnRZID0gY29udGV4dC5zdGFydFkgKyAoY29udGV4dC55IC0gY29udGV4dC5zdGFydFkpICogdmFsdWU7XG5cbiAgICAgIGNvbnRleHQubWV0aG9kLmNhbGwoY29udGV4dC5zY3JvbGxhYmxlLCBjdXJyZW50WCwgY3VycmVudFkpO1xuXG4gICAgICAvLyBzY3JvbGwgbW9yZSBpZiB3ZSBoYXZlIG5vdCByZWFjaGVkIG91ciBkZXN0aW5hdGlvblxuICAgICAgaWYgKGN1cnJlbnRYICE9PSBjb250ZXh0LnggfHwgY3VycmVudFkgIT09IGNvbnRleHQueSkge1xuICAgICAgICB3LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwLmJpbmQodywgY29udGV4dCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNjcm9sbHMgd2luZG93IG9yIGVsZW1lbnQgd2l0aCBhIHNtb290aCBiZWhhdmlvclxuICAgICAqIEBtZXRob2Qgc21vb3RoU2Nyb2xsXG4gICAgICogQHBhcmFtIHtPYmplY3R8Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoZWwsIHgsIHkpIHtcbiAgICAgIHZhciBzY3JvbGxhYmxlO1xuICAgICAgdmFyIHN0YXJ0WDtcbiAgICAgIHZhciBzdGFydFk7XG4gICAgICB2YXIgbWV0aG9kO1xuICAgICAgdmFyIHN0YXJ0VGltZSA9IG5vdygpO1xuXG4gICAgICAvLyBkZWZpbmUgc2Nyb2xsIGNvbnRleHRcbiAgICAgIGlmIChlbCA9PT0gZC5ib2R5KSB7XG4gICAgICAgIHNjcm9sbGFibGUgPSB3O1xuICAgICAgICBzdGFydFggPSB3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldDtcbiAgICAgICAgc3RhcnRZID0gdy5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQ7XG4gICAgICAgIG1ldGhvZCA9IG9yaWdpbmFsLnNjcm9sbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbGFibGUgPSBlbDtcbiAgICAgICAgc3RhcnRYID0gZWwuc2Nyb2xsTGVmdDtcbiAgICAgICAgc3RhcnRZID0gZWwuc2Nyb2xsVG9wO1xuICAgICAgICBtZXRob2QgPSBzY3JvbGxFbGVtZW50O1xuICAgICAgfVxuXG4gICAgICAvLyBzY3JvbGwgbG9vcGluZyBvdmVyIGEgZnJhbWVcbiAgICAgIHN0ZXAoe1xuICAgICAgICBzY3JvbGxhYmxlOiBzY3JvbGxhYmxlLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWUsXG4gICAgICAgIHN0YXJ0WDogc3RhcnRYLFxuICAgICAgICBzdGFydFk6IHN0YXJ0WSxcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT1JJR0lOQUwgTUVUSE9EUyBPVkVSUklERVNcbiAgICAvLyB3LnNjcm9sbCBhbmQgdy5zY3JvbGxUb1xuICAgIHcuc2Nyb2xsID0gdy5zY3JvbGxUbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuc2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogKHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0KSxcbiAgICAgICAgICAvLyB1c2UgdG9wIHByb3AsIHNlY29uZCBhcmd1bWVudCBpZiBwcmVzZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbFlcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IGFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICA6ICh3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldClcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB3LFxuICAgICAgICBkLmJvZHksXG4gICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLmxlZnRcbiAgICAgICAgICA6ICh3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldCksXG4gICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgOiAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvLyB3LnNjcm9sbEJ5XG4gICAgdy5zY3JvbGxCeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgb3JpZ2luYWwuc2Nyb2xsQnkuY2FsbChcbiAgICAgICAgICB3LFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLmxlZnRcbiAgICAgICAgICAgIDogdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMF1cbiAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICA6IDBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB3LFxuICAgICAgICBkLmJvZHksXG4gICAgICAgIH5+YXJndW1lbnRzWzBdLmxlZnQgKyAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxuICAgICAgICB+fmFyZ3VtZW50c1swXS50b3AgKyAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGwgYW5kIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvXG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsID0gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGlmIG9uZSBudW1iZXIgaXMgcGFzc2VkLCB0aHJvdyBlcnJvciB0byBtYXRjaCBGaXJlZm94IGltcGxlbWVudGF0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJyAmJiBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVmFsdWUgY291bGRuXFwndCBiZSBjb252ZXJ0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9yaWdpbmFsLmVsZW1lbnRTY3JvbGwuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIC8vIHVzZSBsZWZ0IHByb3AsIGZpcnN0IG51bWJlciBhcmd1bWVudCBvciBmYWxsYmFjayB0byBzY3JvbGxMZWZ0XG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF1cbiAgICAgICAgICAgICAgOiB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsVG9wXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IH5+YXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxUb3BcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBsZWZ0ID0gYXJndW1lbnRzWzBdLmxlZnQ7XG4gICAgICB2YXIgdG9wID0gYXJndW1lbnRzWzBdLnRvcDtcblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2Nyb2xsTGVmdCA6IH5+bGVmdCxcbiAgICAgICAgdHlwZW9mIHRvcCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLnNjcm9sbFRvcCA6IH5+dG9wXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxCeVxuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICBvcmlnaW5hbC5lbGVtZW50U2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLmxlZnQgKyB0aGlzLnNjcm9sbExlZnRcbiAgICAgICAgICAgIDogfn5hcmd1bWVudHNbMF0gKyB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcCArIHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICAgICA6IH5+YXJndW1lbnRzWzFdICsgdGhpcy5zY3JvbGxUb3BcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Nyb2xsKHtcbiAgICAgICAgbGVmdDogfn5hcmd1bWVudHNbMF0ubGVmdCArIHRoaXMuc2Nyb2xsTGVmdCxcbiAgICAgICAgdG9wOiB+fmFyZ3VtZW50c1swXS50b3AgKyB0aGlzLnNjcm9sbFRvcCxcbiAgICAgICAgYmVoYXZpb3I6IGFyZ3VtZW50c1swXS5iZWhhdmlvclxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuc2Nyb2xsSW50b1ZpZXcuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzBdXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICB2YXIgc2Nyb2xsYWJsZVBhcmVudCA9IGZpbmRTY3JvbGxhYmxlUGFyZW50KHRoaXMpO1xuICAgICAgdmFyIHBhcmVudFJlY3RzID0gc2Nyb2xsYWJsZVBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBjbGllbnRSZWN0cyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIGlmIChzY3JvbGxhYmxlUGFyZW50ICE9PSBkLmJvZHkpIHtcbiAgICAgICAgLy8gcmV2ZWFsIGVsZW1lbnQgaW5zaWRlIHBhcmVudFxuICAgICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQsXG4gICAgICAgICAgc2Nyb2xsYWJsZVBhcmVudC5zY3JvbGxMZWZ0ICsgY2xpZW50UmVjdHMubGVmdCAtIHBhcmVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgc2Nyb2xsYWJsZVBhcmVudC5zY3JvbGxUb3AgKyBjbGllbnRSZWN0cy50b3AgLSBwYXJlbnRSZWN0cy50b3BcbiAgICAgICAgKTtcblxuICAgICAgICAvLyByZXZlYWwgcGFyZW50IGluIHZpZXdwb3J0IHVubGVzcyBpcyBmaXhlZFxuICAgICAgICBpZiAody5nZXRDb21wdXRlZFN0eWxlKHNjcm9sbGFibGVQYXJlbnQpLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgICAgdy5zY3JvbGxCeSh7XG4gICAgICAgICAgICBsZWZ0OiBwYXJlbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBwYXJlbnRSZWN0cy50b3AsXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV2ZWFsIGVsZW1lbnQgaW4gdmlld3BvcnRcbiAgICAgICAgdy5zY3JvbGxCeSh7XG4gICAgICAgICAgbGVmdDogY2xpZW50UmVjdHMubGVmdCxcbiAgICAgICAgICB0b3A6IGNsaWVudFJlY3RzLnRvcCxcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBjb21tb25qc1xuICAgIG1vZHVsZS5leHBvcnRzID0geyBwb2x5ZmlsbDogcG9seWZpbGwgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBnbG9iYWxcbiAgICBwb2x5ZmlsbCgpO1xuICB9XG5cbn0oKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuLi8uLi8uLi9jbGllbnQvanMvdmlld3MvX19wcm90b19fJyksIHtcblxuICAgIFRvYXN0TWVzc2FnZTogcmVxdWlyZSgnLi9Ub2FzdE1lc3NhZ2UnKSxcblxuICAgIG5hbWU6ICdUb2FzdCcsXG5cbiAgICBwb3N0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0geyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgcmVxdWlyZXNMb2dpbjogZmFsc2UsXG5cbiAgICBjcmVhdGVNZXNzYWdlKCB0eXBlLCBtZXNzYWdlICkge1xuICAgICAgICBpZiggIXRoaXMubWVzc2FnZXNbIG1lc3NhZ2UgXSApIHRoaXMubWVzc2FnZXNbIG1lc3NhZ2UgXSA9IE9iamVjdC5jcmVhdGUoIHRoaXMuVG9hc3RNZXNzYWdlLCB7XG4gICAgICAgICAgICBpbnNlcnRpb246IHsgdmFsdWU6IHsgZWw6IHRoaXMuZWxzLmNvbnRhaW5lciB9IH1cbiAgICAgICAgfSApLmNvbnN0cnVjdG9yKClcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlc1sgbWVzc2FnZSBdLnNob3dNZXNzYWdlKCB0eXBlLCBtZXNzYWdlIClcblxuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvVG9hc3QnKVxuXG59ICksIHsgfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuLi8uLi8uLi9jbGllbnQvanMvdmlld3MvX19wcm90b19fJyksIHtcblxuICAgIG5hbWU6ICdUb2FzdE1lc3NhZ2UnLFxuXG4gICAgSWNvbnM6IHtcbiAgICAgICAgZXJyb3I6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2xpYi9lcnJvcicpKCksXG4gICAgICAgIHN1Y2Nlc3M6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2xpYi9jaGVja21hcmsnKSgpXG4gICAgfSxcblxuICAgIHBvc3RSZW5kZXIoKSB7XG5cbiAgICAgICAgdGhpcy5vbiggJ3Nob3duJywgKCkgPT4gdGhpcy5zdGF0dXMgPSAnc2hvd24nIClcbiAgICAgICAgdGhpcy5vbiggJ2hpZGRlbicsICgpID0+IHRoaXMuc3RhdHVzID0gJ2hpZGRlbicgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlcXVpcmVzTG9naW46IGZhbHNlLFxuXG4gICAgc2hvd01lc3NhZ2UoIHR5cGUsIG1lc3NhZ2UgKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSAgPT4ge1xuICAgICAgICAgICAgaWYoIC9zaG93Ly50ZXN0KCB0aGlzLnN0YXR1cyApICkgdGhpcy50ZWFyZG93bigpXG5cbiAgICAgICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdmVcblxuICAgICAgICAgICAgaWYoIHR5cGUgIT09ICdlcnJvcicgKSB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3VjY2VzcycpXG5cbiAgICAgICAgICAgIHRoaXMuZWxzLm1lc3NhZ2UudGV4dENvbnRlbnQgPSBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLmVscy50aXRsZS50ZXh0Q29udGVudCA9IHR5cGUgPT09ICdlcnJvcicgPyAnRXJyb3InIDogJ1N1Y2Nlc3MnXG4gICAgICAgICAgICB0aGlzLnNsdXJwVGVtcGxhdGUoIHsgaW5zZXJ0aW9uOiB7IGVsOiB0aGlzLmVscy5pY29uIH0sIHRlbXBsYXRlOiB0eXBlID09PSAnZXJyb3InID8gdGhpcy5JY29ucy5lcnJvciA6IHRoaXMuSWNvbnMuc3VjY2VzcyB9IClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAnc2hvd2luZydcblxuICAgICAgICAgICAgdGhpcy5zaG93KCB0cnVlIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB0aGlzLmhpZGUoIHRydWUgKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gdGhpcy50ZWFyZG93bigpIClcbiAgICAgICAgICAgIC5jYXRjaCggcmVqZWN0IClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIHRlYXJkb3duKCkge1xuICAgICAgICBpZiggdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnc3VjY2VzcycpICkgdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Y2Nlc3MnKVxuICAgICAgICB0aGlzLmVscy5tZXNzYWdlLnRleHRDb250ZW50ID0gJydcbiAgICAgICAgdGhpcy5lbHMubWVzc2FnZS50aXRsZSA9ICcnXG4gICAgICAgIGlmKCB0aGlzLmVscy5pY29uLmZpcnN0Q2hpbGQgKSB0aGlzLmVscy5pY29uLnJlbW92ZUNoaWxkKCB0aGlzLmVscy5pY29uLmZpcnN0Q2hpbGQgKVxuICAgICAgICB0aGlzLnJlc29sdXRpb24oKVxuICAgIH0sXG5cbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvVG9hc3RNZXNzYWdlJylcblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IGA8ZGl2PjwvZGl2PmBcbiIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4gXG5gPGRpdiBjbGFzcz1cImhpZGRlblwiPlxuICAgIDxkaXYgZGF0YS1qcz1cImljb25cIj48L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtanM9XCJ0aXRsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtanM9XCJtZXNzYWdlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gIiwibW9kdWxlLmV4cG9ydHMgPSAocD17fSkgPT4gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIGRhdGEtanM9XCIke3AubmFtZSB8fCAnY2hlY2ttYXJrJ31cIiBjbGFzcz1cImNoZWNrbWFya1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG5cdCB3aWR0aD1cIjk3LjYxOXB4XCIgaGVpZ2h0PVwiOTcuNjE4cHhcIiB2aWV3Qm94PVwiMCAwIDk3LjYxOSA5Ny42MThcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTcuNjE5IDk3LjYxODtcIlxuXHQgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbjxnPlxuXHQ8cGF0aCBkPVwiTTk2LjkzOSwxNy4zNThMODMuOTY4LDUuOTU5Yy0wLjM5OC0wLjM1Mi0wLjkyNy0wLjUzMS0xLjQ0OS0wLjQ5NEM4MS45OSw1LjUsODEuNDk2LDUuNzQzLDgxLjE0Niw2LjE0MkwzNC4xLDU5LjY4OFxuXHRcdEwxNy4zNzIsMzcuNTQ3Yy0wLjMxOS0wLjQyMi0wLjc5NC0wLjcwMS0xLjMxOS0wLjc3M2MtMC41MjQtMC4wNzgtMS4wNTksMC4wNjQtMS40ODEsMC4zODVMMC43OTQsNDcuNTY3XG5cdFx0Yy0wLjg4MSwwLjY2Ni0xLjA1NiwxLjkyLTAuMzksMi44MDFsMzAuOTc0LDQwLjk5NmMwLjM2MiwwLjQ3OSwwLjkyMiwwLjc3MSwxLjUyMiwwLjc5M2MwLjAyNCwwLDAuMDQ5LDAsMC4wNzMsMFxuXHRcdGMwLjU3NCwwLDEuMTIyLTAuMjQ2LDEuNTAzLTAuNjhsNjIuNjQ0LTcxLjI5N0M5Ny44NSwxOS4zNTEsOTcuNzY5LDE4LjA4Niw5Ni45MzksMTcuMzU4elwiLz5cbjwvZz48L3N2Zz5gXG4iLCJtb2R1bGUuZXhwb3J0cyA9IChwPXt9KSA9PiBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgZGF0YS1qcz1cIiR7cC5uYW1lIHx8ICdlcnJvcid9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCAxOC45NzggMTguOTc4XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE4Ljk3OCAxOC45Nzg7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cclxuPGc+XHJcbiAgICA8cGF0aCBkPVwiTTE2LjA4OCwxLjY3NWMtMC4xMzMtMC4xMDQtMC4zMDYtMC4xNDQtMC40Ny0wLjEwNWMtMC4wMTMsMC4wMDItMS4yNjEsMC4yOS0yLjU5NCwwLjI5XHJcbiAgICAgICAgYy0xLjc4OCwwLTIuNzg5LTAuNDc2LTIuOTc1LTEuNDE1QzkuOTk5LDAuMTkxLDkuNzc5LDAuMDA3LDkuNTIxLDBjLTAuMjU3LTAuMDA3LTAuNDg3LDAuMTY3LTAuNTUsMC40MThcclxuICAgICAgICBDOC43MjcsMS4zODYsNy43MSwxLjg3Nyw1Ljk1LDEuODc3Yy0xLjMzMiwwLTIuNTcxLTAuMzAyLTIuNTgzLTAuMzA1Yy0wLjE2Ni0wLjA0LTAuMzQtMC4wMDQtMC40NzQsMC4xMDJcclxuICAgICAgICBDMi43NiwxLjc3NywyLjY4MSwxLjkzOCwyLjY4MSwyLjEwOHY0Ljg2OWMwLDAuMDQsMC4wMDQsMC4wNzgsMC4wMTMsMC4xMTVjMC4wNTcsMS42NDcsMC42NSw4LjcxNCw2LjUyOCwxMS44MjJcclxuICAgICAgICBjMC4wOCwwLjA0MywwLjE2OSwwLjA2NCwwLjI1OCwwLjA2NGMwLjA5MiwwLDAuMTgzLTAuMDIxLDAuMjY2LTAuMDY2YzUuNzQtMy4xMzcsNi40NDUtMTAuMTE1LDYuNTMyLTExLjc5MVxyXG4gICAgICAgIGMwLjAxMi0wLjA0NiwwLjAxOS0wLjA5NCwwLjAxOS0wLjE0NFYyLjEwOEMxNi4yOTcsMS45MzksMTYuMjE5LDEuNzgsMTYuMDg4LDEuNjc1eiBNMTUuMTksNi44NTdcclxuICAgICAgICBjLTAuMDA3LDAuMDMxLTAuMDEyLDAuMDY0LTAuMDEzLDAuMDk3Yy0wLjA1MywxLjI5OC0wLjU3NCw3LjgzMi01LjcwMSwxMC44MzhjLTUuMjE1LTIuOTY1LTUuNjQ2LTkuNTI2LTUuNjgtMTAuODNcclxuICAgICAgICBjMC0wLjAyOS0wLjAwNC0wLjA1OC0wLjAwOS0wLjA4NVYyLjc4NEM0LjMyMiwyLjg3Nyw1LjExMiwyLjk4Miw1Ljk1LDIuOTgyYzEuOTExLDAsMi45NjUtMC41NCwzLjUzNy0xLjIwOFxyXG4gICAgICAgIGMwLjU1MywwLjY2MSwxLjU5OSwxLjE5MSwzLjUzNiwxLjE5MWMwLjgzOSwwLDEuNjMxLTAuMTAxLDIuMTY2LTAuMTg4TDE1LjE5LDYuODU3TDE1LjE5LDYuODU3elwiLz5cclxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjEwLjI0MSwxMS4yMzcgMTAuNTI5LDUuMzExIDguNDQ5LDUuMzExIDguNzUsMTEuMjM3IFx0XHRcIi8+XHJcbiAgICA8cGF0aCBkPVwiTTkuNDk2LDExLjg5MWMtMC42OTQsMC0xLjE3OCwwLjQ5OC0xLjE3OCwxLjE4OWMwLDAuNjgyLDAuNDcxLDEuMTkxLDEuMTc4LDEuMTkxXHJcbiAgICAgICAgYzAuNzA2LDAsMS4xNjQtMC41MSwxLjE2NC0xLjE5MUMxMC42NDcsMTIuMzg5LDEwLjE4OSwxMS44OTEsOS40OTYsMTEuODkxelwiLz5cclxuPC9nPjwvc3ZnPmBcclxuIl19
