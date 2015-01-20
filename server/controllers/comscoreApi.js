'use strict';

var comscoreReport = require('./comscoreReport');

var getOptions = function(req) {
  var options = {
    site: req.query.site,
    itemid: req.query.itemid,
    startdate: req.query.startdate
  };

  if (req.query.enddate) {
    options.enddate = req.query.enddate;
  }
  if (req.query.eventfilter) {
    options.eventfilterid = req.query.eventfilterid;
  }
  if (req.query.visitfilter) {
    options.visitfilterid = req.query.visitfilterid;
  }
  if (req.query.segmentid) {
    options.segmentid = req.query.segmentid;
  }
  if (req.query.parameters) {
    var parameters = req.query.parameters.split('|');
    options.parameters = {};
    for (var i in parameters) {
      var parameter = parameters[i].split(':');
      options.parameters[parameter[0]] = parameter[1];
    }
  }
  return options;
};

exports.getReport = function(req, res, ComscoreApi) {
  var options = getOptions(req);
  var cacheId = 'report-' + JSON.stringify(options);
  ComscoreApi.cache.get(cacheId, function(err, value) {
    if (!err && value && value[cacheId]) {
      res.json(value[cacheId]);
    } else {
      comscoreReport.getReport(options, function(err, json) {
        if (err) {
          res.status(400);
          res.json({
            error: err
          });
        } else {
          ComscoreApi.cache.set(cacheId, json, 60 * 5, function(err, success) {
            if (!err && success) {
              res.json(json);
            }
          });
        }
      });
    }
  });
};

exports.getReportData = function(req, res, ComscoreApi) {
  var options = getOptions(req);
  var cacheId = 'report-data-' + JSON.stringify(options);
  ComscoreApi.cache.get(cacheId, function(err, value) {
    if (!err && value && value[cacheId]) {
      res.json(value[cacheId]);
    } else {
      comscoreReport.getReportData(options, function(err, json) {
        if (err) {
          res.status(400);
          res.json({
            error: err
          });
        } else {
          ComscoreApi.cache.set(cacheId, json, 60 * 5, function(err, success) {
            if (!err && success) {
              res.json(json);
            }
          });
        }
      });
    }
  });
};
