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

  it('gets ComScore report', function(done) {
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

describe('GET /comscore/reportdata', function() {
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
    var expectedData = [{
      'day': '01-10-2014',
      'hour': '00',
      'browsers': '31337',
      'time': '2014-01-10T00:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '01',
      'browsers': '15407',
      'time': '2014-01-10T01:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '02',
      'browsers': '9594',
      'time': '2014-01-10T02:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '03',
      'browsers': '7221',
      'time': '2014-01-10T03:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '04',
      'browsers': '7710',
      'time': '2014-01-10T04:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '05',
      'browsers': '14260',
      'time': '2014-01-10T05:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '06',
      'browsers': '35937',
      'time': '2014-01-10T06:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '07',
      'browsers': '62733',
      'time': '2014-01-10T07:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '08',
      'browsers': '76906',
      'time': '2014-01-10T08:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '09',
      'browsers': '82575',
      'time': '2014-01-10T09:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '10',
      'browsers': '80408',
      'time': '2014-01-10T10:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '11',
      'browsers': '77893',
      'time': '2014-01-10T11:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '12',
      'browsers': '81332',
      'time': '2014-01-10T12:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '13',
      'browsers': '84044',
      'time': '2014-01-10T13:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '14',
      'browsers': '84995',
      'time': '2014-01-10T14:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '15',
      'browsers': '91225',
      'time': '2014-01-10T15:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '16',
      'browsers': '94593',
      'time': '2014-01-10T16:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '17',
      'browsers': '95089',
      'time': '2014-01-10T17:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '18',
      'browsers': '97050',
      'time': '2014-01-10T18:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '19',
      'browsers': '102910',
      'time': '2014-01-10T19:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '20',
      'browsers': '121538',
      'time': '2014-01-10T20:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '21',
      'browsers': '123786',
      'time': '2014-01-10T21:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '22',
      'browsers': '97248',
      'time': '2014-01-10T22:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': '23',
      'browsers': '61982',
      'time': '2014-01-10T23:00:00.000Z'
    }, {
      'day': '01-10-2014',
      'hour': 'Total',
      'browsers': '984520'
    }, {
      'day': 'Total',
      'hour': 'Total',
      'browsers': '984520',
      'time': '2000-01-01T00:00:00.000Z'
    }];
    mock.comscoreReport(params, 200, fixtures.report('valid'));
    comscoreReport.getReportData(params, function(err, report) {
      expect(report).deep.equal(expectedData);
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
