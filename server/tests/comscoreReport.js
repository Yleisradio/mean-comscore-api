'use strict';

var mock = require('./util/mock'),
    fixtures = require('./fixtures'),
    setup = require('./util/setup'),
    expect = require('chai').expect,
    comscoreReport = require('../controllers/comscoreReport'),
    mean = require('meanio'),
    config = mean.loadConfig();

describe('GET /comscore/report', function() {
    before(function(done) {
        setup.before();
        done();
    });

    after(function(done) {
        setup.after();
        done();
    });

    it('gets ComScore data', function(done) {
        var params = {
            client: config.comscore.client,
            user: config.comscore.username,
            password: config.comscore.password,
            itemid: 11764,
            site: 'supersite',
            startdate: 20141001,
            parameters: 'page:*'
        };
        mock.comscoreReport(params, 200, fixtures.report('valid'));
        comscoreReport.getReport(params, function(err, report) {
            expect(report).deep.equal(fixtures.report('valid'));
            done();
        });

    });

    it('gets error', function(done) {
        var params = {
            client: config.comscore.client,
            user: config.comscore.username,
            password: config.comscore.password,
            itemid: 11764,
            site: 'supersite',
            startdate: 20141001
        };
        mock.comscoreReport(params, 200, fixtures.report('invalid'));
        comscoreReport.getReport(params, function(err, report) {
            expect(err).deep.equal('Number of parameters given not the same as the number required. Given 0 required 1.');
            done();
        });

    });
});