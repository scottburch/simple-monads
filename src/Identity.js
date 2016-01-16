"use strict";
var Monad = require('./Monad');

module.exports = class Identity extends Monad {
    static of(v) {
        return new Identity(v);
    }
    map(f) {
        return Identity.of(f(this.value));
    }
    join() {
        return this.value instanceof Identity ? this.value.join() : this;
    }
    toString() {
        return `Identity (${this.value})`;
    }
};

