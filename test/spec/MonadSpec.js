var Monad = require('../../src/Monad');

describe('Monad', () => {
    describe('.get()', () => {
        it('should return the wrapped value', () => {
            expect(new Monad(10).get()).toBe(10);
        });
    });
});