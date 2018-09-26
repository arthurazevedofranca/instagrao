'use strict';

let AWS = require('./lib/aws');
let getImage = require('./getImage');


describe('getImage', () => {

    test('get image with s3objectkey', () => {
        const s3objectkey = 'images/vc-escala.jpg';
        process.env.BUCKETNAME_IMAGE = 'test.instagrao.media';
        let getObject = jest.fn().mockReturnValue(Promise.resolve({ contentType: 'jpeg', Body: {buffer:''} }));
        AWS.S3 = () => {return  { getObject: getObject }; };

        expect.assertions(2);
        return getImage(s3objectkey).then((data) => {
            let paramsExpected = {
                Bucket: process.env.BUCKETNAME_IMAGE,
                Key: s3objectkey
            };

            expect(getObject).toBeCalledWith(paramsExpected);
        });

    });
});
