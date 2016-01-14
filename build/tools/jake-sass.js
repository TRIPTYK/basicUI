(function() {
    'use strict';
    let glob = require('glob');
    let async = require('async');
    let fs = require('fs');
    let path = require('path');
    let mkdirp = require('mkdirp');
    let sass = require('node-sass');

    function renderFile(fileName, options, sassOptions, cb) {
        sassOptions.file=fileName;
        sass.render(sassOptions, function(err, result) {
            if (err) throw err;
            let destFile = path.join(options.destFolder, fileName.substr(fileName.lastIndexOf(options.srcFolder) + options.srcFolder.length));
            destFile = destFile.substr(0, destFile.length - 4) + 'css';
            let getDirName = path.dirname(destFile);
            mkdirp(getDirName, function(err) {
                if (err) console.error(err);
                fs.writeFile(destFile, result.css, 'utf8', cb);
            });
        });
    }

    exports.sassify = function(options, success, fail) {
        let files = options.files;
        let sassOptions = {};
        for (var z in options.sassOptions) {
            sassOptions[z] = options.sassOptions[z];
        }
        console.log(sassOptions);

        glob(files, (err, files) => {
            async.each(files, (item, callback) => {
                renderFile(item, options,sassOptions, callback);
            }, (err) => {
                if (err) return fail(err);
                success();
            });

        });
    };



}());
