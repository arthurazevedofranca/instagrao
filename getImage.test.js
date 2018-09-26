'use strict';

let AWS = require('./lib/aws');
let image = require('./lib/image');
let getImage = require('./getImage');

jest.mock('./lib/aws');

describe('getImage', () => {

    test('get image with s3objectkey', () => {
        const s3objectkey = 'imagesvc-escala.jpg';
        process.env.BUCKETNAME_IMAGE = 'test.instagrao.media';

        let getObject = jest.fn().mockReturnValue({ promise: () => Promise.resolve({ contentType: 'jpeg', Body: {buffer:''} }) });
        AWS.S3 = jest.fn().mockImplementation(() => {
            return { 
                getObject: getObject
            };
        });

        image.get = jest.fn().mockReturnValue(Promise.resolve({ key: s3objectkey }));

        expect.assertions(2);
        return getImage(s3objectkey).then((data) => {
            let paramsExpected = {
                Bucket: process.env.BUCKETNAME_IMAGE,
                Key: s3objectkey
            };

            expect(image.get).toBeCalledWith(s3objectkey);
            expect(getObject).toBeCalledWith(paramsExpected);
        });

    });
});
