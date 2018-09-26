'use strict';

const R = require('ramda');

const extractMetadata = require('./extractMetadata');
const getMetadata = require('./getMetadata');
const getImage = require('./getImage');

let callbackSuccess = R.curry((callback, data) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ data: data })
  };
  callback(null, response);
});

let callbackError = R.curry((callback, error) => callback(error));

module.exports.extractMetadata = (event, context, cb) => {
  let s3Objects = R.map(R.path('s3.object'.split('.')), event.Records);
  extractMetadata(s3Objects)
    .then(callbackSuccess(cb))
    .catch(callbackError(cb));
};

module.exports.getMetadata = (event, context, cb) => {
  getMetadata(event.pathParameters.s3objectkey)
    .then(callbackSuccess(cb))
    .catch(callbackError(cb));
};

module.exports.getImage = (event, context, cb) => {
  getImage(event.pathParameters.s3objectkey)
    .then((data) => {
        cb(null, {
          statusCode: 200,
          headers: { 'Content-Type': data.contentType },
          body: data.image.toString('base64'),
          isBase64Encoded: true
        });        
    })
    .catch(callbackError(cb));
};
