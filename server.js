/*
 * Server
 */

var chalk = require('chalk');
var chokidar = require('chokidar');
var express = require('express');
var fspath = require('path');
var nurl = require('url');
var serveStatic = require('serve-static');
var tinylr = require('tiny-lr');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Live Reload

var lrport = 35750;
var lrserver = tinylr();
lrserver.listen(lrport);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Web Server

var port = 6500;
var app = express();

app.use(require('connect-livereload')({
    port: lrport
}));

app.use(function(req, res, next) {
    var parse = nurl.parse(req.url);
    var ext = fspath.extname(parse.pathname);
    if ((ext === '' || !isNaN(ext)) && req.url !== '/') {
        req.url = '/index.html';
    }
    next();
});

app.use('/', serveStatic('public'));

app.listen(port, function() {
    console.log(chalk.green("Server ready") + " at " + chalk.magenta("http://localhost:" + port));
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Watcher

var watcher = chokidar.watch([
    "public/**/*",
    "server.js"
], {
    ignoreInitial: true
});

watcher.on('all', function(action, filepath) {
    if (action === 'addDir') {
        return;
    }

    // Log change
    console.log(filepath + " - " + action);

    // Indicate file changed
    lrserver.changed({
        body: {
            files: [filepath]
        }
    });
});
