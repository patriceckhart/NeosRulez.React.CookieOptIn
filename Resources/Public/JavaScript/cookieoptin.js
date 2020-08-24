var nrc_metadata = JSON.parse('{"essential":{"label":"Essenziell","cookies":{"_nrc":{"description":"Dieser Cookie muss gesetzt werden um Ihre Cookie-Einstellungen abzurufen und Cookies entweder zu verbieten oder zu erlauben.","lifetime":"1 Jahr"}}},"analysis":{"label":"Analyse & Performance","cookies":{"_ga":{"description":"Dieser Cookie wird von Google Analytics installiert. Dieser Cookie wird verwendet, um Besucher-, Sitzungs- und Kampagnendaten zu berechnen und die Nutzung der Website für den Analysebericht der Website zu verfolgen. Die Cookies speichern Informationen anonym und weisen eine zufällig generierte Nummer zu, um eindeutige Besucher zu identifizieren.","lifetime":"2 Jahre"},"_gid":{"description":"Dieser Cookie wird von Google Analytics installiert. Dieser Cookie wird verwendet, um Informationen darüber zu speichern, wie Besucher eine Website nutzen, und hilft bei der Erstellung eines Analyseberichts über die Funktionsweise der Website. Die gesammelten Daten, einschließlich der Anzahl der Besucher, der Quelle, aus der sie stammen, und der Seiten, die in anonymer Form angezeigt werden.","lifetime":"1 Tag"},"_gat":{"description":"Dieser Cookie wird von Google Universal Analytics installiert, um die Anforderungsrate zu drosseln und die Datenerfassung auf Websites mit hohem Datenverkehr zu begrenzen.","lifetime":"1 Minute"}}},"test":{"label":"Test","cookies":{"_ta":{"description":"Testcookie","lifetime":"1 Jahr"}}}}');
var nrc_header = 'Wir verwenden Cookies';
var nrc_teaser = 'Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.';
var nrc_imprint_link = '/impressum';
var nrc_privacy_link = '/datenschutz';
var nrc_imprint_label = 'Impressum';
var nrc_privacy_label = 'Datenschutz';
var nrc_btn_all = 'Alle erlauben';
var nrc_btn_essential = 'Nur Essenzielle';
var nrc_btn_selected = 'Nur ausgewählte Cookies erlauben';

function init() {
    // console.log('init');
    let documentCookie = readCookie('_nrc');
    // console.log('documentCookie: ' + documentCookie);
    if(documentCookie) {
        // names.split(',');
        var a = document.querySelectorAll('[data-cookieoptin]');
        for (var i in a) if (a.hasOwnProperty(i)) {
            if(documentCookie == a[i].getAttribute('data-cookieoptin')) {
                // console.log('found');
                a[i].removeAttribute('type');
                var scriptElement = document.createElement('script');
                if(a[i].hasAttribute('src')) {
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
        if(documentCookie == 'revoked') {
            // console.log('cookie is revoked');
            ReactDOM.render(
                <CookieBanner />,document.getElementById('neosrulez__cookieoptin')
            );
        } else {
            ReactDOM.render(
                <Revoke />,document.getElementById('neosrulez__cookieoptin')
            );
        }
    } else {
        ReactDOM.render(
            <CookieBanner />,document.getElementById('neosrulez__cookieoptin')
        );
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

class CookieBanner extends React.Component {
    render() {
        return <div id="cookiebanner">
            <div className="cookiebanner-wrapper">
                <div className="container h-100">
                    <div className="row no-gutters h-100 align-items-center">
                        <div className="col-md-7 mx-auto">
                            <div className="d-block p-4 my-5 bg-white">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>{nrc_header}</h3>
                                        <p>{nrc_teaser}</p>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <div className="d-block cookiegroup">
                                            <UserCookies />
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.setEssential = this.setEssential.bind(this);
        this.setAll = this.setAll.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }
    setEssential(e) {
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
    setAll(e) {
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
    setSelected(e) {
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
    render() {
        return <div><div className="row align-items-center">
            <div className="col-md-6">
                <a href="/allow-essential" className="btn btn-secondary btn-block mt-3" id="allow__essential" onClick={this.setEssential} >{nrc_btn_essential}</a>
            </div>
            <div className="col-md-6">
                <a href="/allow-all-cookies" className="btn btn-primary btn-block mt-3" id="allow__all" onClick={this.setAll} >{nrc_btn_all}</a>
            </div>
        </div>
            <div className="row align-items-center mt-3">
                <div className="col-md-6">
                    <a href="/allow-selected" id="allow__selected" onClick={this.setSelected} >{nrc_btn_selected}</a>
                </div>
                <div className="col-md-6 text-right cookiebanner-links">
                    <a href={nrc_imprint_link}>{nrc_imprint_label}</a>
                    <a href={nrc_privacy_link}>{nrc_privacy_label}</a>
                </div>
            </div></div>
            ;
    }
}

class Revoke extends React.Component {
    constructor(props) {
        super(props);
        this.revoke = this.revoke.bind(this);
    }
    revoke(e) {
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
    render() {
        return <a href="/revoke" id="revoke" onClick={this.revoke} >Cookie-Einstellungen</a>;
    }
}

class UserCookies extends React.Component {
    render() {
        return <div className="cookiegroups">{items}</div>;
    }
}

const settedCookies = [];

class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.setter = this.setter.bind(this);
    }
    setter(cookieKey) {
        console.log(`set: ${cookieKey}`);
        if(settedCookies.includes(`${cookieKey}`)) {
            const index = settedCookies.indexOf(`${cookieKey}`);
            settedCookies.splice(index, 1);
        } else {
            settedCookies.push(`${cookieKey}`);
        }
        console.log(settedCookies);
    }
    render() {
        return <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" disabled={this.props.identifier == 'essential' ? true : false} id={this.props.identifier} defaultChecked={this.props.identifier == 'essential' ? true : false} />
            <label className="custom-control-label" htmlFor={this.props.identifier} onClick={() => this.setter(`${this.props.identifier}`)}></label>
        </div>;
    }
}

const items = [];

for(var group in nrc_metadata) {
    const cookieitem = [];

    for(var cookies in nrc_metadata[group]['cookies']) {
        var cookiekey = cookies;

        for(var cookie in nrc_metadata[group]['cookies'][cookies]) {
            var cookiedescription = nrc_metadata[group]['cookies'][cookies]['description'];
            var cookielifetime = nrc_metadata[group]['cookies'][cookies]['lifetime'];
        }

        cookieitem.push(<div className="cookie py-2" key={cookiekey} >
            <div className="row">
                <div className="col-md-2 col-12">{cookiekey}</div>
                <div className="col-md-8 col-8">{cookiedescription}</div>
                <div className="col-md-2 col-4 text-right">{cookielifetime}</div>
            </div>
        </div>);
    }

    items.push(<div className="cookiegroup" key={group} data-cookiegroup={group} >
        <div className="row py-2 align-items-center">
            <div className="col-8">
                <div className="d-block cookiegroup-toggle">
                    <span>{nrc_metadata[group]['label']}</span>
                </div>
            </div>
            <div className="col-4 text-right">
                <ToggleSwitch identifier={group} />
            </div>
        </div>
        <div className="cookies">
            {cookieitem}
        </div>
    </div>);
}

init();