(function() {
    'use strict';
    let glob = require('glob');
    let eachAsync = require('each-async');
    let fs = require('fs');
    let path = require('path');
    let mkdirp = require('mkdirp');
    let sass = require('node-sass');

    exports.sassify = function(options, success, fail) {


        glob(options.files, (err, files) => {
            eachAsync(files, (item, index, done) => {
                let destFile = path.join(options.destFolder, item.substr(item.lastIndexOf(options.srcFolder) + options.srcFolder.length));
                destFile = destFile.substr(0, destFile.length - 4) + 'css';
                // Gestion des _nalme.scss pour eviter de les compiler inutilement.
                if (path.basename(destFile)[0] === '_') {
                    done();
                    return;
                }
                let getDirName = path.dirname(destFile);
                mkdirp(getDirName, function(err) {
                    if (err) throw (err);
                    sass.render({
                        file: item,
                        outFile: destFile
                    }, function(err, res) {
                        if (err) {
                            throw (err.formatted + '\n');
                        }
                        fs.writeFile(destFile, res.css, 'utf8', function(err) {
                            if (err) throw err;
                            done();
                        });
                    });
                });
            });
        }, (err) => {
            if (err) return fail(err);
            success();
        });
    };
}());