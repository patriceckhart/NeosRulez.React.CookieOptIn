var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nrc_metadata = JSON.parse('{"essential":{"label":"Essenziell","cookies":{"_nrc":{"description":"Dieser Cookie muss gesetzt werden um Ihre Cookie-Einstellungen abzurufen und Cookies entweder zu verbieten oder zu erlauben.","lifetime":"1 Jahr"}}},"analysis":{"label":"Analyse & Performance","cookies":{"_ga":{"description":"Dieser Cookie wird von Google Analytics installiert. Dieser Cookie wird verwendet, um Besucher-, Sitzungs- und Kampagnendaten zu berechnen und die Nutzung der Website für den Analysebericht der Website zu verfolgen. Die Cookies speichern Informationen anonym und weisen eine zufällig generierte Nummer zu, um eindeutige Besucher zu identifizieren.","lifetime":"2 Jahre"},"_gid":{"description":"Dieser Cookie wird von Google Analytics installiert. Dieser Cookie wird verwendet, um Informationen darüber zu speichern, wie Besucher eine Website nutzen, und hilft bei der Erstellung eines Analyseberichts über die Funktionsweise der Website. Die gesammelten Daten, einschließlich der Anzahl der Besucher, der Quelle, aus der sie stammen, und der Seiten, die in anonymer Form angezeigt werden.","lifetime":"1 Tag"},"_gat":{"description":"Dieser Cookie wird von Google Universal Analytics installiert, um die Anforderungsrate zu drosseln und die Datenerfassung auf Websites mit hohem Datenverkehr zu begrenzen.","lifetime":"1 Minute"}}},"test":{"label":"Test","cookies":{"_ta":{"description":"Testcookie","lifetime":"1 Jahr"}}}}');
var nrc_header = 'Wir verwenden Cookies';
var nrc_teaser = 'Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.';
var nrc_imprint_link = '/impressum';
var nrc_privacy_link = '/datenschutz';
// var nrc_imprint_label = 'Impressum';
// var nrc_privacy_label = 'Datenschutz';
// var nrc_btn_all = 'Alle erlauben';
// var nrc_btn_essential = 'Nur Essenzielle';
// var nrc_btn_selected = 'Nur ausgewählte Cookies erlauben';

function init() {
    // console.log('init');
    var documentCookie = readCookie('_nrc');
    // console.log('documentCookie: ' + documentCookie);
    if (documentCookie) {
        // names.split(',');
        var a = document.querySelectorAll('[data-cookieoptin]');
        for (var i in a) {
            if (a.hasOwnProperty(i)) {
                if (documentCookie == a[i].getAttribute('data-cookieoptin')) {
                    // console.log('found');
                    a[i].removeAttribute('type');
                    var scriptElement = document.createElement('script');
                    if (a[i].hasAttribute('src')) {
                        var attribute = a[i].getAttribute('src');
                        scriptElement.src = attribute;
                    } else {
                        var innerHtml = a[i].innerHTML;
                        scriptElement.innerHTML = innerHtml;
                    }
                    a[i].after(scriptElement);
                    a[i].remove();
                }
            }
        }if (documentCookie == 'revoked') {
            // console.log('cookie is revoked');
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
            console.log('set essential');
            // document.getElementById('cookiebanner').remove();
            document.cookie = "_nrc=essential";
            init();
            // location.reload();
            // ReactDOM.unmountComponentAtNode(
            //     <CookieBanner />,document.getElementById('neosrulez__cookieoptin')
            // );
        }
    }, {
        key: 'setAll',
        value: function setAll(e) {
            e.preventDefault();
            console.log('set all');
            // document.getElementById('cookiebanner').remove();
            document.cookie = "_nrc=all";
            init();
            // location.reload();
            // ReactDOM.unmountComponentAtNode(
            //     <CookieBanner />,document.getElementById('neosrulez__cookieoptin')
            // );
        }
    }, {
        key: 'setSelected',
        value: function setSelected(e) {
            e.preventDefault();
            console.log(settedCookies);
            console.log('set selected');
            // document.getElementById('cookiebanner').remove();
            document.cookie = '_nrc=' + settedCookies.join(',');
            init();
            // location.reload();
            // ReactDOM.unmountComponentAtNode(
            //     <CookieBanner />,document.getElementById('neosrulez__cookieoptin')
            // );
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
                            { href: '/allow-essential', className: 'btn btn-secondary btn-block mt-3', id: 'allow__essential', onClick: this.setEssential },
                            nrc_btn_essential
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        React.createElement(
                            'a',
                            { href: '/allow-all-cookies', className: 'btn btn-primary btn-block mt-3', id: 'allow__all', onClick: this.setAll },
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
                            { href: '/allow-selected', id: 'allow__selected', onClick: this.setSelected },
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
            console.log('revoke');
            document.cookie = "_nrc=revoked";
            // document.getElementById('revoke').remove();
            init();
            // location.reload();
            // ReactDOM.unmountComponentAtNode(
            //     <Revoke />,document.getElementById('neosrulez__cookieoptin')
            // );
            // ReactDOM.render(
            //         <CookieBanner />,document.getElementById('neosrulez__cookieoptin')
            // );
            // location.reload();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'a',
                { href: '/revoke', id: 'revoke', onClick: this.revoke },
                'Cookie-Einstellungen'
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

var settedCookies = [];

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
            console.log('set: ' + cookieKey);
            if (settedCookies.includes('' + cookieKey)) {
                var index = settedCookies.indexOf('' + cookieKey);
                settedCookies.splice(index, 1);
            } else {
                settedCookies.push('' + cookieKey);
            }
            console.log(settedCookies);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'div',
                { className: 'custom-control custom-switch' },
                React.createElement('input', { type: 'checkbox', className: 'custom-control-input', disabled: this.props.identifier == 'essential' ? true : false, id: this.props.identifier, defaultChecked: this.props.identifier == 'essential' ? true : false }),
                React.createElement('label', { className: 'custom-control-label', htmlFor: this.props.identifier, onClick: function onClick() {
                        return _this6.setter('' + _this6.props.identifier);
                    } })
            );
        }
    }]);

    return ToggleSwitch;
}(React.Component);

var items = [];

for (var group in nrc_metadata) {
    var cookieitem = [];

    for (var cookies in nrc_metadata[group]['cookies']) {
        var cookiekey = cookies;

        for (var cookie in nrc_metadata[group]['cookies'][cookies]) {
            var cookiedescription = nrc_metadata[group]['cookies'][cookies]['description'];
            var cookielifetime = nrc_metadata[group]['cookies'][cookies]['lifetime'];
        }

        cookieitem.push(React.createElement(
            'div',
            { className: 'cookie py-2', key: cookiekey },
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

    items.push(React.createElement(
        'div',
        { className: 'cookiegroup', key: group, 'data-cookiegroup': group },
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
                        null,
                        nrc_metadata[group]['label']
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'col-4 text-right' },
                React.createElement(ToggleSwitch, { identifier: group })
            )
        ),
        React.createElement(
            'div',
            { className: 'cookies' },
            cookieitem
        )
    ));
}

init();