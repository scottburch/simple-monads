var Monad = require('../../src/Monad');
var R = require('ramda');

describe('Monad', () => {
    describe('.get()', () => {
        it('should return the wrapped value', () => {
            expect(new Monad(10).get()).toBe(10);
        });
    });

    describe('.bind()', () => {
       it('should return the result of running a function on a monad value', () => {
           expect(new Monad(10).bind(R.inc)).toBe(11);
       });
    });
});