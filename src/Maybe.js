"use strict";

var Maybe = module.exports = class Maybe {
    static get just() {
        return Just;
    }

    static get nothing() {
        return Nothing;
    }

    static fromNullable(a) {
        return a !== null && a !== undefined ? Just.of(a) : new Nothing();
    }

    static of(a) {
        return new Just(a);
    }

    get isNothing() {
        return false;
    }

    get isJust() {
        return false;
    }
};

class Just extends Maybe {
    constructor(value) {
        super();
        this.value = value;
    }

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

    get value() {
        throw new TypeError("Can't extract the value of a Nothing.");
    }

    getOrElse(other) {
        return other;
    }

    filter() {
        return this.value;
    }

    get isNothing() {
        return true;
    }

    toString() {
        return 'Maybe.Nothing';
    }
}