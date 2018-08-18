var Maybe = require('../../lib/simple-monads').Maybe;

describe('Maybe monad', () => {
    describe('of()', () => {
        it('should return Nothing if value is undefined', () => {
            expect(Maybe.of(undefined).isNone()).toBe(true);
        });

        it('should return Nothing if value is null', () => {
            expect(Maybe.of(null).isNone()).toBe(true);
        });

        it('should return a Just wrapped value', () => {
            expect(Maybe.of(10).join()).toBe(10);
        });
    });


    describe('ap()', () => {
        it('should run the function in the monad on the passed value and return a maybe', () => {
            const spy = jasmine.createSpy().and.callFake(v => v * 2);
            expect(Maybe.of(10).ap(Maybe.of(spy)).join()).toBe(20);
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

    describe('flatMap()', () => {
        it('should not get called if monad contains undefined', () => {
            Maybe.of(undefined)
                .flatMap(() => {throw 'should not be called'})
        });


    });

    describe('map()', () => {

        it('should not run if the maybe is undefined or null', () => {
            var spy = jasmine.createSpy();
            Maybe.of(undefined).map(spy);
            Maybe.of(null).map(spy);
            expect(spy).not.toHaveBeenCalled();
        });

        it('should run if the maybe is not undefined or null', () => {
            var spy = jasmine.createSpy();
            Maybe.of('xx').map(spy);
            expect(spy).toHaveBeenCalledWith('xx');
        });

        it('should chain maps returning a maybe', () => {

            var spy1 = jasmine.createSpy().and.returnValue('yy');
            var spy2 = jasmine.createSpy().and.returnValue('zz');
            var ret = Maybe.of('xx').map(spy1).map(spy2);
            expect(spy1).toHaveBeenCalledWith('xx');
            expect(spy2).toHaveBeenCalledWith('yy');
            expect(ret.join()).toBe('zz');

            spy1 = jasmine.createSpy().and.returnValue(undefined);
            spy2 = jasmine.createSpy();
            var ret = Maybe.of('xx').map(spy1).map(spy2);
            expect(spy1).toHaveBeenCalledWith('xx');
            expect(spy2).not.toHaveBeenCalled();
            expect(ret.isNone()).toBe(true);
        });
    });

    describe('orElse()', () => {
        it('should not run if maybe is Just', () => {
            const spy1 = jasmine.createSpy();
            const spy2 = jasmine.createSpy();

            Maybe.of(10).orElse(spy1).map(spy2);

            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).toHaveBeenCalledWith(10);
        });

        it('should run if maybe is Nothing', () => {
            const spy1 = jasmine.createSpy().and.returnValue(10);
            const spy2 = jasmine.createSpy();

            Maybe.of(undefined).orElse(spy1).map(spy2);

            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalledWith(10);
        });
    });
});