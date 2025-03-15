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
var _0x5e35a6 = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);const HasOwn=(_0x4a4c23,_0xd43652)=>{if(typeof _0x4a4c23!=='object')return ![];if(_0x4a4c23===null||Array['isArray'](_0x4a4c23))return ![];return Object['prototype']['hasOwnProp'+'erty']['call'](_0x4a4c23,_0xd43652);};class EventBus{constructor(){Object['defineProp'+'erty'](this,'events',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}});}['on'](_0x24fab6,_0x4786e9){!this['events'][_0x24fab6]&&(this['events'][_0x24fab6]=[]),this['events'][_0x24fab6]['push'](_0x4786e9);}['emit'](_0x335145,_0x352e18){this['events'][_0x335145]&&this['events'][_0x335145]['forEach'](_0x4b8a61=>_0x4b8a61(_0x352e18));}['off'](_0x1d4c07,_0x4a05bd){this['events'][_0x1d4c07]&&(this['events'][_0x1d4c07]=this['events'][_0x1d4c07]['filter'](_0x591257=>_0x591257!==_0x4a05bd));}}const eventBus=new EventBus();const properties$1=['toolbar','measure','toolbar-pl'+'acement','actions','modify-out'+'side','color-prim'+'ary'],_window=window,lineSize=0x1*-9366+0x17*-127+0x3004,vectorSize=-3474+0x65*0x1b+-16*-47,colors={'primary':'#4907DA','red':'#FB2C36','redActive':'#E7110C'};let dragBeginPos={'x':-1,'y':-1};const vectorOffset=vectorSize/(0xa8d+-1*0x638+-3*0x171)+(0xa55+-3*-121+-31*0x61),originSelected={'ids':[],'x':0x0,'y':0x0,'width':0x0,'height':0x0};class GlideDNR extends HTMLElement{static get['observedAt'+'tributes'](){return properties$1;}constructor(){super(),Object['defineProp'+'erty'](this,'isToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isModifyOu'+'tside',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'toolbarPla'+'cement',{'enumerable':!![],'configurable':!![],'writable':!![],'value':'float'}),Object['defineProp'+'erty'](this,'colorPrima'+'ry',{'enumerable':!![],'configurable':!![],'writable':!![],'value':colors['primary']}),Object['defineProp'+'erty'](this,'loadingIte'+'ms',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{'general':{'total':0x0,'loaded':0x0},'image':{'total':0x0,'loaded':0x0}}}),Object['defineProp'+'erty'](this,'selected',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x5e35a6(originSelected)}),Object['defineProp'+'erty'](this,'registered',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'requestAni'+'mation',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elSelected'+'Lines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'elSelected'+'Vectors',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'rDrags',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elAligns',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasureO'+'utline',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'measureTar'+'getId',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'latestSele'+'cted',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x5e35a6(originSelected)}),Object['defineProp'+'erty'](this,'lastClickT'+'ime',{'enumerable':!![],'configurable':!![],'writable':!![],'value':-1}),Object['defineProp'+'erty'](this,'isInit',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseMoveT'+'ype',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'hasSelecte'+'d',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'hasMoved',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isInSelect'+'ed',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseTarge'+'t',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'thresholdH'+'orizontal',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'thresholdV'+'ertical',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'alignVecto'+'rsLinesThr'+'eshold',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0.1}),Object['defineProp'+'erty'](this,'elMeasureL'+'ines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['measure']=this['measure']['bind'](this),this['delete']=this['delete']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x545693,_0x383fc1,_0x3cc57e){if(_0x383fc1===_0x3cc57e)return;switch(_0x545693){case 'toolbar':_0x3cc57e===''&&(this['isToolbar']=!![]);break;case 'measure':_0x3cc57e===''&&(this['isMeasure']=!![]);break;case 'toolbar-pl'+'acement':this['toolbarPla'+'cement']=_0x3cc57e;break;case 'actions':_0x3cc57e===''&&(this['isActions']=!![]);break;case 'modify-out'+'side':_0x3cc57e===''&&(this['isModifyOu'+'tside']=!![]);break;case 'color-prim'+'ary':this['colorPrima'+'ry']=_0x3cc57e;break;}}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22c'+'ontainer\x22\x20'+'id=\x22contai'+'ner\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22main'+'\x22\x20id=\x22main'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<slot\x20c'+'lass=\x22slot'+'\x22></slot>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_align\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_drag\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22refere'+'nce-lines_'+'selected\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<!--\x20line'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20class=\x22l'+'ine\x20left\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20style=\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20'+(this['selected']['x']-lineSize/(-4768+-2*0x105d+0x335c))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20righ'+'t\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20style'+'=\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x20')+(this['selected']['x']+this['selected']['width']-lineSize/(-1*-2061+-916*0x9+-1237*-5))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20top\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20style=\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'late:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-3873+-7134+0x2b01))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20bott'+'om\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0xb*-619+-1*-5140+0x1*0x687))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20vector\x20-'+'->\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'class=\x22vec'+'tor\x20top-le'+'ft\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20top-r'+'ight\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20st'+'yle=\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'translate:'+'\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-left\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'style=\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-right\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20style=\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20transla'+'te:\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20测距离参考线\x20和'+'\x20数字\x20-->\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22me'+'asure-line'+'s\x22>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<!--\x20'+'实线：选中项\x20-->'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22solid\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22item\x20'+'top\x22></div'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22item'+'\x20bottom\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20left\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20rig'+'ht\x22></div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'!--\x20虚线：目标项'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22das'+'hed\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20horiz'+'ontal-top\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20hor'+'izontal-bo'+'ttom\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22ite'+'m\x20vertical'+'-left\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22it'+'em\x20vertica'+'l-right\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22numb'+'er\x20number-'+'top\x22>283</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22num'+'ber\x20number'+'-bottom\x22>2'+'22</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22number\x20nu'+'mber-left\x22'+'>333</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22number\x20'+'number-rig'+'ht\x22>444</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'measure-ta'+'rget-outli'+'ne\x22></div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20')+(this['isToolbar']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar\x22>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22inner\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22grou'+'p\x20aligns\x22\x20'+'id=\x22aligns'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20hor'+'izontal-le'+'ft\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M145.39-1'+'00q-12.77\x20'+'0-21.39-8.'+'62-8.61-8.'+'61-8.61-21'+'.38v-700q0'+'-12.77\x208.6'+'1-21.38\x208.'+'62-8.62\x2021'+'.39-8.62\x201'+'2.77\x200\x2021.'+'38\x208.62\x208.'+'62\x208.61\x208.'+'62\x2021.38v7'+'00q0\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62Zm171.92'+'-193.85q-2'+'0.77\x200-35.'+'58-14.8-14'+'.8-14.81-1'+'4.8-35.58\x20'+'0-20.77\x2014'+'.8-35.58\x201'+'4.81-14.8\x20'+'35.58-14.8'+'h236.92q20'+'.77\x200\x2035.5'+'8\x2014.8\x2014.'+'8\x2014.81\x2014'+'.8\x2035.58\x200'+'\x2020.77-14.'+'8\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'317.31Zm0-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H3'+'17.31Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22toolbar'+'-item\x20hori'+'zontal-cen'+'ter\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+('ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M4'+'50-130v-16'+'3.85H310.3'+'9q-20.77\x200'+'-35.58-14.'+'8Q260-323.'+'46\x20260-344'+'.23q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450v'+'-170.78H19'+'0.39q-20.7'+'7\x200-35.58-'+'14.8Q140-5'+'95\x20140-615'+'.77q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450V'+'-830q0-12.'+'75\x208.63-21'+'.37\x208.63-8'+'.63\x2021.38-'+'8.63\x2012.76'+'\x200\x2021.37\x208'+'.63Q510-84'+'2.75\x20510-8'+'30v163.85h'+'259.61q20.'+'77\x200\x2035.58'+'\x2014.8Q820-'+'636.54\x20820'+'-615.77q0\x20'+'20.77-14.8'+'1\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'510v170.78'+'h139.61q20'+'.77\x200\x2035.5'+'8\x2014.8Q700'+'-365\x20700-3'+'44.23q0\x2020'+'.77-14.81\x20'+'35.58-14.8'+'1\x2014.8-35.'+'58\x2014.8H51'+'0V-130q0\x201'+'2.75-8.63\x20'+'21.37-8.63'+'\x208.63-21.3'+'8\x208.63-12.'+'76\x200-21.37'+'-8.63Q450-'+'117.25\x20450'+'-130Z\x22/></'+'svg>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22toolbar-'+'item\x20horiz'+'ontal-righ'+'t\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<svg\x20xmlns'+'=\x22http://w'+'ww.w3.org/'+'2000/svg\x22\x20'+'height=\x2218'+'px\x22\x20viewBo'+'x=\x220\x20-960\x20'+'960\x20960\x22\x20w'+'idth=\x2218px'+'\x22\x20fill=\x22#0'+'30713\x22><pa'+'th\x20d=\x22M814'+'.61-100q-1'+'2.77\x200-21.'+'38-8.62-8.'+'62-8.61-8.'+'62-21.38v-'+'700q0-12.7'+'7\x208.62-21.'+'38\x208.61-8.'+'62\x2021.38-8')+('.62t21.39\x20'+'8.62q8.61\x20'+'8.61\x208.61\x20'+'21.38v700q'+'0\x2012.77-8.'+'61\x2021.38-8'+'.62\x208.62-2'+'1.39\x208.62Z'+'M405.77-29'+'3.85q-20.7'+'7\x200-35.58-'+'14.8-14.8-'+'14.81-14.8'+'-35.58\x200-2'+'0.77\x2014.8-'+'35.58\x2014.8'+'1-14.8\x2035.'+'58-14.8h23'+'6.92q20.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58\x200\x2020'+'.77-14.8\x203'+'5.58-14.81'+'\x2014.8-35.5'+'8\x2014.8H405'+'.77Zm-240-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H1'+'65.77Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22divide'+'r\x22></div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-top\x22>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M344.23-1'+'10q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-488'+'.07q0-20.7'+'7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v488.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q365-110\x20'+'344.23-110'+'Zm271.54-2'+'40q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-248'+'.07q0-20.7')+('7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v248.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q636.54-3'+'50\x20615.77-'+'350ZM130-7'+'90.38q-12.'+'77\x200-21.38'+'-8.62-8.62'+'-8.61-8.62'+'-21.38t8.6'+'2-21.39q8.'+'61-8.61\x2021'+'.38-8.61h7'+'00q12.77\x200'+'\x2021.38\x208.6'+'1\x208.62\x208.6'+'2\x208.62\x2021.'+'39\x200\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62H130Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20ver'+'tical-cent'+'er\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'svg\x20xmlns='+'\x22http://ww'+'w.w3.org/2'+'000/svg\x22\x20h'+'eight=\x2218p'+'x\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218px\x22'+'\x20fill=\x22#03'+'0713\x22><pat'+'h\x20d=\x22M342.'+'31-140q-20'+'.77\x200-35.5'+'8-14.81-14'+'.81-14.81-'+'14.81-35.5'+'8V-450H130'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-51'+'0\x20130-510h'+'161.92v-25'+'9.61q0-20.'+'77\x2014.81-3'+'5.58Q321.5'+'4-820\x20342.'+'31-820q20.'+'77\x200\x2035.57'+'\x2014.81\x2014.'+'81\x2014.81\x201'+'4.81\x2035.58'+'V-510h174.'+'62v-139.61'+'q0-20.77\x201'+'4.81-35.58'+'Q596.92-70'+'0\x20617.69-7'+'00t35.58\x201'+'4.81q14.81'+'\x2014.81\x2014.'+'81\x2035.58V-'+'510H830q12'+'.75\x200\x2021.3'+'7\x208.63\x208.6'+'3\x208.63\x208.6'+'3\x2021.38\x200\x20'+'12.76-8.63'+'\x2021.37Q842'+'.75-450\x2083'+'0-450H668.'+'08v139.61q'+'0\x2020.77-14'+'.81\x2035.58Q'+'638.46-260'+'\x20617.69-26')+('0q-20.77\x200'+'-35.57-14.'+'81-14.81-1'+'4.81-14.81'+'-35.58V-45'+'0H392.69v2'+'59.61q0\x2020'+'.77-14.81\x20'+'35.58Q363.'+'08-140\x20342'+'.31-140Z\x22/'+'></svg>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22toolb'+'ar-item\x20ve'+'rtical-bot'+'tom\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-110q-12'+'.77\x200-21.3'+'8-8.62Q100'+'-127.23\x2010'+'0-140t8.62'+'-21.39Q117'+'.23-170\x2013'+'0-170h700q'+'12.77\x200\x2021'+'.38\x208.61Q8'+'60-152.77\x20'+'860-140q0\x20'+'12.77-8.62'+'\x2021.38Q842'+'.77-110\x2083'+'0-110H130Z'+'m214.23-15'+'1.54q-20.7'+'7\x200-35.58-'+'14.81-14.8'+'-14.81-14.'+'8-35.57V-8'+'00q0-20.77'+'\x2014.8-35.5'+'7\x2014.81-14'+'.81\x2035.58-'+'14.81\x2020.7'+'7\x200\x2035.58\x20'+'14.81\x2014.8'+'\x2014.8\x2014.8'+'\x2035.57v488'+'.08q0\x2020.7'+'6-14.8\x2035.'+'57-14.81\x201'+'4.81-35.58'+'\x2014.81Zm27'+'1.54\x200q-20'+'.77\x200-35.5'+'8-14.81-14'+'.8-14.81-1'+'4.8-35.57V'+'-560q0-20.'+'77\x2014.8-35'+'.57\x2014.81-'+'14.81\x2035.5'+'8-14.81\x2020'+'.77\x200\x2035.5'+'8\x2014.81\x2014'+'.8\x2014.8\x2014'+'.8\x2035.57v2'+'48.08q0\x2020'+'.76-14.8\x203'+'5.57-14.81'+'\x2014.81-35.'+'58\x2014.81Z\x22'+'/></svg>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22div'+'ider\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba')+('r-item\x20hor'+'izontal-di'+'stribute\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<sv'+'g\x20xmlns=\x22h'+'ttp://www.'+'w3.org/200'+'0/svg\x22\x20hei'+'ght=\x2218px\x22'+'\x20viewBox=\x22'+'0\x20-960\x20960'+'\x20960\x22\x20widt'+'h=\x2218px\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M129.99'+'-100q-12.7'+'6\x200-21.37-'+'8.63Q100-1'+'17.25\x20100-'+'130v-700q0'+'-12.75\x208.6'+'3-21.37\x208.'+'63-8.63\x2021'+'.38-8.63\x201'+'2.76\x200\x2021.'+'37\x208.63Q16'+'0-842.75\x201'+'60-830v700'+'q0\x2012.75-8'+'.63\x2021.37-'+'8.63\x208.63-'+'21.38\x208.63'+'Zm350.06-1'+'90q-20.82\x20'+'0-35.43-14'+'.58Q430-31'+'9.17\x20430-3'+'40v-280q0-'+'20.83\x2014.5'+'7-35.42Q45'+'9.14-670\x204'+'79.95-670q'+'20.82\x200\x2035'+'.43\x2014.58Q'+'530-640.83'+'\x20530-620v2'+'80q0\x2020.83'+'-14.57\x2035.'+'42Q500.86-'+'290\x20480.05'+'-290Zm349.'+'94\x20190q-12'+'.76\x200-21.3'+'7-8.63Q800'+'-117.25\x2080'+'0-130v-700'+'q0-12.75\x208'+'.63-21.37\x20'+'8.63-8.63\x20'+'21.38-8.63'+'\x2012.76\x200\x202'+'1.37\x208.63Q'+'860-842.75'+'\x20860-830v7'+'00q0\x2012.75'+'-8.63\x2021.3'+'7-8.63\x208.6'+'3-21.38\x208.'+'63Z\x22/></sv'+'g>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-distrib'+'ute\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-100q-12'+'.75\x200-21.3'+'7-8.63-8.6'+'3-8.63-8.6'+'3-21.38\x200-'+'12.76\x208.63'+'-21.37Q117')+('.25-160\x2013'+'0-160h700q'+'12.75\x200\x2021'+'.37\x208.63\x208'+'.63\x208.63\x208'+'.63\x2021.38\x20'+'0\x2012.76-8.'+'63\x2021.37Q8'+'42.75-100\x20'+'830-100H13'+'0Zm210-330'+'q-20.83\x200-'+'35.42-14.5'+'7Q290-459.'+'14\x20290-479'+'.95q0-20.8'+'2\x2014.58-35'+'.43Q319.17'+'-530\x20340-5'+'30h280q20.'+'83\x200\x2035.42'+'\x2014.57Q670'+'-500.86\x2067'+'0-480.05q0'+'\x2020.82-14.'+'58\x2035.43Q6'+'40.83-430\x20'+'620-430H34'+'0ZM130-800'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-86'+'0\x20130-860h'+'700q12.75\x20'+'0\x2021.37\x208.'+'63\x208.63\x208.'+'63\x208.63\x2021'+'.38\x200\x2012.7'+'6-8.63\x2021.'+'37Q842.75-'+'800\x20830-80'+'0H130Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22d'+'ivider\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22group'+'\x20measure\x22\x20'+'id=\x22measur'+'e\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'toolbar-it'+'em\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20xmln'+'s=\x22http://'+'www.w3.org'+'/2000/svg\x22'+'\x20height=\x221'+'8\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M172.31'+'-260Q142-2'+'60\x20121-281'+'q-21-21-21'+'-51.44v-29'+'5.12Q100-6'+'58\x20121-679'+'q21-21\x2051.'+'31-21h615.'+'38Q818-700'+'\x20839-679q2'+'1\x2021\x2021\x2051'+'.44v295.12'+'Q860-302\x208'+'39-281q-21'+'\x2021-51.31\x20'+'21H172.31Z'+'m0-60h615.'+'38q4.62\x200\x20'+'8.46-3.85\x20'+'3.85-3.84\x20'+'3.85-8.46v'+'-295.38q0-'+'4.62-3.85-'+'8.46-3.84-'+'3.85-8.46-'+'3.85H670v1'+'14.61q0\x2012'+'.75-8.63\x202'+'1.38-8.63\x20'+'8.62-21.38'+'\x208.62-12.7'+'6\x200-21.37-'+'8.62-8.62-'+'8.63-8.62-'+'21.38V-640'+'H510v114.6'+'1q0\x2012.75-'+'8.63\x2021.38'+'-8.63\x208.62'+'-21.38\x208.6'+'2-12.76\x200-'+'21.37-8.62'+'-8.62-8.63'+'-8.62-21.3'+'8V-640H350'+'v114.61q0\x20'+'12.75-8.63'+'\x2021.38-8.6'+'3\x208.62-21.'+'38\x208.62-12'+'.76\x200-21.3'+'7-8.62-8.6'+'2-8.63-8.6'+'2-21.38V-6'+'40H172.31q'+'-4.62\x200-8.'+'46\x203.85-3.'+'85\x203.84-3.'+'85\x208.46v29'+'5.38q0\x204.6'+'2\x203.85\x208.4'+'6\x203.84\x203.8'+'5\x208.46\x203.8'+'5ZM320-495'+'.39Zm160\x200'+'Zm160\x200ZM4'+'80-480Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20'):'')+('\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22actions\x22'+'\x20id=\x22actio'+'ns\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22act'+'ions-item\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<svg\x20x'+'mlns=\x22http'+'://www.w3.'+'org/2000/s'+'vg\x22\x20height'+'=\x2218\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'\x22><path\x20d='+'\x22M280-120q'+'-33\x200-56.5'+'-23.5T200-'+'200v-520q-'+'17\x200-28.5-'+'11.5T160-7'+'60q0-17\x2011'+'.5-28.5T20'+'0-800h160q'+'0-17\x2011.5-'+'28.5T400-8'+'40h160q17\x20'+'0\x2028.5\x2011.'+'5T600-800h'+'160q17\x200\x202'+'8.5\x2011.5T8'+'00-760q0\x201'+'7-11.5\x2028.'+'5T760-720v'+'520q0\x2033-2'+'3.5\x2056.5T6'+'80-120H280'+'Zm400-600H'+'280v520h40'+'0v-520ZM40'+'0-280q17\x200'+'\x2028.5-11.5'+'T440-320v-'+'280q0-17-1'+'1.5-28.5T4'+'00-640q-17'+'\x200-28.5\x2011'+'.5T360-600'+'v280q0\x2017\x20'+'11.5\x2028.5T'+'400-280Zm1'+'60\x200q17\x200\x20'+'28.5-11.5T'+'600-320v-2'+'80q0-17-11'+'.5-28.5T56'+'0-640q-17\x20'+'0-28.5\x2011.'+'5T520-600v'+'280q0\x2017\x201'+'1.5\x2028.5T5'+'60-280ZM28'+'0-720v520-'+'520Z\x22/></s'+'vg>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22loa'+'ding\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22i'+'nner\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20/*\x20定义旋'+'转动画\x20*/\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20@keyf'+'rames\x20rota'+'te360\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fr'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ransform:\x20'+'rotate(0de'+'g);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20to\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'form:\x20rota'+'te(360deg)'+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20:host\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x20calc(100'+'%\x20-\x201px);\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20ca'+'lc(100%\x20-\x20'+'1px);\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.co'+'ntainer\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'00%;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20positio'+'n:\x20relativ'+'e;\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.mai'+'n\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x20100%;\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20::slot'+'ted(glide-'+'dnr-item)\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20inline-'+'block;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20flex-sh'+'rink:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20user-'+'select:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'cursor:\x20au'+'to;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.al'+'ign-vector'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20col'+'or:\x20'))+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20font'+'-size:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lin'+'e-height:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20z-i'+'ndex:\x201000'+'04;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'line\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ali'+'gn-line-ve'+'rtical\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20border-'+'top:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.align-li'+'ne-horizon'+'tal\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-lef'+'t:\x20solid\x201'+'px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'reference-'+'lines_sele'+'cted\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.line\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100002;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20visibi'+'lity:\x20hidd'+'en;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20&.left,\x20&'+'.right\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20&:'+'hover\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20cu'+'rsor:\x20ew-r'+'esize;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20&::b'+'efore\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20co'+'ntent:\x20\x27\x27;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20left:\x20')+Math['floor'](lineSize/(-4505+-6706+0x2bcd))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x20100%;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op,\x20&.bott'+'om\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&:hove'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20cursor'+':\x20ns-resiz'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20&::befor'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20conten'+'t:\x20\x27\x27;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lef'+'t:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x20')+Math['floor'](lineSize/(-16*0x1af+-9440+-2*-8169))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+':\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.vector\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20display'+':\x20inline-b'+'lock;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border:\x20so'+'lid\x201px\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'#ffffff;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20z-ind'+'ex:\x20100003'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.top'+'-left,\x20&.b'+'ottom-righ'+'t\x20{\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20se-resize'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op-right,\x20'+'&.bottom-l'+'eft\x20{\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&:hov'+'er\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20nesw-re'+'size;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.re'+'ference-li'+'nes_drag\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20w'+'idth:\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x200px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20top:\x200px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20border:\x20s'+'olid\x201px\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20z-in'+'dex:\x2011;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20rgba('+'73,\x207,\x20218'+',\x20.05);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'toolbar\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20')+(this['toolbarPla'+'cement']==='float'?'inline':'block')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20posi'+'tion:\x20abso'+'lute;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'top:\x20')+(this['toolbarPla'+'cement']==='float'?-9402+-4861*-1+0xef*0x13:'10px')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20')+(this['toolbarPla'+'cement']==='float'?'':'width:\x20100'+'%;')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ext-align:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20ponter-'+'events:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20z-'+'index:\x20100'+'005;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.inner\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-flex;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20gap:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'padding:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-rad'+'ius:\x208px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20tran'+'slate:\x200px'+'\x200px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20rgba(2'+'55,255,255'+',.5);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backdrop'+'-filter:\x20b'+'lur(25px);'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20box'+'-shadow:\x200'+'\x204px\x206px\x20-'+'1px\x20rgb(0\x20'+'0\x200\x20/\x200.1)'+',\x200\x202px\x204p'+'x\x20-2px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20ponter'+'-events:\x20a'+'uto;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.group\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20gap:\x204px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'align-item'+'s:\x20center;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.div'+'ider\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20wid'+'th:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20#D1D5'+'DC;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.toolba'+'r-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20in'+'line-flex;'+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20padding:\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20pointer'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20#F3'+'F4F6;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20&'+':active\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20#E5E7E'+'B;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&.acti'+'ve\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.too'+'lbar-item\x20'+'{\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20'))+this['colorPrima'+'ry']+(';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20svg\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20#ffffff;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20.m'+'easure-lin'+'es\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0006;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.solid\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ite'+'m\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20left:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100005;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x204px\x2012'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'y;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'bottom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.b'+'ottom\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x204px'+'\x2012px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-y;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20bottom,'+'\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.l'+'eft\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'size:\x2012px'+'\x204px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-rep'+'eat:\x20repea'+'t-x;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-imag'+'e:\x20linear-'+'gradient(t'+'o\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.r'+'ight\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x2012p'+'x\x204px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-x;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.da'+'shed\x20{\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.item\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'visibility'+':\x20hidden;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20left:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0005;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.hor'+'izontal-to'+'p\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x2012px\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.horiz'+'ontal-bott'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x201px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground-s'+'ize:\x2012px\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-repe'+'at:\x20repeat'+'-x;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-image'+':\x20linear-g'+'radient(to'+'\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-left\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x201p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-size:\x20'+'4px\x2012px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-repeat:\x20r'+'epeat-y;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'image:\x20lin'+'ear-gradie'+'nt(to\x20bott'+'om,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-right\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-size:'+'\x204px\x2012px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20backgroun'+'d-repeat:\x20'+'repeat-y;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-image:\x20li'+'near-gradi'+'ent(to\x20bot'+'tom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.number'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20v'+'isibility:'+'\x20hidden;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20top:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'font-size:'+'\x2010px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20padding'+':2px\x204px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-radiu'+'s:\x204px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20color:'+'\x20#FFFFFF;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.measur'+'e-target-o'+'utline\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20visibil'+'ity:\x20hidde'+'n;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bor'+'der:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20box-'+'sizing:\x20bo'+'rder-box;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20pointer'+'-events:\x20n'+'one\x20!impor'+'tant;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'z-index:\x201'+'00006;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.actio'+'ns\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20a'+'bsolute;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20left:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.action'+'s-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20paddi'+'ng:\x204px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20translate'+':\x200px\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kdrop-filt'+'er:\x20blur(2'+'5px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20z-index:'+'\x20100004;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20line-'+'height:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20cur'+'sor:\x20point'+'er;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20svg\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&:h'+'over\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:activ'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20')+colors['redActive']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'loading\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20width:\x20'+'100%;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x2010'+'0%;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'rgba(255,2'+'55,255,.5)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'drop-filte'+'r:\x20blur(25'+'px);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20fl'+'ex;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20al'+'ign-items:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20z-index'+':\x20100007;\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20.inne'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'relative;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r:\x202px\x20sol'+'id\x20#4907DA'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-top-c'+'olor:\x20rgba'+'(0,\x200,\x200,\x20'+'0.2);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20border-r'+'ight-color'+':\x20rgba(0,\x20'+'0,\x200,\x200.2)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-botto'+'m-color:\x20r'+'gba(0,\x200,\x20'+'0,\x200.2);\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'100%;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20animati'+('on:\x20rotate'+'360\x20infini'+'te\x200.75s\x20l'+'inear;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20.s'+'lot\x20{}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20'));}['onceBindin'+'gs'](){const _0x30edab=this['shadowRoot'];if(_0x30edab===null)return;let _0x254378=_0x30edab['querySelec'+'tor']('.main');if(_0x254378!==null&&_0x254378!==undefined){const {width:_0x3278c2,height:_0x1f77bc}=_0x254378['getBoundin'+'gClientRec'+'t']();this['registered']['main']={'id':'main','el':_0x254378,'x':0x0,'y':0x0,'width':_0x3278c2,'height':_0x1f77bc,'type':'main'};}this['isToolbar']&&(_0x254378=_0x30edab['querySelec'+'tor']('.toolbar'),_0x254378!==null&&(this['elToolbar']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.aligns'),_0x254378!==null&&(this['elAligns']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure'),_0x254378!==null&&(this['elMeasure']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-t'+'arget-outl'+'ine'),_0x254378!==null&&(this['elMeasureO'+'utline']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.top'),_0x254378!==null&&(this['elMeasureL'+'ines']['solid_t']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.bott'+'om'),_0x254378!==null&&(this['elMeasureL'+'ines']['solid_b']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.left'),_0x254378!==null&&(this['elMeasureL'+'ines']['solid_l']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.righ'+'t'),_0x254378!==null&&(this['elMeasureL'+'ines']['solid_r']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-top'),_0x254378!==null&&(this['elMeasureL'+'ines']['dashed_h_t']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-bot'+'tom'),_0x254378!==null&&(this['elMeasureL'+'ines']['dashed_h_b']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-left'),_0x254378!==null&&(this['elMeasureL'+'ines']['dashed_v_l']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-right'),_0x254378!==null&&(this['elMeasureL'+'ines']['dashed_v_r']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-top'),_0x254378!==null&&(this['elMeasureL'+'ines']['numberT']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-bottom'),_0x254378!==null&&(this['elMeasureL'+'ines']['numberB']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-left'),_0x254378!==null&&(this['elMeasureL'+'ines']['numberL']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-right'),_0x254378!==null&&(this['elMeasureL'+'ines']['numberR']=_0x254378)),_0x254378=_0x30edab['querySelec'+'tor']('.left'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'l')&&(this['elSelected'+'Lines']['l']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.right'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'r')&&(this['elSelected'+'Lines']['r']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.top'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'t')&&(this['elSelected'+'Lines']['t']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.bottom'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'b')&&(this['elSelected'+'Lines']['b']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.top-left'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'tl')&&(this['elSelected'+'Vectors']['tl']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.top-right'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'tr')&&(this['elSelected'+'Vectors']['tr']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.bottom-le'+'ft'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'bl')&&(this['elSelected'+'Vectors']['bl']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.bottom-ri'+'ght'),_0x254378!==null&&!HasOwn(this['elSelected'+'Lines'],'br')&&(this['elSelected'+'Vectors']['br']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('.reference'+'-lines_dra'+'g'),_0x254378!==null&&this['rDrags']===null&&(this['rDrags']=_0x254378),_0x254378=_0x30edab['querySelec'+'tor']('#actions'),_0x254378!==null&&(this['elActions']=_0x254378);}['countLoadi'+'ngItems'](){const _0x2d30cb=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x2d30cb===null||_0x2d30cb===undefined)return;const _0x254188=_0x2d30cb['assignedNo'+'des']({'flatten':![]});for(const _0x1ccffa in _0x254188){const _0x40ecd9=_0x254188[_0x1ccffa];if(_0x40ecd9['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x994e0=_0x40ecd9['getAttribu'+'te']('type');_0x994e0==='image'&&this['loadingIte'+'ms']['image']['total']++,(_0x994e0===null||_0x994e0==='general')&&this['loadingIte'+'ms']['general']['total']++;}}['hideLoadin'+'g'](){console['log']('this.loadi'+'ngItems.ge'+'neral.load'+'ed:\x20',this['loadingIte'+'ms']['general']['loaded']),console['log']('this.loadi'+'ngItems.ge'+'neral.tota'+'l:\x20',this['loadingIte'+'ms']['general']['total']),console['log']('this.loadi'+'ngItems.im'+'age.loaded'+':\x20',this['loadingIte'+'ms']['image']['loaded']),console['log']('this.loadi'+'ngItems.im'+'age.total:'+'\x20',this['loadingIte'+'ms']['image']['total']);if(this['loadingIte'+'ms']['general']['loaded']===this['loadingIte'+'ms']['general']['total']&&this['loadingIte'+'ms']['image']['loaded']===this['loadingIte'+'ms']['image']['total']){const _0x21bbd2=this['shadowRoot']?.['querySelec'+'tor']('.loading');_0x21bbd2!==null&&_0x21bbd2!==undefined&&(_0x21bbd2['style']['display']='none');}}['renderItem'+'s'](){const _0x134ea3=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x134ea3===null||_0x134ea3===undefined)return;const _0x3e6700=_0x134ea3['assignedNo'+'des']({'flatten':![]});for(const _0x13647c in _0x3e6700){const _0x119528=_0x3e6700[_0x13647c];if(_0x119528['nodeType']!==Node['ELEMENT_NO'+'DE']){this['hideLoadin'+'g']();continue;}const _0xc290de=_0x119528['getAttribu'+'te']('type');(_0xc290de===null||_0xc290de==='general')&&(this['renderItem'](_0x119528),this['hideLoadin'+'g']());if(_0xc290de==='image'){if(_0x119528['querySelec'+'tor']('canvas'))continue;this['renderImag'+'eItem'](_0x119528)['then'](()=>{this['hideLoadin'+'g']();});}}}['renderItem'](_0x3e9ddf){const _0x55f415=_0x3e9ddf['getBoundin'+'gClientRec'+'t']();let _0x13d81f=_0x55f415['width'],_0x1cbf43=_0x55f415['height'];const _0x7bd6d3=_0x3e9ddf['getAttribu'+'te']('left'),_0x497c0d=_0x3e9ddf['getAttribu'+'te']('top'),_0x33a51f=_0x3e9ddf['getAttribu'+'te']('width'),_0x1b2a3e=_0x3e9ddf['getAttribu'+'te']('height');let _0x5612c1=-3806+0x592+-68*-35,_0x58984a=0x1684+-410+0x2*-2677;_0x7bd6d3!==null&&(_0x5612c1=_0x7bd6d3);_0x497c0d!==null&&(_0x58984a=_0x497c0d);_0x33a51f!==null&&(_0x13d81f=_0x33a51f);_0x1b2a3e!==null&&(_0x1cbf43=_0x1b2a3e);if(_0x3e9ddf['style']['translate']!==''){const _0x5d0b5f=window['getCompute'+'dStyle'](_0x3e9ddf),_0x30327e=this['getTransla'+'tePos'](_0x5d0b5f['translate']);_0x5612c1=_0x30327e['x'],_0x58984a=_0x30327e['y'];}_0x5612c1=Math['round'](_0x5612c1),_0x58984a=Math['round'](_0x58984a),_0x13d81f=Math['round'](_0x13d81f),_0x1cbf43=Math['round'](_0x1cbf43),this['registered'][_0x3e9ddf['id']]={'id':_0x3e9ddf['id'],'el':_0x3e9ddf,'x':_0x5612c1,'y':_0x58984a,'width':_0x13d81f,'height':_0x1cbf43,'type':'general'},this['loadingIte'+'ms']['general']['loaded']++,_0x3e9ddf['style']['visibility']='visible',_0x3e9ddf['style']['translate']=_0x5612c1+'px\x20'+_0x58984a+'px',_0x3e9ddf['style']['width']=_0x13d81f+'px',_0x3e9ddf['style']['height']=_0x1cbf43+'px';}['renderImag'+'eItem'](_0xae19c9){return new Promise(_0x3f1395=>{if(_0xae19c9['nodeType']===Node['ELEMENT_NO'+'DE']){const _0xca4f3b=document['createElem'+'ent']('canvas');_0xca4f3b['style']['cssText']='width:\x20100'+'%;\x20height:'+'\x20100%;';const _0x128795=_0xca4f3b['getContext']('2d'),_0x17dfb7=_0xae19c9['querySelec'+'tor']('img'),_0x1e412b=new Image();_0x1e412b['src']=_0x17dfb7['src'];const _0x885de7=_0xae19c9['getElement'+'sByTagName']('img');Array['from'](_0x885de7)['forEach'](_0x13dca5=>{_0x13dca5['remove']();}),_0x1e412b['onload']=()=>{let _0x32b98f=0x1317+-68*0x22+-2575,_0x32ca5b=0x11d*0xf+-26*-25+-4925;const _0xf36f50=_0xae19c9['getAttribu'+'te']('left'),_0x3be31a=_0xae19c9['getAttribu'+'te']('top'),_0x93175a=_0xae19c9['getAttribu'+'te']('width'),_0x5a94ca=_0xae19c9['getAttribu'+'te']('height');_0xf36f50!==null&&(_0x32b98f=_0xf36f50);_0x3be31a!==null&&(_0x32ca5b=_0x3be31a);if(_0xae19c9['style']['translate']!==''){const _0x433bc4=window['getCompute'+'dStyle'](_0xae19c9),_0x588360=this['getTransla'+'tePos'](_0x433bc4['translate']);_0x32b98f=_0x588360['x'],_0x32ca5b=_0x588360['y'];}const _0x4c3460=_0x1e412b['width']/_0x1e412b['height'];let _0x21a424=_0x1e412b['width'],_0x55959a=_0x1e412b['height'];if(_0x93175a!==null&&_0x5a94ca!==null)_0x21a424=_0x93175a,_0x55959a=_0x21a424/_0x4c3460,_0xae19c9['style']['width']=Math['round'](_0x21a424)+'px',_0xae19c9['style']['height']=Math['round'](_0x55959a)+'px';else {if(_0x93175a!==null&&_0x5a94ca===null)_0x21a424=_0x93175a,_0x55959a=_0x21a424/_0x4c3460,_0xae19c9['style']['width']=Math['round'](_0x21a424)+'px',_0xae19c9['style']['height']=Math['round'](_0x55959a)+'px';else _0x93175a===null&&_0x5a94ca!==null?(_0x55959a=_0x5a94ca,_0x21a424=_0x55959a*_0x4c3460,_0xae19c9['style']['width']=Math['round'](_0x21a424)+'px',_0xae19c9['style']['height']=Math['round'](_0x55959a)+'px'):(_0xae19c9['style']['width']=Math['round'](_0x21a424)+'px',_0xae19c9['style']['height']=Math['round'](_0x55959a)+'px');}_0x32b98f=Math['round'](_0x32b98f),_0x32ca5b=Math['round'](_0x32ca5b),_0x21a424=Math['round'](_0x21a424),_0x55959a=Math['round'](_0x55959a),this['registered'][_0xae19c9['id']]={'id':_0xae19c9['id'],'el':_0xae19c9,'x':_0x32b98f,'y':_0x32ca5b,'width':_0x21a424,'height':_0x55959a,'type':'image'};const _0x4a434c=Math['min'](window['innerWidth']/_0x1e412b['width'],window['innerHeigh'+'t']/_0x1e412b['height']),_0x41b4c9=Math['round'](_0x1e412b['width']*_0x4a434c),_0xfaa196=Math['round'](_0x1e412b['height']*_0x4a434c);_0xca4f3b['width']=_0x41b4c9,_0xca4f3b['height']=_0xfaa196,_0x128795?.['drawImage'](_0x1e412b,0x2357+0xb1f+-2*0x173b,0x25e+0x7d*-75+0x2241,_0x41b4c9,_0xfaa196),_0xae19c9['appendChil'+'d'](_0xca4f3b),this['selected']['ids']['length']>-5687+-1*0x26b3+0x3cea&&(this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()),this['loadingIte'+'ms']['image']['loaded']++,_0xae19c9['style']['visibility']='visible',_0xae19c9['style']['translate']=_0x32b98f+'px\x20'+_0x32ca5b+'px',_0xae19c9['style']['width']=_0x21a424+'px',_0xae19c9['style']['height']=_0x55959a+'px',_0x3f1395('');};}});}['initKeyboa'+'rdEvents'](){document['addEventLi'+'stener']('keydown',_0x5df33d=>{requestAnimationFrame(()=>{switch(_0x5df33d['keyCode']){case 0x1534+0x1ef2+-13313:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x5a30b6 of this['selected']['ids']){this['registered'][_0x5a30b6]['x']--,this['registered'][_0x5a30b6]['el']['style']['translate']=this['registered'][_0x5a30b6]['x']+'px\x20'+this['registered'][_0x5a30b6]['y']+'px';}this['selected']['x']--;}break;case  -1382+-365*-8+-1500:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x31eb5e of this['selected']['ids']){this['registered'][_0x31eb5e]['y']--,this['registered'][_0x31eb5e]['el']['style']['translate']=this['registered'][_0x31eb5e]['x']+'px\x20'+this['registered'][_0x31eb5e]['y']+'px';}this['selected']['y']--;}break;case 0x1629+-3140+0x1*-2494:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x1047d7 of this['selected']['ids']){this['registered'][_0x1047d7]['x']++,this['registered'][_0x1047d7]['el']['style']['translate']=this['registered'][_0x1047d7]['x']+'px\x20'+this['registered'][_0x1047d7]['y']+'px';}this['selected']['x']++;}break;case 0x2692+-1141*0x2+-7552*0x1:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x51e628 of this['selected']['ids']){this['registered'][_0x51e628]['y']++,this['registered'][_0x51e628]['el']['style']['translate']=this['registered'][_0x51e628]['x']+'px\x20'+this['registered'][_0x51e628]['y']+'px';}this['selected']['y']++;}break;}this['renderSele'+'ctedRefere'+'nce'](),this['measureExe'+'cute']();this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position']();const _0x13454e=new CustomEvent('onChange',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x13454e);});});}['onSlotChan'+'ge'](){const _0x46e5f7=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x46e5f7===null||_0x46e5f7===undefined)return;_0x46e5f7?.['addEventLi'+'stener']('slotchange',()=>{this['countLoadi'+'ngItems'](),this['renderItem'+'s'](),!this['isInit']&&(this['onceBindin'+'gs'](),this['isInit']=!![]);});}['getSelecte'+'dParams'](){let _0x29397e={'x':0x0,'y':0x0},_0x1bb3dd={'x':0x0,'y':0x0};for(let _0x18be0e=-5167+-1*-6661+-3*0x1f2;_0x18be0e<this['selected']['ids']['length'];_0x18be0e++){const _0x19a668=this['selected']['ids'][_0x18be0e];if(_0x18be0e===-2733+-101*0xb+0xf04)_0x29397e={'x':this['registered'][_0x19a668]['x'],'y':this['registered'][_0x19a668]['y']},_0x1bb3dd={'x':this['registered'][_0x19a668]['x']+this['registered'][_0x19a668]['width'],'y':this['registered'][_0x19a668]['y']+this['registered'][_0x19a668]['height']};else {const _0x4a1a28=this['registered'][_0x19a668]['x'],_0x4c5311=this['registered'][_0x19a668]['y'];_0x29397e={'x':_0x4a1a28<_0x29397e['x']?_0x4a1a28:_0x29397e['x'],'y':_0x4c5311<_0x29397e['y']?_0x4c5311:_0x29397e['y']};const _0x5f25b3=this['registered'][_0x19a668]['x']+this['registered'][_0x19a668]['width'],_0x6075dd=this['registered'][_0x19a668]['y']+this['registered'][_0x19a668]['height'];_0x1bb3dd={'x':_0x5f25b3>=_0x1bb3dd['x']?_0x5f25b3:_0x1bb3dd['x'],'y':_0x6075dd>=_0x1bb3dd['y']?_0x6075dd:_0x1bb3dd['y']};}}const _0x3c4303=_0x1bb3dd['x']-_0x29397e['x'],_0x4830c9=_0x1bb3dd['y']-_0x29397e['y'];this['selected']={...this['selected'],...{'x':_0x29397e['x'],'y':_0x29397e['y'],'width':_0x3c4303,'height':_0x4830c9}};}['renderSele'+'ctedRefere'+'nce'](){this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-1396+-8360+0x261e*0x1)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['l']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(-6137*-1+-7*0x4b1+0x8e0)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-6011*0x1+0x1*0x3fb+0x1382))+'px',this['elSelected'+'Lines']['t']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-9749+-5764+0x3c9b))+'px',this['elSelected'+'Lines']['b']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';}['isSelected'+'Item'](_0x398ee6,_0x95ea92){const _0x131b82=[{'x':_0x398ee6['x'],'y':_0x398ee6['y']},{'x':_0x398ee6['x']+_0x398ee6['width'],'y':_0x398ee6['y']},{'x':_0x398ee6['x'],'y':_0x398ee6['y']+_0x398ee6['height']},{'x':_0x398ee6['x']+_0x398ee6['width'],'y':_0x398ee6['y']+_0x398ee6['height']}];for(let _0x1163b0=-6649+0xa8e+0xf6b;_0x1163b0<_0x131b82['length'];_0x1163b0++){const _0x1e2d3f=_0x131b82[_0x1163b0];if(this['isPointInR'+'ectangle'](_0x1e2d3f,_0x95ea92))return !![];}return ![];}['renderDrag'+'SelectRefe'+'renceLine'](_0xc4854e,_0x3b16ba){const _0x4c7c9f=this['shadowRoot'];if(_0x4c7c9f===null)return;const _0x1b70a0=_window['getCompute'+'dStyle'](this['rDrags']);_0x1b70a0['visibility']!=='visible'&&(this['rDrags']['style']['visibility']='visible');dragBeginPos['x']===-1&&(dragBeginPos['x']=_0xc4854e['clientX'],dragBeginPos['y']=_0xc4854e['clientY']);const _0x203942={'x':dragBeginPos['x'],'y':dragBeginPos['y']},_0x31216d={'x':-1,'y':-1,'width':0x0,'height':0x0};_0xc4854e['clientX']>_0x203942['x']?(_0x31216d['x']=_0x203942['x']-_0x3b16ba['x'],_0x31216d['width']=_0xc4854e['clientX']-_0x203942['x']):(_0x31216d['x']=_0xc4854e['clientX']-_0x3b16ba['x'],_0x31216d['width']=_0x203942['x']-_0xc4854e['clientX']);_0xc4854e['clientY']>_0x203942['y']?(_0x31216d['y']=_0x203942['y']-_0x3b16ba['y'],_0x31216d['height']=_0xc4854e['clientY']-_0x203942['y']):(_0x31216d['y']=_0xc4854e['clientY']-_0x3b16ba['y'],_0x31216d['height']=_0x203942['y']-_0xc4854e['clientY']);this['rDrags']['style']['translate']=_0x31216d['x']+'px\x20'+_0x31216d['y']+'px',this['rDrags']['style']['width']=_0x31216d['width']+'px',this['rDrags']['style']['height']=_0x31216d['height']+'px';const _0x14be93=_0x4c7c9f['querySelec'+'tor']('slot');if(_0x14be93===null)return;const _0x52ed6e=Object['values'](_0x5e35a6(this['registered']));for(let _0x48d74a=0x4*0x41c+-5921+0x6b1;_0x48d74a<_0x52ed6e['length'];_0x48d74a++){if(this['isSelected'+'Item'](_0x52ed6e[_0x48d74a],_0x31216d)){if(_0x52ed6e[_0x48d74a]['id']==='main')continue;this['selected']['ids']['indexOf'](_0x52ed6e[_0x48d74a]['id'])===-1&&this['selected']['ids']['push'](_0x52ed6e[_0x48d74a]['id']);}else {const _0x51e638=this['selected']['ids']['indexOf'](_0x52ed6e[_0x48d74a]['id']);_0x51e638!==-1&&this['selected']['ids']['splice'](_0x51e638,0x2*0x712+0xd*-419+-1828*-1);}}this['selected']['ids']['length']>0x59*-80+0x21a+0x19b6?this['triggerSel'+'ectedLines'+'Vectors']('show'):this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0xf8afbd=this['selected']['ids']['map'](_0x2e18a5=>{return {'id':_0x2e18a5,'type':this['registered'][_0x2e18a5]['type']};}),_0x3a844b=new CustomEvent('onSelect',{'detail':_0xf8afbd});this['dispatchEv'+'ent'](_0x3a844b),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['isPointInR'+'ectangle'](_0x46b22c,_0x303c9f){if(_0x46b22c['x']>_0x303c9f['x']&&_0x46b22c['x']<_0x303c9f['x']+_0x303c9f['width']&&_0x46b22c['y']>_0x303c9f['y']&&_0x46b22c['y']<_0x303c9f['y']+_0x303c9f['height'])return !![];return ![];}['handleClic'+'k'](){const _0xe50ed4=this['shadowRoot'];if(_0xe50ed4===null)return;_0xe50ed4['addEventLi'+'stener']('mousedown',_0x207bb8=>{_0x207bb8['preventDef'+'ault']();const _0x45ad78=this['shadowRoot'];if(_0x45ad78===null)return;const _0x21cba1=new CustomEvent('onMouseDow'+'n',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x21cba1),this['hasMoved']=![],this['hasSelecte'+'d']=![],this['latestSele'+'cted']=_0x5e35a6(this['selected']);const _0x3db558=this['getBoundin'+'gClientRec'+'t'](),_0x22f6f2={'x':_0x207bb8['clientX']-_0x3db558['x'],'y':_0x207bb8['clientY']-_0x3db558['y']},_0x327a63=_0x207bb8['target']['closest']('glide-dnr-'+'item');let _0x440e5e='';this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0xe41*-2+0xea4+0xdde,this['elMeasureO'+'utline']['style']['height']=-1649+0x7+0x335*0x2,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');this['isActions']&&(this['elActions']['style']['visibility']='hidden',this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['removeEven'+'tListener']('click',this['delete']));if(_0x327a63)this['mouseTarge'+'t']='elements',this['mouseDownE'+'lement'](_0x327a63);else {if(_0x207bb8['target']['closest']('.line')){this['mouseTarge'+'t']='line';if(_0x207bb8['target']['classList']['contains']('left'))_0x440e5e='l';else {if(_0x207bb8['target']['classList']['contains']('right'))_0x440e5e='r';else {if(_0x207bb8['target']['classList']['contains']('top'))_0x440e5e='t';else _0x207bb8['target']['classList']['contains']('bottom')&&(_0x440e5e='b');}}}else {if(_0x207bb8['target']['closest']('.vector')){this['mouseTarge'+'t']='vector';if(_0x207bb8['target']['classList']['contains']('top-left'))_0x440e5e='tl';else {if(_0x207bb8['target']['classList']['contains']('top-right'))_0x440e5e='tr';else {if(_0x207bb8['target']['classList']['contains']('bottom-lef'+'t'))_0x440e5e='bl';else _0x207bb8['target']['classList']['contains']('bottom-rig'+'ht')&&(_0x440e5e='br');}}}else {if(_0x207bb8['target']['closest']('.actions-i'+'tem'))this['triggerAct'+'ions']();else {if(_0x207bb8['target']['closest']('.toolbar-i'+'tem'))_0x207bb8['target']['closest']('.horizonta'+'l-left')&&this['shortcuts']('horizontal','begin'),_0x207bb8['target']['closest']('.horizonta'+'l-center')&&this['shortcuts']('horizontal','middle'),_0x207bb8['target']['closest']('.horizonta'+'l-right')&&this['shortcuts']('horizontal','end'),_0x207bb8['target']['closest']('.horizonta'+'l-distribu'+'te')&&this['shortcuts']('horizontal','distribute'),_0x207bb8['target']['closest']('.vertical-'+'top')&&this['shortcuts']('vertical','begin'),_0x207bb8['target']['closest']('.vertical-'+'center')&&this['shortcuts']('vertical','middle'),_0x207bb8['target']['closest']('.vertical-'+'bottom')&&this['shortcuts']('vertical','end'),_0x207bb8['target']['closest']('.vertical-'+'distribute')&&this['shortcuts']('vertical','distribute'),_0x207bb8['target']['closest']('.measure')&&this['shortcuts']('','measure');else _0x3db558&&(this['mouseTarge'+'t']='elements',this['isInSelect'+'ed']=this['isPointInR'+'ectangle'](_0x22f6f2,this['selected']),!this['isInSelect'+'ed']&&(this['selected']=_0x5e35a6(originSelected),this['renderSele'+'ctedRefere'+'nce']()));}}}}this['selected']['ids']['length']>0x1044*0x1+-1*-4059+-8223&&(this['hasSelecte'+'d']=!![]);const _0x3c1fb0={'x':Math['round'](_0x207bb8['clientX']-this['selected']['x']),'y':Math['round'](_0x207bb8['clientY']-this['selected']['y'])},_0x2262fb={'x':Math['round'](_0x207bb8['clientX']),'y':Math['round'](_0x207bb8['clientY'])},_0x596e85=_0x5e35a6(this['selected']),_0x57f911=_0x5e35a6(this['registered']),_0x34f291=_0x596e85['width']/_0x596e85['height'];document['onmousemov'+'e']=_0x9a8a39=>{_0x9a8a39['preventDef'+'ault'](),_0x9a8a39['stopPropag'+'ation'](),this['mouseMoveT'+'ype']='main',this['hasMoved']=!![],this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['requestAni'+'mation']=requestAnimationFrame(()=>{this['isToolbar']&&(this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));const _0x21df6f={'x':Math['round'](_0x9a8a39['clientX']),'y':Math['round'](_0x9a8a39['clientY'])};switch(this['mouseTarge'+'t']){case 'elements':this['hasSelecte'+'d']&&this['isInSelect'+'ed']?(this['moveElemen'+'ts']({'x':Math['round'](_0x9a8a39['clientX']),'y':Math['round'](_0x9a8a39['clientY'])},_0x3c1fb0,_0x57f911),this['referenceA'+'lignLinesV'+'ectors'](_0x57f911,_0x596e85)):this['renderDrag'+'SelectRefe'+'renceLine'](_0x9a8a39,_0x3db558);break;case 'line':this['moveLines'](_0x440e5e,_0x57f911,_0x596e85,_0x2262fb,_0x21df6f);break;case 'vector':this['moveVector'+'s'](_0x440e5e,_0x57f911,_0x596e85,_0x2262fb,_0x21df6f,_0x34f291);break;}});},document['onmouseup']=()=>{document['onmousemov'+'e']=null,document['onmouseup']=null;this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']);this['mouseUpEle'+'ment'](_0x57f911);const _0x437de7=new CustomEvent('onMouseUp',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x437de7);};});}['getTransla'+'tePos'](_0x5a04f9){let _0x2ae156=-1,_0x2387fa=-1;if(_0x5a04f9!=='none'){if(_0x5a04f9['indexOf']('\x20')>-1){const _0x2e6f42=_0x5a04f9['split']('\x20');_0x2ae156=parseFloat(_0x2e6f42[-6076*-1+-8*0x2c2+-428]['replace']('px','')),_0x2387fa=parseFloat(_0x2e6f42[0x2d*-35+-5778*0x1+0x1cba]['replace']('px',''));}else _0x2ae156=parseFloat(_0x5a04f9['replace']('px',''));}return {'x':_0x2ae156,'y':_0x2387fa};}['mouseDownE'+'lement'](_0x42f59c){if(this['selected']['ids']['indexOf'](_0x42f59c['id'])===-1){this['selected']['ids']=[_0x42f59c['id']];const _0x5522d1=this['selected']['ids']['map'](_0x1461b8=>{return {'id':_0x1461b8,'type':this['registered'][_0x1461b8]['type']};}),_0x3495a2=new CustomEvent('onSelect',{'detail':_0x5522d1});this['dispatchEv'+'ent'](_0x3495a2),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}this['isInSelect'+'ed']=!![];if(this['lastClickT'+'ime']===-1)this['lastClickT'+'ime']=new Date()['getTime']();else {const _0x727834=new Date()['getTime']()-this['lastClickT'+'ime'];if(_0x727834>-2990+0xba4+0xb9)this['lastClickT'+'ime']=new Date()['getTime']();else {this['lastClickT'+'ime']=-1;if(this['selected']['ids']['indexOf'](_0x42f59c['id'])>-1){this['selected']['ids']=[_0x42f59c['id']];const _0x40db43=this['selected']['ids']['map'](_0x4e3551=>{return {'id':_0x4e3551,'type':this['registered'][_0x4e3551]['type']};}),_0x4782f8=new CustomEvent('onSelect',{'detail':_0x40db43});this['dispatchEv'+'ent'](_0x4782f8),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}}}}['mouseUpEle'+'ment'](_0x5c2a36){if(this['hasMoved']){this['lastClickT'+'ime']=-1,dragBeginPos={'x':-1,'y':-1},this['rDrags']['style']['visibility']='hidden',this['rDrags']['style']['translate']='-1px\x20-1px',this['rDrags']['style']['width']='0',this['rDrags']['style']['height']='0';if(this['mouseTarge'+'t']==='elements')for(let _0x4a845e of this['selected']['ids']){this['registered'][_0x4a845e]['x']=_0x5c2a36[_0x4a845e]['x'],this['registered'][_0x4a845e]['y']=_0x5c2a36[_0x4a845e]['y'];}(this['mouseTarge'+'t']==='line'||this['mouseTarge'+'t']==='vector')&&(this['registered']=_0x5e35a6(_0x5c2a36),this['getSelecte'+'dParams']());const _0x2f05f0=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor');_0x2f05f0!==undefined&&_0x2f05f0['forEach'](_0xe5c797=>{_0xe5c797['remove']();});const _0x2e3ffa=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e');_0x2e3ffa!==undefined&&_0x2e3ffa['forEach'](_0x3b316f=>{_0x3b316f['remove']();});}if(this['selected']['ids']['length']>0x2cd*0x6+-756*-4+-7326)this['isToolbar']&&!(this['selected']['ids']['length']===0x111b*-1+0x2*-697+0x168e&&!this['isMeasure'])&&(this['selected']['ids']['length']>0x122b+-3307*-1+-7957?this['elAligns']['style']['display']!=='inline-fle'+'x'&&(this['elAligns']['style']['display']='inline-fle'+'x'):this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='inline-fle'+'x'&&(this['elMeasure']['style']['display']='inline-fle'+'x')),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position'](),this['elToolbar']['style']['visibility']!=='visible'&&(this['elToolbar']['style']['visibility']='visible')),this['triggerSel'+'ectedLines'+'Vectors']('show');else {this['isToolbar']&&!(this['selected']['ids']['length']===-73*-5+-5169+0x12c5&&!this['isMeasure'])&&(this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='none'&&(this['elMeasure']['style']['display']='none')),this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x5c1bb3=new CustomEvent('onSelect',{'detail':{}});this['dispatchEv'+'ent'](_0x5c1bb3);}this['mouseMoveT'+'ype']='',this['isActions']&&this['triggerAct'+'ions']();}['setToolbar'+'Position'](){const _0xeb7010=window['getCompute'+'dStyle'](this['elToolbar']),_0x1c136a=parseFloat(_0xeb7010['width']['replace']('px',''));this['elToolbar']['style']['translate']=this['selected']['x']+this['selected']['width']/(0xa1c+0x26*-48+-6*0x7f)-_0x1c136a/(-6118+0x1519+-1*-719)+'px\x20'+(this['selected']['y']-(0x5*0x739+0x158a+0x1*-14717))+'px';}['triggerAct'+'ions'](){this['selected']['ids']['length']>0x1*-7689+-1*0x1943+0x374c?(this['elActions']['style']['translate']=this['selected']['x']+this['selected']['width']+(0x3*-1297+-1*0xb00+0x1a39)+'px\x20'+this['selected']['y']+'px',this['elActions']['style']['visibility']='visible',this['elActions']['style']['pointerEve'+'nts']='auto',this['elActions']['addEventLi'+'stener']('click',this['delete'])):(this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['style']['visibility']='hidden',this['elActions']['removeEven'+'tListener']('click',this['delete']));}['moveElemen'+'ts'](_0x13f3b0,_0x2be3ca,_0x3b6baf){const _0x1b065d=_0x13f3b0['x']-_0x2be3ca['x'],_0x1a1ef9=_0x13f3b0['y']-_0x2be3ca['y'],_0x3e05b6=_0x1b065d+this['selected']['width'],_0x5e4419=_0x1a1ef9+this['selected']['height'],_0x55f936=this['registered']['main']['x']+this['registered']['main']['width'],_0x808900=this['registered']['main']['x']+this['registered']['main']['height'];this['selected']['x']=_0x1b065d,this['selected']['y']=_0x1a1ef9;_0x1b065d<=-8913+-3884+0x1*0x31fd&&(this['selected']['x']=0x25c8+-2*0x10b4+-1120);_0x3e05b6>=_0x55f936&&(this['selected']['x']=_0x55f936-this['selected']['width']);_0x1a1ef9<=0x2f*0x5b+-112*-19+-6405&&(this['selected']['y']=0x2*0xb18+-6316+0x27c);_0x5e4419>=_0x808900&&(this['selected']['y']=_0x808900-this['selected']['height']);this['triggerSel'+'ectedLines'+'Vectors']('hide'),this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-4*-1858+-8730+0x514)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x3c3+-3050+0x829)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-1515+0x1f*-219+-2*-4153))+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(-137*0x31+0x609+-235*-22))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';for(let _0x1c784d of this['selected']['ids']){this['selected']['ids']['length']===0x1*-1474+0x2*-3667+0x1*0x2269?(_0x3b6baf[_0x1c784d]['x']=this['selected']['x'],_0x3b6baf[_0x1c784d]['y']=this['selected']['y']):(_0x3b6baf[_0x1c784d]['x']=this['registered'][_0x1c784d]['x']-this['latestSele'+'cted']['x']+this['selected']['x'],_0x3b6baf[_0x1c784d]['y']=this['registered'][_0x1c784d]['y']-this['latestSele'+'cted']['y']+this['selected']['y']);_0x3b6baf[_0x1c784d]['el']['style']['translate']=_0x3b6baf[_0x1c784d]['x']+'px\x20'+_0x3b6baf[_0x1c784d]['y']+'px';const _0x2caee8=new CustomEvent('onChange',{'detail':{'id':_0x1c784d,'type':'drag','x':_0x3b6baf[_0x1c784d]['x'],'y':_0x3b6baf[_0x1c784d]['y'],'width':_0x3b6baf[_0x1c784d]['width'],'height':_0x3b6baf[_0x1c784d]['height']}});this['dispatchEv'+'ent'](_0x2caee8);}}['moveLines'](_0x46a365,_0x167c16,_0xb90dce,_0x2d4e6a,_0x1f024f){let _0x5b5909=0xd66+0x23bc+0x13*-662,_0x59eb0e=0x1*-9847+-5837+0x3d44,_0x42fb60=0x3*0x263+-5757+0xf54,_0x4a48a6=0x2142+-5693*0x1+-2821;_0x59eb0e=_0x1f024f['y']-(_0x1f024f['y']-_0xb90dce['y']);const _0x15295f=_0x1f024f['x']-_0x2d4e6a['x'],_0x3b0a3b=_0x1f024f['y']-_0x2d4e6a['y'],_0x39b4c0=_0x15295f/_0xb90dce['width'],_0xe26a98=_0x3b0a3b/_0xb90dce['height'];switch(_0x46a365){case 'l':_0x5b5909=_0xb90dce['x']+_0x15295f,_0x42fb60=_0xb90dce['x']-_0x5b5909+_0xb90dce['width'],this['elSelected'+'Lines']['l']['style']['translate']=_0x5b5909-(0x7*0x4dc+-25*-77+-10631+0.5)+'px\x20'+_0x59eb0e+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x42fb60+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5b5909-(0x2a*0x6a+0x7b0*-2+-514+0.5)+'px\x20'+(_0x59eb0e-(0x1a4a+-2*0x1191+0x8da+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x42fb60+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5b5909-(-5598+-7993*0x1+0x24f*0x17+0.5)+'px\x20'+(_0x59eb0e+_0xb90dce['height']-(0xc83+0x287*0x1+-26*0x94+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5b5909-(-9440+-4549+0x36a9)+'px\x20'+(_0x59eb0e-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5b5909-(-1352*0x7+0x3*0x142+0x2136)+'px\x20'+(_0x59eb0e+_0xb90dce['height']-vectorOffset)+'px';for(const _0x45997d of _0xb90dce['ids']){const _0x2de059=this['registered'][_0x45997d],_0x120adf=_0x2de059['width']*(0x24b8+0x11*-341+-2*0x709-_0x39b4c0),_0x242ea1=_0x2de059['x']+_0x15295f*(-3881*0x1+0x13cb+-395*0x3-(_0x2de059['x']-_0xb90dce['x'])/_0xb90dce['width']);_0x167c16[_0x45997d]['x']=_0x242ea1,_0x167c16[_0x45997d]['width']=_0x120adf,_0x2de059['el']['style']['width']=_0x120adf+'px',_0x2de059['el']['style']['translate']=_0x242ea1+'px\x20'+_0x2de059['y']+'px';const _0x3eb9e9=new CustomEvent('onChange',{'detail':{'id':_0x45997d,'type':'resize_lef'+'t','x':_0x167c16[_0x45997d]['x'],'y':_0x167c16[_0x45997d]['y'],'width':_0x167c16[_0x45997d]['width'],'height':_0x167c16[_0x45997d]['height']}});this['dispatchEv'+'ent'](_0x3eb9e9);}break;case 'r':_0x5b5909=_0xb90dce['x']+_0xb90dce['width'];_0x5b5909<=_0xb90dce['x']&&(_0x5b5909=_0xb90dce['x']);_0x42fb60=_0xb90dce['width']+_0x15295f;_0x42fb60<0x29d*-8+-1338+0x53a*0x5&&(_0x42fb60=0xa5*0x1+0x782*0x4+-7853);this['elSelected'+'Lines']['r']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']+_0x15295f-(-1633*-6+0x929+-12141+0.5)+'px\x20'+_0x59eb0e+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0xb90dce['x']-(0x40*-119+-1*-8473+0x357*-1+0.5)+'px\x20'+(_0x59eb0e-(0x1*0x3c1+-1249*0x3+-1394*-2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x42fb60+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0xb90dce['x']-(-2181*0x4+0x1*-4341+0x330b+0.5)+'px\x20'+(_0xb90dce['y']+_0xb90dce['height']-(0x9f2*-3+-3167*0x1+0x1*0x2a37+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x42fb60+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']+_0x15295f-(-1*-7230+-7552+0x145+0.5)+'px\x20'+(_0xb90dce['y']-(0x1167+0x1de3*-1+0xc7f+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']+_0x15295f-(-5205+0x1*-7265+0x30b9+0.5)+'px\x20'+(_0xb90dce['y']+_0xb90dce['height']-(0x1d51+0x533*-7+0x21*0x37+0.5))+'px';for(const _0xe8cf2 of _0xb90dce['ids']){const _0x28cc1d=this['registered'][_0xe8cf2],_0x3188a3=_0x28cc1d['width']*(0xce0+-1825*-2+-6945+_0x39b4c0),_0x36f1f3=_0x28cc1d['x']+_0x15295f*((_0x28cc1d['x']-_0xb90dce['x'])/_0xb90dce['width']);_0x167c16[_0xe8cf2]['width']=_0x3188a3,_0x167c16[_0xe8cf2]['x']=_0x36f1f3,_0x28cc1d['el']['style']['width']=_0x3188a3+'px',_0x28cc1d['el']['style']['translate']=_0x36f1f3+'px\x20'+_0x28cc1d['y']+'px';const _0x2ced47=new CustomEvent('onChange',{'detail':{'id':_0xe8cf2,'type':'resize_rig'+'ht','x':_0x167c16[_0xe8cf2]['x'],'y':_0x167c16[_0xe8cf2]['y'],'width':_0x167c16[_0xe8cf2]['width'],'height':_0x167c16[_0xe8cf2]['height']}});this['dispatchEv'+'ent'](_0x2ced47);}break;case 't':_0x5b5909=_0xb90dce['x'],_0x59eb0e=_0xb90dce['y']+_0x3b0a3b;let _0x3dc298=_0xb90dce['height']-_0x3b0a3b;_0x59eb0e>=_0xb90dce['y']+_0xb90dce['height']&&(_0x59eb0e=_0xb90dce['y']+_0xb90dce['height']);_0x4a48a6<=0x2*0xf4d+-53*0x7+-439*0x11&&(_0x4a48a6=0x5c7+0x2477+-10814);this['elSelected'+'Lines']['t']['style']['translate']=_0x5b5909-(0xa57*-3+-5127+0x330e+0.5)+'px\x20'+(_0x59eb0e-(-1*0x1849+-7509+0x35a0+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5b5909-(0x1960+0x47b*-3+0xbed*-1+0.5)+'px\x20'+(_0x59eb0e-(0x1*0x25c1+-9157+-506+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x3dc298+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']-(0x2*-1142+-987*-7+0x3*-1541+0.5)+'px\x20'+(_0x59eb0e-(-1691+-5279*0x1+0x4*0x6cf+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x3dc298+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5b5909-(0x1*0x1fab+-127*-59+-9*0x6c5+0.5)+'px\x20'+(_0x59eb0e-(0xf67*-1+-9435+-1*-13381+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']-(-4651*0x1+-1*-8062+-3408+0.5)+'px\x20'+(_0x59eb0e-(0x2*0x1187+-5354+-3617+0.5))+'px';for(const _0x27f63 of _0xb90dce['ids']){const _0x5bce5c=this['registered'][_0x27f63],_0x2d5cb5=_0x5bce5c['height']*(-489*-19+0x164a+0x2*-7498-_0xe26a98),_0x301d37=_0x5bce5c['y']+_0x3b0a3b*(0x1896*0x1+0x1*0x820+0x1*-8373-(_0x5bce5c['y']-_0xb90dce['y'])/_0xb90dce['height']);_0x5bce5c['el']['style']['height']=_0x2d5cb5+'px',_0x5bce5c['el']['style']['translate']=_0x5bce5c['x']+'px\x20'+_0x301d37+'px',_0x167c16[_0x27f63]['y']=_0x301d37,_0x167c16[_0x27f63]['height']=_0x2d5cb5;const _0x10a99a=new CustomEvent('onChange',{'detail':{'id':_0x27f63,'type':'resize_top','x':_0x167c16[_0x27f63]['x'],'y':_0x167c16[_0x27f63]['y'],'width':_0x167c16[_0x27f63]['width'],'height':_0x167c16[_0x27f63]['height']}});this['dispatchEv'+'ent'](_0x10a99a);}break;case 'b':_0x59eb0e=_0xb90dce['y']+_0xb90dce['height'];_0x59eb0e<=_0xb90dce['y']&&(_0x59eb0e=_0xb90dce['y']);_0x4a48a6=_0xb90dce['height']+_0x3b0a3b;_0x4a48a6<0x3b9+0x2e*-2+-861&&(_0x4a48a6=-2*-1235+-2823+0x1*0x161);this['elSelected'+'Lines']['t']['style']['translate']=_0xb90dce['x']-(-2*-2417+0x18c8+-11176+0.5)+'px\x20'+(_0xb90dce['y']-(-4100+-1*0x2645+0x364b+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0xb90dce['x']-(0x14bf*-1+0x255+0x126c+0.5)+'px\x20'+(_0xb90dce['y']-(0x56+-2570+0x16*0x71+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x4a48a6+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']-(0x12ab+0x3*0x424+-7957+0.5)+'px\x20'+(_0xb90dce['y']-(-11*-162+0x13ba+-6830+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x4a48a6+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0xb90dce['x']+'px\x20'+(_0x59eb0e+_0x3b0a3b-(0x1fe3+-9068+0x38b*0x1+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0xb90dce['x']-(0x29a*0x1+-9654*-1+-10317+0.5)+'px\x20'+(_0x59eb0e+_0x3b0a3b-(0x1*-8052+0x1*0x9ac+0x15cb+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0xb90dce['x']+_0xb90dce['width']-(0x17da+0x1e99+0x430*-13+0.5)+'px\x20'+(_0x59eb0e+_0x3b0a3b-(0x152a+0x2*-463+-67*0x43+0.5))+'px';for(const _0x1d0500 of _0xb90dce['ids']){const _0x477093=this['registered'][_0x1d0500],_0x505d13=_0x477093['height']*(-57*0x3d+-3295+0x1a75+_0xe26a98),_0x93210c=_0x477093['y']+_0x3b0a3b*((_0x477093['y']-_0xb90dce['y'])/_0xb90dce['height']);_0x167c16[_0x1d0500]['height']=_0x505d13,_0x167c16[_0x1d0500]['y']=_0x93210c,_0x477093['el']['style']['height']=_0x505d13+'px',_0x477093['el']['style']['translate']=_0x477093['x']+'px\x20'+_0x93210c+'px';const _0x32565f=new CustomEvent('onChange',{'detail':{'id':_0x1d0500,'type':'resize_bot'+'tom','x':_0x167c16[_0x1d0500]['x'],'y':_0x167c16[_0x1d0500]['y'],'width':_0x167c16[_0x1d0500]['width'],'height':_0x167c16[_0x1d0500]['height']}});this['dispatchEv'+'ent'](_0x32565f);}break;}}['moveVector'+'s'](_0x33fd49,_0x3899d3,_0x5a09c7,_0x2476e4,_0x229254,_0x417f78){let _0x180526=-1082*0x7+0x107*-33+0x3f7d,_0x4dc882=0x1*-3748+-2291+0x1797;const _0xd33fa8=_0x229254['x']-_0x2476e4['x'],_0x3df72a=_0xd33fa8/_0x417f78,_0x83d61e=_0xd33fa8/_0x5a09c7['width'];let _0xa0706=0x1671+0x33*-23+-4572;switch(_0x33fd49){case 'tl':_0x180526=_0x5a09c7['x']+_0xd33fa8,_0x4dc882=_0x5a09c7['y']+_0x3df72a,this['elSelected'+'Vectors']['tl']['style']['translate']=_0x180526-(-4956+0x18e0+0x581*-1+0.5)+'px\x20'+(_0x4dc882-(0xd34+0x186a+0xc89*-3+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5a09c7['x']+_0x5a09c7['width']-(0x9be+-3154*-2+-21*0x1a3+0.5)+'px\x20'+(_0x4dc882-(-3743+0x1*0x1593+-1777+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x180526-(-4139*0x1+-3789*-1+-1*-353+0.5)+'px\x20'+(_0x5a09c7['y']+_0x5a09c7['height']-(-73*0x52+-493*-19+-2*0x699+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x180526-(0xef0+0xe59+-7495+0.5)+'px\x20'+(_0x4dc882-(0x13*-173+-240+0xdc9*0x1+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x5a09c7['width']-_0xd33fa8+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x180526-(0x6fc+0xf39+-5683+0.5)+'px\x20'+(_0x5a09c7['y']+_0x5a09c7['height']-(-5662*0x1+-8885+0x38d5+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x5a09c7['width']-_0xd33fa8+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x180526-(0x1656+0x2*0xc2+-6104+0.5)+'px\x20'+(_0x4dc882-(0xf1c+-5509+-1643*-1+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5a09c7['height']-_0x3df72a+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5a09c7['x']+_0x5a09c7['width']-(0x128c+-2*0x468+-83*0x1e+0.5)+'px\x20'+(_0x4dc882-(-5*0x4c9+-1*-9251+-3124+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5a09c7['height']-_0x3df72a+'px';for(const _0x1b8853 of _0x5a09c7['ids']){const _0x549879=this['registered'][_0x1b8853],_0x5aad9c=_0x549879['width']*(-9337+-89*0x5a+-17348*-1-_0x83d61e),_0x1f2eaa=_0x549879['x']+_0xd33fa8*(-809*-7+-566*-7+-9624-(_0x549879['x']-_0x5a09c7['x'])/_0x5a09c7['width']),_0x35ab9e=_0x549879['height']*(0x2188+-1*-8199+-5594*0x3-_0x83d61e),_0x5a4ac2=_0x549879['y']+_0x3df72a*(0x98d+0x35*-71+0x527*0x1-(_0x549879['y']-_0x5a09c7['y'])/_0x5a09c7['height']);_0x549879['el']['style']['translate']=_0x1f2eaa+'px\x20'+_0x5a4ac2+'px',_0x549879['el']['style']['width']=_0x5aad9c+'px',_0x549879['el']['style']['height']=_0x35ab9e+'px',_0x3899d3[_0x1b8853]['x']=_0x1f2eaa,_0x3899d3[_0x1b8853]['width']=_0x5aad9c,_0x3899d3[_0x1b8853]['y']=_0x5a4ac2,_0x3899d3[_0x1b8853]['height']=_0x35ab9e;const _0x13bfd2=new CustomEvent('onChange',{'detail':{'id':_0x1b8853,'type':'resize_top'+'-left','x':_0x3899d3[_0x1b8853]['x'],'y':_0x3899d3[_0x1b8853]['y'],'width':_0x3899d3[_0x1b8853]['width'],'height':_0x3899d3[_0x1b8853]['height']}});this['dispatchEv'+'ent'](_0x13bfd2);}break;case 'tr':_0xa0706=_0x5a09c7['width']+_0xd33fa8,_0x180526=_0x5a09c7['x']+_0xa0706,_0x4dc882=_0x5a09c7['y']-_0x3df72a,this['elSelected'+'Vectors']['tr']['style']['translate']=_0x180526-(0xe87+-6377+-3*-887+0.5)+'px\x20'+(_0x4dc882-(0x78b+0x1*-8059+0x17f3+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5a09c7['x']-(-1*-5089+-6911+-1825*-1+0.5)+'px\x20'+(_0x4dc882-(0x1*-3612+0x18fb+-139*0x14+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x180526-(0x8aa*0x1+0x1e2d+-140*0x47+0.5)+'px\x20'+(_0x5a09c7['y']+_0x5a09c7['height']-(-7561+0x1*0x13ed+0x3*0x335+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5a09c7['x']-(0x3*0xacf+-3959+0x1b2*-10+0.5)+'px\x20'+(_0x4dc882-(-8876+-91*-61+0x3*0x455+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0xa0706+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5a09c7['x']-(-8483+0x768+0x19bd+0.5)+'px\x20'+(_0x5a09c7['y']+_0x5a09c7['height']-(-11*-89+-6850+-7*-839+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0xa0706+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5a09c7['x']-(0xc19*0x1+0x2*0x46d+0x1*-5361+0.5)+'px\x20'+(_0x4dc882-(-1589*0x1+0xaed+-134*0x9+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5a09c7['height']+_0x3df72a+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5a09c7['x']+_0xa0706-(-1*-7033+0x1e4d+-14788+0.5)+'px\x20'+(_0x4dc882-(-9*0x2ce+-1*0x1c5a+0x359a+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5a09c7['height']+_0x3df72a+'px';for(const _0x432814 of _0x5a09c7['ids']){const _0x18a4c2=this['registered'][_0x432814],_0x5117ac=_0x18a4c2['width']*(0x54c+0x1b70+-8379+_0x83d61e),_0x8cd1d2=_0x18a4c2['x']+_0xd33fa8*((_0x18a4c2['x']-_0x5a09c7['x'])/_0x5a09c7['width']),_0x57cbb4=_0x18a4c2['height']*(-10*-505+-8035*-1+0x1*-13084+_0x83d61e),_0x23b355=_0x18a4c2['y']-_0x3df72a*(-9917+-25*-93+0x1da9-(_0x18a4c2['y']-_0x5a09c7['y'])/_0x5a09c7['height']);_0x18a4c2['el']['style']['translate']=_0x8cd1d2+'px\x20'+_0x23b355+'px',_0x18a4c2['el']['style']['width']=_0x5117ac+'px',_0x18a4c2['el']['style']['height']=_0x57cbb4+'px',_0x3899d3[_0x432814]['x']=_0x8cd1d2,_0x3899d3[_0x432814]['width']=_0x5117ac,_0x3899d3[_0x432814]['y']=_0x23b355,_0x3899d3[_0x432814]['height']=_0x57cbb4;const _0x1d24ed=new CustomEvent('onChange',{'detail':{'id':_0x432814,'type':'resize_top'+'-right','x':_0x3899d3[_0x432814]['x'],'y':_0x3899d3[_0x432814]['y'],'width':_0x3899d3[_0x432814]['width'],'height':_0x3899d3[_0x432814]['height']}});this['dispatchEv'+'ent'](_0x1d24ed);}break;case 'bl':_0x180526=_0x5a09c7['x']+_0xd33fa8,_0x4dc882=_0x5a09c7['y']+_0x5a09c7['height']-_0x3df72a,this['elSelected'+'Vectors']['bl']['style']['translate']=_0x180526-(0x25a+-4450+-3851*-1+0.5)+'px\x20'+(_0x4dc882-(-527*0x9+-9409+-2831*-5+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x180526-(-3600+-8635+0x2fce+0.5)+'px\x20'+(_0x5a09c7['y']-(0x5*0x54d+0x129f+-11549+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x5a09c7['x']+_0x5a09c7['width']-(0xc6e+0x6ac*-1+-1471+0.5)+'px\x20'+(_0x4dc882-(0x20b6+-7932+-439*0x1+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x180526-(0x1*-4215+-33*0x12f+0x6f1*0x8+0.5)+'px\x20'+(_0x5a09c7['y']-(-3*0x88f+-193*0x2b+-2479*-6+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x5a09c7['width']-_0xd33fa8+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x180526-(-3*0x2ab+0x9*0x436+-7651+0.5)+'px\x20'+(_0x4dc882-(0x1244+0x8c7+-3*0x903+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x5a09c7['width']-_0xd33fa8+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x180526-(-2906+-1*0x1b51+0x26ad+0.5)+'px\x20'+(_0x5a09c7['y']-(-11*0x193+-2223+-2*-3329+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5a09c7['height']-_0x3df72a+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5a09c7['x']+_0x5a09c7['width']-(0x2641+0x1*-8995+-796+0.5)+'px\x20'+(_0x5a09c7['y']-(-4012*-1+0xa4f*-1+-1*0x55b+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5a09c7['height']-_0x3df72a+'px';for(const _0xb741f7 of _0x5a09c7['ids']){const _0x453984=this['registered'][_0xb741f7],_0x29a362=_0x453984['width']*(0x70*-12+-3443+-42*-114-_0x83d61e),_0x195779=_0x453984['x']+_0xd33fa8*(0x2*-1454+0x1420+0x8c3*-1-(_0x453984['x']-_0x5a09c7['x'])/_0x5a09c7['width']),_0x5b405c=_0x453984['height']*(-5*-1003+0x2593+-14633-_0x83d61e),_0x131265=_0x453984['y']+_0x3df72a*((_0x5a09c7['y']-_0x453984['y'])/_0x5a09c7['height']);_0x453984['el']['style']['translate']=_0x195779+'px\x20'+_0x131265+'px',_0x453984['el']['style']['width']=_0x29a362+'px',_0x453984['el']['style']['height']=_0x5b405c+'px',_0x3899d3[_0xb741f7]['x']=_0x195779,_0x3899d3[_0xb741f7]['width']=_0x29a362,_0x3899d3[_0xb741f7]['y']=_0x131265,_0x3899d3[_0xb741f7]['height']=_0x5b405c;const _0x14c6e1=new CustomEvent('onChange',{'detail':{'id':_0xb741f7,'type':'resize_bot'+'tom-left','x':_0x3899d3[_0xb741f7]['x'],'y':_0x3899d3[_0xb741f7]['y'],'width':_0x3899d3[_0xb741f7]['width'],'height':_0x3899d3[_0xb741f7]['height']}});this['dispatchEv'+'ent'](_0x14c6e1);}break;case 'br':_0xa0706=_0x5a09c7['width']+_0xd33fa8,_0x180526=_0x5a09c7['x']+_0xa0706,_0x4dc882=_0x5a09c7['y']+_0x5a09c7['height']+_0x3df72a,this['elSelected'+'Vectors']['br']['style']['translate']=_0x180526-(-23*0xcf+-8235+0x32c7+0.5)+'px\x20'+(_0x4dc882-(0x4*-277+0x2086*0x1+-7215+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5a09c7['x']+_0x5a09c7['width']+_0xd33fa8-(-2533+-719+0xcb7+0.5)+'px\x20'+(_0x5a09c7['y']-(0x12e*0x11+-2*-281+-5693+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5a09c7['x']-(-2330+0x1*-8902+0x2be3+0.5)+'px\x20'+(_0x4dc882-(-5085+-2*0x10b9+-5*-2730+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5a09c7['x']-(-6175+-515+0x1a24+0.5)+'px\x20'+(_0x5a09c7['y']-(-1647+-6047*-1+-4398+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0xa0706+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5a09c7['x']-(-9525+-1*0x22ed+-171*-108+0.5)+'px\x20'+(_0x4dc882-(-3306+0x2*-3871+0x22*0x145+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0xa0706+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5a09c7['x']-(0x5b8+-1678+0xd8+0.5)+'px\x20'+(_0x5a09c7['y']-(0xe*0x13c+0x1be6+-28*0x19d+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5a09c7['height']+_0x3df72a+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5a09c7['x']+_0xa0706-(0x61*0x1f+0x6*-167+-2003+0.5)+'px\x20'+(_0x5a09c7['y']-(0x1ffc*0x1+-11*0x347+0x413+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5a09c7['height']+_0x3df72a+'px';for(const _0x14ab35 of _0x5a09c7['ids']){const _0x3442ec=this['registered'][_0x14ab35],_0x19d5ea=_0x3442ec['width']*(-990+-7*-1163+-7150+_0x83d61e),_0x16588b=_0x3442ec['x']+_0xd33fa8*((_0x3442ec['x']-_0x5a09c7['x'])/_0x5a09c7['width']),_0x805979=_0x3442ec['height']*(-6940+0x184*0xb+0xa71+_0x83d61e),_0x5b67b7=_0x3442ec['y']+_0x3df72a*((_0x3442ec['y']-_0x5a09c7['y'])/_0x5a09c7['height']);_0x3442ec['el']['style']['translate']=_0x16588b+'px\x20'+_0x5b67b7+'px',_0x3442ec['el']['style']['width']=_0x19d5ea+'px',_0x3442ec['el']['style']['height']=_0x805979+'px',_0x3899d3[_0x14ab35]['x']=_0x16588b,_0x3899d3[_0x14ab35]['width']=_0x19d5ea,_0x3899d3[_0x14ab35]['y']=_0x5b67b7,_0x3899d3[_0x14ab35]['height']=_0x805979;const _0x1747ae=new CustomEvent('onChange',{'detail':{'id':_0x14ab35,'type':'resize_bot'+'tom-right','x':_0x3899d3[_0x14ab35]['x'],'y':_0x3899d3[_0x14ab35]['y'],'width':_0x3899d3[_0x14ab35]['width'],'height':_0x3899d3[_0x14ab35]['height']}});this['dispatchEv'+'ent'](_0x1747ae);}break;}}['referenceA'+'lignLinesV'+'ectors'](_0x1b759e,_0x1984ee){let _0x1831a1='',_0x3d0243;for(let _0x391ac2 in _0x1b759e){if(this['selected']['ids']['indexOf'](_0x391ac2)>-1)continue;let _0x4f6bdc={'x':0x0,'y':0x0};_0x3d0243='';if(Math['abs'](this['selected']['x']+this['selected']['width']-_0x1b759e[_0x391ac2]['x'])<=this['thresholdH'+'orizontal'])_0x3d0243='end',_0x4f6bdc['x']=this['selected']['x']+this['selected']['width']-_0x1b759e[_0x391ac2]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']/(-11*0xe9+0x1343+-2366)))<=this['thresholdH'+'orizontal'])_0x3d0243='end',_0x4f6bdc['x']=this['selected']['x']+this['selected']['width']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']/(0x158e+0x796*0x5+0x3b7a*-1));else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']))<=this['thresholdH'+'orizontal'])_0x3d0243='end',_0x4f6bdc['x']=this['selected']['x']+this['selected']['width']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']);else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-1223+-1*0x101e+0x14e7)-_0x1b759e[_0x391ac2]['x'])<=this['thresholdH'+'orizontal'])_0x3d0243='middle',_0x4f6bdc['x']=this['selected']['x']+this['selected']['width']/(0x4c2+0x1*-7523+-53*-119)-_0x1b759e[_0x391ac2]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(0x2396+0x35f*-7+-1*0xbfb)-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']/(0x20aa+-99+0x1*-8261)))<=this['thresholdH'+'orizontal'])_0x3d0243='middle',_0x4f6bdc['x']=this['selected']['x']+this['selected']['width']/(0xa*0x271+-4127+-2121)-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']/(-2*-4427+0x2*-4511+0xaa));else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-2*-3778+0x3be+-7*0x4c0)-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']))<=this['thresholdH'+'orizontal'])_0x3d0243='middle',_0x4f6bdc['x']=this['selected']['x']+this['selected']['width']/(-7953+0x2*-1333+0x22f*0x13)-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']);else {if(Math['abs'](this['selected']['x']-_0x1b759e[_0x391ac2]['x'])<=this['thresholdH'+'orizontal'])_0x3d0243='begin',_0x4f6bdc['x']=this['selected']['x']-_0x1b759e[_0x391ac2]['x'];else {if(Math['abs'](this['selected']['x']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']/(0x1818+-3180+-2986)))<=this['thresholdH'+'orizontal'])_0x3d0243='begin',_0x4f6bdc['x']=this['selected']['x']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']/(0x2185+-1049*-8+-16971));else Math['abs'](this['selected']['x']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']))<=this['thresholdH'+'orizontal']&&(_0x3d0243='begin',_0x4f6bdc['x']=this['selected']['x']-(_0x1b759e[_0x391ac2]['x']+_0x1b759e[_0x391ac2]['width']));}}}}}}}_0x3d0243!==''?(_0x1831a1=_0x3d0243,this['snap']('horizontal',_0x4f6bdc,_0x1b759e),setTimeout(()=>{this['thresholdH'+'orizontal']=0xfd*0x25+0x2*0x5c7+-113*0x6d;},0x25a+0x150+-738)):this['thresholdH'+'orizontal']===-7762*0x1+-5*0xbb+0x21fb&&(this['thresholdH'+'orizontal']=0x25e5+-3401+-6295*0x1);}const _0x3ef88d=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-horizo'+'ntal');_0x3ef88d!==undefined&&_0x3ef88d['forEach'](_0x2d10bd=>{_0x2d10bd['remove']();});const _0x3b9b78=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-horizont'+'al');_0x3b9b78!==undefined&&_0x3b9b78['forEach'](_0x123376=>{_0x123376['remove']();});_0x1831a1!==''&&(this['triggerAli'+'gnVectors']('horizontal',_0x1831a1,_0x1b759e),this['triggerAli'+'gnLines'](_0x1b759e));_0x1831a1='';for(let _0x50e7a9 in _0x1b759e){if(this['selected']['ids']['indexOf'](_0x50e7a9)>-1)continue;let _0x59aa66={'x':0x0,'y':0x0};_0x3d0243='';if(Math['abs'](this['selected']['y']+this['selected']['height']-_0x1b759e[_0x50e7a9]['y'])<=this['thresholdV'+'ertical'])_0x3d0243='end',_0x59aa66['y']=this['selected']['y']+this['selected']['height']-_0x1b759e[_0x50e7a9]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']/(-4*-1069+0x1f5+0xbf*-25)))<=this['thresholdV'+'ertical'])_0x3d0243='end',_0x59aa66['y']=this['selected']['y']+this['selected']['height']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']/(0x1ed8+0x1a49+-14623));else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']))<=this['thresholdV'+'ertical'])_0x3d0243='end',_0x59aa66['y']=this['selected']['y']+this['selected']['height']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']);else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x990+0x16a6*-1+0xd18)-_0x1b759e[_0x50e7a9]['y'])<=this['thresholdV'+'ertical'])_0x3d0243='middle',_0x59aa66['y']=this['selected']['y']+this['selected']['height']/(0x4*-1219+-7631+0x30dd)-_0x1b759e[_0x50e7a9]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(-6141+0x1be4+0x1*-997)-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']/(-8173+0x1a4d+0x5a2)))<=this['thresholdV'+'ertical'])_0x3d0243='middle',_0x59aa66['y']=this['selected']['y']+this['selected']['height']/(-83*0x6d+0x7f0*-2+-423*-31)-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']/(-8431*0x1+0x158d+-18*-162));else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x4*0x52+0x6bc*0x5+0x6*-1491)-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']))<=this['thresholdV'+'ertical'])_0x3d0243='middle',_0x59aa66['y']=this['selected']['y']+this['selected']['height']/(-1900+-2*0xfa1+-4*-2476)-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']);else {if(Math['abs'](this['selected']['y']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']))<=this['thresholdV'+'ertical'])_0x3d0243='begin',_0x59aa66['y']=this['selected']['y']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']);else {if(Math['abs'](this['selected']['y']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']/(-6949+0xd00+0xe27)))<=this['thresholdV'+'ertical'])_0x3d0243='begin',_0x59aa66['y']=this['selected']['y']-(_0x1b759e[_0x50e7a9]['y']+_0x1b759e[_0x50e7a9]['height']/(0x2db+-6434+-1*-5705));else Math['abs'](this['selected']['y']-_0x1b759e[_0x50e7a9]['y'])<=this['thresholdV'+'ertical']&&(_0x3d0243='begin',_0x59aa66['y']=this['selected']['y']-_0x1b759e[_0x50e7a9]['y']);}}}}}}}_0x3d0243!==''?(_0x1831a1=_0x3d0243,this['snap']('vertical',_0x59aa66,_0x1b759e),setTimeout(()=>{this['thresholdH'+'orizontal']=0x7a6+-8709*-1+-10665;},0x1adf+-1410+-5269)):this['thresholdV'+'ertical']===0x5*-1126+-2800+0x10*0x20f&&(this['thresholdV'+'ertical']=-1*0x52+0xd53*0x2+-6735);}const _0x2639a0=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-vertic'+'al');_0x2639a0!==undefined&&_0x2639a0['forEach'](_0x8a8875=>{_0x8a8875['remove']();});const _0xc647=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-vertical');_0xc647!==undefined&&_0xc647['forEach'](_0x4f3670=>{_0x4f3670['remove']();}),_0x1831a1!==''&&(this['triggerAli'+'gnVectors']('vertical',_0x1831a1,_0x1b759e),this['triggerAli'+'gnLines'](_0x1b759e));}['snap'](_0x39e863,_0xdad580,_0x1086a3){let _0x2eb0cd={'x':0x0,'y':0x0};if(_0x39e863==='horizontal'){this['selected']['x']=this['selected']['x']-_0xdad580['x'];for(const _0x37ec51 of this['selected']['ids']){const _0x5d577a=this['getElement'+'TranslateP'+'os'](_0x1086a3[_0x37ec51]['el']),_0x3057c6=_0x5d577a['x']-_0xdad580['x'],_0x3d327f=_0x5d577a['y'];_0x1086a3[_0x37ec51]['el']['style']['translate']=_0x3057c6+'px\x20'+_0x3d327f+'px',_0x1086a3[_0x37ec51]['x']=_0x3057c6;}_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x2eb0cd['x']-_0xdad580['x']+'px\x20'+_0x2eb0cd['y']+'px';}else {this['selected']['y']=this['selected']['y']-_0xdad580['y'];for(const _0x104ad2 of this['selected']['ids']){const _0x4f274b=this['getElement'+'TranslateP'+'os'](_0x1086a3[_0x104ad2]['el']),_0xfe91ad=_0x4f274b['x'],_0x1927a4=_0x4f274b['y']-_0xdad580['y'];_0x1086a3[_0x104ad2]['el']['style']['translate']=_0xfe91ad+'px\x20'+_0x1927a4+'px',_0x1086a3[_0x104ad2]['y']=_0x1927a4;}_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px',_0x2eb0cd=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x2eb0cd['x']+'px\x20'+(_0x2eb0cd['y']-_0xdad580['y'])+'px';}}['getElement'+'TranslateP'+'os'](_0x3b18ac){let _0x31438c={'x':0x0,'y':0x0};if(_0x3b18ac['style']['translate']['indexOf']('\x20')>-1){const _0x47fade=_0x3b18ac['style']['translate']['split']('\x20');_0x31438c['x']=parseFloat(_0x47fade[0x23c2+0x2327+-2017*0x9]['replace']('px','')),_0x31438c['y']=parseFloat(_0x47fade[-4443*-1+-1*0x204d+0xef3*0x1]['replace']('px',''));}else _0x31438c['x']=parseFloat(_0x3b18ac['style']['translate']);return _0x31438c;}['generateAl'+'ignVector'](_0x50dc6a,_0x3a30e7,_0x515567){const _0x2fcafb=document['createElem'+'ent']('div');_0x2fcafb['innerHTML']='\x0a\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20fill=\x22'+colors['red']+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20v'+'iewBox=\x220\x20'+'0\x2024\x2024\x22\x20\x0a'+'\x20\x20\x20\x20\x20\x20stro'+'ke-width=\x22'+'1.5\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20stroke=\x22'+'currentCol'+'or\x22\x20\x0a\x20\x20\x20\x20\x20'+'\x20class=\x22si'+'ze-6\x22\x20\x0a\x20\x20\x20'+'\x20\x20\x20width=\x22')+vectorSize*(0xbf*0xb+0x9f9+0x2*-2326)+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20w'+'idth=\x22')+vectorSize*(0xe77+-4255+0x22a)+('\x22\x0a\x20\x20\x20\x20>\x0a\x20\x20'+'\x20\x20\x20\x20<path\x20'+'stroke-lin'+'ecap=\x22roun'+'d\x22\x20stroke-'+'linejoin=\x22'+'round\x22\x20d=\x22'+'M6\x2018\x2018\x206'+'M6\x206l12\x2012'+'\x22\x20/>\x0a\x20\x20\x20\x20<'+'/svg>'),_0x2fcafb['classList']['add']('align-vect'+'or'),_0x2fcafb['classList']['add']('align-vect'+'or-'+_0x50dc6a),_0x2fcafb['classList']['add']('align-vect'+'or-'+_0x50dc6a+'-'+_0x3a30e7),_0x2fcafb['style']['position']='absolute',_0x2fcafb['style']['left']=_0x515567['x']+'px',_0x2fcafb['style']['top']=_0x515567['y']+'px',this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x2fcafb);}['triggerAli'+'gnVectors'](_0x5cb117,_0x34c6e9,_0x27d19e){let _0x406ed9={'hBegin':![],'hMiddle':![],'hEnd':![],'vBegin':![],'vMiddle':![],'vEnd':![]};for(let _0x1d86bd in _0x27d19e){Math['abs'](this['selected']['x']-_0x27d19e[_0x1d86bd]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hBegin']&&(_0x406ed9['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0x1d59+0x6*-1385+0x31f)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0x18b8+0x138d+-11331)-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(-34*0xe8+-6108+0x91d*0x6)-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hBegin']&&(_0x406ed9['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hBegin']&&(_0x406ed9['hBegin']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-3052+0x11*0x13f+-2369)-_0x27d19e[_0x1d86bd]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hMiddle']&&(_0x406ed9['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x49*-59+0x1748*0x1+-1651)-(_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(-761*-10+0x14b7+-12911)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0x4f*0x4f+-6830+-197*-3)-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0x1beb+0x1d7+-7616)-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hMiddle']&&(_0x406ed9['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x1d51+-3114+-4389)-(_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hMiddle']&&(_0x406ed9['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-_0x27d19e[_0x1d86bd]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hEnd']&&(_0x406ed9['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0x2*0xbb+0x1525+0x5*-1157)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0xa08*0x2+0x42c+0x1*-6202)-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']/(0x1d*0x9c+0x17*0x4a+-6224)-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hEnd']&&(_0x406ed9['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['hEnd']&&(_0x406ed9['hEnd']=!![])),Math['abs'](this['selected']['y']-_0x27d19e[_0x1d86bd]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),!_0x406ed9['vBegin']&&(_0x406ed9['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(0x25a9+-4972+-13*0x167)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(-12*0x2a2+0x1356+0xc44)-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(0xddf*0x1+-1068+-2481)-vectorSize}),!_0x406ed9['vBegin']&&(_0x406ed9['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['vBegin']&&(_0x406ed9['vBegin']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x84e*-1+-16*0x1b+0x200*0x5)-_0x27d19e[_0x1d86bd]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),!_0x406ed9['vMiddle']&&(_0x406ed9['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x17b4+0x20bd+-14447*0x1)-(_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(-2518+0x2698+-5*0x5c0)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(0x11*-211+-7e3+0x295d)-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(0x2606+0xd72*-1+-6290)-vectorSize}),!_0x406ed9['vMiddle']&&(_0x406ed9['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-2*0x11fc+0xf0e+-2*-2678)-(_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['vMiddle']&&(_0x406ed9['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-_0x27d19e[_0x1d86bd]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']-vectorSize}),!_0x406ed9['vEnd']&&(_0x406ed9['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(-8364+0x196a+0x744)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(0x656*0x5+-605+-123*0x3d)-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']/(-9645+-5694+-667*-23)-vectorSize}),!_0x406ed9['vEnd']&&(_0x406ed9['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x27d19e[_0x1d86bd]['id'])===-1&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':_0x27d19e[_0x1d86bd]['x']+_0x27d19e[_0x1d86bd]['width']-vectorSize,'y':_0x27d19e[_0x1d86bd]['y']+_0x27d19e[_0x1d86bd]['height']-vectorSize}),!_0x406ed9['vEnd']&&(_0x406ed9['vEnd']=!![]));}_0x406ed9['hBegin']&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x406ed9['hMiddle']&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']/(0x24a+-1608+0x8*0x80)-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']/(-13*-506+0x77b+-8491)-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x406ed9['hEnd']&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x406ed9['vBegin']&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize})),_0x406ed9['vMiddle']&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-7875+0xae5*0x3+-490)-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-1699+-3760+0x1555)-vectorSize})),_0x406ed9['vEnd']&&(this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}),this['generateAl'+'ignVector'](_0x5cb117,_0x34c6e9,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}));}['generateAl'+'ignLine'](_0x56fa68){const {direction:_0x5d84f4,position:_0x3ce312,begin:_0x28a75e,end:_0x3d31ff}=_0x56fa68,_0x2ca5e5=document['createElem'+'ent']('div');_0x2ca5e5['classList']['add']('align-line'),_0x2ca5e5['classList']['add']('align-line'+'-'+_0x5d84f4),_0x2ca5e5['classList']['add']('align-line'+'-'+_0x5d84f4+'-'+_0x3ce312),_0x2ca5e5['style']['position']='absolute',_0x2ca5e5['style']['left']=_0x28a75e['x']+'px',_0x2ca5e5['style']['top']=_0x28a75e['y']+'px',_0x5d84f4==='horizontal'?(_0x2ca5e5['style']['width']='1px',_0x2ca5e5['style']['height']=_0x3d31ff['y']-_0x28a75e['y']+'px'):(_0x2ca5e5['style']['width']=_0x3d31ff['x']-_0x28a75e['x']+'px',_0x2ca5e5['style']['height']='1px'),this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x2ca5e5);}['generateLi'+'ne'](_0x4ab11f,_0x369057){const {direction:_0x21fbba,begin:_0x951305,end:_0x37514e}=_0x4ab11f,_0x4560f0=document['createElem'+'ent']('div');if(_0x369057['length']>-200*-48+-9526*0x1+-74)for(const _0x4ce953 of _0x369057){_0x4560f0['classList']['add'](_0x4ce953);}return _0x4560f0['style']['position']='absolute',_0x4560f0['style']['left']=_0x951305['x']+'px',_0x4560f0['style']['top']=_0x951305['y']+'px',_0x21fbba==='horizontal'?_0x4560f0['style']['width']=_0x37514e['x']-_0x951305['x']+'px':_0x4560f0['style']['height']=_0x37514e['y']-_0x951305['y']+'px',_0x4560f0;}['triggerAli'+'gnLines'](_0x4328eb){const _0x3ae924={'direction':'horizontal','position':'begin','begin':{'x':this['selected']['x'],'y':this['selected']['y']},'end':{'x':this['selected']['x'],'y':this['selected']['y']}},_0x433942=(_0x3ff6ca,_0x1b1ff6,_0xbe0e86)=>{return _0x3ff6ca===undefined?(_0x3ff6ca=_0x5e35a6(_0x3ae924),_0x3ff6ca['end']['y']=_0x3ff6ca['end']['y']+this['selected']['height'],_0x3ff6ca['begin']['x']=_0x3ff6ca['begin']['x']+_0xbe0e86,_0x3ff6ca['end']['x']=_0x3ff6ca['begin']['x']+_0xbe0e86,_0x1b1ff6['y']<_0x3ff6ca['begin']['y']&&(_0x3ff6ca['begin']['y']=_0x1b1ff6['y']),_0x1b1ff6['y']+_0x1b1ff6['height']>_0x3ff6ca['end']['y']&&(_0x3ff6ca['end']['y']=_0x1b1ff6['y']+_0x1b1ff6['height'])):(_0x1b1ff6['y']<_0x3ff6ca['begin']['y']&&(_0x3ff6ca['begin']['y']=_0x1b1ff6['y']),_0x1b1ff6['y']+_0x1b1ff6['height']>_0x3ff6ca['end']['y']&&(_0x3ff6ca['end']['y']=_0x1b1ff6['y']+_0x1b1ff6['height'])),_0x3ff6ca;},_0x83d7ba=(_0xe1ea0c,_0x4fb858,_0x1f795f)=>{return _0xe1ea0c===undefined?(_0xe1ea0c=_0x5e35a6(_0x3ae924),_0xe1ea0c['direction']='vertical',_0xe1ea0c['end']['x']=_0xe1ea0c['end']['x']+this['selected']['width'],_0xe1ea0c['begin']['y']=_0xe1ea0c['begin']['y']+_0x1f795f,_0xe1ea0c['end']['y']=_0xe1ea0c['end']['y']+_0x1f795f,_0x4fb858['x']<_0xe1ea0c['begin']['x']&&(_0xe1ea0c['begin']['x']=_0x4fb858['x']),_0x4fb858['x']+_0x4fb858['width']>_0xe1ea0c['end']['x']&&(_0xe1ea0c['end']['x']=_0x4fb858['x']+_0x4fb858['width'])):(_0x4fb858['x']<_0xe1ea0c['begin']['x']&&(_0xe1ea0c['begin']['x']=_0x4fb858['x']),_0x4fb858['x']+_0x4fb858['width']>_0xe1ea0c['end']['x']&&(_0xe1ea0c['end']['x']=_0x4fb858['x']+_0x4fb858['width'])),_0xe1ea0c;},_0x104205=[];for(let _0x25fcdd in _0x4328eb){(this['selected']['x']===_0x4328eb[_0x25fcdd]['x']||this['selected']['x']===_0x4328eb[_0x25fcdd]['x']+_0x4328eb[_0x25fcdd]['width']/(-7*0x23+0x23d8+-8929)||this['selected']['x']===_0x4328eb[_0x25fcdd]['x']+_0x4328eb[_0x25fcdd]['width'])&&this['selected']['ids']['indexOf'](_0x4328eb[_0x25fcdd]['id'])===-1&&(_0x104205[-8079+0x1*-4660+0x31c3]=_0x433942(_0x104205[-5414*-1+-5*0x15+-5309],_0x4328eb[_0x25fcdd],-1*0x8a2+0x3c4*0xa+0xa*-743)),(this['selected']['x']+this['selected']['width']/(0xd1+0x502+-1489)===_0x4328eb[_0x25fcdd]['x']||this['selected']['x']+this['selected']['width']/(0x2*0x877+0xa85+-7025)===_0x4328eb[_0x25fcdd]['x']+_0x4328eb[_0x25fcdd]['width']/(-1277*0x1+0xad5+-747*0x2)||this['selected']['x']+this['selected']['width']/(-9689+0x948+-95*-77)===_0x4328eb[_0x25fcdd]['x']+_0x4328eb[_0x25fcdd]['width'])&&this['selected']['ids']['indexOf'](_0x4328eb[_0x25fcdd]['id'])===-1&&(_0x104205[0x1fb*0x8+-7997+0xf66]=_0x433942(_0x104205[-9657+0x1*0x1ec7+0x6f3],_0x4328eb[_0x25fcdd],this['selected']['width']/(-6975+0x1e79+0x4*-206))),(this['selected']['x']+this['selected']['width']===_0x4328eb[_0x25fcdd]['x']||this['selected']['x']+this['selected']['width']===_0x4328eb[_0x25fcdd]['x']+_0x4328eb[_0x25fcdd]['width']/(-8986+-7879*0x1+0x1*0x41e3)||this['selected']['x']+this['selected']['width']===_0x4328eb[_0x25fcdd]['x']+_0x4328eb[_0x25fcdd]['width'])&&this['selected']['ids']['indexOf'](_0x4328eb[_0x25fcdd]['id'])===-1&&(_0x104205[-3741+-279*0x23+0x34c4]=_0x433942(_0x104205[0x1*-8981+-3096+0x1*0x2f2f],_0x4328eb[_0x25fcdd],this['selected']['width'])),(Math['abs'](this['selected']['y']-_0x4328eb[_0x25fcdd]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x4328eb[_0x25fcdd]['y']+_0x4328eb[_0x25fcdd]['height']/(0x1b1a*-1+-6245+-1465*-9)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x4328eb[_0x25fcdd]['y']+_0x4328eb[_0x25fcdd]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x4328eb[_0x25fcdd]['id'])===-1&&(_0x104205[-1358+0xca3+-1874]=_0x83d7ba(_0x104205[-4359+-1343*-7+-5039],_0x4328eb[_0x25fcdd],0xd53+0x1*-4517+0x452)),(Math['abs'](this['selected']['y']+this['selected']['height']/(0xf03*-1+-4022+0x1ebb*0x1)-_0x4328eb[_0x25fcdd]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(-53*0x95+-4097+-5998*-2)-(_0x4328eb[_0x25fcdd]['y']+_0x4328eb[_0x25fcdd]['height']/(-4388+-2649+0x1b7f)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0xf75+0x706*-2+-1*0x167)-(_0x4328eb[_0x25fcdd]['y']+_0x4328eb[_0x25fcdd]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x4328eb[_0x25fcdd]['id'])===-1&&(_0x104205[0x1*0x1fd3+-143*-2+0x20ed*-1]=_0x83d7ba(_0x104205[-2121+0x95*-23+0x1*0x15b0],_0x4328eb[_0x25fcdd],this['selected']['height']/(-2709+0x23e0+-1*0x1949))),(Math['abs'](this['selected']['y']+this['selected']['height']-_0x4328eb[_0x25fcdd]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x4328eb[_0x25fcdd]['y']+_0x4328eb[_0x25fcdd]['height']/(0x955*-1+0x2090+-5945)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x4328eb[_0x25fcdd]['y']+_0x4328eb[_0x25fcdd]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x4328eb[_0x25fcdd]['id'])===-1&&(_0x104205[-3733+-2*-799+0x85c]=_0x83d7ba(_0x104205[0x3e0+-8954+0x1f1f*0x1],_0x4328eb[_0x25fcdd],this['selected']['height']));}for(const _0x3a605a of _0x104205){if(_0x3a605a===undefined)continue;this['generateAl'+'ignLine'](_0x3a605a);}}['shortcuts'](_0x1be9f5,_0x26660a){if(_0x1be9f5==='horizontal')switch(_0x26660a){case 'begin':for(const _0xf7d013 of this['selected']['ids']){const _0x52172b=this['registered'][_0xf7d013],{y:_0x1adcae}=this['getTransla'+'tePos'](_0x52172b['el']['style']['translate']),_0xf2bcd2=this['selected']['x'];_0x52172b['el']['style']['translate']=_0xf2bcd2+'px\x20'+_0x1adcae+'px',this['registered'][_0xf7d013]['x']=_0xf2bcd2;}break;case 'middle':for(const _0x226d46 of this['selected']['ids']){const _0x5b63fa=this['registered'][_0x226d46],{x:_0x1aec72,y:_0x2ab805}=this['getTransla'+'tePos'](_0x5b63fa['el']['style']['translate']),_0x28c2d4=_0x1aec72-(_0x5b63fa['x']-(this['selected']['x']+this['selected']['width']/(-1*0xc91+0x1*-818+0xfc5)))-_0x5b63fa['width']/(-1*0xd72+0x1eab+0x1137*-1);_0x5b63fa['el']['style']['translate']=_0x28c2d4+'px\x20'+_0x2ab805+'px',this['registered'][_0x226d46]['x']=_0x28c2d4;}break;case 'end':for(const _0x4a8602 of this['selected']['ids']){const _0x1ae7a7=this['registered'][_0x4a8602],{y:_0x1571d8}=this['getTransla'+'tePos'](_0x1ae7a7['el']['style']['translate']),_0x497d26=this['selected']['x']+this['selected']['width']-_0x1ae7a7['width'];_0x1ae7a7['el']['style']['translate']=_0x497d26+'px\x20'+_0x1571d8+'px',this['registered'][_0x4a8602]['x']=this['selected']['x']+this['selected']['width']-_0x1ae7a7['width'];}break;case 'distribute':const _0x48d1dd=this['selected']['ids']['sort']((_0x35e45b,_0x35c211)=>this['registered'][_0x35e45b]['x']-this['registered'][_0x35c211]['x']);let _0x20bea0=-2455+-1*0x2136+0x2acd;for(const _0x44cb58 of _0x48d1dd){_0x20bea0+=this['registered'][_0x44cb58]['width'];}const _0x53b3b8=(this['selected']['width']-_0x20bea0)/(_0x48d1dd['length']-(-6347+-1994+-43*-194));let _0x25457a=this['registered'][_0x48d1dd[-2953+0xf51+-4*0xf2]]['x'];for(let _0x2d05b9=-4034*0x1+-3912+0x112*0x1d;_0x2d05b9<_0x48d1dd['length'];_0x2d05b9++){const _0x1e8e71=_0x48d1dd[_0x2d05b9],_0x410d5d=this['registered'][_0x1e8e71],{y:_0x482276}=this['getTransla'+'tePos'](_0x410d5d['el']['style']['translate']);let _0x2bf09b=_0x25457a;_0x410d5d['el']['style']['translate']=_0x2bf09b+'px\x20'+_0x482276+'px',this['registered'][_0x1e8e71]['x']=_0x2bf09b,_0x25457a=_0x25457a+_0x410d5d['width']+_0x53b3b8;}break;}else {if(_0x1be9f5==='vertical')switch(_0x26660a){case 'begin':for(const _0x375698 of this['selected']['ids']){const _0x23b829=this['registered'][_0x375698],{x:_0x2efaf9}=this['getTransla'+'tePos'](_0x23b829['el']['style']['translate']),_0x25543a=this['selected']['y'];_0x23b829['el']['style']['translate']=_0x2efaf9+'px\x20'+_0x25543a+'px',this['registered'][_0x375698]['y']=_0x25543a;}break;case 'middle':for(const _0x4249ce of this['selected']['ids']){const _0x57c5ba=this['registered'][_0x4249ce],{x:_0x1cf9f0,y:_0x4276a2}=this['getTransla'+'tePos'](_0x57c5ba['el']['style']['translate']),_0x3ec79e=_0x4276a2-(_0x57c5ba['y']-(this['selected']['y']+this['selected']['height']/(0x13*-95+0xd21+0x612*-1)))-_0x57c5ba['height']/(0x23*-150+-3349*-2+-1446);_0x57c5ba['el']['style']['translate']=_0x1cf9f0+'px\x20'+_0x3ec79e+'px',this['registered'][_0x4249ce]['y']=_0x3ec79e;}break;case 'end':for(const _0x57c883 of this['selected']['ids']){const _0x3bf9f3=this['registered'][_0x57c883],{x:_0x4fcede}=this['getTransla'+'tePos'](_0x3bf9f3['el']['style']['translate']),_0x499666=this['selected']['y']+this['selected']['height']-_0x3bf9f3['height'];_0x3bf9f3['el']['style']['translate']=_0x4fcede+'px\x20'+_0x499666+'px',this['registered'][_0x57c883]['y']=this['selected']['y']+this['selected']['height']-_0x3bf9f3['height'];}break;case 'distribute':const _0x3d3877=this['selected']['ids']['sort']((_0x498f24,_0x4ca18f)=>this['registered'][_0x498f24]['y']-this['registered'][_0x4ca18f]['y']);let _0x3b55b6=-2265+-1*0x4cf+0xda8;for(const _0x2013e2 of _0x3d3877){_0x3b55b6+=this['registered'][_0x2013e2]['height'];}const _0x4ff143=(this['selected']['height']-_0x3b55b6)/(_0x3d3877['length']-(0x1*0x1a8+0x2*-3142+0x16e5));let _0x240af9=this['registered'][_0x3d3877[-3792+-5399+0x2c3*0xd]]['y'];for(let _0x1a6d81=0x2451*-1+0x1693+0x6df*0x2;_0x1a6d81<_0x3d3877['length'];_0x1a6d81++){const _0x4a1a69=_0x3d3877[_0x1a6d81],_0x4ac2dc=this['registered'][_0x4a1a69],{x:_0x34287b}=this['getTransla'+'tePos'](_0x4ac2dc['el']['style']['translate']);let _0x2a7bf7=_0x240af9;_0x4ac2dc['el']['style']['translate']=_0x34287b+'px\x20'+_0x2a7bf7+'px',this['registered'][_0x4a1a69]['y']=_0x2a7bf7,_0x240af9=_0x240af9+_0x4ac2dc['height']+_0x4ff143;}break;}else this['elMeasure']?.['classList']['contains']('active')?(this['shadowRoot']?.['removeEven'+'tListener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['remove']('active'),this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']()):(this['shadowRoot']?.['addEventLi'+'stener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['add']('active'));}this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['measure'](_0x5ea74c){if(this['selected']['ids']['length']===-6032+-9152+0x3b50)return;if(this['mouseMoveT'+'ype']==='main')return;let _0x5d375d=null;_0x5ea74c['target']['id']==='main'&&(_0x5d375d=_0x5ea74c['target']);_0x5d375d===null&&(_0x5d375d=_0x5ea74c['target']['closest']('glide-dnr-'+'item'));if(_0x5d375d===null)return;this['isToolbar']&&(this['measureTar'+'getId']=_0x5d375d['id']);if(_0x5d375d['id']==='main'){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();this['isToolbar']&&(this['measureTar'+'getId']='',this['elMeasureO'+'utline']['style']['width']=-328*-23+-6916+-628,this['elMeasureO'+'utline']['style']['height']=-3872*-1+0x2*0x147+-4526,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');return;}this['isToolbar']&&this['measureExe'+'cute']();}['measureExe'+'cute'](){if(this['measureTar'+'getId']==='')return;this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();const _0x2b13fd=this['measureTar'+'getId'];for(const _0x3617a9 of this['selected']['ids']){if(_0x2b13fd===_0x3617a9){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();return;}}const _0x510970=this['selected']['x']+this['selected']['width'],_0x5d205f=this['selected']['x']+this['selected']['width']/(0x10e8+-8608+0x2*0x85d),_0x4d76f5=this['selected']['y']+this['selected']['height'],_0x17400d=this['selected']['y']+this['selected']['height']/(-2*-4239+-8*-1093+0xe*-1230),_0x4412e5=this['registered'][_0x2b13fd]['x']+this['registered'][_0x2b13fd]['width'],_0x4a1c4c=this['registered'][_0x2b13fd]['y']+this['registered'][_0x2b13fd]['height'];let _0xd2efa=![];if(_0x4d76f5<this['registered'][_0x2b13fd]['y']){_0xd2efa=!![];const _0xf7625e=this['registered'][_0x2b13fd]['y']-_0x4d76f5;let _0x2b9882=_0x5d205f;_0x5d205f===_0x4412e5&&(_0x2b9882-=0xec2*0x1+-325*0x1d+-16*-353);this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x2b9882+'px\x20'+_0x4d76f5+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0xf7625e+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');let _0x24d091=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x48e464=parseFloat(_0x24d091['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0xf7625e);const _0x3db5b9=Math['round'](_0x4d76f5+_0xf7625e/(0x18d5+0x200+-6867)-_0x48e464/(-1*-965+0x16b0+-6771));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x5d205f+(-8181*-1+0x4a*-118+-37*-15)+'px\x20'+_0x3db5b9+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible',_0x5d205f<=this['registered'][_0x2b13fd]['x']&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x5d205f+'px\x20'+this['registered'][_0x2b13fd]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x2b13fd]['x']-_0x5d205f+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x5d205f>=_0x4412e5&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4412e5+'px\x20'+this['registered'][_0x2b13fd]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x5d205f-_0x4412e5+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(_0x4d76f5>=this['registered'][_0x2b13fd]['y']&&_0x4d76f5<=_0x4a1c4c){_0xd2efa=!![];const _0x555376=_0x4a1c4c-_0x4d76f5;this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x5d205f+'px\x20'+_0x4d76f5+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x555376+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');if(_0x4d76f5>=this['registered'][_0x2b13fd]['y']&&_0x4d76f5<_0x4a1c4c){let _0x450319=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x2498b7=parseFloat(_0x450319['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x555376);const _0x11b10b=Math['round'](_0x4d76f5+_0x555376/(-6375+0xa*-906+0x3c4d)-_0x2498b7/(0x1426+0x360*0x3+-7748));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x5d205f+(-7461*0x1+0x8a1*-1+0x25ca)+'px\x20'+_0x11b10b+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible';}_0x5d205f<=this['registered'][_0x2b13fd]['x']&&_0x4d76f5<_0x4a1c4c&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x5d205f+'px\x20'+(_0x4a1c4c-(-1242+0x2e*0x65+-83*0x29))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x2b13fd]['x']-_0x5d205f+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x5d205f>=_0x4412e5&&_0x4d76f5<_0x4a1c4c&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4412e5+'px\x20'+(_0x4a1c4c-(-6053+-594+0x115*0x18))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x5d205f-_0x4412e5+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>_0x4a1c4c){_0xd2efa=!![];const _0x5b4f84=this['selected']['y']-_0x4a1c4c;let _0x5eb185=_0x5d205f;_0x5d205f===_0x4412e5&&(_0x5eb185-=0x2c*-194+-1633+0x27ba);this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x5eb185+'px\x20'+_0x4a1c4c+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x5b4f84+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x783dae=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x2ad787=parseFloat(_0x783dae['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x5b4f84);const _0x240f87=Math['round'](this['selected']['y']-_0x5b4f84/(0xef*0xc+-8614+-2874*-2)-_0x2ad787/(-9833*-1+0x1981*-1+-3302));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x5d205f+(-2*0x963+0x257*0x7+0x269)+'px\x20'+_0x240f87+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x5d205f<this['registered'][_0x2b13fd]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x5d205f+'px\x20'+(_0x4a1c4c-(-1*0xb9e+0xea9+0x30a*-1))+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x2b13fd]['x']-_0x5d205f+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x5d205f>_0x4412e5&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x4412e5+'px\x20'+(_0x4a1c4c-(-4832+-7488+-37*-333))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x5d205f-_0x4412e5+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>this['registered'][_0x2b13fd]['y']&&this['selected']['y']<=_0x4a1c4c){_0xd2efa=!![];const _0x12d0d9=this['selected']['y']-this['registered'][_0x2b13fd]['y'];this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x5d205f+'px\x20'+this['registered'][_0x2b13fd]['y']+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x12d0d9+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x3d5e75=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0xc8fd78=parseFloat(_0x3d5e75['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x12d0d9);const _0x261530=Math['round'](this['selected']['y']-_0x12d0d9/(-5*0x50b+-1922+0x20bb)-_0xc8fd78/(-9502+-1*0xbce+-1*-12526));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x5d205f+(-1*0x3c1+-5627*-1+-4662)+'px\x20'+_0x261530+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x5d205f<this['registered'][_0x2b13fd]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x5d205f+'px\x20'+this['registered'][_0x2b13fd]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x2b13fd]['x']-_0x5d205f+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x5d205f>_0x4412e5&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x4412e5+'px\x20'+this['registered'][_0x2b13fd]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=_0x5d205f-_0x4412e5+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible'));}if(_0x510970<this['registered'][_0x2b13fd]['x']){_0xd2efa=!![];let _0xde84cf=_0x17400d;_0x17400d===_0x4a1c4c&&(_0xde84cf-=0x423*0x7+-7*0x31b+-1847);this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x510970+(-2475+-7350+0x2662)+'px\x20'+_0xde84cf+'px';const _0x42a238=this['registered'][_0x2b13fd]['x']-_0x510970;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x42a238+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x50838a=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x18a3c6=parseFloat(_0x50838a['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x42a238);const _0x3f0e55=Math['round'](_0x510970+_0x42a238/(-366+0x96b+-3*0x2a9)-_0x18a3c6/(-1396*-1+0x2*-417+-560));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x3f0e55+'px\x20'+(_0x17400d+(-3608+0x105c+-576))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x17400d<=this['registered'][_0x2b13fd]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2b13fd]['x']+'px\x20'+_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x2b13fd]['y']-_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x17400d>=_0x4a1c4c&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2b13fd]['x']+'px\x20'+_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x17400d-_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(_0x510970>=this['registered'][_0x2b13fd]['x']&&_0x510970<_0x4412e5){_0xd2efa=!![],this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x510970+'px\x20'+_0x17400d+'px';const _0x2c4707=_0x4412e5-_0x510970;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x2c4707+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x6b3b49=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x598dd8=parseFloat(_0x6b3b49['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x2c4707);const _0x4a7fcd=Math['round'](_0x510970+_0x2c4707/(-4593*-1+-7787+0xc7c)-_0x598dd8/(0x3b*-125+-3086+0x28df));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x4a7fcd+'px\x20'+(_0x17400d+(-8665+-519*0x6+0x2e07))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x17400d<this['registered'][_0x2b13fd]['y']&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4412e5-(0x22fe+0x26ce+0x3*-6297)+'px\x20'+_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=this['registered'][_0x2b13fd]['y']-_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible')),_0x17400d>_0x4a1c4c&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x4412e5-(-2192+-2342*-1+-149)+'px\x20'+_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=_0x17400d-_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible'));}if(this['selected']['x']>_0x4412e5){_0xd2efa=!![];let _0x89a3d5=_0x17400d;_0x17400d===_0x4a1c4c&&(_0x89a3d5-=0x9f*-19+0xf0e+-832);this['elMeasureL'+'ines']['solid_l']['style']['translate']=_0x4412e5-(-2075+0xd9+0x743)+'px\x20'+_0x89a3d5+'px';const _0x5e3928=this['selected']['x']-_0x4412e5;this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x5e3928+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x15cd61=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x5cc56c=parseFloat(_0x15cd61['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x5e3928);const _0x3bb108=Math['round'](_0x4412e5+_0x5e3928/(0x7*0x17b+-3*0x23d+-1*0x3a4)-_0x5cc56c/(0x1*0x16c2+0x6*0x483+-2*0x18e9));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x3bb108+'px\x20'+(_0x17400d+(-9862+0x36c+0x231e))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x17400d<=this['registered'][_0x2b13fd]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4412e5-(0x2569+0x1254+-14268)+'px\x20'+_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x2b13fd]['y']-_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x17400d>=_0x4a1c4c&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x4412e5-(-1*0x405+-1172+0x89a)+'px\x20'+_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x17400d-_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(this['selected']['x']>this['registered'][_0x2b13fd]['x']&&this['selected']['x']<=_0x4412e5){_0xd2efa=!![],this['elMeasureL'+'ines']['solid_l']['style']['translate']=this['registered'][_0x2b13fd]['x']+'px\x20'+_0x17400d+'px';const _0x1bf5d6=this['selected']['x']-this['registered'][_0x2b13fd]['x'];this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x1bf5d6+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x12766f=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x5193f8=parseFloat(_0x12766f['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x1bf5d6);const _0x1fddc6=Math['round'](this['registered'][_0x2b13fd]['x']+_0x1bf5d6/(-5*0x60b+-1*-1505+0x1858)-_0x5193f8/(0x1*-78+-5080+0x1428));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x1fddc6+'px\x20'+(_0x17400d+(-3*-2554+-14*-39+0x24a*-14))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x17400d<=this['registered'][_0x2b13fd]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2b13fd]['x']+'px\x20'+_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x2b13fd]['y']-_0x17400d+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x17400d>=_0x4a1c4c&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2b13fd]['x']+'px\x20'+_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x17400d-_0x4a1c4c+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}_0xd2efa?this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=this['registered'][_0x2b13fd]['width']+'px',this['elMeasureO'+'utline']['style']['height']=this['registered'][_0x2b13fd]['height']+'px',this['elMeasureO'+'utline']['style']['translate']=this['registered'][_0x2b13fd]['x']+'px\x20'+this['registered'][_0x2b13fd]['y']+'px',this['elMeasureO'+'utline']['style']['visibility']='visible',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='auto'):(this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed'](),this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0x2*0xff8+0xd75+-11621*0x1,this['elMeasureO'+'utline']['style']['height']=0x22f+-4784+0x1081,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none'));}['hideMeasur'+'eReference'+'s'](){this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberB']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberB']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='hidden');}['hideMeasur'+'eDeshed'](){this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='hidden');}['triggerSel'+'ectedLines'+'Vectors'](_0x3e08a1){_0x3e08a1==='hide'?this['elSelected'+'Lines']['l']['style']['visibility']!=='hidden'&&(this['elSelected'+'Lines']['l']['style']['visibility']='hidden',this['elSelected'+'Lines']['r']['style']['visibility']='hidden',this['elSelected'+'Lines']['t']['style']['visibility']='hidden',this['elSelected'+'Lines']['b']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tr']['style']['visibility']='hidden',this['elSelected'+'Vectors']['bl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['br']['style']['visibility']='hidden'):this['elSelected'+'Lines']['l']['style']['visibility']!=='visible'&&(this['elSelected'+'Lines']['l']['style']['visibility']='visible',this['elSelected'+'Lines']['r']['style']['visibility']='visible',this['elSelected'+'Lines']['t']['style']['visibility']='visible',this['elSelected'+'Lines']['b']['style']['visibility']='visible',this['elSelected'+'Vectors']['tl']['style']['visibility']='visible',this['elSelected'+'Vectors']['tr']['style']['visibility']='visible',this['elSelected'+'Vectors']['bl']['style']['visibility']='visible',this['elSelected'+'Vectors']['br']['style']['visibility']='visible');}['delete'](){const _0x41b97a=new CustomEvent('onActions',{'detail':{'type':'delete','ids':this['selected']['ids']}});this['dispatchEv'+'ent'](_0x41b97a);}['listenItem'+'Events'](){eventBus['on']('onItemChan'+'ge',({id:_0x25e82e,type:_0x330524,value:_0x2957e2})=>{if(!HasOwn(this['registered'],_0x25e82e))return;let _0x1ba228=-6703+-2*-4866+-3029,_0x2825c6=-1*0x16d6+-5855+0x2db5,_0x3e3833='';requestAnimationFrame(()=>{switch(_0x330524){case 'left':_0x3e3833='drag',this['registered'][_0x25e82e]['el']['style']['translate']=_0x2957e2+'px\x20'+this['registered'][_0x25e82e]['y']+'px',_0x1ba228=parseFloat(_0x2957e2),_0x2825c6=this['registered'][_0x25e82e]['x']-_0x1ba228,this['registered'][_0x25e82e]['x']=_0x1ba228;if(this['selected']['ids']['length']>0x1*0x24b3+0xbf*0x2+-3*0xcbb){if(this['selected']['ids']['indexOf'](_0x25e82e)>-1){this['selected']['x']=_0x2957e2;const _0x28bb6e=this['getTransla'+'tePos'](this['elSelected'+'Lines']['l']['style']['translate']);this['elSelected'+'Lines']['l']['style']['translate']=_0x28bb6e['x']-_0x2825c6+'px\x20'+_0x28bb6e['y']+'px';const _0x59caea=this['getTransla'+'tePos'](this['elSelected'+'Lines']['t']['style']['translate']);this['elSelected'+'Lines']['t']['style']['translate']=_0x59caea['x']-_0x2825c6+'px\x20'+_0x59caea['y']+'px';const _0x443239=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x443239['x']-_0x2825c6+'px\x20'+_0x443239['y']+'px';const _0x3d5661=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x3d5661['x']-_0x2825c6+'px\x20'+_0x3d5661['y']+'px';const _0x3c0ac7=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tl']['style']['translate']);this['elSelected'+'Vectors']['tl']['style']['translate']=_0x3c0ac7['x']-_0x2825c6+'px\x20'+_0x3c0ac7['y']+'px';const _0x77c42a=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x77c42a['x']-_0x2825c6+'px\x20'+_0x77c42a['y']+'px';const _0x90194a=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x90194a['x']-_0x2825c6+'px\x20'+_0x90194a['y']+'px';const _0x2e96bb=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x2e96bb['x']-_0x2825c6+'px\x20'+_0x2e96bb['y']+'px';}}break;case 'top':_0x3e3833='drag',this['registered'][_0x25e82e]['el']['style']['translate']=this['registered'][_0x25e82e]['x']+'px\x20'+_0x2957e2+'px',_0x1ba228=parseFloat(_0x2957e2),_0x2825c6=this['registered'][_0x25e82e]['y']-_0x1ba228,this['registered'][_0x25e82e]['y']=_0x1ba228;if(this['selected']['ids']['length']>-2815*-1+-7057*0x1+0x6*0x2c3){if(this['selected']['ids']['indexOf'](_0x25e82e)>-1){this['selected']['y']=_0x2957e2;const _0x5b8abb=this['getTransla'+'tePos'](this['elSelected'+'Lines']['l']['style']['translate']);this['elSelected'+'Lines']['l']['style']['translate']=_0x5b8abb['x']+'px\x20'+(_0x5b8abb['y']-_0x2825c6)+'px';const _0x144228=this['getTransla'+'tePos'](this['elSelected'+'Lines']['t']['style']['translate']);this['elSelected'+'Lines']['t']['style']['translate']=_0x144228['x']+'px\x20'+(_0x144228['y']-_0x2825c6)+'px';const _0x4e1530=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x4e1530['x']+'px\x20'+(_0x4e1530['y']-_0x2825c6)+'px';const _0x1e838b=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x1e838b['x']+'px\x20'+(_0x1e838b['y']-_0x2825c6)+'px';const _0x4da967=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tl']['style']['translate']);this['elSelected'+'Vectors']['tl']['style']['translate']=_0x4da967['x']+'px\x20'+(_0x4da967['y']-_0x2825c6)+'px';const _0x4e0545=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x4e0545['x']+'px\x20'+(_0x4e0545['y']-_0x2825c6)+'px';const _0x54d9f1=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x54d9f1['x']+'px\x20'+(_0x54d9f1['y']-_0x2825c6)+'px';const _0x3e16e7=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x3e16e7['x']+'px\x20'+(_0x3e16e7['y']-_0x2825c6)+'px';}}break;case 'width':_0x3e3833='resize_wid'+'th',this['registered'][_0x25e82e]['el']['style']['width']=_0x2957e2+'px',_0x1ba228=parseFloat(_0x2957e2),_0x2825c6=this['registered'][_0x25e82e]['width']-_0x1ba228,this['registered'][_0x25e82e]['width']=_0x1ba228;if(this['selected']['ids']['length']>0x6*0x3bc+0x22e7*0x1+-14671){if(this['selected']['ids']['indexOf'](_0x25e82e)>-1){this['selected']['width']=this['selected']['width']-_0x2825c6,this['elSelected'+'Lines']['t']['style']['width']=parseFloat(this['elSelected'+'Lines']['t']['style']['width'])-_0x2825c6+'px',this['elSelected'+'Lines']['b']['style']['width']=parseFloat(this['elSelected'+'Lines']['b']['style']['width'])-_0x2825c6+'px';const _0x11639a=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x11639a['x']-_0x2825c6+'px\x20'+_0x11639a['y']+'px';const _0xc89c96=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0xc89c96['x']-_0x2825c6+'px\x20'+_0xc89c96['y']+'px';const _0x2d5ec9=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x2d5ec9['x']-_0x2825c6+'px\x20'+_0x2d5ec9['y']+'px';}}break;case 'height':_0x3e3833='resize_hei'+'ght',this['registered'][_0x25e82e]['el']['style']['height']=_0x2957e2+'px',_0x1ba228=parseFloat(_0x2957e2),_0x2825c6=this['registered'][_0x25e82e]['height']-_0x1ba228,this['registered'][_0x25e82e]['height']=_0x1ba228;if(this['selected']['ids']['length']>-8331*-1+0x41+-4*0x833){if(this['selected']['ids']['indexOf'](_0x25e82e)>-1){this['selected']['height']=this['selected']['height']-_0x2825c6,this['elSelected'+'Lines']['l']['style']['height']=parseFloat(this['elSelected'+'Lines']['l']['style']['height'])-_0x2825c6+'px',this['elSelected'+'Lines']['r']['style']['height']=parseFloat(this['elSelected'+'Lines']['r']['style']['height'])-_0x2825c6+'px';const _0x4150f0=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x4150f0['x']+'px\x20'+(_0x4150f0['y']-_0x2825c6)+'px';const _0x1fc5d7=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x1fc5d7['x']+'px\x20'+(_0x1fc5d7['y']-_0x2825c6)+'px';const _0x3efca4=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x3efca4['x']+'px\x20'+(_0x3efca4['y']-_0x2825c6)+'px';}}break;}const _0x28cc28=new CustomEvent('onChange',{'detail':{'id':_0x25e82e,'type':_0x3e3833,'x':this['registered'][_0x25e82e]['x'],'y':this['registered'][_0x25e82e]['y'],'width':this['registered'][_0x25e82e]['width'],'height':this['registered'][_0x25e82e]['height']}});this['dispatchEv'+'ent'](_0x28cc28);});});}['init'](){const _0x3449a2=document['createElem'+'ent']('template');_0x3449a2['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x3449a2['content']),this['onSlotChan'+'ge'](),this['handleClic'+'k'](),this['initKeyboa'+'rdEvents'](),this['isModifyOu'+'tside']&&this['listenItem'+'Events']();}}customElements['define']('glide-dnr',GlideDNR);
const properties=['left','top','width','height'];class GlideDNRItem extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'els',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['init']=this['init']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x3e60e3,_0x1889dd,_0x5a8a8d){if(_0x1889dd===_0x5a8a8d)return;let _0x134ef3='';switch(_0x3e60e3){case 'left':_0x134ef3='left';break;case 'top':_0x134ef3='top';break;case 'width':_0x134ef3='width';break;case 'height':_0x134ef3='height';break;}_0x134ef3!==''&&eventBus['emit']('onItemChan'+'ge',{'id':this['id'],'type':_0x134ef3,'value':_0x5a8a8d});}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<sl'+'ot></slot>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20:host\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20display:'+'\x20inline-bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-block;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fl'+'ex-shrink:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20user-s'+'elect:\x20non'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20auto;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x200p'+'x\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20';}['init'](){const _0x57a5de=document['createElem'+'ent']('template');_0x57a5de['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x57a5de['content']),this['onceBindin'+'gs']();}['onceBindin'+'gs'](){const _0x13f427=this['shadowRoot'];if(_0x13f427===null)return;const _0x29312b=_0x13f427['querySelec'+'tor']('.glide-dnr'+'_item');_0x29312b!==undefined&&(this['els']['container']=_0x29312b);}}customElements['define']('glide-dnr-'+'item',GlideDNRItem);export{GlideDNR,GlideDNRItem};