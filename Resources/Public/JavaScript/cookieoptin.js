var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cookieWorkerProcess(ev) {
    var scriptElement = document.createElement('script');
    if (ev.hasAttribute('src')) {
        var attribute = ev.getAttribute('src');
        scriptElement.src = attribute;
    } else {
        scriptElement.innerHTML = ev.innerHTML;
    }
    scriptElement.setAttribute('data-cookieoptin', cookie);
    ev.after(scriptElement);
    ev.remove();
}

function cookieWorker(ev, cookie) {
    if (cookie == ev.getAttribute('data-cookieoptin')) {
        cookieWorkerProcess(ev);
    } else if (ev.getAttribute('data-cookieoptin') == 'essential') {
        cookieWorkerProcess(ev);
    } else if (cookie == 'all') {
        cookieWorkerProcess(ev);
    }
}

function initCookieBanner() {
    var documentCookie = readCookie('_nrc');
    if (documentCookie) {
        var a = document.querySelectorAll('[data-cookieoptin]');
        for (var i in a) {
            if (a.hasOwnProperty(i)) {

                var htmlElement = a[i];

                if (documentCookie.includes(',')) {
                    var cookiesArray = documentCookie.split(',');
                    cookiesArray.forEach(function (item, j) {
                        return cookieWorker(a[i], '' + item);
                    });
                } else {
                    cookieWorker(a[i], '' + documentCookie);
                }
            }
        }if (documentCookie == 'revoked') {
            ReactDOM.render(React.createElement(CookieBanner, null), document.getElementById('neosrulez__cookieoptin'));
        } else {
            ReactDOM.render(React.createElement(Revoke, null), document.getElementById('neosrulez__cookieoptin'));
        }
    } else {
        ReactDOM.render(React.createElement(CookieBanner, null), document.getElementById('neosrulez__cookieoptin'));
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

var CookieBanner = function (_React$Component) {
    _inherits(CookieBanner, _React$Component);

    function CookieBanner() {
        _classCallCheck(this, CookieBanner);

        return _possibleConstructorReturn(this, (CookieBanner.__proto__ || Object.getPrototypeOf(CookieBanner)).apply(this, arguments));
    }

    _createClass(CookieBanner, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'cookiebanner' },
                React.createElement(
                    'div',
                    { className: 'cookiebanner-wrapper' },
                    React.createElement(
                        'div',
                        { className: 'container h-100' },
                        React.createElement(
                            'div',
                            { className: 'row no-gutters h-100 align-items-center' },
                            React.createElement(
                                'div',
                                { className: 'col-md-7 mx-auto' },
                                React.createElement(
                                    'div',
                                    { className: 'd-block p-4 my-5 bg-white' },
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-12' },
                                            React.createElement(
                                                'h3',
                                                null,
                                                nrc_header
                                            ),
                                            React.createElement(
                                                'p',
                                                null,
                                                nrc_teaser
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-12 mb-4' },
                                            React.createElement(
                                                'div',
                                                { className: 'd-block cookiegroup' },
                                                React.createElement(UserCookies, null)
                                            )
                                        )
                                    ),
                                    React.createElement(Footer, null)
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CookieBanner;
}(React.Component);

var Footer = function (_React$Component2) {
    _inherits(Footer, _React$Component2);

    function Footer(props) {
        _classCallCheck(this, Footer);

        var _this2 = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this2.setEssential = _this2.setEssential.bind(_this2);
        _this2.setAll = _this2.setAll.bind(_this2);
        _this2.setSelected = _this2.setSelected.bind(_this2);
        return _this2;
    }

    _createClass(Footer, [{
        key: 'setEssential',
        value: function setEssential(e) {
            e.preventDefault();

            document.cookie = '_nrc=essential';
            initCookieBanner();
        }
    }, {
        key: 'setAll',
        value: function setAll(e) {
            e.preventDefault();

            document.cookie = '_nrc=all';
            initCookieBanner();
        }
    }, {
        key: 'setSelected',
        value: function setSelected(e) {
            e.preventDefault();

            document.cookie = '_nrc=' + settedCookies.join(',');
            initCookieBanner();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'row align-items-center' },
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        React.createElement(
                            'a',
                            { href: '/allow-essential', className: 'btn btn-secondary btn-block w-100 mt-3', id: 'allow__essential', onClick: this.setEssential },
                            nrc_btn_essential
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        React.createElement(
                            'a',
                            { href: '/allow-all-cookies', className: 'btn btn-primary btn-block w-100 mt-3', id: 'allow__all', onClick: this.setAll },
                            nrc_btn_all
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row align-items-center mt-3' },
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        React.createElement(
                            'a',
                            { href: '/allow-selected', style: settedCookies.length === 0 ? { display: 'none' } : { display: 'block' }, id: 'allow__selected', onClick: this.setSelected },
                            nrc_btn_selected
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6 text-right cookiebanner-links' },
                        React.createElement(
                            'a',
                            { href: nrc_imprint_link },
                            nrc_imprint_label
                        ),
                        React.createElement(
                            'a',
                            { href: nrc_privacy_link },
                            nrc_privacy_label
                        )
                    )
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

var settedCookies = [];

var Revoke = function (_React$Component3) {
    _inherits(Revoke, _React$Component3);

    function Revoke(props) {
        _classCallCheck(this, Revoke);

        var _this3 = _possibleConstructorReturn(this, (Revoke.__proto__ || Object.getPrototypeOf(Revoke)).call(this, props));

        _this3.revoke = _this3.revoke.bind(_this3);
        return _this3;
    }

    _createClass(Revoke, [{
        key: 'revoke',
        value: function revoke(e) {
            e.preventDefault();
            settedCookies = [];
            document.cookie = "_nrc=revoked";
            initCookieBanner();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'a',
                { href: '/revoke', id: 'revoke', onClick: this.revoke },
                nrc_btn_revoke
            );
        }
    }]);

    return Revoke;
}(React.Component);

var UserCookies = function (_React$Component4) {
    _inherits(UserCookies, _React$Component4);

    function UserCookies() {
        _classCallCheck(this, UserCookies);

        return _possibleConstructorReturn(this, (UserCookies.__proto__ || Object.getPrototypeOf(UserCookies)).apply(this, arguments));
    }

    _createClass(UserCookies, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'cookiegroups' },
                items
            );
        }
    }]);

    return UserCookies;
}(React.Component);

var ToggleSwitch = function (_React$Component5) {
    _inherits(ToggleSwitch, _React$Component5);

    function ToggleSwitch(props) {
        _classCallCheck(this, ToggleSwitch);

        var _this5 = _possibleConstructorReturn(this, (ToggleSwitch.__proto__ || Object.getPrototypeOf(ToggleSwitch)).call(this, props));

        _this5.setter = _this5.setter.bind(_this5);
        return _this5;
    }

    _createClass(ToggleSwitch, [{
        key: 'setter',
        value: function setter(cookieKey) {
            if (settedCookies.includes('' + cookieKey)) {
                var index = settedCookies.indexOf('' + cookieKey);
                settedCookies.splice(index, 1);
            } else {
                settedCookies.push('' + cookieKey);
            }
            if (settedCookies.length === 0) {
                document.getElementById('allow__selected').style.display = 'none';
            } else {
                document.getElementById('allow__selected').style.display = 'block';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'div',
                { className: 'custom-control custom-switch' },
                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', disabled: this.props.identifier == 'essential' ? true : false, id: this.props.identifier, defaultChecked: this.props.identifier == 'essential' ? true : false, onClick: function onClick() {
                        return _this6.setter('' + _this6.props.identifier);
                    } }),
                React.createElement('label', { className: 'custom-control-label', htmlFor: this.props.identifier, onClick: function onClick() {
                        return _this6.setter('' + _this6.props.identifier);
                    } })
            );
        }
    }]);

    return ToggleSwitch;
}(React.Component);

var selected_group = true;

var CookieGroupItem = function (_React$Component6) {
    _inherits(CookieGroupItem, _React$Component6);

    function CookieGroupItem(props) {
        _classCallCheck(this, CookieGroupItem);

        var _this7 = _possibleConstructorReturn(this, (CookieGroupItem.__proto__ || Object.getPrototypeOf(CookieGroupItem)).call(this, props));

        _this7.toggleGroup = _this7.toggleGroup.bind(_this7);
        return _this7;
    }

    _createClass(CookieGroupItem, [{
        key: 'toggleGroup',
        value: function toggleGroup(group) {
            selected_group = selected_group;
            document.querySelectorAll('.cookies').forEach(function (el) {
                return el.classList.remove('open');
            });
            if (selected_group == group) {
                document.getElementById('group_' + group).classList.remove('open');
                selected_group = true;
            } else {
                document.getElementById('group_' + group).classList.add('open');
                selected_group = group;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            return React.createElement(
                'div',
                { className: 'cookiegroup', key: this.props.group, 'data-cookiegroup': this.props.group },
                React.createElement(
                    'div',
                    { className: 'row py-2 align-items-center' },
                    React.createElement(
                        'div',
                        { className: 'col-8' },
                        React.createElement(
                            'div',
                            { className: 'd-block cookiegroup-toggle' },
                            React.createElement(
                                'span',
                                { key: this.props.group, onClick: function onClick() {
                                        return _this8.toggleGroup('' + _this8.props.group);
                                    } },
                                this.props.title
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-4 text-right' },
                        React.createElement(ToggleSwitch, { identifier: this.props.group })
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'group_' + this.props.group, className: 'cookies' },
                    this.props.cookieitem
                )
            );
        }
    }]);

    return CookieGroupItem;
}(React.Component);

var items = [];

var groupKey = 1;

for (var group in nrc_metadata) {
    var cookieitem = [];

    var title = nrc_metadata[group]['label'];

    for (var cookies in nrc_metadata[group]['cookies']) {
        var cookiekey = cookies;

        groupKey = groupKey + 1;

        for (var cookie in nrc_metadata[group]['cookies'][cookies]) {
            var cookiedescription = nrc_metadata[group]['cookies'][cookies]['description'];
            var cookielifetime = nrc_metadata[group]['cookies'][cookies]['lifetime'];
        }

        cookieitem.push(React.createElement(
            'div',
            { className: 'cookie py-2', key: groupKey },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-2 col-12' },
                    cookiekey
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-8 col-8' },
                    cookiedescription
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-2 col-4 text-right' },
                    cookielifetime
                )
            )
        ));
    }

    items.push(React.createElement(CookieGroupItem, { group: group, key: groupKey, title: title, cookieitem: cookieitem }));
}

initCookieBanner();