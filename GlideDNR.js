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
var _0xa5b81b = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);const HasOwn=(_0x33e25c,_0x462b37)=>{if(typeof _0x33e25c!=='object')return ![];if(_0x33e25c===null||Array['isArray'](_0x33e25c))return ![];return Object['prototype']['hasOwnProp'+'erty']['call'](_0x33e25c,_0x462b37);};console['log']('Glide\x20DNR\x20'+'v1.0.5');const properties=['toolbar','measure','toolbar-pl'+'acement','actions'],_window=window,lineSize=-153*0x31+-107*-37+0x49d*0x3,vectorSize=0x663+0x1f32+-601*0x10,colors={'primary':'#4907DA','red':'#FB2C36','redActive':'#E7110C'};let dragBeginPos={'x':-1,'y':-1};const vectorOffset=vectorSize/(0x45d+0x9d4+0xe2f*-1)+(0x20e4+-8090+-329),originSelected={'ids':[],'x':0x0,'y':0x0,'width':0x0,'height':0x0};class GlideDNR extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'isToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'toolbarPla'+'cement',{'enumerable':!![],'configurable':!![],'writable':!![],'value':'float'}),Object['defineProp'+'erty'](this,'loadingIte'+'ms',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{'general':{'total':0x0,'loaded':0x0},'image':{'total':0x0,'loaded':0x0}}}),Object['defineProp'+'erty'](this,'selected',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0xa5b81b(originSelected)}),Object['defineProp'+'erty'](this,'registered',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'requestAni'+'mation',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elSelected'+'Lines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'elSelected'+'Vectors',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'rDrags',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elAligns',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasureO'+'utline',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'measureTar'+'getId',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'latestSele'+'cted',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0xa5b81b(originSelected)}),Object['defineProp'+'erty'](this,'lastClickT'+'ime',{'enumerable':!![],'configurable':!![],'writable':!![],'value':-1}),Object['defineProp'+'erty'](this,'isInit',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseMoveT'+'ype',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'hasSelecte'+'d',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'hasMoved',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isInSelect'+'ed',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseTarge'+'t',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'thresholdH'+'orizontal',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'thresholdV'+'ertical',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'alignVecto'+'rsLinesThr'+'eshold',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0.1}),Object['defineProp'+'erty'](this,'elMeasureL'+'ines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['measure']=this['measure']['bind'](this),this['delete']=this['delete']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x44543c,_0x525451,_0x3db164){if(_0x525451===_0x3db164)return;switch(_0x44543c){case 'toolbar':_0x3db164===''&&(this['isToolbar']=!![]);break;case 'measure':_0x3db164===''&&(this['isMeasure']=!![]);break;case 'toolbar-pl'+'acement':this['toolbarPla'+'cement']=_0x3db164;break;case 'actions':_0x3db164===''&&(this['isActions']=!![]);break;}}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22c'+'ontainer\x22\x20'+'id=\x22contai'+'ner\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22main'+'\x22\x20id=\x22main'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<slot\x20c'+'lass=\x22slot'+'\x22></slot>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_align\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_drag\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22refere'+'nce-lines_'+'selected\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<!--\x20line'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20class=\x22l'+'ine\x20left\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20style=\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20'+(this['selected']['x']-lineSize/(-4090+0x8*0x14c+-718*-2))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20righ'+'t\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20style'+'=\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x20')+(this['selected']['x']+this['selected']['width']-lineSize/(-711*-3+-1338*0x1+-793))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20top\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20style=\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'late:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-1667*0x5+-4065+-2067*-6))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20bott'+'om\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-8893*0x1+-5161+0x36e8))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20vector\x20-'+'->\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'class=\x22vec'+'tor\x20top-le'+'ft\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20top-r'+'ight\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20st'+'yle=\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'translate:'+'\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-left\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'style=\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-right\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20style=\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20transla'+'te:\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20测距离参考线\x20和'+'\x20数字\x20-->\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22me'+'asure-line'+'s\x22>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<!--\x20'+'实线：选中项\x20-->'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22solid\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22item\x20'+'top\x22></div'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22item'+'\x20bottom\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20left\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20rig'+'ht\x22></div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'!--\x20虚线：目标项'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22das'+'hed\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20horiz'+'ontal-top\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20hor'+'izontal-bo'+'ttom\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22ite'+'m\x20vertical'+'-left\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22it'+'em\x20vertica'+'l-right\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22numb'+'er\x20number-'+'top\x22>283</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22num'+'ber\x20number'+'-bottom\x22>2'+'22</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22number\x20nu'+'mber-left\x22'+'>333</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22number\x20'+'number-rig'+'ht\x22>444</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'measure-ta'+'rget-outli'+'ne\x22></div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20')+(this['isToolbar']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar\x22>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22inner\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22grou'+'p\x20aligns\x22\x20'+'id=\x22aligns'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20hor'+'izontal-le'+'ft\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M145.39-1'+'00q-12.77\x20'+'0-21.39-8.'+'62-8.61-8.'+'61-8.61-21'+'.38v-700q0'+'-12.77\x208.6'+'1-21.38\x208.'+'62-8.62\x2021'+'.39-8.62\x201'+'2.77\x200\x2021.'+'38\x208.62\x208.'+'62\x208.61\x208.'+'62\x2021.38v7'+'00q0\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62Zm171.92'+'-193.85q-2'+'0.77\x200-35.'+'58-14.8-14'+'.8-14.81-1'+'4.8-35.58\x20'+'0-20.77\x2014'+'.8-35.58\x201'+'4.81-14.8\x20'+'35.58-14.8'+'h236.92q20'+'.77\x200\x2035.5'+'8\x2014.8\x2014.'+'8\x2014.81\x2014'+'.8\x2035.58\x200'+'\x2020.77-14.'+'8\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'317.31Zm0-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H3'+'17.31Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22toolbar'+'-item\x20hori'+'zontal-cen'+'ter\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+('ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M4'+'50-130v-16'+'3.85H310.3'+'9q-20.77\x200'+'-35.58-14.'+'8Q260-323.'+'46\x20260-344'+'.23q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450v'+'-170.78H19'+'0.39q-20.7'+'7\x200-35.58-'+'14.8Q140-5'+'95\x20140-615'+'.77q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450V'+'-830q0-12.'+'75\x208.63-21'+'.37\x208.63-8'+'.63\x2021.38-'+'8.63\x2012.76'+'\x200\x2021.37\x208'+'.63Q510-84'+'2.75\x20510-8'+'30v163.85h'+'259.61q20.'+'77\x200\x2035.58'+'\x2014.8Q820-'+'636.54\x20820'+'-615.77q0\x20'+'20.77-14.8'+'1\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'510v170.78'+'h139.61q20'+'.77\x200\x2035.5'+'8\x2014.8Q700'+'-365\x20700-3'+'44.23q0\x2020'+'.77-14.81\x20'+'35.58-14.8'+'1\x2014.8-35.'+'58\x2014.8H51'+'0V-130q0\x201'+'2.75-8.63\x20'+'21.37-8.63'+'\x208.63-21.3'+'8\x208.63-12.'+'76\x200-21.37'+'-8.63Q450-'+'117.25\x20450'+'-130Z\x22/></'+'svg>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22toolbar-'+'item\x20horiz'+'ontal-righ'+'t\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<svg\x20xmlns'+'=\x22http://w'+'ww.w3.org/'+'2000/svg\x22\x20'+'height=\x2218'+'px\x22\x20viewBo'+'x=\x220\x20-960\x20'+'960\x20960\x22\x20w'+'idth=\x2218px'+'\x22\x20fill=\x22#0'+'30713\x22><pa'+'th\x20d=\x22M814'+'.61-100q-1'+'2.77\x200-21.'+'38-8.62-8.'+'62-8.61-8.'+'62-21.38v-'+'700q0-12.7'+'7\x208.62-21.'+'38\x208.61-8.'+'62\x2021.38-8')+('.62t21.39\x20'+'8.62q8.61\x20'+'8.61\x208.61\x20'+'21.38v700q'+'0\x2012.77-8.'+'61\x2021.38-8'+'.62\x208.62-2'+'1.39\x208.62Z'+'M405.77-29'+'3.85q-20.7'+'7\x200-35.58-'+'14.8-14.8-'+'14.81-14.8'+'-35.58\x200-2'+'0.77\x2014.8-'+'35.58\x2014.8'+'1-14.8\x2035.'+'58-14.8h23'+'6.92q20.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58\x200\x2020'+'.77-14.8\x203'+'5.58-14.81'+'\x2014.8-35.5'+'8\x2014.8H405'+'.77Zm-240-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H1'+'65.77Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22divide'+'r\x22></div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-top\x22>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M344.23-1'+'10q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-488'+'.07q0-20.7'+'7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v488.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q365-110\x20'+'344.23-110'+'Zm271.54-2'+'40q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-248'+'.07q0-20.7')+('7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v248.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q636.54-3'+'50\x20615.77-'+'350ZM130-7'+'90.38q-12.'+'77\x200-21.38'+'-8.62-8.62'+'-8.61-8.62'+'-21.38t8.6'+'2-21.39q8.'+'61-8.61\x2021'+'.38-8.61h7'+'00q12.77\x200'+'\x2021.38\x208.6'+'1\x208.62\x208.6'+'2\x208.62\x2021.'+'39\x200\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62H130Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20ver'+'tical-cent'+'er\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'svg\x20xmlns='+'\x22http://ww'+'w.w3.org/2'+'000/svg\x22\x20h'+'eight=\x2218p'+'x\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218px\x22'+'\x20fill=\x22#03'+'0713\x22><pat'+'h\x20d=\x22M342.'+'31-140q-20'+'.77\x200-35.5'+'8-14.81-14'+'.81-14.81-'+'14.81-35.5'+'8V-450H130'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-51'+'0\x20130-510h'+'161.92v-25'+'9.61q0-20.'+'77\x2014.81-3'+'5.58Q321.5'+'4-820\x20342.'+'31-820q20.'+'77\x200\x2035.57'+'\x2014.81\x2014.'+'81\x2014.81\x201'+'4.81\x2035.58'+'V-510h174.'+'62v-139.61'+'q0-20.77\x201'+'4.81-35.58'+'Q596.92-70'+'0\x20617.69-7'+'00t35.58\x201'+'4.81q14.81'+'\x2014.81\x2014.'+'81\x2035.58V-'+'510H830q12'+'.75\x200\x2021.3'+'7\x208.63\x208.6'+'3\x208.63\x208.6'+'3\x2021.38\x200\x20'+'12.76-8.63'+'\x2021.37Q842'+'.75-450\x2083'+'0-450H668.'+'08v139.61q'+'0\x2020.77-14'+'.81\x2035.58Q'+'638.46-260'+'\x20617.69-26')+('0q-20.77\x200'+'-35.57-14.'+'81-14.81-1'+'4.81-14.81'+'-35.58V-45'+'0H392.69v2'+'59.61q0\x2020'+'.77-14.81\x20'+'35.58Q363.'+'08-140\x20342'+'.31-140Z\x22/'+'></svg>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22toolb'+'ar-item\x20ve'+'rtical-bot'+'tom\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-110q-12'+'.77\x200-21.3'+'8-8.62Q100'+'-127.23\x2010'+'0-140t8.62'+'-21.39Q117'+'.23-170\x2013'+'0-170h700q'+'12.77\x200\x2021'+'.38\x208.61Q8'+'60-152.77\x20'+'860-140q0\x20'+'12.77-8.62'+'\x2021.38Q842'+'.77-110\x2083'+'0-110H130Z'+'m214.23-15'+'1.54q-20.7'+'7\x200-35.58-'+'14.81-14.8'+'-14.81-14.'+'8-35.57V-8'+'00q0-20.77'+'\x2014.8-35.5'+'7\x2014.81-14'+'.81\x2035.58-'+'14.81\x2020.7'+'7\x200\x2035.58\x20'+'14.81\x2014.8'+'\x2014.8\x2014.8'+'\x2035.57v488'+'.08q0\x2020.7'+'6-14.8\x2035.'+'57-14.81\x201'+'4.81-35.58'+'\x2014.81Zm27'+'1.54\x200q-20'+'.77\x200-35.5'+'8-14.81-14'+'.8-14.81-1'+'4.8-35.57V'+'-560q0-20.'+'77\x2014.8-35'+'.57\x2014.81-'+'14.81\x2035.5'+'8-14.81\x2020'+'.77\x200\x2035.5'+'8\x2014.81\x2014'+'.8\x2014.8\x2014'+'.8\x2035.57v2'+'48.08q0\x2020'+'.76-14.8\x203'+'5.57-14.81'+'\x2014.81-35.'+'58\x2014.81Z\x22'+'/></svg>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22div'+'ider\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba')+('r-item\x20hor'+'izontal-di'+'stribute\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<sv'+'g\x20xmlns=\x22h'+'ttp://www.'+'w3.org/200'+'0/svg\x22\x20hei'+'ght=\x2218px\x22'+'\x20viewBox=\x22'+'0\x20-960\x20960'+'\x20960\x22\x20widt'+'h=\x2218px\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M129.99'+'-100q-12.7'+'6\x200-21.37-'+'8.63Q100-1'+'17.25\x20100-'+'130v-700q0'+'-12.75\x208.6'+'3-21.37\x208.'+'63-8.63\x2021'+'.38-8.63\x201'+'2.76\x200\x2021.'+'37\x208.63Q16'+'0-842.75\x201'+'60-830v700'+'q0\x2012.75-8'+'.63\x2021.37-'+'8.63\x208.63-'+'21.38\x208.63'+'Zm350.06-1'+'90q-20.82\x20'+'0-35.43-14'+'.58Q430-31'+'9.17\x20430-3'+'40v-280q0-'+'20.83\x2014.5'+'7-35.42Q45'+'9.14-670\x204'+'79.95-670q'+'20.82\x200\x2035'+'.43\x2014.58Q'+'530-640.83'+'\x20530-620v2'+'80q0\x2020.83'+'-14.57\x2035.'+'42Q500.86-'+'290\x20480.05'+'-290Zm349.'+'94\x20190q-12'+'.76\x200-21.3'+'7-8.63Q800'+'-117.25\x2080'+'0-130v-700'+'q0-12.75\x208'+'.63-21.37\x20'+'8.63-8.63\x20'+'21.38-8.63'+'\x2012.76\x200\x202'+'1.37\x208.63Q'+'860-842.75'+'\x20860-830v7'+'00q0\x2012.75'+'-8.63\x2021.3'+'7-8.63\x208.6'+'3-21.38\x208.'+'63Z\x22/></sv'+'g>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-distrib'+'ute\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-100q-12'+'.75\x200-21.3'+'7-8.63-8.6'+'3-8.63-8.6'+'3-21.38\x200-'+'12.76\x208.63'+'-21.37Q117')+('.25-160\x2013'+'0-160h700q'+'12.75\x200\x2021'+'.37\x208.63\x208'+'.63\x208.63\x208'+'.63\x2021.38\x20'+'0\x2012.76-8.'+'63\x2021.37Q8'+'42.75-100\x20'+'830-100H13'+'0Zm210-330'+'q-20.83\x200-'+'35.42-14.5'+'7Q290-459.'+'14\x20290-479'+'.95q0-20.8'+'2\x2014.58-35'+'.43Q319.17'+'-530\x20340-5'+'30h280q20.'+'83\x200\x2035.42'+'\x2014.57Q670'+'-500.86\x2067'+'0-480.05q0'+'\x2020.82-14.'+'58\x2035.43Q6'+'40.83-430\x20'+'620-430H34'+'0ZM130-800'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-86'+'0\x20130-860h'+'700q12.75\x20'+'0\x2021.37\x208.'+'63\x208.63\x208.'+'63\x208.63\x2021'+'.38\x200\x2012.7'+'6-8.63\x2021.'+'37Q842.75-'+'800\x20830-80'+'0H130Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22d'+'ivider\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22group'+'\x20measure\x22\x20'+'id=\x22measur'+'e\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'toolbar-it'+'em\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20xmln'+'s=\x22http://'+'www.w3.org'+'/2000/svg\x22'+'\x20height=\x221'+'8\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M172.31'+'-260Q142-2'+'60\x20121-281'+'q-21-21-21'+'-51.44v-29'+'5.12Q100-6'+'58\x20121-679'+'q21-21\x2051.'+'31-21h615.'+'38Q818-700'+'\x20839-679q2'+'1\x2021\x2021\x2051'+'.44v295.12'+'Q860-302\x208'+'39-281q-21'+'\x2021-51.31\x20'+'21H172.31Z'+'m0-60h615.'+'38q4.62\x200\x20'+'8.46-3.85\x20'+'3.85-3.84\x20'+'3.85-8.46v'+'-295.38q0-'+'4.62-3.85-'+'8.46-3.84-'+'3.85-8.46-'+'3.85H670v1'+'14.61q0\x2012'+'.75-8.63\x202'+'1.38-8.63\x20'+'8.62-21.38'+'\x208.62-12.7'+'6\x200-21.37-'+'8.62-8.62-'+'8.63-8.62-'+'21.38V-640'+'H510v114.6'+'1q0\x2012.75-'+'8.63\x2021.38'+'-8.63\x208.62'+'-21.38\x208.6'+'2-12.76\x200-'+'21.37-8.62'+'-8.62-8.63'+'-8.62-21.3'+'8V-640H350'+'v114.61q0\x20'+'12.75-8.63'+'\x2021.38-8.6'+'3\x208.62-21.'+'38\x208.62-12'+'.76\x200-21.3'+'7-8.62-8.6'+'2-8.63-8.6'+'2-21.38V-6'+'40H172.31q'+'-4.62\x200-8.'+'46\x203.85-3.'+'85\x203.84-3.'+'85\x208.46v29'+'5.38q0\x204.6'+'2\x203.85\x208.4'+'6\x203.84\x203.8'+'5\x208.46\x203.8'+'5ZM320-495'+'.39Zm160\x200'+'Zm160\x200ZM4'+'80-480Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20'):'')+('\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22actions\x22'+'\x20id=\x22actio'+'ns\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22act'+'ions-item\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<svg\x20x'+'mlns=\x22http'+'://www.w3.'+'org/2000/s'+'vg\x22\x20height'+'=\x2218\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'\x22><path\x20d='+'\x22M280-120q'+'-33\x200-56.5'+'-23.5T200-'+'200v-520q-'+'17\x200-28.5-'+'11.5T160-7'+'60q0-17\x2011'+'.5-28.5T20'+'0-800h160q'+'0-17\x2011.5-'+'28.5T400-8'+'40h160q17\x20'+'0\x2028.5\x2011.'+'5T600-800h'+'160q17\x200\x202'+'8.5\x2011.5T8'+'00-760q0\x201'+'7-11.5\x2028.'+'5T760-720v'+'520q0\x2033-2'+'3.5\x2056.5T6'+'80-120H280'+'Zm400-600H'+'280v520h40'+'0v-520ZM40'+'0-280q17\x200'+'\x2028.5-11.5'+'T440-320v-'+'280q0-17-1'+'1.5-28.5T4'+'00-640q-17'+'\x200-28.5\x2011'+'.5T360-600'+'v280q0\x2017\x20'+'11.5\x2028.5T'+'400-280Zm1'+'60\x200q17\x200\x20'+'28.5-11.5T'+'600-320v-2'+'80q0-17-11'+'.5-28.5T56'+'0-640q-17\x20'+'0-28.5\x2011.'+'5T520-600v'+'280q0\x2017\x201'+'1.5\x2028.5T5'+'60-280ZM28'+'0-720v520-'+'520Z\x22/></s'+'vg>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22loa'+'ding\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22i'+'nner\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20/*\x20定义旋'+'转动画\x20*/\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20@keyf'+'rames\x20rota'+'te360\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fr'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ransform:\x20'+'rotate(0de'+'g);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20to\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'form:\x20rota'+'te(360deg)'+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20:host\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x20calc(100'+'%\x20-\x201px);\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20ca'+'lc(100%\x20-\x20'+'1px);\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.co'+'ntainer\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'00%;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20positio'+'n:\x20relativ'+'e;\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.mai'+'n\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x20100%;\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20::slot'+'ted(glide-'+'dnr-item)\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20inline-'+'block;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20flex-sh'+'rink:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20user-'+'select:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'cursor:\x20au'+'to;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.al'+'ign-vector'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20col'+'or:\x20'))+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20font'+'-size:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lin'+'e-height:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20z-i'+'ndex:\x201000'+'04;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'line\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ali'+'gn-line-ve'+'rtical\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20border-'+'top:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.align-li'+'ne-horizon'+'tal\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-lef'+'t:\x20solid\x201'+'px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'reference-'+'lines_sele'+'cted\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.line\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100002;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20visibi'+'lity:\x20hidd'+'en;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20&.left,\x20&'+'.right\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20&:'+'hover\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20cu'+'rsor:\x20ew-r'+'esize;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20&::b'+'efore\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20co'+'ntent:\x20\x27\x27;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20left:\x20')+Math['floor'](lineSize/(0x25c6+-974*-6+0x1*-15512))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x20100%;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op,\x20&.bott'+'om\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&:hove'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20cursor'+':\x20ns-resiz'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20&::befor'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20conten'+'t:\x20\x27\x27;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lef'+'t:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x20')+Math['floor'](lineSize/(0x2*0xb29+0x8b*-49+-1099*-1))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+':\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.vector\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20display'+':\x20inline-b'+'lock;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border:\x20so'+'lid\x201px\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'#ffffff;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20z-ind'+'ex:\x20100003'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.top'+'-left,\x20&.b'+'ottom-righ'+'t\x20{\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20se-resize'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op-right,\x20'+'&.bottom-l'+'eft\x20{\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&:hov'+'er\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20nesw-re'+'size;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.re'+'ference-li'+'nes_drag\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20w'+'idth:\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x200px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20top:\x200px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20border:\x20s'+'olid\x201px\x20')+colors['primary']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20z-in'+'dex:\x2011;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20rgba('+'73,\x207,\x20218'+',\x20.05);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'toolbar\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20')+(this['toolbarPla'+'cement']==='float'?'inline':'block')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20posi'+'tion:\x20abso'+'lute;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'top:\x20')+(this['toolbarPla'+'cement']==='float'?-1*-3758+0x9*-898+0x10e4:'10px')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20')+(this['toolbarPla'+'cement']==='float'?'':'width:\x20100'+'%;')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ext-align:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20ponter-'+'events:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20z-'+'index:\x20100'+'005;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.inner\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-flex;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20gap:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'padding:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-rad'+'ius:\x208px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20tran'+'slate:\x200px'+'\x200px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20rgba(2'+'55,255,255'+',.5);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backdrop'+'-filter:\x20b'+'lur(25px);'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20box'+'-shadow:\x200'+'\x204px\x206px\x20-'+'1px\x20rgb(0\x20'+'0\x200\x20/\x200.1)'+',\x200\x202px\x204p'+'x\x20-2px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20ponter'+'-events:\x20a'+'uto;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.group\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20gap:\x204px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'align-item'+'s:\x20center;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.div'+'ider\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20wid'+'th:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20#D1D5'+'DC;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.toolba'+'r-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20in'+'line-flex;'+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20padding:\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20pointer'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20#F3'+'F4F6;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20&'+':active\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20#E5E7E'+'B;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&.acti'+'ve\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.too'+'lbar-item\x20'+'{\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20'))+colors['primary']+(';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20svg\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20#ffffff;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20.m'+'easure-lin'+'es\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0006;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.solid\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ite'+'m\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20left:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100005;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x204px\x2012'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'y;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'bottom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.b'+'ottom\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x204px'+'\x2012px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-y;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20bottom,'+'\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.l'+'eft\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'size:\x2012px'+'\x204px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-rep'+'eat:\x20repea'+'t-x;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-imag'+'e:\x20linear-'+'gradient(t'+'o\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.r'+'ight\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x2012p'+'x\x204px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-x;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.da'+'shed\x20{\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.item\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'visibility'+':\x20hidden;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20left:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0005;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.hor'+'izontal-to'+'p\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x2012px\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.horiz'+'ontal-bott'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x201px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground-s'+'ize:\x2012px\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-repe'+'at:\x20repeat'+'-x;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-image'+':\x20linear-g'+'radient(to'+'\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-left\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x201p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-size:\x20'+'4px\x2012px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-repeat:\x20r'+'epeat-y;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'image:\x20lin'+'ear-gradie'+'nt(to\x20bott'+'om,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-right\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-size:'+'\x204px\x2012px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20backgroun'+'d-repeat:\x20'+'repeat-y;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-image:\x20li'+'near-gradi'+'ent(to\x20bot'+'tom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.number'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20v'+'isibility:'+'\x20hidden;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20top:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'font-size:'+'\x2010px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20padding'+':2px\x204px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-radiu'+'s:\x204px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20color:'+'\x20#FFFFFF;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.measur'+'e-target-o'+'utline\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20visibil'+'ity:\x20hidde'+'n;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bor'+'der:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20box-'+'sizing:\x20bo'+'rder-box;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20pointer'+'-events:\x20n'+'one\x20!impor'+'tant;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'z-index:\x201'+'00006;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.actio'+'ns\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20a'+'bsolute;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20left:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.action'+'s-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20paddi'+'ng:\x204px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20translate'+':\x200px\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kdrop-filt'+'er:\x20blur(2'+'5px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20z-index:'+'\x20100004;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20line-'+'height:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20cur'+'sor:\x20point'+'er;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20svg\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&:h'+'over\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:activ'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20')+colors['redActive']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'loading\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20width:\x20'+'100%;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x2010'+'0%;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'rgba(255,2'+'55,255,.5)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'drop-filte'+'r:\x20blur(25'+'px);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20fl'+'ex;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20al'+'ign-items:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20z-index'+':\x20100007;\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20.inne'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'relative;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r:\x202px\x20sol'+'id\x20#4907DA'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-top-c'+'olor:\x20rgba'+'(0,\x200,\x200,\x20'+'0.2);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20border-r'+'ight-color'+':\x20rgba(0,\x20'+'0,\x200,\x200.2)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-botto'+'m-color:\x20r'+'gba(0,\x200,\x20'+'0,\x200.2);\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'100%;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20animati'+('on:\x20rotate'+'360\x20infini'+'te\x200.75s\x20l'+'inear;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20.s'+'lot\x20{}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20'));}['onceBindin'+'gs'](){const _0xc04307=this['shadowRoot'];if(_0xc04307===null)return;let _0x3ab460=_0xc04307['querySelec'+'tor']('.main');if(_0x3ab460!==null&&_0x3ab460!==undefined){const {width:_0x278043,height:_0x154871}=_0x3ab460['getBoundin'+'gClientRec'+'t']();this['registered']['main']={'id':'main','el':_0x3ab460,'x':0x0,'y':0x0,'width':_0x278043,'height':_0x154871,'type':'main'};}this['isToolbar']&&(_0x3ab460=_0xc04307['querySelec'+'tor']('.toolbar'),_0x3ab460!==null&&(this['elToolbar']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.aligns'),_0x3ab460!==null&&(this['elAligns']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure'),_0x3ab460!==null&&(this['elMeasure']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-t'+'arget-outl'+'ine'),_0x3ab460!==null&&(this['elMeasureO'+'utline']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.top'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['solid_t']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.bott'+'om'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['solid_b']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.left'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['solid_l']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.righ'+'t'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['solid_r']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-top'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['dashed_h_t']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-bot'+'tom'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['dashed_h_b']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-left'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['dashed_v_l']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-right'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['dashed_v_r']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-top'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['numberT']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-bottom'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['numberB']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-left'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['numberL']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-right'),_0x3ab460!==null&&(this['elMeasureL'+'ines']['numberR']=_0x3ab460)),_0x3ab460=_0xc04307['querySelec'+'tor']('.left'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'l')&&(this['elSelected'+'Lines']['l']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.right'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'r')&&(this['elSelected'+'Lines']['r']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.top'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'t')&&(this['elSelected'+'Lines']['t']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.bottom'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'b')&&(this['elSelected'+'Lines']['b']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.top-left'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'tl')&&(this['elSelected'+'Vectors']['tl']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.top-right'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'tr')&&(this['elSelected'+'Vectors']['tr']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.bottom-le'+'ft'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'bl')&&(this['elSelected'+'Vectors']['bl']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.bottom-ri'+'ght'),_0x3ab460!==null&&!HasOwn(this['elSelected'+'Lines'],'br')&&(this['elSelected'+'Vectors']['br']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('.reference'+'-lines_dra'+'g'),_0x3ab460!==null&&this['rDrags']===null&&(this['rDrags']=_0x3ab460),_0x3ab460=_0xc04307['querySelec'+'tor']('#actions'),_0x3ab460!==null&&(this['elActions']=_0x3ab460);}['countLoadi'+'ngItems'](){const _0x7cf2da=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x7cf2da===null||_0x7cf2da===undefined)return;const _0x178a4a=_0x7cf2da['assignedNo'+'des']({'flatten':![]});for(const _0xf24c41 in _0x178a4a){const _0x508b92=_0x178a4a[_0xf24c41];if(_0x508b92['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x491306=_0x508b92['getAttribu'+'te']('type');_0x491306==='image'&&this['loadingIte'+'ms']['image']['total']++,(_0x491306===null||_0x491306==='general')&&this['loadingIte'+'ms']['general']['total']++;}}['hideLoadin'+'g'](){if(this['loadingIte'+'ms']['general']['loaded']===this['loadingIte'+'ms']['general']['total']&&this['loadingIte'+'ms']['image']['loaded']===this['loadingIte'+'ms']['image']['total']){const _0x561410=this['shadowRoot']?.['querySelec'+'tor']('.loading');_0x561410!==null&&_0x561410!==undefined&&(_0x561410['style']['display']='none');}}['renderItem'+'s'](){const _0x1c7967=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x1c7967===null||_0x1c7967===undefined)return;const _0x58f518=_0x1c7967['assignedNo'+'des']({'flatten':![]});for(const _0x396630 in _0x58f518){const _0x1d1112=_0x58f518[_0x396630];if(_0x1d1112['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x179753=_0x1d1112['getAttribu'+'te']('type');(_0x179753===null||_0x179753==='general')&&(this['renderItem'](_0x1d1112),this['hideLoadin'+'g']());if(_0x179753==='image'){if(_0x1d1112['querySelec'+'tor']('canvas'))continue;this['renderImag'+'eItem'](_0x1d1112)['then'](()=>{this['hideLoadin'+'g']();});}}}['renderItem'](_0x9ea1ab){const _0x475d97=_0x9ea1ab['getBoundin'+'gClientRec'+'t']();let _0x2d4f24=_0x475d97['width'],_0x381268=_0x475d97['height'];const _0x3a4083=_0x9ea1ab['getAttribu'+'te']('left'),_0x18b453=_0x9ea1ab['getAttribu'+'te']('top'),_0x259afc=_0x9ea1ab['getAttribu'+'te']('width'),_0x473e38=_0x9ea1ab['getAttribu'+'te']('height');let _0x55eec4=0x3*0x883+0xd1f*-1+-3178,_0x4f9a80=0x1a3f+0x3*0x8a3+-4*0xd0a;_0x3a4083!==null&&(_0x55eec4=_0x3a4083);_0x18b453!==null&&(_0x4f9a80=_0x18b453);_0x259afc!==null&&(_0x2d4f24=_0x259afc);_0x473e38!==null&&(_0x381268=_0x473e38);if(_0x9ea1ab['style']['translate']!==''){const _0x43f697=window['getCompute'+'dStyle'](_0x9ea1ab),_0x4f4193=this['getTransla'+'tePos'](_0x43f697['translate']);_0x55eec4=_0x4f4193['x'],_0x4f9a80=_0x4f4193['y'];}_0x55eec4=Math['round'](_0x55eec4),_0x4f9a80=Math['round'](_0x4f9a80),_0x2d4f24=Math['round'](_0x2d4f24),_0x381268=Math['round'](_0x381268),this['registered'][_0x9ea1ab['id']]={'id':_0x9ea1ab['id'],'el':_0x9ea1ab,'x':_0x55eec4,'y':_0x4f9a80,'width':_0x2d4f24,'height':_0x381268,'type':'general'},this['loadingIte'+'ms']['general']['loaded']++,_0x9ea1ab['style']['visibility']='visible',_0x9ea1ab['style']['translate']=_0x55eec4+'px\x20'+_0x4f9a80+'px',_0x9ea1ab['style']['width']=_0x2d4f24+'px',_0x9ea1ab['style']['height']=_0x381268+'px';}['renderImag'+'eItem'](_0x4d6f30){return new Promise(_0xf111f5=>{if(_0x4d6f30['nodeType']===Node['ELEMENT_NO'+'DE']){const _0x115305=document['createElem'+'ent']('canvas');_0x115305['style']['cssText']='width:\x20100'+'%;\x20height:'+'\x20100%;';const _0x1cddaf=_0x115305['getContext']('2d'),_0x48b473=_0x4d6f30['querySelec'+'tor']('img'),_0x1d9bc9=new Image();_0x1d9bc9['src']=_0x48b473['src'];const _0xed0afe=_0x4d6f30['getElement'+'sByTagName']('img');Array['from'](_0xed0afe)['forEach'](_0x52de72=>{_0x52de72['remove']();}),_0x1d9bc9['onload']=()=>{let _0x3492a2=0x1f25+-5051*-1+-1628*0x8,_0x314c72=0x1a83*-1+0x149*-8+0x24cb;const _0x180a8e=_0x4d6f30['getAttribu'+'te']('left'),_0x2a4e2c=_0x4d6f30['getAttribu'+'te']('top'),_0x204db8=_0x4d6f30['getAttribu'+'te']('width'),_0x4c040c=_0x4d6f30['getAttribu'+'te']('height');_0x180a8e!==null&&(_0x3492a2=_0x180a8e);_0x2a4e2c!==null&&(_0x314c72=_0x2a4e2c);if(_0x4d6f30['style']['translate']!==''){const _0xdb58b2=window['getCompute'+'dStyle'](_0x4d6f30),_0x5584e6=this['getTransla'+'tePos'](_0xdb58b2['translate']);_0x3492a2=_0x5584e6['x'],_0x314c72=_0x5584e6['y'];}const _0x2ca20a=_0x1d9bc9['width']/_0x1d9bc9['height'];let _0x3e45f6=_0x1d9bc9['width'],_0x2b1661=_0x1d9bc9['height'];if(_0x204db8!==null&&_0x4c040c!==null)_0x3e45f6=_0x204db8,_0x2b1661=_0x3e45f6/_0x2ca20a,_0x4d6f30['style']['width']=Math['round'](_0x3e45f6)+'px',_0x4d6f30['style']['height']=Math['round'](_0x2b1661)+'px';else {if(_0x204db8!==null&&_0x4c040c===null)_0x3e45f6=_0x204db8,_0x2b1661=_0x3e45f6/_0x2ca20a,_0x4d6f30['style']['width']=Math['round'](_0x3e45f6)+'px',_0x4d6f30['style']['height']=Math['round'](_0x2b1661)+'px';else _0x204db8===null&&_0x4c040c!==null?(_0x2b1661=_0x4c040c,_0x3e45f6=_0x2b1661*_0x2ca20a,_0x4d6f30['style']['width']=Math['round'](_0x3e45f6)+'px',_0x4d6f30['style']['height']=Math['round'](_0x2b1661)+'px'):(_0x4d6f30['style']['width']=Math['round'](_0x3e45f6)+'px',_0x4d6f30['style']['height']=Math['round'](_0x2b1661)+'px');}_0x3492a2=Math['round'](_0x3492a2),_0x314c72=Math['round'](_0x314c72),_0x3e45f6=Math['round'](_0x3e45f6),_0x2b1661=Math['round'](_0x2b1661),this['registered'][_0x4d6f30['id']]={'id':_0x4d6f30['id'],'el':_0x4d6f30,'x':_0x3492a2,'y':_0x314c72,'width':_0x3e45f6,'height':_0x2b1661,'type':'image'};const _0x2603c2=Math['min'](window['innerWidth']/_0x1d9bc9['width'],window['innerHeigh'+'t']/_0x1d9bc9['height']),_0x56d3a7=Math['round'](_0x1d9bc9['width']*_0x2603c2),_0x4b7120=Math['round'](_0x1d9bc9['height']*_0x2603c2);_0x115305['width']=_0x56d3a7,_0x115305['height']=_0x4b7120,_0x1cddaf?.['drawImage'](_0x1d9bc9,0x6*0x496+0x1*-131+-1*0x1b01,0x15b*0x5+0x1*0xd2d+-5108,_0x56d3a7,_0x4b7120),_0x4d6f30['appendChil'+'d'](_0x115305),this['selected']['ids']['length']>-37*0x2f+0xcbc*-2+0x2043&&(this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()),this['loadingIte'+'ms']['image']['loaded']++,_0x4d6f30['style']['visibility']='visible',_0x4d6f30['style']['translate']=_0x3492a2+'px\x20'+_0x314c72+'px',_0x4d6f30['style']['width']=_0x3e45f6+'px',_0x4d6f30['style']['height']=_0x2b1661+'px',_0xf111f5('');};}});}['initKeyboa'+'rdEvents'](){document['addEventLi'+'stener']('keydown',_0xa3dff5=>{switch(_0xa3dff5['keyCode']){case  -634+0x6b*-74+0x1*0x218d:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x2f2bbb of this['selected']['ids']){this['registered'][_0x2f2bbb]['x']--,this['registered'][_0x2f2bbb]['el']['style']['translate']=this['registered'][_0x2f2bbb]['x']+'px\x20'+this['registered'][_0x2f2bbb]['y']+'px';}this['selected']['x']--;}break;case 0x1*-309+0xb*-377+-4494*-1:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x339839 of this['selected']['ids']){this['registered'][_0x339839]['y']--,this['registered'][_0x339839]['el']['style']['translate']=this['registered'][_0x339839]['x']+'px\x20'+this['registered'][_0x339839]['y']+'px';}this['selected']['y']--;}break;case  -1002+0x1fc2+-7089*0x1:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x1f7300 of this['selected']['ids']){this['registered'][_0x1f7300]['x']++,this['registered'][_0x1f7300]['el']['style']['translate']=this['registered'][_0x1f7300]['x']+'px\x20'+this['registered'][_0x1f7300]['y']+'px';}this['selected']['x']++;}break;case 0x1*-4557+-1*0x18cd+0x2ac2:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x4f90fc of this['selected']['ids']){this['registered'][_0x4f90fc]['y']++,this['registered'][_0x4f90fc]['el']['style']['translate']=this['registered'][_0x4f90fc]['x']+'px\x20'+this['registered'][_0x4f90fc]['y']+'px';}this['selected']['y']++;}break;}this['renderSele'+'ctedRefere'+'nce'](),this['measureExe'+'cute'](),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position']();});}['onSlotChan'+'ge'](){const _0x59f7ac=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x59f7ac===null||_0x59f7ac===undefined)return;_0x59f7ac?.['addEventLi'+'stener']('slotchange',()=>{this['countLoadi'+'ngItems'](),this['renderItem'+'s'](),!this['isInit']&&(this['onceBindin'+'gs'](),this['isInit']=!![]);});}['getSelecte'+'dParams'](){let _0xd8e8ca={'x':0x0,'y':0x0},_0x5ce6ec={'x':0x0,'y':0x0};for(let _0xa813e5=-1*0x1a87+-4243*-1+0x16c*0x7;_0xa813e5<this['selected']['ids']['length'];_0xa813e5++){const _0x54eff3=this['selected']['ids'][_0xa813e5];if(_0xa813e5===0x3b5+0x2*0x266+0x137*-7)_0xd8e8ca={'x':this['registered'][_0x54eff3]['x'],'y':this['registered'][_0x54eff3]['y']},_0x5ce6ec={'x':this['registered'][_0x54eff3]['x']+this['registered'][_0x54eff3]['width'],'y':this['registered'][_0x54eff3]['y']+this['registered'][_0x54eff3]['height']};else {const _0x30adae=this['registered'][_0x54eff3]['x'],_0x57cc34=this['registered'][_0x54eff3]['y'];_0xd8e8ca={'x':_0x30adae<_0xd8e8ca['x']?_0x30adae:_0xd8e8ca['x'],'y':_0x57cc34<_0xd8e8ca['y']?_0x57cc34:_0xd8e8ca['y']};const _0x22fa44=this['registered'][_0x54eff3]['x']+this['registered'][_0x54eff3]['width'],_0x9c545d=this['registered'][_0x54eff3]['y']+this['registered'][_0x54eff3]['height'];_0x5ce6ec={'x':_0x22fa44>=_0x5ce6ec['x']?_0x22fa44:_0x5ce6ec['x'],'y':_0x9c545d>=_0x5ce6ec['y']?_0x9c545d:_0x5ce6ec['y']};}}const _0x38bf62=_0x5ce6ec['x']-_0xd8e8ca['x'],_0x3377b5=_0x5ce6ec['y']-_0xd8e8ca['y'];this['selected']={...this['selected'],...{'x':_0xd8e8ca['x'],'y':_0xd8e8ca['y'],'width':_0x38bf62,'height':_0x3377b5}};}['renderSele'+'ctedRefere'+'nce'](){this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-1*-1417+0x1*0x32f+-1115*0x2)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['l']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(-222*-16+-9971+0x1915)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x18b3+-1101+-5220))+'px',this['elSelected'+'Lines']['t']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x1bf+-1483+0x40e))+'px',this['elSelected'+'Lines']['b']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';}['isSelected'+'Item'](_0x19e061,_0x2cb624){const _0x511bc0=[{'x':_0x19e061['x'],'y':_0x19e061['y']},{'x':_0x19e061['x']+_0x19e061['width'],'y':_0x19e061['y']},{'x':_0x19e061['x'],'y':_0x19e061['y']+_0x19e061['height']},{'x':_0x19e061['x']+_0x19e061['width'],'y':_0x19e061['y']+_0x19e061['height']}];for(let _0x3bf5df=0x1644+0x14c7+0x2b0b*-1;_0x3bf5df<_0x511bc0['length'];_0x3bf5df++){const _0x219e18=_0x511bc0[_0x3bf5df];if(this['isPointInR'+'ectangle'](_0x219e18,_0x2cb624))return !![];}return ![];}['renderDrag'+'SelectRefe'+'renceLine'](_0x39ec45,_0x2461f0){const _0x439798=this['shadowRoot'];if(_0x439798===null)return;const _0x4d58a4=_window['getCompute'+'dStyle'](this['rDrags']);_0x4d58a4['visibility']!=='visible'&&(this['rDrags']['style']['visibility']='visible');dragBeginPos['x']===-1&&(dragBeginPos['x']=_0x39ec45['clientX'],dragBeginPos['y']=_0x39ec45['clientY']);const _0x449b97={'x':dragBeginPos['x'],'y':dragBeginPos['y']},_0x3dd37={'x':-1,'y':-1,'width':0x0,'height':0x0};_0x39ec45['clientX']>_0x449b97['x']?(_0x3dd37['x']=_0x449b97['x']-_0x2461f0['x'],_0x3dd37['width']=_0x39ec45['clientX']-_0x449b97['x']):(_0x3dd37['x']=_0x39ec45['clientX']-_0x2461f0['x'],_0x3dd37['width']=_0x449b97['x']-_0x39ec45['clientX']);_0x39ec45['clientY']>_0x449b97['y']?(_0x3dd37['y']=_0x449b97['y']-_0x2461f0['y'],_0x3dd37['height']=_0x39ec45['clientY']-_0x449b97['y']):(_0x3dd37['y']=_0x39ec45['clientY']-_0x2461f0['y'],_0x3dd37['height']=_0x449b97['y']-_0x39ec45['clientY']);this['rDrags']['style']['translate']=_0x3dd37['x']+'px\x20'+_0x3dd37['y']+'px',this['rDrags']['style']['width']=_0x3dd37['width']+'px',this['rDrags']['style']['height']=_0x3dd37['height']+'px';const _0x20519b=_0x439798['querySelec'+'tor']('slot');if(_0x20519b===null)return;const _0x1d0c38=Object['values'](_0xa5b81b(this['registered']));for(let _0x48cafb=-4*-81+-7149+-39*-175;_0x48cafb<_0x1d0c38['length'];_0x48cafb++){if(this['isSelected'+'Item'](_0x1d0c38[_0x48cafb],_0x3dd37))this['selected']['ids']['indexOf'](_0x1d0c38[_0x48cafb]['id'])===-1&&this['selected']['ids']['push'](_0x1d0c38[_0x48cafb]['id']);else {const _0x9e464a=this['selected']['ids']['indexOf'](_0x1d0c38[_0x48cafb]['id']);_0x9e464a!==-1&&this['selected']['ids']['splice'](_0x9e464a,0x1b8c+0x18e*0x13+0x1*-14613);}}this['selected']['ids']['length']>0x564+-48*0xd0+0xb34*0x3?this['triggerSel'+'ectedLines'+'Vectors']('show'):this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x526657=this['selected']['ids']['map'](_0x2a5c5f=>{return {'id':_0x2a5c5f,'type':this['registered'][_0x2a5c5f]['type']};}),_0x41251d=new CustomEvent('onSelect',{'detail':_0x526657});this['dispatchEv'+'ent'](_0x41251d),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['isPointInR'+'ectangle'](_0x2a4fda,_0x57ef8f){if(_0x2a4fda['x']>_0x57ef8f['x']&&_0x2a4fda['x']<_0x57ef8f['x']+_0x57ef8f['width']&&_0x2a4fda['y']>_0x57ef8f['y']&&_0x2a4fda['y']<_0x57ef8f['y']+_0x57ef8f['height'])return !![];return ![];}['handleClic'+'k'](){const _0x73e296=this['shadowRoot'];if(_0x73e296===null)return;_0x73e296['addEventLi'+'stener']('mousedown',_0x1842d9=>{_0x1842d9['preventDef'+'ault']();const _0x8c2bec=this['shadowRoot'];if(_0x8c2bec===null)return;this['hasMoved']=![],this['hasSelecte'+'d']=![],this['latestSele'+'cted']=_0xa5b81b(this['selected']);const _0x3ccf5c=this['getBoundin'+'gClientRec'+'t'](),_0x2b7856={'x':_0x1842d9['clientX']-_0x3ccf5c['x'],'y':_0x1842d9['clientY']-_0x3ccf5c['y']},_0x1ea352=_0x1842d9['target']['closest']('glide-dnr-'+'item');let _0x493ba1='';this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=-587*0xd+-4559+-6095*-2,this['elMeasureO'+'utline']['style']['height']=-5*-1919+-6758+-2837,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');this['isActions']&&(this['elActions']['style']['visibility']='hidden',this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['removeEven'+'tListener']('click',this['delete']));if(_0x1ea352)this['mouseTarge'+'t']='elements',this['mouseDownE'+'lement'](_0x1ea352);else {if(_0x1842d9['target']['closest']('.line')){this['mouseTarge'+'t']='line';if(_0x1842d9['target']['classList']['contains']('left'))_0x493ba1='l';else {if(_0x1842d9['target']['classList']['contains']('right'))_0x493ba1='r';else {if(_0x1842d9['target']['classList']['contains']('top'))_0x493ba1='t';else _0x1842d9['target']['classList']['contains']('bottom')&&(_0x493ba1='b');}}}else {if(_0x1842d9['target']['closest']('.vector')){this['mouseTarge'+'t']='vector';if(_0x1842d9['target']['classList']['contains']('top-left'))_0x493ba1='tl';else {if(_0x1842d9['target']['classList']['contains']('top-right'))_0x493ba1='tr';else {if(_0x1842d9['target']['classList']['contains']('bottom-lef'+'t'))_0x493ba1='bl';else _0x1842d9['target']['classList']['contains']('bottom-rig'+'ht')&&(_0x493ba1='br');}}}else {if(_0x1842d9['target']['closest']('.actions-i'+'tem'))this['triggerAct'+'ions']();else {if(_0x1842d9['target']['closest']('.toolbar-i'+'tem'))_0x1842d9['target']['closest']('.horizonta'+'l-left')&&this['shortcuts']('horizontal','begin'),_0x1842d9['target']['closest']('.horizonta'+'l-center')&&this['shortcuts']('horizontal','middle'),_0x1842d9['target']['closest']('.horizonta'+'l-right')&&this['shortcuts']('horizontal','end'),_0x1842d9['target']['closest']('.horizonta'+'l-distribu'+'te')&&this['shortcuts']('horizontal','distribute'),_0x1842d9['target']['closest']('.vertical-'+'top')&&this['shortcuts']('vertical','begin'),_0x1842d9['target']['closest']('.vertical-'+'center')&&this['shortcuts']('vertical','middle'),_0x1842d9['target']['closest']('.vertical-'+'bottom')&&this['shortcuts']('vertical','end'),_0x1842d9['target']['closest']('.vertical-'+'distribute')&&this['shortcuts']('vertical','distribute'),_0x1842d9['target']['closest']('.measure')&&this['shortcuts']('','measure');else _0x3ccf5c&&(this['mouseTarge'+'t']='elements',this['isInSelect'+'ed']=this['isPointInR'+'ectangle'](_0x2b7856,this['selected']),!this['isInSelect'+'ed']&&(this['selected']=_0xa5b81b(originSelected),this['renderSele'+'ctedRefere'+'nce']()));}}}}this['selected']['ids']['length']>0x6*0x347+-7599+0xa05&&(this['hasSelecte'+'d']=!![]);const _0x27dcd1={'x':Math['round'](_0x1842d9['clientX']-this['selected']['x']),'y':Math['round'](_0x1842d9['clientY']-this['selected']['y'])},_0xeb4309={'x':Math['round'](_0x1842d9['clientX']),'y':Math['round'](_0x1842d9['clientY'])},_0x54674c=_0xa5b81b(this['selected']),_0x595013=_0xa5b81b(this['registered']),_0x5c83b7=_0x54674c['width']/_0x54674c['height'];document['onmousemov'+'e']=_0x2f9b4c=>{_0x2f9b4c['preventDef'+'ault'](),_0x2f9b4c['stopPropag'+'ation'](),this['mouseMoveT'+'ype']='main',this['hasMoved']=!![],this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['requestAni'+'mation']=requestAnimationFrame(()=>{this['isToolbar']&&(this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));const _0xcfdcc9={'x':Math['round'](_0x2f9b4c['clientX']),'y':Math['round'](_0x2f9b4c['clientY'])};switch(this['mouseTarge'+'t']){case 'elements':this['hasSelecte'+'d']&&this['isInSelect'+'ed']?(this['moveElemen'+'ts']({'x':Math['round'](_0x2f9b4c['clientX']),'y':Math['round'](_0x2f9b4c['clientY'])},_0x27dcd1,_0x595013),this['referenceA'+'lignLinesV'+'ectors'](_0x595013,_0x54674c)):this['renderDrag'+'SelectRefe'+'renceLine'](_0x2f9b4c,_0x3ccf5c);break;case 'line':this['moveLines'](_0x493ba1,_0x595013,_0x54674c,_0xeb4309,_0xcfdcc9);break;case 'vector':this['moveVector'+'s'](_0x493ba1,_0x595013,_0x54674c,_0xeb4309,_0xcfdcc9,_0x5c83b7);break;}});},document['onmouseup']=()=>{document['onmousemov'+'e']=null,document['onmouseup']=null,this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['mouseUpEle'+'ment'](_0x595013);};});}['getTransla'+'tePos'](_0x37e991){let _0x5699bc=-1,_0x251b4a=-1;if(_0x37e991!=='none'){if(_0x37e991['indexOf']('\x20')>-1){const _0x5ac217=_0x37e991['split']('\x20');_0x5699bc=parseFloat(_0x5ac217[0xd*-67+-2*0x1166+0x2633]['replace']('px','')),_0x251b4a=parseFloat(_0x5ac217[0x13c5+-367*-22+-13134]['replace']('px',''));}else _0x5699bc=parseFloat(_0x37e991['replace']('px',''));}return {'x':_0x5699bc,'y':_0x251b4a};}['mouseDownE'+'lement'](_0x1b8a50){if(this['selected']['ids']['indexOf'](_0x1b8a50['id'])===-1){this['selected']['ids']=[_0x1b8a50['id']];const _0x5dc86c=this['selected']['ids']['map'](_0x31c28e=>{return {'id':_0x31c28e,'type':this['registered'][_0x31c28e]['type']};}),_0x13b752=new CustomEvent('onSelect',{'detail':_0x5dc86c});this['dispatchEv'+'ent'](_0x13b752),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}this['isInSelect'+'ed']=!![];if(this['lastClickT'+'ime']===-1)this['lastClickT'+'ime']=new Date()['getTime']();else {const _0x13cd87=new Date()['getTime']()-this['lastClickT'+'ime'];if(_0x13cd87>-23*-233+-4538*0x1+-646)this['lastClickT'+'ime']=new Date()['getTime']();else {this['lastClickT'+'ime']=-1;if(this['selected']['ids']['indexOf'](_0x1b8a50['id'])>-1){this['selected']['ids']=[_0x1b8a50['id']];const _0x482f08=this['selected']['ids']['map'](_0xcf3f74=>{return {'id':_0xcf3f74,'type':this['registered'][_0xcf3f74]['type']};}),_0x1ee730=new CustomEvent('onSelect',{'detail':_0x482f08});this['dispatchEv'+'ent'](_0x1ee730),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}}}}['mouseUpEle'+'ment'](_0xea0bd2){if(this['hasMoved']){this['lastClickT'+'ime']=-1,dragBeginPos={'x':-1,'y':-1},this['rDrags']['style']['visibility']='hidden',this['rDrags']['style']['translate']='-1px\x20-1px',this['rDrags']['style']['width']='0',this['rDrags']['style']['height']='0';if(this['mouseTarge'+'t']==='elements')for(let _0x535b78 of this['selected']['ids']){this['registered'][_0x535b78]['x']=_0xea0bd2[_0x535b78]['x'],this['registered'][_0x535b78]['y']=_0xea0bd2[_0x535b78]['y'];}(this['mouseTarge'+'t']==='line'||this['mouseTarge'+'t']==='vector')&&(this['registered']=_0xa5b81b(_0xea0bd2),this['getSelecte'+'dParams']());const _0x5901ad=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor');_0x5901ad!==undefined&&_0x5901ad['forEach'](_0xf9a58b=>{_0xf9a58b['remove']();});const _0x55c1ba=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e');_0x55c1ba!==undefined&&_0x55c1ba['forEach'](_0x219dcf=>{_0x219dcf['remove']();});}if(this['selected']['ids']['length']>0xf2d+0x568+-5269)this['isToolbar']&&!(this['selected']['ids']['length']===-1*-3041+0x5*-106+0x9ce*-1&&!this['isMeasure'])&&(this['selected']['ids']['length']>-1*-3083+-761*0x3+-799?this['elAligns']['style']['display']!=='inline-fle'+'x'&&(this['elAligns']['style']['display']='inline-fle'+'x'):this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='inline-fle'+'x'&&(this['elMeasure']['style']['display']='inline-fle'+'x')),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position'](),this['elToolbar']['style']['visibility']!=='visible'&&(this['elToolbar']['style']['visibility']='visible')),this['triggerSel'+'ectedLines'+'Vectors']('show');else {this['isToolbar']&&!(this['selected']['ids']['length']===0x1929+-131*-61+0x1*-14431&&!this['isMeasure'])&&(this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='none'&&(this['elMeasure']['style']['display']='none')),this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x46c87d=new CustomEvent('onSelect',{'detail':[]});this['dispatchEv'+'ent'](_0x46c87d);}this['mouseMoveT'+'ype']='',this['isActions']&&this['triggerAct'+'ions']();}['setToolbar'+'Position'](){const _0x205356=window['getCompute'+'dStyle'](this['elToolbar']),_0xfc88dc=parseFloat(_0x205356['width']['replace']('px',''));this['elToolbar']['style']['translate']=this['selected']['x']+this['selected']['width']/(-8130+-130*0x4c+-474*-38)-_0xfc88dc/(0xdf*-2+0x64d*0x3+0x1*-4391)+'px\x20'+(this['selected']['y']-(0x1a2b+-5856+0x9*-89))+'px';}['triggerAct'+'ions'](){this['selected']['ids']['length']>-2997+-5309+0x2072?(this['elActions']['style']['translate']=this['selected']['x']+this['selected']['width']+(-1607+0x1*-4615+0x6*0x40e)+'px\x20'+this['selected']['y']+'px',this['elActions']['style']['visibility']='visible',this['elActions']['style']['pointerEve'+'nts']='auto',this['elActions']['addEventLi'+'stener']('click',this['delete'])):(this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['style']['visibility']='hidden',this['elActions']['removeEven'+'tListener']('click',this['delete']));}['moveElemen'+'ts'](_0x14335d,_0x30b314,_0x3de629){const _0x48dfa5=_0x14335d['x']-_0x30b314['x'],_0x2e2f77=_0x14335d['y']-_0x30b314['y'],_0x202265=_0x48dfa5+this['selected']['width'],_0x15a9e8=_0x2e2f77+this['selected']['height'],_0x58e82d=this['registered']['main']['x']+this['registered']['main']['width'],_0xb0d3d9=this['registered']['main']['x']+this['registered']['main']['height'];this['selected']['x']=_0x48dfa5,this['selected']['y']=_0x2e2f77;_0x48dfa5<=0x1*-7914+-502*0x4+0x26c2&&(this['selected']['x']=0x13b2+-9103+-1*-4061);_0x202265>=_0x58e82d&&(this['selected']['x']=_0x58e82d-this['selected']['width']);_0x2e2f77<=-1*0x12af+0x252c+-4733&&(this['selected']['y']=-1*0x25aa+-942*0x9+-4530*-4);_0x15a9e8>=_0xb0d3d9&&(this['selected']['y']=_0xb0d3d9-this['selected']['height']);this['triggerSel'+'ectedLines'+'Vectors']('hide'),this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-1177*-8+-5743+-3671*0x1)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x1325+-1217*-1+-6116)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x266a+-3833*-1+-13665))+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-2882*-2+-1*0x19a+-5352))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';for(let _0x1ae274 of this['selected']['ids']){this['selected']['ids']['length']===0x1556+-7539+0x81e?(_0x3de629[_0x1ae274]['x']=this['selected']['x'],_0x3de629[_0x1ae274]['y']=this['selected']['y']):(_0x3de629[_0x1ae274]['x']=this['registered'][_0x1ae274]['x']-this['latestSele'+'cted']['x']+this['selected']['x'],_0x3de629[_0x1ae274]['y']=this['registered'][_0x1ae274]['y']-this['latestSele'+'cted']['y']+this['selected']['y']);_0x3de629[_0x1ae274]['el']['style']['translate']=_0x3de629[_0x1ae274]['x']+'px\x20'+_0x3de629[_0x1ae274]['y']+'px';const _0x1f4bda=new CustomEvent('onChange',{'detail':{'id':_0x1ae274,'type':'move','x':_0x3de629[_0x1ae274]['x'],'y':_0x3de629[_0x1ae274]['y'],'width':_0x3de629[_0x1ae274]['width'],'height':_0x3de629[_0x1ae274]['height']}});this['dispatchEv'+'ent'](_0x1f4bda);}}['moveLines'](_0x3ac7e0,_0x4d47b4,_0x52e5cb,_0x334c5a,_0x23fce7){let _0x312b04=-24*-224+0x12d*-5+-553*0x7,_0x55f0a6=-151*-60+0x575+-10457,_0x2d3514=-3945+-58*-64+0xe9*0x1,_0x2967b0=-9206+-8883+-1*-18089;_0x55f0a6=_0x23fce7['y']-(_0x23fce7['y']-_0x52e5cb['y']);const _0x30340d=_0x23fce7['x']-_0x334c5a['x'],_0x24ffda=_0x23fce7['y']-_0x334c5a['y'],_0x2015c1=_0x30340d/_0x52e5cb['width'],_0x14ca20=_0x24ffda/_0x52e5cb['height'];switch(_0x3ac7e0){case 'l':_0x312b04=_0x52e5cb['x']+_0x30340d,_0x2d3514=_0x52e5cb['x']-_0x312b04+_0x52e5cb['width'],this['elSelected'+'Lines']['l']['style']['translate']=_0x312b04-(0xe55+-37*0xbd+0xcfe+0.5)+'px\x20'+_0x55f0a6+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x2d3514+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x312b04-(-6195+0x141e+0x417*0x1+0.5)+'px\x20'+(_0x55f0a6-(-5148+0x6b*0x59+-4373+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x2d3514+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x312b04-(0x7*-331+0x2579+0x2*-3637+0.5)+'px\x20'+(_0x55f0a6+_0x52e5cb['height']-(0x2428+0x123b*0x1+-13921+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x312b04-(-5942+-1*-1789+0x103d)+'px\x20'+(_0x55f0a6-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x312b04-(0x21dd+0x1e25+-16382)+'px\x20'+(_0x55f0a6+_0x52e5cb['height']-vectorOffset)+'px';for(const _0x4f211a of _0x52e5cb['ids']){const _0x85f5a5=this['registered'][_0x4f211a],_0x900090=_0x85f5a5['width']*(-1355*-4+0x265*-13+0x1e*0x55-_0x2015c1),_0x1313ef=_0x85f5a5['x']+_0x30340d*(0x20c9+-5781+-373*0x7-(_0x85f5a5['x']-_0x52e5cb['x'])/_0x52e5cb['width']);_0x4d47b4[_0x4f211a]['x']=_0x1313ef,_0x4d47b4[_0x4f211a]['width']=_0x900090,_0x85f5a5['el']['style']['width']=_0x900090+'px',_0x85f5a5['el']['style']['translate']=_0x1313ef+'px\x20'+_0x85f5a5['y']+'px';const _0x41d2c6=new CustomEvent('onChange',{'detail':{'id':_0x4f211a,'type':'scale-left','x':_0x4d47b4[_0x4f211a]['x'],'y':_0x4d47b4[_0x4f211a]['y'],'width':_0x4d47b4[_0x4f211a]['width'],'height':_0x4d47b4[_0x4f211a]['height']}});this['dispatchEv'+'ent'](_0x41d2c6);}break;case 'r':_0x312b04=_0x52e5cb['x']+_0x52e5cb['width'];_0x312b04<=_0x52e5cb['x']&&(_0x312b04=_0x52e5cb['x']);_0x2d3514=_0x52e5cb['width']+_0x30340d;_0x2d3514<-44*0x6e+-1*-2219+0xa3d&&(_0x2d3514=-5396*0x1+-625+0x3*0x7d7);requestAnimationFrame(()=>{this['elSelected'+'Lines']['r']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']+_0x30340d-(0xeda*-2+0xd36+-2*-2112+0.5)+'px\x20'+_0x55f0a6+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x52e5cb['x']-(0x1924+-29+-915*0x7+0.5)+'px\x20'+(_0x55f0a6-(0x3*0xcf9+-2393*-3+-5*0xd64+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x2d3514+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x52e5cb['x']-(0x1a1+0x1c31+-7632+0.5)+'px\x20'+(_0x52e5cb['y']+_0x52e5cb['height']-(0x23e7*0x1+-8641+-548+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x2d3514+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']+_0x30340d-(0x1af0+0x4*-1623+0x191*-1+0.5)+'px\x20'+(_0x52e5cb['y']-(-2*-2683+0x12b*-25+0x840+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']+_0x30340d-(-1116+0x21ac*0x1+-7501+0.5)+'px\x20'+(_0x52e5cb['y']+_0x52e5cb['height']-(0x20e1+-4669+-3745+0.5))+'px';for(const _0x32d20c of _0x52e5cb['ids']){const _0x15d770=this['registered'][_0x32d20c],_0x3d72bd=_0x15d770['width']*(-20*-37+-37*0x16+0x4b+_0x2015c1);_0x15d770['el']['style']['width']!==_0x3d72bd+'px'&&(_0x15d770['el']['style']['width']=_0x3d72bd+'px',_0x4d47b4[_0x32d20c]['width']=_0x3d72bd);const _0x19bea1=new CustomEvent('onChange',{'detail':{'id':_0x32d20c,'type':'scale-righ'+'t','x':_0x4d47b4[_0x32d20c]['x'],'y':_0x4d47b4[_0x32d20c]['y'],'width':_0x4d47b4[_0x32d20c]['width'],'height':_0x4d47b4[_0x32d20c]['height']}});this['dispatchEv'+'ent'](_0x19bea1);}});break;case 't':_0x312b04=_0x52e5cb['x'],_0x55f0a6=_0x52e5cb['y']+_0x24ffda;let _0x1d02f3=_0x52e5cb['height']-_0x24ffda;_0x55f0a6>=_0x52e5cb['y']+_0x52e5cb['height']&&(_0x55f0a6=_0x52e5cb['y']+_0x52e5cb['height']);_0x2967b0<=-8894+0x13f7+-291*-13&&(_0x2967b0=-6*-720+-39*-1+-4359*0x1);this['elSelected'+'Lines']['t']['style']['translate']=_0x312b04-(-944+-179*0x19+0x152d+0.5)+'px\x20'+(_0x55f0a6-(-109*-17+-1108+-743+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x312b04-(-1606+0x2*0x5e+0x58c+0.5)+'px\x20'+(_0x55f0a6-(-1*-6911+-1*-9521+0x2017*-2+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x1d02f3+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']-(-8*-692+-614*0x4+-81*0x26+0.5)+'px\x20'+(_0x55f0a6-(0x791+-3226*0x1+-1*-1291+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x1d02f3+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x312b04-(-3192+0x6b*-67+0x287c+0.5)+'px\x20'+(_0x55f0a6-(0x12d8+0x4e6+-27*0xe1+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']-(0x1*-1247+-9535+0x2a21+0.5)+'px\x20'+(_0x55f0a6-(-3430+0x2*-4737+0x326b*0x1+0.5))+'px';for(const _0x2a73dd of _0x52e5cb['ids']){const _0x37d2b9=this['registered'][_0x2a73dd],_0x57f618=_0x37d2b9['height']*(-1*0x3b+-40*-1+0x14*0x1-_0x14ca20),_0x5435d1=_0x37d2b9['y']+_0x24ffda*(-6286+0xb6*0x15+0x9a1-(_0x37d2b9['y']-_0x52e5cb['y'])/_0x52e5cb['height']);_0x37d2b9['el']['style']['height']=_0x57f618+'px',_0x37d2b9['el']['style']['translate']=_0x37d2b9['x']+'px\x20'+_0x5435d1+'px',_0x4d47b4[_0x2a73dd]['y']=_0x5435d1,_0x4d47b4[_0x2a73dd]['height']=_0x57f618;const _0x2545a5=new CustomEvent('onChange',{'detail':{'id':_0x2a73dd,'type':'scale-top','x':_0x4d47b4[_0x2a73dd]['x'],'y':_0x4d47b4[_0x2a73dd]['y'],'width':_0x4d47b4[_0x2a73dd]['width'],'height':_0x4d47b4[_0x2a73dd]['height']}});this['dispatchEv'+'ent'](_0x2545a5);}break;case 'b':_0x55f0a6=_0x52e5cb['y']+_0x52e5cb['height'];_0x55f0a6<=_0x52e5cb['y']&&(_0x55f0a6=_0x52e5cb['y']);_0x2967b0=_0x52e5cb['height']+_0x24ffda;_0x2967b0<0x1*-9389+0x1a2f*-1+0x3edc&&(_0x2967b0=-304*0x11+0x1*-6018+0x2f*0xee);this['elSelected'+'Lines']['t']['style']['translate']=_0x52e5cb['x']-(0x5*-409+0x5*0x635+-6*0x3d7+0.5)+'px\x20'+(_0x52e5cb['y']-(-4584+-1180+0x1686+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x52e5cb['x']-(0x238b*-1+-5689+0x39c6+0.5)+'px\x20'+(_0x52e5cb['y']-(0x1ab3+-4631*0x2+0x97d+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x2967b0+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']-(0x1f67+-1*-3412+0x2cb9*-1+0.5)+'px\x20'+(_0x52e5cb['y']-(-6820+-4681+-1*-11503+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x2967b0+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x52e5cb['x']+'px\x20'+(_0x55f0a6+_0x24ffda-(-6115+0xf40+-1*-2213+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x52e5cb['x']-(-1348*0x4+0x819+0xcfa*0x1+0.5)+'px\x20'+(_0x55f0a6+_0x24ffda-(-259*-30+0xf5+-4*0x7d3+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x52e5cb['x']+_0x52e5cb['width']-(-1*-5897+-2242+-3652+0.5)+'px\x20'+(_0x55f0a6+_0x24ffda-(-4869+-3356+0x2024+0.5))+'px';for(const _0x3541e3 of _0x52e5cb['ids']){const _0x20171d=this['registered'][_0x3541e3],_0x44aa48=_0x20171d['height']*(-5392+0x199b+0x48a*-1+_0x14ca20),_0x5d705a=_0x20171d['y']+_0x24ffda*((_0x20171d['y']-_0x52e5cb['y'])/_0x52e5cb['height']);_0x4d47b4[_0x3541e3]['height']=_0x44aa48,_0x4d47b4[_0x3541e3]['y']=_0x5d705a,_0x20171d['el']['style']['height']=_0x44aa48+'px',_0x20171d['el']['style']['translate']=_0x20171d['x']+'px\x20'+_0x5d705a+'px';const _0x3e1e81=new CustomEvent('onChange',{'detail':{'id':_0x3541e3,'type':'scale-bott'+'om','x':_0x4d47b4[_0x3541e3]['x'],'y':_0x4d47b4[_0x3541e3]['y'],'width':_0x4d47b4[_0x3541e3]['width'],'height':_0x4d47b4[_0x3541e3]['height']}});this['dispatchEv'+'ent'](_0x3e1e81);}break;}}['moveVector'+'s'](_0x432797,_0x119418,_0xb16054,_0x58e017,_0x23dad1,_0x794549){let _0x5e5f56=0x140b+0x933*0x1+0x13*-394,_0x5caaa1=0x3ae+-6923+0x1*0x175d;const _0x16b99f=_0x23dad1['x']-_0x58e017['x'],_0x26700f=_0x16b99f/_0x794549,_0x553db9=_0x16b99f/_0xb16054['width'];let _0x36fad2=-4525+0x5*0x535+-2140;switch(_0x432797){case 'tl':_0x5e5f56=_0xb16054['x']+_0x16b99f,_0x5caaa1=_0xb16054['y']+_0x26700f,this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5e5f56-(-90*0x5a+0x8d2+0x16d5*0x1+0.5)+'px\x20'+(_0x5caaa1-(0x57c+-21*-378+-283*0x21+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0xb16054['x']+_0xb16054['width']-(0x2377*0x1+0x1500+0x1c3a*-2+0.5)+'px\x20'+(_0x5caaa1-(0x66b*0x3+0xda9+0x1*-8423+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5e5f56-(0xbeb+-3939+0x9*0x63+0.5)+'px\x20'+(_0xb16054['y']+_0xb16054['height']-(-22*0x16+-9569+0x1a3*0x18+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5e5f56-(0x85a+0x1*0x1b4+0x1*-2572+0.5)+'px\x20'+(_0x5caaa1-(-2618+-138+0xac6+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0xb16054['width']-_0x16b99f+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5e5f56-(0x11d8+-25*-2+0x241*-8+0.5)+'px\x20'+(_0xb16054['y']+_0xb16054['height']-(-5190+-2702*-1+0xf*0xa6+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0xb16054['width']-_0x16b99f+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5e5f56-(0x2594+0x133*0xb+0x73*-113+0.5)+'px\x20'+(_0x5caaa1-(0x1433+0x4ab*0x1+0xc6e*-2+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0xb16054['height']-_0x26700f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0xb16054['x']+_0xb16054['width']-(0x1961*-1+-1*0xca+0x1a2d*0x1+0.5)+'px\x20'+(_0x5caaa1-(-4585+-7390+0x1*0x2ec9+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0xb16054['height']-_0x26700f+'px';for(const _0x31e1aa of _0xb16054['ids']){const _0x377653=this['registered'][_0x31e1aa],_0x142108=_0x377653['width']*(-1*0x2221+-2*0x15b+0x24d8-_0x553db9),_0x4cc1c9=_0x377653['x']+_0x16b99f*(-2333+0xa67+-329-(_0x377653['x']-_0xb16054['x'])/_0xb16054['width']),_0x33568f=_0x377653['height']*(-8404*0x1+0x11*0x209+-2*0xe2-_0x553db9),_0x3978f4=_0x377653['y']+_0x26700f*(-1217*-7+-7804+-714-(_0x377653['y']-_0xb16054['y'])/_0xb16054['height']);_0x377653['el']['style']['translate']=_0x4cc1c9+'px\x20'+_0x3978f4+'px',_0x377653['el']['style']['width']=_0x142108+'px',_0x377653['el']['style']['height']=_0x33568f+'px',_0x119418[_0x31e1aa]['x']=_0x4cc1c9,_0x119418[_0x31e1aa]['width']=_0x142108,_0x119418[_0x31e1aa]['y']=_0x3978f4,_0x119418[_0x31e1aa]['height']=_0x33568f;const _0x36488d=new CustomEvent('onChange',{'detail':{'id':_0x31e1aa,'type':'scale-top-'+'left','x':_0x119418[_0x31e1aa]['x'],'y':_0x119418[_0x31e1aa]['y'],'width':_0x119418[_0x31e1aa]['width'],'height':_0x119418[_0x31e1aa]['height']}});this['dispatchEv'+'ent'](_0x36488d);}break;case 'tr':_0x36fad2=_0xb16054['width']+_0x16b99f,_0x5e5f56=_0xb16054['x']+_0x36fad2,_0x5caaa1=_0xb16054['y']-_0x26700f,this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5e5f56-(0xd*0x53+-6102+0x13a2+0.5)+'px\x20'+(_0x5caaa1-(0x2554+0x91*0x2f+0x10*-1023+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0xb16054['x']-(-213*-8+-8756+0x55*0x53+0.5)+'px\x20'+(_0x5caaa1-(-3216+0x16d+0xb26*0x1+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x5e5f56-(0x13df+0x1*-5441+-357*-1+0.5)+'px\x20'+(_0xb16054['y']+_0xb16054['height']-(0x252e+-3041+-6474+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0xb16054['x']-(0x91e+0x1636*0x1+-8018+0.5)+'px\x20'+(_0x5caaa1-(0x1*-9066+-2*-2299+0x37e*0x5+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x36fad2+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0xb16054['x']-(-3*-975+0x975+-5344+0.5)+'px\x20'+(_0xb16054['y']+_0xb16054['height']-(-3288+0x18df*-1+0x25b9+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x36fad2+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0xb16054['x']-(-6*0x368+-1*0x1fe1+-95*-141+0.5)+'px\x20'+(_0x5caaa1-(-3300+0x6d*-35+0x1bcd+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0xb16054['height']+_0x26700f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0xb16054['x']+_0x36fad2-(-103*0x7+-8184+0x1*0x22cb+0.5)+'px\x20'+(_0x5caaa1-(0x12e1+0xeb5+-8596+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0xb16054['height']+_0x26700f+'px';for(const _0x56da58 of _0xb16054['ids']){const _0x334c1d=this['registered'][_0x56da58],_0x1dbbfd=_0x334c1d['width']*(0x1192+0x417*-7+-472*-6+_0x553db9),_0x5a357e=_0x334c1d['x']+_0x16b99f*((_0x334c1d['x']-_0xb16054['x'])/_0xb16054['width']),_0xb9020b=_0x334c1d['height']*(-3699+-55*-88+0x3*-380+_0x553db9),_0x350bfc=_0x334c1d['y']-_0x26700f*(-1*-3545+-6163+0x61*0x1b-(_0x334c1d['y']-_0xb16054['y'])/_0xb16054['height']);_0x334c1d['el']['style']['translate']=_0x5a357e+'px\x20'+_0x350bfc+'px',_0x334c1d['el']['style']['width']=_0x1dbbfd+'px',_0x334c1d['el']['style']['height']=_0xb9020b+'px',_0x119418[_0x56da58]['x']=_0x5a357e,_0x119418[_0x56da58]['width']=_0x1dbbfd,_0x119418[_0x56da58]['y']=_0x350bfc,_0x119418[_0x56da58]['height']=_0xb9020b;const _0x289ac0=new CustomEvent('onChange',{'detail':{'id':_0x56da58,'type':'scale-top-'+'right','x':_0x119418[_0x56da58]['x'],'y':_0x119418[_0x56da58]['y'],'width':_0x119418[_0x56da58]['width'],'height':_0x119418[_0x56da58]['height']}});this['dispatchEv'+'ent'](_0x289ac0);}break;case 'bl':_0x5e5f56=_0xb16054['x']+_0x16b99f,_0x5caaa1=_0xb16054['y']+_0xb16054['height']-_0x26700f,this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5e5f56-(0x6be*-1+0x100f+-2382+0.5)+'px\x20'+(_0x5caaa1-(-2598+-18*-337+0xd89*-1+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5e5f56-(-6795+0xfbd+0xad1+0.5)+'px\x20'+(_0xb16054['y']-(0x11ae+0x614+-1*0x17bf+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0xb16054['x']+_0xb16054['width']-(0x85a*0x1+0x2221+0x2a78*-1+0.5)+'px\x20'+(_0x5caaa1-(-4753+-6080+0x12d*0x24+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5e5f56-(-272*-4+-1808+0x2*0x169+0.5)+'px\x20'+(_0xb16054['y']-(0xf49+0xcbd+0x28c*-11+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0xb16054['width']-_0x16b99f+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5e5f56-(0xcb3+0xbb9+-1250*0x5+0.5)+'px\x20'+(_0x5caaa1-(-417*-1+-166*0x14+0x53*0x23+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0xb16054['width']-_0x16b99f+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5e5f56-(-4170+0x57e+-2*-1383+0.5)+'px\x20'+(_0xb16054['y']-(-2046+-4*-1226+-2856+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0xb16054['height']-_0x26700f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0xb16054['x']+_0xb16054['width']-(-8805+0x35e*-11+0x4771+0.5)+'px\x20'+(_0xb16054['y']-(-185*0x17+0x25bc+-1*0x151b+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0xb16054['height']-_0x26700f+'px';for(const _0x455e16 of _0xb16054['ids']){const _0x43e35d=this['registered'][_0x455e16],_0x8c585=_0x43e35d['width']*(-9589+0x2577+-1*0x1-_0x553db9),_0x4b10d1=_0x43e35d['x']+_0x16b99f*(0x2*0x3c7+0x14c9*-1+0xd3c-(_0x43e35d['x']-_0xb16054['x'])/_0xb16054['width']),_0x2e6016=_0x43e35d['height']*(0xbd6+-4105*-1+-174*0x29-_0x553db9),_0x33ae70=_0x43e35d['y']+_0x26700f*((_0xb16054['y']-_0x43e35d['y'])/_0xb16054['height']);_0x43e35d['el']['style']['translate']=_0x4b10d1+'px\x20'+_0x33ae70+'px',_0x43e35d['el']['style']['width']=_0x8c585+'px',_0x43e35d['el']['style']['height']=_0x2e6016+'px',_0x119418[_0x455e16]['x']=_0x4b10d1,_0x119418[_0x455e16]['width']=_0x8c585,_0x119418[_0x455e16]['y']=_0x33ae70,_0x119418[_0x455e16]['height']=_0x2e6016;const _0x403695=new CustomEvent('onChange',{'detail':{'id':_0x455e16,'type':'scale-bott'+'om-left','x':_0x119418[_0x455e16]['x'],'y':_0x119418[_0x455e16]['y'],'width':_0x119418[_0x455e16]['width'],'height':_0x119418[_0x455e16]['height']}});this['dispatchEv'+'ent'](_0x403695);}break;case 'br':_0x36fad2=_0xb16054['width']+_0x16b99f,_0x5e5f56=_0xb16054['x']+_0x36fad2,_0x5caaa1=_0xb16054['y']+_0xb16054['height']+_0x26700f,this['elSelected'+'Vectors']['br']['style']['translate']=_0x5e5f56-(-1039+0x189+0x289+0.5)+'px\x20'+(_0x5caaa1-(0x37e+0x24c5+-32*0x142+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0xb16054['x']+_0xb16054['width']+_0x16b99f-(-50*-188+0x1*0xe87+0x3*-4372+0.5)+'px\x20'+(_0xb16054['y']-(-9e3+-5201*0x1+0x377c+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0xb16054['x']-(0x25*-27+-6887+0x1ed1+0.5)+'px\x20'+(_0x5caaa1-(-3884+0x9e1+0x7*0xc2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0xb16054['x']-(-6005+-9041+0x4*0xeb2+0.5)+'px\x20'+(_0xb16054['y']-(-6919+-7687+0x10*0x391+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x36fad2+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0xb16054['x']-(-6871+-2106+0xdb*0x29+0.5)+'px\x20'+(_0x5caaa1-(0x13d+-417*-1+0xb7*-4+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x36fad2+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0xb16054['x']-(-857*0x7+-3902+0x26af+0.5)+'px\x20'+(_0xb16054['y']-(-617*-1+0x1*-8045+0x2e7*0xa+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0xb16054['height']+_0x26700f+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0xb16054['x']+_0x36fad2-(-5160*-1+-250*0xf+-44*0x20+0.5)+'px\x20'+(_0xb16054['y']-(0x1*0xf75+0x148d*-1+0x51a+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0xb16054['height']+_0x26700f+'px';for(const _0x4ab7c6 of _0xb16054['ids']){const _0x50f2ee=this['registered'][_0x4ab7c6],_0x65876c=_0x50f2ee['width']*(0x258d+0x1*-6343+0x1d3*-7+_0x553db9),_0x5764be=_0x50f2ee['x']+_0x16b99f*((_0x50f2ee['x']-_0xb16054['x'])/_0xb16054['width']),_0x16ef86=_0x50f2ee['height']*(-9020+-3026+0x2f0f+_0x553db9),_0x18a101=_0x50f2ee['y']+_0x26700f*((_0x50f2ee['y']-_0xb16054['y'])/_0xb16054['height']);_0x50f2ee['el']['style']['translate']=_0x5764be+'px\x20'+_0x18a101+'px',_0x50f2ee['el']['style']['width']=_0x65876c+'px',_0x50f2ee['el']['style']['height']=_0x16ef86+'px',_0x119418[_0x4ab7c6]['x']=_0x5764be,_0x119418[_0x4ab7c6]['width']=_0x65876c,_0x119418[_0x4ab7c6]['y']=_0x18a101,_0x119418[_0x4ab7c6]['height']=_0x16ef86;const _0x57d8bc=new CustomEvent('onChange',{'detail':{'id':_0x4ab7c6,'type':'scale-bott'+'om-right','x':_0x119418[_0x4ab7c6]['x'],'y':_0x119418[_0x4ab7c6]['y'],'width':_0x119418[_0x4ab7c6]['width'],'height':_0x119418[_0x4ab7c6]['height']}});this['dispatchEv'+'ent'](_0x57d8bc);}break;}}['referenceA'+'lignLinesV'+'ectors'](_0x5b8125,_0x52379e){let _0x4aec5e='',_0x6cf028;for(let _0x55bc62 in _0x5b8125){if(this['selected']['ids']['indexOf'](_0x55bc62)>-1)continue;let _0x5a0b14={'x':0x0,'y':0x0};_0x6cf028='';if(Math['abs'](this['selected']['x']+this['selected']['width']-_0x5b8125[_0x55bc62]['x'])<=this['thresholdH'+'orizontal'])_0x6cf028='end',_0x5a0b14['x']=this['selected']['x']+this['selected']['width']-_0x5b8125[_0x55bc62]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']/(0x7b*0x3f+0x767+-9642)))<=this['thresholdH'+'orizontal'])_0x6cf028='end',_0x5a0b14['x']=this['selected']['x']+this['selected']['width']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']/(-3*0xa29+-3166+0x2adb));else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']))<=this['thresholdH'+'orizontal'])_0x6cf028='end',_0x5a0b14['x']=this['selected']['x']+this['selected']['width']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']);else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-886+0x10c6+-3406)-_0x5b8125[_0x55bc62]['x'])<=this['thresholdH'+'orizontal'])_0x6cf028='middle',_0x5a0b14['x']=this['selected']['x']+this['selected']['width']/(-2970+0x1f1f+-4995)-_0x5b8125[_0x55bc62]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x242+-886*0x1+0x136)-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']/(-78+-6382+0x193e)))<=this['thresholdH'+'orizontal'])_0x6cf028='middle',_0x5a0b14['x']=this['selected']['x']+this['selected']['width']/(-4322+-1*-1195+0xc39)-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']/(-1893+-8251*0x1+0x27a2));else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x1*-503+-3467*-2+0x191d*-1)-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']))<=this['thresholdH'+'orizontal'])_0x6cf028='middle',_0x5a0b14['x']=this['selected']['x']+this['selected']['width']/(-490*-17+-8265+-63)-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']);else {if(Math['abs'](this['selected']['x']-_0x5b8125[_0x55bc62]['x'])<=this['thresholdH'+'orizontal'])_0x6cf028='begin',_0x5a0b14['x']=this['selected']['x']-_0x5b8125[_0x55bc62]['x'];else {if(Math['abs'](this['selected']['x']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']/(0x10c*-22+-6*0x16f+0x36*0x96)))<=this['thresholdH'+'orizontal'])_0x6cf028='begin',_0x5a0b14['x']=this['selected']['x']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']/(-15*0x169+0xf0b*-2+-4373*-3));else Math['abs'](this['selected']['x']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']))<=this['thresholdH'+'orizontal']&&(_0x6cf028='begin',_0x5a0b14['x']=this['selected']['x']-(_0x5b8125[_0x55bc62]['x']+_0x5b8125[_0x55bc62]['width']));}}}}}}}_0x6cf028!==''?(_0x4aec5e=_0x6cf028,this['snap']('horizontal',_0x5a0b14,_0x5b8125),setTimeout(()=>{this['thresholdH'+'orizontal']=-599*0x4+0x155c+0x5*-614;},0x23ea+0x1e83+-1*0x41a5)):this['thresholdH'+'orizontal']===0x2318+-5771+0xc8b*-1&&(this['thresholdH'+'orizontal']=-4831+-123*0x3b+0x1d*0x1a1);}const _0x3c9ba2=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-horizo'+'ntal');_0x3c9ba2!==undefined&&_0x3c9ba2['forEach'](_0x17b033=>{_0x17b033['remove']();});const _0x519fae=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-horizont'+'al');_0x519fae!==undefined&&_0x519fae['forEach'](_0x312074=>{_0x312074['remove']();});_0x4aec5e!==''&&(this['triggerAli'+'gnVectors']('horizontal',_0x4aec5e,_0x5b8125),this['triggerAli'+'gnLines'](_0x5b8125));_0x4aec5e='';for(let _0x1d59bb in _0x5b8125){if(this['selected']['ids']['indexOf'](_0x1d59bb)>-1)continue;let _0xa7a1de={'x':0x0,'y':0x0};_0x6cf028='';if(Math['abs'](this['selected']['y']+this['selected']['height']-_0x5b8125[_0x1d59bb]['y'])<=this['thresholdV'+'ertical'])_0x6cf028='end',_0xa7a1de['y']=this['selected']['y']+this['selected']['height']-_0x5b8125[_0x1d59bb]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']/(-267*-13+0x1b1d+-10410)))<=this['thresholdV'+'ertical'])_0x6cf028='end',_0xa7a1de['y']=this['selected']['y']+this['selected']['height']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']/(0x9c6+-1*-4156+-1*0x1a00));else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']))<=this['thresholdV'+'ertical'])_0x6cf028='end',_0xa7a1de['y']=this['selected']['y']+this['selected']['height']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']);else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(-3431+0x112d+0x2*-482)-_0x5b8125[_0x1d59bb]['y'])<=this['thresholdV'+'ertical'])_0x6cf028='middle',_0xa7a1de['y']=this['selected']['y']+this['selected']['height']/(-5308+-4065+-375*-25)-_0x5b8125[_0x1d59bb]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0xf*0x6+-2830+0xab6)-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']/(-8489+-6288+0x39bb)))<=this['thresholdV'+'ertical'])_0x6cf028='middle',_0xa7a1de['y']=this['selected']['y']+this['selected']['height']/(0x65*0x7+-1481+0x308)-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']/(0x12e2+-66*0x2c+-964*0x2));else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x16e2+-4666*-1+-10522)-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']))<=this['thresholdV'+'ertical'])_0x6cf028='middle',_0xa7a1de['y']=this['selected']['y']+this['selected']['height']/(0x26ef*0x1+0x1ac3+-4*0x106c)-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']);else {if(Math['abs'](this['selected']['y']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']))<=this['thresholdV'+'ertical'])_0x6cf028='begin',_0xa7a1de['y']=this['selected']['y']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']);else {if(Math['abs'](this['selected']['y']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']/(-3428+-8398+0x4*0xb8d)))<=this['thresholdV'+'ertical'])_0x6cf028='begin',_0xa7a1de['y']=this['selected']['y']-(_0x5b8125[_0x1d59bb]['y']+_0x5b8125[_0x1d59bb]['height']/(0x2314+0x2120+-17458));else Math['abs'](this['selected']['y']-_0x5b8125[_0x1d59bb]['y'])<=this['thresholdV'+'ertical']&&(_0x6cf028='begin',_0xa7a1de['y']=this['selected']['y']-_0x5b8125[_0x1d59bb]['y']);}}}}}}}_0x6cf028!==''?(_0x4aec5e=_0x6cf028,this['snap']('vertical',_0xa7a1de,_0x5b8125),setTimeout(()=>{this['thresholdH'+'orizontal']=-1923+-41*-44+0x79;},0xa*-35+-9873*0x1+0x28b7)):this['thresholdV'+'ertical']===-28*0xc+0x3d3+0x1*-641&&(this['thresholdV'+'ertical']=-7077*-1+0x76*-42+0x211*-4);}const _0x289704=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-vertic'+'al');_0x289704!==undefined&&_0x289704['forEach'](_0x330ecd=>{_0x330ecd['remove']();});const _0x4e8a61=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-vertical');_0x4e8a61!==undefined&&_0x4e8a61['forEach'](_0x58b3cd=>{_0x58b3cd['remove']();}),_0x4aec5e!==''&&(this['triggerAli'+'gnVectors']('vertical',_0x4aec5e,_0x5b8125),this['triggerAli'+'gnLines'](_0x5b8125));}['snap'](_0x406ebc,_0x4e0f62,_0x4131ab){let _0x16b664={'x':0x0,'y':0x0};if(_0x406ebc==='horizontal'){this['selected']['x']=this['selected']['x']-_0x4e0f62['x'];for(const _0x436bb0 of this['selected']['ids']){const _0x400e2e=this['getElement'+'TranslateP'+'os'](_0x4131ab[_0x436bb0]['el']),_0x116ae9=_0x400e2e['x']-_0x4e0f62['x'],_0x344c17=_0x400e2e['y'];_0x4131ab[_0x436bb0]['el']['style']['translate']=_0x116ae9+'px\x20'+_0x344c17+'px',_0x4131ab[_0x436bb0]['x']=_0x116ae9;}_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x16b664['x']-_0x4e0f62['x']+'px\x20'+_0x16b664['y']+'px';}else {this['selected']['y']=this['selected']['y']-_0x4e0f62['y'];for(const _0x17b30f of this['selected']['ids']){const _0x30e0d4=this['getElement'+'TranslateP'+'os'](_0x4131ab[_0x17b30f]['el']),_0x58fe29=_0x30e0d4['x'],_0x268826=_0x30e0d4['y']-_0x4e0f62['y'];_0x4131ab[_0x17b30f]['el']['style']['translate']=_0x58fe29+'px\x20'+_0x268826+'px',_0x4131ab[_0x17b30f]['y']=_0x268826;}_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px',_0x16b664=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x16b664['x']+'px\x20'+(_0x16b664['y']-_0x4e0f62['y'])+'px';}}['getElement'+'TranslateP'+'os'](_0x599480){let _0x48db7c={'x':0x0,'y':0x0};if(_0x599480['style']['translate']['indexOf']('\x20')>-1){const _0x5f52af=_0x599480['style']['translate']['split']('\x20');_0x48db7c['x']=parseFloat(_0x5f52af[0xc5*0xb+-7170+0x1*0x138b]['replace']('px','')),_0x48db7c['y']=parseFloat(_0x5f52af[-681+0x1aa3+-19*0x143]['replace']('px',''));}else _0x48db7c['x']=parseFloat(_0x599480['style']['translate']);return _0x48db7c;}['generateAl'+'ignVector'](_0x1513b1,_0x39c4e4,_0xa26534){const _0x11a9e=document['createElem'+'ent']('div');_0x11a9e['innerHTML']='\x0a\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20fill=\x22'+colors['red']+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20v'+'iewBox=\x220\x20'+'0\x2024\x2024\x22\x20\x0a'+'\x20\x20\x20\x20\x20\x20stro'+'ke-width=\x22'+'1.5\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20stroke=\x22'+'currentCol'+'or\x22\x20\x0a\x20\x20\x20\x20\x20'+'\x20class=\x22si'+'ze-6\x22\x20\x0a\x20\x20\x20'+'\x20\x20\x20width=\x22')+vectorSize*(-9757+0x171*0x7+0x1c08)+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20w'+'idth=\x22')+vectorSize*(0x2*0xd72+0x4db+-1*0x1fbd)+('\x22\x0a\x20\x20\x20\x20>\x0a\x20\x20'+'\x20\x20\x20\x20<path\x20'+'stroke-lin'+'ecap=\x22roun'+'d\x22\x20stroke-'+'linejoin=\x22'+'round\x22\x20d=\x22'+'M6\x2018\x2018\x206'+'M6\x206l12\x2012'+'\x22\x20/>\x0a\x20\x20\x20\x20<'+'/svg>'),_0x11a9e['classList']['add']('align-vect'+'or'),_0x11a9e['classList']['add']('align-vect'+'or-'+_0x1513b1),_0x11a9e['classList']['add']('align-vect'+'or-'+_0x1513b1+'-'+_0x39c4e4),_0x11a9e['style']['position']='absolute',_0x11a9e['style']['left']=_0xa26534['x']+'px',_0x11a9e['style']['top']=_0xa26534['y']+'px',this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x11a9e);}['triggerAli'+'gnVectors'](_0x3d0275,_0x416e4b,_0x4ce486){let _0x560f38={'hBegin':![],'hMiddle':![],'hEnd':![],'vBegin':![],'vMiddle':![],'vEnd':![]};for(let _0x578566 in _0x4ce486){Math['abs'](this['selected']['x']-_0x4ce486[_0x578566]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hBegin']&&(_0x560f38['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(0x5d4*0x2+0x1793+-9017)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(-8908+-7461+-321*-51)-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(0x5f5*-3+-9501+0x36fe)-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hBegin']&&(_0x560f38['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hBegin']&&(_0x560f38['hBegin']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-1*-349+0x875*0x3+0x1*-6842)-_0x4ce486[_0x578566]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hMiddle']&&(_0x560f38['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x1902+-3*-701+-773*0xb)-(_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(-3195+0x125*0x1d+-1060*0x5)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(0x1202+-1626*-1+-6234)-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(-4364+-147*0x4+0x135a*0x1)-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hMiddle']&&(_0x560f38['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x50+0xed9+-3879)-(_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hMiddle']&&(_0x560f38['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-_0x4ce486[_0x578566]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hEnd']&&(_0x560f38['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(-23*-413+-168*0x20+0x13d*-13)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(-9425*0x1+0xc41*0x1+0x1892)-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']/(0x1*-6506+0x11ec+0x780)-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hEnd']&&(_0x560f38['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['hEnd']&&(_0x560f38['hEnd']=!![])),Math['abs'](this['selected']['y']-_0x4ce486[_0x578566]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),!_0x560f38['vBegin']&&(_0x560f38['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-3246+-9330*0x1+-12578*-1)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-2150+-2341*0x1+-1*-4493)-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-2*-3536+0x1*-4132+-2938)-vectorSize}),!_0x560f38['vBegin']&&(_0x560f38['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['vBegin']&&(_0x560f38['vBegin']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*-3129+-7467+-10598*-1)-_0x4ce486[_0x578566]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),!_0x560f38['vMiddle']&&(_0x560f38['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-582+0x1*-9346+0x26ca)-(_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-14*0x69+-7641+0x2399)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-1978+-3064*0x1+0x13b4)-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(0xa97*-3+0xec4+0x1*0x1103)-vectorSize}),!_0x560f38['vMiddle']&&(_0x560f38['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x479*0x6+0x1*-8480+-13*-124)-(_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['vMiddle']&&(_0x560f38['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-_0x4ce486[_0x578566]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']-vectorSize}),!_0x560f38['vEnd']&&(_0x560f38['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-6759+-5738+0x30d3)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(0xbf*0x13+-85*0x3+-843*0x4)-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']/(-2*-1989+0x691+-5657*0x1)-vectorSize}),!_0x560f38['vEnd']&&(_0x560f38['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x4ce486[_0x578566]['id'])===-1&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':_0x4ce486[_0x578566]['x']+_0x4ce486[_0x578566]['width']-vectorSize,'y':_0x4ce486[_0x578566]['y']+_0x4ce486[_0x578566]['height']-vectorSize}),!_0x560f38['vEnd']&&(_0x560f38['vEnd']=!![]));}_0x560f38['hBegin']&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x560f38['hMiddle']&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']/(0x10a8+0x21fe+-7*0x73c)-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']/(-1*0x1915+0x19*-122+0x1*0x2501)-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x560f38['hEnd']&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x560f38['vBegin']&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize})),_0x560f38['vMiddle']&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-3288+-339+-3629*-1)-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-5*0x55+-1*-9206+-8779)-vectorSize})),_0x560f38['vEnd']&&(this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}),this['generateAl'+'ignVector'](_0x3d0275,_0x416e4b,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}));}['generateAl'+'ignLine'](_0xcbf221){const {direction:_0x7de6fd,position:_0x225efc,begin:_0x21b4c8,end:_0x50545a}=_0xcbf221,_0x150859=document['createElem'+'ent']('div');_0x150859['classList']['add']('align-line'),_0x150859['classList']['add']('align-line'+'-'+_0x7de6fd),_0x150859['classList']['add']('align-line'+'-'+_0x7de6fd+'-'+_0x225efc),_0x150859['style']['position']='absolute',_0x150859['style']['left']=_0x21b4c8['x']+'px',_0x150859['style']['top']=_0x21b4c8['y']+'px',_0x7de6fd==='horizontal'?(_0x150859['style']['width']='1px',_0x150859['style']['height']=_0x50545a['y']-_0x21b4c8['y']+'px'):(_0x150859['style']['width']=_0x50545a['x']-_0x21b4c8['x']+'px',_0x150859['style']['height']='1px'),this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x150859);}['generateLi'+'ne'](_0x48f3c9,_0x3bbf2f){const {direction:_0xd7adeb,begin:_0x21708d,end:_0x436d71}=_0x48f3c9,_0x3f384b=document['createElem'+'ent']('div');if(_0x3bbf2f['length']>-5995*0x1+0x19*-269+0x31b0)for(const _0x2b713b of _0x3bbf2f){_0x3f384b['classList']['add'](_0x2b713b);}return _0x3f384b['style']['position']='absolute',_0x3f384b['style']['left']=_0x21708d['x']+'px',_0x3f384b['style']['top']=_0x21708d['y']+'px',_0xd7adeb==='horizontal'?_0x3f384b['style']['width']=_0x436d71['x']-_0x21708d['x']+'px':_0x3f384b['style']['height']=_0x436d71['y']-_0x21708d['y']+'px',_0x3f384b;}['triggerAli'+'gnLines'](_0x12b12c){const _0x4a28bf={'direction':'horizontal','position':'begin','begin':{'x':this['selected']['x'],'y':this['selected']['y']},'end':{'x':this['selected']['x'],'y':this['selected']['y']}},_0x3ba7bb=(_0x566bab,_0x405c9c,_0x20477c)=>{return _0x566bab===undefined?(_0x566bab=_0xa5b81b(_0x4a28bf),_0x566bab['end']['y']=_0x566bab['end']['y']+this['selected']['height'],_0x566bab['begin']['x']=_0x566bab['begin']['x']+_0x20477c,_0x566bab['end']['x']=_0x566bab['begin']['x']+_0x20477c,_0x405c9c['y']<_0x566bab['begin']['y']&&(_0x566bab['begin']['y']=_0x405c9c['y']),_0x405c9c['y']+_0x405c9c['height']>_0x566bab['end']['y']&&(_0x566bab['end']['y']=_0x405c9c['y']+_0x405c9c['height'])):(_0x405c9c['y']<_0x566bab['begin']['y']&&(_0x566bab['begin']['y']=_0x405c9c['y']),_0x405c9c['y']+_0x405c9c['height']>_0x566bab['end']['y']&&(_0x566bab['end']['y']=_0x405c9c['y']+_0x405c9c['height'])),_0x566bab;},_0x50e3ab=(_0x88e132,_0x365569,_0x1916ac)=>{return _0x88e132===undefined?(_0x88e132=_0xa5b81b(_0x4a28bf),_0x88e132['direction']='vertical',_0x88e132['end']['x']=_0x88e132['end']['x']+this['selected']['width'],_0x88e132['begin']['y']=_0x88e132['begin']['y']+_0x1916ac,_0x88e132['end']['y']=_0x88e132['end']['y']+_0x1916ac,_0x365569['x']<_0x88e132['begin']['x']&&(_0x88e132['begin']['x']=_0x365569['x']),_0x365569['x']+_0x365569['width']>_0x88e132['end']['x']&&(_0x88e132['end']['x']=_0x365569['x']+_0x365569['width'])):(_0x365569['x']<_0x88e132['begin']['x']&&(_0x88e132['begin']['x']=_0x365569['x']),_0x365569['x']+_0x365569['width']>_0x88e132['end']['x']&&(_0x88e132['end']['x']=_0x365569['x']+_0x365569['width'])),_0x88e132;},_0x16734e=[];for(let _0x3290cf in _0x12b12c){(this['selected']['x']===_0x12b12c[_0x3290cf]['x']||this['selected']['x']===_0x12b12c[_0x3290cf]['x']+_0x12b12c[_0x3290cf]['width']/(-3187*-1+0xb22+-1*0x1793)||this['selected']['x']===_0x12b12c[_0x3290cf]['x']+_0x12b12c[_0x3290cf]['width'])&&this['selected']['ids']['indexOf'](_0x12b12c[_0x3290cf]['id'])===-1&&(_0x16734e[-1858*-5+-4434+-1214*0x4]=_0x3ba7bb(_0x16734e[0x3*0xc11+0x1*-1687+0x17b*-20],_0x12b12c[_0x3290cf],-6502+0x18*0x6e+0xf16)),(this['selected']['x']+this['selected']['width']/(-8339+-4*-1198+0xddd)===_0x12b12c[_0x3290cf]['x']||this['selected']['x']+this['selected']['width']/(-597+-869+-367*-4)===_0x12b12c[_0x3290cf]['x']+_0x12b12c[_0x3290cf]['width']/(0x1cdb+-8798*-1+-16183)||this['selected']['x']+this['selected']['width']/(0x35*0xf+0x2454+-10093)===_0x12b12c[_0x3290cf]['x']+_0x12b12c[_0x3290cf]['width'])&&this['selected']['ids']['indexOf'](_0x12b12c[_0x3290cf]['id'])===-1&&(_0x16734e[-5213+0x2c1*0x8+-426]=_0x3ba7bb(_0x16734e[0x99*0x37+-3*-2934+-8608*0x2],_0x12b12c[_0x3290cf],this['selected']['width']/(-1284*-6+0x214f+0x3f65*-1))),(this['selected']['x']+this['selected']['width']===_0x12b12c[_0x3290cf]['x']||this['selected']['x']+this['selected']['width']===_0x12b12c[_0x3290cf]['x']+_0x12b12c[_0x3290cf]['width']/(0x38f+-6554+0x160d)||this['selected']['x']+this['selected']['width']===_0x12b12c[_0x3290cf]['x']+_0x12b12c[_0x3290cf]['width'])&&this['selected']['ids']['indexOf'](_0x12b12c[_0x3290cf]['id'])===-1&&(_0x16734e[0x26a7+-2*0x851+-5635]=_0x3ba7bb(_0x16734e[-593+-4068+0x1237],_0x12b12c[_0x3290cf],this['selected']['width'])),(Math['abs'](this['selected']['y']-_0x12b12c[_0x3290cf]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x12b12c[_0x3290cf]['y']+_0x12b12c[_0x3290cf]['height']/(-3*0xb35+0x1*-1045+0x25b6)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x12b12c[_0x3290cf]['y']+_0x12b12c[_0x3290cf]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x12b12c[_0x3290cf]['id'])===-1&&(_0x16734e[-9980+0x1*-3097+0x3318]=_0x50e3ab(_0x16734e[0x1*-8842+-4332+0x3379],_0x12b12c[_0x3290cf],-206*0xa+0xe1f+-311*0x5)),(Math['abs'](this['selected']['y']+this['selected']['height']/(0x2*-3245+0x13+0x1949*0x1)-_0x12b12c[_0x3290cf]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0x52+-16*0xcb+-99*-32)-(_0x12b12c[_0x3290cf]['y']+_0x12b12c[_0x3290cf]['height']/(-7318+-2*-4367+-1414*0x1)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0x244e+-1*-7096+-16388)-(_0x12b12c[_0x3290cf]['y']+_0x12b12c[_0x3290cf]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x12b12c[_0x3290cf]['id'])===-1&&(_0x16734e[-16*0x224+0x270+-291*-28]=_0x50e3ab(_0x16734e[0x1f65+0x57*-45+-4118],_0x12b12c[_0x3290cf],this['selected']['height']/(0x101e+-17*-523+-95*0x89))),(Math['abs'](this['selected']['y']+this['selected']['height']-_0x12b12c[_0x3290cf]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x12b12c[_0x3290cf]['y']+_0x12b12c[_0x3290cf]['height']/(0x5*0x6d7+0xca7+0x5db*-8)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x12b12c[_0x3290cf]['y']+_0x12b12c[_0x3290cf]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x12b12c[_0x3290cf]['id'])===-1&&(_0x16734e[-7474+0x5a3+0x1794]=_0x50e3ab(_0x16734e[0xfb5*-1+-69*-36+0x606],_0x12b12c[_0x3290cf],this['selected']['height']));}for(const _0x3560b3 of _0x16734e){if(_0x3560b3===undefined)continue;this['generateAl'+'ignLine'](_0x3560b3);}}['shortcuts'](_0x35249b,_0x201d2b){if(_0x35249b==='horizontal')switch(_0x201d2b){case 'begin':for(const _0x35763c of this['selected']['ids']){const _0x3dc4d8=this['registered'][_0x35763c],{y:_0x37a68}=this['getTransla'+'tePos'](_0x3dc4d8['el']['style']['translate']),_0x8bd53e=this['selected']['x'];_0x3dc4d8['el']['style']['translate']=_0x8bd53e+'px\x20'+_0x37a68+'px',this['registered'][_0x35763c]['x']=_0x8bd53e;}break;case 'middle':for(const _0x2d84d8 of this['selected']['ids']){const _0x29abc6=this['registered'][_0x2d84d8],{x:_0x16766d,y:_0x39984c}=this['getTransla'+'tePos'](_0x29abc6['el']['style']['translate']),_0x480c78=_0x16766d-(_0x29abc6['x']-(this['selected']['x']+this['selected']['width']/(-5322+0x128+-419*-12)))-_0x29abc6['width']/(-4341*0x1+-8665+-6*-2168);_0x29abc6['el']['style']['translate']=_0x480c78+'px\x20'+_0x39984c+'px',this['registered'][_0x2d84d8]['x']=_0x480c78;}break;case 'end':for(const _0x1df7fa of this['selected']['ids']){const _0x48c2aa=this['registered'][_0x1df7fa],{y:_0x4cc69a}=this['getTransla'+'tePos'](_0x48c2aa['el']['style']['translate']),_0x432340=this['selected']['x']+this['selected']['width']-_0x48c2aa['width'];_0x48c2aa['el']['style']['translate']=_0x432340+'px\x20'+_0x4cc69a+'px',this['registered'][_0x1df7fa]['x']=this['selected']['x']+this['selected']['width']-_0x48c2aa['width'];}break;case 'distribute':const _0x2740fb=this['selected']['ids']['sort']((_0x4f00e8,_0xefcf3f)=>this['registered'][_0x4f00e8]['x']-this['registered'][_0xefcf3f]['x']);let _0x381dee=0x1999*0x1+0x8f9*0x3+-13444;for(const _0x1bd45b of _0x2740fb){_0x381dee+=this['registered'][_0x1bd45b]['width'];}const _0x9b1e0c=(this['selected']['width']-_0x381dee)/(_0x2740fb['length']-(-9350+-67*-90+-81*-41));let _0x5891f2=this['registered'][_0x2740fb[0x1deb+0x4cd*0x8+-1*0x4453]]['x'];for(let _0x19011b=-154+0x1513*-1+0x1*0x15ad;_0x19011b<_0x2740fb['length'];_0x19011b++){const _0x42e2f3=_0x2740fb[_0x19011b],_0x508786=this['registered'][_0x42e2f3],{y:_0x51cbb1}=this['getTransla'+'tePos'](_0x508786['el']['style']['translate']);let _0x24d456=_0x5891f2;_0x508786['el']['style']['translate']=_0x24d456+'px\x20'+_0x51cbb1+'px',this['registered'][_0x42e2f3]['x']=_0x24d456,_0x5891f2=_0x5891f2+_0x508786['width']+_0x9b1e0c;}break;}else {if(_0x35249b==='vertical')switch(_0x201d2b){case 'begin':console['log']('begin');for(const _0x142807 of this['selected']['ids']){const _0xe809f8=this['registered'][_0x142807],{x:_0x32b7b2}=this['getTransla'+'tePos'](_0xe809f8['el']['style']['translate']),_0x1dc3d4=this['selected']['y'];_0xe809f8['el']['style']['translate']=_0x32b7b2+'px\x20'+_0x1dc3d4+'px',this['registered'][_0x142807]['y']=_0x1dc3d4;}break;case 'middle':console['log']('middle');for(const _0x8713d9 of this['selected']['ids']){const _0x364f4d=this['registered'][_0x8713d9],{x:_0x581975,y:_0x447c1b}=this['getTransla'+'tePos'](_0x364f4d['el']['style']['translate']),_0x18f5b4=_0x447c1b-(_0x364f4d['y']-(this['selected']['y']+this['selected']['height']/(0x3*0x150+0x3a9*0x4+-4754)))-_0x364f4d['height']/(-4009*0x2+0x173*-1+0xaed*0x3);_0x364f4d['el']['style']['translate']=_0x581975+'px\x20'+_0x18f5b4+'px',this['registered'][_0x8713d9]['y']=_0x18f5b4;}break;case 'end':console['log']('end');for(const _0x123fe6 of this['selected']['ids']){const _0x1ba6f5=this['registered'][_0x123fe6],{x:_0x2c2881}=this['getTransla'+'tePos'](_0x1ba6f5['el']['style']['translate']),_0x9d8a63=this['selected']['y']+this['selected']['height']-_0x1ba6f5['height'];_0x1ba6f5['el']['style']['translate']=_0x2c2881+'px\x20'+_0x9d8a63+'px',this['registered'][_0x123fe6]['y']=this['selected']['y']+this['selected']['height']-_0x1ba6f5['height'];}break;case 'distribute':console['log']('distribute');const _0x2ce322=this['selected']['ids']['sort']((_0x1fe065,_0x38e440)=>this['registered'][_0x1fe065]['y']-this['registered'][_0x38e440]['y']);let _0x2ebd39=0x1fd*-2+0x1091*-2+0x1f4*0x13;for(const _0x11831e of _0x2ce322){_0x2ebd39+=this['registered'][_0x11831e]['height'];}const _0x182c07=(this['selected']['height']-_0x2ebd39)/(_0x2ce322['length']-(0x1df1+-1*0x1caf+-321));let _0x1d4a76=this['registered'][_0x2ce322[0x1b9f+0x1f6b+0x21*-458]]['y'];for(let _0x520adf=-7628+-3*0xc5b+0x42dd*0x1;_0x520adf<_0x2ce322['length'];_0x520adf++){const _0xd78259=_0x2ce322[_0x520adf],_0x256ccd=this['registered'][_0xd78259],{x:_0x4e10de}=this['getTransla'+'tePos'](_0x256ccd['el']['style']['translate']);let _0xc52bf9=_0x1d4a76;_0x256ccd['el']['style']['translate']=_0x4e10de+'px\x20'+_0xc52bf9+'px',this['registered'][_0xd78259]['y']=_0xc52bf9,_0x1d4a76=_0x1d4a76+_0x256ccd['height']+_0x182c07;}break;}else this['elMeasure']?.['classList']['contains']('active')?(this['shadowRoot']?.['removeEven'+'tListener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['remove']('active'),this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']()):(this['shadowRoot']?.['addEventLi'+'stener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['add']('active'));}this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['measure'](_0x127a1e){if(this['selected']['ids']['length']===0x2629+0x2485+-11*0x6ca)return;if(this['mouseMoveT'+'ype']==='main')return;let _0x2f51bc=null;_0x127a1e['target']['id']==='main'&&(_0x2f51bc=_0x127a1e['target']);_0x2f51bc===null&&(_0x2f51bc=_0x127a1e['target']['closest']('glide-dnr-'+'item'));if(_0x2f51bc===null)return;this['isToolbar']&&(this['measureTar'+'getId']=_0x2f51bc['id']);if(_0x2f51bc['id']==='main'){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();this['isToolbar']&&(this['measureTar'+'getId']='',this['elMeasureO'+'utline']['style']['width']=0x137*-7+0x26e*-3+0xfcb,this['elMeasureO'+'utline']['style']['height']=0x1385+0x1ee3+-6452*0x2,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');return;}this['isToolbar']&&this['measureExe'+'cute']();}['measureExe'+'cute'](){if(this['measureTar'+'getId']==='')return;this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();const _0x587f02=this['measureTar'+'getId'];for(const _0x543798 of this['selected']['ids']){if(_0x587f02===_0x543798){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();return;}}const _0x30f0a7=this['selected']['x']+this['selected']['width'],_0x70ca08=this['selected']['x']+this['selected']['width']/(-4823+-7118+0x2ea7*0x1),_0x196611=this['selected']['y']+this['selected']['height'],_0x91cff3=this['selected']['y']+this['selected']['height']/(-2773*-3+0x837*0x1+0xa*-1042),_0x4dfd59=this['registered'][_0x587f02]['x']+this['registered'][_0x587f02]['width'],_0x251512=this['registered'][_0x587f02]['y']+this['registered'][_0x587f02]['height'];let _0x507a50=![];if(_0x196611<this['registered'][_0x587f02]['y']){_0x507a50=!![];const _0x13c44d=this['registered'][_0x587f02]['y']-_0x196611;let _0x3f8ea8=_0x70ca08;_0x70ca08===_0x4dfd59&&(_0x3f8ea8-=0xa*-519+-1189+0x18ec);this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x3f8ea8+'px\x20'+_0x196611+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x13c44d+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');let _0x162417=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x468c27=parseFloat(_0x162417['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x13c44d);const _0x281d07=Math['round'](_0x196611+_0x13c44d/(0x13fb+-3094+-3*0x2a1)-_0x468c27/(0xc5*0x25+-3782+0x5*-701));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x70ca08+(-7675+-5*-716+0x1003)+'px\x20'+_0x281d07+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible',_0x70ca08<=this['registered'][_0x587f02]['x']&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x70ca08+'px\x20'+this['registered'][_0x587f02]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x587f02]['x']-_0x70ca08+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x70ca08>=_0x4dfd59&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4dfd59+'px\x20'+this['registered'][_0x587f02]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x70ca08-_0x4dfd59+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(_0x196611>=this['registered'][_0x587f02]['y']&&_0x196611<=_0x251512){_0x507a50=!![];const _0x5af416=_0x251512-_0x196611;this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x70ca08+'px\x20'+_0x196611+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x5af416+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');if(_0x196611>=this['registered'][_0x587f02]['y']&&_0x196611<_0x251512){let _0x276043=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x370cb4=parseFloat(_0x276043['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x5af416);const _0x3e2a48=Math['round'](_0x196611+_0x5af416/(0x5e6+-52*0x73+0x1178)-_0x370cb4/(-1*0x7b5+0x107e*-1+0x1835));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x70ca08+(-1953+-6256+0x2015)+'px\x20'+_0x3e2a48+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible';}_0x70ca08<=this['registered'][_0x587f02]['x']&&_0x196611<_0x251512&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x70ca08+'px\x20'+(_0x251512-(0xf1*-6+-3487+0x1346))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x587f02]['x']-_0x70ca08+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x70ca08>=_0x4dfd59&&_0x196611<_0x251512&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4dfd59+'px\x20'+(_0x251512-(0x1b8f+-859+-1*0x1833))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x70ca08-_0x4dfd59+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>_0x251512){_0x507a50=!![];const _0xe9fc12=this['selected']['y']-_0x251512;let _0x4ecad9=_0x70ca08;_0x70ca08===_0x4dfd59&&(_0x4ecad9-=-1*-4411+0xa10+-2*0xda5);this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x4ecad9+'px\x20'+_0x251512+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0xe9fc12+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x501287=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x19d740=parseFloat(_0x501287['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0xe9fc12);const _0x181c5c=Math['round'](this['selected']['y']-_0xe9fc12/(0x464+0x1b86+-8168)-_0x19d740/(-209+-7224+-1487*-5));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x70ca08+(0x4b5*-1+-3209+-2*-2209)+'px\x20'+_0x181c5c+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x70ca08<this['registered'][_0x587f02]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x70ca08+'px\x20'+(_0x251512-(0x587+-21*0x12d+-1*-4907))+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x587f02]['x']-_0x70ca08+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x70ca08>_0x4dfd59&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4dfd59+'px\x20'+(_0x251512-(-7388+0x1b97+0x146))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x70ca08-_0x4dfd59+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>this['registered'][_0x587f02]['y']&&this['selected']['y']<=_0x251512){_0x507a50=!![];const _0x385fcf=this['selected']['y']-this['registered'][_0x587f02]['y'];this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x70ca08+'px\x20'+this['registered'][_0x587f02]['y']+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x385fcf+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x400e9d=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x1d8349=parseFloat(_0x400e9d['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x385fcf);const _0x80a296=Math['round'](this['selected']['y']-_0x385fcf/(0x72d+0x5*0x9d+-2620)-_0x1d8349/(-1*-2843+0xd5c+-6261*0x1));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x70ca08+(-77*-107+0x10ec+-177*0x47)+'px\x20'+_0x80a296+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x70ca08<this['registered'][_0x587f02]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x70ca08+'px\x20'+this['registered'][_0x587f02]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x587f02]['x']-_0x70ca08+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x70ca08>_0x4dfd59&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x4dfd59+'px\x20'+this['registered'][_0x587f02]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=_0x70ca08-_0x4dfd59+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible'));}if(_0x30f0a7<this['registered'][_0x587f02]['x']){_0x507a50=!![];let _0x453671=_0x91cff3;_0x91cff3===_0x251512&&(_0x453671-=0x1600+0x2bf*0xe+-1*0x3c71);this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x30f0a7+(-6047*0x1+0x1*0xd02+0xa9e)+'px\x20'+_0x453671+'px';const _0x228023=this['registered'][_0x587f02]['x']-_0x30f0a7;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x228023+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0xc93d8d=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x1f9f4a=parseFloat(_0xc93d8d['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x228023);const _0xe6702b=Math['round'](_0x30f0a7+_0x228023/(-9032*-1+-963*-8+0x415e*-1)-_0x1f9f4a/(0x5*0x7a5+-5264+-4519));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0xe6702b+'px\x20'+(_0x91cff3+(0x18a8+-6613+-61*-5))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x91cff3<=this['registered'][_0x587f02]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x587f02]['x']+'px\x20'+_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x587f02]['y']-_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x91cff3>=_0x251512&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x587f02]['x']+'px\x20'+_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x91cff3-_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(_0x30f0a7>=this['registered'][_0x587f02]['x']&&_0x30f0a7<_0x4dfd59){_0x507a50=!![],this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x30f0a7+'px\x20'+_0x91cff3+'px';const _0x3b8b8d=_0x4dfd59-_0x30f0a7;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x3b8b8d+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x5ed9ed=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x2e7054=parseFloat(_0x5ed9ed['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x3b8b8d);const _0x9d2bf5=Math['round'](_0x30f0a7+_0x3b8b8d/(-1607*0x3+0x1709*-1+-160*-67)-_0x2e7054/(-21*0x20+0x1041+-317*0xb));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x9d2bf5+'px\x20'+(_0x91cff3+(0x1ee0+-2689*0x3+-1*-167))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x91cff3<this['registered'][_0x587f02]['y']&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4dfd59-(0x1c0b+-2686+-4492)+'px\x20'+_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=this['registered'][_0x587f02]['y']-_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible')),_0x91cff3>_0x251512&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4dfd59-(0x2*0x20b+-1519+0x6*0x4f)+'px\x20'+_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=_0x91cff3-_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible'));}if(this['selected']['x']>_0x4dfd59){_0x507a50=!![];let _0x449c5d=_0x91cff3;_0x91cff3===_0x251512&&(_0x449c5d-=0x22a2+0x1fc4+-23*0x2e3);this['elMeasureL'+'ines']['solid_l']['style']['translate']=_0x4dfd59-(0xc04+0x1d60+-10595*0x1)+'px\x20'+_0x449c5d+'px';const _0x114ab4=this['selected']['x']-_0x4dfd59;this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x114ab4+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x5b1863=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x538fe0=parseFloat(_0x5b1863['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x114ab4);const _0x15ca8e=Math['round'](_0x4dfd59+_0x114ab4/(-997+0x1f7f+-1766*0x4)-_0x538fe0/(-205*-17+0x1508+-8867*0x1));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x15ca8e+'px\x20'+(_0x91cff3+(0x24d7+0x1*-1293+-8134))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x91cff3<=this['registered'][_0x587f02]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4dfd59-(-2911+0x246c+-6412)+'px\x20'+_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x587f02]['y']-_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x91cff3>=_0x251512&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4dfd59-(0xeab*-1+-1793*-5+-5209)+'px\x20'+_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x91cff3-_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(this['selected']['x']>this['registered'][_0x587f02]['x']&&this['selected']['x']<=_0x4dfd59){_0x507a50=!![],this['elMeasureL'+'ines']['solid_l']['style']['translate']=this['registered'][_0x587f02]['x']+'px\x20'+_0x91cff3+'px';const _0xd41055=this['selected']['x']-this['registered'][_0x587f02]['x'];this['elMeasureL'+'ines']['solid_l']['style']['width']=_0xd41055+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x6b182=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x56e608=parseFloat(_0x6b182['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0xd41055);const _0x1a69b3=Math['round'](this['registered'][_0x587f02]['x']+_0xd41055/(0xb*-69+-898*0x2+0x1*0x9fd)-_0x56e608/(-1*-9879+-4314+-5563*0x1));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x1a69b3+'px\x20'+(_0x91cff3+(-1213*0x2+0x1d61+-5091))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x91cff3<=this['registered'][_0x587f02]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x587f02]['x']+'px\x20'+_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x587f02]['y']-_0x91cff3+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x91cff3>=_0x251512&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x587f02]['x']+'px\x20'+_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x91cff3-_0x251512+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}_0x507a50?this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=this['registered'][_0x587f02]['width']+'px',this['elMeasureO'+'utline']['style']['height']=this['registered'][_0x587f02]['height']+'px',this['elMeasureO'+'utline']['style']['translate']=this['registered'][_0x587f02]['x']+'px\x20'+this['registered'][_0x587f02]['y']+'px',this['elMeasureO'+'utline']['style']['visibility']='visible',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='auto'):(this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed'](),this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0xb*0x31+-9317+0x10a*0x21,this['elMeasureO'+'utline']['style']['height']=0x106f+0x2300+0x9*-1463,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none'));}['hideMeasur'+'eReference'+'s'](){this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberB']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberB']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='hidden');}['hideMeasur'+'eDeshed'](){this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='hidden');}['triggerSel'+'ectedLines'+'Vectors'](_0x408900){_0x408900==='hide'?this['elSelected'+'Lines']['l']['style']['visibility']!=='hidden'&&(this['elSelected'+'Lines']['l']['style']['visibility']='hidden',this['elSelected'+'Lines']['r']['style']['visibility']='hidden',this['elSelected'+'Lines']['t']['style']['visibility']='hidden',this['elSelected'+'Lines']['b']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tr']['style']['visibility']='hidden',this['elSelected'+'Vectors']['bl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['br']['style']['visibility']='hidden'):this['elSelected'+'Lines']['l']['style']['visibility']!=='visible'&&(this['elSelected'+'Lines']['l']['style']['visibility']='visible',this['elSelected'+'Lines']['r']['style']['visibility']='visible',this['elSelected'+'Lines']['t']['style']['visibility']='visible',this['elSelected'+'Lines']['b']['style']['visibility']='visible',this['elSelected'+'Vectors']['tl']['style']['visibility']='visible',this['elSelected'+'Vectors']['tr']['style']['visibility']='visible',this['elSelected'+'Vectors']['bl']['style']['visibility']='visible',this['elSelected'+'Vectors']['br']['style']['visibility']='visible');}['delete'](){const _0x26c5fd=new CustomEvent('onActions',{'detail':{'type':'delete','ids':this['selected']['ids']}});this['dispatchEv'+'ent'](_0x26c5fd);}['init'](){const _0x5b3e66=document['createElem'+'ent']('template');_0x5b3e66['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x5b3e66['content']),this['onSlotChan'+'ge'](),this['handleClic'+'k'](),this['initKeyboa'+'rdEvents']();}}customElements['define']('glide-dnr',GlideDNR);
export{GlideDNR as default};