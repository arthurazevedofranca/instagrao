'use strict';

const Promise = require('bluebird');
const slugify = require('slugify');

const extractMetadata = require('./extractMetadata');
let image = require('./lib/image');

describe('extractMetadata',  () => {

    test('extract metadata invalid objects', () => {
        expect.assertions(1);
        return extractMetadata({}).catch((e) => {
            expect(e).toBe('s3Objects invalid');
        });
    });

    test('extract metadata from one object', () => {

        let s3Object = { key: 'images/minha-escalacao.jpg', size: 407 };

        image.put = jest.fn().mockReturnValue(Promise.resolve({}));

        expect.assertions(2);
        return extractMetadata([s3Object]).then((data) => {
            let s3ObjectExpected = Object.assign({s3objectkey: slugify(s3Object.key)}, s3Object);
            let resultExpected = {
                message: 'check the status of items in log', 
                type: 'extractMetadataFinished',
                s3objectkeys: [s3ObjectExpected.key]
            };
            
            expect(image.put).toBeCalledWith(s3ObjectExpected);
            expect(data).toEqual(resultExpected);
        });
    });

    test('extract metadata from two objects', () => {
        let s3ObjectOne = { key: 'images/minha-escalacao.jpg', size: 407 };
        let s3ObjectTwo = { key: 'images/minha-escalacao2.jpg', size: 408 };

        image.put = jest.fn().mockReturnValue(Promise.resolve({}));

        expect.assertions(4);
        return extractMetadata([s3ObjectOne, s3ObjectTwo]).then((data) => {
            let s3ObjectOneExpected = Object.assign({s3objectkey: slugify(s3ObjectOne.key)}, s3ObjectOne);
            let s3ObjectTwoExpected = Object.assign({s3objectkey: slugify(s3ObjectTwo.key)}, s3ObjectTwo);

            let resultExpected = {
                message: 'check the status of items in log', 
                type: 'extractMetadataFinished',
                s3objectkeys: [s3ObjectOneExpected.key, s3ObjectTwoExpected.key]
            };
            
            expect(image.put.mock.calls.length).toBe(2);
            expect(image.put).toBeCalledWith(s3ObjectOneExpected);
            expect(image.put).toBeCalledWith(s3ObjectTwoExpected);
            expect(data).toEqual(resultExpected);
        });
    });

    
});
