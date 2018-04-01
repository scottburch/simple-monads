module.exports = class Future {
    constructor(promise) {
        this.promise = promise;
    }


    flatMap(f) {
        return new Future(this.promise.then(m => m.flatMap(f)));
    }

    join() {
        return this.promise;
    }
};
