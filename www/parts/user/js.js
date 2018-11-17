var ___code = '[___code]',
    ___id = '[___id]';

var ___com = Vue.extend({
    mixins: [VUE_COM_BASE_CONTRACTOR],
    template: f_temp(___code, ___id),
    replace: false,
    data: function () {
        return {
            el_id: ___id
        };
    },
    beforeDestroy: function () {
        f_log(___code + ':: beforeDestroy');
        var fom_name = 'form_' + this.el_id;
        if (w2ui[fom_name]) w2ui[fom_name].destroy();
    },
    destroyed: function () {
        f_log(___code + ':: destroyed');
    },
    beforeCompile: function () {
        f_log(___code + ':: beforeCompile');
        this.f_base_hide();
    },
    compiled: function () {
        f_log(___code + ':: compiled');
    },
    ready: function () {
        var _self = this;
        f_log(___code + ':: ready');

        _self.f_login();

        this.f_base_show();
        _LOADING.f_hide();
    },
    methods: {
        f_login: function () {
            var _self = this;

            var fom_name = 'form_' + _self.el_id, fom_title = 'Login System';
            if (!w2ui[fom_name]) {
                $('#' + _self.el_id + ' .form_data').w2form({
                    name: fom_name,
                    style: 'height:235px;width:350px;',
                    formHTML: f_get('/parts/' + ___code + '/login.html'),
                    header: fom_title,
                    url: '/api/user/login',
                    fields: [
                        { field: 'username', type: 'text', required: true },
                        { field: 'password', type: 'password', required: true }
                    ],
                    record: {
                        username: 'admin',
                        password: 'admin'
                    },
                    actions: {
                        "login": function () {
                            var valid = this.validate();
                            f_log(valid);
                            if (valid && valid.length == 0) {
                                _LOADING.f_show();
                                setTimeout(function () {
                                    _self.f_header_init();
                                    _self.f_mod_load('home');
                                }, 300);
                            }
                        },
                        "cancel": function () {
                            this.clear();
                        }
                    },
                    toolbar: {
                        items: [
                            { id: 'btn_sing_up', type: 'button', caption: 'Sing Up', icon: 'fa fa-user' },
                            { id: 'bt3', type: 'spacer' },
                            { id: 'btn_forgot_pass', type: 'button', caption: 'Forgot password', icon: 'fa fa-key' }
                        ],
                        onClick: function (event) {
                            if (event.target == 'btn_sing_up') {
                                //w2ui.form.clear();
                                _self.f_mod_load('test');
                            }
                            if (event.target == 'btn_forgot_pass') {
                                //w2ui.form.save();
                            }
                        }
                    }
                });
            }
        }
    }
});