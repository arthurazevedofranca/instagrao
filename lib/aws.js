'use strict';

let AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));

module.exports = AWS