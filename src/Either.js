"use strict";
var Monad = require('./Monad');

var Either = module.exports = class Either extends Monad {
    get() {
        return this.value;
    }
    static left(v) {
        return new Left(v);
    }
    static right(v) {
        return new Right(v);
    }
    static of(v){
        return v !== null && v !== undefined ? Either.right(v): Either.left(v);
    }
    isLeft() {
        return false;
    }
    isRight() {
        return false;
    }
}
class Left extends Either {

    map() {
        return this; // noop
    }
    get() {
        throw new TypeError("Can't extract the value of a Left(a).");
    }
    getOrElse(other) {
        return other; 
    }
    orElse(f) {
        return f(this.value); 
    }
    chain(f) { 
        return this; // noop
    }
    getOrElseThrow(a) { 
        throw new Error(a);
    }

    filter(f) { 
        return this; // noop
    }
    isLeft() {
        return true;
    }
    toString() {
        return `Either.Left(${this.value})`;
    }
}

class Right extends Either {
    map(f) { 
        return Either.of(f(this.value));
    }
    getOrElse(other) {
        return this.value; 
    }
    orElse() { 
        return this; //noop
    }

    chain(f) { 
        return f(this.value);
    }
    getOrElseThrow(_) { 
        return this.value;
    }
    filter(f) { 
        return Either.fromNullable(f(this.value) ? this.value : null);
    }
    isRight() {
        return true;
    }
    toString() {
        return `Either.Right(${this.value})`;
    }
}