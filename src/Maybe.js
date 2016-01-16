"use strict";
var Monad = require('./Monad');

var Maybe = module.exports = class Maybe extends Monad {
    static get just() {
        return Just;
    }

    static get nothing() {
        return Nothing;
    }

    static of(a) {
        return a !== null && a !== undefined ? new Just(a) : new Nothing();
    }

    isNothing() {
        return false;
    }

    isJust() {
        return false;
    }
};

class Just extends Maybe {

    map(f) {
        return new Just(f(this.value));
    }

    getOrElse() {
        return this.value;
    }

    filter(f) {
        Maybe.fromNullable(f(this.value) ? this.value : null);
    }

    isJust() {
        return true;
    }

    toString() {
        return `Maybe.Just(${this.value})`;
    }
}

class Nothing extends Maybe {
    map(f) {
        return this; // noop (mapping over nothing)
    }


    getOrElse(other) {
        return other;
    }

    filter() {
        return this.value;
    }

    isNothing() {
        return true;
    }

    toString() {
        return 'Maybe.Nothing';
    }
}