'use strict';

const getMetadata = require('./getMetadata');
let image = require('./lib/image');

describe('getMetadata',  () => {

    test('get metadata from s3objectkey', () => {
        const s3objectkey = '123';
        image.get = jest.fn().mockReturnValue(Promise.resolve({ s3objectkey: s3objectkey }));

        expect.assertions(2);
        return getMetadata(s3objectkey).then((data) => {
            expect(image.get).toBeCalledWith(s3objectkey);
            expect(data).toEqual({ s3objectkey: s3objectkey });
        });
    });
});
