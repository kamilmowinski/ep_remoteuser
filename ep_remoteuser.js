/**
 * Created by naster on 25.01.16.
 */
var authorManager = require('ep_etherpad-lite/node/db/AuthorManager');
var ERR = require('async-stacktrace');

exports.handleMessage = function(hook_name, context, cb) {
    console.info("ep_remnoteuser.handleMessage");
    var remote_user = context.client.client.request.headers['remote-user'];
    authorManager.getAuthor4Token(context.message.token, function(err, author) {
        if (ERR(err)) {
        } else {
            authorManager.setAuthorName(author, remote_user);
        }
    });
    return cb([context.message]);
};