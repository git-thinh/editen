var ___code = '[___code]',
    ___id = '[___id]';

var ___com = Vue.extend({
    mixins: [VUE_COM_BASE_CONTRACTOR],
    template: f_temp(___code, ___id),
    data: function () {
        return {
            el_id: ___id,
            test_time: new Date().toString()
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

        this.f_base_show();
        _LOADING.f_hide();
    },
    methods: {
        f_test: function () {
            var _self = this;
            _self.test_time = new Date().toString();
        }
    }
});