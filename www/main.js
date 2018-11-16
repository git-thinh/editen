var f_log = 1 ? console.log.bind(console, 'UI: ') : function () { };
function f_get(url) { var r = new XMLHttpRequest(); r.open('GET', url, false); r.send(null); if (r.status === 200) return r.responseText; return ''; }
function f_temp(code, id) { return '<div id="' + id + '" class="vue_com ' + code + '">' + f_get('/parts/' + code + '/index.html') + '<link href="/parts/' + code + '/css.css" rel="stylesheet" /></div>'; }

var _LOADING = { f_show: function (message) { }, f_hide: function () { } };
// #region [ LOADING ]

var loading_selector = '#___loading';
var ILoading = Vue.extend({
    template: '<div class=modal-bg></div><table><tr><td valign="middle" align="center"><img style="width:32px;" src="loading.gif"/><h3>{{message}}</h3></td></tr></table>'
});

_LOADING = new ILoading({
    replace: false,
    data: {
        message: 'This is a message..'
    },
    ready: function () {
        f_log('LOADING:: ready');
    },
    destroyed: function () {
        f_log('LOADING:: destroyed');
    },
    methods: {
        f_destroy: function () {
            f_log('destroy _profile ...');
            //_LOADING.$destroy();
        },
        f_show: function (message) {
            if (message == null) message = '';
            this.message = message;
            this.$el.style.display = 'block';
            f_log('LOADING:: visiable...');
        },
        f_hide: function () {
            this.$el.style.display = 'none';
            this.message = '';
            f_log('LOADING:: hidden...');
        },
    }
});
_LOADING = _LOADING.$mount(loading_selector);
_LOADING.f_show();

// #endregion

// #region [ VUE_COM_BASE_CONTRACTOR ]

var VUE_COM_BASE_CONTRACTOR = {
    created: function () {
        f_log('Class Base component created ... data = ', JSON.stringify(this.$data));
    },
    events: {
        BROADCAST_TO_COMS: 'f_receiver_messageFromVue'
    },
    methods: {
        f_mod_load: function (code) {
            this.$root.f_mod_load(code);
        },
        f_base_show: function () {
            var el = document.getElementById(this.el_id);
            if (el) el.style.opacity = 1;
            f_log(this.el_id, 'SHOW');
        },
        f_base_hide: function () {
            var el = document.getElementById(this.el_id);
            if (el) el.style.opacity = 0;
            f_log(this.el_id, 'HIDE');
        },
        f_main_broadCast_toComs: function (m) {
            f_log('----> Main send broadCast to COMs: ', m);
            if (_profile) _profile.$emit('BROADCAST_TO_COMS', m);
        },
        f_receiver_messageFromVue: function (m) {
            f_log('#####> COM received broadCast message from VUE: ', m);
        },
        f_broadCast_toVue: function (m) {
            f_log('----> component send broadcast to vue: ', m);
            //this.$dispatch('BROADCAST_TO_VUE', m);
            _app.$emit('BROADCAST_TO_VUE', m);
        },
        f_destroy: function () {
            this.$destroy();
        }
    }
};

// #endregion

var _app = new Vue({
    el: '#app',
    replace: false,
    data: {
        currentView: 'blank',
        modules: []
    },
    created: function () {
        f_log('VUE:: created ...');
    },
    components: { blank: { template: '' } },
    beforeCompile: function () {
        f_log('VUE:: beforeCompile');
    },
    compiled: function () {
        var _self = this;
        f_log('VUE:: compiled');

        _self.f_mod_init('user');
        _self.f_mod_init('test');

        _self.f_mod_load('user');
    },
    methods: {
        f_mod_load: function (code) {
            this.currentView = code;
        },
        f_mod_init: function (code) {
            var _self = this;

            var id = code + '_12345';
            var s = f_get('/parts/' + code + '/js.js');
            s = s.split('[___id]').join(id).split('[___code]').join(code).split('___com').join('com_' + code) + ';\r\n com_' + code + ';';
            var myComponent = eval(s);

            Vue.component(code, myComponent);
            //var com = new myComponent();
            //_com = com.$mount('#mount-point');

            _self.modules.push(code);
        },
    }
});

