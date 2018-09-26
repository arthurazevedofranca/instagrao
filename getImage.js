'use strict';

const image = require('./lib/image');
const AWS = require('./lib/aws');
const s3 = new AWS.S3();

const getImage = (s3objectkey) => {

    return image
        .get(s3objectkey)
        .get('key')
        .then((key) => {
            return s3.getObject({ Bucket: process.env.BUCKETNAME_IMAGE, Key: key }).promise();  
        })
        .then((data) => {
            return { contentType: data.ContentType, image: new Buffer(data.Body.buffer, 'base64') };
        });
};

module.exports = getImage;