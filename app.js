'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var ComscoreApi = new Module('mean-comscore-api');
var NodeCache = require('node-cache');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
ComscoreApi.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  ComscoreApi.routes(app, auth, database);

  ComscoreApi.cache = new NodeCache();

  return ComscoreApi;
});
