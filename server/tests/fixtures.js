'use strict';

var fs = require('fs');

exports.report = function(id) {
    return JSON.parse(fs.readFileSync('node_modules/mean-comscore-api/server/tests/fixtures/report/' + id + '.json'));
};