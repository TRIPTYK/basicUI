(function() {
    'use strict';
    let eachAsync = require('each-async');
    let fs = require('fs');
    let path = require('path');
    let express = require('express');
    let livereload = require('express-livereload')
    let app = express();

    exports.server = function() {

        let config = {};
        config.watchDir = path.join(__dirname+'../../../dist/scss/main.css');
        console.log(process.cwd());
        livereload(app, config);

        app.get('/', function (req, res) {
          res.sendFile(path.join(__dirname+'../../../dist/index.html'));
        });

        app.listen(3000, function () {
          console.log('Example app listening on port 3000!');
        });

    };
}());