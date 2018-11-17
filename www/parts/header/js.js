var ___code = '[___code]',
    ___id = '[___id]';

var ___com = Vue.extend({
    mixins: [VUE_COM_BASE_CONTRACTOR],
    template: '', //f_temp(___code, ___id),
    data: function () {
        return {
            code: ___code,
            el_id: ___id,
            uc_toolbar_name: 'uc_toolbar_name' + this.el_id
        };
    },
    beforeDestroy: function () {
        var _self = this;
        f_log(_self.code + ':: beforeDestroy');
        if (w2ui[_self.uc_toolbar_name]) w2ui[_self.uc_toolbar_name].destroy();
    },
    destroyed: function () {
        var _self = this;
        f_log(_self.code + ':: destroyed');
    },
    beforeCompile: function () {
        var _self = this;
        f_log(_self.code + ':: beforeCompile');
        this.f_base_hide();
    },
    compiled: function () {
        var _self = this;
        f_log(_self.code + ':: compiled');
    },
    ready: function () {
        var _self = this;
        f_log(_self.code + ':: ready');

        _self.f_toolbar_init();

        this.f_base_show();
        _LOADING.f_hide();
    },
    methods: {
        f_toolbar_init: function () {
            var _self = this;

            if (!w2ui[_self.uc_toolbar_name]) {
                $(_self.$el).w2toolbar({
                    name: _self.uc_toolbar_name,
                    style: 'background:#fff;',
                    items: [
                        {
                            type: 'menu-radio', id: 'item2', icon: 'fa fa-bars',
                            text: function (item) {
                                var text = item.selected;
                                var el = this.get('item2:' + item.selected);
                                return '' + el.text + '';
                            },
                            selected: 'id3',
                            items: [
                                { id: 'id1', text: 'Item 1', icon: 'fa fa-camera' },
                                { id: 'id2', text: 'Item 2', icon: 'fa fa-picture-o' },
                                { id: 'id3', text: 'Item 3', icon: 'fa fa-glass', count: 12 }
                            ]
                        },
                        { type: 'button', id: 'id_toolbar_home', text: '', icon: 'icon-basic-home' },
                        { type: 'button', id: 'id_toolbar_search', text: '', icon: 'icon-basic-magnifier' },
                        { type: 'spacer' },
                        { type: 'button', id: 'id_toolbar_task', text: '', icon: 'icon-basic-mixer2', count: 7, },
                        { type: 'button', id: 'id_toolbar_mail', text: '', icon: 'fa fa-envelope-o', count: 7, },
                        { type: 'button', id: 'id_toolbar_chat', text: '', icon: 'icon-basic-message-multiple', count: 9, },
                        {
                            type: 'drop', id: 'item4', text: '', icon: 'fa fa-bell-o', tooltip: 'Notification Messages', count: 5,
                            html: '<div style="padding: 10px; line-height: 1.5">You can put any HTML in the drop down.<br>Include tables, images, etc.</div>'
                        },
                        {
                            type: 'menu', id: 'id_toolbar_user_menu', text: '', icon: 'fa fa-user-o', items: [
                                { type: 'button', id: 'id_toolbar_user', text: 'Account Infomation', icon: 'icon-basic-info' },
                                { type: 'button', id: 'id_toolbar_help', text: 'Help', icon: 'icon-basic-question' },
                                { type: 'button', id: 'id_toolbar_settings', text: 'Settings', icon: 'icon-basic-gear' },
                                { text: '--' },
                                { text: 'Item 1', icon: 'fa fa-camera', count: 5 },
                                { text: 'Item 2', icon: 'fa fa-picture-o', disabled: true },
                                { text: 'Item 3', icon: 'fa fa-glass', count: 12 },
                                { text: '--' },
                                { type: 'button', id: 'id_toolbar_logout', text: 'Logout', icon: 'fa fa-sign-out' },
                                { type: 'button', id: 'id_toolbar_close', text: 'Exit Application', icon: 'icon-arrows-circle-remove' },
                            ]
                        },

                        ////{
                        ////    type: 'menu', id: 'item1', text: 'Menu', icon: 'fa fa-table', count: 17, items: [
                        ////      { text: 'Item 1', icon: 'fa fa-camera', count: 5 },
                        ////      { text: 'Item 2', icon: 'fa fa-picture-o', disabled: true },
                        ////      { text: 'Item 3', icon: 'fa fa-glass', count: 12 }
                        ////    ]
                        ////},
                        ////{ type: 'break' },
                        ////{
                        ////    type: 'menu-radio', id: 'item2', icon: 'fa fa-star',
                        ////    text: function (item) {
                        ////        var text = item.selected;
                        ////        var el = this.get('item2:' + item.selected);
                        ////        return 'Radio: ' + el.text;
                        ////    },
                        ////    selected: 'id3',
                        ////    items: [
                        ////        { id: 'id1', text: 'Item 1', icon: 'fa fa-camera' },
                        ////        { id: 'id2', text: 'Item 2', icon: 'fa fa-picture-o' },
                        ////        { id: 'id3', text: 'Item 3', icon: 'fa fa-glass', count: 12 }
                        ////    ]
                        ////},
                        ////{ type: 'break' },
                        ////{
                        ////    type: 'menu-check', id: 'item3', text: 'Check', icon: 'fa fa-heart',
                        ////    selected: ['id3', 'id4'],
                        ////    onRefresh: function (event) {
                        ////        event.item.count = event.item.selected.length;
                        ////    },
                        ////    items: [
                        ////        { id: 'id1', text: 'Item 1', icon: 'fa fa-camera' },
                        ////        { id: 'id2', text: 'Item 2', icon: 'fa fa-picture-o' },
                        ////        { id: 'id3', text: 'Item 3', icon: 'fa fa-glass', count: 12 },
                        ////        { text: '--' },
                        ////        { id: 'id4', text: 'Item 4', icon: 'fa fa-glass' }
                        ////    ]
                        ////},
                        ////{ type: 'break' },
                        ////{
                        ////    type: 'drop', id: 'item4', text: 'Dropdown', icon: 'fa fa-plus',
                        ////    html: '<div style="padding: 10px; line-height: 1.5">You can put any HTML in the drop down.<br>Include tables, images, etc.</div>'
                        ////},
                        ////{ type: 'break', id: 'break3' },
                        ////{
                        ////    type: 'html', id: 'item5',
                        ////    html: function (item) {
                        ////        var html =
                        ////          '<div style="padding: 3px 10px;">' +
                        ////          ' CUSTOM:' +
                        ////          '    <input size="10" onchange="var el = w2ui.toolbar.set(\'item5\', { value: this.value });" ' +
                        ////          '         style="padding: 3px; border-radius: 2px; border: 1px solid silver" value="' + (item.value || '') + '"/>' +
                        ////          '</div>';
                        ////        return html;
                        ////    }
                        ////},
                        ////{ type: 'spacer' },
                        ////{ type: 'button', id: 'item6', text: 'Item 6', icon: 'fa fa-flag' }

                    ]
                });
            }
        }
    }
});