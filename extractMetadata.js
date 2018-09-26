'use strict';

const Promise = require('bluebird');
const R = require('ramda');
const slugify = require('slugify');

const image = require('./lib/image');

const extractMetadata = (s3Objects) => {

    if (!Array.isArray(s3Objects) || R.isEmpty(s3Objects)) return Promise.reject('s3Objects invalid');

    console.log('s3Objects received', s3Objects && s3Objects.length);

    let s3objectkeys = R.map((s3Object) => {
        s3Object = R.merge(s3Object, { s3objectkey: slugify(s3Object.key)});
        console.log('s3Object', s3Object);
    
        image.put(s3Object)
            .tap((data) => console.log('put s3Object success', data))
            .tapCatch((e) => console.log('put s3Object error', e));

        return s3Object.key;
    }, s3Objects);

    return Promise.resolve({
        message: 'check the status of items in log', 
        type: 'extractMetadataFinished',
        s3objectkeys: s3objectkeys
    });
};

module.exports = extractMetadata;
