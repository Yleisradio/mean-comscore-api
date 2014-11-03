'use strict';

var paths = {
    js: ['*.js', 'test/**/*.js', '!test/coverage/**', '!bower_components/**', 'packages/**/*.js', '!packages/**/node_modules/**', '!packages/contrib/**/*.js', '!packages/contrib/**/node_modules/**'],
    html: ['packages/**/public/**/views/**', 'packages/**/server/views/**'],
    css: ['!bower_components/**', 'packages/**/public/**/css/*.css', '!packages/contrib/**/public/**/css/*.css']
};

module.exports = function(grunt) {

    if (process.env.NODE_ENV !== 'production') {
        require('time-grunt')(grunt);
    }

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: paths.js,
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: paths.css
        },
        mochaTest: {
            dev: {
                options: {
                    reporter: 'spec',
                    require: [
                        'server.js',
                        function() {
                            require('meanio/lib/util').preload(__dirname + '/packages/**/server', 'model');
                        }
                    ]
                },
                src: ['server/tests/**/*.js']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Test task.
    grunt.registerTask('test', ['jshint', 'csslint', 'mochaTest', 'karma:unit']);

    //Default task(s).
    grunt.registerTask('default', ['test']);
};
