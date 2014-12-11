'use strict';

var https = require('https'),
  qs = require('qs'),
  _ = require('lodash'),
  mean = require('meanio'),
  config = mean.loadConfig(),
  moment = require('moment');

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

var buildComscoreRequestUrl = function(options) {
  options = _.clone(options);
  var baseUrl = 'https://dax-rest.comscore.eu/v1/reportitems.json',
    url = baseUrl + '?';

  if (options.parameters) {
    url += stringifyComScoreReportParameters(options.parameters);
    delete options.parameters;
  }
  if(!options.client) {
    options.client = config.comscore.client;
  }
  if(!options.user) {
    options.user = config.comscore.username;
  }
  if(!options.password) {
    options.password = config.comscore.password;
  }

  url += qs.stringify(options);
  return url;
};

var getReport = function(options, callback) {
  var url = buildComscoreRequestUrl(options);

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

var addTimestamp = function(row) {
  if (typeof row.day !== 'undefined') {
    var time = row.day + ' ';
    time += row.hour || '00';
    time += ':';
    time += row.minute || '00';
    time += ' Z';
    var date = moment(time, "DD-MM-YYYY HH:mm Z");
    if (date.isValid()) {
      row.time = date.toISOString();
    }
  }
  return row;
};

var getComscoreDataFromReport = function(data) {
  var columns = _.map(data.reportitems.reportitem[0].columns.column, function(column) {
    return column.ctitle.toLowerCase();
  });
  var rows = _.map(data.reportitems.reportitem[0].rows.r, function(reportRow) {
    var row = {};
    reportRow.c.forEach(function(value, index) {
      row[columns[index]] = value;
    });
    row = addTimestamp(row);
    return row;
  });
  return rows;
};

var getReportData = function(options, callback) {
  getReport(options, function(err, data) {
    if(err) {
      callback(err, null);
    } else {
      var json = getComscoreDataFromReport(data);
      callback(null, json);
    }
  })
};

module.exports = {
  stringifyComScoreReportParameters: stringifyComScoreReportParameters,
  getReport: getReport,
  getReportData: getReportData
};
