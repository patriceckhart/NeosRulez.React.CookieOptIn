function cookieWorkerProcess(ev) {
    var scriptElement = document.createElement('script');
    if(ev.hasAttribute('src')) {
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
    if(cookie == ev.getAttribute('data-cookieoptin')) {
        cookieWorkerProcess(ev);
    } else if (ev.getAttribute('data-cookieoptin') == 'essential') {
        cookieWorkerProcess(ev);
    } else if (cookie == 'all') {
        cookieWorkerProcess(ev);
    }
}

function initCookieBanner() {
    var documentCookie = readCookie('_nrc');
    if(documentCookie) {
        var a = document.querySelectorAll('[data-cookieoptin]');
        for (var i in a) if (a.hasOwnProperty(i)) {

            var htmlElement = a[i];

            if(documentCookie.includes(',')) {
                var cookiesArray = documentCookie.split(',');
                cookiesArray.forEach((item, j) => cookieWorker(a[i], `${item}`));
            } else {
                cookieWorker(a[i], `${documentCookie}`);
            }

        }
        if(documentCookie == 'revoked') {
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

        document.cookie = '_nrc=essential';
        initCookieBanner();
    }
    setAll(e) {
        e.preventDefault();

        document.cookie = '_nrc=all';
        initCookieBanner();
    }
    setSelected(e) {
        e.preventDefault();

        document.cookie = '_nrc=' + settedCookies.join(',');
        initCookieBanner();
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

        document.cookie = "_nrc=revoked";
        initCookieBanner();
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

        if(settedCookies.includes(`${cookieKey}`)) {
            const index = settedCookies.indexOf(`${cookieKey}`);
            settedCookies.splice(index, 1);
        } else {
            settedCookies.push(`${cookieKey}`);
        }
    }
    render() {
        return <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" disabled={this.props.identifier == 'essential' ? true : false} id={this.props.identifier} defaultChecked={this.props.identifier == 'essential' ? true : false} />
            <label className="custom-control-label" htmlFor={this.props.identifier} onClick={() => this.setter(`${this.props.identifier}`)}></label>
        </div>;
    }
}

var selected_group = true;

class CookieGroupItem extends React.Component {
    constructor(props) {
        super(props);
        this.toggleGroup = this.toggleGroup.bind(this);
    }
    toggleGroup(group) {
        selected_group = selected_group;
        document.querySelectorAll('.cookies').forEach(el => el.classList.remove('open'));
        if(selected_group == group) {
            document.getElementById('group_' + group).classList.remove('open');
            selected_group = true;
        } else {
            document.getElementById('group_' + group).classList.add('open');
            selected_group = group;
        }
    }
    render() {
        return <div className="cookiegroup" key={this.props.group} data-cookiegroup={this.props.group} >
            <div className="row py-2 align-items-center" >
                <div className="col-8">
                    <div className="d-block cookiegroup-toggle" >
                        <span key={this.props.group} onClick={() => this.toggleGroup(`${this.props.group}`)} >{this.props.title}</span>
                    </div>
                </div>
                <div className="col-4 text-right">
                    <ToggleSwitch identifier={this.props.group} />
                </div>
            </div>
            <div id={'group_' + this.props.group} className="cookies">
                {this.props.cookieitem}
            </div>
        </div>;
    }
}

const items = [];

var groupKey = 1;

for(var group in nrc_metadata) {
    const cookieitem = [];

    var title = nrc_metadata[group]['label'];

    for(var cookies in nrc_metadata[group]['cookies']) {
        var cookiekey = cookies;

        groupKey = groupKey + 1;

        for(var cookie in nrc_metadata[group]['cookies'][cookies]) {
            var cookiedescription = nrc_metadata[group]['cookies'][cookies]['description'];
            var cookielifetime = nrc_metadata[group]['cookies'][cookies]['lifetime'];
        }

        cookieitem.push(<div className="cookie py-2" key={groupKey} >
            <div className="row">
                <div className="col-md-2 col-12">{cookiekey}</div>
                <div className="col-md-8 col-8">{cookiedescription}</div>
                <div className="col-md-2 col-4 text-right">{cookielifetime}</div>
            </div>
        </div>);
    }

    items.push(<CookieGroupItem group={group} key={groupKey} title={title} cookieitem={cookieitem} />);
}

initCookieBanner();