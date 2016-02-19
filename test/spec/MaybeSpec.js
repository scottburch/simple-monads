var Maybe = require('../../lib/simple-monads').Maybe;

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

    describe('lift()', () => {
        it('returns a function that returns a maybe monad g iven a function', () => {
            var spy = jasmine.createSpy().and.callFake(v => v*2);
            var safeFn = Maybe.lift(spy);
            expect(safeFn(undefined).isNothing()).toBe(true);
            expect(spy).not.toHaveBeenCalled();

            var ret = safeFn(10);
            expect(ret.toString()).toBe('Maybe.Just(20)');
            expect(ret.isJust()).toBe(true);
            expect(spy.calls.count()).toBe(1);
        });
    });

    describe('toEither()', () => {
        it('returns a Right if there is a value', () => {
            expect(Maybe.of(10).toEither().isRight()).toBe(true);
        });

        it('returns a Left if there is no value', () => {
            expect(Maybe.of().toEither().isLeft()).toBe(true);
        });
    });
});