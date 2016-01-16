var Maybe = require('../../src/Maybe');

describe('Maybe monad', () => {
    describe('of()', () => {
        it('should return Nothing if value is undefined', () => {
            expect(Maybe.of(undefined).toString()).toBe('Maybe.Nothing');
        })

        it('should return Nothing if value is null', () => {
            expect(Maybe.of(null).toString()).toBe('Maybe.Nothing');
        });

        it('should return a Just wrapped value', () => {
            expect(Maybe.of(10).toString()).toBe('Maybe.Just(10)');
        });
    });
});