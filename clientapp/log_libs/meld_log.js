'use strict';
module.exports = function __MELD_LOG(appName, app, colorIndex) {
    var meld = require('meld');
    var trace = require('meld/aspect/trace');
    var __LOG = require('./saito_utils');
    var pointcut = /.*/;
    var myReporter = {
        onCall: function (info) {
            __LOG('> ' + appName + '.> ' + info.method, info.target, info.args, colorIndex);
        },
        onReturn: function (info) {
            // SHOW_RETURN
            if (__LOG.SHOW_RETURN === true) {
                __LOG('< ' + appName + '.< ' + info.method, info.target, info.args, colorIndex);
            }
        }
    };
    // Around advice wraps the intercepted method in layers
    meld(app, pointcut, trace(myReporter));
};