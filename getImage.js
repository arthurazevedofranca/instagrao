'use strict';

const image = require('./lib/image');
const AWS = require('./lib/aws');

const getImage = (s3objectkey) => {

    return image
        .get(s3objectkey)
        .then((data) => {
            return new AWS.S3().getObject({ Bucket: process.env.BUCKETNAME_IMAGE, Key: data.key }).promise();  
        })
        .then((data) => {
            return { contentType: data.ContentType, image: new Buffer(data.Body.buffer, 'base64') };
        });
};

module.exports = getImage;