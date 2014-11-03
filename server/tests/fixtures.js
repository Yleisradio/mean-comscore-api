'use strict';

var fs = require('fs');

exports.report = function(id) {
    return JSON.parse(fs.readFileSync('server/tests/fixtures/report/' + id + '.json'));
};