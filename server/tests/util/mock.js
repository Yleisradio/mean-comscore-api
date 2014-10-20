'use strict';

var nock = require('nock'),
    qs = require('querystring'),
    _ = require('lodash'),
    comscoreReport = require('../../controllers/comscoreReport');

function mockApiRequest(hostAndProtocol, path, params, statusCode, body) {
    var matchingPath = path + qs.stringify(params);

    nock(hostAndProtocol)
        .get(matchingPath)
        .reply(statusCode, body, {
            'Content-Type': 'application/json'
        });
}

module.exports.comscoreReport = function(options, statusCode, body) {
    options = _.clone(options);
    var url = '/v1/reportitems.json?';
    if (options.parameters) {
        url += comscoreReport.stringifyComScoreReportParameters(options.parameters);
        delete options.parameters;
    }
    url += qs.stringify(options);
    mockApiRequest('https://dax-rest.comscore.eu', url, {}, statusCode, body);
};
