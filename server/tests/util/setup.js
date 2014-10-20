'use strict';

var nock = require('nock');

module.exports.before = function(done) {
    nock.disableNetConnect();
    nock.enableNetConnect('localhost');
};

module.exports.after = function() {};
