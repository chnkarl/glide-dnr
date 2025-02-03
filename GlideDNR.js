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
var _0x2521b1 = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);const HasOwn=(_0x428ff9,_0x4ce57f)=>{if(typeof _0x428ff9!=='object')return ![];if(_0x428ff9===null||Array['isArray'](_0x428ff9))return ![];return Object['prototype']['hasOwnProp'+'erty']['call'](_0x428ff9,_0x4ce57f);};console['log']('Glide\x20DNR\x20'+'v1.0');const properties=['toolbar','measure','toolbar-pl'+'acement','actions'],_window=window,lineSize=-7*-1001+-9035+0x7f1,vectorSize=-3582+-4772*-2+0x25*-161,colors={'primary':'#4907DA','red':'#FB2C36','redActive':'#E7110C'};let dragBeginPos={'x':-1,'y':-1};const vectorOffset=vectorSize/(-7589+0x1154*-2+0x65*0xa3)+(0x350+0x957+0x2*-1619),originSelected={'ids':[],'x':0x0,'y':0x0,'width':0x0,'height':0x0};class GlideDNR extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'isToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'toolbarPla'+'cement',{'enumerable':!![],'configurable':!![],'writable':!![],'value':'float'}),Object['defineProp'+'erty'](this,'loadingIte'+'ms',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{'general':{'total':0x0,'loaded':0x0},'image':{'total':0x0,'loaded':0x0}}}),Object['defineProp'+'erty'](this,'selected',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x2521b1(originSelected)}),Object['defineProp'+'erty'](this,'registered',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'requestAni'+'mation',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elSelected'+'Lines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'elSelected'+'Vectors',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'rDrags',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elAligns',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasureO'+'utline',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'measureTar'+'getId',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'latestSele'+'cted',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x2521b1(originSelected)}),Object['defineProp'+'erty'](this,'lastClickT'+'ime',{'enumerable':!![],'configurable':!![],'writable':!![],'value':-1}),Object['defineProp'+'erty'](this,'isInit',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseMoveT'+'ype',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'hasSelecte'+'d',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'hasMoved',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isInSelect'+'ed',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseTarge'+'t',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'thresholdH'+'orizontal',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'thresholdV'+'ertical',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'alignVecto'+'rsLinesThr'+'eshold',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0.1}),Object['defineProp'+'erty'](this,'elMeasureL'+'ines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['measure']=this['measure']['bind'](this),this['delete']=this['delete']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x502ae2,_0x451526,_0xfad61c){if(_0x451526===_0xfad61c)return;switch(_0x502ae2){case 'toolbar':_0xfad61c===''&&(this['isToolbar']=!![]);break;case 'measure':_0xfad61c===''&&(this['isMeasure']=!![]);break;case 'toolbar-pl'+'acement':this['toolbarPla'+'cement']=_0xfad61c;break;case 'actions':_0xfad61c===''&&(this['isActions']=!![]);break;}}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22c'+'ontainer\x22\x20'+'id=\x22contai'+'ner\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22main'+'\x22\x20id=\x22main'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<slot\x20c'+'lass=\x22slot'+'\x22></slot>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_align\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_drag\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22refere'+'nce-lines_'+'selected\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<!--\x20line'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20class=\x22l'+'ine\x20left\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20style=\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20'+(this['selected']['x']-lineSize/(0x1f72+0x84c+-10172))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20righ'+'t\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20style'+'=\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x20')+(this['selected']['x']+this['selected']['width']-lineSize/(-1235+0x3ad*-3+0xe*0x122))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20top\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20style=\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'late:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-3957+-2207*0x2+0x20b5))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20bott'+'om\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-5832+0x4*-7+-2931*-2))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20vector\x20-'+'->\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'class=\x22vec'+'tor\x20top-le'+'ft\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20top-r'+'ight\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20st'+'yle=\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'translate:'+'\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-left\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'style=\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-right\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20style=\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20transla'+'te:\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20测距离参考线\x20和'+'\x20数字\x20-->\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22me'+'asure-line'+'s\x22>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<!--\x20'+'实线：选中项\x20-->'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22solid\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22item\x20'+'top\x22></div'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22item'+'\x20bottom\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20left\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20rig'+'ht\x22></div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'!--\x20虚线：目标项'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22das'+'hed\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20horiz'+'ontal-top\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20hor'+'izontal-bo'+'ttom\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22ite'+'m\x20vertical'+'-left\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22it'+'em\x20vertica'+'l-right\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22numb'+'er\x20number-'+'top\x22>283</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22num'+'ber\x20number'+'-bottom\x22>2'+'22</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22number\x20nu'+'mber-left\x22'+'>333</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22number\x20'+'number-rig'+'ht\x22>444</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'measure-ta'+'rget-outli'+'ne\x22></div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20')+(this['isToolbar']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar\x22>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22inner\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22grou'+'p\x20aligns\x22\x20'+'id=\x22aligns'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20hor'+'izontal-le'+'ft\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M145.39-1'+'00q-12.77\x20'+'0-21.39-8.'+'62-8.61-8.'+'61-8.61-21'+'.38v-700q0'+'-12.77\x208.6'+'1-21.38\x208.'+'62-8.62\x2021'+'.39-8.62\x201'+'2.77\x200\x2021.'+'38\x208.62\x208.'+'62\x208.61\x208.'+'62\x2021.38v7'+'00q0\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62Zm171.92'+'-193.85q-2'+'0.77\x200-35.'+'58-14.8-14'+'.8-14.81-1'+'4.8-35.58\x20'+'0-20.77\x2014'+'.8-35.58\x201'+'4.81-14.8\x20'+'35.58-14.8'+'h236.92q20'+'.77\x200\x2035.5'+'8\x2014.8\x2014.'+'8\x2014.81\x2014'+'.8\x2035.58\x200'+'\x2020.77-14.'+'8\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'317.31Zm0-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H3'+'17.31Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22toolbar'+'-item\x20hori'+'zontal-cen'+'ter\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+('ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M4'+'50-130v-16'+'3.85H310.3'+'9q-20.77\x200'+'-35.58-14.'+'8Q260-323.'+'46\x20260-344'+'.23q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450v'+'-170.78H19'+'0.39q-20.7'+'7\x200-35.58-'+'14.8Q140-5'+'95\x20140-615'+'.77q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450V'+'-830q0-12.'+'75\x208.63-21'+'.37\x208.63-8'+'.63\x2021.38-'+'8.63\x2012.76'+'\x200\x2021.37\x208'+'.63Q510-84'+'2.75\x20510-8'+'30v163.85h'+'259.61q20.'+'77\x200\x2035.58'+'\x2014.8Q820-'+'636.54\x20820'+'-615.77q0\x20'+'20.77-14.8'+'1\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'510v170.78'+'h139.61q20'+'.77\x200\x2035.5'+'8\x2014.8Q700'+'-365\x20700-3'+'44.23q0\x2020'+'.77-14.81\x20'+'35.58-14.8'+'1\x2014.8-35.'+'58\x2014.8H51'+'0V-130q0\x201'+'2.75-8.63\x20'+'21.37-8.63'+'\x208.63-21.3'+'8\x208.63-12.'+'76\x200-21.37'+'-8.63Q450-'+'117.25\x20450'+'-130Z\x22/></'+'svg>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22toolbar-'+'item\x20horiz'+'ontal-righ'+'t\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<svg\x20xmlns'+'=\x22http://w'+'ww.w3.org/'+'2000/svg\x22\x20'+'height=\x2218'+'px\x22\x20viewBo'+'x=\x220\x20-960\x20'+'960\x20960\x22\x20w'+'idth=\x2218px'+'\x22\x20fill=\x22#0'+'30713\x22><pa'+'th\x20d=\x22M814'+'.61-100q-1'+'2.77\x200-21.'+'38-8.62-8.'+'62-8.61-8.'+'62-21.38v-'+'700q0-12.7'+'7\x208.62-21.'+'38\x208.61-8.'+'62\x2021.38-8')+('.62t21.39\x20'+'8.62q8.61\x20'+'8.61\x208.61\x20'+'21.38v700q'+'0\x2012.77-8.'+'61\x2021.38-8'+'.62\x208.62-2'+'1.39\x208.62Z'+'M405.77-29'+'3.85q-20.7'+'7\x200-35.58-'+'14.8-14.8-'+'14.81-14.8'+'-35.58\x200-2'+'0.77\x2014.8-'+'35.58\x2014.8'+'1-14.8\x2035.'+'58-14.8h23'+'6.92q20.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58\x200\x2020'+'.77-14.8\x203'+'5.58-14.81'+'\x2014.8-35.5'+'8\x2014.8H405'+'.77Zm-240-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H1'+'65.77Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22divide'+'r\x22></div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-top\x22>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M344.23-1'+'10q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-488'+'.07q0-20.7'+'7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v488.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q365-110\x20'+'344.23-110'+'Zm271.54-2'+'40q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-248'+'.07q0-20.7')+('7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v248.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q636.54-3'+'50\x20615.77-'+'350ZM130-7'+'90.38q-12.'+'77\x200-21.38'+'-8.62-8.62'+'-8.61-8.62'+'-21.38t8.6'+'2-21.39q8.'+'61-8.61\x2021'+'.38-8.61h7'+'00q12.77\x200'+'\x2021.38\x208.6'+'1\x208.62\x208.6'+'2\x208.62\x2021.'+'39\x200\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62H130Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20ver'+'tical-cent'+'er\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'svg\x20xmlns='+'\x22http://ww'+'w.w3.org/2'+'000/svg\x22\x20h'+'eight=\x2218p'+'x\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218px\x22'+'\x20fill=\x22#03'+'0713\x22><pat'+'h\x20d=\x22M342.'+'31-140q-20'+'.77\x200-35.5'+'8-14.81-14'+'.81-14.81-'+'14.81-35.5'+'8V-450H130'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-51'+'0\x20130-510h'+'161.92v-25'+'9.61q0-20.'+'77\x2014.81-3'+'5.58Q321.5'+'4-820\x20342.'+'31-820q20.'+'77\x200\x2035.57'+'\x2014.81\x2014.'+'81\x2014.81\x201'+'4.81\x2035.58'+'V-510h174.'+'62v-139.61'+'q0-20.77\x201'+'4.81-35.58'+'Q596.92-70'+'0\x20617.69-7'+'00t35.58\x201'+'4.81q14.81'+'\x2014.81\x2014.'+'81\x2035.58V-'+'510H830q12'+'.75\x200\x2021.3'+'7\x208.63\x208.6'+'3\x208.63\x208.6'+'3\x2021.38\x200\x20'+'12.76-8.63'+'\x2021.37Q842'+'.75-450\x2083'+'0-450H668.'+'08v139.61q'+'0\x2020.77-14'+'.81\x2035.58Q'+'638.46-260'+'\x20617.69-26')+('0q-20.77\x200'+'-35.57-14.'+'81-14.81-1'+'4.81-14.81'+'-35.58V-45'+'0H392.69v2'+'59.61q0\x2020'+'.77-14.81\x20'+'35.58Q363.'+'08-140\x20342'+'.31-140Z\x22/'+'></svg>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22toolb'+'ar-item\x20ve'+'rtical-bot'+'tom\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-110q-12'+'.77\x200-21.3'+'8-8.62Q100'+'-127.23\x2010'+'0-140t8.62'+'-21.39Q117'+'.23-170\x2013'+'0-170h700q'+'12.77\x200\x2021'+'.38\x208.61Q8'+'60-152.77\x20'+'860-140q0\x20'+'12.77-8.62'+'\x2021.38Q842'+'.77-110\x2083'+'0-110H130Z'+'m214.23-15'+'1.54q-20.7'+'7\x200-35.58-'+'14.81-14.8'+'-14.81-14.'+'8-35.57V-8'+'00q0-20.77'+'\x2014.8-35.5'+'7\x2014.81-14'+'.81\x2035.58-'+'14.81\x2020.7'+'7\x200\x2035.58\x20'+'14.81\x2014.8'+'\x2014.8\x2014.8'+'\x2035.57v488'+'.08q0\x2020.7'+'6-14.8\x2035.'+'57-14.81\x201'+'4.81-35.58'+'\x2014.81Zm27'+'1.54\x200q-20'+'.77\x200-35.5'+'8-14.81-14'+'.8-14.81-1'+'4.8-35.57V'+'-560q0-20.'+'77\x2014.8-35'+'.57\x2014.81-'+'14.81\x2035.5'+'8-14.81\x2020'+'.77\x200\x2035.5'+'8\x2014.81\x2014'+'.8\x2014.8\x2014'+'.8\x2035.57v2'+'48.08q0\x2020'+'.76-14.8\x203'+'5.57-14.81'+'\x2014.81-35.'+'58\x2014.81Z\x22'+'/></svg>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22div'+'ider\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba')+('r-item\x20hor'+'izontal-di'+'stribute\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<sv'+'g\x20xmlns=\x22h'+'ttp://www.'+'w3.org/200'+'0/svg\x22\x20hei'+'ght=\x2218px\x22'+'\x20viewBox=\x22'+'0\x20-960\x20960'+'\x20960\x22\x20widt'+'h=\x2218px\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M129.99'+'-100q-12.7'+'6\x200-21.37-'+'8.63Q100-1'+'17.25\x20100-'+'130v-700q0'+'-12.75\x208.6'+'3-21.37\x208.'+'63-8.63\x2021'+'.38-8.63\x201'+'2.76\x200\x2021.'+'37\x208.63Q16'+'0-842.75\x201'+'60-830v700'+'q0\x2012.75-8'+'.63\x2021.37-'+'8.63\x208.63-'+'21.38\x208.63'+'Zm350.06-1'+'90q-20.82\x20'+'0-35.43-14'+'.58Q430-31'+'9.17\x20430-3'+'40v-280q0-'+'20.83\x2014.5'+'7-35.42Q45'+'9.14-670\x204'+'79.95-670q'+'20.82\x200\x2035'+'.43\x2014.58Q'+'530-640.83'+'\x20530-620v2'+'80q0\x2020.83'+'-14.57\x2035.'+'42Q500.86-'+'290\x20480.05'+'-290Zm349.'+'94\x20190q-12'+'.76\x200-21.3'+'7-8.63Q800'+'-117.25\x2080'+'0-130v-700'+'q0-12.75\x208'+'.63-21.37\x20'+'8.63-8.63\x20'+'21.38-8.63'+'\x2012.76\x200\x202'+'1.37\x208.63Q'+'860-842.75'+'\x20860-830v7'+'00q0\x2012.75'+'-8.63\x2021.3'+'7-8.63\x208.6'+'3-21.38\x208.'+'63Z\x22/></sv'+'g>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-distrib'+'ute\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-100q-12'+'.75\x200-21.3'+'7-8.63-8.6'+'3-8.63-8.6'+'3-21.38\x200-'+'12.76\x208.63'+'-21.37Q117')+('.25-160\x2013'+'0-160h700q'+'12.75\x200\x2021'+'.37\x208.63\x208'+'.63\x208.63\x208'+'.63\x2021.38\x20'+'0\x2012.76-8.'+'63\x2021.37Q8'+'42.75-100\x20'+'830-100H13'+'0Zm210-330'+'q-20.83\x200-'+'35.42-14.5'+'7Q290-459.'+'14\x20290-479'+'.95q0-20.8'+'2\x2014.58-35'+'.43Q319.17'+'-530\x20340-5'+'30h280q20.'+'83\x200\x2035.42'+'\x2014.57Q670'+'-500.86\x2067'+'0-480.05q0'+'\x2020.82-14.'+'58\x2035.43Q6'+'40.83-430\x20'+'620-430H34'+'0ZM130-800'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-86'+'0\x20130-860h'+'700q12.75\x20'+'0\x2021.37\x208.'+'63\x208.63\x208.'+'63\x208.63\x2021'+'.38\x200\x2012.7'+'6-8.63\x2021.'+'37Q842.75-'+'800\x20830-80'+'0H130Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22d'+'ivider\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22group'+'\x20measure\x22\x20'+'id=\x22measur'+'e\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'toolbar-it'+'em\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20xmln'+'s=\x22http://'+'www.w3.org'+'/2000/svg\x22'+'\x20height=\x221'+'8\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M172.31'+'-260Q142-2'+'60\x20121-281'+'q-21-21-21'+'-51.44v-29'+'5.12Q100-6'+'58\x20121-679'+'q21-21\x2051.'+'31-21h615.'+'38Q818-700'+'\x20839-679q2'+'1\x2021\x2021\x2051'+'.44v295.12'+'Q860-302\x208'+'39-281q-21'+'\x2021-51.31\x20'+'21H172.31Z'+'m0-60h615.'+'38q4.62\x200\x20'+'8.46-3.85\x20'+'3.85-3.84\x20'+'3.85-8.46v'+'-295.38q0-'+'4.62-3.85-'+'8.46-3.84-'+'3.85-8.46-'+'3.85H670v1'+'14.61q0\x2012'+'.75-8.63\x202'+'1.38-8.63\x20'+'8.62-21.38'+'\x208.62-12.7'+'6\x200-21.37-'+'8.62-8.62-'+'8.63-8.62-'+'21.38V-640'+'H510v114.6'+'1q0\x2012.75-'+'8.63\x2021.38'+'-8.63\x208.62'+'-21.38\x208.6'+'2-12.76\x200-'+'21.37-8.62'+'-8.62-8.63'+'-8.62-21.3'+'8V-640H350'+'v114.61q0\x20'+'12.75-8.63'+'\x2021.38-8.6'+'3\x208.62-21.'+'38\x208.62-12'+'.76\x200-21.3'+'7-8.62-8.6'+'2-8.63-8.6'+'2-21.38V-6'+'40H172.31q'+'-4.62\x200-8.'+'46\x203.85-3.'+'85\x203.84-3.'+'85\x208.46v29'+'5.38q0\x204.6'+'2\x203.85\x208.4'+'6\x203.84\x203.8'+'5\x208.46\x203.8'+'5ZM320-495'+'.39Zm160\x200'+'Zm160\x200ZM4'+'80-480Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20'):'')+('\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22actions\x22'+'\x20id=\x22actio'+'ns\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22act'+'ions-item\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<svg\x20x'+'mlns=\x22http'+'://www.w3.'+'org/2000/s'+'vg\x22\x20height'+'=\x2218\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'\x22><path\x20d='+'\x22M280-120q'+'-33\x200-56.5'+'-23.5T200-'+'200v-520q-'+'17\x200-28.5-'+'11.5T160-7'+'60q0-17\x2011'+'.5-28.5T20'+'0-800h160q'+'0-17\x2011.5-'+'28.5T400-8'+'40h160q17\x20'+'0\x2028.5\x2011.'+'5T600-800h'+'160q17\x200\x202'+'8.5\x2011.5T8'+'00-760q0\x201'+'7-11.5\x2028.'+'5T760-720v'+'520q0\x2033-2'+'3.5\x2056.5T6'+'80-120H280'+'Zm400-600H'+'280v520h40'+'0v-520ZM40'+'0-280q17\x200'+'\x2028.5-11.5'+'T440-320v-'+'280q0-17-1'+'1.5-28.5T4'+'00-640q-17'+'\x200-28.5\x2011'+'.5T360-600'+'v280q0\x2017\x20'+'11.5\x2028.5T'+'400-280Zm1'+'60\x200q17\x200\x20'+'28.5-11.5T'+'600-320v-2'+'80q0-17-11'+'.5-28.5T56'+'0-640q-17\x20'+'0-28.5\x2011.'+'5T520-600v'+'280q0\x2017\x201'+'1.5\x2028.5T5'+'60-280ZM28'+'0-720v520-'+'520Z\x22/></s'+'vg>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22loa'+'ding\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22i'+'nner\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'img\x20src=\x22/'+'src/assets'+'/images/v1'+'/loading_l'+'ine.png\x22\x20/'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20<style'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'/*\x20定义旋转动画\x20'+'*/\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20@keyframe'+'s\x20rotate36'+'0\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20from\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'form:\x20rota'+('te(0deg);\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20to\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20transform'+':\x20rotate(3'+'60deg);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20:ho'+'st\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20block;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x20ca'+'lc(100%\x20-\x20'+'1px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20calc(1'+'00%\x20-\x201px)'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.contai'+'ner\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20height:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20r'+'elative;\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.main\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20height:\x201'+'00%;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'::slotted('+'glide-dnr-'+'item)\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'display:\x20i'+'nline-bloc'+'k;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20f'+'lex-shrink'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20user-sele'+'ct:\x20none;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20curs'+'or:\x20auto;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'vector\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20color:\x20'))+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20font'+'-size:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lin'+'e-height:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20z-i'+'ndex:\x201000'+'04;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'line\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ali'+'gn-line-ve'+'rtical\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20border-'+'top:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.align-li'+'ne-horizon'+'tal\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-lef'+'t:\x20solid\x201'+'px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'reference-'+'lines_sele'+'cted\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.line\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100002;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20visibi'+'lity:\x20hidd'+'en;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20&.left,\x20&'+'.right\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20&:'+'hover\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20cu'+'rsor:\x20ew-r'+'esize;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20&::b'+'efore\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20co'+'ntent:\x20\x27\x27;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20left:\x20')+Math['floor'](lineSize/(0x22b9+-9679+0x2*0x18c))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x20100%;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op,\x20&.bott'+'om\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&:hove'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20cursor'+':\x20ns-resiz'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20&::befor'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20conten'+'t:\x20\x27\x27;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lef'+'t:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x20')+Math['floor'](lineSize/(-15*-27+-22*-387+-37*0xf1))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+':\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.vector\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20display'+':\x20inline-b'+'lock;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border:\x20so'+'lid\x201px\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'#ffffff;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20z-ind'+'ex:\x20100003'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.top'+'-left,\x20&.b'+'ottom-righ'+'t\x20{\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20se-resize'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op-right,\x20'+'&.bottom-l'+'eft\x20{\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&:hov'+'er\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20nesw-re'+'size;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.re'+'ference-li'+'nes_drag\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20w'+'idth:\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x200px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20top:\x200px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20border:\x20s'+'olid\x201px\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20z-in'+'dex:\x2011;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20rgba('+'73,\x207,\x20218'+',\x20.05);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'toolbar\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20')+(this['toolbarPla'+'cement']==='float'?'inline':'block')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20posi'+'tion:\x20abso'+'lute;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'top:\x20')+(this['toolbarPla'+'cement']==='float'?-125*-5+0x92c+0x3df*-3:'10px')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20')+(this['toolbarPla'+'cement']==='float'?'':'width:\x20100'+'%;')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ext-align:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20ponter-'+'events:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20z-'+'index:\x20100'+'005;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.inner\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-flex;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20gap:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'padding:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-rad'+'ius:\x208px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20tran'+'slate:\x200px'+'\x200px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20rgba(2'+'55,255,255'+',.5);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backdrop'+'-filter:\x20b'+'lur(25px);'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20box'+'-shadow:\x200'+'\x204px\x206px\x20-'+'1px\x20rgb(0\x20'+'0\x200\x20/\x200.1)'+',\x200\x202px\x204p'+'x\x20-2px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20ponter'+'-events:\x20a'+'uto;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.group\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20gap:\x204px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'align-item'+'s:\x20center;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.div'+'ider\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20wid'+'th:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20#D1D5'+'DC;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.toolba'+'r-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20in'+'line-flex;'+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20padding:\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20pointer'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20#F3'+'F4F6;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20&'+':active\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20#E5E7E'+'B;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&.acti'+'ve\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.too'+'lbar-item\x20'+'{\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20'))+colors['primary']+(';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20svg\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20#ffffff;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20.m'+'easure-lin'+'es\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0006;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.solid\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ite'+'m\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20left:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100005;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x204px\x2012'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'y;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'bottom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.b'+'ottom\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x204px'+'\x2012px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-y;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20bottom,'+'\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.l'+'eft\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'size:\x2012px'+'\x204px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-rep'+'eat:\x20repea'+'t-x;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-imag'+'e:\x20linear-'+'gradient(t'+'o\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.r'+'ight\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x2012p'+'x\x204px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-x;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.da'+'shed\x20{\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.item\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'visibility'+':\x20hidden;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20left:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0005;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.hor'+'izontal-to'+'p\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x2012px\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.horiz'+'ontal-bott'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x201px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground-s'+'ize:\x2012px\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-repe'+'at:\x20repeat'+'-x;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-image'+':\x20linear-g'+'radient(to'+'\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-left\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x201p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-size:\x20'+'4px\x2012px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-repeat:\x20r'+'epeat-y;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'image:\x20lin'+'ear-gradie'+'nt(to\x20bott'+'om,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-right\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-size:'+'\x204px\x2012px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20backgroun'+'d-repeat:\x20'+'repeat-y;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-image:\x20li'+'near-gradi'+'ent(to\x20bot'+'tom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.number'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20v'+'isibility:'+'\x20hidden;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20top:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'font-size:'+'\x2010px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20padding'+':2px\x204px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-radiu'+'s:\x204px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20color:'+'\x20#FFFFFF;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.measur'+'e-target-o'+'utline\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20visibil'+'ity:\x20hidde'+'n;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bor'+'der:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20box-'+'sizing:\x20bo'+'rder-box;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20pointer'+'-events:\x20n'+'one\x20!impor'+'tant;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'z-index:\x201'+'00006;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.actio'+'ns\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20a'+'bsolute;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20left:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.action'+'s-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20paddi'+'ng:\x204px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20translate'+':\x200px\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kdrop-filt'+'er:\x20blur(2'+'5px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20z-index:'+'\x20100004;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20line-'+'height:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20cur'+'sor:\x20point'+'er;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20svg\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&:h'+'over\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:activ'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20')+colors['redActive']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'loading\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20width:\x20'+'100%;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x2010'+'0%;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'rgba(255,2'+'55,255,.5)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'drop-filte'+'r:\x20blur(25'+'px);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20fl'+'ex;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20al'+'ign-items:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20z-index'+':\x20100007;\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20.inne'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'display:\x20i'+'nline-flex'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ju'+'stify-cont'+'ent:\x20cente'+'r;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20a'+'lign-items'+':\x20center;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20anim'+'ation:\x20rot'+'ate360\x201s\x20'+'linear\x20inf'+'inite;\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20img\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x2036px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2036p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20.slot\x20{}'+'\x0a\x20\x20\x20\x20\x20\x20</s'+'tyle>\x0a\x20\x20\x20\x20');}['onceBindin'+'gs'](){const _0x1201fe=this['shadowRoot'];if(_0x1201fe===null)return;let _0x27e580=_0x1201fe['querySelec'+'tor']('.main');if(_0x27e580!==null&&_0x27e580!==undefined){const {width:_0x51028f,height:_0x525e68}=_0x27e580['getBoundin'+'gClientRec'+'t']();this['registered']['main']={'id':'main','el':_0x27e580,'x':0x0,'y':0x0,'width':_0x51028f,'height':_0x525e68,'type':'main'};}this['isToolbar']&&(_0x27e580=_0x1201fe['querySelec'+'tor']('.toolbar'),_0x27e580!==null&&(this['elToolbar']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.aligns'),_0x27e580!==null&&(this['elAligns']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure'),_0x27e580!==null&&(this['elMeasure']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-t'+'arget-outl'+'ine'),_0x27e580!==null&&(this['elMeasureO'+'utline']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.top'),_0x27e580!==null&&(this['elMeasureL'+'ines']['solid_t']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.bott'+'om'),_0x27e580!==null&&(this['elMeasureL'+'ines']['solid_b']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.left'),_0x27e580!==null&&(this['elMeasureL'+'ines']['solid_l']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.righ'+'t'),_0x27e580!==null&&(this['elMeasureL'+'ines']['solid_r']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-top'),_0x27e580!==null&&(this['elMeasureL'+'ines']['dashed_h_t']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-bot'+'tom'),_0x27e580!==null&&(this['elMeasureL'+'ines']['dashed_h_b']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-left'),_0x27e580!==null&&(this['elMeasureL'+'ines']['dashed_v_l']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-right'),_0x27e580!==null&&(this['elMeasureL'+'ines']['dashed_v_r']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-top'),_0x27e580!==null&&(this['elMeasureL'+'ines']['numberT']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-bottom'),_0x27e580!==null&&(this['elMeasureL'+'ines']['numberB']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-left'),_0x27e580!==null&&(this['elMeasureL'+'ines']['numberL']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-right'),_0x27e580!==null&&(this['elMeasureL'+'ines']['numberR']=_0x27e580)),_0x27e580=_0x1201fe['querySelec'+'tor']('.left'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'l')&&(this['elSelected'+'Lines']['l']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.right'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'r')&&(this['elSelected'+'Lines']['r']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.top'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'t')&&(this['elSelected'+'Lines']['t']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.bottom'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'b')&&(this['elSelected'+'Lines']['b']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.top-left'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'tl')&&(this['elSelected'+'Vectors']['tl']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.top-right'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'tr')&&(this['elSelected'+'Vectors']['tr']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.bottom-le'+'ft'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'bl')&&(this['elSelected'+'Vectors']['bl']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.bottom-ri'+'ght'),_0x27e580!==null&&!HasOwn(this['elSelected'+'Lines'],'br')&&(this['elSelected'+'Vectors']['br']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('.reference'+'-lines_dra'+'g'),_0x27e580!==null&&this['rDrags']===null&&(this['rDrags']=_0x27e580),_0x27e580=_0x1201fe['querySelec'+'tor']('#actions'),_0x27e580!==null&&(this['elActions']=_0x27e580);}['countLoadi'+'ngItems'](){const _0xfb1418=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0xfb1418===null||_0xfb1418===undefined)return;const _0x2e66c3=_0xfb1418['assignedNo'+'des']({'flatten':![]});for(const _0x378f2e in _0x2e66c3){const _0x360791=_0x2e66c3[_0x378f2e];if(_0x360791['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x1233e6=_0x360791['getAttribu'+'te']('type');_0x1233e6==='image'&&this['loadingIte'+'ms']['image']['total']++,(_0x1233e6===null||_0x1233e6==='general')&&this['loadingIte'+'ms']['general']['total']++;}}['hideLoadin'+'g'](){if(this['loadingIte'+'ms']['general']['loaded']===this['loadingIte'+'ms']['general']['total']&&this['loadingIte'+'ms']['image']['loaded']===this['loadingIte'+'ms']['image']['total']){const _0x34a871=this['shadowRoot']?.['querySelec'+'tor']('.loading');_0x34a871!==null&&_0x34a871!==undefined&&(_0x34a871['style']['display']='none');}}['renderItem'+'s'](){const _0x38706c=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x38706c===null||_0x38706c===undefined)return;const _0x22ed47=_0x38706c['assignedNo'+'des']({'flatten':![]});for(const _0x3dc9b9 in _0x22ed47){const _0x5d0005=_0x22ed47[_0x3dc9b9];if(_0x5d0005['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x471187=_0x5d0005['getAttribu'+'te']('type');(_0x471187===null||_0x471187==='general')&&(this['renderItem'](_0x5d0005),this['hideLoadin'+'g']());if(_0x471187==='image'){if(_0x5d0005['querySelec'+'tor']('canvas'))continue;this['renderImag'+'eItem'](_0x5d0005)['then'](()=>{this['hideLoadin'+'g']();});}}}['renderItem'](_0x56871c){const _0xede5c3=_0x56871c['getBoundin'+'gClientRec'+'t']();let _0x56724=_0xede5c3['width'],_0x49ca0d=_0xede5c3['height'];const _0x1035ac=_0x56871c['getAttribu'+'te']('left'),_0x228195=_0x56871c['getAttribu'+'te']('top'),_0x38bcaa=_0x56871c['getAttribu'+'te']('width'),_0x5c111d=_0x56871c['getAttribu'+'te']('height');let _0xfe81bf=-2*-1981+-7232+0xcc6,_0x1bf42d=-377*0x1+-4849+0x27*0x86;_0x1035ac!==null&&(_0xfe81bf=_0x1035ac);_0x228195!==null&&(_0x1bf42d=_0x228195);_0x38bcaa!==null&&(_0x56724=_0x38bcaa);_0x5c111d!==null&&(_0x49ca0d=_0x5c111d);if(_0x56871c['style']['translate']!==''){const _0x3e612c=window['getCompute'+'dStyle'](_0x56871c),_0x3a50c6=this['getTransla'+'tePos'](_0x3e612c['translate']);_0xfe81bf=_0x3a50c6['x'],_0x1bf42d=_0x3a50c6['y'];}_0xfe81bf=Math['round'](_0xfe81bf),_0x1bf42d=Math['round'](_0x1bf42d),_0x56724=Math['round'](_0x56724),_0x49ca0d=Math['round'](_0x49ca0d),this['registered'][_0x56871c['id']]={'id':_0x56871c['id'],'el':_0x56871c,'x':_0xfe81bf,'y':_0x1bf42d,'width':_0x56724,'height':_0x49ca0d,'type':'text'},this['loadingIte'+'ms']['general']['loaded']++,_0x56871c['style']['visibility']='visible',_0x56871c['style']['translate']=_0xfe81bf+'px\x20'+_0x1bf42d+'px',_0x56871c['style']['width']=_0x56724+'px',_0x56871c['style']['height']=_0x49ca0d+'px';}['renderImag'+'eItem'](_0x17d38f){return new Promise(_0x4ea986=>{if(_0x17d38f['nodeType']===Node['ELEMENT_NO'+'DE']){const _0x18cce6=document['createElem'+'ent']('canvas');_0x18cce6['style']['cssText']='width:\x20100'+'%;\x20height:'+'\x20100%;';const _0x4e088d=_0x18cce6['getContext']('2d'),_0x327c96=_0x17d38f['querySelec'+'tor']('img'),_0x4628a8=new Image();_0x4628a8['src']=_0x327c96['src'];const _0x2e5bf1=_0x17d38f['getElement'+'sByTagName']('img');Array['from'](_0x2e5bf1)['forEach'](_0x2055c6=>{_0x2055c6['remove']();}),_0x4628a8['onload']=()=>{let _0x2eb7e5=-1*-5903+-435+0xaae*-2,_0x1c65f8=0x203+0x7*0x571+0x6*-1711;const _0x61f084=_0x17d38f['getAttribu'+'te']('left'),_0x3bbfc9=_0x17d38f['getAttribu'+'te']('top'),_0x5e3c29=_0x17d38f['getAttribu'+'te']('width'),_0x293536=_0x17d38f['getAttribu'+'te']('height');_0x61f084!==null&&(_0x2eb7e5=_0x61f084);_0x3bbfc9!==null&&(_0x1c65f8=_0x3bbfc9);if(_0x17d38f['style']['translate']!==''){const _0x30fb6d=window['getCompute'+'dStyle'](_0x17d38f),_0x8f7418=this['getTransla'+'tePos'](_0x30fb6d['translate']);_0x2eb7e5=_0x8f7418['x'],_0x1c65f8=_0x8f7418['y'];}const _0x1fa03b=_0x4628a8['width']/_0x4628a8['height'];let _0x177da8=_0x4628a8['width'],_0x133e54=_0x4628a8['height'];if(_0x5e3c29!==null&&_0x293536!==null)_0x177da8=_0x5e3c29,_0x133e54=_0x177da8/_0x1fa03b,_0x17d38f['style']['width']=Math['round'](_0x177da8)+'px',_0x17d38f['style']['height']=Math['round'](_0x133e54)+'px';else {if(_0x5e3c29!==null&&_0x293536===null)_0x177da8=_0x5e3c29,_0x133e54=_0x177da8/_0x1fa03b,_0x17d38f['style']['width']=Math['round'](_0x177da8)+'px',_0x17d38f['style']['height']=Math['round'](_0x133e54)+'px';else _0x5e3c29===null&&_0x293536!==null?(_0x133e54=_0x293536,_0x177da8=_0x133e54*_0x1fa03b,_0x17d38f['style']['width']=Math['round'](_0x177da8)+'px',_0x17d38f['style']['height']=Math['round'](_0x133e54)+'px'):(_0x17d38f['style']['width']=Math['round'](_0x177da8)+'px',_0x17d38f['style']['height']=Math['round'](_0x133e54)+'px');}_0x2eb7e5=Math['round'](_0x2eb7e5),_0x1c65f8=Math['round'](_0x1c65f8),_0x177da8=Math['round'](_0x177da8),_0x133e54=Math['round'](_0x133e54),this['registered'][_0x17d38f['id']]={'id':_0x17d38f['id'],'el':_0x17d38f,'x':_0x2eb7e5,'y':_0x1c65f8,'width':_0x177da8,'height':_0x133e54,'type':'image'};const _0x4b744a=Math['min'](window['innerWidth']/_0x4628a8['width'],window['innerHeigh'+'t']/_0x4628a8['height']),_0x875b33=Math['round'](_0x4628a8['width']*_0x4b744a),_0x56e1a9=Math['round'](_0x4628a8['height']*_0x4b744a);_0x18cce6['width']=_0x875b33,_0x18cce6['height']=_0x56e1a9,_0x4e088d?.['drawImage'](_0x4628a8,-797*0x3+-1*0xcf5+0x164c,-8800*-1+-14*-562+-16668,_0x875b33,_0x56e1a9),_0x17d38f['appendChil'+'d'](_0x18cce6),this['selected']['ids']['length']>-5658+-7538*-1+-1880&&(this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()),this['loadingIte'+'ms']['image']['loaded']++,_0x17d38f['style']['visibility']='visible',_0x17d38f['style']['translate']=_0x2eb7e5+'px\x20'+_0x1c65f8+'px',_0x17d38f['style']['width']=_0x177da8+'px',_0x17d38f['style']['height']=_0x133e54+'px',_0x4ea986('');};}});}['initKeyboa'+'rdEvents'](){document['addEventLi'+'stener']('keydown',_0x439634=>{switch(_0x439634['keyCode']){case 0x2161+0x1*-8240+-1*0x10c:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x154eb1 of this['selected']['ids']){this['registered'][_0x154eb1]['x']--,this['registered'][_0x154eb1]['el']['style']['translate']=this['registered'][_0x154eb1]['x']+'px\x20'+this['registered'][_0x154eb1]['y']+'px';}this['selected']['x']--;}break;case  -3228+0x1824+-2914:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x10c0fc of this['selected']['ids']){this['registered'][_0x10c0fc]['y']--,this['registered'][_0x10c0fc]['el']['style']['translate']=this['registered'][_0x10c0fc]['x']+'px\x20'+this['registered'][_0x10c0fc]['y']+'px';}this['selected']['y']--;}break;case 0x191d*0x1+0x2f1+0x3*-2381:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x20ca5d of this['selected']['ids']){this['registered'][_0x20ca5d]['x']++,this['registered'][_0x20ca5d]['el']['style']['translate']=this['registered'][_0x20ca5d]['x']+'px\x20'+this['registered'][_0x20ca5d]['y']+'px';}this['selected']['x']++;}break;case  -334+0x1*0x1ec4+-22*0x155:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x53e149 of this['selected']['ids']){this['registered'][_0x53e149]['y']++,this['registered'][_0x53e149]['el']['style']['translate']=this['registered'][_0x53e149]['x']+'px\x20'+this['registered'][_0x53e149]['y']+'px';}this['selected']['y']++;}break;}this['renderSele'+'ctedRefere'+'nce'](),this['measureExe'+'cute'](),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position']();});}['onSlotChan'+'ge'](){const _0x90e12=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x90e12===null||_0x90e12===undefined)return;_0x90e12?.['addEventLi'+'stener']('slotchange',()=>{this['countLoadi'+'ngItems'](),this['renderItem'+'s'](),!this['isInit']&&(this['onceBindin'+'gs'](),this['isInit']=!![]);});}['getSelecte'+'dParams'](){let _0x35a618={'x':0x0,'y':0x0},_0x490e81={'x':0x0,'y':0x0};for(let _0x3dfdd7=-501*0xb+0x507+-32*-132;_0x3dfdd7<this['selected']['ids']['length'];_0x3dfdd7++){const _0x4701ba=this['selected']['ids'][_0x3dfdd7];if(_0x3dfdd7===0x8dd*0x2+0x1*0x87d+-6711)_0x35a618={'x':this['registered'][_0x4701ba]['x'],'y':this['registered'][_0x4701ba]['y']},_0x490e81={'x':this['registered'][_0x4701ba]['x']+this['registered'][_0x4701ba]['width'],'y':this['registered'][_0x4701ba]['y']+this['registered'][_0x4701ba]['height']};else {const _0x585b9f=this['registered'][_0x4701ba]['x'],_0x5766f2=this['registered'][_0x4701ba]['y'];_0x35a618={'x':_0x585b9f<_0x35a618['x']?_0x585b9f:_0x35a618['x'],'y':_0x5766f2<_0x35a618['y']?_0x5766f2:_0x35a618['y']};const _0x3fbb38=this['registered'][_0x4701ba]['x']+this['registered'][_0x4701ba]['width'],_0x35996f=this['registered'][_0x4701ba]['y']+this['registered'][_0x4701ba]['height'];_0x490e81={'x':_0x3fbb38>=_0x490e81['x']?_0x3fbb38:_0x490e81['x'],'y':_0x35996f>=_0x490e81['y']?_0x35996f:_0x490e81['y']};}}const _0x536e30=_0x490e81['x']-_0x35a618['x'],_0x3e9188=_0x490e81['y']-_0x35a618['y'];this['selected']={...this['selected'],...{'x':_0x35a618['x'],'y':_0x35a618['y'],'width':_0x536e30,'height':_0x3e9188}};}['renderSele'+'ctedRefere'+'nce'](){this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-6406+-1*0x11b+-6691*-1)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['l']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x2*0x607+-17*-427+-1*0x2867)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x1885*0x1+-3*-1693+-2*0x162d))+'px',this['elSelected'+'Lines']['t']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x14b*-17+0x4*-658+0x2045))+'px',this['elSelected'+'Lines']['b']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';}['isSelected'+'Item'](_0x116f2a,_0x39d1fa){const _0x477b87=[{'x':_0x116f2a['x'],'y':_0x116f2a['y']},{'x':_0x116f2a['x']+_0x116f2a['width'],'y':_0x116f2a['y']},{'x':_0x116f2a['x'],'y':_0x116f2a['y']+_0x116f2a['height']},{'x':_0x116f2a['x']+_0x116f2a['width'],'y':_0x116f2a['y']+_0x116f2a['height']}];for(let _0xbe97d4=-91*-61+0x8*0x494+-14927;_0xbe97d4<_0x477b87['length'];_0xbe97d4++){const _0x6dc5b3=_0x477b87[_0xbe97d4];if(this['isPointInR'+'ectangle'](_0x6dc5b3,_0x39d1fa))return !![];}return ![];}['renderDrag'+'SelectRefe'+'renceLine'](_0x12a315,_0x3886ab){const _0x6bb10d=this['shadowRoot'];if(_0x6bb10d===null)return;const _0x2fb06b=_window['getCompute'+'dStyle'](this['rDrags']);_0x2fb06b['visibility']!=='visible'&&(this['rDrags']['style']['visibility']='visible');dragBeginPos['x']===-1&&(dragBeginPos['x']=_0x12a315['clientX'],dragBeginPos['y']=_0x12a315['clientY']);const _0x26fffd={'x':dragBeginPos['x'],'y':dragBeginPos['y']},_0x47d396={'x':-1,'y':-1,'width':0x0,'height':0x0};_0x12a315['clientX']>_0x26fffd['x']?(_0x47d396['x']=_0x26fffd['x']-_0x3886ab['x'],_0x47d396['width']=_0x12a315['clientX']-_0x26fffd['x']):(_0x47d396['x']=_0x12a315['clientX']-_0x3886ab['x'],_0x47d396['width']=_0x26fffd['x']-_0x12a315['clientX']);_0x12a315['clientY']>_0x26fffd['y']?(_0x47d396['y']=_0x26fffd['y']-_0x3886ab['y'],_0x47d396['height']=_0x12a315['clientY']-_0x26fffd['y']):(_0x47d396['y']=_0x12a315['clientY']-_0x3886ab['y'],_0x47d396['height']=_0x26fffd['y']-_0x12a315['clientY']);this['rDrags']['style']['translate']=_0x47d396['x']+'px\x20'+_0x47d396['y']+'px',this['rDrags']['style']['width']=_0x47d396['width']+'px',this['rDrags']['style']['height']=_0x47d396['height']+'px';const _0x69a26f=_0x6bb10d['querySelec'+'tor']('slot');if(_0x69a26f===null)return;const _0x193bc6=Object['values'](_0x2521b1(this['registered']));for(let _0x32cc02=0xecc+-1*-8542+-12330;_0x32cc02<_0x193bc6['length'];_0x32cc02++){if(this['isSelected'+'Item'](_0x193bc6[_0x32cc02],_0x47d396))this['selected']['ids']['indexOf'](_0x193bc6[_0x32cc02]['id'])===-1&&this['selected']['ids']['push'](_0x193bc6[_0x32cc02]['id']);else {const _0x264c80=this['selected']['ids']['indexOf'](_0x193bc6[_0x32cc02]['id']);_0x264c80!==-1&&this['selected']['ids']['splice'](_0x264c80,-6103*-1+-199*-47+-15455);}}this['selected']['ids']['length']>0x973+-1*0xf94+-523*-3?this['triggerSel'+'ectedLines'+'Vectors']('show'):this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x4980a1=this['selected']['ids']['map'](_0x2dd2fe=>{return {'id':_0x2dd2fe,'type':this['registered'][_0x2dd2fe]['type']};}),_0x5b0e9a=new CustomEvent('onSelect',{'detail':_0x4980a1});this['dispatchEv'+'ent'](_0x5b0e9a),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['isPointInR'+'ectangle'](_0x5deaa7,_0x1b0f26){if(_0x5deaa7['x']>_0x1b0f26['x']&&_0x5deaa7['x']<_0x1b0f26['x']+_0x1b0f26['width']&&_0x5deaa7['y']>_0x1b0f26['y']&&_0x5deaa7['y']<_0x1b0f26['y']+_0x1b0f26['height'])return !![];return ![];}['handleClic'+'k'](){const _0x4d6cd7=this['shadowRoot'];if(_0x4d6cd7===null)return;_0x4d6cd7['addEventLi'+'stener']('mousedown',_0x55012e=>{_0x55012e['preventDef'+'ault']();const _0x3878e1=this['shadowRoot'];if(_0x3878e1===null)return;this['hasMoved']=![],this['hasSelecte'+'d']=![],this['latestSele'+'cted']=_0x2521b1(this['selected']);const _0x230a8f=this['getBoundin'+'gClientRec'+'t'](),_0x55c8e0={'x':_0x55012e['clientX']-_0x230a8f['x'],'y':_0x55012e['clientY']-_0x230a8f['y']},_0x1c613d=_0x55012e['target']['closest']('glide-dnr-'+'item');let _0x27163f='';this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=-7964+0x1064+0xeb8,this['elMeasureO'+'utline']['style']['height']=0x1*-6841+0x15a3+0x5d*0xe,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');this['isActions']&&(this['elActions']['style']['visibility']='hidden',this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['removeEven'+'tListener']('click',this['delete']));if(_0x1c613d)this['mouseTarge'+'t']='elements',this['mouseDownE'+'lement'](_0x1c613d);else {if(_0x55012e['target']['closest']('.line')){this['mouseTarge'+'t']='line';if(_0x55012e['target']['classList']['contains']('left'))_0x27163f='l';else {if(_0x55012e['target']['classList']['contains']('right'))_0x27163f='r';else {if(_0x55012e['target']['classList']['contains']('top'))_0x27163f='t';else _0x55012e['target']['classList']['contains']('bottom')&&(_0x27163f='b');}}}else {if(_0x55012e['target']['closest']('.vector')){this['mouseTarge'+'t']='vector';if(_0x55012e['target']['classList']['contains']('top-left'))_0x27163f='tl';else {if(_0x55012e['target']['classList']['contains']('top-right'))_0x27163f='tr';else {if(_0x55012e['target']['classList']['contains']('bottom-lef'+'t'))_0x27163f='bl';else _0x55012e['target']['classList']['contains']('bottom-rig'+'ht')&&(_0x27163f='br');}}}else {if(_0x55012e['target']['closest']('.actions-i'+'tem'))this['triggerAct'+'ions']();else {if(_0x55012e['target']['closest']('.toolbar-i'+'tem'))_0x55012e['target']['closest']('.horizonta'+'l-left')&&this['shortcuts']('horizontal','begin'),_0x55012e['target']['closest']('.horizonta'+'l-center')&&this['shortcuts']('horizontal','middle'),_0x55012e['target']['closest']('.horizonta'+'l-right')&&this['shortcuts']('horizontal','end'),_0x55012e['target']['closest']('.horizonta'+'l-distribu'+'te')&&this['shortcuts']('horizontal','distribute'),_0x55012e['target']['closest']('.vertical-'+'top')&&this['shortcuts']('vertical','begin'),_0x55012e['target']['closest']('.vertical-'+'center')&&this['shortcuts']('vertical','middle'),_0x55012e['target']['closest']('.vertical-'+'bottom')&&this['shortcuts']('vertical','end'),_0x55012e['target']['closest']('.vertical-'+'distribute')&&this['shortcuts']('vertical','distribute'),_0x55012e['target']['closest']('.measure')&&this['shortcuts']('','measure');else _0x230a8f&&(this['mouseTarge'+'t']='elements',this['isInSelect'+'ed']=this['isPointInR'+'ectangle'](_0x55c8e0,this['selected']),!this['isInSelect'+'ed']&&(this['selected']=_0x2521b1(originSelected),this['renderSele'+'ctedRefere'+'nce']()));}}}}this['selected']['ids']['length']>0x7f1*-3+-2534+0x1*0x21b9&&(this['hasSelecte'+'d']=!![]);const _0x46f788={'x':Math['round'](_0x55012e['clientX']-this['selected']['x']),'y':Math['round'](_0x55012e['clientY']-this['selected']['y'])},_0x5634b7={'x':Math['round'](_0x55012e['clientX']),'y':Math['round'](_0x55012e['clientY'])},_0x373a61=_0x2521b1(this['selected']),_0x4e15de=_0x2521b1(this['registered']),_0x18b944=_0x373a61['width']/_0x373a61['height'];document['onmousemov'+'e']=_0x4a2724=>{_0x4a2724['preventDef'+'ault'](),_0x4a2724['stopPropag'+'ation'](),this['mouseMoveT'+'ype']='main',this['hasMoved']=!![],this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['requestAni'+'mation']=requestAnimationFrame(()=>{this['isToolbar']&&(this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));const _0x4cad2c={'x':Math['round'](_0x4a2724['clientX']),'y':Math['round'](_0x4a2724['clientY'])};switch(this['mouseTarge'+'t']){case 'elements':this['hasSelecte'+'d']&&this['isInSelect'+'ed']?(this['moveElemen'+'ts']({'x':Math['round'](_0x4a2724['clientX']),'y':Math['round'](_0x4a2724['clientY'])},_0x46f788,_0x4e15de),this['referenceA'+'lignLinesV'+'ectors'](_0x4e15de,_0x373a61)):this['renderDrag'+'SelectRefe'+'renceLine'](_0x4a2724,_0x230a8f);break;case 'line':this['moveLines'](_0x27163f,_0x4e15de,_0x373a61,_0x5634b7,_0x4cad2c);break;case 'vector':this['moveVector'+'s'](_0x27163f,_0x4e15de,_0x373a61,_0x5634b7,_0x4cad2c,_0x18b944);break;}});},document['onmouseup']=()=>{document['onmousemov'+'e']=null,document['onmouseup']=null,this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['mouseUpEle'+'ment'](_0x4e15de);};});}['getTransla'+'tePos'](_0x71274e){let _0x4a726b=-1,_0x587338=-1;if(_0x71274e!=='none'){if(_0x71274e['indexOf']('\x20')>-1){const _0x573f1f=_0x71274e['split']('\x20');_0x4a726b=parseFloat(_0x573f1f[-1*0xbbd+-1*0x167f+0x88f*0x4]['replace']('px','')),_0x587338=parseFloat(_0x573f1f[0x125+-1649*-1+-1941*0x1]['replace']('px',''));}else _0x4a726b=parseFloat(_0x71274e['replace']('px',''));}return {'x':_0x4a726b,'y':_0x587338};}['mouseDownE'+'lement'](_0x9593fa){if(this['selected']['ids']['indexOf'](_0x9593fa['id'])===-1){this['selected']['ids']=[_0x9593fa['id']];const _0x293bcf=this['selected']['ids']['map'](_0x51c895=>{return {'id':_0x51c895,'type':this['registered'][_0x51c895]['type']};}),_0x1be2b8=new CustomEvent('onSelect',{'detail':_0x293bcf});this['dispatchEv'+'ent'](_0x1be2b8),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}this['isInSelect'+'ed']=!![];if(this['lastClickT'+'ime']===-1)this['lastClickT'+'ime']=new Date()['getTime']();else {const _0x22de18=new Date()['getTime']()-this['lastClickT'+'ime'];if(_0x22de18>0x1efc+-5*-509+-1717*0x6)this['lastClickT'+'ime']=new Date()['getTime']();else {this['lastClickT'+'ime']=-1;if(this['selected']['ids']['indexOf'](_0x9593fa['id'])>-1){this['selected']['ids']=[_0x9593fa['id']];const _0x185388=this['selected']['ids']['map'](_0x39d3e9=>{return {'id':_0x39d3e9,'type':this['registered'][_0x39d3e9]['type']};}),_0xb38ecf=new CustomEvent('onSelect',{'detail':_0x185388});this['dispatchEv'+'ent'](_0xb38ecf),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}}}}['mouseUpEle'+'ment'](_0x250a34){if(this['hasMoved']){this['lastClickT'+'ime']=-1,dragBeginPos={'x':-1,'y':-1},this['rDrags']['style']['visibility']='hidden',this['rDrags']['style']['translate']='-1px\x20-1px',this['rDrags']['style']['width']='0',this['rDrags']['style']['height']='0';if(this['mouseTarge'+'t']==='elements')for(let _0x3de35f of this['selected']['ids']){this['registered'][_0x3de35f]['x']=_0x250a34[_0x3de35f]['x'],this['registered'][_0x3de35f]['y']=_0x250a34[_0x3de35f]['y'];}(this['mouseTarge'+'t']==='line'||this['mouseTarge'+'t']==='vector')&&(this['registered']=_0x2521b1(_0x250a34),this['getSelecte'+'dParams']());const _0x22439a=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor');_0x22439a!==undefined&&_0x22439a['forEach'](_0x309c4b=>{_0x309c4b['remove']();});const _0x4349ab=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e');_0x4349ab!==undefined&&_0x4349ab['forEach'](_0x25fc20=>{_0x25fc20['remove']();});}if(this['selected']['ids']['length']>-8046+0xe21*0x1+0x114d)this['isToolbar']&&!(this['selected']['ids']['length']===-4761+-6811+-11573*-1&&!this['isMeasure'])&&(this['selected']['ids']['length']>0x4*0x349+-5260+0x769*0x1?this['elAligns']['style']['display']!=='inline-fle'+'x'&&(this['elAligns']['style']['display']='inline-fle'+'x'):this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='inline-fle'+'x'&&(this['elMeasure']['style']['display']='inline-fle'+'x')),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position'](),this['elToolbar']['style']['visibility']!=='visible'&&(this['elToolbar']['style']['visibility']='visible')),this['triggerSel'+'ectedLines'+'Vectors']('show');else {this['isToolbar']&&!(this['selected']['ids']['length']===-1298+0xf23+-2576&&!this['isMeasure'])&&(this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='none'&&(this['elMeasure']['style']['display']='none')),this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x336d2b=new CustomEvent('onSelect',{'detail':[]});this['dispatchEv'+'ent'](_0x336d2b);}this['mouseMoveT'+'ype']='',this['isActions']&&this['triggerAct'+'ions']();}['setToolbar'+'Position'](){const _0x4d4fe7=window['getCompute'+'dStyle'](this['elToolbar']),_0x392953=parseFloat(_0x4d4fe7['width']['replace']('px',''));this['elToolbar']['style']['translate']=this['selected']['x']+this['selected']['width']/(-2558+0x379*0x9+-1*0x1541)-_0x392953/(0x117f+0x1d3a+0x2eb7*-1)+'px\x20'+(this['selected']['y']-(0x39*-121+0x1a*-151+0x1*0x2a71))+'px';}['triggerAct'+'ions'](){this['selected']['ids']['length']>-1*-2819+-3*-1759+0x58*-92?(this['elActions']['style']['translate']=this['selected']['x']+this['selected']['width']+(0x1705+-6213+0x146)+'px\x20'+this['selected']['y']+'px',this['elActions']['style']['visibility']='visible',this['elActions']['style']['pointerEve'+'nts']='auto',this['elActions']['addEventLi'+'stener']('click',this['delete'])):(this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['style']['visibility']='hidden',this['elActions']['removeEven'+'tListener']('click',this['delete']));}['moveElemen'+'ts'](_0xc0f953,_0x2ac93c,_0x4c9b4d){const _0x418885=_0xc0f953['x']-_0x2ac93c['x'],_0x3437bf=_0xc0f953['y']-_0x2ac93c['y'],_0x386ec1=_0x418885+this['selected']['width'],_0x495f1c=_0x3437bf+this['selected']['height'],_0x2716a4=this['registered']['main']['x']+this['registered']['main']['width'],_0x1a701c=this['registered']['main']['x']+this['registered']['main']['height'];this['selected']['x']=_0x418885,this['selected']['y']=_0x3437bf;_0x418885<=-1*-8461+0x12*-237+0x1063*-1&&(this['selected']['x']=-464*0x3+-6414+0x1e7e);_0x386ec1>=_0x2716a4&&(this['selected']['x']=_0x2716a4-this['selected']['width']);_0x3437bf<=0x248*0x3+-5*0x8b+-1057&&(this['selected']['y']=0xd*0x1fc+-6880+0x114);_0x495f1c>=_0x1a701c&&(this['selected']['y']=_0x1a701c-this['selected']['height']);this['triggerSel'+'ectedLines'+'Vectors']('hide'),this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(0x349*0x3+0x43f+-164*0x16)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(-9500+0x961+0x9*0x315)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-67*0x3d+0xa2+0x7*0x231))+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x13*-18+-738*0x7+0x1586))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';for(let _0x41322d of this['selected']['ids']){this['selected']['ids']['length']===-1*0x1a26+0x1a26*-1+0x344d?(_0x4c9b4d[_0x41322d]['x']=this['selected']['x'],_0x4c9b4d[_0x41322d]['y']=this['selected']['y']):(_0x4c9b4d[_0x41322d]['x']=this['registered'][_0x41322d]['x']-this['latestSele'+'cted']['x']+this['selected']['x'],_0x4c9b4d[_0x41322d]['y']=this['registered'][_0x41322d]['y']-this['latestSele'+'cted']['y']+this['selected']['y']);_0x4c9b4d[_0x41322d]['el']['style']['translate']=_0x4c9b4d[_0x41322d]['x']+'px\x20'+_0x4c9b4d[_0x41322d]['y']+'px';const _0x3695fd=new CustomEvent('onChange',{'detail':{'id':_0x41322d,'type':'move','x':_0x4c9b4d[_0x41322d]['x'],'y':_0x4c9b4d[_0x41322d]['y'],'width':_0x4c9b4d[_0x41322d]['width'],'height':_0x4c9b4d[_0x41322d]['height']}});this['dispatchEv'+'ent'](_0x3695fd);}}['moveLines'](_0x137f5f,_0xa1e41,_0x425ae5,_0x1f9dff,_0x37f717){let _0xe3bd75=0x1bb6*-1+0x158c+0x1*0x62a,_0x56ce57=0x5dd+0xc1d+-4602,_0x503843=-3144+0x256a+0xc91*-2,_0x5598cb=-6602*-1+0x9*-208+0x5*-946;_0x56ce57=_0x37f717['y']-(_0x37f717['y']-_0x425ae5['y']);const _0x38dacc=_0x37f717['x']-_0x1f9dff['x'],_0xc7bd1c=_0x37f717['y']-_0x1f9dff['y'],_0x1bf48b=_0x38dacc/_0x425ae5['width'],_0x21a85c=_0xc7bd1c/_0x425ae5['height'];switch(_0x137f5f){case 'l':_0xe3bd75=_0x425ae5['x']+_0x38dacc,_0x503843=_0x425ae5['x']-_0xe3bd75+_0x425ae5['width'],this['elSelected'+'Lines']['l']['style']['translate']=_0xe3bd75-(0x74a+0x3*0x50+-263*0x8+0.5)+'px\x20'+_0x56ce57+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x503843+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0xe3bd75-(0xd*0x256+-5146+-2626+0.5)+'px\x20'+(_0x56ce57-(-1*-9799+0xe3e+0x3*-4481+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x503843+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0xe3bd75-(-5594+-6665+0x2fe5+0.5)+'px\x20'+(_0x56ce57+_0x425ae5['height']-(-820+-20*-399+0x952*-3+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0xe3bd75-(-749+0x1883+0x1592*-1)+'px\x20'+(_0x56ce57-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0xe3bd75-(0x24c6+-184*0x31+-394)+'px\x20'+(_0x56ce57+_0x425ae5['height']-vectorOffset)+'px';for(const _0x546fea of _0x425ae5['ids']){const _0x384db4=this['registered'][_0x546fea],_0x285ff3=_0x384db4['width']*(0x3f8*-2+0x2383*0x1+-2*0xdc9-_0x1bf48b),_0x4920ed=_0x384db4['x']+_0x38dacc*(-3150+-9930+-127*-103-(_0x384db4['x']-_0x425ae5['x'])/_0x425ae5['width']);_0xa1e41[_0x546fea]['x']=_0x4920ed,_0xa1e41[_0x546fea]['width']=_0x285ff3,_0x384db4['el']['style']['width']=_0x285ff3+'px',_0x384db4['el']['style']['translate']=_0x4920ed+'px\x20'+_0x384db4['y']+'px';const _0x27247b=new CustomEvent('onChange',{'detail':{'id':_0x546fea,'type':'scale-left','x':_0xa1e41[_0x546fea]['x'],'y':_0xa1e41[_0x546fea]['y'],'width':_0xa1e41[_0x546fea]['width'],'height':_0xa1e41[_0x546fea]['height']}});this['dispatchEv'+'ent'](_0x27247b);}break;case 'r':_0xe3bd75=_0x425ae5['x']+_0x425ae5['width'];_0xe3bd75<=_0x425ae5['x']&&(_0xe3bd75=_0x425ae5['x']);_0x503843=_0x425ae5['width']+_0x38dacc;_0x503843<-1*-1496+0x1fe5+0x25bd*-1&&(_0x503843=0x1*0xbc8+-792+0x458*-2);requestAnimationFrame(()=>{this['elSelected'+'Lines']['r']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']+_0x38dacc-(-1*-5651+-11*-353+0x2*-4766+0.5)+'px\x20'+_0x56ce57+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x425ae5['x']-(-2633*0x1+-2668+0x14b7+0.5)+'px\x20'+(_0x56ce57-(-2913+0x2*-1858+0x19e7+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x503843+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x425ae5['x']-(-2076+-3*-529+-1*-491+0.5)+'px\x20'+(_0x425ae5['y']+_0x425ae5['height']-(0x2*-1321+-6847+0x2513+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x503843+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']+_0x38dacc-(-9*-204+0x6b0*-4+0x1397+0.5)+'px\x20'+(_0x425ae5['y']-(0x21d1*-1+-566*-17+-962+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']+_0x38dacc-(-8661+-1267*0x2+-2*-5599+0.5)+'px\x20'+(_0x425ae5['y']+_0x425ae5['height']-(0xe4a+0x7c8*0x3+-9631+0.5))+'px';for(const _0x43830a of _0x425ae5['ids']){const _0x1c25d7=this['registered'][_0x43830a],_0x1e83a3=_0x1c25d7['width']*(-19*-199+0x12f4+0x4*-2158+_0x1bf48b);_0x1c25d7['el']['style']['width']!==_0x1e83a3+'px'&&(_0x1c25d7['el']['style']['width']=_0x1e83a3+'px',_0xa1e41[_0x43830a]['width']=_0x1e83a3);const _0x96f099=new CustomEvent('onChange',{'detail':{'id':_0x43830a,'type':'scale-righ'+'t','x':_0xa1e41[_0x43830a]['x'],'y':_0xa1e41[_0x43830a]['y'],'width':_0xa1e41[_0x43830a]['width'],'height':_0xa1e41[_0x43830a]['height']}});this['dispatchEv'+'ent'](_0x96f099);}});break;case 't':_0xe3bd75=_0x425ae5['x'],_0x56ce57=_0x425ae5['y']+_0xc7bd1c;let _0x4a9998=_0x425ae5['height']-_0xc7bd1c;_0x56ce57>=_0x425ae5['y']+_0x425ae5['height']&&(_0x56ce57=_0x425ae5['y']+_0x425ae5['height']);_0x5598cb<=-4022+-5265+0x1*0x2447&&(_0x5598cb=0x27*0x49+0x1238+-7*0x431);this['elSelected'+'Lines']['t']['style']['translate']=_0xe3bd75-(-145*0x3+-2*-4309+-3*0xaa7+0.5)+'px\x20'+(_0x56ce57-(-2520+0x44c+0x58e+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0xe3bd75-(0x1a05+-6885*-1+-13544*0x1+0.5)+'px\x20'+(_0x56ce57-(-277*-15+0x1c7+0x100*-18+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x4a9998+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']-(-1*0xd7c+0x560*-3+0x1d9e+0.5)+'px\x20'+(_0x56ce57-(-235*0x5+-7*0x52+0x6d7+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x4a9998+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0xe3bd75-(0x76e+0x24cb+0x1*-11318+0.5)+'px\x20'+(_0x56ce57-(-8473+-303*-22+0x712+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']-(0xc21+-6509+0xd4f*0x1+0.5)+'px\x20'+(_0x56ce57-(-1855+0x2c4*-5+-2699*-2+0.5))+'px';for(const _0x1d4cf7 of _0x425ae5['ids']){const _0x341ca3=this['registered'][_0x1d4cf7],_0x46b3de=_0x341ca3['height']*(-463*-14+0xd16+-3277*0x3-_0x21a85c),_0x4d29c1=_0x341ca3['y']+_0xc7bd1c*(-1379+-2705+0x5f*0x2b-(_0x341ca3['y']-_0x425ae5['y'])/_0x425ae5['height']);_0x341ca3['el']['style']['height']=_0x46b3de+'px',_0x341ca3['el']['style']['translate']=_0x341ca3['x']+'px\x20'+_0x4d29c1+'px',_0xa1e41[_0x1d4cf7]['y']=_0x4d29c1,_0xa1e41[_0x1d4cf7]['height']=_0x46b3de;const _0x1b0d23=new CustomEvent('onChange',{'detail':{'id':_0x1d4cf7,'type':'scale-top','x':_0xa1e41[_0x1d4cf7]['x'],'y':_0xa1e41[_0x1d4cf7]['y'],'width':_0xa1e41[_0x1d4cf7]['width'],'height':_0xa1e41[_0x1d4cf7]['height']}});this['dispatchEv'+'ent'](_0x1b0d23);}break;case 'b':_0x56ce57=_0x425ae5['y']+_0x425ae5['height'];_0x56ce57<=_0x425ae5['y']&&(_0x56ce57=_0x425ae5['y']);_0x5598cb=_0x425ae5['height']+_0xc7bd1c;_0x5598cb<-269*-3+-2459*0x3+0x19aa&&(_0x5598cb=0x7c*-19+0x2*0x9b+0x7fe);this['elSelected'+'Lines']['t']['style']['translate']=_0x425ae5['x']-(-2*-1438+0xa*0x85+-4204+0.5)+'px\x20'+(_0x425ae5['y']-(-1*0x2615+0x1ee4+-1843*-1+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x425ae5['x']-(0x5a4*0x5+0xcf*0x15+0x303*-15+0.5)+'px\x20'+(_0x425ae5['y']-(-103*0x59+-810+-587*-17+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5598cb+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']-(-37*0x1a+0xd*0x11+0x2e7+0.5)+'px\x20'+(_0x425ae5['y']-(-6*0x401+-3475+0x259b+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5598cb+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x425ae5['x']+'px\x20'+(_0x56ce57+_0xc7bd1c-(-3106+-2741*-2+-1187*0x2+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x425ae5['x']-(-2888+-1*-1319+-786*-2+0.5)+'px\x20'+(_0x56ce57+_0xc7bd1c-(-26*0x152+-9637+0x47fc+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x425ae5['x']+_0x425ae5['width']-(0x1838+0x1810+-1373*0x9+0.5)+'px\x20'+(_0x56ce57+_0xc7bd1c-(0x20d9+0x770+-10310+0.5))+'px';for(const _0x49baa6 of _0x425ae5['ids']){const _0x1d1ce2=this['registered'][_0x49baa6],_0x4e27e2=_0x1d1ce2['height']*(-7186+0x7d*-9+0x8*0x40f+_0x21a85c),_0x5b3b51=_0x1d1ce2['y']+_0xc7bd1c*((_0x1d1ce2['y']-_0x425ae5['y'])/_0x425ae5['height']);_0xa1e41[_0x49baa6]['height']=_0x4e27e2,_0xa1e41[_0x49baa6]['y']=_0x5b3b51,_0x1d1ce2['el']['style']['height']=_0x4e27e2+'px',_0x1d1ce2['el']['style']['translate']=_0x1d1ce2['x']+'px\x20'+_0x5b3b51+'px';const _0xf6e8d4=new CustomEvent('onChange',{'detail':{'id':_0x49baa6,'type':'scale-bott'+'om','x':_0xa1e41[_0x49baa6]['x'],'y':_0xa1e41[_0x49baa6]['y'],'width':_0xa1e41[_0x49baa6]['width'],'height':_0xa1e41[_0x49baa6]['height']}});this['dispatchEv'+'ent'](_0xf6e8d4);}break;}}['moveVector'+'s'](_0x62c6f4,_0x4dd2bc,_0x4e82a4,_0x29643f,_0x557f69,_0x363645){let _0x3d42a0=0x1351*0x1+0x2595+-14566*0x1,_0x10102d=-3206+0x13a3+-1821;const _0x191b3a=_0x557f69['x']-_0x29643f['x'],_0x34e6f9=_0x191b3a/_0x363645,_0x22fcc6=_0x191b3a/_0x4e82a4['width'];let _0x477cce=0x1978+0x589+0x1f01*-1;switch(_0x62c6f4){case 'tl':_0x3d42a0=_0x4e82a4['x']+_0x191b3a,_0x10102d=_0x4e82a4['y']+_0x34e6f9,this['elSelected'+'Vectors']['tl']['style']['translate']=_0x3d42a0-(-7043+0x5f*-59+0x1079*0x3+0.5)+'px\x20'+(_0x10102d-(0x1101+-3692+-658+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x4e82a4['x']+_0x4e82a4['width']-(0x5e*0x1+-10*0x281+0x18af+0.5)+'px\x20'+(_0x10102d-(-2*0xa63+-3849+-9170*-1+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x3d42a0-(-1*-3895+-3467+-425+0.5)+'px\x20'+(_0x4e82a4['y']+_0x4e82a4['height']-(-3657+-8938*-1+-5278+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x3d42a0-(-4511+-1*0x2201+0x33a2+0.5)+'px\x20'+(_0x10102d-(0x1*0x607+0x371*0x2+0x3*-1101+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x4e82a4['width']-_0x191b3a+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x3d42a0-(-2*0x10f1+-9637+0x4789+0.5)+'px\x20'+(_0x4e82a4['y']+_0x4e82a4['height']-(0x1c19*0x1+-1*-3266+-1*0x28d9+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x4e82a4['width']-_0x191b3a+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x3d42a0-(0x1c2d+0x1c0c+0x7b*-117+0.5)+'px\x20'+(_0x10102d-(0xd*-682+-3576+-204*-61+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x4e82a4['height']-_0x34e6f9+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x4e82a4['x']+_0x4e82a4['width']-(0x1002*-2+0xa5*-15+0x29b1+0.5)+'px\x20'+(_0x10102d-(0x13f2+0x43b+0x17*-269+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x4e82a4['height']-_0x34e6f9+'px';for(const _0xa874e3 of _0x4e82a4['ids']){const _0x3a7295=this['registered'][_0xa874e3],_0x13661a=_0x3a7295['width']*(0x1da1+0x3*-659+0x59*-63-_0x22fcc6),_0xb66e1b=_0x3a7295['x']+_0x191b3a*(0x145+-13*-515+-7019-(_0x3a7295['x']-_0x4e82a4['x'])/_0x4e82a4['width']),_0x172391=_0x3a7295['height']*(-1*-8790+-946*0x7+0xc5*-11-_0x22fcc6),_0x6591c5=_0x3a7295['y']+_0x34e6f9*(-3243*-1+-51*-3+0x2a7*-5-(_0x3a7295['y']-_0x4e82a4['y'])/_0x4e82a4['height']);_0x3a7295['el']['style']['translate']=_0xb66e1b+'px\x20'+_0x6591c5+'px',_0x3a7295['el']['style']['width']=_0x13661a+'px',_0x3a7295['el']['style']['height']=_0x172391+'px',_0x4dd2bc[_0xa874e3]['x']=_0xb66e1b,_0x4dd2bc[_0xa874e3]['width']=_0x13661a,_0x4dd2bc[_0xa874e3]['y']=_0x6591c5,_0x4dd2bc[_0xa874e3]['height']=_0x172391;const _0x49409d=new CustomEvent('onChange',{'detail':{'id':_0xa874e3,'type':'scale-top-'+'left','x':_0x4dd2bc[_0xa874e3]['x'],'y':_0x4dd2bc[_0xa874e3]['y'],'width':_0x4dd2bc[_0xa874e3]['width'],'height':_0x4dd2bc[_0xa874e3]['height']}});this['dispatchEv'+'ent'](_0x49409d);}break;case 'tr':_0x477cce=_0x4e82a4['width']+_0x191b3a,_0x3d42a0=_0x4e82a4['x']+_0x477cce,_0x10102d=_0x4e82a4['y']-_0x34e6f9,this['elSelected'+'Vectors']['tr']['style']['translate']=_0x3d42a0-(-7612+-3472+0x2b4f*0x1+0.5)+'px\x20'+(_0x10102d-(0x5*0x2a1+-4431+0x42d+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x4e82a4['x']-(-695+0x1079*0x1+-3519+0.5)+'px\x20'+(_0x10102d-(0x1182*-2+-3290+0x2fe1+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x3d42a0-(0x24e1*-1+-7077+0x4089+0.5)+'px\x20'+(_0x4e82a4['y']+_0x4e82a4['height']-(0x1*0x1d2+0xfaa+-3*0x5d3+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x4e82a4['x']-(-79*-90+0x1a8f+-13907*0x1+0.5)+'px\x20'+(_0x10102d-(-6878+0x217+0x18c9+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x477cce+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x4e82a4['x']-(-9163+-7507+0x4120+0.5)+'px\x20'+(_0x4e82a4['y']+_0x4e82a4['height']-(-342+0x18aa+0x3e3*-6+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x477cce+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x4e82a4['x']-(-837+0x399*0x5+0x7*-538+0.5)+'px\x20'+(_0x10102d-(0xa93+-8090+0x1509+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x4e82a4['height']+_0x34e6f9+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x4e82a4['x']+_0x477cce-(0x28*0xef+0x4*0xa9+-10234+0.5)+'px\x20'+(_0x10102d-(0x1fa5+0x5*-638+-4909+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x4e82a4['height']+_0x34e6f9+'px';for(const _0x4627b3 of _0x4e82a4['ids']){const _0x19e27f=this['registered'][_0x4627b3],_0x1735b2=_0x19e27f['width']*(0x528+-3061*-2+-7441+_0x22fcc6),_0xda0ed4=_0x19e27f['x']+_0x191b3a*((_0x19e27f['x']-_0x4e82a4['x'])/_0x4e82a4['width']),_0x7b307d=_0x19e27f['height']*(-8479+0x25c1*0x1+0x1*-1185+_0x22fcc6),_0x522dbe=_0x19e27f['y']-_0x34e6f9*(-9417*-1+-73*-85+0x1*-15621-(_0x19e27f['y']-_0x4e82a4['y'])/_0x4e82a4['height']);_0x19e27f['el']['style']['translate']=_0xda0ed4+'px\x20'+_0x522dbe+'px',_0x19e27f['el']['style']['width']=_0x1735b2+'px',_0x19e27f['el']['style']['height']=_0x7b307d+'px',_0x4dd2bc[_0x4627b3]['x']=_0xda0ed4,_0x4dd2bc[_0x4627b3]['width']=_0x1735b2,_0x4dd2bc[_0x4627b3]['y']=_0x522dbe,_0x4dd2bc[_0x4627b3]['height']=_0x7b307d;const _0x52b652=new CustomEvent('onChange',{'detail':{'id':_0x4627b3,'type':'scale-top-'+'right','x':_0x4dd2bc[_0x4627b3]['x'],'y':_0x4dd2bc[_0x4627b3]['y'],'width':_0x4dd2bc[_0x4627b3]['width'],'height':_0x4dd2bc[_0x4627b3]['height']}});this['dispatchEv'+'ent'](_0x52b652);}break;case 'bl':_0x3d42a0=_0x4e82a4['x']+_0x191b3a,_0x10102d=_0x4e82a4['y']+_0x4e82a4['height']-_0x34e6f9,this['elSelected'+'Vectors']['bl']['style']['translate']=_0x3d42a0-(0x1a12+-7031*0x1+-15*-24+0.5)+'px\x20'+(_0x10102d-(0x173a+-967*-7+-1*0x31a8+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x3d42a0-(0x2126*0x1+0xd00+-11811*0x1+0.5)+'px\x20'+(_0x4e82a4['y']-(0x9a8+0x1ae6+0x248b*-1+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x4e82a4['x']+_0x4e82a4['width']-(0x1*0xa9a+0x1945+-270*0x22+0.5)+'px\x20'+(_0x10102d-(0x120a+0x1688*0x1+0x3*-3461+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x3d42a0-(-557+0x8*-283+0xb07+0.5)+'px\x20'+(_0x4e82a4['y']-(-692*0x3+0x123b+-2589+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x4e82a4['width']-_0x191b3a+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x3d42a0-(-21*0x158+0x25b*0x8+0x962+0.5)+'px\x20'+(_0x10102d-(0x106b+0x8e7+-270*0x18+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x4e82a4['width']-_0x191b3a+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x3d42a0-(0x13c*0x13+-3480+-2522+0.5)+'px\x20'+(_0x4e82a4['y']-(-2013+0x2311*0x1+-6962+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x4e82a4['height']-_0x34e6f9+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x4e82a4['x']+_0x4e82a4['width']-(0x812*0x2+-2167+0x7ab*-1+0.5)+'px\x20'+(_0x4e82a4['y']-(-5744+0x43*0x6+0x14e0+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x4e82a4['height']-_0x34e6f9+'px';for(const _0x5d1c2c of _0x4e82a4['ids']){const _0x16ae52=this['registered'][_0x5d1c2c],_0x2f22a3=_0x16ae52['width']*(-57*0x3+0x12a*0xd+-2*0x73b-_0x22fcc6),_0x532aa5=_0x16ae52['x']+_0x191b3a*(0x317*0x5+0x24*-9+-33*0x6e-(_0x16ae52['x']-_0x4e82a4['x'])/_0x4e82a4['width']),_0x23bf25=_0x16ae52['height']*(0x1862+-1*0x1687+-158*0x3-_0x22fcc6),_0x3a1abf=_0x16ae52['y']+_0x34e6f9*((_0x4e82a4['y']-_0x16ae52['y'])/_0x4e82a4['height']);_0x16ae52['el']['style']['translate']=_0x532aa5+'px\x20'+_0x3a1abf+'px',_0x16ae52['el']['style']['width']=_0x2f22a3+'px',_0x16ae52['el']['style']['height']=_0x23bf25+'px',_0x4dd2bc[_0x5d1c2c]['x']=_0x532aa5,_0x4dd2bc[_0x5d1c2c]['width']=_0x2f22a3,_0x4dd2bc[_0x5d1c2c]['y']=_0x3a1abf,_0x4dd2bc[_0x5d1c2c]['height']=_0x23bf25;const _0x585642=new CustomEvent('onChange',{'detail':{'id':_0x5d1c2c,'type':'scale-bott'+'om-left','x':_0x4dd2bc[_0x5d1c2c]['x'],'y':_0x4dd2bc[_0x5d1c2c]['y'],'width':_0x4dd2bc[_0x5d1c2c]['width'],'height':_0x4dd2bc[_0x5d1c2c]['height']}});this['dispatchEv'+'ent'](_0x585642);}break;case 'br':_0x477cce=_0x4e82a4['width']+_0x191b3a,_0x3d42a0=_0x4e82a4['x']+_0x477cce,_0x10102d=_0x4e82a4['y']+_0x4e82a4['height']+_0x34e6f9,this['elSelected'+'Vectors']['br']['style']['translate']=_0x3d42a0-(-2379+-3847+0x1*0x1855+0.5)+'px\x20'+(_0x10102d-(0x2214+0x3*-1191+-1716*0x3+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x4e82a4['x']+_0x4e82a4['width']+_0x191b3a-(-6639+0x4f6*0x2+0xe*0x125+0.5)+'px\x20'+(_0x4e82a4['y']-(-8831*0x1+-2894*-3+0x26*0x4+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x4e82a4['x']-(0x246a+0x1cb*-10+-4729+0.5)+'px\x20'+(_0x10102d-(0x205d+-1599*0x4+0x3af*-2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x4e82a4['x']-(-6679+-34*-134+-25*-85+0.5)+'px\x20'+(_0x4e82a4['y']-(-3720*-1+0x1*0x3e8+-4718+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x477cce+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x4e82a4['x']-(-7313+-2*0x1205+-16541*-1+0.5)+'px\x20'+(_0x10102d-(-2287+0x1*0x445+0x4ac+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x477cce+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x4e82a4['x']-(-2585+-3433+0x8c*0x2b+0.5)+'px\x20'+(_0x4e82a4['y']-(0x9f1+-2593+0x32+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x4e82a4['height']+_0x34e6f9+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x4e82a4['x']+_0x477cce-(-2*-2866+0x1*0x2185+0x515*-11+0.5)+'px\x20'+(_0x4e82a4['y']-(-4150+0x9a*0x8+0xb68+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x4e82a4['height']+_0x34e6f9+'px';for(const _0x40d836 of _0x4e82a4['ids']){const _0x208f13=this['registered'][_0x40d836],_0x3ade3b=_0x208f13['width']*(-2*0x5d2+0x258c+0x19e7*-1+_0x22fcc6),_0x20e818=_0x208f13['x']+_0x191b3a*((_0x208f13['x']-_0x4e82a4['x'])/_0x4e82a4['width']),_0x27d2c9=_0x208f13['height']*(0x4d5*-5+0x1*0x17d8+-1*-82+_0x22fcc6),_0x581160=_0x208f13['y']+_0x34e6f9*((_0x208f13['y']-_0x4e82a4['y'])/_0x4e82a4['height']);_0x208f13['el']['style']['translate']=_0x20e818+'px\x20'+_0x581160+'px',_0x208f13['el']['style']['width']=_0x3ade3b+'px',_0x208f13['el']['style']['height']=_0x27d2c9+'px',_0x4dd2bc[_0x40d836]['x']=_0x20e818,_0x4dd2bc[_0x40d836]['width']=_0x3ade3b,_0x4dd2bc[_0x40d836]['y']=_0x581160,_0x4dd2bc[_0x40d836]['height']=_0x27d2c9;const _0x4137c8=new CustomEvent('onChange',{'detail':{'id':_0x40d836,'type':'scale-bott'+'om-right','x':_0x4dd2bc[_0x40d836]['x'],'y':_0x4dd2bc[_0x40d836]['y'],'width':_0x4dd2bc[_0x40d836]['width'],'height':_0x4dd2bc[_0x40d836]['height']}});this['dispatchEv'+'ent'](_0x4137c8);}break;}}['referenceA'+'lignLinesV'+'ectors'](_0x1fd723,_0x3343aa){let _0x28fea1='',_0x574473;for(let _0x4c4ec9 in _0x1fd723){if(this['selected']['ids']['indexOf'](_0x4c4ec9)>-1)continue;let _0x24db03={'x':0x0,'y':0x0};_0x574473='';if(Math['abs'](this['selected']['x']+this['selected']['width']-_0x1fd723[_0x4c4ec9]['x'])<=this['thresholdH'+'orizontal'])_0x574473='end',_0x24db03['x']=this['selected']['x']+this['selected']['width']-_0x1fd723[_0x4c4ec9]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']/(-2218*0x1+-1*-6452+-4232)))<=this['thresholdH'+'orizontal'])_0x574473='end',_0x24db03['x']=this['selected']['x']+this['selected']['width']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']/(0x14f3*-1+0xc*0x205+-839));else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']))<=this['thresholdH'+'orizontal'])_0x574473='end',_0x24db03['x']=this['selected']['x']+this['selected']['width']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']);else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x21*-209+-9795+0x4136)-_0x1fd723[_0x4c4ec9]['x'])<=this['thresholdH'+'orizontal'])_0x574473='middle',_0x24db03['x']=this['selected']['x']+this['selected']['width']/(0x62c*0x2+-3677+0x207)-_0x1fd723[_0x4c4ec9]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-1834*-4+0x14c6+-12652)-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']/(0x205d*0x1+0x11b6+-12817)))<=this['thresholdH'+'orizontal'])_0x574473='middle',_0x24db03['x']=this['selected']['x']+this['selected']['width']/(0x2*0x784+-211*-9+-5745)-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']/(-1*0x26e1+0x91d*-2+-14621*-1));else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-7*0x215+0x251*-11+0x2810)-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']))<=this['thresholdH'+'orizontal'])_0x574473='middle',_0x24db03['x']=this['selected']['x']+this['selected']['width']/(-601*-2+0x4d5*-2+0x7*0xb6)-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']);else {if(Math['abs'](this['selected']['x']-_0x1fd723[_0x4c4ec9]['x'])<=this['thresholdH'+'orizontal'])_0x574473='begin',_0x24db03['x']=this['selected']['x']-_0x1fd723[_0x4c4ec9]['x'];else {if(Math['abs'](this['selected']['x']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']/(-3143+0x1bea+-4001)))<=this['thresholdH'+'orizontal'])_0x574473='begin',_0x24db03['x']=this['selected']['x']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']/(0x2364+-2007+0x281*-11));else Math['abs'](this['selected']['x']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']))<=this['thresholdH'+'orizontal']&&(_0x574473='begin',_0x24db03['x']=this['selected']['x']-(_0x1fd723[_0x4c4ec9]['x']+_0x1fd723[_0x4c4ec9]['width']));}}}}}}}_0x574473!==''?(_0x28fea1=_0x574473,this['snap']('horizontal',_0x24db03,_0x1fd723),setTimeout(()=>{this['thresholdH'+'orizontal']=0x1d9d+-3203*-2+0x5*-2797;},-21*0x137+-2313+0x11*0x214)):this['thresholdH'+'orizontal']===-5*-105+-7591+0x39*0x7c&&(this['thresholdH'+'orizontal']=-5248+-623+0x1c4*0xd);}const _0x508304=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-horizo'+'ntal');_0x508304!==undefined&&_0x508304['forEach'](_0x405b31=>{_0x405b31['remove']();});const _0x5d30ce=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-horizont'+'al');_0x5d30ce!==undefined&&_0x5d30ce['forEach'](_0x151085=>{_0x151085['remove']();});_0x28fea1!==''&&(this['triggerAli'+'gnVectors']('horizontal',_0x28fea1,_0x1fd723),this['triggerAli'+'gnLines'](_0x1fd723));_0x28fea1='';for(let _0xcd19cc in _0x1fd723){if(this['selected']['ids']['indexOf'](_0xcd19cc)>-1)continue;let _0xf6f4d9={'x':0x0,'y':0x0};_0x574473='';if(Math['abs'](this['selected']['y']+this['selected']['height']-_0x1fd723[_0xcd19cc]['y'])<=this['thresholdV'+'ertical'])_0x574473='end',_0xf6f4d9['y']=this['selected']['y']+this['selected']['height']-_0x1fd723[_0xcd19cc]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']/(0xbd8+0xf8d+0x7b*-57)))<=this['thresholdV'+'ertical'])_0x574473='end',_0xf6f4d9['y']=this['selected']['y']+this['selected']['height']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']/(0x1*0xcfb+-6*0x517+-3*-1499));else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']))<=this['thresholdV'+'ertical'])_0x574473='end',_0xf6f4d9['y']=this['selected']['y']+this['selected']['height']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']);else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0xd*0x163+0x1e*0xd3+0x1f*-353)-_0x1fd723[_0xcd19cc]['y'])<=this['thresholdV'+'ertical'])_0x574473='middle',_0xf6f4d9['y']=this['selected']['y']+this['selected']['height']/(-13*-439+0x1b1*0x16+0x13d5*-3)-_0x1fd723[_0xcd19cc]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x119*0x3+-1*-9329+-10170)-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']/(0x1*-8761+-6995+-2*-7879)))<=this['thresholdV'+'ertical'])_0x574473='middle',_0xf6f4d9['y']=this['selected']['y']+this['selected']['height']/(-349*-28+0x1d91+-17339)-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']/(0x15*0x17+0x2009+0xb4e*-3));else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*-3329+-3209*-3+-6296)-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']))<=this['thresholdV'+'ertical'])_0x574473='middle',_0xf6f4d9['y']=this['selected']['y']+this['selected']['height']/(0x1*-267+-9656+0x26c5)-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']);else {if(Math['abs'](this['selected']['y']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']))<=this['thresholdV'+'ertical'])_0x574473='begin',_0xf6f4d9['y']=this['selected']['y']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']);else {if(Math['abs'](this['selected']['y']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']/(-2*0x1137+-4969+-1*-13785)))<=this['thresholdV'+'ertical'])_0x574473='begin',_0xf6f4d9['y']=this['selected']['y']-(_0x1fd723[_0xcd19cc]['y']+_0x1fd723[_0xcd19cc]['height']/(-1367*0x4+0x1*0x165a+-252));else Math['abs'](this['selected']['y']-_0x1fd723[_0xcd19cc]['y'])<=this['thresholdV'+'ertical']&&(_0x574473='begin',_0xf6f4d9['y']=this['selected']['y']-_0x1fd723[_0xcd19cc]['y']);}}}}}}}_0x574473!==''?(_0x28fea1=_0x574473,this['snap']('vertical',_0xf6f4d9,_0x1fd723),setTimeout(()=>{this['thresholdH'+'orizontal']=-470+0xaf6+0x1*-2334;},0xe9b*0x1+0x703*0x3+0x17*-388)):this['thresholdV'+'ertical']===-1*0x246a+0x1baf*0x1+0x8bd&&(this['thresholdV'+'ertical']=0x33*0x2b+-1*0x8ae+-1*-34);}const _0x545c50=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-vertic'+'al');_0x545c50!==undefined&&_0x545c50['forEach'](_0x49aa60=>{_0x49aa60['remove']();});const _0x2d76e1=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-vertical');_0x2d76e1!==undefined&&_0x2d76e1['forEach'](_0xc126af=>{_0xc126af['remove']();}),_0x28fea1!==''&&(this['triggerAli'+'gnVectors']('vertical',_0x28fea1,_0x1fd723),this['triggerAli'+'gnLines'](_0x1fd723));}['snap'](_0x40e7cc,_0x353208,_0x5b89d8){let _0x3e9e82={'x':0x0,'y':0x0};if(_0x40e7cc==='horizontal'){this['selected']['x']=this['selected']['x']-_0x353208['x'];for(const _0x4f040a of this['selected']['ids']){const _0x3747e8=this['getElement'+'TranslateP'+'os'](_0x5b89d8[_0x4f040a]['el']),_0x10a58f=_0x3747e8['x']-_0x353208['x'],_0x6c8ee4=_0x3747e8['y'];_0x5b89d8[_0x4f040a]['el']['style']['translate']=_0x10a58f+'px\x20'+_0x6c8ee4+'px',_0x5b89d8[_0x4f040a]['x']=_0x10a58f;}_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x3e9e82['x']-_0x353208['x']+'px\x20'+_0x3e9e82['y']+'px';}else {this['selected']['y']=this['selected']['y']-_0x353208['y'];for(const _0xef9367 of this['selected']['ids']){const _0x57dd5b=this['getElement'+'TranslateP'+'os'](_0x5b89d8[_0xef9367]['el']),_0x505dab=_0x57dd5b['x'],_0x5e43fb=_0x57dd5b['y']-_0x353208['y'];_0x5b89d8[_0xef9367]['el']['style']['translate']=_0x505dab+'px\x20'+_0x5e43fb+'px',_0x5b89d8[_0xef9367]['y']=_0x5e43fb;}_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px',_0x3e9e82=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x3e9e82['x']+'px\x20'+(_0x3e9e82['y']-_0x353208['y'])+'px';}}['getElement'+'TranslateP'+'os'](_0x48c948){let _0x4e2a07={'x':0x0,'y':0x0};if(_0x48c948['style']['translate']['indexOf']('\x20')>-1){const _0x54f5ae=_0x48c948['style']['translate']['split']('\x20');_0x4e2a07['x']=parseFloat(_0x54f5ae[0x24*-61+0xbc7+0x3f*-13]['replace']('px','')),_0x4e2a07['y']=parseFloat(_0x54f5ae[0x707+-6201+0x1133]['replace']('px',''));}else _0x4e2a07['x']=parseFloat(_0x48c948['style']['translate']);return _0x4e2a07;}['generateAl'+'ignVector'](_0x4a89f8,_0x30d192,_0x8a8392){const _0x49bcee=document['createElem'+'ent']('div');_0x49bcee['innerHTML']='\x0a\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20fill=\x22'+colors['red']+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20v'+'iewBox=\x220\x20'+'0\x2024\x2024\x22\x20\x0a'+'\x20\x20\x20\x20\x20\x20stro'+'ke-width=\x22'+'1.5\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20stroke=\x22'+'currentCol'+'or\x22\x20\x0a\x20\x20\x20\x20\x20'+'\x20class=\x22si'+'ze-6\x22\x20\x0a\x20\x20\x20'+'\x20\x20\x20width=\x22')+vectorSize*(0x1*-7710+0x1*0x172f+0x6f1)+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20w'+'idth=\x22')+vectorSize*(-9997+0x58b+-143*-60)+('\x22\x0a\x20\x20\x20\x20>\x0a\x20\x20'+'\x20\x20\x20\x20<path\x20'+'stroke-lin'+'ecap=\x22roun'+'d\x22\x20stroke-'+'linejoin=\x22'+'round\x22\x20d=\x22'+'M6\x2018\x2018\x206'+'M6\x206l12\x2012'+'\x22\x20/>\x0a\x20\x20\x20\x20<'+'/svg>'),_0x49bcee['classList']['add']('align-vect'+'or'),_0x49bcee['classList']['add']('align-vect'+'or-'+_0x4a89f8),_0x49bcee['classList']['add']('align-vect'+'or-'+_0x4a89f8+'-'+_0x30d192),_0x49bcee['style']['position']='absolute',_0x49bcee['style']['left']=_0x8a8392['x']+'px',_0x49bcee['style']['top']=_0x8a8392['y']+'px',this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x49bcee);}['triggerAli'+'gnVectors'](_0x455d42,_0x3c4fc8,_0x33b010){let _0xaaa0ab={'hBegin':![],'hMiddle':![],'hEnd':![],'vBegin':![],'vMiddle':![],'vEnd':![]};for(let _0x353315 in _0x33b010){Math['abs'](this['selected']['x']-_0x33b010[_0x353315]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hBegin']&&(_0xaaa0ab['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(-1009*0x2+-5259+-29*-251)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(0xafd+0x1*-5227+0x970)-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(0x19ac+-5912+-658)-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hBegin']&&(_0xaaa0ab['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hBegin']&&(_0xaaa0ab['hBegin']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-9857*0x1+-2211+0x2f26)-_0x33b010[_0x353315]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hMiddle']&&(_0xaaa0ab['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-1676+-1818*-3+-64*0x3b)-(_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(0x7*0x12e+-8027+-455*-13)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(-8147+0xa7*-39+0x3946)-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(0x5*-317+0xab6+-1155)-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hMiddle']&&(_0xaaa0ab['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x1*-8471+0x1850+0xad*0xd)-(_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hMiddle']&&(_0xaaa0ab['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-_0x33b010[_0x353315]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hEnd']&&(_0xaaa0ab['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(0x2*0xa66+-1*0x215a+0xc90)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(0x117f+-2*-3917+-1*0x3017)-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']/(-24*0x44+0x189c+0x2*-2333)-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hEnd']&&(_0xaaa0ab['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['hEnd']&&(_0xaaa0ab['hEnd']=!![])),Math['abs'](this['selected']['y']-_0x33b010[_0x353315]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),!_0xaaa0ab['vBegin']&&(_0xaaa0ab['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(-8969+0x115e+-4525*-1)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(0x98f*-3+-9529+-1406*-12)-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(0x265*0xb+0x82e*0x4+-5039*0x3)-vectorSize}),!_0xaaa0ab['vBegin']&&(_0xaaa0ab['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['vBegin']&&(_0xaaa0ab['vBegin']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-3*0xc53+-6012+0x3c77)-_0x33b010[_0x353315]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),!_0xaaa0ab['vMiddle']&&(_0xaaa0ab['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-8171*-1+-1*-1529+-9698)-(_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(0x13*0x37+0x179f*-1+0x3*0x684)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(0x3b2+-1853+0x1*0x38d)-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(-1231+-1*0x1dc+0x1*0x6ad)-vectorSize}),!_0xaaa0ab['vMiddle']&&(_0xaaa0ab['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-3923*0x1+-1*0x574+-5321*-1)-(_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['vMiddle']&&(_0xaaa0ab['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-_0x33b010[_0x353315]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']-vectorSize}),!_0xaaa0ab['vEnd']&&(_0xaaa0ab['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(0x6*0xca+-2026+0x330)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(0xb9b+0x4f8+0x1*-4241)-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']/(-2791*-3+-913+-7458)-vectorSize}),!_0xaaa0ab['vEnd']&&(_0xaaa0ab['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x33b010[_0x353315]['id'])===-1&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':_0x33b010[_0x353315]['x']+_0x33b010[_0x353315]['width']-vectorSize,'y':_0x33b010[_0x353315]['y']+_0x33b010[_0x353315]['height']-vectorSize}),!_0xaaa0ab['vEnd']&&(_0xaaa0ab['vEnd']=!![]));}_0xaaa0ab['hBegin']&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0xaaa0ab['hMiddle']&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']/(0x25*-233+-9454*0x1+-18077*-1)-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']/(0x1*-8906+-7645+0x40a9)-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0xaaa0ab['hEnd']&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0xaaa0ab['vBegin']&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize})),_0xaaa0ab['vMiddle']&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-4946+0xad8+0x87c)-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-6101*-1+0xc01*-1+-3026)-vectorSize})),_0xaaa0ab['vEnd']&&(this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}),this['generateAl'+'ignVector'](_0x455d42,_0x3c4fc8,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}));}['generateAl'+'ignLine'](_0x48c77b){const {direction:_0x3df43a,position:_0x38ac0d,begin:_0x151b03,end:_0x3b3ff8}=_0x48c77b,_0x17af2a=document['createElem'+'ent']('div');_0x17af2a['classList']['add']('align-line'),_0x17af2a['classList']['add']('align-line'+'-'+_0x3df43a),_0x17af2a['classList']['add']('align-line'+'-'+_0x3df43a+'-'+_0x38ac0d),_0x17af2a['style']['position']='absolute',_0x17af2a['style']['left']=_0x151b03['x']+'px',_0x17af2a['style']['top']=_0x151b03['y']+'px',_0x3df43a==='horizontal'?(_0x17af2a['style']['width']='1px',_0x17af2a['style']['height']=_0x3b3ff8['y']-_0x151b03['y']+'px'):(_0x17af2a['style']['width']=_0x3b3ff8['x']-_0x151b03['x']+'px',_0x17af2a['style']['height']='1px'),this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x17af2a);}['generateLi'+'ne'](_0x2c559f,_0x5a0636){const {direction:_0x3e81d1,begin:_0xef60be,end:_0x4fd814}=_0x2c559f,_0x5d1a87=document['createElem'+'ent']('div');if(_0x5a0636['length']>-149*-47+0x9a4+-9471)for(const _0x1a8318 of _0x5a0636){_0x5d1a87['classList']['add'](_0x1a8318);}return _0x5d1a87['style']['position']='absolute',_0x5d1a87['style']['left']=_0xef60be['x']+'px',_0x5d1a87['style']['top']=_0xef60be['y']+'px',_0x3e81d1==='horizontal'?_0x5d1a87['style']['width']=_0x4fd814['x']-_0xef60be['x']+'px':_0x5d1a87['style']['height']=_0x4fd814['y']-_0xef60be['y']+'px',_0x5d1a87;}['triggerAli'+'gnLines'](_0x26ea8f){const _0x11258b={'direction':'horizontal','position':'begin','begin':{'x':this['selected']['x'],'y':this['selected']['y']},'end':{'x':this['selected']['x'],'y':this['selected']['y']}},_0x5f109b=(_0x4edf19,_0x4d7cb9,_0xdee604)=>{return _0x4edf19===undefined?(_0x4edf19=_0x2521b1(_0x11258b),_0x4edf19['end']['y']=_0x4edf19['end']['y']+this['selected']['height'],_0x4edf19['begin']['x']=_0x4edf19['begin']['x']+_0xdee604,_0x4edf19['end']['x']=_0x4edf19['begin']['x']+_0xdee604,_0x4d7cb9['y']<_0x4edf19['begin']['y']&&(_0x4edf19['begin']['y']=_0x4d7cb9['y']),_0x4d7cb9['y']+_0x4d7cb9['height']>_0x4edf19['end']['y']&&(_0x4edf19['end']['y']=_0x4d7cb9['y']+_0x4d7cb9['height'])):(_0x4d7cb9['y']<_0x4edf19['begin']['y']&&(_0x4edf19['begin']['y']=_0x4d7cb9['y']),_0x4d7cb9['y']+_0x4d7cb9['height']>_0x4edf19['end']['y']&&(_0x4edf19['end']['y']=_0x4d7cb9['y']+_0x4d7cb9['height'])),_0x4edf19;},_0x17a083=(_0x339f48,_0xa597d0,_0x7ecdd7)=>{return _0x339f48===undefined?(_0x339f48=_0x2521b1(_0x11258b),_0x339f48['direction']='vertical',_0x339f48['end']['x']=_0x339f48['end']['x']+this['selected']['width'],_0x339f48['begin']['y']=_0x339f48['begin']['y']+_0x7ecdd7,_0x339f48['end']['y']=_0x339f48['end']['y']+_0x7ecdd7,_0xa597d0['x']<_0x339f48['begin']['x']&&(_0x339f48['begin']['x']=_0xa597d0['x']),_0xa597d0['x']+_0xa597d0['width']>_0x339f48['end']['x']&&(_0x339f48['end']['x']=_0xa597d0['x']+_0xa597d0['width'])):(_0xa597d0['x']<_0x339f48['begin']['x']&&(_0x339f48['begin']['x']=_0xa597d0['x']),_0xa597d0['x']+_0xa597d0['width']>_0x339f48['end']['x']&&(_0x339f48['end']['x']=_0xa597d0['x']+_0xa597d0['width'])),_0x339f48;},_0xac0c0b=[];for(let _0x513452 in _0x26ea8f){(this['selected']['x']===_0x26ea8f[_0x513452]['x']||this['selected']['x']===_0x26ea8f[_0x513452]['x']+_0x26ea8f[_0x513452]['width']/(0x1*0x793+-2782+0x34d)||this['selected']['x']===_0x26ea8f[_0x513452]['x']+_0x26ea8f[_0x513452]['width'])&&this['selected']['ids']['indexOf'](_0x26ea8f[_0x513452]['id'])===-1&&(_0xac0c0b[-1*0x1f+-5754+0x1699]=_0x5f109b(_0xac0c0b[-2824*-2+-1*0x15ed+-35],_0x26ea8f[_0x513452],0x1d0f+0xb*0x189+0x1*-11762)),(this['selected']['x']+this['selected']['width']/(0x1c9d+0xbc*-9+0x1*-5631)===_0x26ea8f[_0x513452]['x']||this['selected']['x']+this['selected']['width']/(0x14*-196+-1209+0x140b)===_0x26ea8f[_0x513452]['x']+_0x26ea8f[_0x513452]['width']/(-443*0xb+-3241+-1*-8116)||this['selected']['x']+this['selected']['width']/(-2099+-2789*0x1+0x131a)===_0x26ea8f[_0x513452]['x']+_0x26ea8f[_0x513452]['width'])&&this['selected']['ids']['indexOf'](_0x26ea8f[_0x513452]['id'])===-1&&(_0xac0c0b[-37*0x61+-7264+0x2a66]=_0x5f109b(_0xac0c0b[0x1542+-4169+0xd4*-6],_0x26ea8f[_0x513452],this['selected']['width']/(0x650+0x1d9*-20+0x1ea6))),(this['selected']['x']+this['selected']['width']===_0x26ea8f[_0x513452]['x']||this['selected']['x']+this['selected']['width']===_0x26ea8f[_0x513452]['x']+_0x26ea8f[_0x513452]['width']/(0x7d*0x1+-4178*0x1+0xfd7*0x1)||this['selected']['x']+this['selected']['width']===_0x26ea8f[_0x513452]['x']+_0x26ea8f[_0x513452]['width'])&&this['selected']['ids']['indexOf'](_0x26ea8f[_0x513452]['id'])===-1&&(_0xac0c0b[-16*-424+0x11eb+-11369]=_0x5f109b(_0xac0c0b[0xe0d+-19*-113+0x57*-66],_0x26ea8f[_0x513452],this['selected']['width'])),(Math['abs'](this['selected']['y']-_0x26ea8f[_0x513452]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x26ea8f[_0x513452]['y']+_0x26ea8f[_0x513452]['height']/(-2842+0xe6b+-847*0x1)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x26ea8f[_0x513452]['y']+_0x26ea8f[_0x513452]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x26ea8f[_0x513452]['id'])===-1&&(_0xac0c0b[0x19*0x5b+0x1a7*-10+0x7a6]=_0x17a083(_0xac0c0b[-2473*0x2+-4404*-2+-3859*0x1],_0x26ea8f[_0x513452],-1*-6089+-573+-2758*0x2)),(Math['abs'](this['selected']['y']+this['selected']['height']/(-8597+-3608+0x1*0x2faf)-_0x26ea8f[_0x513452]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0x634*-3+0x11*-309+0x2723)-(_0x26ea8f[_0x513452]['y']+_0x26ea8f[_0x513452]['height']/(0xe17+-8643+-458*-11)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0xd63+-137*-9+-4658)-(_0x26ea8f[_0x513452]['y']+_0x26ea8f[_0x513452]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x26ea8f[_0x513452]['id'])===-1&&(_0xac0c0b[0x1265*-2+0x1d89+0x745]=_0x17a083(_0xac0c0b[0x2*-2558+-1167*-3+0x653],_0x26ea8f[_0x513452],this['selected']['height']/(0x6e9*0x2+-1*-9349+0x35b*-15))),(Math['abs'](this['selected']['y']+this['selected']['height']-_0x26ea8f[_0x513452]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x26ea8f[_0x513452]['y']+_0x26ea8f[_0x513452]['height']/(0x1*-4841+0xec2*-1+0x21ad)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x26ea8f[_0x513452]['y']+_0x26ea8f[_0x513452]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x26ea8f[_0x513452]['id'])===-1&&(_0xac0c0b[-9362+0x68*0x9+-1*-8431]=_0x17a083(_0xac0c0b[0x2577+-4443+-5143],_0x26ea8f[_0x513452],this['selected']['height']));}for(const _0x35b94f of _0xac0c0b){if(_0x35b94f===undefined)continue;this['generateAl'+'ignLine'](_0x35b94f);}}['shortcuts'](_0x27065d,_0x1e8506){if(_0x27065d==='horizontal')switch(_0x1e8506){case 'begin':for(const _0x4652ba of this['selected']['ids']){const _0x512a0f=this['registered'][_0x4652ba],{y:_0x4b2d4d}=this['getTransla'+'tePos'](_0x512a0f['el']['style']['translate']),_0x17fb2b=this['selected']['x'];_0x512a0f['el']['style']['translate']=_0x17fb2b+'px\x20'+_0x4b2d4d+'px',this['registered'][_0x4652ba]['x']=_0x17fb2b;}break;case 'middle':for(const _0x392499 of this['selected']['ids']){const _0x14beee=this['registered'][_0x392499],{x:_0x2748b9,y:_0x4c1b4c}=this['getTransla'+'tePos'](_0x14beee['el']['style']['translate']),_0xe162f3=_0x2748b9-(_0x14beee['x']-(this['selected']['x']+this['selected']['width']/(0x89*0x46+-47*0x7+-47*0xc5)))-_0x14beee['width']/(-8*-461+-4866+0x49c);_0x14beee['el']['style']['translate']=_0xe162f3+'px\x20'+_0x4c1b4c+'px',this['registered'][_0x392499]['x']=_0xe162f3;}break;case 'end':for(const _0x58c2c9 of this['selected']['ids']){const _0x36ba4c=this['registered'][_0x58c2c9],{y:_0x231b29}=this['getTransla'+'tePos'](_0x36ba4c['el']['style']['translate']),_0x10edfe=this['selected']['x']+this['selected']['width']-_0x36ba4c['width'];_0x36ba4c['el']['style']['translate']=_0x10edfe+'px\x20'+_0x231b29+'px',this['registered'][_0x58c2c9]['x']=this['selected']['x']+this['selected']['width']-_0x36ba4c['width'];}break;case 'distribute':const _0x1b2168=this['selected']['ids']['sort']((_0x317c9a,_0x558b39)=>this['registered'][_0x317c9a]['x']-this['registered'][_0x558b39]['x']);let _0x469baf=-6697+0x3*0xadd+0x2*-823;for(const _0x14c5a4 of _0x1b2168){_0x469baf+=this['registered'][_0x14c5a4]['width'];}const _0x2dc70d=(this['selected']['width']-_0x469baf)/(_0x1b2168['length']-(-41*-177+-2101+-5155));let _0x5083f9=this['registered'][_0x1b2168[-12*0xf+0x2533*-1+0x1f*0x139]]['x'];for(let _0x5b5db3=0x1965+-1*-3916+-10417;_0x5b5db3<_0x1b2168['length'];_0x5b5db3++){const _0x2aa224=_0x1b2168[_0x5b5db3],_0x5c4649=this['registered'][_0x2aa224],{y:_0x7c69a4}=this['getTransla'+'tePos'](_0x5c4649['el']['style']['translate']);let _0x10a2e7=_0x5083f9;_0x5c4649['el']['style']['translate']=_0x10a2e7+'px\x20'+_0x7c69a4+'px',this['registered'][_0x2aa224]['x']=_0x10a2e7,_0x5083f9=_0x5083f9+_0x5c4649['width']+_0x2dc70d;}break;}else {if(_0x27065d==='vertical')switch(_0x1e8506){case 'begin':console['log']('begin');for(const _0x33be77 of this['selected']['ids']){const _0x5ec046=this['registered'][_0x33be77],{x:_0xb0c850}=this['getTransla'+'tePos'](_0x5ec046['el']['style']['translate']),_0x27a278=this['selected']['y'];_0x5ec046['el']['style']['translate']=_0xb0c850+'px\x20'+_0x27a278+'px',this['registered'][_0x33be77]['y']=_0x27a278;}break;case 'middle':console['log']('middle');for(const _0x24faba of this['selected']['ids']){const _0x5a230b=this['registered'][_0x24faba],{x:_0x4fab7e,y:_0x57fd97}=this['getTransla'+'tePos'](_0x5a230b['el']['style']['translate']),_0x350c6b=_0x57fd97-(_0x5a230b['y']-(this['selected']['y']+this['selected']['height']/(0xd34+-3613+0x2f*0x5)))-_0x5a230b['height']/(-1*0x9cd+-6502*0x1+0x2335);_0x5a230b['el']['style']['translate']=_0x4fab7e+'px\x20'+_0x350c6b+'px',this['registered'][_0x24faba]['y']=_0x350c6b;}break;case 'end':console['log']('end');for(const _0x38b508 of this['selected']['ids']){const _0x1ee4bf=this['registered'][_0x38b508],{x:_0x53c4cb}=this['getTransla'+'tePos'](_0x1ee4bf['el']['style']['translate']),_0x4e083b=this['selected']['y']+this['selected']['height']-_0x1ee4bf['height'];_0x1ee4bf['el']['style']['translate']=_0x53c4cb+'px\x20'+_0x4e083b+'px',this['registered'][_0x38b508]['y']=this['selected']['y']+this['selected']['height']-_0x1ee4bf['height'];}break;case 'distribute':console['log']('distribute');const _0x3cdc12=this['selected']['ids']['sort']((_0x38cf1a,_0xe52d09)=>this['registered'][_0x38cf1a]['y']-this['registered'][_0xe52d09]['y']);let _0x3eb607=0x565*-1+-161+0x2*0x303;for(const _0xb7d2c9 of _0x3cdc12){_0x3eb607+=this['registered'][_0xb7d2c9]['height'];}const _0x159fd1=(this['selected']['height']-_0x3eb607)/(_0x3cdc12['length']-(-1025+-281+0x51b));let _0x5c10f7=this['registered'][_0x3cdc12[-26*0x119+0x1*-4229+0x2d0f]]['y'];for(let _0x41fabb=0x800+-47*0x11+-1249*0x1;_0x41fabb<_0x3cdc12['length'];_0x41fabb++){const _0x1aaaf8=_0x3cdc12[_0x41fabb],_0xc7ae4a=this['registered'][_0x1aaaf8],{x:_0x2e4415}=this['getTransla'+'tePos'](_0xc7ae4a['el']['style']['translate']);let _0x50a4d6=_0x5c10f7;_0xc7ae4a['el']['style']['translate']=_0x2e4415+'px\x20'+_0x50a4d6+'px',this['registered'][_0x1aaaf8]['y']=_0x50a4d6,_0x5c10f7=_0x5c10f7+_0xc7ae4a['height']+_0x159fd1;}break;}else this['elMeasure']?.['classList']['contains']('active')?(this['shadowRoot']?.['removeEven'+'tListener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['remove']('active'),this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']()):(this['shadowRoot']?.['addEventLi'+'stener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['add']('active'));}this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['measure'](_0x208e97){if(this['selected']['ids']['length']===0xe21+-1*-1921+-5538)return;if(this['mouseMoveT'+'ype']==='main')return;let _0x46cd0c=null;_0x208e97['target']['id']==='main'&&(_0x46cd0c=_0x208e97['target']);_0x46cd0c===null&&(_0x46cd0c=_0x208e97['target']['closest']('glide-dnr-'+'item'));if(_0x46cd0c===null)return;this['isToolbar']&&(this['measureTar'+'getId']=_0x46cd0c['id']);if(_0x46cd0c['id']==='main'){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();this['isToolbar']&&(this['measureTar'+'getId']='',this['elMeasureO'+'utline']['style']['width']=0x1749+-1931*0x2+-2099,this['elMeasureO'+'utline']['style']['height']=0x132c*-2+0x1*-9643+-61*-319,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');return;}this['isToolbar']&&this['measureExe'+'cute']();}['measureExe'+'cute'](){if(this['measureTar'+'getId']==='')return;this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();const _0x1ab277=this['measureTar'+'getId'];for(const _0x199621 of this['selected']['ids']){if(_0x1ab277===_0x199621){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();return;}}const _0x14d9a3=this['selected']['x']+this['selected']['width'],_0x30db38=this['selected']['x']+this['selected']['width']/(0x1*0x8b+-9439+-9302*-1),_0x3ff2fc=this['selected']['y']+this['selected']['height'],_0x30008d=this['selected']['y']+this['selected']['height']/(0x20b*-11+0xd3b*-2+0x30f1),_0x4094f9=this['registered'][_0x1ab277]['x']+this['registered'][_0x1ab277]['width'],_0x49e0c5=this['registered'][_0x1ab277]['y']+this['registered'][_0x1ab277]['height'];let _0x3ce43b=![];if(_0x3ff2fc<this['registered'][_0x1ab277]['y']){_0x3ce43b=!![];const _0x5ce476=this['registered'][_0x1ab277]['y']-_0x3ff2fc;let _0x10030f=_0x30db38;_0x30db38===_0x4094f9&&(_0x10030f-=-67*0x6e+0x4*-2239+0x233*0x1d);this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x10030f+'px\x20'+_0x3ff2fc+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x5ce476+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');let _0x37bc15=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x482951=parseFloat(_0x37bc15['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x5ce476);const _0xca4f2c=Math['round'](_0x3ff2fc+_0x5ce476/(-8580+0x2*0x4f8+-3019*-2)-_0x482951/(-3785*-1+0x2054+-1*0x2f1b));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x30db38+(-346*0x18+0x19b*0x11+0x529)+'px\x20'+_0xca4f2c+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible',_0x30db38<=this['registered'][_0x1ab277]['x']&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x30db38+'px\x20'+this['registered'][_0x1ab277]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x1ab277]['x']-_0x30db38+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x30db38>=_0x4094f9&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4094f9+'px\x20'+this['registered'][_0x1ab277]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x30db38-_0x4094f9+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(_0x3ff2fc>=this['registered'][_0x1ab277]['y']&&_0x3ff2fc<=_0x49e0c5){_0x3ce43b=!![];const _0x2aaa49=_0x49e0c5-_0x3ff2fc;this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x30db38+'px\x20'+_0x3ff2fc+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x2aaa49+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');if(_0x3ff2fc>=this['registered'][_0x1ab277]['y']&&_0x3ff2fc<_0x49e0c5){let _0x24ab1f=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x212310=parseFloat(_0x24ab1f['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x2aaa49);const _0x4d24da=Math['round'](_0x3ff2fc+_0x2aaa49/(0x21a2+-457*0xe+0x5*-442)-_0x212310/(0x1bc6+0xc54+-2*0x140c));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x30db38+(0x1cd2+-1630+-5744)+'px\x20'+_0x4d24da+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible';}_0x30db38<=this['registered'][_0x1ab277]['x']&&_0x3ff2fc<_0x49e0c5&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x30db38+'px\x20'+(_0x49e0c5-(0x2185+0x377+-1*0x24fb))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x1ab277]['x']-_0x30db38+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x30db38>=_0x4094f9&&_0x3ff2fc<_0x49e0c5&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4094f9+'px\x20'+(_0x49e0c5-(-7577+0x52*0x40+0x91a))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x30db38-_0x4094f9+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>_0x49e0c5){_0x3ce43b=!![];const _0x3f54c8=this['selected']['y']-_0x49e0c5;let _0x4a7b45=_0x30db38;_0x30db38===_0x4094f9&&(_0x4a7b45-=0x603*0x4+0x941*-1+-1262*0x3);this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x4a7b45+'px\x20'+_0x49e0c5+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x3f54c8+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x550a99=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x469a41=parseFloat(_0x550a99['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x3f54c8);const _0x4fb481=Math['round'](this['selected']['y']-_0x3f54c8/(-345*-22+0xfc7+0x4d*-151)-_0x469a41/(0x11b0+-4580+0x36));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x30db38+(0x17f2+-2770*-3+-3*0x12cc)+'px\x20'+_0x4fb481+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x30db38<this['registered'][_0x1ab277]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x30db38+'px\x20'+(_0x49e0c5-(-1030+-2462*0x4+0x2a7f))+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x1ab277]['x']-_0x30db38+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x30db38>_0x4094f9&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4094f9+'px\x20'+(_0x49e0c5-(-8905+0x9ad*-1+-11383*-1))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x30db38-_0x4094f9+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>this['registered'][_0x1ab277]['y']&&this['selected']['y']<=_0x49e0c5){_0x3ce43b=!![];const _0x10dca7=this['selected']['y']-this['registered'][_0x1ab277]['y'];this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x30db38+'px\x20'+this['registered'][_0x1ab277]['y']+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x10dca7+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0xc56750=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x303148=parseFloat(_0xc56750['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x10dca7);const _0x922559=Math['round'](this['selected']['y']-_0x10dca7/(0x399*0x2+-711*0x4+0x4*0xfb)-_0x303148/(0x1b67+-5*0x613+0x2fa));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x30db38+(0x1d7a+0xb57*0x2+0x47*-188)+'px\x20'+_0x922559+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x30db38<this['registered'][_0x1ab277]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x30db38+'px\x20'+this['registered'][_0x1ab277]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x1ab277]['x']-_0x30db38+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x30db38>_0x4094f9&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x4094f9+'px\x20'+this['registered'][_0x1ab277]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=_0x30db38-_0x4094f9+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible'));}if(_0x14d9a3<this['registered'][_0x1ab277]['x']){_0x3ce43b=!![];let _0x5613e8=_0x30008d;_0x30008d===_0x49e0c5&&(_0x5613e8-=0x11f7+0x153*0xe+0x1*-9344);this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x14d9a3+(-4256*-1+-1*-6237+-10492)+'px\x20'+_0x5613e8+'px';const _0xe198f6=this['registered'][_0x1ab277]['x']-_0x14d9a3;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0xe198f6+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0xc981df=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x127765=parseFloat(_0xc981df['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0xe198f6);const _0x39e6ae=Math['round'](_0x14d9a3+_0xe198f6/(0x1199+0x2f*0xd1+-14326)-_0x127765/(0x26c9+-4911+-5016));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x39e6ae+'px\x20'+(_0x30008d+(0x1fba+-7102+-1016))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x30008d<=this['registered'][_0x1ab277]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x1ab277]['x']+'px\x20'+_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x1ab277]['y']-_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x30008d>=_0x49e0c5&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x1ab277]['x']+'px\x20'+_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x30008d-_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(_0x14d9a3>=this['registered'][_0x1ab277]['x']&&_0x14d9a3<_0x4094f9){_0x3ce43b=!![],this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x14d9a3+'px\x20'+_0x30008d+'px';const _0x4fe634=_0x4094f9-_0x14d9a3;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x4fe634+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x178e2c=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x11b725=parseFloat(_0x178e2c['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x4fe634);const _0x5157fc=Math['round'](_0x14d9a3+_0x4fe634/(0x280+0xf50+0x1*-4558)-_0x11b725/(0x13*-101+-2500+-1*-4421));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x5157fc+'px\x20'+(_0x30008d+(0x1e36+-305+0x5*-1485))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x30008d<this['registered'][_0x1ab277]['y']&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4094f9-(0xe2f*0x1+0x1a*0x11d+0x1*-11040)+'px\x20'+_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=this['registered'][_0x1ab277]['y']-_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible')),_0x30008d>_0x49e0c5&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4094f9-(-2704*-2+-2*0x9d+-5093*0x1)+'px\x20'+_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=_0x30008d-_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible'));}if(this['selected']['x']>_0x4094f9){_0x3ce43b=!![];let _0x2fa7a3=_0x30008d;_0x30008d===_0x49e0c5&&(_0x2fa7a3-=0x1c58*0x1+-4055+-3200);this['elMeasureL'+'ines']['solid_l']['style']['translate']=_0x4094f9-(-7410+-8960*0x1+0x3ff3)+'px\x20'+_0x2fa7a3+'px';const _0x4918e1=this['selected']['x']-_0x4094f9;this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x4918e1+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x1487e0=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x284bee=parseFloat(_0x1487e0['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x4918e1);const _0x5745c1=Math['round'](_0x4094f9+_0x4918e1/(0x8a*0x35+-19*-448+-15824)-_0x284bee/(0x2677*0x1+0x1b*-303+0x40*-26));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x5745c1+'px\x20'+(_0x30008d+(0x124c+-502*0x7+-1166))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x30008d<=this['registered'][_0x1ab277]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4094f9-(-4281+-2468+0x1a5e)+'px\x20'+_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x1ab277]['y']-_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x30008d>=_0x49e0c5&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4094f9-(0x20*-61+0xc65*-3+0x8*0x59a)+'px\x20'+_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x30008d-_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(this['selected']['x']>this['registered'][_0x1ab277]['x']&&this['selected']['x']<=_0x4094f9){_0x3ce43b=!![],this['elMeasureL'+'ines']['solid_l']['style']['translate']=this['registered'][_0x1ab277]['x']+'px\x20'+_0x30008d+'px';const _0xc43df9=this['selected']['x']-this['registered'][_0x1ab277]['x'];this['elMeasureL'+'ines']['solid_l']['style']['width']=_0xc43df9+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x22f10e=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x1c154e=parseFloat(_0x22f10e['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0xc43df9);const _0x5221ad=Math['round'](this['registered'][_0x1ab277]['x']+_0xc43df9/(0x4*0x7f1+0x18a6+-14440)-_0x1c154e/(0x256*0x4+0xc18+0x2*-2743));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x5221ad+'px\x20'+(_0x30008d+(-1669*-1+-5033*-1+-6698))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x30008d<=this['registered'][_0x1ab277]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x1ab277]['x']+'px\x20'+_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x1ab277]['y']-_0x30008d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x30008d>=_0x49e0c5&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x1ab277]['x']+'px\x20'+_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x30008d-_0x49e0c5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}_0x3ce43b?this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=this['registered'][_0x1ab277]['width']+'px',this['elMeasureO'+'utline']['style']['height']=this['registered'][_0x1ab277]['height']+'px',this['elMeasureO'+'utline']['style']['translate']=this['registered'][_0x1ab277]['x']+'px\x20'+this['registered'][_0x1ab277]['y']+'px',this['elMeasureO'+'utline']['style']['visibility']='visible',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='auto'):(this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed'](),this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0x570+-2227+0xa7*0x5,this['elMeasureO'+'utline']['style']['height']=-7842+-2207*-3+0xb*0x6f,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none'));}['hideMeasur'+'eReference'+'s'](){this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberB']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberB']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='hidden');}['hideMeasur'+'eDeshed'](){this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='hidden');}['triggerSel'+'ectedLines'+'Vectors'](_0x2e8407){_0x2e8407==='hide'?this['elSelected'+'Lines']['l']['style']['visibility']!=='hidden'&&(this['elSelected'+'Lines']['l']['style']['visibility']='hidden',this['elSelected'+'Lines']['r']['style']['visibility']='hidden',this['elSelected'+'Lines']['t']['style']['visibility']='hidden',this['elSelected'+'Lines']['b']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tr']['style']['visibility']='hidden',this['elSelected'+'Vectors']['bl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['br']['style']['visibility']='hidden'):this['elSelected'+'Lines']['l']['style']['visibility']!=='visible'&&(this['elSelected'+'Lines']['l']['style']['visibility']='visible',this['elSelected'+'Lines']['r']['style']['visibility']='visible',this['elSelected'+'Lines']['t']['style']['visibility']='visible',this['elSelected'+'Lines']['b']['style']['visibility']='visible',this['elSelected'+'Vectors']['tl']['style']['visibility']='visible',this['elSelected'+'Vectors']['tr']['style']['visibility']='visible',this['elSelected'+'Vectors']['bl']['style']['visibility']='visible',this['elSelected'+'Vectors']['br']['style']['visibility']='visible');}['delete'](){const _0x1b9ac4=new CustomEvent('onActions',{'detail':{'type':'delete','ids':this['selected']['ids']}});this['dispatchEv'+'ent'](_0x1b9ac4);}['init'](){const _0x480d21=document['createElem'+'ent']('template');_0x480d21['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x480d21['content']),this['onSlotChan'+'ge'](),this['handleClic'+'k'](),this['initKeyboa'+'rdEvents']();}}customElements['define']('glide-dnr',GlideDNR);
export{GlideDNR as default};