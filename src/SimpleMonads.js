import monet from 'monet'
module.exports = monet;
module.exports.default = monet;


// Shim to make simple-monads backward compatible
monet.Either.left = monet.Either.Left;
monet.Either.right = monet.Either.Right;

monet.Either.prototype.join = function() {
    return this.cata(x => x, x => x)
};

monet.Either.of = val => isNotNull(val) ? monet.Either.Right(val) : monet.Either.Left(val);
monet.Maybe.of = val => isNotNull(val) ? monet.Maybe.Some(val) : monet.Maybe.Nothing();

monet.Either.prototype.get = monet.Either.prototype.join;

monet.Either.prototype.map = function(fn) {
    return this.flatMap(x => {
        const result = fn(x)
        return isNotNull(result) ? monet.Either.Right(result) : monet.Either.Left(result)
    })
};

monet.Maybe.prototype.map = function(fn) {
    return this.flatMap(x => {
        const result = fn(x)
        return isNotNull(result) ? monet.Maybe.Some(result) : monet.Maybe.None()
    })
};

monet.Nothing = monet.None;


monet.Either.prototype.getOrElse = function(v) {
    return this.isRight() ? this.join() : v
};

monet.Either.prototype.orElse = function(fn) {
    return this.isRight() ? this : monet.Either.of(fn(this.join()));
};

monet.Maybe.prototype.getOrElse = function(v) {
    return this.isSome() ? this.join() : v
};

monet.Maybe.prototype.orElse = function(fn) {
    return this.isSome() ? this : monet.Maybe.of(fn(this.join()));
};

const isNotNull = val => val !== undefined && val !== null;

monet.Just.of = monet.Just;
monet.Some.of = monet.Some;
monet.None.of = monet.None;