var Maybe = require('../../src/Maybe');

describe('Maybe monad', () => {
    describe('fromNullable', () => {
        it('should return Nothing if value is undefined', () => {
            expect(Maybe.fromNullable(undefined).toString()).toBe('Maybe.Nothing');
        })

        it('should return Nothing if value is null', () => {
            expect(Maybe.fromNullable(null).toString()).toBe('Maybe.Nothing');
        });

        it('should return a Just wrapped value', () => {
            expect(Maybe.fromNullable((10)).toString()).toBe('Maybe.Just(10)');
        });
    });


});