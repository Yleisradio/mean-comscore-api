'use strict';

var https = require('https'),
    qs = require('qs'),
    _ = require('lodash');

var stringifyComScoreReportParameters = function(parameters) {
    var url = 'parameters=';
    parameters = parameters.split('|');
    for (var i in parameters) {
        var parameter = parameters[i].split(':');
        url += encodeURIComponent(parameter[0]) + ':' + encodeURIComponent(parameter[1]);
    }
    url += '&';
    return url;
};

exports.stringifyComScoreReportParameters = stringifyComScoreReportParameters;

exports.getReport = function(options, callback) {
    options = _.clone(options);
    //Build ComScore request url
    var baseUrl = 'https://dax-rest.comscore.eu/v1/reportitems.json';
    var url = baseUrl + '?';

    if (options.parameters) {
        url += stringifyComScoreReportParameters(options.parameters);
        delete options.parameters;
    }
    url += qs.stringify(options);

    //Make request to ComScore API
    var json = '';
    https.get(url, function(comScoreResponse) {
        comScoreResponse.on('data', function(chunk) {
            json += chunk;
        });
        comScoreResponse.on('end', function() {
            json = JSON.parse(json);
            if (typeof json.ERROR !== 'undefined') {
                callback(json.ERROR, null);
            } else {
                callback(null, json);
            }
        });
    });
};
