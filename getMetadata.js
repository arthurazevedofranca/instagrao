'use strict';

const image = require('./lib/image');

const getMetadata = (s3objectkey) => {
    return image.get(s3objectkey);
};

module.exports = getMetadata;