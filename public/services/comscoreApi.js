'use strict';

angular.module('mean.mean-comscore-api').factory('ComscoreApi', ['$http',
  function($http) {
    var forEachSorted = function(obj, iterator, context) {
      var keys = sortedKeys(obj);
      for (var i = 0; i < keys.length; i++) {
        iterator.call(context, obj[keys[i]], keys[i]);
      }
      return keys;
    };

    var sortedKeys = function(obj) {
      var keys = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys.sort();
    };

    var buildUrl = function(url, params) {
      if (!params) return url;
      var parts = [];
      forEachSorted(params, function(value, key) {
        if (value === null || value === undefined) return;
        if (angular.isObject(value)) {
          value = angular.toJson(value);
        }
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      });
      return url + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
    };

    var getReport = function(params, callback, options) {
      $http.get(buildUrl('/comscore/report', params), options).success(function(data) {
        if (typeof callback === 'function') {
          callback(null, data);
        }
      }).error(function(data, status, headers, config) {
        if (typeof callback === 'function') {
          callback(new Error(status), data);
        }
      });
    };

    var getReportData = function(params, callback, options) {
      $http.get(buildUrl('/comscore/reportdata', params), options).success(function(data) {
        if (typeof callback === 'function') {
          callback(null, data);
        }
      }).error(function(data, status, headers, config) {
        if (typeof callback === 'function') {
          callback(new Error(status), data);
        }
      });
    };

    return {
      getReport: getReport,
      getReportData: getReportData
    };
  }
]);