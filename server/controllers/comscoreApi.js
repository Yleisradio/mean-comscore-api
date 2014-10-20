'use strict';

var mean = require('meanio'),
    config = mean.loadConfig(),
    comscoreReport = require('./comscoreReport');

exports.getReport = function(req, res, ComscoreApi) {
    var options = {
        client: config.comscore.client,
        user: config.comscore.username,
        password: config.comscore.password,
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
        options.parameters = req.query.parameters;
    }
    var cacheId = JSON.stringify(options);
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
                    ComscoreApi.cache.set(cacheId, json, 60 * 30, function(err, success) {
                        if (!err && success) {
                            res.json(json);
                        }
                    });
                }
            });
        }
    });
};
