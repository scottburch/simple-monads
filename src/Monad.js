"use strict";

module.exports = class Monad {
    constructor(value) {
        this.value = value;
    }

    join() {
        return this.value instanceof Monad ? this.value.join() : this;
    }

    flatMap(f) {
        return this.map(f).join();
    }

    get() {
        return this.value;
    }

    bind(fn) {
        return fn(this.value);
    }
};