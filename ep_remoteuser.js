/**
 * Created by naster on 25.01.16.
 */
var authorManager = require('ep_etherpad-lite/node/db/AuthorManager');
var ERR = require('async-stacktrace');

exports.handleMessage = function(hook_name, context, cb) {
    var remote_user = context.client.client.request.headers['remote-user'];
    console.error(context.message.token, remote_user);
    authorManager.getAuthor4Token(context.message.token, function(err, author) {
        if (ERR(err)) {
            console.error(err);
            authorManager.setAuthorName(author, 'Publiczny dostep');
        } else {
            authorManager.setAuthorName(author, remote_user);
            authorManager.setAuthorColorId(author, exports.hashCode(remote_user) % authorManager.getColorPalette().length, function() {});
        }
    });
    return cb([context.message]);
};


exports.hashCode = function(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

