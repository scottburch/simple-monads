var Just = require('../../src/Maybe').just;


describe('Just', () => {
    describe('of()', () => {
        it('should return a wrapped value', () => {
             expect(Just.of(10).toString()).toBe('Maybe.Just(10)');
        });
    });

    describe('map()', () => {
        it('should run the passed function with the value', () => {
            var spy = jasmine.createSpy().and.callFake(() => 20);
            expect(Just.of(10).map(spy).toString()).toBe('Maybe.Just(20)');
            expect(spy).toHaveBeenCalledWith(10);
        });
    });

});