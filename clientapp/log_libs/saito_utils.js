'use strict';
module.exports = function __LOG(message, thisObj, args, colorIndex) {
    /*
    usage:  
    __LOG('method()', this, arguments, 1);
     */
    
    /**
     * __LOG shows a console.debug with colors.
     *   creates a group and puts arguments and this
     * @param  {[string]}     message      [message to show]
     * @param  {[object]}     thisObj      [this object, holds the context]
     * @param  {[arguments]}  args         [arguments]
     * @param  {[integer]}    colorIndex   [1,2,3,4,5,6]
     */
    var _ = require('underscore')
        , groupName
        , groupColor

        , rpad = function (str, padString, length) {
                while (str.length < length) {
                    str = str + padString;
                }
                return str;
            }

        , truncate = function (str, length, truncateStr) {
                if (str === null) {
                    return '';
                }
                str = String(str);
                truncateStr = truncateStr || '...';
                length = ~~length;
                return str.length > length ? str.slice(0, length) + truncateStr : str;
            }

        , getName = function (options) {
                var nameParts
                    , name = ''
                    , method = ''
                ;

                if (options.name) {
                    nameParts = options.name.split('.');
                }
                else {
                    return '';
                }
                
                // get the first part
                name = nameParts.shift();
                name = truncate(name, (options.nameSize - 2), '..');

                if (nameParts.length > 0) {
                    var fullMethodName = nameParts.join('.');
                    fullMethodName = getDetailsByMethodName(fullMethodName);
                    method = truncate(fullMethodName, (options.methodSize - 2), '..');

                    var hasId = _.isObject(thisObj) && _.has(thisObj, 'id');
                    if (hasId) {
                        name = name + '[' + thisObj.id + ']';
                    }

                    name   = rpad(name,   ' ', options.nameSize);
                    method = rpad(method, ' ', options.methodSize);
                }
                else {
                    throw new Error('getName :: cant find "." to split method');
                }

                return name + method;
            }

        , getDetailsByMethodName = function (name) {
                var haveOnOff = name.search(/\b(on|off)\b/) >= 0;
                var haveEmit = name.search(/\bemit\b/) >= 0;
                var haveTrigger = name.search(/\btrigger\b/) >= 0;

                if (haveOnOff || haveEmit || haveTrigger) {
                    if (args.length >= 4 &&
                        typeof args[0] === 'string' &&
                        typeof args[1] === 'undefined' &&
                        typeof args[3] === 'string') {
                        return name + ' [' + args[0] + '] => ' + args[3];
                    }
                    if (args.length >= 4 &&
                        typeof args[0] === 'string' &&
                        typeof args[1] === 'string' &&
                        typeof args[3] === 'string') {
                        return name + ' [' + args[1] + ': ' + args[0] + '] => ' + args[3];
                    }
                    if (args.length > 0 && typeof args[0] === 'string') {
                        return name + ' [' + args[0] + ']';
                    }
                }

                return name;
            }

        , colors = {
            1: {  backgroundColor: '#DCECEF'
            , foregroundColor: '#620F09'
            },

            2: {  backgroundColor: '#DCECEF'
                    , foregroundColor: '#426D09'
            },

            3: {  backgroundColor: '#FFFFD7'
                    , foregroundColor: '#21460F'
            },

            4: {  backgroundColor: '#FFFDF7'
                    , foregroundColor: '#6700B9'
            },
            
            5: {  backgroundColor: '#eee'
                    , foregroundColor: '#284'
            },
            
            6: {  backgroundColor: '#FFFDF7'
                    , foregroundColor: '#7653C1'
            }
        }

        , logGroup = function ()
            {
                console.groupCollapsed(groupName, groupColor);
                console.dir(thisObj);
                console.dir(args);
                console.groupEnd();
            }
    ;

    var ignores = message.search(/\bgetWildcardCallbacks\b/) >= 0;
    if (ignores) {
        return;
    }

    groupName = '%c' + getName({
        name      : message,
        nameSize  : 20,
        methodSize: 90
    });

    groupColor = ' background  : ' + colors[colorIndex].backgroundColor +
                                             ';color       : ' + colors[colorIndex].foregroundColor;

    logGroup();

    // show -------pause----------
    clearTimeout(__LOG.globalTimeoutLogId);
    __LOG.globalTimeoutLogId = setTimeout(function () {
        // if is not canceled, shows line bellow
        console.debug('----------------------------------pause--------------------------');
    }, 100);
};
