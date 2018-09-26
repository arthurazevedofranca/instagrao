'use strict';

const R = require('ramda');
const AWS = require('./aws');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

let buildParams = (object) => {
    return R.merge({
        TableName: process.env.DYNAMODB_TABLE_IMAGE,
    }, object);
}

let get = (s3objectkey) => {
    return dynamoDB
        .get(buildParams({ Key: { s3objectkey: s3objectkey } }))
        .promise()
        .get('Item');
};

let put = (s3Object) => {
    return dynamoDB
        .put(buildParams({ Item: s3Object })
        ).promise();
};

module.exports = {
    get: get,
    put: put
};