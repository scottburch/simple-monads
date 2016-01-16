var Identity = require('../../src/Identity.js');

describe('Identity modal', () => {
    describe('of()', () => {
        it('should wrap the value', () => {
            expect(Identity.of(10).toString()).toBe('Identity (10)')
        });
    });

    describe('map', () => {
        it('should run a function passing the value of the monad', () => {
            var fn = jasmine.createSpy();
            expect(Identity.of(10).map(fn));
            expect(fn).toHaveBeenCalledWith(10);
        });
    });

    describe('join', () => {
        it("should unwrap a wrapped modal", () => {
            var deep = Identity.of(Identity.of(Identity.of(10)));
            expect(deep.join().toString()).toBe('Identity (10)');
        });
    });
});