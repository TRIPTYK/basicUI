/* global desc,task,watchtask*/
(function() {
    "use strict";
    let jakeSass = require(`${process.cwd()}/build/tools/jake-sass`);
    let startTime = Date.now();

    desc('default task');
    task('default', ['build'], () => {
        let elapsedSeconds = (Date.now() - startTime) / 1000;
        console.log('\n\nBUILD OK  (' + elapsedSeconds.toFixed(2) + 's)');

    });


    desc('build the css');
    task('build', () => {
        let options = {
            files: 'src/**/*.scss',
            srcFolder: 'src/',
            destFolder: 'dist/',
            sassOptions: {
                outputStyle: 'expanded'
            }
        };
        jakeSass.sassify(options, complete, fail);
    }, {
        async: true
    });


    watchTask(['build'], function() {
        this.watchFiles.include([
            'src/**/*.scss'
        ]);

    });



}());
