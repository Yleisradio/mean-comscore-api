'use strict';

var comscoreApi = require('../controllers/comscoreApi');

module.exports = function(ComscoreApi, app, auth, database) {

    app.get('/comscore/report', auth.requiresLogin, function(req, res, next) {
        comscoreApi.getReport(req, res, ComscoreApi);
    });
    app.get('/comscore/reportdata', auth.requiresLogin, function(req, res, next) {
        comscoreApi.getReportData(req, res, ComscoreApi);
    });
};
