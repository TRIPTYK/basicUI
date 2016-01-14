(function() {
    'use strict';
    let glob = require('glob');
    let async = require('async');
    let fs = require('fs');
    let path = require('path');
    let mkdirp = require('mkdirp');
    let sass = require('node-sass');

    function renderFile(fileName, options, cb) {
        sass.render({
            file: fileName,
            options: options.sassOptions
        }, function(err, result) {
            if (err) throw err;
            let destFile = path.join(options.destFolder, fileName.substr(fileName.lastIndexOf(options.srcFolder) + options.srcFolder.length));
            console.log("eee"+destFile);
            let getDirName = path.dirname(destFile);
            console.log(getDirName);
            mkdirp(getDirName, function(err) {
                if (err) console.error(err);
                fs.writeFile(destFile, result.code, 'utf8', cb);
            });
        });
    }

    exports.sassify = function(options, success, fail) {
        let files = options.files;
        let sassOptions = options;
        glob(files, (err, files) => {
            async.each(files, (item, callback) => {
                renderFile(item, sassOptions, callback);
            }, (err) => {
                if (err) return fail(err);
                success();
            });

        });
    };



}());
