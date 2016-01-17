(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["simpleMonads"] = factory();
	else
		root["simpleMonads"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    Identity: __webpack_require__(1),
	    Maybe: __webpack_require__(3),
	    Either: __webpack_require__(4),
	    IO: __webpack_require__(5)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Monad = __webpack_require__(2);

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



/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = class Monad {
	    constructor(value) {
	        this.value = value;
	    }

	    get() {
	        return value;
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Monad = __webpack_require__(2);

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

	    static lift(fn) {
	        return v => Maybe.of(v).map(fn);
	    }
	};

	class Just extends Maybe {

	    map(f) {
	        return Maybe.of(f(this.value));
	    }

	    getOrElse() {
	        return this.value;
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

	    isNothing() {
	        return true;
	    }

	    toString() {
	        return 'Maybe.Nothing';
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Monad = __webpack_require__(2);

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

	    isRight() {
	        return true;
	    }
	    toString() {
	        return `Either.Right(${this.value})`;
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isFunction = __webpack_require__(6);

	class IO {
	    constructor(effect) {
	        if (!isFunction(effect)) {
	            throw 'IO Usage: function required';
	        }
	        this.effect = effect;
	    }
	    static of(a) {
	        return new IO( () => a );
	    }
	    static from(fn) {
	        return new IO(fn);
	    }
	    map(fn) {
	        var self = this;
	        return new IO(function () {
	            return fn(self.effect());
	        });
	    }
	    chain(fn) {
	        return fn(this.effect());
	    }
	    run() {
	        return this.effect();
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(7);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ }
/******/ ])
});
;