# ComScore API

ComScore API is an API client for MEAN.io stack.

## Features
- Get ComScore report from the API
- Caching

## Dependencies
- Requires MEAN 0.4.0 http://mean.io
- Other dependencies are installed automatically by npm.

## Installation
npm install mean-date-filter --save

## Configuration
Add the following configuration parameters to your config file

	comscore: {
		client: 'client name',
		username: 'username',
		password: 'password'
	}

## Basic Usage
http://localhost:3000/comscore/report?itemid=12345&site=supersite&startdate=20141001&parameters=parameterName:parameterValue

The API can also be used programmatically
	comScore = require('node_modules/mean-comscore-api/server/comscoreReport');

	comScore.getReport({
		itemid: 12345,
		site: 'supersite',
        startdate: 20141001,
        parameters: 'parameterName:parameterValue'
	})