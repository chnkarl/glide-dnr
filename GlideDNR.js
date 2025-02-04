var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}var lodash_clonedeep = {exports: {}};/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
lodash_clonedeep.exports;

var hasRequiredLodash_clonedeep;

function requireLodash_clonedeep () {
	if (hasRequiredLodash_clonedeep) return lodash_clonedeep.exports;
	hasRequiredLodash_clonedeep = 1;
	(function (module, exports) {
		/** Used as the size to enable large array optimizations. */
		var LARGE_ARRAY_SIZE = 200;

		/** Used to stand-in for `undefined` hash values. */
		var HASH_UNDEFINED = '__lodash_hash_undefined__';

		/** Used as references for various `Number` constants. */
		var MAX_SAFE_INTEGER = 9007199254740991;

		/** `Object#toString` result references. */
		var argsTag = '[object Arguments]',
		    arrayTag = '[object Array]',
		    boolTag = '[object Boolean]',
		    dateTag = '[object Date]',
		    errorTag = '[object Error]',
		    funcTag = '[object Function]',
		    genTag = '[object GeneratorFunction]',
		    mapTag = '[object Map]',
		    numberTag = '[object Number]',
		    objectTag = '[object Object]',
		    promiseTag = '[object Promise]',
		    regexpTag = '[object RegExp]',
		    setTag = '[object Set]',
		    stringTag = '[object String]',
		    symbolTag = '[object Symbol]',
		    weakMapTag = '[object WeakMap]';

		var arrayBufferTag = '[object ArrayBuffer]',
		    dataViewTag = '[object DataView]',
		    float32Tag = '[object Float32Array]',
		    float64Tag = '[object Float64Array]',
		    int8Tag = '[object Int8Array]',
		    int16Tag = '[object Int16Array]',
		    int32Tag = '[object Int32Array]',
		    uint8Tag = '[object Uint8Array]',
		    uint8ClampedTag = '[object Uint8ClampedArray]',
		    uint16Tag = '[object Uint16Array]',
		    uint32Tag = '[object Uint32Array]';

		/**
		 * Used to match `RegExp`
		 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
		 */
		var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

		/** Used to match `RegExp` flags from their coerced string values. */
		var reFlags = /\w*$/;

		/** Used to detect host constructors (Safari). */
		var reIsHostCtor = /^\[object .+?Constructor\]$/;

		/** Used to detect unsigned integer values. */
		var reIsUint = /^(?:0|[1-9]\d*)$/;

		/** Used to identify `toStringTag` values supported by `_.clone`. */
		var cloneableTags = {};
		cloneableTags[argsTag] = cloneableTags[arrayTag] =
		cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
		cloneableTags[boolTag] = cloneableTags[dateTag] =
		cloneableTags[float32Tag] = cloneableTags[float64Tag] =
		cloneableTags[int8Tag] = cloneableTags[int16Tag] =
		cloneableTags[int32Tag] = cloneableTags[mapTag] =
		cloneableTags[numberTag] = cloneableTags[objectTag] =
		cloneableTags[regexpTag] = cloneableTags[setTag] =
		cloneableTags[stringTag] = cloneableTags[symbolTag] =
		cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
		cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
		cloneableTags[errorTag] = cloneableTags[funcTag] =
		cloneableTags[weakMapTag] = false;

		/** Detect free variable `global` from Node.js. */
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

		/** Detect free variable `self`. */
		var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

		/** Used as a reference to the global object. */
		var root = freeGlobal || freeSelf || Function('return this')();

		/** Detect free variable `exports`. */
		var freeExports = exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/**
		 * Adds the key-value `pair` to `map`.
		 *
		 * @private
		 * @param {Object} map The map to modify.
		 * @param {Array} pair The key-value pair to add.
		 * @returns {Object} Returns `map`.
		 */
		function addMapEntry(map, pair) {
		  // Don't return `map.set` because it's not chainable in IE 11.
		  map.set(pair[0], pair[1]);
		  return map;
		}

		/**
		 * Adds `value` to `set`.
		 *
		 * @private
		 * @param {Object} set The set to modify.
		 * @param {*} value The value to add.
		 * @returns {Object} Returns `set`.
		 */
		function addSetEntry(set, value) {
		  // Don't return `set.add` because it's not chainable in IE 11.
		  set.add(value);
		  return set;
		}

		/**
		 * A specialized version of `_.forEach` for arrays without support for
		 * iteratee shorthands.
		 *
		 * @private
		 * @param {Array} [array] The array to iterate over.
		 * @param {Function} iteratee The function invoked per iteration.
		 * @returns {Array} Returns `array`.
		 */
		function arrayEach(array, iteratee) {
		  var index = -1,
		      length = array ? array.length : 0;

		  while (++index < length) {
		    if (iteratee(array[index], index, array) === false) {
		      break;
		    }
		  }
		  return array;
		}

		/**
		 * Appends the elements of `values` to `array`.
		 *
		 * @private
		 * @param {Array} array The array to modify.
		 * @param {Array} values The values to append.
		 * @returns {Array} Returns `array`.
		 */
		function arrayPush(array, values) {
		  var index = -1,
		      length = values.length,
		      offset = array.length;

		  while (++index < length) {
		    array[offset + index] = values[index];
		  }
		  return array;
		}

		/**
		 * A specialized version of `_.reduce` for arrays without support for
		 * iteratee shorthands.
		 *
		 * @private
		 * @param {Array} [array] The array to iterate over.
		 * @param {Function} iteratee The function invoked per iteration.
		 * @param {*} [accumulator] The initial value.
		 * @param {boolean} [initAccum] Specify using the first element of `array` as
		 *  the initial value.
		 * @returns {*} Returns the accumulated value.
		 */
		function arrayReduce(array, iteratee, accumulator, initAccum) {
		  var index = -1,
		      length = array ? array.length : 0;
		  while (++index < length) {
		    accumulator = iteratee(accumulator, array[index], index, array);
		  }
		  return accumulator;
		}

		/**
		 * The base implementation of `_.times` without support for iteratee shorthands
		 * or max array length checks.
		 *
		 * @private
		 * @param {number} n The number of times to invoke `iteratee`.
		 * @param {Function} iteratee The function invoked per iteration.
		 * @returns {Array} Returns the array of results.
		 */
		function baseTimes(n, iteratee) {
		  var index = -1,
		      result = Array(n);

		  while (++index < n) {
		    result[index] = iteratee(index);
		  }
		  return result;
		}

		/**
		 * Gets the value at `key` of `object`.
		 *
		 * @private
		 * @param {Object} [object] The object to query.
		 * @param {string} key The key of the property to get.
		 * @returns {*} Returns the property value.
		 */
		function getValue(object, key) {
		  return object == null ? undefined : object[key];
		}

		/**
		 * Checks if `value` is a host object in IE < 9.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
		 */
		function isHostObject(value) {
		  // Many host objects are `Object` objects that can coerce to strings
		  // despite having improperly defined `toString` methods.
		  var result = false;
		  if (value != null && typeof value.toString != 'function') {
		    try {
		      result = !!(value + '');
		    } catch (e) {}
		  }
		  return result;
		}

		/**
		 * Converts `map` to its key-value pairs.
		 *
		 * @private
		 * @param {Object} map The map to convert.
		 * @returns {Array} Returns the key-value pairs.
		 */
		function mapToArray(map) {
		  var index = -1,
		      result = Array(map.size);

		  map.forEach(function(value, key) {
		    result[++index] = [key, value];
		  });
		  return result;
		}

		/**
		 * Creates a unary function that invokes `func` with its argument transformed.
		 *
		 * @private
		 * @param {Function} func The function to wrap.
		 * @param {Function} transform The argument transform.
		 * @returns {Function} Returns the new function.
		 */
		function overArg(func, transform) {
		  return function(arg) {
		    return func(transform(arg));
		  };
		}

		/**
		 * Converts `set` to an array of its values.
		 *
		 * @private
		 * @param {Object} set The set to convert.
		 * @returns {Array} Returns the values.
		 */
		function setToArray(set) {
		  var index = -1,
		      result = Array(set.size);

		  set.forEach(function(value) {
		    result[++index] = value;
		  });
		  return result;
		}

		/** Used for built-in method references. */
		var arrayProto = Array.prototype,
		    funcProto = Function.prototype,
		    objectProto = Object.prototype;

		/** Used to detect overreaching core-js shims. */
		var coreJsData = root['__core-js_shared__'];

		/** Used to detect methods masquerading as native. */
		var maskSrcKey = (function() {
		  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
		  return uid ? ('Symbol(src)_1.' + uid) : '';
		}());

		/** Used to resolve the decompiled source of functions. */
		var funcToString = funcProto.toString;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var objectToString = objectProto.toString;

		/** Used to detect if a method is native. */
		var reIsNative = RegExp('^' +
		  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
		  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
		);

		/** Built-in value references. */
		var Buffer = moduleExports ? root.Buffer : undefined,
		    Symbol = root.Symbol,
		    Uint8Array = root.Uint8Array,
		    getPrototype = overArg(Object.getPrototypeOf, Object),
		    objectCreate = Object.create,
		    propertyIsEnumerable = objectProto.propertyIsEnumerable,
		    splice = arrayProto.splice;

		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeGetSymbols = Object.getOwnPropertySymbols,
		    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
		    nativeKeys = overArg(Object.keys, Object);

		/* Built-in method references that are verified to be native. */
		var DataView = getNative(root, 'DataView'),
		    Map = getNative(root, 'Map'),
		    Promise = getNative(root, 'Promise'),
		    Set = getNative(root, 'Set'),
		    WeakMap = getNative(root, 'WeakMap'),
		    nativeCreate = getNative(Object, 'create');

		/** Used to detect maps, sets, and weakmaps. */
		var dataViewCtorString = toSource(DataView),
		    mapCtorString = toSource(Map),
		    promiseCtorString = toSource(Promise),
		    setCtorString = toSource(Set),
		    weakMapCtorString = toSource(WeakMap);

		/** Used to convert symbols to primitives and strings. */
		var symbolProto = Symbol ? Symbol.prototype : undefined,
		    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

		/**
		 * Creates a hash object.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function Hash(entries) {
		  var index = -1,
		      length = entries ? entries.length : 0;

		  this.clear();
		  while (++index < length) {
		    var entry = entries[index];
		    this.set(entry[0], entry[1]);
		  }
		}

		/**
		 * Removes all key-value entries from the hash.
		 *
		 * @private
		 * @name clear
		 * @memberOf Hash
		 */
		function hashClear() {
		  this.__data__ = nativeCreate ? nativeCreate(null) : {};
		}

		/**
		 * Removes `key` and its value from the hash.
		 *
		 * @private
		 * @name delete
		 * @memberOf Hash
		 * @param {Object} hash The hash to modify.
		 * @param {string} key The key of the value to remove.
		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		 */
		function hashDelete(key) {
		  return this.has(key) && delete this.__data__[key];
		}

		/**
		 * Gets the hash value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf Hash
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function hashGet(key) {
		  var data = this.__data__;
		  if (nativeCreate) {
		    var result = data[key];
		    return result === HASH_UNDEFINED ? undefined : result;
		  }
		  return hasOwnProperty.call(data, key) ? data[key] : undefined;
		}

		/**
		 * Checks if a hash value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf Hash
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function hashHas(key) {
		  var data = this.__data__;
		  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
		}

		/**
		 * Sets the hash `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf Hash
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the hash instance.
		 */
		function hashSet(key, value) {
		  var data = this.__data__;
		  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
		  return this;
		}

		// Add methods to `Hash`.
		Hash.prototype.clear = hashClear;
		Hash.prototype['delete'] = hashDelete;
		Hash.prototype.get = hashGet;
		Hash.prototype.has = hashHas;
		Hash.prototype.set = hashSet;

		/**
		 * Creates an list cache object.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function ListCache(entries) {
		  var index = -1,
		      length = entries ? entries.length : 0;

		  this.clear();
		  while (++index < length) {
		    var entry = entries[index];
		    this.set(entry[0], entry[1]);
		  }
		}

		/**
		 * Removes all key-value entries from the list cache.
		 *
		 * @private
		 * @name clear
		 * @memberOf ListCache
		 */
		function listCacheClear() {
		  this.__data__ = [];
		}

		/**
		 * Removes `key` and its value from the list cache.
		 *
		 * @private
		 * @name delete
		 * @memberOf ListCache
		 * @param {string} key The key of the value to remove.
		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		 */
		function listCacheDelete(key) {
		  var data = this.__data__,
		      index = assocIndexOf(data, key);

		  if (index < 0) {
		    return false;
		  }
		  var lastIndex = data.length - 1;
		  if (index == lastIndex) {
		    data.pop();
		  } else {
		    splice.call(data, index, 1);
		  }
		  return true;
		}

		/**
		 * Gets the list cache value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf ListCache
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function listCacheGet(key) {
		  var data = this.__data__,
		      index = assocIndexOf(data, key);

		  return index < 0 ? undefined : data[index][1];
		}

		/**
		 * Checks if a list cache value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf ListCache
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function listCacheHas(key) {
		  return assocIndexOf(this.__data__, key) > -1;
		}

		/**
		 * Sets the list cache `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf ListCache
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the list cache instance.
		 */
		function listCacheSet(key, value) {
		  var data = this.__data__,
		      index = assocIndexOf(data, key);

		  if (index < 0) {
		    data.push([key, value]);
		  } else {
		    data[index][1] = value;
		  }
		  return this;
		}

		// Add methods to `ListCache`.
		ListCache.prototype.clear = listCacheClear;
		ListCache.prototype['delete'] = listCacheDelete;
		ListCache.prototype.get = listCacheGet;
		ListCache.prototype.has = listCacheHas;
		ListCache.prototype.set = listCacheSet;

		/**
		 * Creates a map cache object to store key-value pairs.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function MapCache(entries) {
		  var index = -1,
		      length = entries ? entries.length : 0;

		  this.clear();
		  while (++index < length) {
		    var entry = entries[index];
		    this.set(entry[0], entry[1]);
		  }
		}

		/**
		 * Removes all key-value entries from the map.
		 *
		 * @private
		 * @name clear
		 * @memberOf MapCache
		 */
		function mapCacheClear() {
		  this.__data__ = {
		    'hash': new Hash,
		    'map': new (Map || ListCache),
		    'string': new Hash
		  };
		}

		/**
		 * Removes `key` and its value from the map.
		 *
		 * @private
		 * @name delete
		 * @memberOf MapCache
		 * @param {string} key The key of the value to remove.
		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		 */
		function mapCacheDelete(key) {
		  return getMapData(this, key)['delete'](key);
		}

		/**
		 * Gets the map value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf MapCache
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function mapCacheGet(key) {
		  return getMapData(this, key).get(key);
		}

		/**
		 * Checks if a map value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf MapCache
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function mapCacheHas(key) {
		  return getMapData(this, key).has(key);
		}

		/**
		 * Sets the map `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf MapCache
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the map cache instance.
		 */
		function mapCacheSet(key, value) {
		  getMapData(this, key).set(key, value);
		  return this;
		}

		// Add methods to `MapCache`.
		MapCache.prototype.clear = mapCacheClear;
		MapCache.prototype['delete'] = mapCacheDelete;
		MapCache.prototype.get = mapCacheGet;
		MapCache.prototype.has = mapCacheHas;
		MapCache.prototype.set = mapCacheSet;

		/**
		 * Creates a stack cache object to store key-value pairs.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function Stack(entries) {
		  this.__data__ = new ListCache(entries);
		}

		/**
		 * Removes all key-value entries from the stack.
		 *
		 * @private
		 * @name clear
		 * @memberOf Stack
		 */
		function stackClear() {
		  this.__data__ = new ListCache;
		}

		/**
		 * Removes `key` and its value from the stack.
		 *
		 * @private
		 * @name delete
		 * @memberOf Stack
		 * @param {string} key The key of the value to remove.
		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		 */
		function stackDelete(key) {
		  return this.__data__['delete'](key);
		}

		/**
		 * Gets the stack value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf Stack
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function stackGet(key) {
		  return this.__data__.get(key);
		}

		/**
		 * Checks if a stack value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf Stack
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function stackHas(key) {
		  return this.__data__.has(key);
		}

		/**
		 * Sets the stack `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf Stack
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the stack cache instance.
		 */
		function stackSet(key, value) {
		  var cache = this.__data__;
		  if (cache instanceof ListCache) {
		    var pairs = cache.__data__;
		    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
		      pairs.push([key, value]);
		      return this;
		    }
		    cache = this.__data__ = new MapCache(pairs);
		  }
		  cache.set(key, value);
		  return this;
		}

		// Add methods to `Stack`.
		Stack.prototype.clear = stackClear;
		Stack.prototype['delete'] = stackDelete;
		Stack.prototype.get = stackGet;
		Stack.prototype.has = stackHas;
		Stack.prototype.set = stackSet;

		/**
		 * Creates an array of the enumerable property names of the array-like `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @param {boolean} inherited Specify returning inherited property names.
		 * @returns {Array} Returns the array of property names.
		 */
		function arrayLikeKeys(value, inherited) {
		  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
		  // Safari 9 makes `arguments.length` enumerable in strict mode.
		  var result = (isArray(value) || isArguments(value))
		    ? baseTimes(value.length, String)
		    : [];

		  var length = result.length,
		      skipIndexes = !!length;

		  for (var key in value) {
		    if ((hasOwnProperty.call(value, key)) &&
		        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
		      result.push(key);
		    }
		  }
		  return result;
		}

		/**
		 * Assigns `value` to `key` of `object` if the existing value is not equivalent
		 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		 * for equality comparisons.
		 *
		 * @private
		 * @param {Object} object The object to modify.
		 * @param {string} key The key of the property to assign.
		 * @param {*} value The value to assign.
		 */
		function assignValue(object, key, value) {
		  var objValue = object[key];
		  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
		      (value === undefined && !(key in object))) {
		    object[key] = value;
		  }
		}

		/**
		 * Gets the index at which the `key` is found in `array` of key-value pairs.
		 *
		 * @private
		 * @param {Array} array The array to inspect.
		 * @param {*} key The key to search for.
		 * @returns {number} Returns the index of the matched value, else `-1`.
		 */
		function assocIndexOf(array, key) {
		  var length = array.length;
		  while (length--) {
		    if (eq(array[length][0], key)) {
		      return length;
		    }
		  }
		  return -1;
		}

		/**
		 * The base implementation of `_.assign` without support for multiple sources
		 * or `customizer` functions.
		 *
		 * @private
		 * @param {Object} object The destination object.
		 * @param {Object} source The source object.
		 * @returns {Object} Returns `object`.
		 */
		function baseAssign(object, source) {
		  return object && copyObject(source, keys(source), object);
		}

		/**
		 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
		 * traversed objects.
		 *
		 * @private
		 * @param {*} value The value to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @param {boolean} [isFull] Specify a clone including symbols.
		 * @param {Function} [customizer] The function to customize cloning.
		 * @param {string} [key] The key of `value`.
		 * @param {Object} [object] The parent object of `value`.
		 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
		 * @returns {*} Returns the cloned value.
		 */
		function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
		  var result;
		  if (customizer) {
		    result = object ? customizer(value, key, object, stack) : customizer(value);
		  }
		  if (result !== undefined) {
		    return result;
		  }
		  if (!isObject(value)) {
		    return value;
		  }
		  var isArr = isArray(value);
		  if (isArr) {
		    result = initCloneArray(value);
		    if (!isDeep) {
		      return copyArray(value, result);
		    }
		  } else {
		    var tag = getTag(value),
		        isFunc = tag == funcTag || tag == genTag;

		    if (isBuffer(value)) {
		      return cloneBuffer(value, isDeep);
		    }
		    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
		      if (isHostObject(value)) {
		        return object ? value : {};
		      }
		      result = initCloneObject(isFunc ? {} : value);
		      if (!isDeep) {
		        return copySymbols(value, baseAssign(result, value));
		      }
		    } else {
		      if (!cloneableTags[tag]) {
		        return object ? value : {};
		      }
		      result = initCloneByTag(value, tag, baseClone, isDeep);
		    }
		  }
		  // Check for circular references and return its corresponding clone.
		  stack || (stack = new Stack);
		  var stacked = stack.get(value);
		  if (stacked) {
		    return stacked;
		  }
		  stack.set(value, result);

		  if (!isArr) {
		    var props = isFull ? getAllKeys(value) : keys(value);
		  }
		  arrayEach(props || value, function(subValue, key) {
		    if (props) {
		      key = subValue;
		      subValue = value[key];
		    }
		    // Recursively populate clone (susceptible to call stack limits).
		    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
		  });
		  return result;
		}

		/**
		 * The base implementation of `_.create` without support for assigning
		 * properties to the created object.
		 *
		 * @private
		 * @param {Object} prototype The object to inherit from.
		 * @returns {Object} Returns the new object.
		 */
		function baseCreate(proto) {
		  return isObject(proto) ? objectCreate(proto) : {};
		}

		/**
		 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
		 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
		 * symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @param {Function} keysFunc The function to get the keys of `object`.
		 * @param {Function} symbolsFunc The function to get the symbols of `object`.
		 * @returns {Array} Returns the array of property names and symbols.
		 */
		function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		  var result = keysFunc(object);
		  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
		}

		/**
		 * The base implementation of `getTag`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {string} Returns the `toStringTag`.
		 */
		function baseGetTag(value) {
		  return objectToString.call(value);
		}

		/**
		 * The base implementation of `_.isNative` without bad shim checks.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a native function,
		 *  else `false`.
		 */
		function baseIsNative(value) {
		  if (!isObject(value) || isMasked(value)) {
		    return false;
		  }
		  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
		  return pattern.test(toSource(value));
		}

		/**
		 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 */
		function baseKeys(object) {
		  if (!isPrototype(object)) {
		    return nativeKeys(object);
		  }
		  var result = [];
		  for (var key in Object(object)) {
		    if (hasOwnProperty.call(object, key) && key != 'constructor') {
		      result.push(key);
		    }
		  }
		  return result;
		}

		/**
		 * Creates a clone of  `buffer`.
		 *
		 * @private
		 * @param {Buffer} buffer The buffer to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Buffer} Returns the cloned buffer.
		 */
		function cloneBuffer(buffer, isDeep) {
		  if (isDeep) {
		    return buffer.slice();
		  }
		  var result = new buffer.constructor(buffer.length);
		  buffer.copy(result);
		  return result;
		}

		/**
		 * Creates a clone of `arrayBuffer`.
		 *
		 * @private
		 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
		 * @returns {ArrayBuffer} Returns the cloned array buffer.
		 */
		function cloneArrayBuffer(arrayBuffer) {
		  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
		  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
		  return result;
		}

		/**
		 * Creates a clone of `dataView`.
		 *
		 * @private
		 * @param {Object} dataView The data view to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the cloned data view.
		 */
		function cloneDataView(dataView, isDeep) {
		  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
		  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
		}

		/**
		 * Creates a clone of `map`.
		 *
		 * @private
		 * @param {Object} map The map to clone.
		 * @param {Function} cloneFunc The function to clone values.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the cloned map.
		 */
		function cloneMap(map, isDeep, cloneFunc) {
		  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
		  return arrayReduce(array, addMapEntry, new map.constructor);
		}

		/**
		 * Creates a clone of `regexp`.
		 *
		 * @private
		 * @param {Object} regexp The regexp to clone.
		 * @returns {Object} Returns the cloned regexp.
		 */
		function cloneRegExp(regexp) {
		  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
		  result.lastIndex = regexp.lastIndex;
		  return result;
		}

		/**
		 * Creates a clone of `set`.
		 *
		 * @private
		 * @param {Object} set The set to clone.
		 * @param {Function} cloneFunc The function to clone values.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the cloned set.
		 */
		function cloneSet(set, isDeep, cloneFunc) {
		  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
		  return arrayReduce(array, addSetEntry, new set.constructor);
		}

		/**
		 * Creates a clone of the `symbol` object.
		 *
		 * @private
		 * @param {Object} symbol The symbol object to clone.
		 * @returns {Object} Returns the cloned symbol object.
		 */
		function cloneSymbol(symbol) {
		  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
		}

		/**
		 * Creates a clone of `typedArray`.
		 *
		 * @private
		 * @param {Object} typedArray The typed array to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the cloned typed array.
		 */
		function cloneTypedArray(typedArray, isDeep) {
		  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
		  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
		}

		/**
		 * Copies the values of `source` to `array`.
		 *
		 * @private
		 * @param {Array} source The array to copy values from.
		 * @param {Array} [array=[]] The array to copy values to.
		 * @returns {Array} Returns `array`.
		 */
		function copyArray(source, array) {
		  var index = -1,
		      length = source.length;

		  array || (array = Array(length));
		  while (++index < length) {
		    array[index] = source[index];
		  }
		  return array;
		}

		/**
		 * Copies properties of `source` to `object`.
		 *
		 * @private
		 * @param {Object} source The object to copy properties from.
		 * @param {Array} props The property identifiers to copy.
		 * @param {Object} [object={}] The object to copy properties to.
		 * @param {Function} [customizer] The function to customize copied values.
		 * @returns {Object} Returns `object`.
		 */
		function copyObject(source, props, object, customizer) {
		  object || (object = {});

		  var index = -1,
		      length = props.length;

		  while (++index < length) {
		    var key = props[index];

		    var newValue = undefined;

		    assignValue(object, key, newValue === undefined ? source[key] : newValue);
		  }
		  return object;
		}

		/**
		 * Copies own symbol properties of `source` to `object`.
		 *
		 * @private
		 * @param {Object} source The object to copy symbols from.
		 * @param {Object} [object={}] The object to copy symbols to.
		 * @returns {Object} Returns `object`.
		 */
		function copySymbols(source, object) {
		  return copyObject(source, getSymbols(source), object);
		}

		/**
		 * Creates an array of own enumerable property names and symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names and symbols.
		 */
		function getAllKeys(object) {
		  return baseGetAllKeys(object, keys, getSymbols);
		}

		/**
		 * Gets the data for `map`.
		 *
		 * @private
		 * @param {Object} map The map to query.
		 * @param {string} key The reference key.
		 * @returns {*} Returns the map data.
		 */
		function getMapData(map, key) {
		  var data = map.__data__;
		  return isKeyable(key)
		    ? data[typeof key == 'string' ? 'string' : 'hash']
		    : data.map;
		}

		/**
		 * Gets the native function at `key` of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @param {string} key The key of the method to get.
		 * @returns {*} Returns the function if it's native, else `undefined`.
		 */
		function getNative(object, key) {
		  var value = getValue(object, key);
		  return baseIsNative(value) ? value : undefined;
		}

		/**
		 * Creates an array of the own enumerable symbol properties of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of symbols.
		 */
		var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

		/**
		 * Gets the `toStringTag` of `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {string} Returns the `toStringTag`.
		 */
		var getTag = baseGetTag;

		// Fallback for data views, maps, sets, and weak maps in IE 11,
		// for data views in Edge < 14, and promises in Node.js.
		if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
		    (Map && getTag(new Map) != mapTag) ||
		    (Promise && getTag(Promise.resolve()) != promiseTag) ||
		    (Set && getTag(new Set) != setTag) ||
		    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
		  getTag = function(value) {
		    var result = objectToString.call(value),
		        Ctor = result == objectTag ? value.constructor : undefined,
		        ctorString = Ctor ? toSource(Ctor) : undefined;

		    if (ctorString) {
		      switch (ctorString) {
		        case dataViewCtorString: return dataViewTag;
		        case mapCtorString: return mapTag;
		        case promiseCtorString: return promiseTag;
		        case setCtorString: return setTag;
		        case weakMapCtorString: return weakMapTag;
		      }
		    }
		    return result;
		  };
		}

		/**
		 * Initializes an array clone.
		 *
		 * @private
		 * @param {Array} array The array to clone.
		 * @returns {Array} Returns the initialized clone.
		 */
		function initCloneArray(array) {
		  var length = array.length,
		      result = array.constructor(length);

		  // Add properties assigned by `RegExp#exec`.
		  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
		    result.index = array.index;
		    result.input = array.input;
		  }
		  return result;
		}

		/**
		 * Initializes an object clone.
		 *
		 * @private
		 * @param {Object} object The object to clone.
		 * @returns {Object} Returns the initialized clone.
		 */
		function initCloneObject(object) {
		  return (typeof object.constructor == 'function' && !isPrototype(object))
		    ? baseCreate(getPrototype(object))
		    : {};
		}

		/**
		 * Initializes an object clone based on its `toStringTag`.
		 *
		 * **Note:** This function only supports cloning values with tags of
		 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
		 *
		 * @private
		 * @param {Object} object The object to clone.
		 * @param {string} tag The `toStringTag` of the object to clone.
		 * @param {Function} cloneFunc The function to clone values.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the initialized clone.
		 */
		function initCloneByTag(object, tag, cloneFunc, isDeep) {
		  var Ctor = object.constructor;
		  switch (tag) {
		    case arrayBufferTag:
		      return cloneArrayBuffer(object);

		    case boolTag:
		    case dateTag:
		      return new Ctor(+object);

		    case dataViewTag:
		      return cloneDataView(object, isDeep);

		    case float32Tag: case float64Tag:
		    case int8Tag: case int16Tag: case int32Tag:
		    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
		      return cloneTypedArray(object, isDeep);

		    case mapTag:
		      return cloneMap(object, isDeep, cloneFunc);

		    case numberTag:
		    case stringTag:
		      return new Ctor(object);

		    case regexpTag:
		      return cloneRegExp(object);

		    case setTag:
		      return cloneSet(object, isDeep, cloneFunc);

		    case symbolTag:
		      return cloneSymbol(object);
		  }
		}

		/**
		 * Checks if `value` is a valid array-like index.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
		 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
		 */
		function isIndex(value, length) {
		  length = length == null ? MAX_SAFE_INTEGER : length;
		  return !!length &&
		    (typeof value == 'number' || reIsUint.test(value)) &&
		    (value > -1 && value % 1 == 0 && value < length);
		}

		/**
		 * Checks if `value` is suitable for use as unique object key.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
		 */
		function isKeyable(value) {
		  var type = typeof value;
		  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
		    ? (value !== '__proto__')
		    : (value === null);
		}

		/**
		 * Checks if `func` has its source masked.
		 *
		 * @private
		 * @param {Function} func The function to check.
		 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
		 */
		function isMasked(func) {
		  return !!maskSrcKey && (maskSrcKey in func);
		}

		/**
		 * Checks if `value` is likely a prototype object.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
		 */
		function isPrototype(value) {
		  var Ctor = value && value.constructor,
		      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

		  return value === proto;
		}

		/**
		 * Converts `func` to its source code.
		 *
		 * @private
		 * @param {Function} func The function to process.
		 * @returns {string} Returns the source code.
		 */
		function toSource(func) {
		  if (func != null) {
		    try {
		      return funcToString.call(func);
		    } catch (e) {}
		    try {
		      return (func + '');
		    } catch (e) {}
		  }
		  return '';
		}

		/**
		 * This method is like `_.clone` except that it recursively clones `value`.
		 *
		 * @static
		 * @memberOf _
		 * @since 1.0.0
		 * @category Lang
		 * @param {*} value The value to recursively clone.
		 * @returns {*} Returns the deep cloned value.
		 * @see _.clone
		 * @example
		 *
		 * var objects = [{ 'a': 1 }, { 'b': 2 }];
		 *
		 * var deep = _.cloneDeep(objects);
		 * console.log(deep[0] === objects[0]);
		 * // => false
		 */
		function cloneDeep(value) {
		  return baseClone(value, true, true);
		}

		/**
		 * Performs a
		 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		 * comparison between two values to determine if they are equivalent.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to compare.
		 * @param {*} other The other value to compare.
		 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		 * @example
		 *
		 * var object = { 'a': 1 };
		 * var other = { 'a': 1 };
		 *
		 * _.eq(object, object);
		 * // => true
		 *
		 * _.eq(object, other);
		 * // => false
		 *
		 * _.eq('a', 'a');
		 * // => true
		 *
		 * _.eq('a', Object('a'));
		 * // => false
		 *
		 * _.eq(NaN, NaN);
		 * // => true
		 */
		function eq(value, other) {
		  return value === other || (value !== value && other !== other);
		}

		/**
		 * Checks if `value` is likely an `arguments` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.1.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		 *  else `false`.
		 * @example
		 *
		 * _.isArguments(function() { return arguments; }());
		 * // => true
		 *
		 * _.isArguments([1, 2, 3]);
		 * // => false
		 */
		function isArguments(value) {
		  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
		  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
		    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
		}

		/**
		 * Checks if `value` is classified as an `Array` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.1.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
		 * @example
		 *
		 * _.isArray([1, 2, 3]);
		 * // => true
		 *
		 * _.isArray(document.body.children);
		 * // => false
		 *
		 * _.isArray('abc');
		 * // => false
		 *
		 * _.isArray(_.noop);
		 * // => false
		 */
		var isArray = Array.isArray;

		/**
		 * Checks if `value` is array-like. A value is considered array-like if it's
		 * not a function and has a `value.length` that's an integer greater than or
		 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		 * @example
		 *
		 * _.isArrayLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isArrayLike(document.body.children);
		 * // => true
		 *
		 * _.isArrayLike('abc');
		 * // => true
		 *
		 * _.isArrayLike(_.noop);
		 * // => false
		 */
		function isArrayLike(value) {
		  return value != null && isLength(value.length) && !isFunction(value);
		}

		/**
		 * This method is like `_.isArrayLike` except that it also checks if `value`
		 * is an object.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an array-like object,
		 *  else `false`.
		 * @example
		 *
		 * _.isArrayLikeObject([1, 2, 3]);
		 * // => true
		 *
		 * _.isArrayLikeObject(document.body.children);
		 * // => true
		 *
		 * _.isArrayLikeObject('abc');
		 * // => false
		 *
		 * _.isArrayLikeObject(_.noop);
		 * // => false
		 */
		function isArrayLikeObject(value) {
		  return isObjectLike(value) && isArrayLike(value);
		}

		/**
		 * Checks if `value` is a buffer.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.3.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
		 * @example
		 *
		 * _.isBuffer(new Buffer(2));
		 * // => true
		 *
		 * _.isBuffer(new Uint8Array(2));
		 * // => false
		 */
		var isBuffer = nativeIsBuffer || stubFalse;

		/**
		 * Checks if `value` is classified as a `Function` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.1.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
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
		  // in Safari 8-9 which returns 'object' for typed array and other constructors.
		  var tag = isObject(value) ? objectToString.call(value) : '';
		  return tag == funcTag || tag == genTag;
		}

		/**
		 * Checks if `value` is a valid array-like length.
		 *
		 * **Note:** This method is loosely based on
		 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		 * @example
		 *
		 * _.isLength(3);
		 * // => true
		 *
		 * _.isLength(Number.MIN_VALUE);
		 * // => false
		 *
		 * _.isLength(Infinity);
		 * // => false
		 *
		 * _.isLength('3');
		 * // => false
		 */
		function isLength(value) {
		  return typeof value == 'number' &&
		    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		}

		/**
		 * Checks if `value` is the
		 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
		 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		 *
		 * @static
		 * @memberOf _
		 * @since 0.1.0
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
		  var type = typeof value;
		  return !!value && (type == 'object' || type == 'function');
		}

		/**
		 * Checks if `value` is object-like. A value is object-like if it's not `null`
		 * and has a `typeof` result of "object".
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		 * @example
		 *
		 * _.isObjectLike({});
		 * // => true
		 *
		 * _.isObjectLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isObjectLike(_.noop);
		 * // => false
		 *
		 * _.isObjectLike(null);
		 * // => false
		 */
		function isObjectLike(value) {
		  return !!value && typeof value == 'object';
		}

		/**
		 * Creates an array of the own enumerable property names of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects. See the
		 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		 * for more details.
		 *
		 * @static
		 * @since 0.1.0
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.keys(new Foo);
		 * // => ['a', 'b'] (iteration order is not guaranteed)
		 *
		 * _.keys('hi');
		 * // => ['0', '1']
		 */
		function keys(object) {
		  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
		}

		/**
		 * This method returns a new empty array.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.13.0
		 * @category Util
		 * @returns {Array} Returns the new empty array.
		 * @example
		 *
		 * var arrays = _.times(2, _.stubArray);
		 *
		 * console.log(arrays);
		 * // => [[], []]
		 *
		 * console.log(arrays[0] === arrays[1]);
		 * // => false
		 */
		function stubArray() {
		  return [];
		}

		/**
		 * This method returns `false`.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.13.0
		 * @category Util
		 * @returns {boolean} Returns `false`.
		 * @example
		 *
		 * _.times(2, _.stubFalse);
		 * // => [false, false]
		 */
		function stubFalse() {
		  return false;
		}

		module.exports = cloneDeep; 
	} (lodash_clonedeep, lodash_clonedeep.exports));
	return lodash_clonedeep.exports;
}var lodash_clonedeepExports = requireLodash_clonedeep();
var _0x3ca7ba = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);const HasOwn=(_0x2fd1a1,_0x597f74)=>{if(typeof _0x2fd1a1!=='object')return ![];if(_0x2fd1a1===null||Array['isArray'](_0x2fd1a1))return ![];return Object['prototype']['hasOwnProp'+'erty']['call'](_0x2fd1a1,_0x597f74);};console['log']('Glide\x20DNR\x20'+'v1.0');const properties=['toolbar','measure','toolbar-pl'+'acement','actions'],_window=window,lineSize=0x2f*-96+-1777*0x4+-775*-15,vectorSize=-4232*0x2+-1069*-7+0x3da,colors={'primary':'#4907DA','red':'#FB2C36','redActive':'#E7110C'};let dragBeginPos={'x':-1,'y':-1};const vectorOffset=vectorSize/(0x2*-3131+-961*0x3+-3*-3049)+(0x5bd+0x124d*-1+0xc91*0x1),originSelected={'ids':[],'x':0x0,'y':0x0,'width':0x0,'height':0x0};class GlideDNR extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'isToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'toolbarPla'+'cement',{'enumerable':!![],'configurable':!![],'writable':!![],'value':'float'}),Object['defineProp'+'erty'](this,'loadingIte'+'ms',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{'general':{'total':0x0,'loaded':0x0},'image':{'total':0x0,'loaded':0x0}}}),Object['defineProp'+'erty'](this,'selected',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x3ca7ba(originSelected)}),Object['defineProp'+'erty'](this,'registered',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'requestAni'+'mation',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elSelected'+'Lines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'elSelected'+'Vectors',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'rDrags',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elAligns',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasureO'+'utline',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'measureTar'+'getId',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'latestSele'+'cted',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x3ca7ba(originSelected)}),Object['defineProp'+'erty'](this,'lastClickT'+'ime',{'enumerable':!![],'configurable':!![],'writable':!![],'value':-1}),Object['defineProp'+'erty'](this,'isInit',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseMoveT'+'ype',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'hasSelecte'+'d',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'hasMoved',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isInSelect'+'ed',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseTarge'+'t',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'thresholdH'+'orizontal',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'thresholdV'+'ertical',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'alignVecto'+'rsLinesThr'+'eshold',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0.1}),Object['defineProp'+'erty'](this,'elMeasureL'+'ines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['measure']=this['measure']['bind'](this),this['delete']=this['delete']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x4abf5f,_0x167f47,_0x3780c3){if(_0x167f47===_0x3780c3)return;switch(_0x4abf5f){case 'toolbar':_0x3780c3===''&&(this['isToolbar']=!![]);break;case 'measure':_0x3780c3===''&&(this['isMeasure']=!![]);break;case 'toolbar-pl'+'acement':this['toolbarPla'+'cement']=_0x3780c3;break;case 'actions':_0x3780c3===''&&(this['isActions']=!![]);break;}}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22c'+'ontainer\x22\x20'+'id=\x22contai'+'ner\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22main'+'\x22\x20id=\x22main'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<slot\x20c'+'lass=\x22slot'+'\x22></slot>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_align\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_drag\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22refere'+'nce-lines_'+'selected\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<!--\x20line'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20class=\x22l'+'ine\x20left\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20style=\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20'+(this['selected']['x']-lineSize/(0x1*-8237+-4*-1982+0x137))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20righ'+'t\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20style'+'=\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x20')+(this['selected']['x']+this['selected']['width']-lineSize/(-1123*-5+-1*0x344+-4777))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20top\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20style=\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'late:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x1*0x1f7+0x1*0x23df+0x12*-538))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20bott'+'om\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-8277+-1*-733+0x1d7a))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20vector\x20-'+'->\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'class=\x22vec'+'tor\x20top-le'+'ft\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20top-r'+'ight\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20st'+'yle=\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'translate:'+'\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-left\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'style=\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-right\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20style=\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20transla'+'te:\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20测距离参考线\x20和'+'\x20数字\x20-->\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22me'+'asure-line'+'s\x22>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<!--\x20'+'实线：选中项\x20-->'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22solid\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22item\x20'+'top\x22></div'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22item'+'\x20bottom\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20left\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20rig'+'ht\x22></div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'!--\x20虚线：目标项'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22das'+'hed\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20horiz'+'ontal-top\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20hor'+'izontal-bo'+'ttom\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22ite'+'m\x20vertical'+'-left\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22it'+'em\x20vertica'+'l-right\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22numb'+'er\x20number-'+'top\x22>283</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22num'+'ber\x20number'+'-bottom\x22>2'+'22</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22number\x20nu'+'mber-left\x22'+'>333</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22number\x20'+'number-rig'+'ht\x22>444</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'measure-ta'+'rget-outli'+'ne\x22></div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20')+(this['isToolbar']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar\x22>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22inner\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22grou'+'p\x20aligns\x22\x20'+'id=\x22aligns'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20hor'+'izontal-le'+'ft\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M145.39-1'+'00q-12.77\x20'+'0-21.39-8.'+'62-8.61-8.'+'61-8.61-21'+'.38v-700q0'+'-12.77\x208.6'+'1-21.38\x208.'+'62-8.62\x2021'+'.39-8.62\x201'+'2.77\x200\x2021.'+'38\x208.62\x208.'+'62\x208.61\x208.'+'62\x2021.38v7'+'00q0\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62Zm171.92'+'-193.85q-2'+'0.77\x200-35.'+'58-14.8-14'+'.8-14.81-1'+'4.8-35.58\x20'+'0-20.77\x2014'+'.8-35.58\x201'+'4.81-14.8\x20'+'35.58-14.8'+'h236.92q20'+'.77\x200\x2035.5'+'8\x2014.8\x2014.'+'8\x2014.81\x2014'+'.8\x2035.58\x200'+'\x2020.77-14.'+'8\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'317.31Zm0-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H3'+'17.31Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22toolbar'+'-item\x20hori'+'zontal-cen'+'ter\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+('ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M4'+'50-130v-16'+'3.85H310.3'+'9q-20.77\x200'+'-35.58-14.'+'8Q260-323.'+'46\x20260-344'+'.23q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450v'+'-170.78H19'+'0.39q-20.7'+'7\x200-35.58-'+'14.8Q140-5'+'95\x20140-615'+'.77q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450V'+'-830q0-12.'+'75\x208.63-21'+'.37\x208.63-8'+'.63\x2021.38-'+'8.63\x2012.76'+'\x200\x2021.37\x208'+'.63Q510-84'+'2.75\x20510-8'+'30v163.85h'+'259.61q20.'+'77\x200\x2035.58'+'\x2014.8Q820-'+'636.54\x20820'+'-615.77q0\x20'+'20.77-14.8'+'1\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'510v170.78'+'h139.61q20'+'.77\x200\x2035.5'+'8\x2014.8Q700'+'-365\x20700-3'+'44.23q0\x2020'+'.77-14.81\x20'+'35.58-14.8'+'1\x2014.8-35.'+'58\x2014.8H51'+'0V-130q0\x201'+'2.75-8.63\x20'+'21.37-8.63'+'\x208.63-21.3'+'8\x208.63-12.'+'76\x200-21.37'+'-8.63Q450-'+'117.25\x20450'+'-130Z\x22/></'+'svg>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22toolbar-'+'item\x20horiz'+'ontal-righ'+'t\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<svg\x20xmlns'+'=\x22http://w'+'ww.w3.org/'+'2000/svg\x22\x20'+'height=\x2218'+'px\x22\x20viewBo'+'x=\x220\x20-960\x20'+'960\x20960\x22\x20w'+'idth=\x2218px'+'\x22\x20fill=\x22#0'+'30713\x22><pa'+'th\x20d=\x22M814'+'.61-100q-1'+'2.77\x200-21.'+'38-8.62-8.'+'62-8.61-8.'+'62-21.38v-'+'700q0-12.7'+'7\x208.62-21.'+'38\x208.61-8.'+'62\x2021.38-8')+('.62t21.39\x20'+'8.62q8.61\x20'+'8.61\x208.61\x20'+'21.38v700q'+'0\x2012.77-8.'+'61\x2021.38-8'+'.62\x208.62-2'+'1.39\x208.62Z'+'M405.77-29'+'3.85q-20.7'+'7\x200-35.58-'+'14.8-14.8-'+'14.81-14.8'+'-35.58\x200-2'+'0.77\x2014.8-'+'35.58\x2014.8'+'1-14.8\x2035.'+'58-14.8h23'+'6.92q20.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58\x200\x2020'+'.77-14.8\x203'+'5.58-14.81'+'\x2014.8-35.5'+'8\x2014.8H405'+'.77Zm-240-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H1'+'65.77Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22divide'+'r\x22></div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-top\x22>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M344.23-1'+'10q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-488'+'.07q0-20.7'+'7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v488.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q365-110\x20'+'344.23-110'+'Zm271.54-2'+'40q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-248'+'.07q0-20.7')+('7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v248.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q636.54-3'+'50\x20615.77-'+'350ZM130-7'+'90.38q-12.'+'77\x200-21.38'+'-8.62-8.62'+'-8.61-8.62'+'-21.38t8.6'+'2-21.39q8.'+'61-8.61\x2021'+'.38-8.61h7'+'00q12.77\x200'+'\x2021.38\x208.6'+'1\x208.62\x208.6'+'2\x208.62\x2021.'+'39\x200\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62H130Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20ver'+'tical-cent'+'er\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'svg\x20xmlns='+'\x22http://ww'+'w.w3.org/2'+'000/svg\x22\x20h'+'eight=\x2218p'+'x\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218px\x22'+'\x20fill=\x22#03'+'0713\x22><pat'+'h\x20d=\x22M342.'+'31-140q-20'+'.77\x200-35.5'+'8-14.81-14'+'.81-14.81-'+'14.81-35.5'+'8V-450H130'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-51'+'0\x20130-510h'+'161.92v-25'+'9.61q0-20.'+'77\x2014.81-3'+'5.58Q321.5'+'4-820\x20342.'+'31-820q20.'+'77\x200\x2035.57'+'\x2014.81\x2014.'+'81\x2014.81\x201'+'4.81\x2035.58'+'V-510h174.'+'62v-139.61'+'q0-20.77\x201'+'4.81-35.58'+'Q596.92-70'+'0\x20617.69-7'+'00t35.58\x201'+'4.81q14.81'+'\x2014.81\x2014.'+'81\x2035.58V-'+'510H830q12'+'.75\x200\x2021.3'+'7\x208.63\x208.6'+'3\x208.63\x208.6'+'3\x2021.38\x200\x20'+'12.76-8.63'+'\x2021.37Q842'+'.75-450\x2083'+'0-450H668.'+'08v139.61q'+'0\x2020.77-14'+'.81\x2035.58Q'+'638.46-260'+'\x20617.69-26')+('0q-20.77\x200'+'-35.57-14.'+'81-14.81-1'+'4.81-14.81'+'-35.58V-45'+'0H392.69v2'+'59.61q0\x2020'+'.77-14.81\x20'+'35.58Q363.'+'08-140\x20342'+'.31-140Z\x22/'+'></svg>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22toolb'+'ar-item\x20ve'+'rtical-bot'+'tom\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-110q-12'+'.77\x200-21.3'+'8-8.62Q100'+'-127.23\x2010'+'0-140t8.62'+'-21.39Q117'+'.23-170\x2013'+'0-170h700q'+'12.77\x200\x2021'+'.38\x208.61Q8'+'60-152.77\x20'+'860-140q0\x20'+'12.77-8.62'+'\x2021.38Q842'+'.77-110\x2083'+'0-110H130Z'+'m214.23-15'+'1.54q-20.7'+'7\x200-35.58-'+'14.81-14.8'+'-14.81-14.'+'8-35.57V-8'+'00q0-20.77'+'\x2014.8-35.5'+'7\x2014.81-14'+'.81\x2035.58-'+'14.81\x2020.7'+'7\x200\x2035.58\x20'+'14.81\x2014.8'+'\x2014.8\x2014.8'+'\x2035.57v488'+'.08q0\x2020.7'+'6-14.8\x2035.'+'57-14.81\x201'+'4.81-35.58'+'\x2014.81Zm27'+'1.54\x200q-20'+'.77\x200-35.5'+'8-14.81-14'+'.8-14.81-1'+'4.8-35.57V'+'-560q0-20.'+'77\x2014.8-35'+'.57\x2014.81-'+'14.81\x2035.5'+'8-14.81\x2020'+'.77\x200\x2035.5'+'8\x2014.81\x2014'+'.8\x2014.8\x2014'+'.8\x2035.57v2'+'48.08q0\x2020'+'.76-14.8\x203'+'5.57-14.81'+'\x2014.81-35.'+'58\x2014.81Z\x22'+'/></svg>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22div'+'ider\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba')+('r-item\x20hor'+'izontal-di'+'stribute\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<sv'+'g\x20xmlns=\x22h'+'ttp://www.'+'w3.org/200'+'0/svg\x22\x20hei'+'ght=\x2218px\x22'+'\x20viewBox=\x22'+'0\x20-960\x20960'+'\x20960\x22\x20widt'+'h=\x2218px\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M129.99'+'-100q-12.7'+'6\x200-21.37-'+'8.63Q100-1'+'17.25\x20100-'+'130v-700q0'+'-12.75\x208.6'+'3-21.37\x208.'+'63-8.63\x2021'+'.38-8.63\x201'+'2.76\x200\x2021.'+'37\x208.63Q16'+'0-842.75\x201'+'60-830v700'+'q0\x2012.75-8'+'.63\x2021.37-'+'8.63\x208.63-'+'21.38\x208.63'+'Zm350.06-1'+'90q-20.82\x20'+'0-35.43-14'+'.58Q430-31'+'9.17\x20430-3'+'40v-280q0-'+'20.83\x2014.5'+'7-35.42Q45'+'9.14-670\x204'+'79.95-670q'+'20.82\x200\x2035'+'.43\x2014.58Q'+'530-640.83'+'\x20530-620v2'+'80q0\x2020.83'+'-14.57\x2035.'+'42Q500.86-'+'290\x20480.05'+'-290Zm349.'+'94\x20190q-12'+'.76\x200-21.3'+'7-8.63Q800'+'-117.25\x2080'+'0-130v-700'+'q0-12.75\x208'+'.63-21.37\x20'+'8.63-8.63\x20'+'21.38-8.63'+'\x2012.76\x200\x202'+'1.37\x208.63Q'+'860-842.75'+'\x20860-830v7'+'00q0\x2012.75'+'-8.63\x2021.3'+'7-8.63\x208.6'+'3-21.38\x208.'+'63Z\x22/></sv'+'g>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-distrib'+'ute\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-100q-12'+'.75\x200-21.3'+'7-8.63-8.6'+'3-8.63-8.6'+'3-21.38\x200-'+'12.76\x208.63'+'-21.37Q117')+('.25-160\x2013'+'0-160h700q'+'12.75\x200\x2021'+'.37\x208.63\x208'+'.63\x208.63\x208'+'.63\x2021.38\x20'+'0\x2012.76-8.'+'63\x2021.37Q8'+'42.75-100\x20'+'830-100H13'+'0Zm210-330'+'q-20.83\x200-'+'35.42-14.5'+'7Q290-459.'+'14\x20290-479'+'.95q0-20.8'+'2\x2014.58-35'+'.43Q319.17'+'-530\x20340-5'+'30h280q20.'+'83\x200\x2035.42'+'\x2014.57Q670'+'-500.86\x2067'+'0-480.05q0'+'\x2020.82-14.'+'58\x2035.43Q6'+'40.83-430\x20'+'620-430H34'+'0ZM130-800'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-86'+'0\x20130-860h'+'700q12.75\x20'+'0\x2021.37\x208.'+'63\x208.63\x208.'+'63\x208.63\x2021'+'.38\x200\x2012.7'+'6-8.63\x2021.'+'37Q842.75-'+'800\x20830-80'+'0H130Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22d'+'ivider\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22group'+'\x20measure\x22\x20'+'id=\x22measur'+'e\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'toolbar-it'+'em\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20xmln'+'s=\x22http://'+'www.w3.org'+'/2000/svg\x22'+'\x20height=\x221'+'8\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M172.31'+'-260Q142-2'+'60\x20121-281'+'q-21-21-21'+'-51.44v-29'+'5.12Q100-6'+'58\x20121-679'+'q21-21\x2051.'+'31-21h615.'+'38Q818-700'+'\x20839-679q2'+'1\x2021\x2021\x2051'+'.44v295.12'+'Q860-302\x208'+'39-281q-21'+'\x2021-51.31\x20'+'21H172.31Z'+'m0-60h615.'+'38q4.62\x200\x20'+'8.46-3.85\x20'+'3.85-3.84\x20'+'3.85-8.46v'+'-295.38q0-'+'4.62-3.85-'+'8.46-3.84-'+'3.85-8.46-'+'3.85H670v1'+'14.61q0\x2012'+'.75-8.63\x202'+'1.38-8.63\x20'+'8.62-21.38'+'\x208.62-12.7'+'6\x200-21.37-'+'8.62-8.62-'+'8.63-8.62-'+'21.38V-640'+'H510v114.6'+'1q0\x2012.75-'+'8.63\x2021.38'+'-8.63\x208.62'+'-21.38\x208.6'+'2-12.76\x200-'+'21.37-8.62'+'-8.62-8.63'+'-8.62-21.3'+'8V-640H350'+'v114.61q0\x20'+'12.75-8.63'+'\x2021.38-8.6'+'3\x208.62-21.'+'38\x208.62-12'+'.76\x200-21.3'+'7-8.62-8.6'+'2-8.63-8.6'+'2-21.38V-6'+'40H172.31q'+'-4.62\x200-8.'+'46\x203.85-3.'+'85\x203.84-3.'+'85\x208.46v29'+'5.38q0\x204.6'+'2\x203.85\x208.4'+'6\x203.84\x203.8'+'5\x208.46\x203.8'+'5ZM320-495'+'.39Zm160\x200'+'Zm160\x200ZM4'+'80-480Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20'):'')+('\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22actions\x22'+'\x20id=\x22actio'+'ns\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22act'+'ions-item\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<svg\x20x'+'mlns=\x22http'+'://www.w3.'+'org/2000/s'+'vg\x22\x20height'+'=\x2218\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'\x22><path\x20d='+'\x22M280-120q'+'-33\x200-56.5'+'-23.5T200-'+'200v-520q-'+'17\x200-28.5-'+'11.5T160-7'+'60q0-17\x2011'+'.5-28.5T20'+'0-800h160q'+'0-17\x2011.5-'+'28.5T400-8'+'40h160q17\x20'+'0\x2028.5\x2011.'+'5T600-800h'+'160q17\x200\x202'+'8.5\x2011.5T8'+'00-760q0\x201'+'7-11.5\x2028.'+'5T760-720v'+'520q0\x2033-2'+'3.5\x2056.5T6'+'80-120H280'+'Zm400-600H'+'280v520h40'+'0v-520ZM40'+'0-280q17\x200'+'\x2028.5-11.5'+'T440-320v-'+'280q0-17-1'+'1.5-28.5T4'+'00-640q-17'+'\x200-28.5\x2011'+'.5T360-600'+'v280q0\x2017\x20'+'11.5\x2028.5T'+'400-280Zm1'+'60\x200q17\x200\x20'+'28.5-11.5T'+'600-320v-2'+'80q0-17-11'+'.5-28.5T56'+'0-640q-17\x20'+'0-28.5\x2011.'+'5T520-600v'+'280q0\x2017\x201'+'1.5\x2028.5T5'+'60-280ZM28'+'0-720v520-'+'520Z\x22/></s'+'vg>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22loa'+'ding\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22i'+'nner\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20/*\x20定义旋'+'转动画\x20*/\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20@keyf'+'rames\x20rota'+'te360\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fr'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ransform:\x20'+'rotate(0de'+'g);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20to\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'form:\x20rota'+'te(360deg)'+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20:host\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x20calc(100'+'%\x20-\x201px);\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20ca'+'lc(100%\x20-\x20'+'1px);\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.co'+'ntainer\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'00%;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20positio'+'n:\x20relativ'+'e;\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.mai'+'n\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x20100%;\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20::slot'+'ted(glide-'+'dnr-item)\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20inline-'+'block;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20flex-sh'+'rink:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20user-'+'select:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'cursor:\x20au'+'to;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.al'+'ign-vector'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20col'+'or:\x20'))+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20font'+'-size:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lin'+'e-height:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20z-i'+'ndex:\x201000'+'04;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'line\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ali'+'gn-line-ve'+'rtical\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20border-'+'top:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.align-li'+'ne-horizon'+'tal\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-lef'+'t:\x20solid\x201'+'px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'reference-'+'lines_sele'+'cted\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.line\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100002;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20visibi'+'lity:\x20hidd'+'en;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20&.left,\x20&'+'.right\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20&:'+'hover\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20cu'+'rsor:\x20ew-r'+'esize;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20&::b'+'efore\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20co'+'ntent:\x20\x27\x27;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20left:\x20')+Math['floor'](lineSize/(-6350+-7699*0x1+0x36e3))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x20100%;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op,\x20&.bott'+'om\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&:hove'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20cursor'+':\x20ns-resiz'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20&::befor'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20conten'+'t:\x20\x27\x27;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lef'+'t:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x20')+Math['floor'](lineSize/(0x1733+-2399*-3+-13134))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+':\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.vector\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20display'+':\x20inline-b'+'lock;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border:\x20so'+'lid\x201px\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'#ffffff;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20z-ind'+'ex:\x20100003'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.top'+'-left,\x20&.b'+'ottom-righ'+'t\x20{\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20se-resize'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op-right,\x20'+'&.bottom-l'+'eft\x20{\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&:hov'+'er\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20nesw-re'+'size;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.re'+'ference-li'+'nes_drag\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20w'+'idth:\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x200px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20top:\x200px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20border:\x20s'+'olid\x201px\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20z-in'+'dex:\x2011;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20rgba('+'73,\x207,\x20218'+',\x20.05);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'toolbar\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20')+(this['toolbarPla'+'cement']==='float'?'inline':'block')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20posi'+'tion:\x20abso'+'lute;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'top:\x20')+(this['toolbarPla'+'cement']==='float'?-1*-9431+-8543*0x1+-888:'10px')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20')+(this['toolbarPla'+'cement']==='float'?'':'width:\x20100'+'%;')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ext-align:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20ponter-'+'events:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20z-'+'index:\x20100'+'005;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.inner\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-flex;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20gap:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'padding:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-rad'+'ius:\x208px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20tran'+'slate:\x200px'+'\x200px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20rgba(2'+'55,255,255'+',.5);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backdrop'+'-filter:\x20b'+'lur(25px);'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20box'+'-shadow:\x200'+'\x204px\x206px\x20-'+'1px\x20rgb(0\x20'+'0\x200\x20/\x200.1)'+',\x200\x202px\x204p'+'x\x20-2px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20ponter'+'-events:\x20a'+'uto;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.group\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20gap:\x204px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'align-item'+'s:\x20center;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.div'+'ider\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20wid'+'th:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20#D1D5'+'DC;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.toolba'+'r-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20in'+'line-flex;'+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20padding:\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20pointer'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20#F3'+'F4F6;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20&'+':active\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20#E5E7E'+'B;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&.acti'+'ve\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.too'+'lbar-item\x20'+'{\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20'))+colors['primary']+(';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20svg\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20#ffffff;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20.m'+'easure-lin'+'es\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0006;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.solid\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ite'+'m\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20left:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100005;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x204px\x2012'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'y;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'bottom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.b'+'ottom\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x204px'+'\x2012px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-y;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20bottom,'+'\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.l'+'eft\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'size:\x2012px'+'\x204px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-rep'+'eat:\x20repea'+'t-x;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-imag'+'e:\x20linear-'+'gradient(t'+'o\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.r'+'ight\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x2012p'+'x\x204px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-x;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.da'+'shed\x20{\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.item\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'visibility'+':\x20hidden;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20left:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0005;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.hor'+'izontal-to'+'p\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x2012px\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.horiz'+'ontal-bott'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x201px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground-s'+'ize:\x2012px\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-repe'+'at:\x20repeat'+'-x;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-image'+':\x20linear-g'+'radient(to'+'\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-left\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x201p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-size:\x20'+'4px\x2012px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-repeat:\x20r'+'epeat-y;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'image:\x20lin'+'ear-gradie'+'nt(to\x20bott'+'om,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-right\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-size:'+'\x204px\x2012px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20backgroun'+'d-repeat:\x20'+'repeat-y;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-image:\x20li'+'near-gradi'+'ent(to\x20bot'+'tom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.number'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20v'+'isibility:'+'\x20hidden;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20top:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'font-size:'+'\x2010px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20padding'+':2px\x204px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-radiu'+'s:\x204px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20color:'+'\x20#FFFFFF;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.measur'+'e-target-o'+'utline\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20visibil'+'ity:\x20hidde'+'n;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bor'+'der:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20box-'+'sizing:\x20bo'+'rder-box;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20pointer'+'-events:\x20n'+'one\x20!impor'+'tant;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'z-index:\x201'+'00006;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.actio'+'ns\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20a'+'bsolute;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20left:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.action'+'s-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20paddi'+'ng:\x204px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20translate'+':\x200px\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kdrop-filt'+'er:\x20blur(2'+'5px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20z-index:'+'\x20100004;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20line-'+'height:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20cur'+'sor:\x20point'+'er;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20svg\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&:h'+'over\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:activ'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20')+colors['redActive']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'loading\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20width:\x20'+'100%;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x2010'+'0%;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'rgba(255,2'+'55,255,.5)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'drop-filte'+'r:\x20blur(25'+'px);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20fl'+'ex;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20al'+'ign-items:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20z-index'+':\x20100007;\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20.inne'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'relative;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r:\x202px\x20sol'+'id\x20#4907DA'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-top-c'+'olor:\x20rgba'+'(0,\x200,\x200,\x20'+'0.2);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20border-r'+'ight-color'+':\x20rgba(0,\x20'+'0,\x200,\x200.2)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-botto'+'m-color:\x20r'+'gba(0,\x200,\x20'+'0,\x200.2);\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'100%;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20animati'+('on:\x20rotate'+'360\x20infini'+'te\x200.75s\x20l'+'inear;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20.s'+'lot\x20{}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20'));}['onceBindin'+'gs'](){const _0x4c361d=this['shadowRoot'];if(_0x4c361d===null)return;let _0x57c77c=_0x4c361d['querySelec'+'tor']('.main');if(_0x57c77c!==null&&_0x57c77c!==undefined){const {width:_0xe91e2c,height:_0x52e098}=_0x57c77c['getBoundin'+'gClientRec'+'t']();this['registered']['main']={'id':'main','el':_0x57c77c,'x':0x0,'y':0x0,'width':_0xe91e2c,'height':_0x52e098,'type':'main'};}this['isToolbar']&&(_0x57c77c=_0x4c361d['querySelec'+'tor']('.toolbar'),_0x57c77c!==null&&(this['elToolbar']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.aligns'),_0x57c77c!==null&&(this['elAligns']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure'),_0x57c77c!==null&&(this['elMeasure']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-t'+'arget-outl'+'ine'),_0x57c77c!==null&&(this['elMeasureO'+'utline']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.top'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['solid_t']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.bott'+'om'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['solid_b']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.left'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['solid_l']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.righ'+'t'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['solid_r']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-top'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['dashed_h_t']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-bot'+'tom'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['dashed_h_b']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-left'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['dashed_v_l']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-right'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['dashed_v_r']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-top'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['numberT']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-bottom'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['numberB']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-left'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['numberL']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-right'),_0x57c77c!==null&&(this['elMeasureL'+'ines']['numberR']=_0x57c77c)),_0x57c77c=_0x4c361d['querySelec'+'tor']('.left'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'l')&&(this['elSelected'+'Lines']['l']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.right'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'r')&&(this['elSelected'+'Lines']['r']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.top'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'t')&&(this['elSelected'+'Lines']['t']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.bottom'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'b')&&(this['elSelected'+'Lines']['b']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.top-left'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'tl')&&(this['elSelected'+'Vectors']['tl']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.top-right'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'tr')&&(this['elSelected'+'Vectors']['tr']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.bottom-le'+'ft'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'bl')&&(this['elSelected'+'Vectors']['bl']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.bottom-ri'+'ght'),_0x57c77c!==null&&!HasOwn(this['elSelected'+'Lines'],'br')&&(this['elSelected'+'Vectors']['br']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('.reference'+'-lines_dra'+'g'),_0x57c77c!==null&&this['rDrags']===null&&(this['rDrags']=_0x57c77c),_0x57c77c=_0x4c361d['querySelec'+'tor']('#actions'),_0x57c77c!==null&&(this['elActions']=_0x57c77c);}['countLoadi'+'ngItems'](){const _0x167273=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x167273===null||_0x167273===undefined)return;const _0x2b1a2a=_0x167273['assignedNo'+'des']({'flatten':![]});for(const _0x3f8c32 in _0x2b1a2a){const _0xf9f422=_0x2b1a2a[_0x3f8c32];if(_0xf9f422['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0xca813d=_0xf9f422['getAttribu'+'te']('type');_0xca813d==='image'&&this['loadingIte'+'ms']['image']['total']++,(_0xca813d===null||_0xca813d==='general')&&this['loadingIte'+'ms']['general']['total']++;}}['hideLoadin'+'g'](){if(this['loadingIte'+'ms']['general']['loaded']===this['loadingIte'+'ms']['general']['total']&&this['loadingIte'+'ms']['image']['loaded']===this['loadingIte'+'ms']['image']['total']){const _0x2d5189=this['shadowRoot']?.['querySelec'+'tor']('.loading');_0x2d5189!==null&&_0x2d5189!==undefined&&(_0x2d5189['style']['display']='none');}}['renderItem'+'s'](){const _0x1c8c44=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x1c8c44===null||_0x1c8c44===undefined)return;const _0x380e01=_0x1c8c44['assignedNo'+'des']({'flatten':![]});for(const _0x43268e in _0x380e01){const _0x36f572=_0x380e01[_0x43268e];if(_0x36f572['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x4340de=_0x36f572['getAttribu'+'te']('type');(_0x4340de===null||_0x4340de==='general')&&(this['renderItem'](_0x36f572),this['hideLoadin'+'g']());if(_0x4340de==='image'){if(_0x36f572['querySelec'+'tor']('canvas'))continue;this['renderImag'+'eItem'](_0x36f572)['then'](()=>{this['hideLoadin'+'g']();});}}}['renderItem'](_0x25e5d7){const _0x54800d=_0x25e5d7['getBoundin'+'gClientRec'+'t']();let _0x1a2c70=_0x54800d['width'],_0x402d95=_0x54800d['height'];const _0x3c9e23=_0x25e5d7['getAttribu'+'te']('left'),_0x127024=_0x25e5d7['getAttribu'+'te']('top'),_0x2ea242=_0x25e5d7['getAttribu'+'te']('width'),_0x2552a3=_0x25e5d7['getAttribu'+'te']('height');let _0x4a5486=-1*-7978+0x1a21+-3*0x1319,_0x2dfe56=0x24b2+-4009+-5385;_0x3c9e23!==null&&(_0x4a5486=_0x3c9e23);_0x127024!==null&&(_0x2dfe56=_0x127024);_0x2ea242!==null&&(_0x1a2c70=_0x2ea242);_0x2552a3!==null&&(_0x402d95=_0x2552a3);if(_0x25e5d7['style']['translate']!==''){const _0x2d9d75=window['getCompute'+'dStyle'](_0x25e5d7),_0x48e82a=this['getTransla'+'tePos'](_0x2d9d75['translate']);_0x4a5486=_0x48e82a['x'],_0x2dfe56=_0x48e82a['y'];}_0x4a5486=Math['round'](_0x4a5486),_0x2dfe56=Math['round'](_0x2dfe56),_0x1a2c70=Math['round'](_0x1a2c70),_0x402d95=Math['round'](_0x402d95),this['registered'][_0x25e5d7['id']]={'id':_0x25e5d7['id'],'el':_0x25e5d7,'x':_0x4a5486,'y':_0x2dfe56,'width':_0x1a2c70,'height':_0x402d95,'type':'general'},this['loadingIte'+'ms']['general']['loaded']++,_0x25e5d7['style']['visibility']='visible',_0x25e5d7['style']['translate']=_0x4a5486+'px\x20'+_0x2dfe56+'px',_0x25e5d7['style']['width']=_0x1a2c70+'px',_0x25e5d7['style']['height']=_0x402d95+'px';}['renderImag'+'eItem'](_0x455875){return new Promise(_0xa00e41=>{if(_0x455875['nodeType']===Node['ELEMENT_NO'+'DE']){const _0x37348e=document['createElem'+'ent']('canvas');_0x37348e['style']['cssText']='width:\x20100'+'%;\x20height:'+'\x20100%;';const _0x3929fa=_0x37348e['getContext']('2d'),_0x55d9db=_0x455875['querySelec'+'tor']('img'),_0x1d37ad=new Image();_0x1d37ad['src']=_0x55d9db['src'];const _0x2bdad2=_0x455875['getElement'+'sByTagName']('img');Array['from'](_0x2bdad2)['forEach'](_0x4d435b=>{_0x4d435b['remove']();}),_0x1d37ad['onload']=()=>{let _0x50b505=-3576+-9976+-968*-14,_0x486b85=0x2097+0xd0+-8551;const _0x1e09d0=_0x455875['getAttribu'+'te']('left'),_0x260354=_0x455875['getAttribu'+'te']('top'),_0x5cc252=_0x455875['getAttribu'+'te']('width'),_0x24cd3d=_0x455875['getAttribu'+'te']('height');_0x1e09d0!==null&&(_0x50b505=_0x1e09d0);_0x260354!==null&&(_0x486b85=_0x260354);if(_0x455875['style']['translate']!==''){const _0x415af6=window['getCompute'+'dStyle'](_0x455875),_0x26c42b=this['getTransla'+'tePos'](_0x415af6['translate']);_0x50b505=_0x26c42b['x'],_0x486b85=_0x26c42b['y'];}const _0x2edfd8=_0x1d37ad['width']/_0x1d37ad['height'];let _0x3dfb61=_0x1d37ad['width'],_0xc93972=_0x1d37ad['height'];if(_0x5cc252!==null&&_0x24cd3d!==null)_0x3dfb61=_0x5cc252,_0xc93972=_0x3dfb61/_0x2edfd8,_0x455875['style']['width']=Math['round'](_0x3dfb61)+'px',_0x455875['style']['height']=Math['round'](_0xc93972)+'px';else {if(_0x5cc252!==null&&_0x24cd3d===null)_0x3dfb61=_0x5cc252,_0xc93972=_0x3dfb61/_0x2edfd8,_0x455875['style']['width']=Math['round'](_0x3dfb61)+'px',_0x455875['style']['height']=Math['round'](_0xc93972)+'px';else _0x5cc252===null&&_0x24cd3d!==null?(_0xc93972=_0x24cd3d,_0x3dfb61=_0xc93972*_0x2edfd8,_0x455875['style']['width']=Math['round'](_0x3dfb61)+'px',_0x455875['style']['height']=Math['round'](_0xc93972)+'px'):(_0x455875['style']['width']=Math['round'](_0x3dfb61)+'px',_0x455875['style']['height']=Math['round'](_0xc93972)+'px');}_0x50b505=Math['round'](_0x50b505),_0x486b85=Math['round'](_0x486b85),_0x3dfb61=Math['round'](_0x3dfb61),_0xc93972=Math['round'](_0xc93972),this['registered'][_0x455875['id']]={'id':_0x455875['id'],'el':_0x455875,'x':_0x50b505,'y':_0x486b85,'width':_0x3dfb61,'height':_0xc93972,'type':'image'};const _0x131254=Math['min'](window['innerWidth']/_0x1d37ad['width'],window['innerHeigh'+'t']/_0x1d37ad['height']),_0x426dce=Math['round'](_0x1d37ad['width']*_0x131254),_0x2001f6=Math['round'](_0x1d37ad['height']*_0x131254);_0x37348e['width']=_0x426dce,_0x37348e['height']=_0x2001f6,_0x3929fa?.['drawImage'](_0x1d37ad,0x598+0x16*0x13+-1850,-48*0xba+-1013+0x26d5,_0x426dce,_0x2001f6),_0x455875['appendChil'+'d'](_0x37348e),this['selected']['ids']['length']>-24*-89+-4232+0x830&&(this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()),this['loadingIte'+'ms']['image']['loaded']++,_0x455875['style']['visibility']='visible',_0x455875['style']['translate']=_0x50b505+'px\x20'+_0x486b85+'px',_0x455875['style']['width']=_0x3dfb61+'px',_0x455875['style']['height']=_0xc93972+'px',_0xa00e41('');};}});}['initKeyboa'+'rdEvents'](){document['addEventLi'+'stener']('keydown',_0x160c34=>{switch(_0x160c34['keyCode']){case 0xa1e+-6358+0xedd:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x344ea1 of this['selected']['ids']){this['registered'][_0x344ea1]['x']--,this['registered'][_0x344ea1]['el']['style']['translate']=this['registered'][_0x344ea1]['x']+'px\x20'+this['registered'][_0x344ea1]['y']+'px';}this['selected']['x']--;}break;case  -1*0x20e1+-4280+0x31bf:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0xd4baaf of this['selected']['ids']){this['registered'][_0xd4baaf]['y']--,this['registered'][_0xd4baaf]['el']['style']['translate']=this['registered'][_0xd4baaf]['x']+'px\x20'+this['registered'][_0xd4baaf]['y']+'px';}this['selected']['y']--;}break;case  -1*-1231+0x1a2+-7*0xe6:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x4e8ce6 of this['selected']['ids']){this['registered'][_0x4e8ce6]['x']++,this['registered'][_0x4e8ce6]['el']['style']['translate']=this['registered'][_0x4e8ce6]['x']+'px\x20'+this['registered'][_0x4e8ce6]['y']+'px';}this['selected']['x']++;}break;case  -2934+-45*0x9e+0x2764:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x33ad58 of this['selected']['ids']){this['registered'][_0x33ad58]['y']++,this['registered'][_0x33ad58]['el']['style']['translate']=this['registered'][_0x33ad58]['x']+'px\x20'+this['registered'][_0x33ad58]['y']+'px';}this['selected']['y']++;}break;}this['renderSele'+'ctedRefere'+'nce'](),this['measureExe'+'cute'](),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position']();});}['onSlotChan'+'ge'](){const _0x538fa8=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x538fa8===null||_0x538fa8===undefined)return;_0x538fa8?.['addEventLi'+'stener']('slotchange',()=>{this['countLoadi'+'ngItems'](),this['renderItem'+'s'](),!this['isInit']&&(this['onceBindin'+'gs'](),this['isInit']=!![]);});}['getSelecte'+'dParams'](){let _0x153e2c={'x':0x0,'y':0x0},_0x27fcb9={'x':0x0,'y':0x0};for(let _0x159c77=0x1cd4+-72*0x66+-36;_0x159c77<this['selected']['ids']['length'];_0x159c77++){const _0x3fc30b=this['selected']['ids'][_0x159c77];if(_0x159c77===0x1721+-2997+0xb6c*-1)_0x153e2c={'x':this['registered'][_0x3fc30b]['x'],'y':this['registered'][_0x3fc30b]['y']},_0x27fcb9={'x':this['registered'][_0x3fc30b]['x']+this['registered'][_0x3fc30b]['width'],'y':this['registered'][_0x3fc30b]['y']+this['registered'][_0x3fc30b]['height']};else {const _0x34e90b=this['registered'][_0x3fc30b]['x'],_0x206f64=this['registered'][_0x3fc30b]['y'];_0x153e2c={'x':_0x34e90b<_0x153e2c['x']?_0x34e90b:_0x153e2c['x'],'y':_0x206f64<_0x153e2c['y']?_0x206f64:_0x153e2c['y']};const _0x3a95f7=this['registered'][_0x3fc30b]['x']+this['registered'][_0x3fc30b]['width'],_0x36c023=this['registered'][_0x3fc30b]['y']+this['registered'][_0x3fc30b]['height'];_0x27fcb9={'x':_0x3a95f7>=_0x27fcb9['x']?_0x3a95f7:_0x27fcb9['x'],'y':_0x36c023>=_0x27fcb9['y']?_0x36c023:_0x27fcb9['y']};}}const _0x4e02a9=_0x27fcb9['x']-_0x153e2c['x'],_0x54c379=_0x27fcb9['y']-_0x153e2c['y'];this['selected']={...this['selected'],...{'x':_0x153e2c['x'],'y':_0x153e2c['y'],'width':_0x4e02a9,'height':_0x54c379}};}['renderSele'+'ctedRefere'+'nce'](){this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(0x8c7*-1+-1169+0xd5a)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['l']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(-5530+0xb*-709+-13331*-1)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-7572+-7640+0x3b6e))+'px',this['elSelected'+'Lines']['t']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x65*0x13+-3696+-3*-593))+'px',this['elSelected'+'Lines']['b']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';}['isSelected'+'Item'](_0x55e21d,_0x58b770){const _0x3e1975=[{'x':_0x55e21d['x'],'y':_0x55e21d['y']},{'x':_0x55e21d['x']+_0x55e21d['width'],'y':_0x55e21d['y']},{'x':_0x55e21d['x'],'y':_0x55e21d['y']+_0x55e21d['height']},{'x':_0x55e21d['x']+_0x55e21d['width'],'y':_0x55e21d['y']+_0x55e21d['height']}];for(let _0xb744fd=0x22e8+-1308+0x1*-7628;_0xb744fd<_0x3e1975['length'];_0xb744fd++){const _0x555784=_0x3e1975[_0xb744fd];if(this['isPointInR'+'ectangle'](_0x555784,_0x58b770))return !![];}return ![];}['renderDrag'+'SelectRefe'+'renceLine'](_0x557ab8,_0x24bfd2){const _0x3ce9fe=this['shadowRoot'];if(_0x3ce9fe===null)return;const _0x5c5e2d=_window['getCompute'+'dStyle'](this['rDrags']);_0x5c5e2d['visibility']!=='visible'&&(this['rDrags']['style']['visibility']='visible');dragBeginPos['x']===-1&&(dragBeginPos['x']=_0x557ab8['clientX'],dragBeginPos['y']=_0x557ab8['clientY']);const _0x459b76={'x':dragBeginPos['x'],'y':dragBeginPos['y']},_0x26abea={'x':-1,'y':-1,'width':0x0,'height':0x0};_0x557ab8['clientX']>_0x459b76['x']?(_0x26abea['x']=_0x459b76['x']-_0x24bfd2['x'],_0x26abea['width']=_0x557ab8['clientX']-_0x459b76['x']):(_0x26abea['x']=_0x557ab8['clientX']-_0x24bfd2['x'],_0x26abea['width']=_0x459b76['x']-_0x557ab8['clientX']);_0x557ab8['clientY']>_0x459b76['y']?(_0x26abea['y']=_0x459b76['y']-_0x24bfd2['y'],_0x26abea['height']=_0x557ab8['clientY']-_0x459b76['y']):(_0x26abea['y']=_0x557ab8['clientY']-_0x24bfd2['y'],_0x26abea['height']=_0x459b76['y']-_0x557ab8['clientY']);this['rDrags']['style']['translate']=_0x26abea['x']+'px\x20'+_0x26abea['y']+'px',this['rDrags']['style']['width']=_0x26abea['width']+'px',this['rDrags']['style']['height']=_0x26abea['height']+'px';const _0x658f5a=_0x3ce9fe['querySelec'+'tor']('slot');if(_0x658f5a===null)return;const _0x47d1c2=Object['values'](_0x3ca7ba(this['registered']));for(let _0x317bdc=-10*-560+-315*-25+-2695*0x5;_0x317bdc<_0x47d1c2['length'];_0x317bdc++){if(this['isSelected'+'Item'](_0x47d1c2[_0x317bdc],_0x26abea))this['selected']['ids']['indexOf'](_0x47d1c2[_0x317bdc]['id'])===-1&&this['selected']['ids']['push'](_0x47d1c2[_0x317bdc]['id']);else {const _0x4d66d7=this['selected']['ids']['indexOf'](_0x47d1c2[_0x317bdc]['id']);_0x4d66d7!==-1&&this['selected']['ids']['splice'](_0x4d66d7,0x1*0xf97+-8055+0xfe1);}}this['selected']['ids']['length']>0xd93+0x25b1*-1+0x181e?this['triggerSel'+'ectedLines'+'Vectors']('show'):this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x366f32=this['selected']['ids']['map'](_0xb4a434=>{return {'id':_0xb4a434,'type':this['registered'][_0xb4a434]['type']};}),_0x573a7b=new CustomEvent('onSelect',{'detail':_0x366f32});this['dispatchEv'+'ent'](_0x573a7b),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['isPointInR'+'ectangle'](_0xb042cf,_0x5e2326){if(_0xb042cf['x']>_0x5e2326['x']&&_0xb042cf['x']<_0x5e2326['x']+_0x5e2326['width']&&_0xb042cf['y']>_0x5e2326['y']&&_0xb042cf['y']<_0x5e2326['y']+_0x5e2326['height'])return !![];return ![];}['handleClic'+'k'](){const _0x5c3f02=this['shadowRoot'];if(_0x5c3f02===null)return;_0x5c3f02['addEventLi'+'stener']('mousedown',_0xcc2954=>{_0xcc2954['preventDef'+'ault']();const _0x18d8d0=this['shadowRoot'];if(_0x18d8d0===null)return;this['hasMoved']=![],this['hasSelecte'+'d']=![],this['latestSele'+'cted']=_0x3ca7ba(this['selected']);const _0x26be57=this['getBoundin'+'gClientRec'+'t'](),_0x458929={'x':_0xcc2954['clientX']-_0x26be57['x'],'y':_0xcc2954['clientY']-_0x26be57['y']},_0x4bf396=_0xcc2954['target']['closest']('glide-dnr-'+'item');let _0xa08969='';this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0x3*-197+-1361+0x7a0,this['elMeasureO'+'utline']['style']['height']=0x24ac+-4307+0x1*-5081,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');this['isActions']&&(this['elActions']['style']['visibility']='hidden',this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['removeEven'+'tListener']('click',this['delete']));if(_0x4bf396)this['mouseTarge'+'t']='elements',this['mouseDownE'+'lement'](_0x4bf396);else {if(_0xcc2954['target']['closest']('.line')){this['mouseTarge'+'t']='line';if(_0xcc2954['target']['classList']['contains']('left'))_0xa08969='l';else {if(_0xcc2954['target']['classList']['contains']('right'))_0xa08969='r';else {if(_0xcc2954['target']['classList']['contains']('top'))_0xa08969='t';else _0xcc2954['target']['classList']['contains']('bottom')&&(_0xa08969='b');}}}else {if(_0xcc2954['target']['closest']('.vector')){this['mouseTarge'+'t']='vector';if(_0xcc2954['target']['classList']['contains']('top-left'))_0xa08969='tl';else {if(_0xcc2954['target']['classList']['contains']('top-right'))_0xa08969='tr';else {if(_0xcc2954['target']['classList']['contains']('bottom-lef'+'t'))_0xa08969='bl';else _0xcc2954['target']['classList']['contains']('bottom-rig'+'ht')&&(_0xa08969='br');}}}else {if(_0xcc2954['target']['closest']('.actions-i'+'tem'))this['triggerAct'+'ions']();else {if(_0xcc2954['target']['closest']('.toolbar-i'+'tem'))_0xcc2954['target']['closest']('.horizonta'+'l-left')&&this['shortcuts']('horizontal','begin'),_0xcc2954['target']['closest']('.horizonta'+'l-center')&&this['shortcuts']('horizontal','middle'),_0xcc2954['target']['closest']('.horizonta'+'l-right')&&this['shortcuts']('horizontal','end'),_0xcc2954['target']['closest']('.horizonta'+'l-distribu'+'te')&&this['shortcuts']('horizontal','distribute'),_0xcc2954['target']['closest']('.vertical-'+'top')&&this['shortcuts']('vertical','begin'),_0xcc2954['target']['closest']('.vertical-'+'center')&&this['shortcuts']('vertical','middle'),_0xcc2954['target']['closest']('.vertical-'+'bottom')&&this['shortcuts']('vertical','end'),_0xcc2954['target']['closest']('.vertical-'+'distribute')&&this['shortcuts']('vertical','distribute'),_0xcc2954['target']['closest']('.measure')&&this['shortcuts']('','measure');else _0x26be57&&(this['mouseTarge'+'t']='elements',this['isInSelect'+'ed']=this['isPointInR'+'ectangle'](_0x458929,this['selected']),!this['isInSelect'+'ed']&&(this['selected']=_0x3ca7ba(originSelected),this['renderSele'+'ctedRefere'+'nce']()));}}}}this['selected']['ids']['length']>-1863+0x1*0x210d+-2*0xce3&&(this['hasSelecte'+'d']=!![]);const _0x44e90c={'x':Math['round'](_0xcc2954['clientX']-this['selected']['x']),'y':Math['round'](_0xcc2954['clientY']-this['selected']['y'])},_0x31abe7={'x':Math['round'](_0xcc2954['clientX']),'y':Math['round'](_0xcc2954['clientY'])},_0x2225d2=_0x3ca7ba(this['selected']),_0x8a173b=_0x3ca7ba(this['registered']),_0x5dfbba=_0x2225d2['width']/_0x2225d2['height'];document['onmousemov'+'e']=_0x283ce0=>{_0x283ce0['preventDef'+'ault'](),_0x283ce0['stopPropag'+'ation'](),this['mouseMoveT'+'ype']='main',this['hasMoved']=!![],this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['requestAni'+'mation']=requestAnimationFrame(()=>{this['isToolbar']&&(this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));const _0x1fa857={'x':Math['round'](_0x283ce0['clientX']),'y':Math['round'](_0x283ce0['clientY'])};switch(this['mouseTarge'+'t']){case 'elements':this['hasSelecte'+'d']&&this['isInSelect'+'ed']?(this['moveElemen'+'ts']({'x':Math['round'](_0x283ce0['clientX']),'y':Math['round'](_0x283ce0['clientY'])},_0x44e90c,_0x8a173b),this['referenceA'+'lignLinesV'+'ectors'](_0x8a173b,_0x2225d2)):this['renderDrag'+'SelectRefe'+'renceLine'](_0x283ce0,_0x26be57);break;case 'line':this['moveLines'](_0xa08969,_0x8a173b,_0x2225d2,_0x31abe7,_0x1fa857);break;case 'vector':this['moveVector'+'s'](_0xa08969,_0x8a173b,_0x2225d2,_0x31abe7,_0x1fa857,_0x5dfbba);break;}});},document['onmouseup']=()=>{document['onmousemov'+'e']=null,document['onmouseup']=null,this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['mouseUpEle'+'ment'](_0x8a173b);};});}['getTransla'+'tePos'](_0x1be27c){let _0x5471e4=-1,_0x1591ee=-1;if(_0x1be27c!=='none'){if(_0x1be27c['indexOf']('\x20')>-1){const _0x1f8ab5=_0x1be27c['split']('\x20');_0x5471e4=parseFloat(_0x1f8ab5[0xa8f+-7661+0x135e]['replace']('px','')),_0x1591ee=parseFloat(_0x1f8ab5[-4866+-3*0x72f+0x3b0*0xb]['replace']('px',''));}else _0x5471e4=parseFloat(_0x1be27c['replace']('px',''));}return {'x':_0x5471e4,'y':_0x1591ee};}['mouseDownE'+'lement'](_0x18b550){if(this['selected']['ids']['indexOf'](_0x18b550['id'])===-1){this['selected']['ids']=[_0x18b550['id']];const _0x1cd0ff=this['selected']['ids']['map'](_0x4cb296=>{return {'id':_0x4cb296,'type':this['registered'][_0x4cb296]['type']};}),_0x58c57f=new CustomEvent('onSelect',{'detail':_0x1cd0ff});this['dispatchEv'+'ent'](_0x58c57f),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}this['isInSelect'+'ed']=!![];if(this['lastClickT'+'ime']===-1)this['lastClickT'+'ime']=new Date()['getTime']();else {const _0x206543=new Date()['getTime']()-this['lastClickT'+'ime'];if(_0x206543>-3487*0x1+-8182*0x1+-36*-329)this['lastClickT'+'ime']=new Date()['getTime']();else {this['lastClickT'+'ime']=-1;if(this['selected']['ids']['indexOf'](_0x18b550['id'])>-1){this['selected']['ids']=[_0x18b550['id']];const _0x18256a=this['selected']['ids']['map'](_0x36ef9d=>{return {'id':_0x36ef9d,'type':this['registered'][_0x36ef9d]['type']};}),_0xf8427d=new CustomEvent('onSelect',{'detail':_0x18256a});this['dispatchEv'+'ent'](_0xf8427d),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}}}}['mouseUpEle'+'ment'](_0x14e651){if(this['hasMoved']){this['lastClickT'+'ime']=-1,dragBeginPos={'x':-1,'y':-1},this['rDrags']['style']['visibility']='hidden',this['rDrags']['style']['translate']='-1px\x20-1px',this['rDrags']['style']['width']='0',this['rDrags']['style']['height']='0';if(this['mouseTarge'+'t']==='elements')for(let _0x3fb523 of this['selected']['ids']){this['registered'][_0x3fb523]['x']=_0x14e651[_0x3fb523]['x'],this['registered'][_0x3fb523]['y']=_0x14e651[_0x3fb523]['y'];}(this['mouseTarge'+'t']==='line'||this['mouseTarge'+'t']==='vector')&&(this['registered']=_0x3ca7ba(_0x14e651),this['getSelecte'+'dParams']());const _0x498743=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor');_0x498743!==undefined&&_0x498743['forEach'](_0x920496=>{_0x920496['remove']();});const _0x49c822=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e');_0x49c822!==undefined&&_0x49c822['forEach'](_0x587c1b=>{_0x587c1b['remove']();});}if(this['selected']['ids']['length']>0x13dd+-159+-4926)this['isToolbar']&&!(this['selected']['ids']['length']===0xc5d+-9343*-1+-12507*0x1&&!this['isMeasure'])&&(this['selected']['ids']['length']>-10*0x2d+0x16fc+-1811*0x3?this['elAligns']['style']['display']!=='inline-fle'+'x'&&(this['elAligns']['style']['display']='inline-fle'+'x'):this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='inline-fle'+'x'&&(this['elMeasure']['style']['display']='inline-fle'+'x')),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position'](),this['elToolbar']['style']['visibility']!=='visible'&&(this['elToolbar']['style']['visibility']='visible')),this['triggerSel'+'ectedLines'+'Vectors']('show');else {this['isToolbar']&&!(this['selected']['ids']['length']===-7634+0x8*0x165+0x12ab&&!this['isMeasure'])&&(this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='none'&&(this['elMeasure']['style']['display']='none')),this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x297786=new CustomEvent('onSelect',{'detail':[]});this['dispatchEv'+'ent'](_0x297786);}this['mouseMoveT'+'ype']='',this['isActions']&&this['triggerAct'+'ions']();}['setToolbar'+'Position'](){const _0x5981cd=window['getCompute'+'dStyle'](this['elToolbar']),_0x31f61f=parseFloat(_0x5981cd['width']['replace']('px',''));this['elToolbar']['style']['translate']=this['selected']['x']+this['selected']['width']/(0x13*0x1d3+-3010+-5861)-_0x31f61f/(-11*0x16f+-41*0x2f+-2*-2983)+'px\x20'+(this['selected']['y']-(0x32d+0xf80+0x1*-4739))+'px';}['triggerAct'+'ions'](){this['selected']['ids']['length']>0x58b+-3*0x2c5+0x2c4?(this['elActions']['style']['translate']=this['selected']['x']+this['selected']['width']+(0x204d+0x1*0x219b+-16866)+'px\x20'+this['selected']['y']+'px',this['elActions']['style']['visibility']='visible',this['elActions']['style']['pointerEve'+'nts']='auto',this['elActions']['addEventLi'+'stener']('click',this['delete'])):(this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['style']['visibility']='hidden',this['elActions']['removeEven'+'tListener']('click',this['delete']));}['moveElemen'+'ts'](_0x3d7dc6,_0x21097a,_0x10dfdd){const _0x539aef=_0x3d7dc6['x']-_0x21097a['x'],_0x577c59=_0x3d7dc6['y']-_0x21097a['y'],_0x4aff8a=_0x539aef+this['selected']['width'],_0x5e9fc5=_0x577c59+this['selected']['height'],_0x336ad4=this['registered']['main']['x']+this['registered']['main']['width'],_0x50d347=this['registered']['main']['x']+this['registered']['main']['height'];this['selected']['x']=_0x539aef,this['selected']['y']=_0x577c59;_0x539aef<=0x210b+0x8df+-10730&&(this['selected']['x']=0x350+-653*-5+-4113);_0x4aff8a>=_0x336ad4&&(this['selected']['x']=_0x336ad4-this['selected']['width']);_0x577c59<=-1505*-6+0xd9a+-136*0x5c&&(this['selected']['y']=-90*0x26+-9609+0x10f7*0x3);_0x5e9fc5>=_0x50d347&&(this['selected']['y']=_0x50d347-this['selected']['height']);this['triggerSel'+'ectedLines'+'Vectors']('hide'),this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(0xf82+-7919+0xf6f)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x1d*-172+-39*0xbc+0x3022)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x2dc+-7631+0x1af5))+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x2*-2127+-1463*0x3+-455*-19))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';for(let _0x1a1262 of this['selected']['ids']){this['selected']['ids']['length']===-7354+0x97*0x35+-12*0x36?(_0x10dfdd[_0x1a1262]['x']=this['selected']['x'],_0x10dfdd[_0x1a1262]['y']=this['selected']['y']):(_0x10dfdd[_0x1a1262]['x']=this['registered'][_0x1a1262]['x']-this['latestSele'+'cted']['x']+this['selected']['x'],_0x10dfdd[_0x1a1262]['y']=this['registered'][_0x1a1262]['y']-this['latestSele'+'cted']['y']+this['selected']['y']);_0x10dfdd[_0x1a1262]['el']['style']['translate']=_0x10dfdd[_0x1a1262]['x']+'px\x20'+_0x10dfdd[_0x1a1262]['y']+'px';const _0x54efe8=new CustomEvent('onChange',{'detail':{'id':_0x1a1262,'type':'move','x':_0x10dfdd[_0x1a1262]['x'],'y':_0x10dfdd[_0x1a1262]['y'],'width':_0x10dfdd[_0x1a1262]['width'],'height':_0x10dfdd[_0x1a1262]['height']}});this['dispatchEv'+'ent'](_0x54efe8);}}['moveLines'](_0x357e48,_0x1a5770,_0x46474c,_0x28eb91,_0x444c04){let _0x13fbf9=-17*-487+0x26ac+-49*0x173,_0x4cf549=-2*0xd8e+0x1*0x1a35+0xe7,_0x2142de=-4905+0x221+0xda*0x14,_0x440d80=-866+-9972+0x2a56;_0x4cf549=_0x444c04['y']-(_0x444c04['y']-_0x46474c['y']);const _0x76a825=_0x444c04['x']-_0x28eb91['x'],_0x25c9fe=_0x444c04['y']-_0x28eb91['y'],_0x398ab1=_0x76a825/_0x46474c['width'],_0x2ab809=_0x25c9fe/_0x46474c['height'];switch(_0x357e48){case 'l':_0x13fbf9=_0x46474c['x']+_0x76a825,_0x2142de=_0x46474c['x']-_0x13fbf9+_0x46474c['width'],this['elSelected'+'Lines']['l']['style']['translate']=_0x13fbf9-(-7815+-331+-194*-42+0.5)+'px\x20'+_0x4cf549+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x2142de+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x13fbf9-(-21*0xa6+-2952+-7*-920+0.5)+'px\x20'+(_0x4cf549-(-3511+0x1*-8023+0x2d10+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x2142de+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x13fbf9-(-114*-19+0x91e+-4498+0.5)+'px\x20'+(_0x4cf549+_0x46474c['height']-(0x134b*0x1+0x3b*0x2a+-7415+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x13fbf9-(0x1a3c+0x1cd1+-14089)+'px\x20'+(_0x4cf549-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x13fbf9-(0x2c5*-4+0x7df+0x339)+'px\x20'+(_0x4cf549+_0x46474c['height']-vectorOffset)+'px';for(const _0x19fbdf of _0x46474c['ids']){const _0x148a39=this['registered'][_0x19fbdf],_0x9d7f0c=_0x148a39['width']*(-7124+0x655+0x1580-_0x398ab1),_0x4ecb79=_0x148a39['x']+_0x76a825*(0x1468+-8399+-3176*-1-(_0x148a39['x']-_0x46474c['x'])/_0x46474c['width']);_0x1a5770[_0x19fbdf]['x']=_0x4ecb79,_0x1a5770[_0x19fbdf]['width']=_0x9d7f0c,_0x148a39['el']['style']['width']=_0x9d7f0c+'px',_0x148a39['el']['style']['translate']=_0x4ecb79+'px\x20'+_0x148a39['y']+'px';const _0x15340c=new CustomEvent('onChange',{'detail':{'id':_0x19fbdf,'type':'scale-left','x':_0x1a5770[_0x19fbdf]['x'],'y':_0x1a5770[_0x19fbdf]['y'],'width':_0x1a5770[_0x19fbdf]['width'],'height':_0x1a5770[_0x19fbdf]['height']}});this['dispatchEv'+'ent'](_0x15340c);}break;case 'r':_0x13fbf9=_0x46474c['x']+_0x46474c['width'];_0x13fbf9<=_0x46474c['x']&&(_0x13fbf9=_0x46474c['x']);_0x2142de=_0x46474c['width']+_0x76a825;_0x2142de<0x1c06+-5*0x537+0x1*-499&&(_0x2142de=0x199d+-3717+-2840);requestAnimationFrame(()=>{this['elSelected'+'Lines']['r']['style']['translate']=_0x46474c['x']+_0x46474c['width']+_0x76a825-(0x1068+0x43*0x7d+0x7f*-99+0.5)+'px\x20'+_0x4cf549+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x46474c['x']-(0x38b*-1+-1*-1588+-679+0.5)+'px\x20'+(_0x4cf549-(-2*0x49e+-6827*0x1+0x23e9+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x2142de+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x46474c['x']-(-8308+-1900+0x27e2+0.5)+'px\x20'+(_0x46474c['y']+_0x46474c['height']-(-2320+0x12*0xdf+-1692+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x2142de+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x46474c['x']+_0x46474c['width']+_0x76a825-(0x22a7+-2193*0x2+-9*0x1f2+0.5)+'px\x20'+(_0x46474c['y']-(0x5f*0x4d+-1135+0x3*-2059+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x46474c['x']+_0x46474c['width']+_0x76a825-(0x1*0x17ff+-3*0x79f+-287+0.5)+'px\x20'+(_0x46474c['y']+_0x46474c['height']-(0x2*-3541+-27*-117+-2*-1963+0.5))+'px';for(const _0x11a4f4 of _0x46474c['ids']){const _0x15c16f=this['registered'][_0x11a4f4],_0x29aef8=_0x15c16f['width']*(-5129+-8467+0x351d+_0x398ab1);_0x15c16f['el']['style']['width']!==_0x29aef8+'px'&&(_0x15c16f['el']['style']['width']=_0x29aef8+'px',_0x1a5770[_0x11a4f4]['width']=_0x29aef8);const _0x18e62e=new CustomEvent('onChange',{'detail':{'id':_0x11a4f4,'type':'scale-righ'+'t','x':_0x1a5770[_0x11a4f4]['x'],'y':_0x1a5770[_0x11a4f4]['y'],'width':_0x1a5770[_0x11a4f4]['width'],'height':_0x1a5770[_0x11a4f4]['height']}});this['dispatchEv'+'ent'](_0x18e62e);}});break;case 't':_0x13fbf9=_0x46474c['x'],_0x4cf549=_0x46474c['y']+_0x25c9fe;let _0x18a13d=_0x46474c['height']-_0x25c9fe;_0x4cf549>=_0x46474c['y']+_0x46474c['height']&&(_0x4cf549=_0x46474c['y']+_0x46474c['height']);_0x440d80<=-7*0x244+-1759+0xfd*0x17&&(_0x440d80=0x323*0x9+-149*-59+-16018);this['elSelected'+'Lines']['t']['style']['translate']=_0x13fbf9-(0x1dcf+0x724*-4+-317+0.5)+'px\x20'+(_0x4cf549-(-1*0x163a+-1*0x224d+-353*-41+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x13fbf9-(-1*-5083+0x944*0x4+-14569+0.5)+'px\x20'+(_0x4cf549-(0xef3+-2649*0x2+0x5c1+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x18a13d+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x46474c['x']+_0x46474c['width']-(-6549+-13*-53+0xb73*0x2+0.5)+'px\x20'+(_0x4cf549-(-1*-5976+-4973*0x1+0x1*-1001+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x18a13d+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x13fbf9-(-3219+0x3*-1613+0x1*0x1f7d+0.5)+'px\x20'+(_0x4cf549-(-4824+0x1*0x1d2e+-3*0x371+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x46474c['x']+_0x46474c['width']-(0x1d1*0x5+0x19f1+-8963+0.5)+'px\x20'+(_0x4cf549-(0xd49+0x22a6+-12268+0.5))+'px';for(const _0x21e0cc of _0x46474c['ids']){const _0x27bc5c=this['registered'][_0x21e0cc],_0x3028c5=_0x27bc5c['height']*(0x90a*0x4+0x115*-13+-5654-_0x2ab809),_0x4fe573=_0x27bc5c['y']+_0x25c9fe*(-97*0x52+-7119+-7537*-2-(_0x27bc5c['y']-_0x46474c['y'])/_0x46474c['height']);_0x27bc5c['el']['style']['height']=_0x3028c5+'px',_0x27bc5c['el']['style']['translate']=_0x27bc5c['x']+'px\x20'+_0x4fe573+'px',_0x1a5770[_0x21e0cc]['y']=_0x4fe573,_0x1a5770[_0x21e0cc]['height']=_0x3028c5;const _0x2d778a=new CustomEvent('onChange',{'detail':{'id':_0x21e0cc,'type':'scale-top','x':_0x1a5770[_0x21e0cc]['x'],'y':_0x1a5770[_0x21e0cc]['y'],'width':_0x1a5770[_0x21e0cc]['width'],'height':_0x1a5770[_0x21e0cc]['height']}});this['dispatchEv'+'ent'](_0x2d778a);}break;case 'b':_0x4cf549=_0x46474c['y']+_0x46474c['height'];_0x4cf549<=_0x46474c['y']&&(_0x4cf549=_0x46474c['y']);_0x440d80=_0x46474c['height']+_0x25c9fe;_0x440d80<-4643+-719*-12+0x5*-797&&(_0x440d80=-1890*0x1+0x26ee+-8076);this['elSelected'+'Lines']['t']['style']['translate']=_0x46474c['x']-(-201*0x15+-8529*-1+-4306+0.5)+'px\x20'+(_0x46474c['y']-(0x139f+0x3d2+-5999+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x46474c['x']-(-4866*-1+0x1*-8301+-491*-7+0.5)+'px\x20'+(_0x46474c['y']-(0x1073*0x2+-9870*-1+-18290+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x440d80+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x46474c['x']+_0x46474c['width']-(0x1668+0x559*-1+-15*0x123+0.5)+'px\x20'+(_0x46474c['y']-(-3*-9+0x2621*0x1+-9786+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x440d80+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x46474c['x']+'px\x20'+(_0x4cf549+_0x25c9fe-(-15*0x259+-4532+0x34ed+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x46474c['x']-(0x2*-3510+-979+-2*-4001+0.5)+'px\x20'+(_0x4cf549+_0x25c9fe-(-1175+0x208c+0x1bf2*-1+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x46474c['x']+_0x46474c['width']-(0x1841+0x19a0+-13*0x3d6+0.5)+'px\x20'+(_0x4cf549+_0x25c9fe-(-1*0x1953+0x3b*-112+0x3326+0.5))+'px';for(const _0x2690aa of _0x46474c['ids']){const _0x2acfd7=this['registered'][_0x2690aa],_0x22d82b=_0x2acfd7['height']*(-3*0x642+0x3b*0x4a+0x93*0x3+_0x2ab809),_0x1e9b1d=_0x2acfd7['y']+_0x25c9fe*((_0x2acfd7['y']-_0x46474c['y'])/_0x46474c['height']);_0x1a5770[_0x2690aa]['height']=_0x22d82b,_0x1a5770[_0x2690aa]['y']=_0x1e9b1d,_0x2acfd7['el']['style']['height']=_0x22d82b+'px',_0x2acfd7['el']['style']['translate']=_0x2acfd7['x']+'px\x20'+_0x1e9b1d+'px';const _0x136514=new CustomEvent('onChange',{'detail':{'id':_0x2690aa,'type':'scale-bott'+'om','x':_0x1a5770[_0x2690aa]['x'],'y':_0x1a5770[_0x2690aa]['y'],'width':_0x1a5770[_0x2690aa]['width'],'height':_0x1a5770[_0x2690aa]['height']}});this['dispatchEv'+'ent'](_0x136514);}break;}}['moveVector'+'s'](_0x1ded60,_0x39546d,_0x466ce1,_0x4e11e4,_0x44ee64,_0x3857d9){let _0x5e0882=-139*-70+-153*0x1f+-4987*0x1,_0x4546bc=-8069*-1+-7831+-238;const _0xfa7378=_0x44ee64['x']-_0x4e11e4['x'],_0xf9492f=_0xfa7378/_0x3857d9,_0x537b14=_0xfa7378/_0x466ce1['width'];let _0x3274f=-1886+-8009+-1*-9895;switch(_0x1ded60){case 'tl':_0x5e0882=_0x466ce1['x']+_0xfa7378,_0x4546bc=_0x466ce1['y']+_0xf9492f,this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5e0882-(0x1*0x7f+-32*0xc9+0x18a4+0.5)+'px\x20'+(_0x4546bc-(0x1cbb+0x702+0x23ba*-1+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x466ce1['x']+_0x466ce1['width']-(-6253+0x50d*-7+-15307*-1+0.5)+'px\x20'+(_0x4546bc-(-2411+-7131+0x53*0x73+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5e0882-(0x26ee+-3*0x609+-5328+0.5)+'px\x20'+(_0x466ce1['y']+_0x466ce1['height']-(0xdf*-3+-9113+0x2639+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5e0882-(0x1b71+-1252*0x1+-5771+0.5)+'px\x20'+(_0x4546bc-(0x134f+-1*-2003+-434*0x10+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x466ce1['width']-_0xfa7378+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5e0882-(0x22d3+-1418*-1+-10331+0.5)+'px\x20'+(_0x466ce1['y']+_0x466ce1['height']-(-1*0x1b77+0x1012+0xb67+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x466ce1['width']-_0xfa7378+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5e0882-(0x1*0x517+0x836*0x1+-83*0x29+0.5)+'px\x20'+(_0x4546bc-(-8074+0x1eaf+-17*-13+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x466ce1['height']-_0xf9492f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x466ce1['x']+_0x466ce1['width']-(-5833+-23*0xa1+0x2542+0.5)+'px\x20'+(_0x4546bc-(0x1476+0x1*-7244+0x2*0x3ec+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x466ce1['height']-_0xf9492f+'px';for(const _0x4454e8 of _0x466ce1['ids']){const _0x529122=this['registered'][_0x4454e8],_0x1d9964=_0x529122['width']*(0x4c5+-5174+0xf72-_0x537b14),_0x2f0e31=_0x529122['x']+_0xfa7378*(-4497+0x2520+-5006-(_0x529122['x']-_0x466ce1['x'])/_0x466ce1['width']),_0x469a69=_0x529122['height']*(0x1c6a+-9640+0x93f-_0x537b14),_0x37492b=_0x529122['y']+_0xf9492f*(-3*-572+-8172+0x1939-(_0x529122['y']-_0x466ce1['y'])/_0x466ce1['height']);_0x529122['el']['style']['translate']=_0x2f0e31+'px\x20'+_0x37492b+'px',_0x529122['el']['style']['width']=_0x1d9964+'px',_0x529122['el']['style']['height']=_0x469a69+'px',_0x39546d[_0x4454e8]['x']=_0x2f0e31,_0x39546d[_0x4454e8]['width']=_0x1d9964,_0x39546d[_0x4454e8]['y']=_0x37492b,_0x39546d[_0x4454e8]['height']=_0x469a69;const _0x20e43c=new CustomEvent('onChange',{'detail':{'id':_0x4454e8,'type':'scale-top-'+'left','x':_0x39546d[_0x4454e8]['x'],'y':_0x39546d[_0x4454e8]['y'],'width':_0x39546d[_0x4454e8]['width'],'height':_0x39546d[_0x4454e8]['height']}});this['dispatchEv'+'ent'](_0x20e43c);}break;case 'tr':_0x3274f=_0x466ce1['width']+_0xfa7378,_0x5e0882=_0x466ce1['x']+_0x3274f,_0x4546bc=_0x466ce1['y']-_0xf9492f,this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5e0882-(-4590+0x2*-1699+-61*-131+0.5)+'px\x20'+(_0x4546bc-(0x10a2+0x229a+-1457*0x9+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x466ce1['x']-(-5801*0x1+0x2*0x4c1+0x151*0xa+0.5)+'px\x20'+(_0x4546bc-(0x2c*0x26+-3072+0x3d*0x17+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x5e0882-(-1795+0x14dd*-1+0x79*0x3b+0.5)+'px\x20'+(_0x466ce1['y']+_0x466ce1['height']-(-9806+-511*0x3+0x6b*0x6a+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x466ce1['x']-(0xf53+-950*0x6+-593*-3+0.5)+'px\x20'+(_0x4546bc-(0x7fa+0xaea+0x971*-2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x3274f+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x466ce1['x']-(0x19bd+-2*0x8b5+-2129+0.5)+'px\x20'+(_0x466ce1['y']+_0x466ce1['height']-(-1*0x345+-1106+-5*-389+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x3274f+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x466ce1['x']-(0x5b9*-6+0x23db*-1+0x4633+0.5)+'px\x20'+(_0x4546bc-(-770+-7578+-50*-167+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x466ce1['height']+_0xf9492f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x466ce1['x']+_0x3274f-(-1*0xbe3+-54*-87+-551*0x3+0.5)+'px\x20'+(_0x4546bc-(-2*-1351+-2124+0x240*-1+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x466ce1['height']+_0xf9492f+'px';for(const _0x5d0a8a of _0x466ce1['ids']){const _0x3ad1d1=this['registered'][_0x5d0a8a],_0x2e073c=_0x3ad1d1['width']*(-5982+0xec+0x335*0x7+_0x537b14),_0x28318c=_0x3ad1d1['x']+_0xfa7378*((_0x3ad1d1['x']-_0x466ce1['x'])/_0x466ce1['width']),_0x488028=_0x3ad1d1['height']*(-908+-1443+0x930+_0x537b14),_0x4d011d=_0x3ad1d1['y']-_0xf9492f*(-4365+-1126+0xaba*0x2-(_0x3ad1d1['y']-_0x466ce1['y'])/_0x466ce1['height']);_0x3ad1d1['el']['style']['translate']=_0x28318c+'px\x20'+_0x4d011d+'px',_0x3ad1d1['el']['style']['width']=_0x2e073c+'px',_0x3ad1d1['el']['style']['height']=_0x488028+'px',_0x39546d[_0x5d0a8a]['x']=_0x28318c,_0x39546d[_0x5d0a8a]['width']=_0x2e073c,_0x39546d[_0x5d0a8a]['y']=_0x4d011d,_0x39546d[_0x5d0a8a]['height']=_0x488028;const _0x294f94=new CustomEvent('onChange',{'detail':{'id':_0x5d0a8a,'type':'scale-top-'+'right','x':_0x39546d[_0x5d0a8a]['x'],'y':_0x39546d[_0x5d0a8a]['y'],'width':_0x39546d[_0x5d0a8a]['width'],'height':_0x39546d[_0x5d0a8a]['height']}});this['dispatchEv'+'ent'](_0x294f94);}break;case 'bl':_0x5e0882=_0x466ce1['x']+_0xfa7378,_0x4546bc=_0x466ce1['y']+_0x466ce1['height']-_0xf9492f,this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5e0882-(-217*-13+-4380+0x61a+0.5)+'px\x20'+(_0x4546bc-(0x11d8+-2077+0x4*-622+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5e0882-(0x1*0x9a9+0xd22+-5832+0.5)+'px\x20'+(_0x466ce1['y']-(-9082+-4*-2094+0x2c5+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x466ce1['x']+_0x466ce1['width']-(0x13cb+-7245+0x885+0.5)+'px\x20'+(_0x4546bc-(-1528+0x9d*0x2d+-2767*0x2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5e0882-(-1*0x1505+-1*-5653+-270+0.5)+'px\x20'+(_0x466ce1['y']-(-1069+-2*-4022+-367*0x13+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x466ce1['width']-_0xfa7378+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5e0882-(-1*0xb9f+-1*-2929+0x30+0.5)+'px\x20'+(_0x4546bc-(0x6*-984+0x627*-5+0x1*0x35d5+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x466ce1['width']-_0xfa7378+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5e0882-(-1*-3385+0x4b7*0x2+-5797+0.5)+'px\x20'+(_0x466ce1['y']-(0x23ed+-3836*0x1+-5359*0x1+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x466ce1['height']-_0xf9492f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x466ce1['x']+_0x466ce1['width']-(0x2b4*0x7+-4554+-288+0.5)+'px\x20'+(_0x466ce1['y']-(0x80+-8795*-1+-1*0x22d9+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x466ce1['height']-_0xf9492f+'px';for(const _0x2b306c of _0x466ce1['ids']){const _0x13831d=this['registered'][_0x2b306c],_0x18fa02=_0x13831d['width']*(-3375+0xeb1*-1+0x3d*0x75-_0x537b14),_0x15ff50=_0x13831d['x']+_0xfa7378*(-9031*0x1+-1*-1412+0x1dc4-(_0x13831d['x']-_0x466ce1['x'])/_0x466ce1['width']),_0x27020b=_0x13831d['height']*(0x199b+-9*-346+0x2*-4834-_0x537b14),_0x2e6dbd=_0x13831d['y']+_0xf9492f*((_0x466ce1['y']-_0x13831d['y'])/_0x466ce1['height']);_0x13831d['el']['style']['translate']=_0x15ff50+'px\x20'+_0x2e6dbd+'px',_0x13831d['el']['style']['width']=_0x18fa02+'px',_0x13831d['el']['style']['height']=_0x27020b+'px',_0x39546d[_0x2b306c]['x']=_0x15ff50,_0x39546d[_0x2b306c]['width']=_0x18fa02,_0x39546d[_0x2b306c]['y']=_0x2e6dbd,_0x39546d[_0x2b306c]['height']=_0x27020b;const _0x3d3d25=new CustomEvent('onChange',{'detail':{'id':_0x2b306c,'type':'scale-bott'+'om-left','x':_0x39546d[_0x2b306c]['x'],'y':_0x39546d[_0x2b306c]['y'],'width':_0x39546d[_0x2b306c]['width'],'height':_0x39546d[_0x2b306c]['height']}});this['dispatchEv'+'ent'](_0x3d3d25);}break;case 'br':_0x3274f=_0x466ce1['width']+_0xfa7378,_0x5e0882=_0x466ce1['x']+_0x3274f,_0x4546bc=_0x466ce1['y']+_0x466ce1['height']+_0xf9492f,this['elSelected'+'Vectors']['br']['style']['translate']=_0x5e0882-(0x1d51+0x3e*0x2e+0x1439*-2+0.5)+'px\x20'+(_0x4546bc-(0x2224+0x155d+0x377e*-1+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x466ce1['x']+_0x466ce1['width']+_0xfa7378-(0xdf6+-4937*0x2+-33*-191+0.5)+'px\x20'+(_0x466ce1['y']-(0x894+0x5*-346+0x1cf*-1+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x466ce1['x']-(-1220*0x2+0xab0+-293+0.5)+'px\x20'+(_0x4546bc-(0x1*0x1b9b+-4214+-570*0x5+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x466ce1['x']-(-91*0x50+0x3*-113+0x1dc5+0.5)+'px\x20'+(_0x466ce1['y']-(0x1723+0x1*-8633+0xa98+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x3274f+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x466ce1['x']-(-5601+-3631+0x2412+0.5)+'px\x20'+(_0x4546bc-(0x1*-6741+0x1*-2431+0x21*0x116+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x3274f+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x466ce1['x']-(-1*0x257f+-177*-19+0x185e+0.5)+'px\x20'+(_0x466ce1['y']-(-134+-7219*0x1+0x1*0x1cbb+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x466ce1['height']+_0xf9492f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x466ce1['x']+_0x3274f-(-1069+-5215+-7*-898+0.5)+'px\x20'+(_0x466ce1['y']-(-3842+0x6f2+0x812+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x466ce1['height']+_0xf9492f+'px';for(const _0x134b48 of _0x466ce1['ids']){const _0x2f34db=this['registered'][_0x134b48],_0x54e96c=_0x2f34db['width']*(0x3*-1399+-1834*0x1+0x1790+_0x537b14),_0x496458=_0x2f34db['x']+_0xfa7378*((_0x2f34db['x']-_0x466ce1['x'])/_0x466ce1['width']),_0xf55500=_0x2f34db['height']*(-3381+0xbc+0x63d*0x2+_0x537b14),_0x2e2448=_0x2f34db['y']+_0xf9492f*((_0x2f34db['y']-_0x466ce1['y'])/_0x466ce1['height']);_0x2f34db['el']['style']['translate']=_0x496458+'px\x20'+_0x2e2448+'px',_0x2f34db['el']['style']['width']=_0x54e96c+'px',_0x2f34db['el']['style']['height']=_0xf55500+'px',_0x39546d[_0x134b48]['x']=_0x496458,_0x39546d[_0x134b48]['width']=_0x54e96c,_0x39546d[_0x134b48]['y']=_0x2e2448,_0x39546d[_0x134b48]['height']=_0xf55500;const _0x263e0a=new CustomEvent('onChange',{'detail':{'id':_0x134b48,'type':'scale-bott'+'om-right','x':_0x39546d[_0x134b48]['x'],'y':_0x39546d[_0x134b48]['y'],'width':_0x39546d[_0x134b48]['width'],'height':_0x39546d[_0x134b48]['height']}});this['dispatchEv'+'ent'](_0x263e0a);}break;}}['referenceA'+'lignLinesV'+'ectors'](_0x531484,_0x29d66b){let _0x4eed96='',_0x478370;for(let _0x65b43c in _0x531484){if(this['selected']['ids']['indexOf'](_0x65b43c)>-1)continue;let _0x367ea3={'x':0x0,'y':0x0};_0x478370='';if(Math['abs'](this['selected']['x']+this['selected']['width']-_0x531484[_0x65b43c]['x'])<=this['thresholdH'+'orizontal'])_0x478370='end',_0x367ea3['x']=this['selected']['x']+this['selected']['width']-_0x531484[_0x65b43c]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']/(-2565+0x21c3+-6076)))<=this['thresholdH'+'orizontal'])_0x478370='end',_0x367ea3['x']=this['selected']['x']+this['selected']['width']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']/(-4609+0x15d5*-1+0x27d8));else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']))<=this['thresholdH'+'orizontal'])_0x478370='end',_0x367ea3['x']=this['selected']['x']+this['selected']['width']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']);else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x81*0x25+0x1e9e+0x1*-12609)-_0x531484[_0x65b43c]['x'])<=this['thresholdH'+'orizontal'])_0x478370='middle',_0x367ea3['x']=this['selected']['x']+this['selected']['width']/(-478*0x10+0x2387+-1445)-_0x531484[_0x65b43c]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x5fd+-4444+-971*-3)-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']/(-241*0x5+0x1*0x649+-402)))<=this['thresholdH'+'orizontal'])_0x478370='middle',_0x367ea3['x']=this['selected']['x']+this['selected']['width']/(-6136+-2*-1168+0x76d*0x2)-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']/(-9282+-6689+-15973*-1));else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-2145+0x773*0x4+-7*0x30f)-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']))<=this['thresholdH'+'orizontal'])_0x478370='middle',_0x367ea3['x']=this['selected']['x']+this['selected']['width']/(0x1dcb+-8543*0x1+0x12*0x33)-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']);else {if(Math['abs'](this['selected']['x']-_0x531484[_0x65b43c]['x'])<=this['thresholdH'+'orizontal'])_0x478370='begin',_0x367ea3['x']=this['selected']['x']-_0x531484[_0x65b43c]['x'];else {if(Math['abs'](this['selected']['x']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']/(0xc66+0xeaa+0x1b0e*-1)))<=this['thresholdH'+'orizontal'])_0x478370='begin',_0x367ea3['x']=this['selected']['x']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']/(0xef5*-1+0x1d*0xbb+-796*0x2));else Math['abs'](this['selected']['x']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']))<=this['thresholdH'+'orizontal']&&(_0x478370='begin',_0x367ea3['x']=this['selected']['x']-(_0x531484[_0x65b43c]['x']+_0x531484[_0x65b43c]['width']));}}}}}}}_0x478370!==''?(_0x4eed96=_0x478370,this['snap']('horizontal',_0x367ea3,_0x531484),setTimeout(()=>{this['thresholdH'+'orizontal']=-4062+0x1f89+-4009;},0x18a2+-1632+-4474)):this['thresholdH'+'orizontal']===0x1*-5351+0x1ac+0x133d&&(this['thresholdH'+'orizontal']=0x128a+0x2*-563+-241*0xf);}const _0xf292ec=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-horizo'+'ntal');_0xf292ec!==undefined&&_0xf292ec['forEach'](_0x1a286c=>{_0x1a286c['remove']();});const _0x388576=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-horizont'+'al');_0x388576!==undefined&&_0x388576['forEach'](_0x49c2e2=>{_0x49c2e2['remove']();});_0x4eed96!==''&&(this['triggerAli'+'gnVectors']('horizontal',_0x4eed96,_0x531484),this['triggerAli'+'gnLines'](_0x531484));_0x4eed96='';for(let _0xf3dd70 in _0x531484){if(this['selected']['ids']['indexOf'](_0xf3dd70)>-1)continue;let _0x1a7a8d={'x':0x0,'y':0x0};_0x478370='';if(Math['abs'](this['selected']['y']+this['selected']['height']-_0x531484[_0xf3dd70]['y'])<=this['thresholdV'+'ertical'])_0x478370='end',_0x1a7a8d['y']=this['selected']['y']+this['selected']['height']-_0x531484[_0xf3dd70]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']/(-4937+0x14f6+-427)))<=this['thresholdV'+'ertical'])_0x478370='end',_0x1a7a8d['y']=this['selected']['y']+this['selected']['height']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']/(0xe2b*0x1+-562*0x4+0x11*-81));else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']))<=this['thresholdV'+'ertical'])_0x478370='end',_0x1a7a8d['y']=this['selected']['y']+this['selected']['height']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']);else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x1ffd+0xc45+-11328)-_0x531484[_0xf3dd70]['y'])<=this['thresholdV'+'ertical'])_0x478370='middle',_0x1a7a8d['y']=this['selected']['y']+this['selected']['height']/(0x2e3*0x3+0x1b*0x147+-11044)-_0x531484[_0xf3dd70]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(-7717*0x1+0x51*0x32+-3669*-1)-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']/(-194*0x1+0x131*-28+0x2220)))<=this['thresholdV'+'ertical'])_0x478370='middle',_0x1a7a8d['y']=this['selected']['y']+this['selected']['height']/(0x1*0x12e3+-8889+0x4e*0x34)-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']/(-431*0x15+-669*0xa+0x3d7f));else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x11*0x1f+-1474*-1+-1*0x7cf)-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']))<=this['thresholdV'+'ertical'])_0x478370='middle',_0x1a7a8d['y']=this['selected']['y']+this['selected']['height']/(0xea*0x9+-1*0x1f+-3*0x2b3)-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']);else {if(Math['abs'](this['selected']['y']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']))<=this['thresholdV'+'ertical'])_0x478370='begin',_0x1a7a8d['y']=this['selected']['y']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']);else {if(Math['abs'](this['selected']['y']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']/(-2293*0x1+0x78d+0x16a)))<=this['thresholdV'+'ertical'])_0x478370='begin',_0x1a7a8d['y']=this['selected']['y']-(_0x531484[_0xf3dd70]['y']+_0x531484[_0xf3dd70]['height']/(-5690+-8881+0x38ed));else Math['abs'](this['selected']['y']-_0x531484[_0xf3dd70]['y'])<=this['thresholdV'+'ertical']&&(_0x478370='begin',_0x1a7a8d['y']=this['selected']['y']-_0x531484[_0xf3dd70]['y']);}}}}}}}_0x478370!==''?(_0x4eed96=_0x478370,this['snap']('vertical',_0x1a7a8d,_0x531484),setTimeout(()=>{this['thresholdH'+'orizontal']=-5*-1624+-6963+-1155;},0x1*0xb22+0x1*0x1157+-7089)):this['thresholdV'+'ertical']===-2476+-5326*-1+-2848&&(this['thresholdV'+'ertical']=0x7ba+-24*0x178+0x281*0xb);}const _0x2adc5a=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-vertic'+'al');_0x2adc5a!==undefined&&_0x2adc5a['forEach'](_0x13a97f=>{_0x13a97f['remove']();});const _0x439175=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-vertical');_0x439175!==undefined&&_0x439175['forEach'](_0x5b44e0=>{_0x5b44e0['remove']();}),_0x4eed96!==''&&(this['triggerAli'+'gnVectors']('vertical',_0x4eed96,_0x531484),this['triggerAli'+'gnLines'](_0x531484));}['snap'](_0xc1a78e,_0x47981b,_0xd5402d){let _0xf6fd70={'x':0x0,'y':0x0};if(_0xc1a78e==='horizontal'){this['selected']['x']=this['selected']['x']-_0x47981b['x'];for(const _0x5c9d9e of this['selected']['ids']){const _0x461f56=this['getElement'+'TranslateP'+'os'](_0xd5402d[_0x5c9d9e]['el']),_0x4e2a39=_0x461f56['x']-_0x47981b['x'],_0xf5975c=_0x461f56['y'];_0xd5402d[_0x5c9d9e]['el']['style']['translate']=_0x4e2a39+'px\x20'+_0xf5975c+'px',_0xd5402d[_0x5c9d9e]['x']=_0x4e2a39;}_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0xf6fd70['x']-_0x47981b['x']+'px\x20'+_0xf6fd70['y']+'px';}else {this['selected']['y']=this['selected']['y']-_0x47981b['y'];for(const _0x1fd015 of this['selected']['ids']){const _0x1b2cb5=this['getElement'+'TranslateP'+'os'](_0xd5402d[_0x1fd015]['el']),_0xa0524=_0x1b2cb5['x'],_0xebb1cf=_0x1b2cb5['y']-_0x47981b['y'];_0xd5402d[_0x1fd015]['el']['style']['translate']=_0xa0524+'px\x20'+_0xebb1cf+'px',_0xd5402d[_0x1fd015]['y']=_0xebb1cf;}_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px',_0xf6fd70=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0xf6fd70['x']+'px\x20'+(_0xf6fd70['y']-_0x47981b['y'])+'px';}}['getElement'+'TranslateP'+'os'](_0x113091){let _0x191da0={'x':0x0,'y':0x0};if(_0x113091['style']['translate']['indexOf']('\x20')>-1){const _0x485fe1=_0x113091['style']['translate']['split']('\x20');_0x191da0['x']=parseFloat(_0x485fe1[0x250b+0x71*-27+-6432]['replace']('px','')),_0x191da0['y']=parseFloat(_0x485fe1[0x1779+-6943+-85*-11]['replace']('px',''));}else _0x191da0['x']=parseFloat(_0x113091['style']['translate']);return _0x191da0;}['generateAl'+'ignVector'](_0x5312bc,_0x2f6c7d,_0x686b23){const _0x2acf56=document['createElem'+'ent']('div');_0x2acf56['innerHTML']='\x0a\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20fill=\x22'+colors['red']+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20v'+'iewBox=\x220\x20'+'0\x2024\x2024\x22\x20\x0a'+'\x20\x20\x20\x20\x20\x20stro'+'ke-width=\x22'+'1.5\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20stroke=\x22'+'currentCol'+'or\x22\x20\x0a\x20\x20\x20\x20\x20'+'\x20class=\x22si'+'ze-6\x22\x20\x0a\x20\x20\x20'+'\x20\x20\x20width=\x22')+vectorSize*(-422+0x1be0+0xd1c*-2)+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20w'+'idth=\x22')+vectorSize*(-1*-9842+-11*0x1e7+-1*0x1183)+('\x22\x0a\x20\x20\x20\x20>\x0a\x20\x20'+'\x20\x20\x20\x20<path\x20'+'stroke-lin'+'ecap=\x22roun'+'d\x22\x20stroke-'+'linejoin=\x22'+'round\x22\x20d=\x22'+'M6\x2018\x2018\x206'+'M6\x206l12\x2012'+'\x22\x20/>\x0a\x20\x20\x20\x20<'+'/svg>'),_0x2acf56['classList']['add']('align-vect'+'or'),_0x2acf56['classList']['add']('align-vect'+'or-'+_0x5312bc),_0x2acf56['classList']['add']('align-vect'+'or-'+_0x5312bc+'-'+_0x2f6c7d),_0x2acf56['style']['position']='absolute',_0x2acf56['style']['left']=_0x686b23['x']+'px',_0x2acf56['style']['top']=_0x686b23['y']+'px',this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x2acf56);}['triggerAli'+'gnVectors'](_0xe9ef4f,_0x5ad602,_0xcb4f73){let _0x48edb6={'hBegin':![],'hMiddle':![],'hEnd':![],'vBegin':![],'vMiddle':![],'vEnd':![]};for(let _0x5f065a in _0xcb4f73){Math['abs'](this['selected']['x']-_0xcb4f73[_0x5f065a]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hBegin']&&(_0x48edb6['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(0x3*-2063+-5102*-1+-1*-1089)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(-9717+-6616+0x87*0x79)-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(0x105*0x2+0x5bd*0x1+0x99*-13)-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hBegin']&&(_0x48edb6['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hBegin']&&(_0x48edb6['hBegin']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-9720+0x4*0x4f+0x24be)-_0xcb4f73[_0x5f065a]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hMiddle']&&(_0x48edb6['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x1*0x1fcf+0x5*0x40f+-13336)-(_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(-4*0x61+-121*0x11+-1*-2447)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(-303*-17+-1196+-3953)-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(0x3*0xa7+-9931+0x24d8)-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hMiddle']&&(_0x48edb6['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x10ba*-1+0x1f8b+-223*0x11)-(_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hMiddle']&&(_0x48edb6['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-_0xcb4f73[_0x5f065a]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hEnd']&&(_0x48edb6['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(0x11*-16+-9147+0x24cd)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(0x1*0x216b+-8037+0xac*-3)-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']/(0x165a*-1+0xea4+0x7b8)-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hEnd']&&(_0x48edb6['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['hEnd']&&(_0x48edb6['hEnd']=!![])),Math['abs'](this['selected']['y']-_0xcb4f73[_0x5f065a]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),!_0x48edb6['vBegin']&&(_0x48edb6['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x1889+0x12c2+0x2b49*-1)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x465*0x1+-2115+0x3e0)-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x5*-599+0x24a3*-1+-182*-68)-vectorSize}),!_0x48edb6['vBegin']&&(_0x48edb6['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['vBegin']&&(_0x48edb6['vBegin']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0xa*0xb5+-2543+0x2df)-_0xcb4f73[_0x5f065a]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),!_0x48edb6['vMiddle']&&(_0x48edb6['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*0x21f5+0x1*-9365+-337*-2)-(_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x136b+0xbb9*0x1+-5*0x63a)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(-1*0x1847+-351+0x19a8)-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x1841+-1*-2938+-9145)-vectorSize}),!_0x48edb6['vMiddle']&&(_0x48edb6['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-2752+-626*-11+0x812*-2)-(_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['vMiddle']&&(_0x48edb6['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-_0xcb4f73[_0x5f065a]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']-vectorSize}),!_0x48edb6['vEnd']&&(_0x48edb6['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x1*0x2221+-9*0x291+-2822)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(0x2d3*-11+0x17*-249+0x3572)-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']/(-3471*0x2+0x2077+0x557*-1)-vectorSize}),!_0x48edb6['vEnd']&&(_0x48edb6['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0xcb4f73[_0x5f065a]['id'])===-1&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':_0xcb4f73[_0x5f065a]['x']+_0xcb4f73[_0x5f065a]['width']-vectorSize,'y':_0xcb4f73[_0x5f065a]['y']+_0xcb4f73[_0x5f065a]['height']-vectorSize}),!_0x48edb6['vEnd']&&(_0x48edb6['vEnd']=!![]));}_0x48edb6['hBegin']&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x48edb6['hMiddle']&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']/(-21*0x98+0x2ae*-7+-7996*-1)-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']/(0x1*-7047+-3881+0x2ab2*0x1)-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x48edb6['hEnd']&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x48edb6['vBegin']&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize})),_0x48edb6['vMiddle']&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(0x43b+0x1bb*0x13+-9498*0x1)-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-9*0x18b+-5214+0x2243)-vectorSize})),_0x48edb6['vEnd']&&(this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}),this['generateAl'+'ignVector'](_0xe9ef4f,_0x5ad602,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}));}['generateAl'+'ignLine'](_0x375225){const {direction:_0x4776c7,position:_0x25e973,begin:_0x5bf8b9,end:_0x3a0d70}=_0x375225,_0x228475=document['createElem'+'ent']('div');_0x228475['classList']['add']('align-line'),_0x228475['classList']['add']('align-line'+'-'+_0x4776c7),_0x228475['classList']['add']('align-line'+'-'+_0x4776c7+'-'+_0x25e973),_0x228475['style']['position']='absolute',_0x228475['style']['left']=_0x5bf8b9['x']+'px',_0x228475['style']['top']=_0x5bf8b9['y']+'px',_0x4776c7==='horizontal'?(_0x228475['style']['width']='1px',_0x228475['style']['height']=_0x3a0d70['y']-_0x5bf8b9['y']+'px'):(_0x228475['style']['width']=_0x3a0d70['x']-_0x5bf8b9['x']+'px',_0x228475['style']['height']='1px'),this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x228475);}['generateLi'+'ne'](_0x455611,_0x528612){const {direction:_0x25eaa9,begin:_0x28c1b8,end:_0x4d7a19}=_0x455611,_0x5eaa27=document['createElem'+'ent']('div');if(_0x528612['length']>0xa1b+0x119*0x5+-3992)for(const _0x115354 of _0x528612){_0x5eaa27['classList']['add'](_0x115354);}return _0x5eaa27['style']['position']='absolute',_0x5eaa27['style']['left']=_0x28c1b8['x']+'px',_0x5eaa27['style']['top']=_0x28c1b8['y']+'px',_0x25eaa9==='horizontal'?_0x5eaa27['style']['width']=_0x4d7a19['x']-_0x28c1b8['x']+'px':_0x5eaa27['style']['height']=_0x4d7a19['y']-_0x28c1b8['y']+'px',_0x5eaa27;}['triggerAli'+'gnLines'](_0x16dbf5){const _0x3a0ffb={'direction':'horizontal','position':'begin','begin':{'x':this['selected']['x'],'y':this['selected']['y']},'end':{'x':this['selected']['x'],'y':this['selected']['y']}},_0x2eed4b=(_0x3d6e40,_0x2e3d83,_0x4768df)=>{return _0x3d6e40===undefined?(_0x3d6e40=_0x3ca7ba(_0x3a0ffb),_0x3d6e40['end']['y']=_0x3d6e40['end']['y']+this['selected']['height'],_0x3d6e40['begin']['x']=_0x3d6e40['begin']['x']+_0x4768df,_0x3d6e40['end']['x']=_0x3d6e40['begin']['x']+_0x4768df,_0x2e3d83['y']<_0x3d6e40['begin']['y']&&(_0x3d6e40['begin']['y']=_0x2e3d83['y']),_0x2e3d83['y']+_0x2e3d83['height']>_0x3d6e40['end']['y']&&(_0x3d6e40['end']['y']=_0x2e3d83['y']+_0x2e3d83['height'])):(_0x2e3d83['y']<_0x3d6e40['begin']['y']&&(_0x3d6e40['begin']['y']=_0x2e3d83['y']),_0x2e3d83['y']+_0x2e3d83['height']>_0x3d6e40['end']['y']&&(_0x3d6e40['end']['y']=_0x2e3d83['y']+_0x2e3d83['height'])),_0x3d6e40;},_0x306b4a=(_0x36a492,_0x36ec69,_0x5bfc07)=>{return _0x36a492===undefined?(_0x36a492=_0x3ca7ba(_0x3a0ffb),_0x36a492['direction']='vertical',_0x36a492['end']['x']=_0x36a492['end']['x']+this['selected']['width'],_0x36a492['begin']['y']=_0x36a492['begin']['y']+_0x5bfc07,_0x36a492['end']['y']=_0x36a492['end']['y']+_0x5bfc07,_0x36ec69['x']<_0x36a492['begin']['x']&&(_0x36a492['begin']['x']=_0x36ec69['x']),_0x36ec69['x']+_0x36ec69['width']>_0x36a492['end']['x']&&(_0x36a492['end']['x']=_0x36ec69['x']+_0x36ec69['width'])):(_0x36ec69['x']<_0x36a492['begin']['x']&&(_0x36a492['begin']['x']=_0x36ec69['x']),_0x36ec69['x']+_0x36ec69['width']>_0x36a492['end']['x']&&(_0x36a492['end']['x']=_0x36ec69['x']+_0x36ec69['width'])),_0x36a492;},_0x369ea8=[];for(let _0x4bbce1 in _0x16dbf5){(this['selected']['x']===_0x16dbf5[_0x4bbce1]['x']||this['selected']['x']===_0x16dbf5[_0x4bbce1]['x']+_0x16dbf5[_0x4bbce1]['width']/(-1743+-5850+0x5*0x5ef)||this['selected']['x']===_0x16dbf5[_0x4bbce1]['x']+_0x16dbf5[_0x4bbce1]['width'])&&this['selected']['ids']['indexOf'](_0x16dbf5[_0x4bbce1]['id'])===-1&&(_0x369ea8[-1*-3764+-9443+0x162f]=_0x2eed4b(_0x369ea8[-29*0xa+-4034+0x10e4],_0x16dbf5[_0x4bbce1],0x1d*0x25+0x406*-1+-43)),(this['selected']['x']+this['selected']['width']/(-1162*0x4+-2691*-2+0xc*-61)===_0x16dbf5[_0x4bbce1]['x']||this['selected']['x']+this['selected']['width']/(-77*-42+0x1*0x23bd+-12381)===_0x16dbf5[_0x4bbce1]['x']+_0x16dbf5[_0x4bbce1]['width']/(-3765+0xbca+-1*-749)||this['selected']['x']+this['selected']['width']/(-1*0x24c1+-3291+0x319e)===_0x16dbf5[_0x4bbce1]['x']+_0x16dbf5[_0x4bbce1]['width'])&&this['selected']['ids']['indexOf'](_0x16dbf5[_0x4bbce1]['id'])===-1&&(_0x369ea8[0x10d6+-7946+0xe35]=_0x2eed4b(_0x369ea8[-218*0x20+0x236c+0x82b*-1],_0x16dbf5[_0x4bbce1],this['selected']['width']/(-364+-54*0xa6+-15*-622))),(this['selected']['x']+this['selected']['width']===_0x16dbf5[_0x4bbce1]['x']||this['selected']['x']+this['selected']['width']===_0x16dbf5[_0x4bbce1]['x']+_0x16dbf5[_0x4bbce1]['width']/(-12*-451+-6127+0x2cd)||this['selected']['x']+this['selected']['width']===_0x16dbf5[_0x4bbce1]['x']+_0x16dbf5[_0x4bbce1]['width'])&&this['selected']['ids']['indexOf'](_0x16dbf5[_0x4bbce1]['id'])===-1&&(_0x369ea8[0xdbb+0x2f*-49+-1210]=_0x2eed4b(_0x369ea8[-168*-59+0x14ca*-1+0x1*-4588],_0x16dbf5[_0x4bbce1],this['selected']['width'])),(Math['abs'](this['selected']['y']-_0x16dbf5[_0x4bbce1]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x16dbf5[_0x4bbce1]['y']+_0x16dbf5[_0x4bbce1]['height']/(-8815+0x3*-1726+0x36ab)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x16dbf5[_0x4bbce1]['y']+_0x16dbf5[_0x4bbce1]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x16dbf5[_0x4bbce1]['id'])===-1&&(_0x369ea8[-111*0x52+-1*0x17de+0x3b6f]=_0x306b4a(_0x369ea8[0x9*0x429+-11*0x5d+-8559],_0x16dbf5[_0x4bbce1],0x2453+0x78d*0x4+-5677*0x3)),(Math['abs'](this['selected']['y']+this['selected']['height']/(-5263+-3215*-1+0x52*0x19)-_0x16dbf5[_0x4bbce1]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*-5119+-6953*-1+-229*0x8)-(_0x16dbf5[_0x4bbce1]['y']+_0x16dbf5[_0x4bbce1]['height']/(-4215+0x1*0xedd+0x19c)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0x198+-9479+-43*-211)-(_0x16dbf5[_0x4bbce1]['y']+_0x16dbf5[_0x4bbce1]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x16dbf5[_0x4bbce1]['id'])===-1&&(_0x369ea8[0xbb5+-8684*-1+-11677]=_0x306b4a(_0x369ea8[-7830+-606*0x3+0x25b4],_0x16dbf5[_0x4bbce1],this['selected']['height']/(0x1*-7409+0x48c+0x1867))),(Math['abs'](this['selected']['y']+this['selected']['height']-_0x16dbf5[_0x4bbce1]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x16dbf5[_0x4bbce1]['y']+_0x16dbf5[_0x4bbce1]['height']/(0x8bc+-9181*-1+-2283*0x5)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x16dbf5[_0x4bbce1]['y']+_0x16dbf5[_0x4bbce1]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x16dbf5[_0x4bbce1]['id'])===-1&&(_0x369ea8[-5881*0x1+0x1d1a+-1564]=_0x306b4a(_0x369ea8[0x15*-139+-321*0x17+0x2843],_0x16dbf5[_0x4bbce1],this['selected']['height']));}for(const _0x57749a of _0x369ea8){if(_0x57749a===undefined)continue;this['generateAl'+'ignLine'](_0x57749a);}}['shortcuts'](_0x3f908d,_0x2a6c2b){if(_0x3f908d==='horizontal')switch(_0x2a6c2b){case 'begin':for(const _0x38b655 of this['selected']['ids']){const _0x3f73e2=this['registered'][_0x38b655],{y:_0x1f36a7}=this['getTransla'+'tePos'](_0x3f73e2['el']['style']['translate']),_0x51d315=this['selected']['x'];_0x3f73e2['el']['style']['translate']=_0x51d315+'px\x20'+_0x1f36a7+'px',this['registered'][_0x38b655]['x']=_0x51d315;}break;case 'middle':for(const _0x4947e7 of this['selected']['ids']){const _0x306f28=this['registered'][_0x4947e7],{x:_0x532257,y:_0x5b8c32}=this['getTransla'+'tePos'](_0x306f28['el']['style']['translate']),_0x7a3ac=_0x532257-(_0x306f28['x']-(this['selected']['x']+this['selected']['width']/(0x72c+0x11*0x20f+0x2b*-251)))-_0x306f28['width']/(-1*-6342+-2453+-169*0x17);_0x306f28['el']['style']['translate']=_0x7a3ac+'px\x20'+_0x5b8c32+'px',this['registered'][_0x4947e7]['x']=_0x7a3ac;}break;case 'end':for(const _0x11da85 of this['selected']['ids']){const _0x2abf34=this['registered'][_0x11da85],{y:_0x569ee0}=this['getTransla'+'tePos'](_0x2abf34['el']['style']['translate']),_0x14ff78=this['selected']['x']+this['selected']['width']-_0x2abf34['width'];_0x2abf34['el']['style']['translate']=_0x14ff78+'px\x20'+_0x569ee0+'px',this['registered'][_0x11da85]['x']=this['selected']['x']+this['selected']['width']-_0x2abf34['width'];}break;case 'distribute':const _0x198560=this['selected']['ids']['sort']((_0x142a16,_0xf75ae2)=>this['registered'][_0x142a16]['x']-this['registered'][_0xf75ae2]['x']);let _0xd5f94f=-7537+-1189*-7+-786;for(const _0x25fb95 of _0x198560){_0xd5f94f+=this['registered'][_0x25fb95]['width'];}const _0x40f858=(this['selected']['width']-_0xd5f94f)/(_0x198560['length']-(-1*0x10b9+-9146+-3*-4476));let _0xdee4ee=this['registered'][_0x198560[0x1*0xb0b+0x13a8*0x1+-271*0x1d]]['x'];for(let _0x43813e=-4327+0x1*0x1667+0x80*-11;_0x43813e<_0x198560['length'];_0x43813e++){const _0x1135a7=_0x198560[_0x43813e],_0x1cb141=this['registered'][_0x1135a7],{y:_0xbd3049}=this['getTransla'+'tePos'](_0x1cb141['el']['style']['translate']);let _0x34f1ce=_0xdee4ee;_0x1cb141['el']['style']['translate']=_0x34f1ce+'px\x20'+_0xbd3049+'px',this['registered'][_0x1135a7]['x']=_0x34f1ce,_0xdee4ee=_0xdee4ee+_0x1cb141['width']+_0x40f858;}break;}else {if(_0x3f908d==='vertical')switch(_0x2a6c2b){case 'begin':console['log']('begin');for(const _0x3e6d15 of this['selected']['ids']){const _0x2d2f73=this['registered'][_0x3e6d15],{x:_0x80912d}=this['getTransla'+'tePos'](_0x2d2f73['el']['style']['translate']),_0x317439=this['selected']['y'];_0x2d2f73['el']['style']['translate']=_0x80912d+'px\x20'+_0x317439+'px',this['registered'][_0x3e6d15]['y']=_0x317439;}break;case 'middle':console['log']('middle');for(const _0x1c3ce6 of this['selected']['ids']){const _0x41b509=this['registered'][_0x1c3ce6],{x:_0x21f68f,y:_0x5f53f0}=this['getTransla'+'tePos'](_0x41b509['el']['style']['translate']),_0x14e047=_0x5f53f0-(_0x41b509['y']-(this['selected']['y']+this['selected']['height']/(0x19a3+0xb9a+-9531)))-_0x41b509['height']/(-4011+-2*-2111+-209);_0x41b509['el']['style']['translate']=_0x21f68f+'px\x20'+_0x14e047+'px',this['registered'][_0x1c3ce6]['y']=_0x14e047;}break;case 'end':console['log']('end');for(const _0x158b25 of this['selected']['ids']){const _0x776d8f=this['registered'][_0x158b25],{x:_0x26b426}=this['getTransla'+'tePos'](_0x776d8f['el']['style']['translate']),_0x1a7954=this['selected']['y']+this['selected']['height']-_0x776d8f['height'];_0x776d8f['el']['style']['translate']=_0x26b426+'px\x20'+_0x1a7954+'px',this['registered'][_0x158b25]['y']=this['selected']['y']+this['selected']['height']-_0x776d8f['height'];}break;case 'distribute':console['log']('distribute');const _0x29871d=this['selected']['ids']['sort']((_0x34e2c2,_0x41f475)=>this['registered'][_0x34e2c2]['y']-this['registered'][_0x41f475]['y']);let _0x527714=0x794*-5+-8224+-8962*-2;for(const _0x2173bf of _0x29871d){_0x527714+=this['registered'][_0x2173bf]['height'];}const _0xdee7e0=(this['selected']['height']-_0x527714)/(_0x29871d['length']-(-59*0x9f+0x1*0x53+0x2453));let _0xf2cc51=this['registered'][_0x29871d[-1933*-4+-4487+0x5*-649]]['y'];for(let _0x8b0774=0x23f6+0x1*0x21bf+0xd7*-83;_0x8b0774<_0x29871d['length'];_0x8b0774++){const _0x526ae7=_0x29871d[_0x8b0774],_0xfba972=this['registered'][_0x526ae7],{x:_0x411da3}=this['getTransla'+'tePos'](_0xfba972['el']['style']['translate']);let _0x550c51=_0xf2cc51;_0xfba972['el']['style']['translate']=_0x411da3+'px\x20'+_0x550c51+'px',this['registered'][_0x526ae7]['y']=_0x550c51,_0xf2cc51=_0xf2cc51+_0xfba972['height']+_0xdee7e0;}break;}else this['elMeasure']?.['classList']['contains']('active')?(this['shadowRoot']?.['removeEven'+'tListener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['remove']('active'),this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']()):(this['shadowRoot']?.['addEventLi'+'stener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['add']('active'));}this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['measure'](_0x1918b7){if(this['selected']['ids']['length']===-254*-23+0x1efe+0x11f0*-3)return;if(this['mouseMoveT'+'ype']==='main')return;let _0x7e99db=null;_0x1918b7['target']['id']==='main'&&(_0x7e99db=_0x1918b7['target']);_0x7e99db===null&&(_0x7e99db=_0x1918b7['target']['closest']('glide-dnr-'+'item'));if(_0x7e99db===null)return;this['isToolbar']&&(this['measureTar'+'getId']=_0x7e99db['id']);if(_0x7e99db['id']==='main'){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();this['isToolbar']&&(this['measureTar'+'getId']='',this['elMeasureO'+'utline']['style']['width']=-4444+0x5b*0x1+0x5ab*0x3,this['elMeasureO'+'utline']['style']['height']=-4914+-62*0x15+0x1848,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');return;}this['isToolbar']&&this['measureExe'+'cute']();}['measureExe'+'cute'](){if(this['measureTar'+'getId']==='')return;this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();const _0x5927c7=this['measureTar'+'getId'];for(const _0x55d609 of this['selected']['ids']){if(_0x5927c7===_0x55d609){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();return;}}const _0x51fb72=this['selected']['x']+this['selected']['width'],_0xeb310b=this['selected']['x']+this['selected']['width']/(-1*-373+-6686+0x3*0x839),_0x412a6b=this['selected']['y']+this['selected']['height'],_0x3810b6=this['selected']['y']+this['selected']['height']/(-2876+0x1*0x1ad5+-1*0xf97),_0x4892ec=this['registered'][_0x5927c7]['x']+this['registered'][_0x5927c7]['width'],_0x4b2609=this['registered'][_0x5927c7]['y']+this['registered'][_0x5927c7]['height'];let _0x2eb9f4=![];if(_0x412a6b<this['registered'][_0x5927c7]['y']){_0x2eb9f4=!![];const _0x3a355d=this['registered'][_0x5927c7]['y']-_0x412a6b;let _0x983bd7=_0xeb310b;_0xeb310b===_0x4892ec&&(_0x983bd7-=0x803*0x2+0x1dd4+-11737);this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x983bd7+'px\x20'+_0x412a6b+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x3a355d+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');let _0x221937=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x348c88=parseFloat(_0x221937['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x3a355d);const _0x3d0455=Math['round'](_0x412a6b+_0x3a355d/(-4918+-5787*0x1+0x29d3)-_0x348c88/(0xb35+0x2066+-11161));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0xeb310b+(0x1f04+0x502+-838*0xb)+'px\x20'+_0x3d0455+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible',_0xeb310b<=this['registered'][_0x5927c7]['x']&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0xeb310b+'px\x20'+this['registered'][_0x5927c7]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x5927c7]['x']-_0xeb310b+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0xeb310b>=_0x4892ec&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4892ec+'px\x20'+this['registered'][_0x5927c7]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0xeb310b-_0x4892ec+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(_0x412a6b>=this['registered'][_0x5927c7]['y']&&_0x412a6b<=_0x4b2609){_0x2eb9f4=!![];const _0x434d5d=_0x4b2609-_0x412a6b;this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0xeb310b+'px\x20'+_0x412a6b+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x434d5d+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');if(_0x412a6b>=this['registered'][_0x5927c7]['y']&&_0x412a6b<_0x4b2609){let _0x360fdf=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x3b74ba=parseFloat(_0x360fdf['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x434d5d);const _0x11053a=Math['round'](_0x412a6b+_0x434d5d/(-29*0xdb+-458+0x1a9b*0x1)-_0x3b74ba/(-2471*-4+-154*0x2+-9574*0x1));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0xeb310b+(0x1df2+-3*-2539+-11*0x56d)+'px\x20'+_0x11053a+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible';}_0xeb310b<=this['registered'][_0x5927c7]['x']&&_0x412a6b<_0x4b2609&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0xeb310b+'px\x20'+(_0x4b2609-(-19*0x67+-434+0x958))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x5927c7]['x']-_0xeb310b+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0xeb310b>=_0x4892ec&&_0x412a6b<_0x4b2609&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4892ec+'px\x20'+(_0x4b2609-(0x11f7+0xe7+-4829))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0xeb310b-_0x4892ec+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>_0x4b2609){_0x2eb9f4=!![];const _0x38b7e5=this['selected']['y']-_0x4b2609;let _0x1ef9c7=_0xeb310b;_0xeb310b===_0x4892ec&&(_0x1ef9c7-=0x1*-233+0x1*0xc6e+-2948);this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x1ef9c7+'px\x20'+_0x4b2609+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x38b7e5+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x247c28=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x29a71d=parseFloat(_0x247c28['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x38b7e5);const _0x4bd5da=Math['round'](this['selected']['y']-_0x38b7e5/(-9610*0x1+-3*-433+-489*-17)-_0x29a71d/(-11*-533+0x18aa+-12175));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0xeb310b+(0x1*-77+0x1526+-5333)+'px\x20'+_0x4bd5da+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0xeb310b<this['registered'][_0x5927c7]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0xeb310b+'px\x20'+(_0x4b2609-(0x8e+-1*-6841+-1*0x1b46))+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x5927c7]['x']-_0xeb310b+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0xeb310b>_0x4892ec&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4892ec+'px\x20'+(_0x4b2609-(-725+0xf6*0x1+0x1e0))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0xeb310b-_0x4892ec+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>this['registered'][_0x5927c7]['y']&&this['selected']['y']<=_0x4b2609){_0x2eb9f4=!![];const _0x2032df=this['selected']['y']-this['registered'][_0x5927c7]['y'];this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0xeb310b+'px\x20'+this['registered'][_0x5927c7]['y']+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x2032df+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x454672=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x15b93d=parseFloat(_0x454672['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x2032df);const _0x139b12=Math['round'](this['selected']['y']-_0x2032df/(0x1404+0x959*-1+-2729)-_0x15b93d/(0xd8*-8+0xddf+-3*0x25f));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0xeb310b+(0x7*0x469+0x125a+-12597)+'px\x20'+_0x139b12+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0xeb310b<this['registered'][_0x5927c7]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0xeb310b+'px\x20'+this['registered'][_0x5927c7]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x5927c7]['x']-_0xeb310b+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0xeb310b>_0x4892ec&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x4892ec+'px\x20'+this['registered'][_0x5927c7]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=_0xeb310b-_0x4892ec+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible'));}if(_0x51fb72<this['registered'][_0x5927c7]['x']){_0x2eb9f4=!![];let _0x13d0c8=_0x3810b6;_0x3810b6===_0x4b2609&&(_0x13d0c8-=0x1b3c+-4*0x321+-3767);this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x51fb72+(-6563*-1+-235+-19*0x14d)+'px\x20'+_0x13d0c8+'px';const _0x38513b=this['registered'][_0x5927c7]['x']-_0x51fb72;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x38513b+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x1ac5fa=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x420e23=parseFloat(_0x1ac5fa['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x38513b);const _0x5c614a=Math['round'](_0x51fb72+_0x38513b/(0xe12+-2*0x7dc+0x1a8)-_0x420e23/(-610+0x2095+0x3b*-131));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x5c614a+'px\x20'+(_0x3810b6+(0x3cb*-6+-8979*0x1+0x3b*0xfb))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x3810b6<=this['registered'][_0x5927c7]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x5927c7]['x']+'px\x20'+_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x5927c7]['y']-_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x3810b6>=_0x4b2609&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x5927c7]['x']+'px\x20'+_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x3810b6-_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(_0x51fb72>=this['registered'][_0x5927c7]['x']&&_0x51fb72<_0x4892ec){_0x2eb9f4=!![],this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x51fb72+'px\x20'+_0x3810b6+'px';const _0x597e7c=_0x4892ec-_0x51fb72;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x597e7c+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x133600=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x410b8f=parseFloat(_0x133600['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x597e7c);const _0x5a2819=Math['round'](_0x51fb72+_0x597e7c/(0x22f2+0x9dd*0x2+0x2*-6997)-_0x410b8f/(-7589+-36*0xd0+-17*-887));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x5a2819+'px\x20'+(_0x3810b6+(-21+-9874*-1+0x43*-147))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x3810b6<this['registered'][_0x5927c7]['y']&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4892ec-(0x886+0x5ec+-3697*0x1)+'px\x20'+_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=this['registered'][_0x5927c7]['y']-_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible')),_0x3810b6>_0x4b2609&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4892ec-(0x259*-15+-752+0x2628)+'px\x20'+_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=_0x3810b6-_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible'));}if(this['selected']['x']>_0x4892ec){_0x2eb9f4=!![];let _0xef576e=_0x3810b6;_0x3810b6===_0x4b2609&&(_0xef576e-=-746+0x131d+0x1*-4146);this['elMeasureL'+'ines']['solid_l']['style']['translate']=_0x4892ec-(0x1132+0x1*0x11fa+-9003)+'px\x20'+_0xef576e+'px';const _0x278842=this['selected']['x']-_0x4892ec;this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x278842+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x13daf7=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x358bcb=parseFloat(_0x13daf7['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x278842);const _0x2800ee=Math['round'](_0x4892ec+_0x278842/(-9598+-11*0x278+0x40a8)-_0x358bcb/(0x1f23*0x1+-1*0xaed+-431*0xc));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x2800ee+'px\x20'+(_0x3810b6+(0x2*-926+0x2ab+0x495))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x3810b6<=this['registered'][_0x5927c7]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4892ec-(0xf2*0x13+0x8b1*0x4+0x1*-13497)+'px\x20'+_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x5927c7]['y']-_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x3810b6>=_0x4b2609&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4892ec-(-9668+0x198b+0x2*0x61d)+'px\x20'+_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x3810b6-_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(this['selected']['x']>this['registered'][_0x5927c7]['x']&&this['selected']['x']<=_0x4892ec){_0x2eb9f4=!![],this['elMeasureL'+'ines']['solid_l']['style']['translate']=this['registered'][_0x5927c7]['x']+'px\x20'+_0x3810b6+'px';const _0x2d8a68=this['selected']['x']-this['registered'][_0x5927c7]['x'];this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x2d8a68+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x5e63a6=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x4b0994=parseFloat(_0x5e63a6['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x2d8a68);const _0x20dabd=Math['round'](this['registered'][_0x5927c7]['x']+_0x2d8a68/(-1745*0x1+0x5*-1013+0x6a7*0x4)-_0x4b0994/(0xdcf+-571*0xa+-311*-7));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x20dabd+'px\x20'+(_0x3810b6+(0x2558+0x4b6+-10762))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x3810b6<=this['registered'][_0x5927c7]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x5927c7]['x']+'px\x20'+_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x5927c7]['y']-_0x3810b6+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x3810b6>=_0x4b2609&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x5927c7]['x']+'px\x20'+_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x3810b6-_0x4b2609+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}_0x2eb9f4?this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=this['registered'][_0x5927c7]['width']+'px',this['elMeasureO'+'utline']['style']['height']=this['registered'][_0x5927c7]['height']+'px',this['elMeasureO'+'utline']['style']['translate']=this['registered'][_0x5927c7]['x']+'px\x20'+this['registered'][_0x5927c7]['y']+'px',this['elMeasureO'+'utline']['style']['visibility']='visible',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='auto'):(this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed'](),this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0x119c+0x20a9+-12869,this['elMeasureO'+'utline']['style']['height']=-3015+0x22*-38+-59*-73,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none'));}['hideMeasur'+'eReference'+'s'](){this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberB']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberB']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='hidden');}['hideMeasur'+'eDeshed'](){this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='hidden');}['triggerSel'+'ectedLines'+'Vectors'](_0x41d4ab){_0x41d4ab==='hide'?this['elSelected'+'Lines']['l']['style']['visibility']!=='hidden'&&(this['elSelected'+'Lines']['l']['style']['visibility']='hidden',this['elSelected'+'Lines']['r']['style']['visibility']='hidden',this['elSelected'+'Lines']['t']['style']['visibility']='hidden',this['elSelected'+'Lines']['b']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tr']['style']['visibility']='hidden',this['elSelected'+'Vectors']['bl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['br']['style']['visibility']='hidden'):this['elSelected'+'Lines']['l']['style']['visibility']!=='visible'&&(this['elSelected'+'Lines']['l']['style']['visibility']='visible',this['elSelected'+'Lines']['r']['style']['visibility']='visible',this['elSelected'+'Lines']['t']['style']['visibility']='visible',this['elSelected'+'Lines']['b']['style']['visibility']='visible',this['elSelected'+'Vectors']['tl']['style']['visibility']='visible',this['elSelected'+'Vectors']['tr']['style']['visibility']='visible',this['elSelected'+'Vectors']['bl']['style']['visibility']='visible',this['elSelected'+'Vectors']['br']['style']['visibility']='visible');}['delete'](){const _0x260709=new CustomEvent('onActions',{'detail':{'type':'delete','ids':this['selected']['ids']}});this['dispatchEv'+'ent'](_0x260709);}['init'](){const _0x3a057a=document['createElem'+'ent']('template');_0x3a057a['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x3a057a['content']),this['onSlotChan'+'ge'](),this['handleClic'+'k'](),this['initKeyboa'+'rdEvents']();}}customElements['define']('glide-dnr',GlideDNR);
export{GlideDNR as default};