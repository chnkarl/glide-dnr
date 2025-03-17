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
var _0x47e8bb = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);const HasOwn=(_0x439d27,_0x5a1b5d)=>{if(typeof _0x439d27!=='object')return ![];if(_0x439d27===null||Array['isArray'](_0x439d27))return ![];return Object['prototype']['hasOwnProp'+'erty']['call'](_0x439d27,_0x5a1b5d);};class EventBus{constructor(){Object['defineProp'+'erty'](this,'events',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}});}['on'](_0x278a71,_0x17301b){!this['events'][_0x278a71]&&(this['events'][_0x278a71]=[]),this['events'][_0x278a71]['push'](_0x17301b);}['emit'](_0x3fb80e,_0x4b105f){this['events'][_0x3fb80e]&&this['events'][_0x3fb80e]['forEach'](_0x2e8755=>_0x2e8755(_0x4b105f));}['off'](_0x1a1b5f,_0x502a21){this['events'][_0x1a1b5f]&&(this['events'][_0x1a1b5f]=this['events'][_0x1a1b5f]['filter'](_0x3b45a7=>_0x3b45a7!==_0x502a21));}}const eventBus=new EventBus();const properties$1=['toolbar','measure','toolbar-pl'+'acement','actions','modify-out'+'side','color-prim'+'ary'],_window=window,lineSize=0x5f4*-2+-6759+-4*-2453,vectorSize=-6060+-413*0x10+0x3181,colors={'primary':'#4907DA','red':'#FB2C36','redActive':'#E7110C'};let dragBeginPos={'x':-1,'y':-1};const vectorOffset=vectorSize/(-4651*0x1+-6798+0x2cbb)+(-5943+-4041+0x2701),originSelected={'ids':[],'x':0x0,'y':0x0,'width':0x0,'height':0x0};class GlideDNR extends HTMLElement{static get['observedAt'+'tributes'](){return properties$1;}constructor(){super(),Object['defineProp'+'erty'](this,'isToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isModifyOu'+'tside',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'toolbarPla'+'cement',{'enumerable':!![],'configurable':!![],'writable':!![],'value':'float'}),Object['defineProp'+'erty'](this,'colorPrima'+'ry',{'enumerable':!![],'configurable':!![],'writable':!![],'value':colors['primary']}),Object['defineProp'+'erty'](this,'loadingIte'+'ms',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{'general':{'total':0x0,'loaded':0x0},'image':{'total':0x0,'loaded':0x0}}}),Object['defineProp'+'erty'](this,'selected',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x47e8bb(originSelected)}),Object['defineProp'+'erty'](this,'registered',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'requestAni'+'mation',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elSelected'+'Lines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'elSelected'+'Vectors',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'rDrags',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elAligns',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasureO'+'utline',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'measureTar'+'getId',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'latestSele'+'cted',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x47e8bb(originSelected)}),Object['defineProp'+'erty'](this,'lastClickT'+'ime',{'enumerable':!![],'configurable':!![],'writable':!![],'value':-1}),Object['defineProp'+'erty'](this,'isInit',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseMoveT'+'ype',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'hasSelecte'+'d',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'hasMoved',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isInSelect'+'ed',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseTarge'+'t',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'thresholdH'+'orizontal',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'thresholdV'+'ertical',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'alignVecto'+'rsLinesThr'+'eshold',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0.1}),Object['defineProp'+'erty'](this,'elMeasureL'+'ines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['measure']=this['measure']['bind'](this),this['delete']=this['delete']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x5bdd75,_0x3cb883,_0x37515c){if(_0x3cb883===_0x37515c)return;switch(_0x5bdd75){case 'toolbar':_0x37515c===''&&(this['isToolbar']=!![]);break;case 'measure':_0x37515c===''&&(this['isMeasure']=!![]);break;case 'toolbar-pl'+'acement':this['toolbarPla'+'cement']=_0x37515c;break;case 'actions':_0x37515c===''&&(this['isActions']=!![]);break;case 'modify-out'+'side':_0x37515c===''&&(this['isModifyOu'+'tside']=!![]);break;case 'color-prim'+'ary':this['colorPrima'+'ry']=_0x37515c;break;}}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22c'+'ontainer\x22\x20'+'id=\x22contai'+'ner\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22main'+'\x22\x20id=\x22main'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<slot\x20c'+'lass=\x22slot'+'\x22></slot>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_align\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_drag\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22refere'+'nce-lines_'+'selected\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<!--\x20line'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20class=\x22l'+'ine\x20left\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20style=\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20'+(this['selected']['x']-lineSize/(-1856*-5+0x13ba+-2*0x1bfc))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20righ'+'t\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20style'+'=\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x20')+(this['selected']['x']+this['selected']['width']-lineSize/(0x272*-8+-1*-8543+-3533))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20top\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20style=\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'late:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-3*-1134+0x8fb+-5699*0x1))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20bott'+'om\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-4397+-5394+0x2641))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20vector\x20-'+'->\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'class=\x22vec'+'tor\x20top-le'+'ft\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20top-r'+'ight\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20st'+'yle=\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'translate:'+'\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-left\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'style=\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-right\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20style=\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20transla'+'te:\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20测距离参考线\x20和'+'\x20数字\x20-->\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22me'+'asure-line'+'s\x22>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<!--\x20'+'实线：选中项\x20-->'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22solid\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22item\x20'+'top\x22></div'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22item'+'\x20bottom\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20left\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20rig'+'ht\x22></div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'!--\x20虚线：目标项'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22das'+'hed\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20horiz'+'ontal-top\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20hor'+'izontal-bo'+'ttom\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22ite'+'m\x20vertical'+'-left\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22it'+'em\x20vertica'+'l-right\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22numb'+'er\x20number-'+'top\x22>283</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22num'+'ber\x20number'+'-bottom\x22>2'+'22</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22number\x20nu'+'mber-left\x22'+'>333</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22number\x20'+'number-rig'+'ht\x22>444</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'measure-ta'+'rget-outli'+'ne\x22></div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20')+(this['isToolbar']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar\x22>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22inner\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22grou'+'p\x20aligns\x22\x20'+'id=\x22aligns'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20hor'+'izontal-le'+'ft\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M145.39-1'+'00q-12.77\x20'+'0-21.39-8.'+'62-8.61-8.'+'61-8.61-21'+'.38v-700q0'+'-12.77\x208.6'+'1-21.38\x208.'+'62-8.62\x2021'+'.39-8.62\x201'+'2.77\x200\x2021.'+'38\x208.62\x208.'+'62\x208.61\x208.'+'62\x2021.38v7'+'00q0\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62Zm171.92'+'-193.85q-2'+'0.77\x200-35.'+'58-14.8-14'+'.8-14.81-1'+'4.8-35.58\x20'+'0-20.77\x2014'+'.8-35.58\x201'+'4.81-14.8\x20'+'35.58-14.8'+'h236.92q20'+'.77\x200\x2035.5'+'8\x2014.8\x2014.'+'8\x2014.81\x2014'+'.8\x2035.58\x200'+'\x2020.77-14.'+'8\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'317.31Zm0-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H3'+'17.31Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22toolbar'+'-item\x20hori'+'zontal-cen'+'ter\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+('ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M4'+'50-130v-16'+'3.85H310.3'+'9q-20.77\x200'+'-35.58-14.'+'8Q260-323.'+'46\x20260-344'+'.23q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450v'+'-170.78H19'+'0.39q-20.7'+'7\x200-35.58-'+'14.8Q140-5'+'95\x20140-615'+'.77q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450V'+'-830q0-12.'+'75\x208.63-21'+'.37\x208.63-8'+'.63\x2021.38-'+'8.63\x2012.76'+'\x200\x2021.37\x208'+'.63Q510-84'+'2.75\x20510-8'+'30v163.85h'+'259.61q20.'+'77\x200\x2035.58'+'\x2014.8Q820-'+'636.54\x20820'+'-615.77q0\x20'+'20.77-14.8'+'1\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'510v170.78'+'h139.61q20'+'.77\x200\x2035.5'+'8\x2014.8Q700'+'-365\x20700-3'+'44.23q0\x2020'+'.77-14.81\x20'+'35.58-14.8'+'1\x2014.8-35.'+'58\x2014.8H51'+'0V-130q0\x201'+'2.75-8.63\x20'+'21.37-8.63'+'\x208.63-21.3'+'8\x208.63-12.'+'76\x200-21.37'+'-8.63Q450-'+'117.25\x20450'+'-130Z\x22/></'+'svg>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22toolbar-'+'item\x20horiz'+'ontal-righ'+'t\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<svg\x20xmlns'+'=\x22http://w'+'ww.w3.org/'+'2000/svg\x22\x20'+'height=\x2218'+'px\x22\x20viewBo'+'x=\x220\x20-960\x20'+'960\x20960\x22\x20w'+'idth=\x2218px'+'\x22\x20fill=\x22#0'+'30713\x22><pa'+'th\x20d=\x22M814'+'.61-100q-1'+'2.77\x200-21.'+'38-8.62-8.'+'62-8.61-8.'+'62-21.38v-'+'700q0-12.7'+'7\x208.62-21.'+'38\x208.61-8.'+'62\x2021.38-8')+('.62t21.39\x20'+'8.62q8.61\x20'+'8.61\x208.61\x20'+'21.38v700q'+'0\x2012.77-8.'+'61\x2021.38-8'+'.62\x208.62-2'+'1.39\x208.62Z'+'M405.77-29'+'3.85q-20.7'+'7\x200-35.58-'+'14.8-14.8-'+'14.81-14.8'+'-35.58\x200-2'+'0.77\x2014.8-'+'35.58\x2014.8'+'1-14.8\x2035.'+'58-14.8h23'+'6.92q20.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58\x200\x2020'+'.77-14.8\x203'+'5.58-14.81'+'\x2014.8-35.5'+'8\x2014.8H405'+'.77Zm-240-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H1'+'65.77Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22divide'+'r\x22></div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-top\x22>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M344.23-1'+'10q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-488'+'.07q0-20.7'+'7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v488.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q365-110\x20'+'344.23-110'+'Zm271.54-2'+'40q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-248'+'.07q0-20.7')+('7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v248.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q636.54-3'+'50\x20615.77-'+'350ZM130-7'+'90.38q-12.'+'77\x200-21.38'+'-8.62-8.62'+'-8.61-8.62'+'-21.38t8.6'+'2-21.39q8.'+'61-8.61\x2021'+'.38-8.61h7'+'00q12.77\x200'+'\x2021.38\x208.6'+'1\x208.62\x208.6'+'2\x208.62\x2021.'+'39\x200\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62H130Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20ver'+'tical-cent'+'er\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'svg\x20xmlns='+'\x22http://ww'+'w.w3.org/2'+'000/svg\x22\x20h'+'eight=\x2218p'+'x\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218px\x22'+'\x20fill=\x22#03'+'0713\x22><pat'+'h\x20d=\x22M342.'+'31-140q-20'+'.77\x200-35.5'+'8-14.81-14'+'.81-14.81-'+'14.81-35.5'+'8V-450H130'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-51'+'0\x20130-510h'+'161.92v-25'+'9.61q0-20.'+'77\x2014.81-3'+'5.58Q321.5'+'4-820\x20342.'+'31-820q20.'+'77\x200\x2035.57'+'\x2014.81\x2014.'+'81\x2014.81\x201'+'4.81\x2035.58'+'V-510h174.'+'62v-139.61'+'q0-20.77\x201'+'4.81-35.58'+'Q596.92-70'+'0\x20617.69-7'+'00t35.58\x201'+'4.81q14.81'+'\x2014.81\x2014.'+'81\x2035.58V-'+'510H830q12'+'.75\x200\x2021.3'+'7\x208.63\x208.6'+'3\x208.63\x208.6'+'3\x2021.38\x200\x20'+'12.76-8.63'+'\x2021.37Q842'+'.75-450\x2083'+'0-450H668.'+'08v139.61q'+'0\x2020.77-14'+'.81\x2035.58Q'+'638.46-260'+'\x20617.69-26')+('0q-20.77\x200'+'-35.57-14.'+'81-14.81-1'+'4.81-14.81'+'-35.58V-45'+'0H392.69v2'+'59.61q0\x2020'+'.77-14.81\x20'+'35.58Q363.'+'08-140\x20342'+'.31-140Z\x22/'+'></svg>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22toolb'+'ar-item\x20ve'+'rtical-bot'+'tom\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-110q-12'+'.77\x200-21.3'+'8-8.62Q100'+'-127.23\x2010'+'0-140t8.62'+'-21.39Q117'+'.23-170\x2013'+'0-170h700q'+'12.77\x200\x2021'+'.38\x208.61Q8'+'60-152.77\x20'+'860-140q0\x20'+'12.77-8.62'+'\x2021.38Q842'+'.77-110\x2083'+'0-110H130Z'+'m214.23-15'+'1.54q-20.7'+'7\x200-35.58-'+'14.81-14.8'+'-14.81-14.'+'8-35.57V-8'+'00q0-20.77'+'\x2014.8-35.5'+'7\x2014.81-14'+'.81\x2035.58-'+'14.81\x2020.7'+'7\x200\x2035.58\x20'+'14.81\x2014.8'+'\x2014.8\x2014.8'+'\x2035.57v488'+'.08q0\x2020.7'+'6-14.8\x2035.'+'57-14.81\x201'+'4.81-35.58'+'\x2014.81Zm27'+'1.54\x200q-20'+'.77\x200-35.5'+'8-14.81-14'+'.8-14.81-1'+'4.8-35.57V'+'-560q0-20.'+'77\x2014.8-35'+'.57\x2014.81-'+'14.81\x2035.5'+'8-14.81\x2020'+'.77\x200\x2035.5'+'8\x2014.81\x2014'+'.8\x2014.8\x2014'+'.8\x2035.57v2'+'48.08q0\x2020'+'.76-14.8\x203'+'5.57-14.81'+'\x2014.81-35.'+'58\x2014.81Z\x22'+'/></svg>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22div'+'ider\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba')+('r-item\x20hor'+'izontal-di'+'stribute\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<sv'+'g\x20xmlns=\x22h'+'ttp://www.'+'w3.org/200'+'0/svg\x22\x20hei'+'ght=\x2218px\x22'+'\x20viewBox=\x22'+'0\x20-960\x20960'+'\x20960\x22\x20widt'+'h=\x2218px\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M129.99'+'-100q-12.7'+'6\x200-21.37-'+'8.63Q100-1'+'17.25\x20100-'+'130v-700q0'+'-12.75\x208.6'+'3-21.37\x208.'+'63-8.63\x2021'+'.38-8.63\x201'+'2.76\x200\x2021.'+'37\x208.63Q16'+'0-842.75\x201'+'60-830v700'+'q0\x2012.75-8'+'.63\x2021.37-'+'8.63\x208.63-'+'21.38\x208.63'+'Zm350.06-1'+'90q-20.82\x20'+'0-35.43-14'+'.58Q430-31'+'9.17\x20430-3'+'40v-280q0-'+'20.83\x2014.5'+'7-35.42Q45'+'9.14-670\x204'+'79.95-670q'+'20.82\x200\x2035'+'.43\x2014.58Q'+'530-640.83'+'\x20530-620v2'+'80q0\x2020.83'+'-14.57\x2035.'+'42Q500.86-'+'290\x20480.05'+'-290Zm349.'+'94\x20190q-12'+'.76\x200-21.3'+'7-8.63Q800'+'-117.25\x2080'+'0-130v-700'+'q0-12.75\x208'+'.63-21.37\x20'+'8.63-8.63\x20'+'21.38-8.63'+'\x2012.76\x200\x202'+'1.37\x208.63Q'+'860-842.75'+'\x20860-830v7'+'00q0\x2012.75'+'-8.63\x2021.3'+'7-8.63\x208.6'+'3-21.38\x208.'+'63Z\x22/></sv'+'g>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-distrib'+'ute\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-100q-12'+'.75\x200-21.3'+'7-8.63-8.6'+'3-8.63-8.6'+'3-21.38\x200-'+'12.76\x208.63'+'-21.37Q117')+('.25-160\x2013'+'0-160h700q'+'12.75\x200\x2021'+'.37\x208.63\x208'+'.63\x208.63\x208'+'.63\x2021.38\x20'+'0\x2012.76-8.'+'63\x2021.37Q8'+'42.75-100\x20'+'830-100H13'+'0Zm210-330'+'q-20.83\x200-'+'35.42-14.5'+'7Q290-459.'+'14\x20290-479'+'.95q0-20.8'+'2\x2014.58-35'+'.43Q319.17'+'-530\x20340-5'+'30h280q20.'+'83\x200\x2035.42'+'\x2014.57Q670'+'-500.86\x2067'+'0-480.05q0'+'\x2020.82-14.'+'58\x2035.43Q6'+'40.83-430\x20'+'620-430H34'+'0ZM130-800'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-86'+'0\x20130-860h'+'700q12.75\x20'+'0\x2021.37\x208.'+'63\x208.63\x208.'+'63\x208.63\x2021'+'.38\x200\x2012.7'+'6-8.63\x2021.'+'37Q842.75-'+'800\x20830-80'+'0H130Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22d'+'ivider\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22group'+'\x20measure\x22\x20'+'id=\x22measur'+'e\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'toolbar-it'+'em\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20xmln'+'s=\x22http://'+'www.w3.org'+'/2000/svg\x22'+'\x20height=\x221'+'8\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M172.31'+'-260Q142-2'+'60\x20121-281'+'q-21-21-21'+'-51.44v-29'+'5.12Q100-6'+'58\x20121-679'+'q21-21\x2051.'+'31-21h615.'+'38Q818-700'+'\x20839-679q2'+'1\x2021\x2021\x2051'+'.44v295.12'+'Q860-302\x208'+'39-281q-21'+'\x2021-51.31\x20'+'21H172.31Z'+'m0-60h615.'+'38q4.62\x200\x20'+'8.46-3.85\x20'+'3.85-3.84\x20'+'3.85-8.46v'+'-295.38q0-'+'4.62-3.85-'+'8.46-3.84-'+'3.85-8.46-'+'3.85H670v1'+'14.61q0\x2012'+'.75-8.63\x202'+'1.38-8.63\x20'+'8.62-21.38'+'\x208.62-12.7'+'6\x200-21.37-'+'8.62-8.62-'+'8.63-8.62-'+'21.38V-640'+'H510v114.6'+'1q0\x2012.75-'+'8.63\x2021.38'+'-8.63\x208.62'+'-21.38\x208.6'+'2-12.76\x200-'+'21.37-8.62'+'-8.62-8.63'+'-8.62-21.3'+'8V-640H350'+'v114.61q0\x20'+'12.75-8.63'+'\x2021.38-8.6'+'3\x208.62-21.'+'38\x208.62-12'+'.76\x200-21.3'+'7-8.62-8.6'+'2-8.63-8.6'+'2-21.38V-6'+'40H172.31q'+'-4.62\x200-8.'+'46\x203.85-3.'+'85\x203.84-3.'+'85\x208.46v29'+'5.38q0\x204.6'+'2\x203.85\x208.4'+'6\x203.84\x203.8'+'5\x208.46\x203.8'+'5ZM320-495'+'.39Zm160\x200'+'Zm160\x200ZM4'+'80-480Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20'):'')+('\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22actions\x22'+'\x20id=\x22actio'+'ns\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22act'+'ions-item\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<svg\x20x'+'mlns=\x22http'+'://www.w3.'+'org/2000/s'+'vg\x22\x20height'+'=\x2218\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'\x22><path\x20d='+'\x22M280-120q'+'-33\x200-56.5'+'-23.5T200-'+'200v-520q-'+'17\x200-28.5-'+'11.5T160-7'+'60q0-17\x2011'+'.5-28.5T20'+'0-800h160q'+'0-17\x2011.5-'+'28.5T400-8'+'40h160q17\x20'+'0\x2028.5\x2011.'+'5T600-800h'+'160q17\x200\x202'+'8.5\x2011.5T8'+'00-760q0\x201'+'7-11.5\x2028.'+'5T760-720v'+'520q0\x2033-2'+'3.5\x2056.5T6'+'80-120H280'+'Zm400-600H'+'280v520h40'+'0v-520ZM40'+'0-280q17\x200'+'\x2028.5-11.5'+'T440-320v-'+'280q0-17-1'+'1.5-28.5T4'+'00-640q-17'+'\x200-28.5\x2011'+'.5T360-600'+'v280q0\x2017\x20'+'11.5\x2028.5T'+'400-280Zm1'+'60\x200q17\x200\x20'+'28.5-11.5T'+'600-320v-2'+'80q0-17-11'+'.5-28.5T56'+'0-640q-17\x20'+'0-28.5\x2011.'+'5T520-600v'+'280q0\x2017\x201'+'1.5\x2028.5T5'+'60-280ZM28'+'0-720v520-'+'520Z\x22/></s'+'vg>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22loa'+'ding\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22i'+'nner\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20/*\x20定义旋'+'转动画\x20*/\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20@keyf'+'rames\x20rota'+'te360\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fr'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ransform:\x20'+'rotate(0de'+'g);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20to\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'form:\x20rota'+'te(360deg)'+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20:host\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x20calc(100'+'%\x20-\x201px);\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20ca'+'lc(100%\x20-\x20'+'1px);\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.co'+'ntainer\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'00%;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20positio'+'n:\x20relativ'+'e;\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.mai'+'n\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x20100%;\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20::slot'+'ted(glide-'+'dnr-item)\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20inline-'+'block;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20flex-sh'+'rink:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20user-'+'select:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'cursor:\x20au'+'to;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.al'+'ign-vector'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20col'+'or:\x20'))+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20font'+'-size:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lin'+'e-height:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20z-i'+'ndex:\x201000'+'04;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'line\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ali'+'gn-line-ve'+'rtical\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20border-'+'top:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.align-li'+'ne-horizon'+'tal\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-lef'+'t:\x20solid\x201'+'px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'reference-'+'lines_sele'+'cted\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.line\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100002;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20visibi'+'lity:\x20hidd'+'en;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20&.left,\x20&'+'.right\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20&:'+'hover\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20cu'+'rsor:\x20ew-r'+'esize;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20&::b'+'efore\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20co'+'ntent:\x20\x27\x27;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20left:\x20')+Math['floor'](lineSize/(-2216*0x4+-4591+-1*-13457))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x20100%;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op,\x20&.bott'+'om\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&:hove'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20cursor'+':\x20ns-resiz'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20&::befor'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20conten'+'t:\x20\x27\x27;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lef'+'t:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x20')+Math['floor'](lineSize/(0x21c7*0x1+0x456*-7+-875))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+':\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.vector\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20display'+':\x20inline-b'+'lock;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border:\x20so'+'lid\x201px\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'#ffffff;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20z-ind'+'ex:\x20100003'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.top'+'-left,\x20&.b'+'ottom-righ'+'t\x20{\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20se-resize'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op-right,\x20'+'&.bottom-l'+'eft\x20{\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&:hov'+'er\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20nesw-re'+'size;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.re'+'ference-li'+'nes_drag\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20w'+'idth:\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x200px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20top:\x200px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20border:\x20s'+'olid\x201px\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20z-in'+'dex:\x2011;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20rgba('+'73,\x207,\x20218'+',\x20.05);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'toolbar\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20')+(this['toolbarPla'+'cement']==='float'?'inline':'block')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20posi'+'tion:\x20abso'+'lute;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'top:\x20')+(this['toolbarPla'+'cement']==='float'?0x3*0x99d+0x26fd+0x1*-17364:'10px')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20')+(this['toolbarPla'+'cement']==='float'?'':'width:\x20100'+'%;')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ext-align:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20ponter-'+'events:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20z-'+'index:\x20100'+'005;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.inner\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-flex;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20gap:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'padding:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-rad'+'ius:\x208px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20tran'+'slate:\x200px'+'\x200px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20rgba(2'+'55,255,255'+',.5);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backdrop'+'-filter:\x20b'+'lur(25px);'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20box'+'-shadow:\x200'+'\x204px\x206px\x20-'+'1px\x20rgb(0\x20'+'0\x200\x20/\x200.1)'+',\x200\x202px\x204p'+'x\x20-2px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20ponter'+'-events:\x20a'+'uto;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.group\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20gap:\x204px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'align-item'+'s:\x20center;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.div'+'ider\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20wid'+'th:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20#D1D5'+'DC;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.toolba'+'r-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20in'+'line-flex;'+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20padding:\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20pointer'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20#F3'+'F4F6;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20&'+':active\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20#E5E7E'+'B;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&.acti'+'ve\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.too'+'lbar-item\x20'+'{\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20'))+this['colorPrima'+'ry']+(';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20svg\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20#ffffff;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20.m'+'easure-lin'+'es\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0006;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.solid\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ite'+'m\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20left:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100005;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x204px\x2012'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'y;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'bottom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.b'+'ottom\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x204px'+'\x2012px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-y;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20bottom,'+'\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.l'+'eft\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'size:\x2012px'+'\x204px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-rep'+'eat:\x20repea'+'t-x;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-imag'+'e:\x20linear-'+'gradient(t'+'o\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.r'+'ight\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x2012p'+'x\x204px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-x;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.da'+'shed\x20{\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.item\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'visibility'+':\x20hidden;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20left:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0005;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.hor'+'izontal-to'+'p\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x2012px\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.horiz'+'ontal-bott'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x201px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground-s'+'ize:\x2012px\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-repe'+'at:\x20repeat'+'-x;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-image'+':\x20linear-g'+'radient(to'+'\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-left\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x201p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-size:\x20'+'4px\x2012px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-repeat:\x20r'+'epeat-y;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'image:\x20lin'+'ear-gradie'+'nt(to\x20bott'+'om,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-right\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-size:'+'\x204px\x2012px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20backgroun'+'d-repeat:\x20'+'repeat-y;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-image:\x20li'+'near-gradi'+'ent(to\x20bot'+'tom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.number'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20v'+'isibility:'+'\x20hidden;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20top:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'font-size:'+'\x2010px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20padding'+':2px\x204px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-radiu'+'s:\x204px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20color:'+'\x20#FFFFFF;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.measur'+'e-target-o'+'utline\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20visibil'+'ity:\x20hidde'+'n;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bor'+'der:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20box-'+'sizing:\x20bo'+'rder-box;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20pointer'+'-events:\x20n'+'one\x20!impor'+'tant;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'z-index:\x201'+'00006;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.actio'+'ns\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20a'+'bsolute;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20left:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.action'+'s-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20paddi'+'ng:\x204px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20translate'+':\x200px\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kdrop-filt'+'er:\x20blur(2'+'5px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20z-index:'+'\x20100004;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20line-'+'height:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20cur'+'sor:\x20point'+'er;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20svg\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&:h'+'over\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:activ'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20')+colors['redActive']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'loading\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20width:\x20'+'100%;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x2010'+'0%;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'rgba(255,2'+'55,255,.5)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'drop-filte'+'r:\x20blur(25'+'px);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20fl'+'ex;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20al'+'ign-items:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20z-index'+':\x20100007;\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20.inne'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'relative;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r:\x202px\x20sol'+'id\x20#4907DA'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-top-c'+'olor:\x20rgba'+'(0,\x200,\x200,\x20'+'0.2);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20border-r'+'ight-color'+':\x20rgba(0,\x20'+'0,\x200,\x200.2)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-botto'+'m-color:\x20r'+'gba(0,\x200,\x20'+'0,\x200.2);\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'100%;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20animati'+('on:\x20rotate'+'360\x20infini'+'te\x200.75s\x20l'+'inear;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20.s'+'lot\x20{}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20'));}['onceBindin'+'gs'](){const _0x390404=this['shadowRoot'];if(_0x390404===null)return;let _0x39a15f=_0x390404['querySelec'+'tor']('.main');if(_0x39a15f!==null&&_0x39a15f!==undefined){const {width:_0x243e37,height:_0x26c839}=_0x39a15f['getBoundin'+'gClientRec'+'t']();this['registered']['main']={'id':'main','el':_0x39a15f,'x':0x0,'y':0x0,'width':_0x243e37,'height':_0x26c839,'type':'main'};}this['isToolbar']&&(_0x39a15f=_0x390404['querySelec'+'tor']('.toolbar'),_0x39a15f!==null&&(this['elToolbar']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.aligns'),_0x39a15f!==null&&(this['elAligns']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure'),_0x39a15f!==null&&(this['elMeasure']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-t'+'arget-outl'+'ine'),_0x39a15f!==null&&(this['elMeasureO'+'utline']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.top'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['solid_t']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.bott'+'om'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['solid_b']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.left'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['solid_l']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.righ'+'t'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['solid_r']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-top'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['dashed_h_t']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-bot'+'tom'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['dashed_h_b']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-left'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['dashed_v_l']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-right'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['dashed_v_r']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-top'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['numberT']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-bottom'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['numberB']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-left'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['numberL']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-right'),_0x39a15f!==null&&(this['elMeasureL'+'ines']['numberR']=_0x39a15f)),_0x39a15f=_0x390404['querySelec'+'tor']('.left'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'l')&&(this['elSelected'+'Lines']['l']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.right'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'r')&&(this['elSelected'+'Lines']['r']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.top'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'t')&&(this['elSelected'+'Lines']['t']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.bottom'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'b')&&(this['elSelected'+'Lines']['b']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.top-left'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'tl')&&(this['elSelected'+'Vectors']['tl']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.top-right'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'tr')&&(this['elSelected'+'Vectors']['tr']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.bottom-le'+'ft'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'bl')&&(this['elSelected'+'Vectors']['bl']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.bottom-ri'+'ght'),_0x39a15f!==null&&!HasOwn(this['elSelected'+'Lines'],'br')&&(this['elSelected'+'Vectors']['br']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('.reference'+'-lines_dra'+'g'),_0x39a15f!==null&&this['rDrags']===null&&(this['rDrags']=_0x39a15f),_0x39a15f=_0x390404['querySelec'+'tor']('#actions'),_0x39a15f!==null&&(this['elActions']=_0x39a15f);}['countLoadi'+'ngItems'](){const _0x3aa346=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x3aa346===null||_0x3aa346===undefined)return;const _0x3dc51c=_0x3aa346['assignedNo'+'des']({'flatten':![]});for(const _0x43bae3 in _0x3dc51c){const _0x32afcc=_0x3dc51c[_0x43bae3];if(_0x32afcc['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x363f4c=_0x32afcc['getAttribu'+'te']('type');_0x363f4c==='image'&&this['loadingIte'+'ms']['image']['total']++,(_0x363f4c===null||_0x363f4c==='general')&&this['loadingIte'+'ms']['general']['total']++;}}['hideLoadin'+'g'](){if(this['loadingIte'+'ms']['general']['loaded']===this['loadingIte'+'ms']['general']['total']&&this['loadingIte'+'ms']['image']['loaded']===this['loadingIte'+'ms']['image']['total']){const _0xfca2e4=this['shadowRoot']?.['querySelec'+'tor']('.loading');_0xfca2e4!==null&&_0xfca2e4!==undefined&&(_0xfca2e4['style']['display']='none');}}['renderItem'+'s'](){const _0x35b611=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x35b611===null||_0x35b611===undefined)return;const _0x16d738=_0x35b611['assignedNo'+'des']({'flatten':![]});for(const _0x2d11c1 in _0x16d738){const _0x1edd73=_0x16d738[_0x2d11c1];if(_0x1edd73['nodeType']!==Node['ELEMENT_NO'+'DE']){this['hideLoadin'+'g']();continue;}const _0x1e18f8=_0x1edd73['getAttribu'+'te']('type');(_0x1e18f8===null||_0x1e18f8==='general')&&(this['renderItem'](_0x1edd73),this['hideLoadin'+'g']());if(_0x1e18f8==='image'){if(_0x1edd73['querySelec'+'tor']('canvas'))continue;this['renderImag'+'eItem'](_0x1edd73)['then'](()=>{this['hideLoadin'+'g']();});}}}['renderItem'](_0x1e2be5){const _0x35d44b=_0x1e2be5['getBoundin'+'gClientRec'+'t']();let _0x3682bc=_0x35d44b['width'],_0x5c629f=_0x35d44b['height'];const _0x3989a6=_0x1e2be5['getAttribu'+'te']('left'),_0x41bbbe=_0x1e2be5['getAttribu'+'te']('top'),_0x59a04e=_0x1e2be5['getAttribu'+'te']('width'),_0x5ac98d=_0x1e2be5['getAttribu'+'te']('height');let _0x2a207a=-2*-1919+-3595+-243,_0x232cdd=0x1*0x1e4f+0x1121+-184*0x42;_0x3989a6!==null&&(_0x2a207a=_0x3989a6);_0x41bbbe!==null&&(_0x232cdd=_0x41bbbe);_0x59a04e!==null&&(_0x3682bc=_0x59a04e);_0x5ac98d!==null&&(_0x5c629f=_0x5ac98d);if(_0x1e2be5['style']['translate']!==''){const _0x356276=window['getCompute'+'dStyle'](_0x1e2be5),_0x55f98a=this['getTransla'+'tePos'](_0x356276['translate']);_0x2a207a=_0x55f98a['x'],_0x232cdd=_0x55f98a['y'];}_0x2a207a=Math['round'](_0x2a207a),_0x232cdd=Math['round'](_0x232cdd),_0x3682bc=Math['round'](_0x3682bc),_0x5c629f=Math['round'](_0x5c629f),this['registered'][_0x1e2be5['id']]={'id':_0x1e2be5['id'],'el':_0x1e2be5,'x':_0x2a207a,'y':_0x232cdd,'width':_0x3682bc,'height':_0x5c629f,'type':'general'},this['loadingIte'+'ms']['general']['loaded']++,_0x1e2be5['style']['visibility']='visible',_0x1e2be5['style']['translate']=_0x2a207a+'px\x20'+_0x232cdd+'px',_0x1e2be5['style']['width']=_0x3682bc+'px',_0x1e2be5['style']['height']=_0x5c629f+'px';}['renderImag'+'eItem'](_0x6fae6b){return new Promise(_0x430bdb=>{if(_0x6fae6b['nodeType']===Node['ELEMENT_NO'+'DE']){const _0x5b72e2=document['createElem'+'ent']('canvas');_0x5b72e2['style']['cssText']='width:\x20100'+'%;\x20height:'+'\x20100%;';const _0x521758=_0x5b72e2['getContext']('2d'),_0x151d00=_0x6fae6b['querySelec'+'tor']('img'),_0x489fae=new Image();_0x489fae['src']=_0x151d00['src'];const _0x240fa3=_0x6fae6b['getElement'+'sByTagName']('img');Array['from'](_0x240fa3)['forEach'](_0x35d6f9=>{_0x35d6f9['remove']();}),_0x489fae['onload']=()=>{let _0x3abf23=-620*-5+0x127*-26+-457*-10,_0x122082=0x1668+0x257c*-1+0x78a*0x2;const _0x5418bb=_0x6fae6b['getAttribu'+'te']('left'),_0x3e4913=_0x6fae6b['getAttribu'+'te']('top'),_0x23df22=_0x6fae6b['getAttribu'+'te']('width'),_0x492073=_0x6fae6b['getAttribu'+'te']('height');_0x5418bb!==null&&(_0x3abf23=_0x5418bb);_0x3e4913!==null&&(_0x122082=_0x3e4913);if(_0x6fae6b['style']['translate']!==''){const _0x4f8fdf=window['getCompute'+'dStyle'](_0x6fae6b),_0x39c241=this['getTransla'+'tePos'](_0x4f8fdf['translate']);_0x3abf23=_0x39c241['x'],_0x122082=_0x39c241['y'];}const _0x18bf11=_0x489fae['width']/_0x489fae['height'];let _0x1e7f4c=_0x489fae['width'],_0x5577de=_0x489fae['height'];if(_0x23df22!==null&&_0x492073!==null)_0x1e7f4c=_0x23df22,_0x5577de=_0x1e7f4c/_0x18bf11,_0x6fae6b['style']['width']=Math['round'](_0x1e7f4c)+'px',_0x6fae6b['style']['height']=Math['round'](_0x5577de)+'px';else {if(_0x23df22!==null&&_0x492073===null)_0x1e7f4c=_0x23df22,_0x5577de=_0x1e7f4c/_0x18bf11,_0x6fae6b['style']['width']=Math['round'](_0x1e7f4c)+'px',_0x6fae6b['style']['height']=Math['round'](_0x5577de)+'px';else _0x23df22===null&&_0x492073!==null?(_0x5577de=_0x492073,_0x1e7f4c=_0x5577de*_0x18bf11,_0x6fae6b['style']['width']=Math['round'](_0x1e7f4c)+'px',_0x6fae6b['style']['height']=Math['round'](_0x5577de)+'px'):(_0x6fae6b['style']['width']=Math['round'](_0x1e7f4c)+'px',_0x6fae6b['style']['height']=Math['round'](_0x5577de)+'px');}_0x3abf23=Math['round'](_0x3abf23),_0x122082=Math['round'](_0x122082),_0x1e7f4c=Math['round'](_0x1e7f4c),_0x5577de=Math['round'](_0x5577de),this['registered'][_0x6fae6b['id']]={'id':_0x6fae6b['id'],'el':_0x6fae6b,'x':_0x3abf23,'y':_0x122082,'width':_0x1e7f4c,'height':_0x5577de,'type':'image'};const _0x42c8fa=Math['min'](window['innerWidth']/_0x489fae['width'],window['innerHeigh'+'t']/_0x489fae['height']),_0x3baf3e=Math['round'](_0x489fae['width']*_0x42c8fa),_0x56f991=Math['round'](_0x489fae['height']*_0x42c8fa);_0x5b72e2['width']=_0x3baf3e,_0x5b72e2['height']=_0x56f991,_0x521758?.['drawImage'](_0x489fae,0x63a*0x3+0x11*-14+-4544,0x2647+0x26e2+-19753,_0x3baf3e,_0x56f991),_0x6fae6b['appendChil'+'d'](_0x5b72e2),this['selected']['ids']['length']>-155*-31+0x1b56+-11803&&(this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()),this['loadingIte'+'ms']['image']['loaded']++,_0x6fae6b['style']['visibility']='visible',_0x6fae6b['style']['translate']=_0x3abf23+'px\x20'+_0x122082+'px',_0x6fae6b['style']['width']=_0x1e7f4c+'px',_0x6fae6b['style']['height']=_0x5577de+'px',_0x430bdb('');};}});}['initKeyboa'+'rdEvents'](){document['addEventLi'+'stener']('keydown',_0x5dbb9d=>{requestAnimationFrame(()=>{switch(_0x5dbb9d['keyCode']){case 0x2a2+-278*0x4+0x19*0x13:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x41696c of this['selected']['ids']){this['registered'][_0x41696c]['x']--,this['registered'][_0x41696c]['el']['style']['translate']=this['registered'][_0x41696c]['x']+'px\x20'+this['registered'][_0x41696c]['y']+'px';}this['selected']['x']--;}break;case 0x249e+-8072+-1264:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x106c3c of this['selected']['ids']){this['registered'][_0x106c3c]['y']--,this['registered'][_0x106c3c]['el']['style']['translate']=this['registered'][_0x106c3c]['x']+'px\x20'+this['registered'][_0x106c3c]['y']+'px';}this['selected']['y']--;}break;case 0x95*-38+0x34b+0x12fa:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x146df1 of this['selected']['ids']){this['registered'][_0x146df1]['x']++,this['registered'][_0x146df1]['el']['style']['translate']=this['registered'][_0x146df1]['x']+'px\x20'+this['registered'][_0x146df1]['y']+'px';}this['selected']['x']++;}break;case 0xea+0xb7d+0xf*-209:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x943467 of this['selected']['ids']){this['registered'][_0x943467]['y']++,this['registered'][_0x943467]['el']['style']['translate']=this['registered'][_0x943467]['x']+'px\x20'+this['registered'][_0x943467]['y']+'px';}this['selected']['y']++;}break;}this['renderSele'+'ctedRefere'+'nce'](),this['measureExe'+'cute']();this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position']();const _0x1b4843=new CustomEvent('onChangeKe'+'yboard',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x1b4843);});});}['onSlotChan'+'ge'](){const _0x4b7fb0=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x4b7fb0===null||_0x4b7fb0===undefined)return;_0x4b7fb0?.['addEventLi'+'stener']('slotchange',()=>{this['countLoadi'+'ngItems'](),this['renderItem'+'s'](),!this['isInit']&&(this['onceBindin'+'gs'](),this['isInit']=!![]);});}['getSelecte'+'dParams'](){let _0x5bdcb6={'x':0x0,'y':0x0},_0x5593a9={'x':0x0,'y':0x0};for(let _0x77a34=0x2*-1455+0x1c21+-4291*0x1;_0x77a34<this['selected']['ids']['length'];_0x77a34++){const _0x4cd2c3=this['selected']['ids'][_0x77a34];if(_0x77a34===-2833+0x10a8+0x35*-27)_0x5bdcb6={'x':this['registered'][_0x4cd2c3]['x'],'y':this['registered'][_0x4cd2c3]['y']},_0x5593a9={'x':this['registered'][_0x4cd2c3]['x']+this['registered'][_0x4cd2c3]['width'],'y':this['registered'][_0x4cd2c3]['y']+this['registered'][_0x4cd2c3]['height']};else {const _0x4800c5=this['registered'][_0x4cd2c3]['x'],_0x45860b=this['registered'][_0x4cd2c3]['y'];_0x5bdcb6={'x':_0x4800c5<_0x5bdcb6['x']?_0x4800c5:_0x5bdcb6['x'],'y':_0x45860b<_0x5bdcb6['y']?_0x45860b:_0x5bdcb6['y']};const _0x5a6888=this['registered'][_0x4cd2c3]['x']+this['registered'][_0x4cd2c3]['width'],_0x44a545=this['registered'][_0x4cd2c3]['y']+this['registered'][_0x4cd2c3]['height'];_0x5593a9={'x':_0x5a6888>=_0x5593a9['x']?_0x5a6888:_0x5593a9['x'],'y':_0x44a545>=_0x5593a9['y']?_0x44a545:_0x5593a9['y']};}}const _0x1e8e7e=_0x5593a9['x']-_0x5bdcb6['x'],_0x5c982a=_0x5593a9['y']-_0x5bdcb6['y'];this['selected']={...this['selected'],...{'x':_0x5bdcb6['x'],'y':_0x5bdcb6['y'],'width':_0x1e8e7e,'height':_0x5c982a}};}['renderSele'+'ctedRefere'+'nce'](){this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-55*-14+0x1735+-6709)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['l']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x2*0xb97+0x2466+-305*0x32)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x61*0x4c+-2*-3544+-14458))+'px',this['elSelected'+'Lines']['t']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-6871+-20*-15+-1*-6573))+'px',this['elSelected'+'Lines']['b']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';}['isSelected'+'Item'](_0x26d129,_0x4bf60f){const _0x4a8996=[{'x':_0x26d129['x'],'y':_0x26d129['y']},{'x':_0x26d129['x']+_0x26d129['width'],'y':_0x26d129['y']},{'x':_0x26d129['x'],'y':_0x26d129['y']+_0x26d129['height']},{'x':_0x26d129['x']+_0x26d129['width'],'y':_0x26d129['y']+_0x26d129['height']}];for(let _0x1972b6=0xc75*-1+0x11a+0xb5b;_0x1972b6<_0x4a8996['length'];_0x1972b6++){const _0x2cf9a7=_0x4a8996[_0x1972b6];if(this['isPointInR'+'ectangle'](_0x2cf9a7,_0x4bf60f))return !![];}return ![];}['renderDrag'+'SelectRefe'+'renceLine'](_0x5e6637,_0x13e4c1){const _0x3cb8c0=this['shadowRoot'];if(_0x3cb8c0===null)return;const _0x13355b=_window['getCompute'+'dStyle'](this['rDrags']);_0x13355b['visibility']!=='visible'&&(this['rDrags']['style']['visibility']='visible');dragBeginPos['x']===-1&&(dragBeginPos['x']=_0x5e6637['clientX'],dragBeginPos['y']=_0x5e6637['clientY']);const _0x3c8924={'x':dragBeginPos['x'],'y':dragBeginPos['y']},_0x4e07aa={'x':-1,'y':-1,'width':0x0,'height':0x0};_0x5e6637['clientX']>_0x3c8924['x']?(_0x4e07aa['x']=_0x3c8924['x']-_0x13e4c1['x'],_0x4e07aa['width']=_0x5e6637['clientX']-_0x3c8924['x']):(_0x4e07aa['x']=_0x5e6637['clientX']-_0x13e4c1['x'],_0x4e07aa['width']=_0x3c8924['x']-_0x5e6637['clientX']);_0x5e6637['clientY']>_0x3c8924['y']?(_0x4e07aa['y']=_0x3c8924['y']-_0x13e4c1['y'],_0x4e07aa['height']=_0x5e6637['clientY']-_0x3c8924['y']):(_0x4e07aa['y']=_0x5e6637['clientY']-_0x13e4c1['y'],_0x4e07aa['height']=_0x3c8924['y']-_0x5e6637['clientY']);this['rDrags']['style']['translate']=_0x4e07aa['x']+'px\x20'+_0x4e07aa['y']+'px',this['rDrags']['style']['width']=_0x4e07aa['width']+'px',this['rDrags']['style']['height']=_0x4e07aa['height']+'px';const _0x42ab32=_0x3cb8c0['querySelec'+'tor']('slot');if(_0x42ab32===null)return;const _0x11eb08=Object['values'](_0x47e8bb(this['registered']));for(let _0x3f1fac=-8798+0x2509+0x1*-683;_0x3f1fac<_0x11eb08['length'];_0x3f1fac++){if(this['isSelected'+'Item'](_0x11eb08[_0x3f1fac],_0x4e07aa)){if(_0x11eb08[_0x3f1fac]['id']==='main')continue;this['selected']['ids']['indexOf'](_0x11eb08[_0x3f1fac]['id'])===-1&&this['selected']['ids']['push'](_0x11eb08[_0x3f1fac]['id']);}else {const _0x4bac27=this['selected']['ids']['indexOf'](_0x11eb08[_0x3f1fac]['id']);_0x4bac27!==-1&&this['selected']['ids']['splice'](_0x4bac27,0x1*-2257+0xc22+-848);}}this['selected']['ids']['length']>-6*0x28c+-1076+0x74*0x2b?this['triggerSel'+'ectedLines'+'Vectors']('show'):this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x3c9791=this['selected']['ids']['map'](_0x473c66=>{return {'id':_0x473c66,'type':this['registered'][_0x473c66]['type']};}),_0x5be72b=new CustomEvent('onSelect',{'detail':_0x3c9791});this['dispatchEv'+'ent'](_0x5be72b),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['isPointInR'+'ectangle'](_0x2f0152,_0x401fc6){if(_0x2f0152['x']>_0x401fc6['x']&&_0x2f0152['x']<_0x401fc6['x']+_0x401fc6['width']&&_0x2f0152['y']>_0x401fc6['y']&&_0x2f0152['y']<_0x401fc6['y']+_0x401fc6['height'])return !![];return ![];}['handleClic'+'k'](){const _0x5c8282=this['shadowRoot'];if(_0x5c8282===null)return;_0x5c8282['addEventLi'+'stener']('mousedown',_0x10b749=>{_0x10b749['preventDef'+'ault']();const _0x1094f0=this['shadowRoot'];if(_0x1094f0===null)return;const _0x230e74=new CustomEvent('onMouseDow'+'n',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x230e74),this['hasMoved']=![],this['hasSelecte'+'d']=![],this['latestSele'+'cted']=_0x47e8bb(this['selected']);const _0x59ea4b=this['getBoundin'+'gClientRec'+'t'](),_0x4a7921={'x':_0x10b749['clientX']-_0x59ea4b['x'],'y':_0x10b749['clientY']-_0x59ea4b['y']},_0x376fa2=_0x10b749['target']['closest']('glide-dnr-'+'item');let _0x3ca1eb='';this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=-4666*-1+-2*0x362+-2*0x5bb,this['elMeasureO'+'utline']['style']['height']=0x17fd+-1931+-4210,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');this['isActions']&&(this['elActions']['style']['visibility']='hidden',this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['removeEven'+'tListener']('click',this['delete']));if(_0x376fa2)this['mouseTarge'+'t']='elements',this['mouseDownE'+'lement'](_0x376fa2);else {if(_0x10b749['target']['closest']('.line')){this['mouseTarge'+'t']='line';if(_0x10b749['target']['classList']['contains']('left'))_0x3ca1eb='l';else {if(_0x10b749['target']['classList']['contains']('right'))_0x3ca1eb='r';else {if(_0x10b749['target']['classList']['contains']('top'))_0x3ca1eb='t';else _0x10b749['target']['classList']['contains']('bottom')&&(_0x3ca1eb='b');}}}else {if(_0x10b749['target']['closest']('.vector')){this['mouseTarge'+'t']='vector';if(_0x10b749['target']['classList']['contains']('top-left'))_0x3ca1eb='tl';else {if(_0x10b749['target']['classList']['contains']('top-right'))_0x3ca1eb='tr';else {if(_0x10b749['target']['classList']['contains']('bottom-lef'+'t'))_0x3ca1eb='bl';else _0x10b749['target']['classList']['contains']('bottom-rig'+'ht')&&(_0x3ca1eb='br');}}}else {if(_0x10b749['target']['closest']('.actions-i'+'tem'))this['triggerAct'+'ions']();else {if(_0x10b749['target']['closest']('.toolbar-i'+'tem'))_0x10b749['target']['closest']('.horizonta'+'l-left')&&this['shortcuts']('horizontal','begin'),_0x10b749['target']['closest']('.horizonta'+'l-center')&&this['shortcuts']('horizontal','middle'),_0x10b749['target']['closest']('.horizonta'+'l-right')&&this['shortcuts']('horizontal','end'),_0x10b749['target']['closest']('.horizonta'+'l-distribu'+'te')&&this['shortcuts']('horizontal','distribute'),_0x10b749['target']['closest']('.vertical-'+'top')&&this['shortcuts']('vertical','begin'),_0x10b749['target']['closest']('.vertical-'+'center')&&this['shortcuts']('vertical','middle'),_0x10b749['target']['closest']('.vertical-'+'bottom')&&this['shortcuts']('vertical','end'),_0x10b749['target']['closest']('.vertical-'+'distribute')&&this['shortcuts']('vertical','distribute'),_0x10b749['target']['closest']('.measure')&&this['shortcuts']('','measure');else _0x59ea4b&&(this['mouseTarge'+'t']='elements',this['isInSelect'+'ed']=this['isPointInR'+'ectangle'](_0x4a7921,this['selected']),!this['isInSelect'+'ed']&&(this['selected']=_0x47e8bb(originSelected),this['renderSele'+'ctedRefere'+'nce']()));}}}}this['selected']['ids']['length']>0xdeb+0x2*-634+0x5*-459&&(this['hasSelecte'+'d']=!![]);const _0x171997={'x':Math['round'](_0x10b749['clientX']-this['selected']['x']),'y':Math['round'](_0x10b749['clientY']-this['selected']['y'])},_0x4da973={'x':Math['round'](_0x10b749['clientX']),'y':Math['round'](_0x10b749['clientY'])},_0x345db8=_0x47e8bb(this['selected']),_0x34557c=_0x47e8bb(this['registered']),_0x172956=_0x345db8['width']/_0x345db8['height'];document['onmousemov'+'e']=_0x4e1be2=>{_0x4e1be2['preventDef'+'ault'](),_0x4e1be2['stopPropag'+'ation'](),this['mouseMoveT'+'ype']='main',this['hasMoved']=!![],this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['requestAni'+'mation']=requestAnimationFrame(()=>{this['isToolbar']&&(this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));const _0x1e9687={'x':Math['round'](_0x4e1be2['clientX']),'y':Math['round'](_0x4e1be2['clientY'])};switch(this['mouseTarge'+'t']){case 'elements':this['hasSelecte'+'d']&&this['isInSelect'+'ed']?(this['moveElemen'+'ts']({'x':Math['round'](_0x4e1be2['clientX']),'y':Math['round'](_0x4e1be2['clientY'])},_0x171997,_0x34557c),this['referenceA'+'lignLinesV'+'ectors'](_0x34557c,_0x345db8)):this['renderDrag'+'SelectRefe'+'renceLine'](_0x4e1be2,_0x59ea4b);break;case 'line':this['moveLines'](_0x3ca1eb,_0x34557c,_0x345db8,_0x4da973,_0x1e9687);break;case 'vector':this['moveVector'+'s'](_0x3ca1eb,_0x34557c,_0x345db8,_0x4da973,_0x1e9687,_0x172956);break;}});},document['onmouseup']=()=>{document['onmousemov'+'e']=null,document['onmouseup']=null;const _0x35882=new CustomEvent('onMouseUp',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x35882),this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['mouseUpEle'+'ment'](_0x34557c);};});}['getTransla'+'tePos'](_0x278a27){let _0xf2cb7d=-1,_0xa7e0ae=-1;if(_0x278a27!=='none'){if(_0x278a27['indexOf']('\x20')>-1){const _0x2cfcf7=_0x278a27['split']('\x20');_0xf2cb7d=parseFloat(_0x2cfcf7[-5520+-5068+-2647*-4]['replace']('px','')),_0xa7e0ae=parseFloat(_0x2cfcf7[-8*0x83+0x101e*-2+0x2455]['replace']('px',''));}else _0xf2cb7d=parseFloat(_0x278a27['replace']('px',''));}return {'x':_0xf2cb7d,'y':_0xa7e0ae};}['mouseDownE'+'lement'](_0x51b819){this['selected']['ids']['indexOf'](_0x51b819['id'])===-1&&(this['selected']['ids']=[_0x51b819['id']],this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']());this['isInSelect'+'ed']=!![];if(this['lastClickT'+'ime']===-1)this['lastClickT'+'ime']=new Date()['getTime']();else {const _0x145034=new Date()['getTime']()-this['lastClickT'+'ime'];_0x145034>-1*-2374+-687*-9+-2794*0x3?this['lastClickT'+'ime']=new Date()['getTime']():(this['lastClickT'+'ime']=-1,this['selected']['ids']['indexOf'](_0x51b819['id'])>-1&&(this['selected']['ids']=[_0x51b819['id']],this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()));}const _0x3d6497=this['selected']['ids']['map'](_0x243a52=>{return {'id':_0x243a52,'type':this['registered'][_0x243a52]['type']};}),_0x36026e=new CustomEvent('onSelect',{'detail':_0x3d6497});this['dispatchEv'+'ent'](_0x36026e);}['mouseUpEle'+'ment'](_0x387efb){if(this['hasMoved']){this['lastClickT'+'ime']=-1,dragBeginPos={'x':-1,'y':-1},this['rDrags']['style']['visibility']='hidden',this['rDrags']['style']['translate']='-1px\x20-1px',this['rDrags']['style']['width']='0',this['rDrags']['style']['height']='0';if(this['mouseTarge'+'t']==='elements')for(let _0x3b3bb1 of this['selected']['ids']){this['registered'][_0x3b3bb1]['x']=_0x387efb[_0x3b3bb1]['x'],this['registered'][_0x3b3bb1]['y']=_0x387efb[_0x3b3bb1]['y'];}(this['mouseTarge'+'t']==='line'||this['mouseTarge'+'t']==='vector')&&(this['registered']=_0x47e8bb(_0x387efb),this['getSelecte'+'dParams']());const _0x332077=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor');_0x332077!==undefined&&_0x332077['forEach'](_0x54f572=>{_0x54f572['remove']();});const _0x528f5e=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e');_0x528f5e!==undefined&&_0x528f5e['forEach'](_0x6b8136=>{_0x6b8136['remove']();});}if(this['selected']['ids']['length']>0x1410+0x639*0x3+-9915)this['isToolbar']&&!(this['selected']['ids']['length']===-4*-448+0xa50+-4431*0x1&&!this['isMeasure'])&&(this['selected']['ids']['length']>-6517+-1713*0x3+0x2d89?this['elAligns']['style']['display']!=='inline-fle'+'x'&&(this['elAligns']['style']['display']='inline-fle'+'x'):this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='inline-fle'+'x'&&(this['elMeasure']['style']['display']='inline-fle'+'x')),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position'](),this['elToolbar']['style']['visibility']!=='visible'&&(this['elToolbar']['style']['visibility']='visible')),this['triggerSel'+'ectedLines'+'Vectors']('show');else {this['isToolbar']&&!(this['selected']['ids']['length']===0x115*-26+-151*-6+0x1*0x1899&&!this['isMeasure'])&&(this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='none'&&(this['elMeasure']['style']['display']='none')),this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x290e66=new CustomEvent('onSelect',{'detail':[]});this['dispatchEv'+'ent'](_0x290e66);}this['mouseMoveT'+'ype']='',this['isActions']&&this['triggerAct'+'ions']();}['setToolbar'+'Position'](){const _0x4b6e0c=window['getCompute'+'dStyle'](this['elToolbar']),_0x1a7856=parseFloat(_0x4b6e0c['width']['replace']('px',''));this['elToolbar']['style']['translate']=this['selected']['x']+this['selected']['width']/(-9956+-40*-226+-17*-54)-_0x1a7856/(-2*0xbd6+-2114+0x7*0x490)+'px\x20'+(this['selected']['y']-(0x1*0x143d+-23*0x69+-2724))+'px';}['triggerAct'+'ions'](){this['selected']['ids']['length']>-8199+0x64e+0x19b9?(this['elActions']['style']['translate']=this['selected']['x']+this['selected']['width']+(0xbc2+-5198+0x892)+'px\x20'+this['selected']['y']+'px',this['elActions']['style']['visibility']='visible',this['elActions']['style']['pointerEve'+'nts']='auto',this['elActions']['addEventLi'+'stener']('click',this['delete'])):(this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['style']['visibility']='hidden',this['elActions']['removeEven'+'tListener']('click',this['delete']));}['moveElemen'+'ts'](_0x253cc8,_0x95252c,_0x4a5328){const _0x46b418=_0x253cc8['x']-_0x95252c['x'],_0x141f9c=_0x253cc8['y']-_0x95252c['y'],_0x1eb8c3=_0x46b418+this['selected']['width'],_0x1522f9=_0x141f9c+this['selected']['height'],_0x1faa74=this['registered']['main']['x']+this['registered']['main']['width'],_0x43a642=this['registered']['main']['x']+this['registered']['main']['height'];this['selected']['x']=_0x46b418,this['selected']['y']=_0x141f9c;_0x46b418<=-3*0x96a+0x3*-713+0x2499&&(this['selected']['x']=-3223+0x1475+0x35*-38);_0x1eb8c3>=_0x1faa74&&(this['selected']['x']=_0x1faa74-this['selected']['width']);_0x141f9c<=0x47*-77+0x337*0x6+0x211*0x1&&(this['selected']['y']=-3883+0x114f+-548);_0x1522f9>=_0x43a642&&(this['selected']['y']=_0x43a642-this['selected']['height']);this['triggerSel'+'ectedLines'+'Vectors']('hide'),this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-1741*-1+-4764+0xbd1)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(-488*0x5+0x26c6+0xe9e*-2)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-5049+-2779*-1+0x4*0x238))+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x524+0x2388+-10410))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';for(let _0x3084a1 of this['selected']['ids']){this['selected']['ids']['length']===-7445+-14*0xff+0x2b08?(_0x4a5328[_0x3084a1]['x']=this['selected']['x'],_0x4a5328[_0x3084a1]['y']=this['selected']['y']):(_0x4a5328[_0x3084a1]['x']=this['registered'][_0x3084a1]['x']-this['latestSele'+'cted']['x']+this['selected']['x'],_0x4a5328[_0x3084a1]['y']=this['registered'][_0x3084a1]['y']-this['latestSele'+'cted']['y']+this['selected']['y']);_0x4a5328[_0x3084a1]['el']['style']['translate']=_0x4a5328[_0x3084a1]['x']+'px\x20'+_0x4a5328[_0x3084a1]['y']+'px';const _0x4fa1a1=new CustomEvent('onChange',{'detail':{'id':_0x3084a1,'type':'drag','x':_0x4a5328[_0x3084a1]['x'],'y':_0x4a5328[_0x3084a1]['y'],'width':_0x4a5328[_0x3084a1]['width'],'height':_0x4a5328[_0x3084a1]['height']}});this['dispatchEv'+'ent'](_0x4fa1a1);}}['moveLines'](_0x1ebfbd,_0x34293e,_0x17c70a,_0x4a7b0a,_0x133069){let _0xf97070=0x814+0x1015+-6185,_0x196bef=0x2135*0x1+0xe9+-8734,_0x3c1b39=0xd21*0x1+0x1961+-6*0x66b,_0x5e387e=0x12*-29+0x13a+0xd0;_0x196bef=_0x133069['y']-(_0x133069['y']-_0x17c70a['y']);const _0x708ab7=_0x133069['x']-_0x4a7b0a['x'],_0xed8e2=_0x133069['y']-_0x4a7b0a['y'],_0x5c3792=_0x708ab7/_0x17c70a['width'],_0x41f11f=_0xed8e2/_0x17c70a['height'];switch(_0x1ebfbd){case 'l':_0xf97070=_0x17c70a['x']+_0x708ab7,_0x3c1b39=_0x17c70a['x']-_0xf97070+_0x17c70a['width'],this['elSelected'+'Lines']['l']['style']['translate']=_0xf97070-(-451*-20+-7710+-218*0x6+0.5)+'px\x20'+_0x196bef+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x3c1b39+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0xf97070-(-25*-334+0x39*-82+-3674+0.5)+'px\x20'+(_0x196bef-(-294*0x3+-10*-131+-426+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x3c1b39+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0xf97070-(-155*0x9+-7*0xab+-2594*-1+0.5)+'px\x20'+(_0x196bef+_0x17c70a['height']-(0x51b*-1+-404*0x4+0xb6d*0x1+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0xf97070-(-3347+0x1*-7441+0x2a28*0x1)+'px\x20'+(_0x196bef-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0xf97070-(-30*-63+0x1*0x1ed7+-9781)+'px\x20'+(_0x196bef+_0x17c70a['height']-vectorOffset)+'px';for(const _0xd5f1ce of _0x17c70a['ids']){const _0x3242f2=this['registered'][_0xd5f1ce],_0x1afdee=_0x3242f2['width']*(0x1b0d+-5229+-15*0x71-_0x5c3792),_0x5c9318=_0x3242f2['x']+_0x708ab7*(-9893+-5257+0x3b2f-(_0x3242f2['x']-_0x17c70a['x'])/_0x17c70a['width']);_0x34293e[_0xd5f1ce]['x']=_0x5c9318,_0x34293e[_0xd5f1ce]['width']=_0x1afdee,_0x3242f2['el']['style']['width']=_0x1afdee+'px',_0x3242f2['el']['style']['translate']=_0x5c9318+'px\x20'+_0x3242f2['y']+'px';const _0x5a9a34=new CustomEvent('onChange',{'detail':{'id':_0xd5f1ce,'type':'resize_lef'+'t','x':_0x34293e[_0xd5f1ce]['x'],'y':_0x34293e[_0xd5f1ce]['y'],'width':_0x34293e[_0xd5f1ce]['width'],'height':_0x34293e[_0xd5f1ce]['height']}});this['dispatchEv'+'ent'](_0x5a9a34);}break;case 'r':_0xf97070=_0x17c70a['x']+_0x17c70a['width'];_0xf97070<=_0x17c70a['x']&&(_0xf97070=_0x17c70a['x']);_0x3c1b39=_0x17c70a['width']+_0x708ab7;_0x3c1b39<-7829*0x1+-8*0x19b+0x2b6d*0x1&&(_0x3c1b39=-15*0x15f+-1*0x61+0x14f2);this['elSelected'+'Lines']['r']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']+_0x708ab7-(-4050+-5306*-1+-1254+0.5)+'px\x20'+_0x196bef+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x17c70a['x']-(-1163*-1+-7799+0x19ee+0.5)+'px\x20'+(_0x196bef-(-8125+0x19*0x55+0x1772+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x3c1b39+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x17c70a['x']-(0x1fa5+0x19fe+-14753*0x1+0.5)+'px\x20'+(_0x17c70a['y']+_0x17c70a['height']-(-2499+0xc5*-7+-970*-4+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x3c1b39+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']+_0x708ab7-(-7871+0xd*0x301+0x84b*-1+0.5)+'px\x20'+(_0x17c70a['y']-(0x22b2+0x7f9+-10920+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']+_0x708ab7-(0xd*-3+-2317+0x151*0x7+0.5)+'px\x20'+(_0x17c70a['y']+_0x17c70a['height']-(0x2585+0x1893+0x1*-15893+0.5))+'px';for(const _0x1f07a3 of _0x17c70a['ids']){const _0x49fa89=this['registered'][_0x1f07a3],_0x4f2107=_0x49fa89['width']*(-1*0x88a+0xed1+-1*0x646+_0x5c3792),_0x116fc3=_0x49fa89['x']+_0x708ab7*((_0x49fa89['x']-_0x17c70a['x'])/_0x17c70a['width']);_0x34293e[_0x1f07a3]['width']=_0x4f2107,_0x34293e[_0x1f07a3]['x']=_0x116fc3,_0x49fa89['el']['style']['width']=_0x4f2107+'px',_0x49fa89['el']['style']['translate']=_0x116fc3+'px\x20'+_0x49fa89['y']+'px';const _0xe21ab9=new CustomEvent('onChange',{'detail':{'id':_0x1f07a3,'type':'resize_rig'+'ht','x':_0x34293e[_0x1f07a3]['x'],'y':_0x34293e[_0x1f07a3]['y'],'width':_0x34293e[_0x1f07a3]['width'],'height':_0x34293e[_0x1f07a3]['height']}});this['dispatchEv'+'ent'](_0xe21ab9);}break;case 't':_0xf97070=_0x17c70a['x'],_0x196bef=_0x17c70a['y']+_0xed8e2;let _0x5155e8=_0x17c70a['height']-_0xed8e2;_0x196bef>=_0x17c70a['y']+_0x17c70a['height']&&(_0x196bef=_0x17c70a['y']+_0x17c70a['height']);_0x5e387e<=-5557+0x2a7*0x3+0xdc0&&(_0x5e387e=-4*0x1b7+0xa1*0x2e+-5650);this['elSelected'+'Lines']['t']['style']['translate']=_0xf97070-(0x232+0x1f*-241+0x1aff+0.5)+'px\x20'+(_0x196bef-(0x23d3*-1+0x1cff*0x1+0x6d6+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0xf97070-(-4831+-1*-193+0x1220+0.5)+'px\x20'+(_0x196bef-(-325*-19+-380+-5793+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5155e8+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']-(0xe14+0x464+0x22*-139+0.5)+'px\x20'+(_0x196bef-(0x1385+-697+-1*0x10ca+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5155e8+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0xf97070-(0x25f8+-4129+0xb*-508+0.5)+'px\x20'+(_0x196bef-(0x1e93+0x7a4*0x3+0x4*-3423+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']-(0x47b*-8+-2606+0x2e09+0.5)+'px\x20'+(_0x196bef-(-8414+0x203*-17+0x24*0x1dd+0.5))+'px';for(const _0x6546e8 of _0x17c70a['ids']){const _0x148c90=this['registered'][_0x6546e8],_0x2bd165=_0x148c90['height']*(-7910+0x9ff*0x2+0xae9-_0x41f11f),_0x5518c6=_0x148c90['y']+_0xed8e2*(0xf7a*0x1+0x141*0x3+-4924-(_0x148c90['y']-_0x17c70a['y'])/_0x17c70a['height']);_0x148c90['el']['style']['height']=_0x2bd165+'px',_0x148c90['el']['style']['translate']=_0x148c90['x']+'px\x20'+_0x5518c6+'px',_0x34293e[_0x6546e8]['y']=_0x5518c6,_0x34293e[_0x6546e8]['height']=_0x2bd165;const _0xc06b8b=new CustomEvent('onChange',{'detail':{'id':_0x6546e8,'type':'resize_top','x':_0x34293e[_0x6546e8]['x'],'y':_0x34293e[_0x6546e8]['y'],'width':_0x34293e[_0x6546e8]['width'],'height':_0x34293e[_0x6546e8]['height']}});this['dispatchEv'+'ent'](_0xc06b8b);}break;case 'b':_0x196bef=_0x17c70a['y']+_0x17c70a['height'];_0x196bef<=_0x17c70a['y']&&(_0x196bef=_0x17c70a['y']);_0x5e387e=_0x17c70a['height']+_0xed8e2;_0x5e387e<-3*-243+0xd*-698+-1669*-5&&(_0x5e387e=-617*-5+0x1b9b+-36*0x11a);this['elSelected'+'Lines']['t']['style']['translate']=_0x17c70a['x']-(0x33*0x61+0x1674+0x1*-10693+0.5)+'px\x20'+(_0x17c70a['y']-(0x1c70+-614*-6+-3*0xe46+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x17c70a['x']-(0x2*-4673+0x5*0x515+-1*-2843+0.5)+'px\x20'+(_0x17c70a['y']-(0x1c3a*0x1+0x1*0x1cf9+-14641+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5e387e+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']-(0x795+-1*-5903+-3921*0x2+0.5)+'px\x20'+(_0x17c70a['y']-(-167*0x28+-2188+0x22a6+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5e387e+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x17c70a['x']+'px\x20'+(_0x196bef+_0xed8e2-(-6690+-9029+0x3d69+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x17c70a['x']-(-308*0x13+0x187a+-411+0.5)+'px\x20'+(_0x196bef+_0xed8e2-(-8586+0x359*0x5+-1*-4304+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x17c70a['x']+_0x17c70a['width']-(0xd5a+-21*0x123+0xa88+0.5)+'px\x20'+(_0x196bef+_0xed8e2-(-4872+-8242+0xd*0x3f1+0.5))+'px';for(const _0x4fb942 of _0x17c70a['ids']){const _0x1e7609=this['registered'][_0x4fb942],_0x31d7e3=_0x1e7609['height']*(-2*-9+0x3*-345+0x3fa+_0x41f11f),_0x258d63=_0x1e7609['y']+_0xed8e2*((_0x1e7609['y']-_0x17c70a['y'])/_0x17c70a['height']);_0x34293e[_0x4fb942]['height']=_0x31d7e3,_0x34293e[_0x4fb942]['y']=_0x258d63,_0x1e7609['el']['style']['height']=_0x31d7e3+'px',_0x1e7609['el']['style']['translate']=_0x1e7609['x']+'px\x20'+_0x258d63+'px';const _0x92d243=new CustomEvent('onChange',{'detail':{'id':_0x4fb942,'type':'resize_bot'+'tom','x':_0x34293e[_0x4fb942]['x'],'y':_0x34293e[_0x4fb942]['y'],'width':_0x34293e[_0x4fb942]['width'],'height':_0x34293e[_0x4fb942]['height']}});this['dispatchEv'+'ent'](_0x92d243);}break;}}['moveVector'+'s'](_0x582222,_0xf2d235,_0x59cc51,_0xf0ce4a,_0x338408,_0x568232){let _0x126131=-54*0x1+-2*-1171+-208*0xb,_0x486f3c=-9342+-1481+0x2a47;const _0x500062=_0x338408['x']-_0xf0ce4a['x'],_0x3ed168=_0x500062/_0x568232,_0x464c49=_0x500062/_0x59cc51['width'];let _0x489a21=0x1*-7778+-9078+0x41d8;switch(_0x582222){case 'tl':_0x126131=_0x59cc51['x']+_0x500062,_0x486f3c=_0x59cc51['y']+_0x3ed168,this['elSelected'+'Vectors']['tl']['style']['translate']=_0x126131-(0x470+0x13c9+0x409*-6+0.5)+'px\x20'+(_0x486f3c-(-506*0xd+0xdd8+0x1*0xbdd+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x59cc51['x']+_0x59cc51['width']-(-1*0x704+-566+0x93d+0.5)+'px\x20'+(_0x486f3c-(0x14fa+0x2435+0x1*-14636+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x126131-(-5057+0x1*0x18a0+0x26e*-2+0.5)+'px\x20'+(_0x59cc51['y']+_0x59cc51['height']-(-2497+-5314+-2*-3907+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x126131-(0x218*-2+-1*-8327+-7253+0.5)+'px\x20'+(_0x486f3c-(0x9*0x28e+-344*0x1+-1385*0x4+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x59cc51['width']-_0x500062+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x126131-(0x2dd*-9+-1*-1201+0x2*0xa8b+0.5)+'px\x20'+(_0x59cc51['y']+_0x59cc51['height']-(-69*0xd+0x648*0x2+-2317+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x59cc51['width']-_0x500062+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x126131-(0x1*-2162+0x542+0x332+0.5)+'px\x20'+(_0x486f3c-(0x3*0x6a3+0xf0b+-8946+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x59cc51['height']-_0x3ed168+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x59cc51['x']+_0x59cc51['width']-(0x1*0x2c5+0x5*-1511+0x1ac0+0.5)+'px\x20'+(_0x486f3c-(0x5*0xe3+-2555+0x58e+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x59cc51['height']-_0x3ed168+'px';for(const _0x3d5949 of _0x59cc51['ids']){const _0x4bf405=this['registered'][_0x3d5949],_0xed6fcf=_0x4bf405['width']*(0x602+-37*-11+-216*0x9-_0x464c49),_0x54390c=_0x4bf405['x']+_0x500062*(0x3*0xb1e+0xbaa+-11523-(_0x4bf405['x']-_0x59cc51['x'])/_0x59cc51['width']),_0x462d54=_0x4bf405['height']*(-8801+0x329*-12+0x5*0xe76-_0x464c49),_0x5037ea=_0x4bf405['y']+_0x3ed168*(-4477+-2675+0x1bf1-(_0x4bf405['y']-_0x59cc51['y'])/_0x59cc51['height']);_0x4bf405['el']['style']['translate']=_0x54390c+'px\x20'+_0x5037ea+'px',_0x4bf405['el']['style']['width']=_0xed6fcf+'px',_0x4bf405['el']['style']['height']=_0x462d54+'px',_0xf2d235[_0x3d5949]['x']=_0x54390c,_0xf2d235[_0x3d5949]['width']=_0xed6fcf,_0xf2d235[_0x3d5949]['y']=_0x5037ea,_0xf2d235[_0x3d5949]['height']=_0x462d54;const _0x177124=new CustomEvent('onChange',{'detail':{'id':_0x3d5949,'type':'resize_top'+'-left','x':_0xf2d235[_0x3d5949]['x'],'y':_0xf2d235[_0x3d5949]['y'],'width':_0xf2d235[_0x3d5949]['width'],'height':_0xf2d235[_0x3d5949]['height']}});this['dispatchEv'+'ent'](_0x177124);}break;case 'tr':_0x489a21=_0x59cc51['width']+_0x500062,_0x126131=_0x59cc51['x']+_0x489a21,_0x486f3c=_0x59cc51['y']-_0x3ed168,this['elSelected'+'Vectors']['tr']['style']['translate']=_0x126131-(-9166+0x844+0x1b8d*0x1+0.5)+'px\x20'+(_0x486f3c-(0x3e7*-1+-549+0x60f+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x59cc51['x']-(0x503+0x53d+-2621+0.5)+'px\x20'+(_0x486f3c-(0x28*0x3f+0x1c71+0xd5*-46+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x126131-(-4*0xc0+0xcae+-2475+0.5)+'px\x20'+(_0x59cc51['y']+_0x59cc51['height']-(-563+0x1a6a+0xc1a*-2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x59cc51['x']-(0x673*0x6+0x15ee+0x1e4f*-2+0.5)+'px\x20'+(_0x486f3c-(-17*-223+-2471*-1+-1565*0x4+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x489a21+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x59cc51['x']-(0x1e9a+-3*0x577+0xe33*-1+0.5)+'px\x20'+(_0x59cc51['y']+_0x59cc51['height']-(-1*0x2629+-9604+-25*-775+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x489a21+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x59cc51['x']-(-151*-57+0x687*0x1+-10276+0.5)+'px\x20'+(_0x486f3c-(-8923*0x1+-9*0x26d+0x38b2+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x59cc51['height']+_0x3ed168+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x59cc51['x']+_0x489a21-(0x107d+-989+-3230+0.5)+'px\x20'+(_0x486f3c-(0x1*-3947+0x8d0*-2+-8461*-1+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x59cc51['height']+_0x3ed168+'px';for(const _0x413500 of _0x59cc51['ids']){const _0x3c6b2e=this['registered'][_0x413500],_0x1091b2=_0x3c6b2e['width']*(0x15cf+0x1*0x1b34+0x99*-82+_0x464c49),_0x45b9b0=_0x3c6b2e['x']+_0x500062*((_0x3c6b2e['x']-_0x59cc51['x'])/_0x59cc51['width']),_0x4fc755=_0x3c6b2e['height']*(0x9bd+-2*0xe1a+0x1278+_0x464c49),_0x1cfe99=_0x3c6b2e['y']-_0x3ed168*(-1191*0x1+-3*-2571+0x1979*-1-(_0x3c6b2e['y']-_0x59cc51['y'])/_0x59cc51['height']);_0x3c6b2e['el']['style']['translate']=_0x45b9b0+'px\x20'+_0x1cfe99+'px',_0x3c6b2e['el']['style']['width']=_0x1091b2+'px',_0x3c6b2e['el']['style']['height']=_0x4fc755+'px',_0xf2d235[_0x413500]['x']=_0x45b9b0,_0xf2d235[_0x413500]['width']=_0x1091b2,_0xf2d235[_0x413500]['y']=_0x1cfe99,_0xf2d235[_0x413500]['height']=_0x4fc755;const _0x1f9bf9=new CustomEvent('onChange',{'detail':{'id':_0x413500,'type':'resize_top'+'-right','x':_0xf2d235[_0x413500]['x'],'y':_0xf2d235[_0x413500]['y'],'width':_0xf2d235[_0x413500]['width'],'height':_0xf2d235[_0x413500]['height']}});this['dispatchEv'+'ent'](_0x1f9bf9);}break;case 'bl':_0x126131=_0x59cc51['x']+_0x500062,_0x486f3c=_0x59cc51['y']+_0x59cc51['height']-_0x3ed168,this['elSelected'+'Vectors']['bl']['style']['translate']=_0x126131-(-1*0xb74+0x1793+-3100+0.5)+'px\x20'+(_0x486f3c-(-776*0xa+0x4*-1805+0x3a87+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x126131-(-558*0x1+-1309+-11*-170+0.5)+'px\x20'+(_0x59cc51['y']-(0x2c2*-1+-4735+-2722*-2+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x59cc51['x']+_0x59cc51['width']-(-163*0x27+-2251+-1*-8611+0.5)+'px\x20'+(_0x486f3c-(0x200d*-1+0x26f3+-41*0x2b+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x126131-(-1911*-1+0x60c+-3457+0.5)+'px\x20'+(_0x59cc51['y']-(-3666+0xa50+0x404+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x59cc51['width']-_0x500062+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x126131-(-13*0x41+0xb0a+0x7bb*-1+0.5)+'px\x20'+(_0x486f3c-(0x1*0x1a67+0x5*-1249+-4*0x80+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x59cc51['width']-_0x500062+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x126131-(-11*0x1a3+-219*0x25+0x31aa+0.5)+'px\x20'+(_0x59cc51['y']-(0x99*0x1e+0x97c*-1+-2160+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x59cc51['height']-_0x3ed168+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x59cc51['x']+_0x59cc51['width']-(0x65*0x15+-1*0x2f9+-1358+0.5)+'px\x20'+(_0x59cc51['y']-(-1*-2677+0x1083+-6902+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x59cc51['height']-_0x3ed168+'px';for(const _0x4ec036 of _0x59cc51['ids']){const _0x52fb06=this['registered'][_0x4ec036],_0x16ed30=_0x52fb06['width']*(0x1*-8429+-1*0x1c23+0x3d11-_0x464c49),_0x2bd31b=_0x52fb06['x']+_0x500062*(0x1*0x2692+-6202+-3671-(_0x52fb06['x']-_0x59cc51['x'])/_0x59cc51['width']),_0x2d4c5b=_0x52fb06['height']*(0x6e*-69+0x8bd*-1+0x2664-_0x464c49),_0x2a9fce=_0x52fb06['y']+_0x3ed168*((_0x59cc51['y']-_0x52fb06['y'])/_0x59cc51['height']);_0x52fb06['el']['style']['translate']=_0x2bd31b+'px\x20'+_0x2a9fce+'px',_0x52fb06['el']['style']['width']=_0x16ed30+'px',_0x52fb06['el']['style']['height']=_0x2d4c5b+'px',_0xf2d235[_0x4ec036]['x']=_0x2bd31b,_0xf2d235[_0x4ec036]['width']=_0x16ed30,_0xf2d235[_0x4ec036]['y']=_0x2a9fce,_0xf2d235[_0x4ec036]['height']=_0x2d4c5b;const _0x4a1398=new CustomEvent('onChange',{'detail':{'id':_0x4ec036,'type':'resize_bot'+'tom-left','x':_0xf2d235[_0x4ec036]['x'],'y':_0xf2d235[_0x4ec036]['y'],'width':_0xf2d235[_0x4ec036]['width'],'height':_0xf2d235[_0x4ec036]['height']}});this['dispatchEv'+'ent'](_0x4a1398);}break;case 'br':_0x489a21=_0x59cc51['width']+_0x500062,_0x126131=_0x59cc51['x']+_0x489a21,_0x486f3c=_0x59cc51['y']+_0x59cc51['height']+_0x3ed168,this['elSelected'+'Vectors']['br']['style']['translate']=_0x126131-(-3527+-4133+0x1*0x1def+0.5)+'px\x20'+(_0x486f3c-(0x9*-181+0x175c+-4348+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x59cc51['x']+_0x59cc51['width']+_0x500062-(0x1*-8893+-2491+-193*-59+0.5)+'px\x20'+(_0x59cc51['y']-(-939+-9754+-14*-764+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x59cc51['x']-(0xacc+0xb*0x356+-12155+0.5)+'px\x20'+(_0x486f3c-(-13*-397+-2172*-1+-7330+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x59cc51['x']-(-3282+0x1*-1077+0x1*0x1109+0.5)+'px\x20'+(_0x59cc51['y']-(-3049+-7668+0x29df+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x489a21+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x59cc51['x']-(0x3fe*-2+0x2601+0x27*-197+0.5)+'px\x20'+(_0x486f3c-(0x1f22+-2*-122+-8212+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x489a21+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x59cc51['x']-(0x1*-3444+0x198c+-3094+0.5)+'px\x20'+(_0x59cc51['y']-(-4769+-8765*0x1+-48*-282+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x59cc51['height']+_0x3ed168+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x59cc51['x']+_0x489a21-(0x1e1f+0x7ff+-9756+0.5)+'px\x20'+(_0x59cc51['y']-(-5804+0x2b*0xbe+0x93c*-1+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x59cc51['height']+_0x3ed168+'px';for(const _0x1a17c1 of _0x59cc51['ids']){const _0x4bde2d=this['registered'][_0x1a17c1],_0x152b3c=_0x4bde2d['width']*(-1093+0x1*0x1cb7+0x1*-6257+_0x464c49),_0xd98796=_0x4bde2d['x']+_0x500062*((_0x4bde2d['x']-_0x59cc51['x'])/_0x59cc51['width']),_0x5e863b=_0x4bde2d['height']*(0x1*0x26f5+-897*-2+-11766+_0x464c49),_0xfa5393=_0x4bde2d['y']+_0x3ed168*((_0x4bde2d['y']-_0x59cc51['y'])/_0x59cc51['height']);_0x4bde2d['el']['style']['translate']=_0xd98796+'px\x20'+_0xfa5393+'px',_0x4bde2d['el']['style']['width']=_0x152b3c+'px',_0x4bde2d['el']['style']['height']=_0x5e863b+'px',_0xf2d235[_0x1a17c1]['x']=_0xd98796,_0xf2d235[_0x1a17c1]['width']=_0x152b3c,_0xf2d235[_0x1a17c1]['y']=_0xfa5393,_0xf2d235[_0x1a17c1]['height']=_0x5e863b;const _0x401cfa=new CustomEvent('onChange',{'detail':{'id':_0x1a17c1,'type':'resize_bot'+'tom-right','x':_0xf2d235[_0x1a17c1]['x'],'y':_0xf2d235[_0x1a17c1]['y'],'width':_0xf2d235[_0x1a17c1]['width'],'height':_0xf2d235[_0x1a17c1]['height']}});this['dispatchEv'+'ent'](_0x401cfa);}break;}}['referenceA'+'lignLinesV'+'ectors'](_0x5e4e6e,_0x3c070a){let _0x3fe9dd='',_0x16b55d;for(let _0xbc974d in _0x5e4e6e){if(this['selected']['ids']['indexOf'](_0xbc974d)>-1)continue;let _0x129191={'x':0x0,'y':0x0};_0x16b55d='';if(Math['abs'](this['selected']['x']+this['selected']['width']-_0x5e4e6e[_0xbc974d]['x'])<=this['thresholdH'+'orizontal'])_0x16b55d='end',_0x129191['x']=this['selected']['x']+this['selected']['width']-_0x5e4e6e[_0xbc974d]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']/(-3166+0xd94+-11*0x1c)))<=this['thresholdH'+'orizontal'])_0x16b55d='end',_0x129191['x']=this['selected']['x']+this['selected']['width']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']/(-4397+-8136+-12535*-1));else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']))<=this['thresholdH'+'orizontal'])_0x16b55d='end',_0x129191['x']=this['selected']['x']+this['selected']['width']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']);else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x6*0xb9+-1474+0x16e*0x1)-_0x5e4e6e[_0xbc974d]['x'])<=this['thresholdH'+'orizontal'])_0x16b55d='middle',_0x129191['x']=this['selected']['x']+this['selected']['width']/(-2*0x371+-2303+-1*-4067)-_0x5e4e6e[_0xbc974d]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x1*-7279+0x214b+-1*0x4da)-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']/(0x1*-6476+0x87b+0x10d3)))<=this['thresholdH'+'orizontal'])_0x16b55d='middle',_0x129191['x']=this['selected']['x']+this['selected']['width']/(0x1a57*-1+-65*-127+-1510)-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']/(-7230+-7507+0x3993));else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x11*0x173+0x69+-6410)-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']))<=this['thresholdH'+'orizontal'])_0x16b55d='middle',_0x129191['x']=this['selected']['x']+this['selected']['width']/(-69*0x3c+-33*0x1b+0x13a9)-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']);else {if(Math['abs'](this['selected']['x']-_0x5e4e6e[_0xbc974d]['x'])<=this['thresholdH'+'orizontal'])_0x16b55d='begin',_0x129191['x']=this['selected']['x']-_0x5e4e6e[_0xbc974d]['x'];else {if(Math['abs'](this['selected']['x']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']/(-1*-5524+-2503+-1*0xbcb)))<=this['thresholdH'+'orizontal'])_0x16b55d='begin',_0x129191['x']=this['selected']['x']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']/(-2958+0x990*-4+0x31d0));else Math['abs'](this['selected']['x']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']))<=this['thresholdH'+'orizontal']&&(_0x16b55d='begin',_0x129191['x']=this['selected']['x']-(_0x5e4e6e[_0xbc974d]['x']+_0x5e4e6e[_0xbc974d]['width']));}}}}}}}_0x16b55d!==''?(_0x3fe9dd=_0x16b55d,this['snap']('horizontal',_0x129191,_0x5e4e6e),setTimeout(()=>{this['thresholdH'+'orizontal']=0x593+-1307*0x3+0x60*0x1a;},-7619+-2*0x35b+0x2541)):this['thresholdH'+'orizontal']===0x1*0x1db8+0x827+-9693&&(this['thresholdH'+'orizontal']=-8705+0x252b+-805);}const _0x12b101=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-horizo'+'ntal');_0x12b101!==undefined&&_0x12b101['forEach'](_0x517e77=>{_0x517e77['remove']();});const _0x4d2168=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-horizont'+'al');_0x4d2168!==undefined&&_0x4d2168['forEach'](_0x1900c1=>{_0x1900c1['remove']();});_0x3fe9dd!==''&&(this['triggerAli'+'gnVectors']('horizontal',_0x3fe9dd,_0x5e4e6e),this['triggerAli'+'gnLines'](_0x5e4e6e));_0x3fe9dd='';for(let _0x2fdcec in _0x5e4e6e){if(this['selected']['ids']['indexOf'](_0x2fdcec)>-1)continue;let _0x538ef3={'x':0x0,'y':0x0};_0x16b55d='';if(Math['abs'](this['selected']['y']+this['selected']['height']-_0x5e4e6e[_0x2fdcec]['y'])<=this['thresholdV'+'ertical'])_0x16b55d='end',_0x538ef3['y']=this['selected']['y']+this['selected']['height']-_0x5e4e6e[_0x2fdcec]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']/(0x1c38+-3101+-317*0xd)))<=this['thresholdV'+'ertical'])_0x16b55d='end',_0x538ef3['y']=this['selected']['y']+this['selected']['height']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']/(0x2*-923+-6*-47+0x105*0x6));else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']))<=this['thresholdV'+'ertical'])_0x16b55d='end',_0x538ef3['y']=this['selected']['y']+this['selected']['height']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']);else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(-3769+0x239f+-5348)-_0x5e4e6e[_0x2fdcec]['y'])<=this['thresholdV'+'ertical'])_0x16b55d='middle',_0x538ef3['y']=this['selected']['y']+this['selected']['height']/(-328+0x1ed6+-62*0x7a)-_0x5e4e6e[_0x2fdcec]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(-4*-1511+0x16b5+-1*0x2e4f)-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']/(-3163*0x2+0x5d1+0x12e7)))<=this['thresholdV'+'ertical'])_0x16b55d='middle',_0x538ef3['y']=this['selected']['y']+this['selected']['height']/(0x4*-1699+-7127+0x3665)-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']/(0x1*0xb5+-5396+-1*-5217));else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*0x152+-1465*-3+0x39*-83)-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']))<=this['thresholdV'+'ertical'])_0x16b55d='middle',_0x538ef3['y']=this['selected']['y']+this['selected']['height']/(-87*0x9+-839*-8+0x1*-5927)-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']);else {if(Math['abs'](this['selected']['y']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']))<=this['thresholdV'+'ertical'])_0x16b55d='begin',_0x538ef3['y']=this['selected']['y']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']);else {if(Math['abs'](this['selected']['y']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']/(-5781*-1+-57*0x49+-2*0x329)))<=this['thresholdV'+'ertical'])_0x16b55d='begin',_0x538ef3['y']=this['selected']['y']-(_0x5e4e6e[_0x2fdcec]['y']+_0x5e4e6e[_0x2fdcec]['height']/(0x4*0xf7+0x25de+-10680));else Math['abs'](this['selected']['y']-_0x5e4e6e[_0x2fdcec]['y'])<=this['thresholdV'+'ertical']&&(_0x16b55d='begin',_0x538ef3['y']=this['selected']['y']-_0x5e4e6e[_0x2fdcec]['y']);}}}}}}}_0x16b55d!==''?(_0x3fe9dd=_0x16b55d,this['snap']('vertical',_0x538ef3,_0x5e4e6e),setTimeout(()=>{this['thresholdH'+'orizontal']=0x1*0x2333+-2*-4977+-7*0xa95;},-7387+0x321*-2+0x23e5)):this['thresholdV'+'ertical']===-6*-974+0x1*-3814+-2028&&(this['thresholdV'+'ertical']=0xdbb*-2+0x1286+0x8f5);}const _0x58819e=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-vertic'+'al');_0x58819e!==undefined&&_0x58819e['forEach'](_0x1e38c9=>{_0x1e38c9['remove']();});const _0x945f11=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-vertical');_0x945f11!==undefined&&_0x945f11['forEach'](_0xc03060=>{_0xc03060['remove']();}),_0x3fe9dd!==''&&(this['triggerAli'+'gnVectors']('vertical',_0x3fe9dd,_0x5e4e6e),this['triggerAli'+'gnLines'](_0x5e4e6e));}['snap'](_0x3f7979,_0x165fbb,_0xe3da98){let _0x46de2b={'x':0x0,'y':0x0};if(_0x3f7979==='horizontal'){this['selected']['x']=this['selected']['x']-_0x165fbb['x'];for(const _0x399cbd of this['selected']['ids']){const _0x440c08=this['getElement'+'TranslateP'+'os'](_0xe3da98[_0x399cbd]['el']),_0x28939c=_0x440c08['x']-_0x165fbb['x'],_0x5d473a=_0x440c08['y'];_0xe3da98[_0x399cbd]['el']['style']['translate']=_0x28939c+'px\x20'+_0x5d473a+'px',_0xe3da98[_0x399cbd]['x']=_0x28939c;}_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x46de2b['x']-_0x165fbb['x']+'px\x20'+_0x46de2b['y']+'px';}else {this['selected']['y']=this['selected']['y']-_0x165fbb['y'];for(const _0xd7a2cc of this['selected']['ids']){const _0xb8390d=this['getElement'+'TranslateP'+'os'](_0xe3da98[_0xd7a2cc]['el']),_0x863a34=_0xb8390d['x'],_0x3a377b=_0xb8390d['y']-_0x165fbb['y'];_0xe3da98[_0xd7a2cc]['el']['style']['translate']=_0x863a34+'px\x20'+_0x3a377b+'px',_0xe3da98[_0xd7a2cc]['y']=_0x3a377b;}_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px',_0x46de2b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x46de2b['x']+'px\x20'+(_0x46de2b['y']-_0x165fbb['y'])+'px';}}['getElement'+'TranslateP'+'os'](_0x45b342){let _0x14e894={'x':0x0,'y':0x0};if(_0x45b342['style']['translate']['indexOf']('\x20')>-1){const _0x479480=_0x45b342['style']['translate']['split']('\x20');_0x14e894['x']=parseFloat(_0x479480[0x2*0xbf+0x232f*0x1+-9389]['replace']('px','')),_0x14e894['y']=parseFloat(_0x479480[-1*0x4e4+0x127f+-1*0xd9a]['replace']('px',''));}else _0x14e894['x']=parseFloat(_0x45b342['style']['translate']);return _0x14e894;}['generateAl'+'ignVector'](_0x2f6fa2,_0x208929,_0xbb03d0){const _0x17c560=document['createElem'+'ent']('div');_0x17c560['innerHTML']='\x0a\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20fill=\x22'+colors['red']+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20v'+'iewBox=\x220\x20'+'0\x2024\x2024\x22\x20\x0a'+'\x20\x20\x20\x20\x20\x20stro'+'ke-width=\x22'+'1.5\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20stroke=\x22'+'currentCol'+'or\x22\x20\x0a\x20\x20\x20\x20\x20'+'\x20class=\x22si'+'ze-6\x22\x20\x0a\x20\x20\x20'+'\x20\x20\x20width=\x22')+vectorSize*(-2372*-4+-3391*-1+-12877)+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20w'+'idth=\x22')+vectorSize*(0x75*-21+0x1564+0x1af*-7)+('\x22\x0a\x20\x20\x20\x20>\x0a\x20\x20'+'\x20\x20\x20\x20<path\x20'+'stroke-lin'+'ecap=\x22roun'+'d\x22\x20stroke-'+'linejoin=\x22'+'round\x22\x20d=\x22'+'M6\x2018\x2018\x206'+'M6\x206l12\x2012'+'\x22\x20/>\x0a\x20\x20\x20\x20<'+'/svg>'),_0x17c560['classList']['add']('align-vect'+'or'),_0x17c560['classList']['add']('align-vect'+'or-'+_0x2f6fa2),_0x17c560['classList']['add']('align-vect'+'or-'+_0x2f6fa2+'-'+_0x208929),_0x17c560['style']['position']='absolute',_0x17c560['style']['left']=_0xbb03d0['x']+'px',_0x17c560['style']['top']=_0xbb03d0['y']+'px',this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x17c560);}['triggerAli'+'gnVectors'](_0x45f2d3,_0x406f58,_0x5f9d38){let _0x37ba44={'hBegin':![],'hMiddle':![],'hEnd':![],'vBegin':![],'vMiddle':![],'vEnd':![]};for(let _0x17d93f in _0x5f9d38){Math['abs'](this['selected']['x']-_0x5f9d38[_0x17d93f]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hBegin']&&(_0x37ba44['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(-40*-145+-6600+0x322)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(0x265f+0xdc1+-7*0x772)-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(0x5*0x13+-8545+0x2104)-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hBegin']&&(_0x37ba44['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hBegin']&&(_0x37ba44['hBegin']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x1*-1943+-266*-1+0x68f)-_0x5f9d38[_0x17d93f]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hMiddle']&&(_0x37ba44['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-799*0x1+0x1838+0x1*-5399)-(_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(0x4ef*-3+-6676+0x28e3)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(-7602+0x127d*-2+-3414*-5)-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(-5*0x245+0x15*0x8a+0x9)-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hMiddle']&&(_0x37ba44['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-5914+-13*0x2e7+0x3cd7)-(_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hMiddle']&&(_0x37ba44['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-_0x5f9d38[_0x17d93f]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hEnd']&&(_0x37ba44['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(-4194+0x1*-4481+0x21e5)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(-5474+-3028+0x2138)-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']/(0x1e5*-13+-1013*-1+0x14ae)-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hEnd']&&(_0x37ba44['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['hEnd']&&(_0x37ba44['hEnd']=!![])),Math['abs'](this['selected']['y']-_0x5f9d38[_0x17d93f]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),!_0x37ba44['vBegin']&&(_0x37ba44['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(-29*-109+0x5*-164+-2339)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(0x226c+-5682+-3128)-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(-222*0x3+-711+0x563)-vectorSize}),!_0x37ba44['vBegin']&&(_0x37ba44['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['vBegin']&&(_0x37ba44['vBegin']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-1397+0x1714+-3*0x5df)-_0x5f9d38[_0x17d93f]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),!_0x37ba44['vMiddle']&&(_0x37ba44['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x23ee+0x923*-3+-2179)-(_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(0x1ab0+-6678+-152)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(0x2035+-23*-414+-17765)-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(0x14c*-21+-3049*0x1+0x2727)-vectorSize}),!_0x37ba44['vMiddle']&&(_0x37ba44['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-8279+0x1460+0xbf9)-(_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['vMiddle']&&(_0x37ba44['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-_0x5f9d38[_0x17d93f]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']-vectorSize}),!_0x37ba44['vEnd']&&(_0x37ba44['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(0x1*-9421+-4998+0x3855)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(-9975+-5670+-15647*-1)-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']/(0x17b9+0x16fa+-11953)-vectorSize}),!_0x37ba44['vEnd']&&(_0x37ba44['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x5f9d38[_0x17d93f]['id'])===-1&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':_0x5f9d38[_0x17d93f]['x']+_0x5f9d38[_0x17d93f]['width']-vectorSize,'y':_0x5f9d38[_0x17d93f]['y']+_0x5f9d38[_0x17d93f]['height']-vectorSize}),!_0x37ba44['vEnd']&&(_0x37ba44['vEnd']=!![]));}_0x37ba44['hBegin']&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x37ba44['hMiddle']&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']/(-7987+0x2ed*-5+0x16eb*0x2)-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']/(-8687+-8167*-1+0x20a)-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x37ba44['hEnd']&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x37ba44['vBegin']&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize})),_0x37ba44['vMiddle']&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(0x5*0x43f+-3585+-1848)-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(0x21d7+-3*-353+-9720)-vectorSize})),_0x37ba44['vEnd']&&(this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}),this['generateAl'+'ignVector'](_0x45f2d3,_0x406f58,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}));}['generateAl'+'ignLine'](_0x303f39){const {direction:_0x1da342,position:_0x1cf64b,begin:_0x44ffe1,end:_0x1ed3c5}=_0x303f39,_0x535cbb=document['createElem'+'ent']('div');_0x535cbb['classList']['add']('align-line'),_0x535cbb['classList']['add']('align-line'+'-'+_0x1da342),_0x535cbb['classList']['add']('align-line'+'-'+_0x1da342+'-'+_0x1cf64b),_0x535cbb['style']['position']='absolute',_0x535cbb['style']['left']=_0x44ffe1['x']+'px',_0x535cbb['style']['top']=_0x44ffe1['y']+'px',_0x1da342==='horizontal'?(_0x535cbb['style']['width']='1px',_0x535cbb['style']['height']=_0x1ed3c5['y']-_0x44ffe1['y']+'px'):(_0x535cbb['style']['width']=_0x1ed3c5['x']-_0x44ffe1['x']+'px',_0x535cbb['style']['height']='1px'),this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x535cbb);}['generateLi'+'ne'](_0xc4ae48,_0x540770){const {direction:_0x1d872d,begin:_0x56e4b2,end:_0x17992f}=_0xc4ae48,_0x5b00dc=document['createElem'+'ent']('div');if(_0x540770['length']>0xf94+-1302+-2686)for(const _0x15cfd7 of _0x540770){_0x5b00dc['classList']['add'](_0x15cfd7);}return _0x5b00dc['style']['position']='absolute',_0x5b00dc['style']['left']=_0x56e4b2['x']+'px',_0x5b00dc['style']['top']=_0x56e4b2['y']+'px',_0x1d872d==='horizontal'?_0x5b00dc['style']['width']=_0x17992f['x']-_0x56e4b2['x']+'px':_0x5b00dc['style']['height']=_0x17992f['y']-_0x56e4b2['y']+'px',_0x5b00dc;}['triggerAli'+'gnLines'](_0x4df7a6){const _0x434107={'direction':'horizontal','position':'begin','begin':{'x':this['selected']['x'],'y':this['selected']['y']},'end':{'x':this['selected']['x'],'y':this['selected']['y']}},_0x4f350a=(_0x47358b,_0x5d9711,_0x17de9e)=>{return _0x47358b===undefined?(_0x47358b=_0x47e8bb(_0x434107),_0x47358b['end']['y']=_0x47358b['end']['y']+this['selected']['height'],_0x47358b['begin']['x']=_0x47358b['begin']['x']+_0x17de9e,_0x47358b['end']['x']=_0x47358b['begin']['x']+_0x17de9e,_0x5d9711['y']<_0x47358b['begin']['y']&&(_0x47358b['begin']['y']=_0x5d9711['y']),_0x5d9711['y']+_0x5d9711['height']>_0x47358b['end']['y']&&(_0x47358b['end']['y']=_0x5d9711['y']+_0x5d9711['height'])):(_0x5d9711['y']<_0x47358b['begin']['y']&&(_0x47358b['begin']['y']=_0x5d9711['y']),_0x5d9711['y']+_0x5d9711['height']>_0x47358b['end']['y']&&(_0x47358b['end']['y']=_0x5d9711['y']+_0x5d9711['height'])),_0x47358b;},_0x3a1143=(_0x7de3c5,_0x41061d,_0x25b653)=>{return _0x7de3c5===undefined?(_0x7de3c5=_0x47e8bb(_0x434107),_0x7de3c5['direction']='vertical',_0x7de3c5['end']['x']=_0x7de3c5['end']['x']+this['selected']['width'],_0x7de3c5['begin']['y']=_0x7de3c5['begin']['y']+_0x25b653,_0x7de3c5['end']['y']=_0x7de3c5['end']['y']+_0x25b653,_0x41061d['x']<_0x7de3c5['begin']['x']&&(_0x7de3c5['begin']['x']=_0x41061d['x']),_0x41061d['x']+_0x41061d['width']>_0x7de3c5['end']['x']&&(_0x7de3c5['end']['x']=_0x41061d['x']+_0x41061d['width'])):(_0x41061d['x']<_0x7de3c5['begin']['x']&&(_0x7de3c5['begin']['x']=_0x41061d['x']),_0x41061d['x']+_0x41061d['width']>_0x7de3c5['end']['x']&&(_0x7de3c5['end']['x']=_0x41061d['x']+_0x41061d['width'])),_0x7de3c5;},_0x3cc57f=[];for(let _0x3e341c in _0x4df7a6){(this['selected']['x']===_0x4df7a6[_0x3e341c]['x']||this['selected']['x']===_0x4df7a6[_0x3e341c]['x']+_0x4df7a6[_0x3e341c]['width']/(-778*0x8+0x10*0x182+0x32)||this['selected']['x']===_0x4df7a6[_0x3e341c]['x']+_0x4df7a6[_0x3e341c]['width'])&&this['selected']['ids']['indexOf'](_0x4df7a6[_0x3e341c]['id'])===-1&&(_0x3cc57f[-9690+0x22b7*0x1+0xb*0x49]=_0x4f350a(_0x3cc57f[0x9*0x38c+-3602+-4570],_0x4df7a6[_0x3e341c],0x20b8+-2607*0x2+0x2*-1581)),(this['selected']['x']+this['selected']['width']/(0x1252+0x2226+-34*0x18b)===_0x4df7a6[_0x3e341c]['x']||this['selected']['x']+this['selected']['width']/(0xf66+0x54*0x6d+0x4*-3274)===_0x4df7a6[_0x3e341c]['x']+_0x4df7a6[_0x3e341c]['width']/(-2*0xe35+-1*-3274+-2*-2001)||this['selected']['x']+this['selected']['width']/(0x1a93+-3047+-3754)===_0x4df7a6[_0x3e341c]['x']+_0x4df7a6[_0x3e341c]['width'])&&this['selected']['ids']['indexOf'](_0x4df7a6[_0x3e341c]['id'])===-1&&(_0x3cc57f[0xd*0x14d+-347*-3+-5369]=_0x4f350a(_0x3cc57f[0x10af+0x260e+0x4*-3503],_0x4df7a6[_0x3e341c],this['selected']['width']/(0xc*0x125+-3049+-465))),(this['selected']['x']+this['selected']['width']===_0x4df7a6[_0x3e341c]['x']||this['selected']['x']+this['selected']['width']===_0x4df7a6[_0x3e341c]['x']+_0x4df7a6[_0x3e341c]['width']/(0x333+0x2478+0x47*-143)||this['selected']['x']+this['selected']['width']===_0x4df7a6[_0x3e341c]['x']+_0x4df7a6[_0x3e341c]['width'])&&this['selected']['ids']['indexOf'](_0x4df7a6[_0x3e341c]['id'])===-1&&(_0x3cc57f[-6369+0x1*0x13eb+0x4f8]=_0x4f350a(_0x3cc57f[0x1b*-303+-1*0x238f+-402*-43],_0x4df7a6[_0x3e341c],this['selected']['width'])),(Math['abs'](this['selected']['y']-_0x4df7a6[_0x3e341c]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x4df7a6[_0x3e341c]['y']+_0x4df7a6[_0x3e341c]['height']/(0x564+0x2541+0x887*-5)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x4df7a6[_0x3e341c]['y']+_0x4df7a6[_0x3e341c]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x4df7a6[_0x3e341c]['id'])===-1&&(_0x3cc57f[-31*0x11d+0x2*-3568+-14*-1141]=_0x3a1143(_0x3cc57f[-9992+0xc2e+0x12b*0x17],_0x4df7a6[_0x3e341c],0x10*-2+0x145a+-5178)),(Math['abs'](this['selected']['y']+this['selected']['height']/(-31*-97+-8256*0x1+0x1483)-_0x4df7a6[_0x3e341c]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(-242*-22+-26*-37+-1571*0x4)-(_0x4df7a6[_0x3e341c]['y']+_0x4df7a6[_0x3e341c]['height']/(0x7*-5+-7145+0x1c0e)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(-2598+0x26b9+0x1*-7313)-(_0x4df7a6[_0x3e341c]['y']+_0x4df7a6[_0x3e341c]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x4df7a6[_0x3e341c]['id'])===-1&&(_0x3cc57f[-9991*0x1+0xf6e+0x7df*0x3]=_0x3a1143(_0x3cc57f[-757+0xd3f+-5*0x20e],_0x4df7a6[_0x3e341c],this['selected']['height']/(0x176d+-9774+-3779*-1))),(Math['abs'](this['selected']['y']+this['selected']['height']-_0x4df7a6[_0x3e341c]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x4df7a6[_0x3e341c]['y']+_0x4df7a6[_0x3e341c]['height']/(-7523+-9*-13+0x1cf0)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x4df7a6[_0x3e341c]['y']+_0x4df7a6[_0x3e341c]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x4df7a6[_0x3e341c]['id'])===-1&&(_0x3cc57f[-8671+-5673+0x380d*0x1]=_0x3a1143(_0x3cc57f[0x7b+-1038*-1+-1156],_0x4df7a6[_0x3e341c],this['selected']['height']));}for(const _0x299143 of _0x3cc57f){if(_0x299143===undefined)continue;this['generateAl'+'ignLine'](_0x299143);}}['shortcuts'](_0x47cb87,_0x224d70){if(_0x47cb87==='horizontal')switch(_0x224d70){case 'begin':for(const _0x4f0f50 of this['selected']['ids']){const _0x296347=this['registered'][_0x4f0f50],{y:_0x4512f0}=this['getTransla'+'tePos'](_0x296347['el']['style']['translate']),_0x33a18e=this['selected']['x'];_0x296347['el']['style']['translate']=_0x33a18e+'px\x20'+_0x4512f0+'px',this['registered'][_0x4f0f50]['x']=_0x33a18e;}break;case 'middle':for(const _0x1b2a4c of this['selected']['ids']){const _0x5de3c5=this['registered'][_0x1b2a4c],{x:_0x2f830d,y:_0x1c323d}=this['getTransla'+'tePos'](_0x5de3c5['el']['style']['translate']),_0x513142=_0x2f830d-(_0x5de3c5['x']-(this['selected']['x']+this['selected']['width']/(0x1963+-3641+-4*0x2ca)))-_0x5de3c5['width']/(-2845+0x1*0x152e+-5*0x203);_0x5de3c5['el']['style']['translate']=_0x513142+'px\x20'+_0x1c323d+'px',this['registered'][_0x1b2a4c]['x']=_0x513142;}break;case 'end':for(const _0x2dc977 of this['selected']['ids']){const _0x736b0f=this['registered'][_0x2dc977],{y:_0x5c353c}=this['getTransla'+'tePos'](_0x736b0f['el']['style']['translate']),_0x5d7b97=this['selected']['x']+this['selected']['width']-_0x736b0f['width'];_0x736b0f['el']['style']['translate']=_0x5d7b97+'px\x20'+_0x5c353c+'px',this['registered'][_0x2dc977]['x']=this['selected']['x']+this['selected']['width']-_0x736b0f['width'];}break;case 'distribute':const _0x4d0b8e=this['selected']['ids']['sort']((_0x3a148f,_0x38f2ff)=>this['registered'][_0x3a148f]['x']-this['registered'][_0x38f2ff]['x']);let _0x73b182=0x22e4+0x13a8+-13964;for(const _0x3ef959 of _0x4d0b8e){_0x73b182+=this['registered'][_0x3ef959]['width'];}const _0x2a1e68=(this['selected']['width']-_0x73b182)/(_0x4d0b8e['length']-(-9277+-335*-6+0x1c64));let _0x1658ee=this['registered'][_0x4d0b8e[0x1b2e+0x137e+0xbab*-4]]['x'];for(let _0x201a74=0xa97*0x1+0xb*0x12d+0x1786*-1;_0x201a74<_0x4d0b8e['length'];_0x201a74++){const _0x4eed00=_0x4d0b8e[_0x201a74],_0x29f99a=this['registered'][_0x4eed00],{y:_0x41ffcd}=this['getTransla'+'tePos'](_0x29f99a['el']['style']['translate']);let _0x217be4=_0x1658ee;_0x29f99a['el']['style']['translate']=_0x217be4+'px\x20'+_0x41ffcd+'px',this['registered'][_0x4eed00]['x']=_0x217be4,_0x1658ee=_0x1658ee+_0x29f99a['width']+_0x2a1e68;}break;}else {if(_0x47cb87==='vertical')switch(_0x224d70){case 'begin':for(const _0xe6672 of this['selected']['ids']){const _0x129e16=this['registered'][_0xe6672],{x:_0x3ba0d5}=this['getTransla'+'tePos'](_0x129e16['el']['style']['translate']),_0x316cfc=this['selected']['y'];_0x129e16['el']['style']['translate']=_0x3ba0d5+'px\x20'+_0x316cfc+'px',this['registered'][_0xe6672]['y']=_0x316cfc;}break;case 'middle':for(const _0x4ddee0 of this['selected']['ids']){const _0x37e619=this['registered'][_0x4ddee0],{x:_0x3b9d1e,y:_0x2f1c8c}=this['getTransla'+'tePos'](_0x37e619['el']['style']['translate']),_0x14056e=_0x2f1c8c-(_0x37e619['y']-(this['selected']['y']+this['selected']['height']/(-6582+0x3*-821+0x2357)))-_0x37e619['height']/(-1089*0x2+0x1c9d+-5145);_0x37e619['el']['style']['translate']=_0x3b9d1e+'px\x20'+_0x14056e+'px',this['registered'][_0x4ddee0]['y']=_0x14056e;}break;case 'end':for(const _0x7411d7 of this['selected']['ids']){const _0x61e5b8=this['registered'][_0x7411d7],{x:_0x3c9895}=this['getTransla'+'tePos'](_0x61e5b8['el']['style']['translate']),_0x51c6fe=this['selected']['y']+this['selected']['height']-_0x61e5b8['height'];_0x61e5b8['el']['style']['translate']=_0x3c9895+'px\x20'+_0x51c6fe+'px',this['registered'][_0x7411d7]['y']=this['selected']['y']+this['selected']['height']-_0x61e5b8['height'];}break;case 'distribute':const _0x8ac485=this['selected']['ids']['sort']((_0x4588e0,_0x19c175)=>this['registered'][_0x4588e0]['y']-this['registered'][_0x19c175]['y']);let _0xb8c77f=0x1143+0x4ff+-14*0x197;for(const _0x3bfa05 of _0x8ac485){_0xb8c77f+=this['registered'][_0x3bfa05]['height'];}const _0x1b0654=(this['selected']['height']-_0xb8c77f)/(_0x8ac485['length']-(0x23cf+-119*-45+-14521));let _0x48f57d=this['registered'][_0x8ac485[-6399+-5074*0x1+0x2cd1]]['y'];for(let _0x8513a0=-3682*0x2+-1029+0x20c9;_0x8513a0<_0x8ac485['length'];_0x8513a0++){const _0x4f5f42=_0x8ac485[_0x8513a0],_0x3a4e77=this['registered'][_0x4f5f42],{x:_0x42904d}=this['getTransla'+'tePos'](_0x3a4e77['el']['style']['translate']);let _0x111551=_0x48f57d;_0x3a4e77['el']['style']['translate']=_0x42904d+'px\x20'+_0x111551+'px',this['registered'][_0x4f5f42]['y']=_0x111551,_0x48f57d=_0x48f57d+_0x3a4e77['height']+_0x1b0654;}break;}else this['elMeasure']?.['classList']['contains']('active')?(this['shadowRoot']?.['removeEven'+'tListener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['remove']('active'),this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']()):(this['shadowRoot']?.['addEventLi'+'stener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['add']('active'));}this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['measure'](_0x7c3a45){if(this['selected']['ids']['length']===0x17*0xa3+0x3b*0x67+-4913*0x2)return;if(this['mouseMoveT'+'ype']==='main')return;let _0x5731cf=null;_0x7c3a45['target']['id']==='main'&&(_0x5731cf=_0x7c3a45['target']);_0x5731cf===null&&(_0x5731cf=_0x7c3a45['target']['closest']('glide-dnr-'+'item'));if(_0x5731cf===null)return;this['isToolbar']&&(this['measureTar'+'getId']=_0x5731cf['id']);if(_0x5731cf['id']==='main'){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();this['isToolbar']&&(this['measureTar'+'getId']='',this['elMeasureO'+'utline']['style']['width']=0x1987+-1*0x2361+0x9da,this['elMeasureO'+'utline']['style']['height']=-44*0x7a+-62*-72+0x4*0xe2,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');return;}this['isToolbar']&&this['measureExe'+'cute']();}['measureExe'+'cute'](){if(this['measureTar'+'getId']==='')return;this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();const _0x46039b=this['measureTar'+'getId'];for(const _0x9e5173 of this['selected']['ids']){if(_0x46039b===_0x9e5173){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();return;}}const _0x4f5b22=this['selected']['x']+this['selected']['width'],_0x4e9cca=this['selected']['x']+this['selected']['width']/(-4061+-485*0xa+0x22d1),_0x2cad97=this['selected']['y']+this['selected']['height'],_0x274ec7=this['selected']['y']+this['selected']['height']/(-7143+0x103+0x1*0x1ae6),_0x36d2b6=this['registered'][_0x46039b]['x']+this['registered'][_0x46039b]['width'],_0x55b0b5=this['registered'][_0x46039b]['y']+this['registered'][_0x46039b]['height'];let _0x7e533f=![];if(_0x2cad97<this['registered'][_0x46039b]['y']){_0x7e533f=!![];const _0x166dee=this['registered'][_0x46039b]['y']-_0x2cad97;let _0x21c5de=_0x4e9cca;_0x4e9cca===_0x36d2b6&&(_0x21c5de-=-190*-9+-5508+0xed7*0x1);this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x21c5de+'px\x20'+_0x2cad97+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x166dee+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');let _0x27512e=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x232c35=parseFloat(_0x27512e['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x166dee);const _0x10b82f=Math['round'](_0x2cad97+_0x166dee/(-33*-274+0x59*0x16+-10998)-_0x232c35/(0x160+-1886+0x1*0x600));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x4e9cca+(0xbfc+0x1*-6023+0xb8f)+'px\x20'+_0x10b82f+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible',_0x4e9cca<=this['registered'][_0x46039b]['x']&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4e9cca+'px\x20'+this['registered'][_0x46039b]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x46039b]['x']-_0x4e9cca+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x4e9cca>=_0x36d2b6&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x36d2b6+'px\x20'+this['registered'][_0x46039b]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x4e9cca-_0x36d2b6+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(_0x2cad97>=this['registered'][_0x46039b]['y']&&_0x2cad97<=_0x55b0b5){_0x7e533f=!![];const _0x21afd5=_0x55b0b5-_0x2cad97;this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x4e9cca+'px\x20'+_0x2cad97+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x21afd5+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');if(_0x2cad97>=this['registered'][_0x46039b]['y']&&_0x2cad97<_0x55b0b5){let _0x38ddd5=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x2d3cbc=parseFloat(_0x38ddd5['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x21afd5);const _0xf05da2=Math['round'](_0x2cad97+_0x21afd5/(0x3c8*-4+-8107+-11981*-1)-_0x2d3cbc/(0x244d+0x156+0x3*-3211));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x4e9cca+(0x3f1*0x6+0x1ab0+0x6*-2147)+'px\x20'+_0xf05da2+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible';}_0x4e9cca<=this['registered'][_0x46039b]['x']&&_0x2cad97<_0x55b0b5&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4e9cca+'px\x20'+(_0x55b0b5-(0x83f*-4+0x1345+0x36e*0x4))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x46039b]['x']-_0x4e9cca+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x4e9cca>=_0x36d2b6&&_0x2cad97<_0x55b0b5&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x36d2b6+'px\x20'+(_0x55b0b5-(-8980+0x9c1+-4*-1621))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x4e9cca-_0x36d2b6+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>_0x55b0b5){_0x7e533f=!![];const _0x596f55=this['selected']['y']-_0x55b0b5;let _0x488a1b=_0x4e9cca;_0x4e9cca===_0x36d2b6&&(_0x488a1b-=0x361+-113*-43+-1*0x165b);this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x488a1b+'px\x20'+_0x55b0b5+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x596f55+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x3f0478=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x4ded34=parseFloat(_0x3f0478['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x596f55);const _0x32f9b0=Math['round'](this['selected']['y']-_0x596f55/(-2948+0xd66+0x60*-5)-_0x4ded34/(-4251+0x362+-1129*-3));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x4e9cca+(0x8b*0x18+-9364*0x1+-1*-6032)+'px\x20'+_0x32f9b0+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x4e9cca<this['registered'][_0x46039b]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x4e9cca+'px\x20'+(_0x55b0b5-(0xf04+0x2024+-12071))+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x46039b]['x']-_0x4e9cca+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x4e9cca>_0x36d2b6&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x36d2b6+'px\x20'+(_0x55b0b5-(0x1a43+-1470+-2626*0x2))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x4e9cca-_0x36d2b6+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>this['registered'][_0x46039b]['y']&&this['selected']['y']<=_0x55b0b5){_0x7e533f=!![];const _0x4b30ab=this['selected']['y']-this['registered'][_0x46039b]['y'];this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x4e9cca+'px\x20'+this['registered'][_0x46039b]['y']+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x4b30ab+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x30b5c8=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x3fc6df=parseFloat(_0x30b5c8['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x4b30ab);const _0x1c039b=Math['round'](this['selected']['y']-_0x4b30ab/(0x1*0x1ddf+0x26b2+-17551)-_0x3fc6df/(-8659+0x405*-1+0x26*0xff));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x4e9cca+(0x1814+0x14c*0x3+0xdfa*-2)+'px\x20'+_0x1c039b+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x4e9cca<this['registered'][_0x46039b]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x4e9cca+'px\x20'+this['registered'][_0x46039b]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x46039b]['x']-_0x4e9cca+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x4e9cca>_0x36d2b6&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x36d2b6+'px\x20'+this['registered'][_0x46039b]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=_0x4e9cca-_0x36d2b6+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible'));}if(_0x4f5b22<this['registered'][_0x46039b]['x']){_0x7e533f=!![];let _0xc2752d=_0x274ec7;_0x274ec7===_0x55b0b5&&(_0xc2752d-=-6946+-6786+0x35a5);this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x4f5b22+(0x227e+0x1e3a+0x40b7*-1)+'px\x20'+_0xc2752d+'px';const _0xfaf834=this['registered'][_0x46039b]['x']-_0x4f5b22;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0xfaf834+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x3aaf31=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x31c7c6=parseFloat(_0x3aaf31['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0xfaf834);const _0x2e122d=Math['round'](_0x4f5b22+_0xfaf834/(-3991*-2+-538+-7442)-_0x31c7c6/(0x353+0x4c5+-2070));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x2e122d+'px\x20'+(_0x274ec7+(0x18b3*-1+-6829+0xd*0x3f4))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x274ec7<=this['registered'][_0x46039b]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x46039b]['x']+'px\x20'+_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x46039b]['y']-_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x274ec7>=_0x55b0b5&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x46039b]['x']+'px\x20'+_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x274ec7-_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(_0x4f5b22>=this['registered'][_0x46039b]['x']&&_0x4f5b22<_0x36d2b6){_0x7e533f=!![],this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x4f5b22+'px\x20'+_0x274ec7+'px';const _0x43c223=_0x36d2b6-_0x4f5b22;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x43c223+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x2dbf3e=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x185880=parseFloat(_0x2dbf3e['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x43c223);const _0x405d3e=Math['round'](_0x4f5b22+_0x43c223/(0x24e*0x1+0x1*-9929+0x247d*0x1)-_0x185880/(0x2072*0x1+0x17a0+0x4e*-184));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x405d3e+'px\x20'+(_0x274ec7+(-1458+0x4f*-83+-27*-297))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x274ec7<this['registered'][_0x46039b]['y']&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x36d2b6-(-8608*-1+0x2ce+-9325)+'px\x20'+_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=this['registered'][_0x46039b]['y']-_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible')),_0x274ec7>_0x55b0b5&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x36d2b6-(-2244+0x2306*0x1+0xb*-611)+'px\x20'+_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=_0x274ec7-_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible'));}if(this['selected']['x']>_0x36d2b6){_0x7e533f=!![];let _0x17c8a1=_0x274ec7;_0x274ec7===_0x55b0b5&&(_0x17c8a1-=-6972+-604*-8+0x1*0x85d);this['elMeasureL'+'ines']['solid_l']['style']['translate']=_0x36d2b6-(-5331*-1+-671+0x1233*-1)+'px\x20'+_0x17c8a1+'px';const _0x718f6d=this['selected']['x']-_0x36d2b6;this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x718f6d+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x1b7acf=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x20a3d8=parseFloat(_0x1b7acf['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x718f6d);const _0x37bbd9=Math['round'](_0x36d2b6+_0x718f6d/(0x2415+0x1e3a*0x1+-16973*0x1)-_0x20a3d8/(-5233+-2*-3499+-1763));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x37bbd9+'px\x20'+(_0x274ec7+(-2119+-5074+-7197*-1))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x274ec7<=this['registered'][_0x46039b]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x36d2b6-(-881*-3+0x2625+0x28d*-19)+'px\x20'+_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x46039b]['y']-_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x274ec7>=_0x55b0b5&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x36d2b6-(-757*0x6+-2*0x72a+0x495*0x7)+'px\x20'+_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x274ec7-_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(this['selected']['x']>this['registered'][_0x46039b]['x']&&this['selected']['x']<=_0x36d2b6){_0x7e533f=!![],this['elMeasureL'+'ines']['solid_l']['style']['translate']=this['registered'][_0x46039b]['x']+'px\x20'+_0x274ec7+'px';const _0xed80f1=this['selected']['x']-this['registered'][_0x46039b]['x'];this['elMeasureL'+'ines']['solid_l']['style']['width']=_0xed80f1+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x3b64f1=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x2cb9cb=parseFloat(_0x3b64f1['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0xed80f1);const _0x5f2279=Math['round'](this['registered'][_0x46039b]['x']+_0xed80f1/(0x1599+0xc43+0x10ed*-2)-_0x2cb9cb/(-2671+-1520+0x1061));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x5f2279+'px\x20'+(_0x274ec7+(0x1114+0x867+-6519))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x274ec7<=this['registered'][_0x46039b]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x46039b]['x']+'px\x20'+_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x46039b]['y']-_0x274ec7+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x274ec7>=_0x55b0b5&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x46039b]['x']+'px\x20'+_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x274ec7-_0x55b0b5+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}_0x7e533f?this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=this['registered'][_0x46039b]['width']+'px',this['elMeasureO'+'utline']['style']['height']=this['registered'][_0x46039b]['height']+'px',this['elMeasureO'+'utline']['style']['translate']=this['registered'][_0x46039b]['x']+'px\x20'+this['registered'][_0x46039b]['y']+'px',this['elMeasureO'+'utline']['style']['visibility']='visible',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='auto'):(this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed'](),this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0xfce+0x3d*0xa3+-13989,this['elMeasureO'+'utline']['style']['height']=-8571+0x25e2+0x31*-23,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none'));}['hideMeasur'+'eReference'+'s'](){this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberB']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberB']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='hidden');}['hideMeasur'+'eDeshed'](){this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='hidden');}['triggerSel'+'ectedLines'+'Vectors'](_0x176830){_0x176830==='hide'?this['elSelected'+'Lines']['l']['style']['visibility']!=='hidden'&&(this['elSelected'+'Lines']['l']['style']['visibility']='hidden',this['elSelected'+'Lines']['r']['style']['visibility']='hidden',this['elSelected'+'Lines']['t']['style']['visibility']='hidden',this['elSelected'+'Lines']['b']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tr']['style']['visibility']='hidden',this['elSelected'+'Vectors']['bl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['br']['style']['visibility']='hidden'):this['elSelected'+'Lines']['l']['style']['visibility']!=='visible'&&(this['elSelected'+'Lines']['l']['style']['visibility']='visible',this['elSelected'+'Lines']['r']['style']['visibility']='visible',this['elSelected'+'Lines']['t']['style']['visibility']='visible',this['elSelected'+'Lines']['b']['style']['visibility']='visible',this['elSelected'+'Vectors']['tl']['style']['visibility']='visible',this['elSelected'+'Vectors']['tr']['style']['visibility']='visible',this['elSelected'+'Vectors']['bl']['style']['visibility']='visible',this['elSelected'+'Vectors']['br']['style']['visibility']='visible');}['delete'](){const _0x31351b=new CustomEvent('onActions',{'detail':{'type':'delete','ids':this['selected']['ids']}});this['dispatchEv'+'ent'](_0x31351b);}['listenItem'+'Events'](){eventBus['on']('onItemChan'+'ge',({id:_0x5ef56b,type:_0x139497,value:_0x3f23a9})=>{if(!HasOwn(this['registered'],_0x5ef56b))return;let _0x2cf1ba=-158*0x17+-1*-9961+-3*0x83d,_0x5c7e31=0x4d*0x3d+-55*-151+-13002,_0x4719c7='';requestAnimationFrame(()=>{switch(_0x139497){case 'left':_0x4719c7='drag',this['registered'][_0x5ef56b]['el']['style']['translate']=_0x3f23a9+'px\x20'+this['registered'][_0x5ef56b]['y']+'px',_0x2cf1ba=parseFloat(_0x3f23a9),_0x5c7e31=this['registered'][_0x5ef56b]['x']-_0x2cf1ba,this['registered'][_0x5ef56b]['x']=_0x2cf1ba;if(this['selected']['ids']['length']>-5231+-3865+0x2388){if(this['selected']['ids']['indexOf'](_0x5ef56b)>-1){this['selected']['x']=_0x2cf1ba;const _0x1e7f41=this['getTransla'+'tePos'](this['elSelected'+'Lines']['l']['style']['translate']);this['elSelected'+'Lines']['l']['style']['translate']=_0x1e7f41['x']-_0x5c7e31+'px\x20'+_0x1e7f41['y']+'px';const _0x351be1=this['getTransla'+'tePos'](this['elSelected'+'Lines']['t']['style']['translate']);this['elSelected'+'Lines']['t']['style']['translate']=_0x351be1['x']-_0x5c7e31+'px\x20'+_0x351be1['y']+'px';const _0x508775=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x508775['x']-_0x5c7e31+'px\x20'+_0x508775['y']+'px';const _0x3b34fb=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x3b34fb['x']-_0x5c7e31+'px\x20'+_0x3b34fb['y']+'px';const _0x55ede1=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tl']['style']['translate']);this['elSelected'+'Vectors']['tl']['style']['translate']=_0x55ede1['x']-_0x5c7e31+'px\x20'+_0x55ede1['y']+'px';const _0x58f6a7=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x58f6a7['x']-_0x5c7e31+'px\x20'+_0x58f6a7['y']+'px';const _0x1d7495=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x1d7495['x']-_0x5c7e31+'px\x20'+_0x1d7495['y']+'px';const _0x3e583a=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x3e583a['x']-_0x5c7e31+'px\x20'+_0x3e583a['y']+'px';}}break;case 'top':_0x4719c7='drag',this['registered'][_0x5ef56b]['el']['style']['translate']=this['registered'][_0x5ef56b]['x']+'px\x20'+_0x3f23a9+'px',_0x2cf1ba=parseFloat(_0x3f23a9),_0x5c7e31=this['registered'][_0x5ef56b]['y']-_0x2cf1ba,this['registered'][_0x5ef56b]['y']=_0x2cf1ba;if(this['selected']['ids']['length']>0x10*0x194+-809*0xb+-1*-2435){if(this['selected']['ids']['indexOf'](_0x5ef56b)>-1){this['selected']['y']=_0x2cf1ba;const _0x234b74=this['getTransla'+'tePos'](this['elSelected'+'Lines']['l']['style']['translate']);this['elSelected'+'Lines']['l']['style']['translate']=_0x234b74['x']+'px\x20'+(_0x234b74['y']-_0x5c7e31)+'px';const _0x29848f=this['getTransla'+'tePos'](this['elSelected'+'Lines']['t']['style']['translate']);this['elSelected'+'Lines']['t']['style']['translate']=_0x29848f['x']+'px\x20'+(_0x29848f['y']-_0x5c7e31)+'px';const _0x348902=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x348902['x']+'px\x20'+(_0x348902['y']-_0x5c7e31)+'px';const _0x37e5e4=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x37e5e4['x']+'px\x20'+(_0x37e5e4['y']-_0x5c7e31)+'px';const _0x29b3b7=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tl']['style']['translate']);this['elSelected'+'Vectors']['tl']['style']['translate']=_0x29b3b7['x']+'px\x20'+(_0x29b3b7['y']-_0x5c7e31)+'px';const _0x22923b=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x22923b['x']+'px\x20'+(_0x22923b['y']-_0x5c7e31)+'px';const _0x57b0b5=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x57b0b5['x']+'px\x20'+(_0x57b0b5['y']-_0x5c7e31)+'px';const _0xe0c1e7=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0xe0c1e7['x']+'px\x20'+(_0xe0c1e7['y']-_0x5c7e31)+'px';}}break;case 'width':_0x4719c7='resize_wid'+'th',this['registered'][_0x5ef56b]['el']['style']['width']=_0x3f23a9+'px',_0x2cf1ba=parseFloat(_0x3f23a9),_0x5c7e31=this['registered'][_0x5ef56b]['width']-_0x2cf1ba,this['registered'][_0x5ef56b]['width']=_0x2cf1ba;if(this['selected']['ids']['length']>0x7*0x40c+0xb49+-1*0x279d){if(this['selected']['ids']['indexOf'](_0x5ef56b)>-1){this['selected']['width']=this['selected']['width']-_0x5c7e31,this['elSelected'+'Lines']['t']['style']['width']=parseFloat(this['elSelected'+'Lines']['t']['style']['width'])-_0x5c7e31+'px',this['elSelected'+'Lines']['b']['style']['width']=parseFloat(this['elSelected'+'Lines']['b']['style']['width'])-_0x5c7e31+'px';const _0x35bb3c=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x35bb3c['x']-_0x5c7e31+'px\x20'+_0x35bb3c['y']+'px';const _0x54b428=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x54b428['x']-_0x5c7e31+'px\x20'+_0x54b428['y']+'px';const _0x390b86=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x390b86['x']-_0x5c7e31+'px\x20'+_0x390b86['y']+'px';}}break;case 'height':_0x4719c7='resize_hei'+'ght',this['registered'][_0x5ef56b]['el']['style']['height']=_0x3f23a9+'px',_0x2cf1ba=parseFloat(_0x3f23a9),_0x5c7e31=this['registered'][_0x5ef56b]['height']-_0x2cf1ba,this['registered'][_0x5ef56b]['height']=_0x2cf1ba;if(this['selected']['ids']['length']>-1538+-5569+0x1bc3*0x1){if(this['selected']['ids']['indexOf'](_0x5ef56b)>-1){this['selected']['height']=this['selected']['height']-_0x5c7e31,this['elSelected'+'Lines']['l']['style']['height']=parseFloat(this['elSelected'+'Lines']['l']['style']['height'])-_0x5c7e31+'px',this['elSelected'+'Lines']['r']['style']['height']=parseFloat(this['elSelected'+'Lines']['r']['style']['height'])-_0x5c7e31+'px';const _0x463b4b=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x463b4b['x']+'px\x20'+(_0x463b4b['y']-_0x5c7e31)+'px';const _0x2dbf7b=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x2dbf7b['x']+'px\x20'+(_0x2dbf7b['y']-_0x5c7e31)+'px';const _0x129964=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x129964['x']+'px\x20'+(_0x129964['y']-_0x5c7e31)+'px';}}break;}const _0x4e1eec=new CustomEvent('onChangeBy'+'Outside',{'detail':{'id':_0x5ef56b,'type':_0x4719c7,'x':this['registered'][_0x5ef56b]['x'],'y':this['registered'][_0x5ef56b]['y'],'width':this['registered'][_0x5ef56b]['width'],'height':this['registered'][_0x5ef56b]['height']}});this['dispatchEv'+'ent'](_0x4e1eec);});});}['init'](){const _0x3ac609=document['createElem'+'ent']('template');_0x3ac609['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x3ac609['content']),this['onSlotChan'+'ge'](),this['handleClic'+'k'](),this['initKeyboa'+'rdEvents'](),this['isModifyOu'+'tside']&&this['listenItem'+'Events']();}}customElements['define']('glide-dnr',GlideDNR);
const properties=['left','top','width','height'];class GlideDNRItem extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'els',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['init']=this['init']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x391594,_0x1a346d,_0x5065bd){if(_0x1a346d===_0x5065bd)return;let _0x4e6714='';switch(_0x391594){case 'left':_0x4e6714='left';break;case 'top':_0x4e6714='top';break;case 'width':_0x4e6714='width';break;case 'height':_0x4e6714='height';break;}_0x4e6714!==''&&eventBus['emit']('onItemChan'+'ge',{'id':this['id'],'type':_0x4e6714,'value':_0x5065bd});}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<sl'+'ot></slot>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20:host\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20display:'+'\x20inline-bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-block;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fl'+'ex-shrink:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20user-s'+'elect:\x20non'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20auto;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x200p'+'x\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20';}['init'](){const _0x274707=document['createElem'+'ent']('template');_0x274707['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x274707['content']),this['onceBindin'+'gs']();}['onceBindin'+'gs'](){const _0x2d43c2=this['shadowRoot'];if(_0x2d43c2===null)return;const _0x53772a=_0x2d43c2['querySelec'+'tor']('.glide-dnr'+'_item');_0x53772a!==undefined&&(this['els']['container']=_0x53772a);}}customElements['define']('glide-dnr-'+'item',GlideDNRItem);export{GlideDNR,GlideDNRItem};