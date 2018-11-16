var f_log = 1 ? console.log.bind(console, 'UI: ') : function () { };
function f_get(url) { var r = new XMLHttpRequest(); r.open('GET', url, false); r.send(null); if (r.status === 200) return r.responseText; return ''; }

$(function () {
    var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top', size: 50, resizable: true, hidden: true, style: pstyle, content: 'top' },
            { type: 'left', size: 200, resizable: true, hidden: true, style: pstyle, content: 'left' },
            { type: 'main', style: pstyle, content: '<div id="eventList"></div>' },
            { type: 'preview', size: '50%', resizable: true, hidden: true, style: pstyle, content: 'preview' },
            { type: 'right', size: 200, resizable: true, hidden: true, style: pstyle, content: 'right' },
            { type: 'bottom', size: 50, resizable: true, hidden: true, style: pstyle, content: 'bottom' }
        ]
    });
    w2ui['layout'].on('*', function (event) {
        console.log('Event: ' + event.type + ' Target: ' + event.target);
    });
});
