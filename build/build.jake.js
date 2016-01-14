/* global desc,task*/
(function() {
    "use strict";
    let jakeSass = require(`${process.cwd()}/build/tools/jake-sass`);
    let startTime = Date.now();

    desc('default task');
    task('default', ['build']);


    desc('build the css');
    task('build', function() {
        let options = {
            files: 'src/**/*.sass',
            srcFolder: 'src/',
            destFolder: 'dist/',
            sassOptions: {
            }
        };
        jakeSass.sassify(options,complete,fail);
        let elapsedSeconds = (Date.now() - startTime) / 1000;
        console.log('\n\nBUILD OK  (' + elapsedSeconds.toFixed(2) + 's)');
    });
}());
