"use strict";

module.exports = class Monad {
    constructor(value) {
        this.value = value;
    }

    value() {
        return value;
    }
};