var Just = require('../../src/Maybe').just;


describe('Just', () => {
    describe('of()', () => {
        it('should return a wrapped value', () => {
             expect(Just.of(10).toString()).toBe('Maybe.Just(10)');
        });
    });
});