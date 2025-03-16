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
var _0x5481c7 = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);const HasOwn=(_0x55c954,_0x1178fb)=>{if(typeof _0x55c954!=='object')return ![];if(_0x55c954===null||Array['isArray'](_0x55c954))return ![];return Object['prototype']['hasOwnProp'+'erty']['call'](_0x55c954,_0x1178fb);};class EventBus{constructor(){Object['defineProp'+'erty'](this,'events',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}});}['on'](_0x2901c8,_0x34fdb0){!this['events'][_0x2901c8]&&(this['events'][_0x2901c8]=[]),this['events'][_0x2901c8]['push'](_0x34fdb0);}['emit'](_0x3dc5db,_0x10496f){this['events'][_0x3dc5db]&&this['events'][_0x3dc5db]['forEach'](_0x494cb0=>_0x494cb0(_0x10496f));}['off'](_0x42066e,_0x50c0ed){this['events'][_0x42066e]&&(this['events'][_0x42066e]=this['events'][_0x42066e]['filter'](_0x1facfd=>_0x1facfd!==_0x50c0ed));}}const eventBus=new EventBus();const properties$1=['toolbar','measure','toolbar-pl'+'acement','actions','modify-out'+'side','color-prim'+'ary'],_window=window,lineSize=-3703+-38*0x5e+0x1c70,vectorSize=0x1ca5+0x1*0x236b+-16395,colors={'primary':'#4907DA','red':'#FB2C36','redActive':'#E7110C'};let dragBeginPos={'x':-1,'y':-1};const vectorOffset=vectorSize/(0x1fb*-6+0x1a4c+-3688)+(-7279+0x6f7*0x1+-239*-23),originSelected={'ids':[],'x':0x0,'y':0x0,'width':0x0,'height':0x0};class GlideDNR extends HTMLElement{static get['observedAt'+'tributes'](){return properties$1;}constructor(){super(),Object['defineProp'+'erty'](this,'isToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isModifyOu'+'tside',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'toolbarPla'+'cement',{'enumerable':!![],'configurable':!![],'writable':!![],'value':'float'}),Object['defineProp'+'erty'](this,'colorPrima'+'ry',{'enumerable':!![],'configurable':!![],'writable':!![],'value':colors['primary']}),Object['defineProp'+'erty'](this,'loadingIte'+'ms',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{'general':{'total':0x0,'loaded':0x0},'image':{'total':0x0,'loaded':0x0}}}),Object['defineProp'+'erty'](this,'selected',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x5481c7(originSelected)}),Object['defineProp'+'erty'](this,'registered',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'requestAni'+'mation',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elSelected'+'Lines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'elSelected'+'Vectors',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),Object['defineProp'+'erty'](this,'rDrags',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elToolbar',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasure',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elAligns',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elActions',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'elMeasureO'+'utline',{'enumerable':!![],'configurable':!![],'writable':!![],'value':null}),Object['defineProp'+'erty'](this,'measureTar'+'getId',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'latestSele'+'cted',{'enumerable':!![],'configurable':!![],'writable':!![],'value':_0x5481c7(originSelected)}),Object['defineProp'+'erty'](this,'lastClickT'+'ime',{'enumerable':!![],'configurable':!![],'writable':!![],'value':-1}),Object['defineProp'+'erty'](this,'isInit',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseMoveT'+'ype',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'hasSelecte'+'d',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'hasMoved',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'isInSelect'+'ed',{'enumerable':!![],'configurable':!![],'writable':!![],'value':![]}),Object['defineProp'+'erty'](this,'mouseTarge'+'t',{'enumerable':!![],'configurable':!![],'writable':!![],'value':''}),Object['defineProp'+'erty'](this,'thresholdH'+'orizontal',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'thresholdV'+'ertical',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0x5}),Object['defineProp'+'erty'](this,'alignVecto'+'rsLinesThr'+'eshold',{'enumerable':!![],'configurable':!![],'writable':!![],'value':0.1}),Object['defineProp'+'erty'](this,'elMeasureL'+'ines',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['measure']=this['measure']['bind'](this),this['delete']=this['delete']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0x5bb177,_0x30cef4,_0x53e413){if(_0x30cef4===_0x53e413)return;switch(_0x5bb177){case 'toolbar':_0x53e413===''&&(this['isToolbar']=!![]);break;case 'measure':_0x53e413===''&&(this['isMeasure']=!![]);break;case 'toolbar-pl'+'acement':this['toolbarPla'+'cement']=_0x53e413;break;case 'actions':_0x53e413===''&&(this['isActions']=!![]);break;case 'modify-out'+'side':_0x53e413===''&&(this['isModifyOu'+'tside']=!![]);break;case 'color-prim'+'ary':this['colorPrima'+'ry']=_0x53e413;break;}}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22c'+'ontainer\x22\x20'+'id=\x22contai'+'ner\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22main'+'\x22\x20id=\x22main'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<slot\x20c'+'lass=\x22slot'+'\x22></slot>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_align\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22refer'+'ence-lines'+'_drag\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22refere'+'nce-lines_'+'selected\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<!--\x20line'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20class=\x22l'+'ine\x20left\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20style=\x22\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20'+(this['selected']['x']-lineSize/(-3853+0x185*-5+0x3a*0x64))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20righ'+'t\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20style'+'=\x22\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x20')+(this['selected']['x']+this['selected']['width']-lineSize/(0x125f+0xd17*-2+0x7d1))+'px\x20'+this['selected']['y']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+this['selected']['height']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20top\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20style=\x22'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'late:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-1567+-293*0x6+-3*-1109))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20class='+'\x22line\x20bott'+'om\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0xfce+-21*0x97+-873))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20')+this['selected']['width']+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20he'+'ight:\x20')+lineSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20><'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20vector\x20-'+'->\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'class=\x22vec'+'tor\x20top-le'+'ft\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20styl'+'e=\x22\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20tr'+'anslate:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20top-r'+'ight\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20st'+'yle=\x22\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'translate:'+'\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-left\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'style=\x22\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20translat'+'e:\x20')+(this['selected']['x']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20class=\x22ve'+'ctor\x20botto'+'m-right\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20style=\x22\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20transla'+'te:\x20')+(this['selected']['x']+this['selected']['width']-vectorOffset)+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+('px;\x22\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20<!-'+'-\x20测距离参考线\x20和'+'\x20数字\x20-->\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22me'+'asure-line'+'s\x22>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<!--\x20'+'实线：选中项\x20-->'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22solid\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22item\x20'+'top\x22></div'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22item'+'\x20bottom\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20left\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20rig'+'ht\x22></div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'!--\x20虚线：目标项'+'\x20-->\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22das'+'hed\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'item\x20horiz'+'ontal-top\x22'+'></div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22item\x20hor'+'izontal-bo'+'ttom\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22ite'+'m\x20vertical'+'-left\x22></d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20<div'+'\x20class=\x22it'+'em\x20vertica'+'l-right\x22><'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22numb'+'er\x20number-'+'top\x22>283</'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22num'+'ber\x20number'+'-bottom\x22>2'+'22</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22number\x20nu'+'mber-left\x22'+'>333</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22number\x20'+'number-rig'+'ht\x22>444</d'+'iv>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'measure-ta'+'rget-outli'+'ne\x22></div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20')+(this['isToolbar']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar\x22>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22inner\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<div\x20c'+'lass=\x22grou'+'p\x20aligns\x22\x20'+'id=\x22aligns'+'\x22>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20hor'+'izontal-le'+'ft\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M145.39-1'+'00q-12.77\x20'+'0-21.39-8.'+'62-8.61-8.'+'61-8.61-21'+'.38v-700q0'+'-12.77\x208.6'+'1-21.38\x208.'+'62-8.62\x2021'+'.39-8.62\x201'+'2.77\x200\x2021.'+'38\x208.62\x208.'+'62\x208.61\x208.'+'62\x2021.38v7'+'00q0\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62Zm171.92'+'-193.85q-2'+'0.77\x200-35.'+'58-14.8-14'+'.8-14.81-1'+'4.8-35.58\x20'+'0-20.77\x2014'+'.8-35.58\x201'+'4.81-14.8\x20'+'35.58-14.8'+'h236.92q20'+'.77\x200\x2035.5'+'8\x2014.8\x2014.'+'8\x2014.81\x2014'+'.8\x2035.58\x200'+'\x2020.77-14.'+'8\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'317.31Zm0-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H3'+'17.31Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<div\x20clas'+'s=\x22toolbar'+'-item\x20hori'+'zontal-cen'+'ter\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+('ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M4'+'50-130v-16'+'3.85H310.3'+'9q-20.77\x200'+'-35.58-14.'+'8Q260-323.'+'46\x20260-344'+'.23q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450v'+'-170.78H19'+'0.39q-20.7'+'7\x200-35.58-'+'14.8Q140-5'+'95\x20140-615'+'.77q0-20.7'+'7\x2014.81-35'+'.58\x2014.81-'+'14.8\x2035.58'+'-14.8H450V'+'-830q0-12.'+'75\x208.63-21'+'.37\x208.63-8'+'.63\x2021.38-'+'8.63\x2012.76'+'\x200\x2021.37\x208'+'.63Q510-84'+'2.75\x20510-8'+'30v163.85h'+'259.61q20.'+'77\x200\x2035.58'+'\x2014.8Q820-'+'636.54\x20820'+'-615.77q0\x20'+'20.77-14.8'+'1\x2035.58-14'+'.81\x2014.8-3'+'5.58\x2014.8H'+'510v170.78'+'h139.61q20'+'.77\x200\x2035.5'+'8\x2014.8Q700'+'-365\x20700-3'+'44.23q0\x2020'+'.77-14.81\x20'+'35.58-14.8'+'1\x2014.8-35.'+'58\x2014.8H51'+'0V-130q0\x201'+'2.75-8.63\x20'+'21.37-8.63'+'\x208.63-21.3'+'8\x208.63-12.'+'76\x200-21.37'+'-8.63Q450-'+'117.25\x20450'+'-130Z\x22/></'+'svg>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22toolbar-'+'item\x20horiz'+'ontal-righ'+'t\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'<svg\x20xmlns'+'=\x22http://w'+'ww.w3.org/'+'2000/svg\x22\x20'+'height=\x2218'+'px\x22\x20viewBo'+'x=\x220\x20-960\x20'+'960\x20960\x22\x20w'+'idth=\x2218px'+'\x22\x20fill=\x22#0'+'30713\x22><pa'+'th\x20d=\x22M814'+'.61-100q-1'+'2.77\x200-21.'+'38-8.62-8.'+'62-8.61-8.'+'62-21.38v-'+'700q0-12.7'+'7\x208.62-21.'+'38\x208.61-8.'+'62\x2021.38-8')+('.62t21.39\x20'+'8.62q8.61\x20'+'8.61\x208.61\x20'+'21.38v700q'+'0\x2012.77-8.'+'61\x2021.38-8'+'.62\x208.62-2'+'1.39\x208.62Z'+'M405.77-29'+'3.85q-20.7'+'7\x200-35.58-'+'14.8-14.8-'+'14.81-14.8'+'-35.58\x200-2'+'0.77\x2014.8-'+'35.58\x2014.8'+'1-14.8\x2035.'+'58-14.8h23'+'6.92q20.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58\x200\x2020'+'.77-14.8\x203'+'5.58-14.81'+'\x2014.8-35.5'+'8\x2014.8H405'+'.77Zm-240-'+'271.54q-20'+'.77\x200-35.5'+'8-14.8-14.'+'8-14.81-14'+'.8-35.58\x200'+'-20.77\x2014.'+'8-35.58\x2014'+'.81-14.8\x203'+'5.58-14.8h'+'476.92q20.'+'77\x200\x2035.58'+'\x2014.8\x2014.8'+'\x2014.81\x2014.'+'8\x2035.58\x200\x20'+'20.77-14.8'+'\x2035.58-14.'+'81\x2014.8-35'+'.58\x2014.8H1'+'65.77Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22divide'+'r\x22></div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-top\x22>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20heigh'+'t=\x2218px\x22\x20v'+'iewBox=\x220\x20'+'-960\x20960\x209'+'60\x22\x20width='+'\x2218px\x22\x20fil'+'l=\x22#030713'+'\x22><path\x20d='+'\x22M344.23-1'+'10q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-488'+'.07q0-20.7'+'7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v488.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q365-110\x20'+'344.23-110'+'Zm271.54-2'+'40q-20.77\x20'+'0-35.58-14'+'.81-14.8-1'+'4.81-14.8-'+'35.58v-248'+'.07q0-20.7')+('7\x2014.8-35.'+'58\x2014.81-1'+'4.8\x2035.58-'+'14.8\x2020.77'+'\x200\x2035.58\x201'+'4.8\x2014.8\x201'+'4.81\x2014.8\x20'+'35.58v248.'+'07q0\x2020.77'+'-14.8\x2035.5'+'8Q636.54-3'+'50\x20615.77-'+'350ZM130-7'+'90.38q-12.'+'77\x200-21.38'+'-8.62-8.62'+'-8.61-8.62'+'-21.38t8.6'+'2-21.39q8.'+'61-8.61\x2021'+'.38-8.61h7'+'00q12.77\x200'+'\x2021.38\x208.6'+'1\x208.62\x208.6'+'2\x208.62\x2021.'+'39\x200\x2012.77'+'-8.62\x2021.3'+'8-8.61\x208.6'+'2-21.38\x208.'+'62H130Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba'+'r-item\x20ver'+'tical-cent'+'er\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'svg\x20xmlns='+'\x22http://ww'+'w.w3.org/2'+'000/svg\x22\x20h'+'eight=\x2218p'+'x\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218px\x22'+'\x20fill=\x22#03'+'0713\x22><pat'+'h\x20d=\x22M342.'+'31-140q-20'+'.77\x200-35.5'+'8-14.81-14'+'.81-14.81-'+'14.81-35.5'+'8V-450H130'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-51'+'0\x20130-510h'+'161.92v-25'+'9.61q0-20.'+'77\x2014.81-3'+'5.58Q321.5'+'4-820\x20342.'+'31-820q20.'+'77\x200\x2035.57'+'\x2014.81\x2014.'+'81\x2014.81\x201'+'4.81\x2035.58'+'V-510h174.'+'62v-139.61'+'q0-20.77\x201'+'4.81-35.58'+'Q596.92-70'+'0\x20617.69-7'+'00t35.58\x201'+'4.81q14.81'+'\x2014.81\x2014.'+'81\x2035.58V-'+'510H830q12'+'.75\x200\x2021.3'+'7\x208.63\x208.6'+'3\x208.63\x208.6'+'3\x2021.38\x200\x20'+'12.76-8.63'+'\x2021.37Q842'+'.75-450\x2083'+'0-450H668.'+'08v139.61q'+'0\x2020.77-14'+'.81\x2035.58Q'+'638.46-260'+'\x20617.69-26')+('0q-20.77\x200'+'-35.57-14.'+'81-14.81-1'+'4.81-14.81'+'-35.58V-45'+'0H392.69v2'+'59.61q0\x2020'+'.77-14.81\x20'+'35.58Q363.'+'08-140\x20342'+'.31-140Z\x22/'+'></svg>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20</div>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22toolb'+'ar-item\x20ve'+'rtical-bot'+'tom\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-110q-12'+'.77\x200-21.3'+'8-8.62Q100'+'-127.23\x2010'+'0-140t8.62'+'-21.39Q117'+'.23-170\x2013'+'0-170h700q'+'12.77\x200\x2021'+'.38\x208.61Q8'+'60-152.77\x20'+'860-140q0\x20'+'12.77-8.62'+'\x2021.38Q842'+'.77-110\x2083'+'0-110H130Z'+'m214.23-15'+'1.54q-20.7'+'7\x200-35.58-'+'14.81-14.8'+'-14.81-14.'+'8-35.57V-8'+'00q0-20.77'+'\x2014.8-35.5'+'7\x2014.81-14'+'.81\x2035.58-'+'14.81\x2020.7'+'7\x200\x2035.58\x20'+'14.81\x2014.8'+'\x2014.8\x2014.8'+'\x2035.57v488'+'.08q0\x2020.7'+'6-14.8\x2035.'+'57-14.81\x201'+'4.81-35.58'+'\x2014.81Zm27'+'1.54\x200q-20'+'.77\x200-35.5'+'8-14.81-14'+'.8-14.81-1'+'4.8-35.57V'+'-560q0-20.'+'77\x2014.8-35'+'.57\x2014.81-'+'14.81\x2035.5'+'8-14.81\x2020'+'.77\x200\x2035.5'+'8\x2014.81\x2014'+'.8\x2014.8\x2014'+'.8\x2035.57v2'+'48.08q0\x2020'+'.76-14.8\x203'+'5.57-14.81'+'\x2014.81-35.'+'58\x2014.81Z\x22'+'/></svg>\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22div'+'ider\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<div\x20cla'+'ss=\x22toolba')+('r-item\x20hor'+'izontal-di'+'stribute\x22>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<sv'+'g\x20xmlns=\x22h'+'ttp://www.'+'w3.org/200'+'0/svg\x22\x20hei'+'ght=\x2218px\x22'+'\x20viewBox=\x22'+'0\x20-960\x20960'+'\x20960\x22\x20widt'+'h=\x2218px\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M129.99'+'-100q-12.7'+'6\x200-21.37-'+'8.63Q100-1'+'17.25\x20100-'+'130v-700q0'+'-12.75\x208.6'+'3-21.37\x208.'+'63-8.63\x2021'+'.38-8.63\x201'+'2.76\x200\x2021.'+'37\x208.63Q16'+'0-842.75\x201'+'60-830v700'+'q0\x2012.75-8'+'.63\x2021.37-'+'8.63\x208.63-'+'21.38\x208.63'+'Zm350.06-1'+'90q-20.82\x20'+'0-35.43-14'+'.58Q430-31'+'9.17\x20430-3'+'40v-280q0-'+'20.83\x2014.5'+'7-35.42Q45'+'9.14-670\x204'+'79.95-670q'+'20.82\x200\x2035'+'.43\x2014.58Q'+'530-640.83'+'\x20530-620v2'+'80q0\x2020.83'+'-14.57\x2035.'+'42Q500.86-'+'290\x20480.05'+'-290Zm349.'+'94\x20190q-12'+'.76\x200-21.3'+'7-8.63Q800'+'-117.25\x2080'+'0-130v-700'+'q0-12.75\x208'+'.63-21.37\x20'+'8.63-8.63\x20'+'21.38-8.63'+'\x2012.76\x200\x202'+'1.37\x208.63Q'+'860-842.75'+'\x20860-830v7'+'00q0\x2012.75'+'-8.63\x2021.3'+'7-8.63\x208.6'+'3-21.38\x208.'+'63Z\x22/></sv'+'g>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20</d'+'iv>\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20<'+'div\x20class='+'\x22toolbar-i'+'tem\x20vertic'+'al-distrib'+'ute\x22>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20<svg\x20xml'+'ns=\x22http:/'+'/www.w3.or'+'g/2000/svg'+'\x22\x20height=\x22'+'18px\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'px\x22\x20fill=\x22'+'#030713\x22><'+'path\x20d=\x22M1'+'30-100q-12'+'.75\x200-21.3'+'7-8.63-8.6'+'3-8.63-8.6'+'3-21.38\x200-'+'12.76\x208.63'+'-21.37Q117')+('.25-160\x2013'+'0-160h700q'+'12.75\x200\x2021'+'.37\x208.63\x208'+'.63\x208.63\x208'+'.63\x2021.38\x20'+'0\x2012.76-8.'+'63\x2021.37Q8'+'42.75-100\x20'+'830-100H13'+'0Zm210-330'+'q-20.83\x200-'+'35.42-14.5'+'7Q290-459.'+'14\x20290-479'+'.95q0-20.8'+'2\x2014.58-35'+'.43Q319.17'+'-530\x20340-5'+'30h280q20.'+'83\x200\x2035.42'+'\x2014.57Q670'+'-500.86\x2067'+'0-480.05q0'+'\x2020.82-14.'+'58\x2035.43Q6'+'40.83-430\x20'+'620-430H34'+'0ZM130-800'+'q-12.75\x200-'+'21.37-8.63'+'-8.63-8.63'+'-8.63-21.3'+'8\x200-12.76\x20'+'8.63-21.37'+'Q117.25-86'+'0\x20130-860h'+'700q12.75\x20'+'0\x2021.37\x208.'+'63\x208.63\x208.'+'63\x208.63\x2021'+'.38\x200\x2012.7'+'6-8.63\x2021.'+'37Q842.75-'+'800\x20830-80'+'0H130Z\x22/><'+'/svg>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22d'+'ivider\x22></'+'div>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20</div>\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20')+(this['isMeasure']?'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20<div\x20cl'+'ass=\x22group'+'\x20measure\x22\x20'+'id=\x22measur'+'e\x22>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20<d'+'iv\x20class=\x22'+'toolbar-it'+'em\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20<svg\x20xmln'+'s=\x22http://'+'www.w3.org'+'/2000/svg\x22'+'\x20height=\x221'+'8\x22\x20viewBox'+'=\x220\x20-960\x209'+'60\x20960\x22\x20wi'+'dth=\x2218\x22\x20f'+'ill=\x22#0307'+'13\x22><path\x20'+'d=\x22M172.31'+'-260Q142-2'+'60\x20121-281'+'q-21-21-21'+'-51.44v-29'+'5.12Q100-6'+'58\x20121-679'+'q21-21\x2051.'+'31-21h615.'+'38Q818-700'+'\x20839-679q2'+'1\x2021\x2021\x2051'+'.44v295.12'+'Q860-302\x208'+'39-281q-21'+'\x2021-51.31\x20'+'21H172.31Z'+'m0-60h615.'+'38q4.62\x200\x20'+'8.46-3.85\x20'+'3.85-3.84\x20'+'3.85-8.46v'+'-295.38q0-'+'4.62-3.85-'+'8.46-3.84-'+'3.85-8.46-'+'3.85H670v1'+'14.61q0\x2012'+'.75-8.63\x202'+'1.38-8.63\x20'+'8.62-21.38'+'\x208.62-12.7'+'6\x200-21.37-'+'8.62-8.62-'+'8.63-8.62-'+'21.38V-640'+'H510v114.6'+'1q0\x2012.75-'+'8.63\x2021.38'+'-8.63\x208.62'+'-21.38\x208.6'+'2-12.76\x200-'+'21.37-8.62'+'-8.62-8.63'+'-8.62-21.3'+'8V-640H350'+'v114.61q0\x20'+'12.75-8.63'+'\x2021.38-8.6'+'3\x208.62-21.'+'38\x208.62-12'+'.76\x200-21.3'+'7-8.62-8.6'+'2-8.63-8.6'+'2-21.38V-6'+'40H172.31q'+'-4.62\x200-8.'+'46\x203.85-3.'+'85\x203.84-3.'+'85\x208.46v29'+'5.38q0\x204.6'+'2\x203.85\x208.4'+'6\x203.84\x203.8'+'5\x208.46\x203.8'+'5ZM320-495'+'.39Zm160\x200'+'Zm160\x200ZM4'+'80-480Z\x22/>'+'</svg>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'</div>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20':'')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20</di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20'):'')+('\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'<div\x20class'+'=\x22actions\x22'+'\x20id=\x22actio'+'ns\x22>\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22act'+'ions-item\x22'+'>\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20<svg\x20x'+'mlns=\x22http'+'://www.w3.'+'org/2000/s'+'vg\x22\x20height'+'=\x2218\x22\x20view'+'Box=\x220\x20-96'+'0\x20960\x20960\x22'+'\x20width=\x2218'+'\x22><path\x20d='+'\x22M280-120q'+'-33\x200-56.5'+'-23.5T200-'+'200v-520q-'+'17\x200-28.5-'+'11.5T160-7'+'60q0-17\x2011'+'.5-28.5T20'+'0-800h160q'+'0-17\x2011.5-'+'28.5T400-8'+'40h160q17\x20'+'0\x2028.5\x2011.'+'5T600-800h'+'160q17\x200\x202'+'8.5\x2011.5T8'+'00-760q0\x201'+'7-11.5\x2028.'+'5T760-720v'+'520q0\x2033-2'+'3.5\x2056.5T6'+'80-120H280'+'Zm400-600H'+'280v520h40'+'0v-520ZM40'+'0-280q17\x200'+'\x2028.5-11.5'+'T440-320v-'+'280q0-17-1'+'1.5-28.5T4'+'00-640q-17'+'\x200-28.5\x2011'+'.5T360-600'+'v280q0\x2017\x20'+'11.5\x2028.5T'+'400-280Zm1'+'60\x200q17\x200\x20'+'28.5-11.5T'+'600-320v-2'+'80q0-17-11'+'.5-28.5T56'+'0-640q-17\x20'+'0-28.5\x2011.'+'5T520-600v'+'280q0\x2017\x201'+'1.5\x2028.5T5'+'60-280ZM28'+'0-720v520-'+'520Z\x22/></s'+'vg>\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20<'+'/div>\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20<div\x20'+'class=\x22loa'+'ding\x22>\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20<di'+'v\x20class=\x22i'+'nner\x22></di'+'v>\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20</div>\x0a\x20\x20'+'\x20\x20\x20\x20</div>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20/*\x20定义旋'+'转动画\x20*/\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20@keyf'+'rames\x20rota'+'te360\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fr'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ransform:\x20'+'rotate(0de'+'g);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20to\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20trans'+'form:\x20rota'+'te(360deg)'+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20:host\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x20calc(100'+'%\x20-\x201px);\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20ca'+'lc(100%\x20-\x20'+'1px);\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.co'+'ntainer\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'00%;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20positio'+'n:\x20relativ'+'e;\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.mai'+'n\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x20100%;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x20100%;\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20::slot'+'ted(glide-'+'dnr-item)\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20inline-'+'block;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20flex-sh'+'rink:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20user-'+'select:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'cursor:\x20au'+'to;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.al'+'ign-vector'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20col'+'or:\x20'))+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20font'+'-size:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lin'+'e-height:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20z-i'+'ndex:\x201000'+'04;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.align-'+'line\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ali'+'gn-line-ve'+'rtical\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20border-'+'top:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.align-li'+'ne-horizon'+'tal\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-lef'+'t:\x20solid\x201'+'px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'reference-'+'lines_sele'+'cted\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.line\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100002;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20visibi'+'lity:\x20hidd'+'en;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20&.left,\x20&'+'.right\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20&:'+'hover\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20cu'+'rsor:\x20ew-r'+'esize;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20&::b'+'efore\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20co'+'ntent:\x20\x27\x27;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20position:'+'\x20absolute;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20left:\x20')+Math['floor'](lineSize/(0x11e9+-2723+0x136*-6))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x20100%;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op,\x20&.bott'+'om\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&:hove'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20cursor'+':\x20ns-resiz'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20&::befor'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20conten'+'t:\x20\x27\x27;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20lef'+'t:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x20')+Math['floor'](lineSize/(0x1480+-4034+-1212))+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20width:'+'\x20100%;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+':\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20.vector\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20display'+':\x20inline-b'+'lock;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x20')+vectorSize+('px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border:\x20so'+'lid\x201px\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'#ffffff;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20z-ind'+'ex:\x20100003'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.top'+'-left,\x20&.b'+'ottom-righ'+'t\x20{\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20se-resize'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op-right,\x20'+'&.bottom-l'+'eft\x20{\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&:hov'+'er\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20nesw-re'+'size;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.re'+'ference-li'+'nes_drag\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20w'+'idth:\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x200px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20top:\x200px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20border:\x20s'+'olid\x201px\x20')+this['colorPrima'+'ry']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20z-in'+'dex:\x2011;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20rgba('+'73,\x207,\x20218'+',\x20.05);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'toolbar\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20displa'+'y:\x20')+(this['toolbarPla'+'cement']==='float'?'inline':'block')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20posi'+'tion:\x20abso'+'lute;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'top:\x20')+(this['toolbarPla'+'cement']==='float'?-7772*0x1+0x319+0x1b43*0x1:'10px')+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20')+(this['toolbarPla'+'cement']==='float'?'':'width:\x20100'+'%;')+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20t'+'ext-align:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20ponter-'+'events:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20z-'+'index:\x20100'+'005;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.inner\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-flex;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20gap:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'padding:\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'border-rad'+'ius:\x208px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20tran'+'slate:\x200px'+'\x200px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20rgba(2'+'55,255,255'+',.5);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backdrop'+'-filter:\x20b'+'lur(25px);'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20box'+'-shadow:\x200'+'\x204px\x206px\x20-'+'1px\x20rgb(0\x20'+'0\x200\x20/\x200.1)'+',\x200\x202px\x204p'+'x\x20-2px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100004;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20ponter'+'-events:\x20a'+'uto;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20.group\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20no'+'ne;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20gap:\x204px'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'align-item'+'s:\x20center;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.div'+'ider\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20wid'+'th:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20h'+'eight:\x2012p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und:\x20#D1D5'+'DC;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.toolba'+'r-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20in'+'line-flex;'+('\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20padding:\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20curso'+'r:\x20pointer'+';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:hover'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20#F3'+'F4F6;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20&'+':active\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20#E5E7E'+'B;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20&.acti'+'ve\x20{\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.too'+'lbar-item\x20'+'{\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20'))+this['colorPrima'+'ry']+(';\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20svg\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20#ffffff;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20.m'+'easure-lin'+'es\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0006;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20top:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20left'+':\x200;\x0a\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'.solid\x20{\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20.ite'+'m\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20visibili'+'ty:\x20hidden'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'absolute;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20left:\x20'+'0;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20z-index:\x20'+'100005;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.t'+'op\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20width'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x204px\x2012'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'y;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'bottom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.b'+'ottom\x20{\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20wi'+'dth:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x204px'+'\x2012px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-y;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20bottom,'+'\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.l'+'eft\x20{\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20heig'+'ht:\x201px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'size:\x2012px'+'\x204px;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-rep'+'eat:\x20repea'+'t-x;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-imag'+'e:\x20linear-'+'gradient(t'+'o\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&.r'+'ight\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20hei'+'ght:\x201px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-size:\x2012p'+'x\x204px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-re'+'peat:\x20repe'+'at-x;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground-ima'+'ge:\x20linear'+'-gradient('+'to\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x20100%);\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20.da'+'shed\x20{\x0a\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.item\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'visibility'+':\x20hidden;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20po'+'sition:\x20ab'+'solute;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20left:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20z'+'-index:\x2010'+'0005;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20&.hor'+'izontal-to'+'p\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20height'+':\x201px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kground-si'+'ze:\x2012px\x204'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-repea'+'t:\x20repeat-'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-image:'+'\x20linear-gr'+'adient(to\x20'+'right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.horiz'+'ontal-bott'+'om\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x201px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground-s'+'ize:\x2012px\x20'+'4px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round-repe'+'at:\x20repeat'+'-x;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-image'+':\x20linear-g'+'radient(to'+'\x20right,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-left\x20{'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20width:\x201p'+'x;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20backgro'+'und-size:\x20'+'4px\x2012px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-repeat:\x20r'+'epeat-y;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20b'+'ackground-'+'image:\x20lin'+'ear-gradie'+'nt(to\x20bott'+'om,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&.verti'+'cal-right\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20width:\x201'+'px;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20backgr'+'ound-size:'+'\x204px\x2012px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20backgroun'+'d-repeat:\x20'+'repeat-y;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'background'+'-image:\x20li'+'near-gradi'+'ent(to\x20bot'+'tom,\x20')+colors['red']+'\x200%,\x20'+colors['red']+('\x2065%,\x20tran'+'sparent\x2035'+'%);\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20}\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.number'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20v'+'isibility:'+'\x20hidden;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20posit'+'ion:\x20absol'+'ute;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20top:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20left:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'font-size:'+'\x2010px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20padding'+':2px\x204px;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'ground:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-radiu'+'s:\x204px;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20color:'+'\x20#FFFFFF;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.measur'+'e-target-o'+'utline\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20visibil'+'ity:\x20hidde'+'n;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bor'+'der:\x20solid'+'\x201px\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20box-'+'sizing:\x20bo'+'rder-box;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20pointer'+'-events:\x20n'+'one\x20!impor'+'tant;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'z-index:\x201'+'00006;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20}'+'\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20.actio'+'ns\x20{\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20p'+'osition:\x20a'+'bsolute;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20left:\x200'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20top:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20vi'+'sibility:\x20'+'hidden;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20.action'+'s-item\x20{\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20paddi'+'ng:\x204px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'8px;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20translate'+':\x200px\x200px;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20bac'+'kdrop-filt'+'er:\x20blur(2'+'5px);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20z-index:'+'\x20100004;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20line-'+'height:\x200;'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20cur'+'sor:\x20point'+'er;\x0a\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20svg\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20fill:'+'\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20}\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20&:h'+'over\x20{\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20backg'+'round:\x20')+colors['red']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20&:activ'+'e\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20backgrou'+'nd:\x20')+colors['redActive']+(';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'box-shadow'+':\x200\x204px\x206p'+'x\x20-1px\x20rgb'+'(0\x200\x200\x20/\x200'+'.1),\x200\x202px'+'\x204px\x20-2px\x20'+'rgb(0\x200\x200\x20'+'/\x200.1);\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20svg'+'\x20{\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20fill:\x20#'+'FFFFFF;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20}\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20.'+'loading\x20{\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20positi'+'on:\x20absolu'+'te;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20to'+'p:\x200;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'left:\x200;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20width:\x20'+'100%;\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'height:\x2010'+'0%;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20ba'+'ckground:\x20'+'rgba(255,2'+'55,255,.5)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20back'+'drop-filte'+'r:\x20blur(25'+'px);\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20d'+'isplay:\x20fl'+'ex;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20al'+'ign-items:'+'\x20center;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20justify'+'-content:\x20'+'center;\x0a\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20z-index'+':\x20100007;\x0a'+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20.inne'+'r\x20{\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'position:\x20'+'relative;\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20widt'+'h:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20heigh'+'t:\x2030px;\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r:\x202px\x20sol'+'id\x20#4907DA'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-top-c'+'olor:\x20rgba'+'(0,\x200,\x200,\x20'+'0.2);\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20border-r'+'ight-color'+':\x20rgba(0,\x20'+'0,\x200,\x200.2)'+';\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20bo'+'rder-botto'+'m-color:\x20r'+'gba(0,\x200,\x20'+'0,\x200.2);\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20borde'+'r-radius:\x20'+'100%;\x0a\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20animati'+('on:\x20rotate'+'360\x20infini'+'te\x200.75s\x20l'+'inear;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20}\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x20'+'\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a'+'\x20\x20\x20\x20\x20\x20\x20\x20.s'+'lot\x20{}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20'));}['onceBindin'+'gs'](){const _0x449069=this['shadowRoot'];if(_0x449069===null)return;let _0xdb194a=_0x449069['querySelec'+'tor']('.main');if(_0xdb194a!==null&&_0xdb194a!==undefined){const {width:_0x5f0d35,height:_0x3678ff}=_0xdb194a['getBoundin'+'gClientRec'+'t']();this['registered']['main']={'id':'main','el':_0xdb194a,'x':0x0,'y':0x0,'width':_0x5f0d35,'height':_0x3678ff,'type':'main'};}this['isToolbar']&&(_0xdb194a=_0x449069['querySelec'+'tor']('.toolbar'),_0xdb194a!==null&&(this['elToolbar']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.aligns'),_0xdb194a!==null&&(this['elAligns']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure'),_0xdb194a!==null&&(this['elMeasure']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-t'+'arget-outl'+'ine'),_0xdb194a!==null&&(this['elMeasureO'+'utline']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.top'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['solid_t']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.bott'+'om'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['solid_b']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.left'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['solid_l']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.righ'+'t'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['solid_r']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-top'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['dashed_h_t']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.hori'+'zontal-bot'+'tom'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['dashed_h_b']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-left'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['dashed_v_l']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20.vert'+'ical-right'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['dashed_v_r']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-top'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['numberT']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-bottom'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['numberB']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-left'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['numberL']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.measure-l'+'ines\x20\x20.num'+'ber-right'),_0xdb194a!==null&&(this['elMeasureL'+'ines']['numberR']=_0xdb194a)),_0xdb194a=_0x449069['querySelec'+'tor']('.left'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'l')&&(this['elSelected'+'Lines']['l']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.right'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'r')&&(this['elSelected'+'Lines']['r']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.top'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'t')&&(this['elSelected'+'Lines']['t']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.bottom'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'b')&&(this['elSelected'+'Lines']['b']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.top-left'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'tl')&&(this['elSelected'+'Vectors']['tl']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.top-right'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'tr')&&(this['elSelected'+'Vectors']['tr']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.bottom-le'+'ft'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'bl')&&(this['elSelected'+'Vectors']['bl']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.bottom-ri'+'ght'),_0xdb194a!==null&&!HasOwn(this['elSelected'+'Lines'],'br')&&(this['elSelected'+'Vectors']['br']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('.reference'+'-lines_dra'+'g'),_0xdb194a!==null&&this['rDrags']===null&&(this['rDrags']=_0xdb194a),_0xdb194a=_0x449069['querySelec'+'tor']('#actions'),_0xdb194a!==null&&(this['elActions']=_0xdb194a);}['countLoadi'+'ngItems'](){const _0x54c84c=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x54c84c===null||_0x54c84c===undefined)return;const _0x395ddd=_0x54c84c['assignedNo'+'des']({'flatten':![]});for(const _0xcb6a7c in _0x395ddd){const _0x125ff4=_0x395ddd[_0xcb6a7c];if(_0x125ff4['nodeType']!==Node['ELEMENT_NO'+'DE'])continue;const _0x2aa83d=_0x125ff4['getAttribu'+'te']('type');_0x2aa83d==='image'&&this['loadingIte'+'ms']['image']['total']++,(_0x2aa83d===null||_0x2aa83d==='general')&&this['loadingIte'+'ms']['general']['total']++;}}['hideLoadin'+'g'](){if(this['loadingIte'+'ms']['general']['loaded']===this['loadingIte'+'ms']['general']['total']&&this['loadingIte'+'ms']['image']['loaded']===this['loadingIte'+'ms']['image']['total']){const _0x583444=this['shadowRoot']?.['querySelec'+'tor']('.loading');_0x583444!==null&&_0x583444!==undefined&&(_0x583444['style']['display']='none');}}['renderItem'+'s'](){const _0x46194a=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x46194a===null||_0x46194a===undefined)return;const _0x5f5c3c=_0x46194a['assignedNo'+'des']({'flatten':![]});for(const _0x1fbc2d in _0x5f5c3c){const _0x4f76bd=_0x5f5c3c[_0x1fbc2d];if(_0x4f76bd['nodeType']!==Node['ELEMENT_NO'+'DE']){this['hideLoadin'+'g']();continue;}const _0x488e1b=_0x4f76bd['getAttribu'+'te']('type');(_0x488e1b===null||_0x488e1b==='general')&&(this['renderItem'](_0x4f76bd),this['hideLoadin'+'g']());if(_0x488e1b==='image'){if(_0x4f76bd['querySelec'+'tor']('canvas'))continue;this['renderImag'+'eItem'](_0x4f76bd)['then'](()=>{this['hideLoadin'+'g']();});}}}['renderItem'](_0x5bc3e4){const _0x2b4e14=_0x5bc3e4['getBoundin'+'gClientRec'+'t']();let _0x283e0a=_0x2b4e14['width'],_0x2bba87=_0x2b4e14['height'];const _0x4381e3=_0x5bc3e4['getAttribu'+'te']('left'),_0x4369f7=_0x5bc3e4['getAttribu'+'te']('top'),_0x4c30e8=_0x5bc3e4['getAttribu'+'te']('width'),_0x326c60=_0x5bc3e4['getAttribu'+'te']('height');let _0xa493bc=-7819+-4265+0x2f34,_0x276f57=0x1a77+0xf31*-1+-39*0x4a;_0x4381e3!==null&&(_0xa493bc=_0x4381e3);_0x4369f7!==null&&(_0x276f57=_0x4369f7);_0x4c30e8!==null&&(_0x283e0a=_0x4c30e8);_0x326c60!==null&&(_0x2bba87=_0x326c60);if(_0x5bc3e4['style']['translate']!==''){const _0x3d9ae2=window['getCompute'+'dStyle'](_0x5bc3e4),_0x78fba4=this['getTransla'+'tePos'](_0x3d9ae2['translate']);_0xa493bc=_0x78fba4['x'],_0x276f57=_0x78fba4['y'];}_0xa493bc=Math['round'](_0xa493bc),_0x276f57=Math['round'](_0x276f57),_0x283e0a=Math['round'](_0x283e0a),_0x2bba87=Math['round'](_0x2bba87),this['registered'][_0x5bc3e4['id']]={'id':_0x5bc3e4['id'],'el':_0x5bc3e4,'x':_0xa493bc,'y':_0x276f57,'width':_0x283e0a,'height':_0x2bba87,'type':'general'},this['loadingIte'+'ms']['general']['loaded']++,_0x5bc3e4['style']['visibility']='visible',_0x5bc3e4['style']['translate']=_0xa493bc+'px\x20'+_0x276f57+'px',_0x5bc3e4['style']['width']=_0x283e0a+'px',_0x5bc3e4['style']['height']=_0x2bba87+'px';}['renderImag'+'eItem'](_0x95f346){return new Promise(_0x10a460=>{if(_0x95f346['nodeType']===Node['ELEMENT_NO'+'DE']){const _0x3d1425=document['createElem'+'ent']('canvas');_0x3d1425['style']['cssText']='width:\x20100'+'%;\x20height:'+'\x20100%;';const _0x59b537=_0x3d1425['getContext']('2d'),_0x23a3a4=_0x95f346['querySelec'+'tor']('img'),_0x684a03=new Image();_0x684a03['src']=_0x23a3a4['src'];const _0x30bbf2=_0x95f346['getElement'+'sByTagName']('img');Array['from'](_0x30bbf2)['forEach'](_0x3677e6=>{_0x3677e6['remove']();}),_0x684a03['onload']=()=>{let _0x582883=-5291+0x23*0x11b+-4614,_0x3c08d3=-8627+0x22c+0x1f87;const _0x57d0ed=_0x95f346['getAttribu'+'te']('left'),_0x34bb11=_0x95f346['getAttribu'+'te']('top'),_0xef1113=_0x95f346['getAttribu'+'te']('width'),_0x173fb1=_0x95f346['getAttribu'+'te']('height');_0x57d0ed!==null&&(_0x582883=_0x57d0ed);_0x34bb11!==null&&(_0x3c08d3=_0x34bb11);if(_0x95f346['style']['translate']!==''){const _0x35d9d1=window['getCompute'+'dStyle'](_0x95f346),_0x436794=this['getTransla'+'tePos'](_0x35d9d1['translate']);_0x582883=_0x436794['x'],_0x3c08d3=_0x436794['y'];}const _0x5bb81f=_0x684a03['width']/_0x684a03['height'];let _0x11e242=_0x684a03['width'],_0x453cf2=_0x684a03['height'];if(_0xef1113!==null&&_0x173fb1!==null)_0x11e242=_0xef1113,_0x453cf2=_0x11e242/_0x5bb81f,_0x95f346['style']['width']=Math['round'](_0x11e242)+'px',_0x95f346['style']['height']=Math['round'](_0x453cf2)+'px';else {if(_0xef1113!==null&&_0x173fb1===null)_0x11e242=_0xef1113,_0x453cf2=_0x11e242/_0x5bb81f,_0x95f346['style']['width']=Math['round'](_0x11e242)+'px',_0x95f346['style']['height']=Math['round'](_0x453cf2)+'px';else _0xef1113===null&&_0x173fb1!==null?(_0x453cf2=_0x173fb1,_0x11e242=_0x453cf2*_0x5bb81f,_0x95f346['style']['width']=Math['round'](_0x11e242)+'px',_0x95f346['style']['height']=Math['round'](_0x453cf2)+'px'):(_0x95f346['style']['width']=Math['round'](_0x11e242)+'px',_0x95f346['style']['height']=Math['round'](_0x453cf2)+'px');}_0x582883=Math['round'](_0x582883),_0x3c08d3=Math['round'](_0x3c08d3),_0x11e242=Math['round'](_0x11e242),_0x453cf2=Math['round'](_0x453cf2),this['registered'][_0x95f346['id']]={'id':_0x95f346['id'],'el':_0x95f346,'x':_0x582883,'y':_0x3c08d3,'width':_0x11e242,'height':_0x453cf2,'type':'image'};const _0x1d8b60=Math['min'](window['innerWidth']/_0x684a03['width'],window['innerHeigh'+'t']/_0x684a03['height']),_0x22901b=Math['round'](_0x684a03['width']*_0x1d8b60),_0x287a65=Math['round'](_0x684a03['height']*_0x1d8b60);_0x3d1425['width']=_0x22901b,_0x3d1425['height']=_0x287a65,_0x59b537?.['drawImage'](_0x684a03,-17*-59+-6676+0x1629,0x1*-123+-552+-15*-45,_0x22901b,_0x287a65),_0x95f346['appendChil'+'d'](_0x3d1425),this['selected']['ids']['length']>-2247+0xd7*-10+0x112d&&(this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']()),this['loadingIte'+'ms']['image']['loaded']++,_0x95f346['style']['visibility']='visible',_0x95f346['style']['translate']=_0x582883+'px\x20'+_0x3c08d3+'px',_0x95f346['style']['width']=_0x11e242+'px',_0x95f346['style']['height']=_0x453cf2+'px',_0x10a460('');};}});}['initKeyboa'+'rdEvents'](){document['addEventLi'+'stener']('keydown',_0x161bb9=>{requestAnimationFrame(()=>{switch(_0x161bb9['keyCode']){case  -1206*-6+-1*-9666+-16865*0x1:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x698eac of this['selected']['ids']){this['registered'][_0x698eac]['x']--,this['registered'][_0x698eac]['el']['style']['translate']=this['registered'][_0x698eac]['x']+'px\x20'+this['registered'][_0x698eac]['y']+'px';}this['selected']['x']--;}break;case  -80+0x1dde+-1*0x1d68:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x406805 of this['selected']['ids']){this['registered'][_0x406805]['y']--,this['registered'][_0x406805]['el']['style']['translate']=this['registered'][_0x406805]['x']+'px\x20'+this['registered'][_0x406805]['y']+'px';}this['selected']['y']--;}break;case  -786*-7+0xe3*-25+-106*-2:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x2400c9 of this['selected']['ids']){this['registered'][_0x2400c9]['x']++,this['registered'][_0x2400c9]['el']['style']['translate']=this['registered'][_0x2400c9]['x']+'px\x20'+this['registered'][_0x2400c9]['y']+'px';}this['selected']['x']++;}break;case 0x95*-19+-4395+0x1c62*0x1:if(this['hasSelecte'+'d']&&this['isInSelect'+'ed']){for(let _0x1135f0 of this['selected']['ids']){this['registered'][_0x1135f0]['y']++,this['registered'][_0x1135f0]['el']['style']['translate']=this['registered'][_0x1135f0]['x']+'px\x20'+this['registered'][_0x1135f0]['y']+'px';}this['selected']['y']++;}break;}this['renderSele'+'ctedRefere'+'nce'](),this['measureExe'+'cute']();this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position']();const _0x1de646=new CustomEvent('onChangeKe'+'yboard',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x1de646);});});}['onSlotChan'+'ge'](){const _0x42cb96=this['shadowRoot']?.['querySelec'+'tor']('slot');if(_0x42cb96===null||_0x42cb96===undefined)return;_0x42cb96?.['addEventLi'+'stener']('slotchange',()=>{this['countLoadi'+'ngItems'](),this['renderItem'+'s'](),!this['isInit']&&(this['onceBindin'+'gs'](),this['isInit']=!![]);});}['getSelecte'+'dParams'](){let _0x5117b8={'x':0x0,'y':0x0},_0xa8107e={'x':0x0,'y':0x0};for(let _0x4c88ff=0x950+0x22bd+0xeaf*-3;_0x4c88ff<this['selected']['ids']['length'];_0x4c88ff++){const _0x4cf0b0=this['selected']['ids'][_0x4c88ff];if(_0x4c88ff===0x952+-6459+0xfe9)_0x5117b8={'x':this['registered'][_0x4cf0b0]['x'],'y':this['registered'][_0x4cf0b0]['y']},_0xa8107e={'x':this['registered'][_0x4cf0b0]['x']+this['registered'][_0x4cf0b0]['width'],'y':this['registered'][_0x4cf0b0]['y']+this['registered'][_0x4cf0b0]['height']};else {const _0x2ead04=this['registered'][_0x4cf0b0]['x'],_0x459524=this['registered'][_0x4cf0b0]['y'];_0x5117b8={'x':_0x2ead04<_0x5117b8['x']?_0x2ead04:_0x5117b8['x'],'y':_0x459524<_0x5117b8['y']?_0x459524:_0x5117b8['y']};const _0x23129c=this['registered'][_0x4cf0b0]['x']+this['registered'][_0x4cf0b0]['width'],_0x2fc817=this['registered'][_0x4cf0b0]['y']+this['registered'][_0x4cf0b0]['height'];_0xa8107e={'x':_0x23129c>=_0xa8107e['x']?_0x23129c:_0xa8107e['x'],'y':_0x2fc817>=_0xa8107e['y']?_0x2fc817:_0xa8107e['y']};}}const _0x1c7369=_0xa8107e['x']-_0x5117b8['x'],_0x1eb6c2=_0xa8107e['y']-_0x5117b8['y'];this['selected']={...this['selected'],...{'x':_0x5117b8['x'],'y':_0x5117b8['y'],'width':_0x1c7369,'height':_0x1eb6c2}};}['renderSele'+'ctedRefere'+'nce'](){this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(0x2*0x1369+-139*0x12+0x162*-21)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['l']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x55d*-5+-46*-64+0xf53)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['height']=this['selected']['height']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(-645*0x6+-1*0x2611+0x321*0x11))+'px',this['elSelected'+'Lines']['t']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x2e4+0xda*0x14+-5098))+'px',this['elSelected'+'Lines']['b']['style']['width']=this['selected']['width']+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';}['isSelected'+'Item'](_0x1e1029,_0x55c284){const _0x3b4447=[{'x':_0x1e1029['x'],'y':_0x1e1029['y']},{'x':_0x1e1029['x']+_0x1e1029['width'],'y':_0x1e1029['y']},{'x':_0x1e1029['x'],'y':_0x1e1029['y']+_0x1e1029['height']},{'x':_0x1e1029['x']+_0x1e1029['width'],'y':_0x1e1029['y']+_0x1e1029['height']}];for(let _0xb0c771=0x114d+0x1278+0x1*-9157;_0xb0c771<_0x3b4447['length'];_0xb0c771++){const _0x588bc1=_0x3b4447[_0xb0c771];if(this['isPointInR'+'ectangle'](_0x588bc1,_0x55c284))return !![];}return ![];}['renderDrag'+'SelectRefe'+'renceLine'](_0x34bf22,_0x4dff35){const _0x4e951e=this['shadowRoot'];if(_0x4e951e===null)return;const _0x3a7d27=_window['getCompute'+'dStyle'](this['rDrags']);_0x3a7d27['visibility']!=='visible'&&(this['rDrags']['style']['visibility']='visible');dragBeginPos['x']===-1&&(dragBeginPos['x']=_0x34bf22['clientX'],dragBeginPos['y']=_0x34bf22['clientY']);const _0x57b88a={'x':dragBeginPos['x'],'y':dragBeginPos['y']},_0x951c87={'x':-1,'y':-1,'width':0x0,'height':0x0};_0x34bf22['clientX']>_0x57b88a['x']?(_0x951c87['x']=_0x57b88a['x']-_0x4dff35['x'],_0x951c87['width']=_0x34bf22['clientX']-_0x57b88a['x']):(_0x951c87['x']=_0x34bf22['clientX']-_0x4dff35['x'],_0x951c87['width']=_0x57b88a['x']-_0x34bf22['clientX']);_0x34bf22['clientY']>_0x57b88a['y']?(_0x951c87['y']=_0x57b88a['y']-_0x4dff35['y'],_0x951c87['height']=_0x34bf22['clientY']-_0x57b88a['y']):(_0x951c87['y']=_0x34bf22['clientY']-_0x4dff35['y'],_0x951c87['height']=_0x57b88a['y']-_0x34bf22['clientY']);this['rDrags']['style']['translate']=_0x951c87['x']+'px\x20'+_0x951c87['y']+'px',this['rDrags']['style']['width']=_0x951c87['width']+'px',this['rDrags']['style']['height']=_0x951c87['height']+'px';const _0x35f823=_0x4e951e['querySelec'+'tor']('slot');if(_0x35f823===null)return;const _0x554e8c=Object['values'](_0x5481c7(this['registered']));for(let _0x36d419=0x148b+-4*0x36f+0x15*-83;_0x36d419<_0x554e8c['length'];_0x36d419++){if(this['isSelected'+'Item'](_0x554e8c[_0x36d419],_0x951c87)){if(_0x554e8c[_0x36d419]['id']==='main')continue;this['selected']['ids']['indexOf'](_0x554e8c[_0x36d419]['id'])===-1&&this['selected']['ids']['push'](_0x554e8c[_0x36d419]['id']);}else {const _0x5d1cb7=this['selected']['ids']['indexOf'](_0x554e8c[_0x36d419]['id']);_0x5d1cb7!==-1&&this['selected']['ids']['splice'](_0x5d1cb7,-543+0xd1d+0x61*-29);}}this['selected']['ids']['length']>0x1*-167+-4599+-4766*-1?this['triggerSel'+'ectedLines'+'Vectors']('show'):this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x4048fa=this['selected']['ids']['map'](_0xf90288=>{return {'id':_0xf90288,'type':this['registered'][_0xf90288]['type']};}),_0x51cb6f=new CustomEvent('onSelect',{'detail':_0x4048fa});this['dispatchEv'+'ent'](_0x51cb6f),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['isPointInR'+'ectangle'](_0x1f836d,_0x151a2a){if(_0x1f836d['x']>_0x151a2a['x']&&_0x1f836d['x']<_0x151a2a['x']+_0x151a2a['width']&&_0x1f836d['y']>_0x151a2a['y']&&_0x1f836d['y']<_0x151a2a['y']+_0x151a2a['height'])return !![];return ![];}['handleClic'+'k'](){const _0x4a1eee=this['shadowRoot'];if(_0x4a1eee===null)return;_0x4a1eee['addEventLi'+'stener']('mousedown',_0x2140bc=>{_0x2140bc['preventDef'+'ault']();const _0x46f4f8=this['shadowRoot'];if(_0x46f4f8===null)return;const _0x252dce=new CustomEvent('onMouseDow'+'n',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x252dce),this['hasMoved']=![],this['hasSelecte'+'d']=![],this['latestSele'+'cted']=_0x5481c7(this['selected']);const _0x3ba868=this['getBoundin'+'gClientRec'+'t'](),_0x3c1cbb={'x':_0x2140bc['clientX']-_0x3ba868['x'],'y':_0x2140bc['clientY']-_0x3ba868['y']},_0x17becf=_0x2140bc['target']['closest']('glide-dnr-'+'item');let _0x57a2c1='';this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0x2570+-83*0x4+0x1212*-2,this['elMeasureO'+'utline']['style']['height']=0x1*-259+-7406+0x1df1,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');this['isActions']&&(this['elActions']['style']['visibility']='hidden',this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['removeEven'+'tListener']('click',this['delete']));if(_0x17becf)this['mouseTarge'+'t']='elements',this['mouseDownE'+'lement'](_0x17becf);else {if(_0x2140bc['target']['closest']('.line')){this['mouseTarge'+'t']='line';if(_0x2140bc['target']['classList']['contains']('left'))_0x57a2c1='l';else {if(_0x2140bc['target']['classList']['contains']('right'))_0x57a2c1='r';else {if(_0x2140bc['target']['classList']['contains']('top'))_0x57a2c1='t';else _0x2140bc['target']['classList']['contains']('bottom')&&(_0x57a2c1='b');}}}else {if(_0x2140bc['target']['closest']('.vector')){this['mouseTarge'+'t']='vector';if(_0x2140bc['target']['classList']['contains']('top-left'))_0x57a2c1='tl';else {if(_0x2140bc['target']['classList']['contains']('top-right'))_0x57a2c1='tr';else {if(_0x2140bc['target']['classList']['contains']('bottom-lef'+'t'))_0x57a2c1='bl';else _0x2140bc['target']['classList']['contains']('bottom-rig'+'ht')&&(_0x57a2c1='br');}}}else {if(_0x2140bc['target']['closest']('.actions-i'+'tem'))this['triggerAct'+'ions']();else {if(_0x2140bc['target']['closest']('.toolbar-i'+'tem'))_0x2140bc['target']['closest']('.horizonta'+'l-left')&&this['shortcuts']('horizontal','begin'),_0x2140bc['target']['closest']('.horizonta'+'l-center')&&this['shortcuts']('horizontal','middle'),_0x2140bc['target']['closest']('.horizonta'+'l-right')&&this['shortcuts']('horizontal','end'),_0x2140bc['target']['closest']('.horizonta'+'l-distribu'+'te')&&this['shortcuts']('horizontal','distribute'),_0x2140bc['target']['closest']('.vertical-'+'top')&&this['shortcuts']('vertical','begin'),_0x2140bc['target']['closest']('.vertical-'+'center')&&this['shortcuts']('vertical','middle'),_0x2140bc['target']['closest']('.vertical-'+'bottom')&&this['shortcuts']('vertical','end'),_0x2140bc['target']['closest']('.vertical-'+'distribute')&&this['shortcuts']('vertical','distribute'),_0x2140bc['target']['closest']('.measure')&&this['shortcuts']('','measure');else _0x3ba868&&(this['mouseTarge'+'t']='elements',this['isInSelect'+'ed']=this['isPointInR'+'ectangle'](_0x3c1cbb,this['selected']),!this['isInSelect'+'ed']&&(this['selected']=_0x5481c7(originSelected),this['renderSele'+'ctedRefere'+'nce']()));}}}}this['selected']['ids']['length']>-5004+0x164f+-707&&(this['hasSelecte'+'d']=!![]);const _0x2aafd8={'x':Math['round'](_0x2140bc['clientX']-this['selected']['x']),'y':Math['round'](_0x2140bc['clientY']-this['selected']['y'])},_0x135b79={'x':Math['round'](_0x2140bc['clientX']),'y':Math['round'](_0x2140bc['clientY'])},_0x3969d0=_0x5481c7(this['selected']),_0x4c9780=_0x5481c7(this['registered']),_0x5bf81c=_0x3969d0['width']/_0x3969d0['height'];document['onmousemov'+'e']=_0x4ff118=>{_0x4ff118['preventDef'+'ault'](),_0x4ff118['stopPropag'+'ation'](),this['mouseMoveT'+'ype']='main',this['hasMoved']=!![],this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['requestAni'+'mation']=requestAnimationFrame(()=>{this['isToolbar']&&(this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));const _0x4e7f3a={'x':Math['round'](_0x4ff118['clientX']),'y':Math['round'](_0x4ff118['clientY'])};switch(this['mouseTarge'+'t']){case 'elements':this['hasSelecte'+'d']&&this['isInSelect'+'ed']?(this['moveElemen'+'ts']({'x':Math['round'](_0x4ff118['clientX']),'y':Math['round'](_0x4ff118['clientY'])},_0x2aafd8,_0x4c9780),this['referenceA'+'lignLinesV'+'ectors'](_0x4c9780,_0x3969d0)):this['renderDrag'+'SelectRefe'+'renceLine'](_0x4ff118,_0x3ba868);break;case 'line':this['moveLines'](_0x57a2c1,_0x4c9780,_0x3969d0,_0x135b79,_0x4e7f3a);break;case 'vector':this['moveVector'+'s'](_0x57a2c1,_0x4c9780,_0x3969d0,_0x135b79,_0x4e7f3a,_0x5bf81c);break;}});},document['onmouseup']=()=>{document['onmousemov'+'e']=null,document['onmouseup']=null;const _0x245988=new CustomEvent('onMouseUp',{'detail':{...this['selected']}});this['dispatchEv'+'ent'](_0x245988),this['requestAni'+'mation']&&cancelAnimationFrame(this['requestAni'+'mation']),this['mouseUpEle'+'ment'](_0x4c9780);};});}['getTransla'+'tePos'](_0x1f7597){let _0x27a697=-1,_0x256c33=-1;if(_0x1f7597!=='none'){if(_0x1f7597['indexOf']('\x20')>-1){const _0x12883b=_0x1f7597['split']('\x20');_0x27a697=parseFloat(_0x12883b[0xb94+0x3*0x544+-16*0x1b6]['replace']('px','')),_0x256c33=parseFloat(_0x12883b[-8*0x48e+-2815+0xb8*0x42]['replace']('px',''));}else _0x27a697=parseFloat(_0x1f7597['replace']('px',''));}return {'x':_0x27a697,'y':_0x256c33};}['mouseDownE'+'lement'](_0x36ed67){if(this['selected']['ids']['indexOf'](_0x36ed67['id'])===-1){this['selected']['ids']=[_0x36ed67['id']];const _0x5e9c34=this['selected']['ids']['map'](_0x3e7502=>{return {'id':_0x3e7502,'type':this['registered'][_0x3e7502]['type']};}),_0x9d2b65=new CustomEvent('onSelect',{'detail':_0x5e9c34});this['dispatchEv'+'ent'](_0x9d2b65),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}this['isInSelect'+'ed']=!![];if(this['lastClickT'+'ime']===-1)this['lastClickT'+'ime']=new Date()['getTime']();else {const _0x4c1f76=new Date()['getTime']()-this['lastClickT'+'ime'];if(_0x4c1f76>0xb2+0x80f+-1*0x812)this['lastClickT'+'ime']=new Date()['getTime']();else {this['lastClickT'+'ime']=-1;if(this['selected']['ids']['indexOf'](_0x36ed67['id'])>-1){this['selected']['ids']=[_0x36ed67['id']];const _0x113931=this['selected']['ids']['map'](_0x3df8e1=>{return {'id':_0x3df8e1,'type':this['registered'][_0x3df8e1]['type']};}),_0x51e5a2=new CustomEvent('onSelect',{'detail':_0x113931});this['dispatchEv'+'ent'](_0x51e5a2),this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}}}}['mouseUpEle'+'ment'](_0x3b53f5){if(this['hasMoved']){this['lastClickT'+'ime']=-1,dragBeginPos={'x':-1,'y':-1},this['rDrags']['style']['visibility']='hidden',this['rDrags']['style']['translate']='-1px\x20-1px',this['rDrags']['style']['width']='0',this['rDrags']['style']['height']='0';if(this['mouseTarge'+'t']==='elements')for(let _0x51f549 of this['selected']['ids']){this['registered'][_0x51f549]['x']=_0x3b53f5[_0x51f549]['x'],this['registered'][_0x51f549]['y']=_0x3b53f5[_0x51f549]['y'];}(this['mouseTarge'+'t']==='line'||this['mouseTarge'+'t']==='vector')&&(this['registered']=_0x5481c7(_0x3b53f5),this['getSelecte'+'dParams']());const _0x2b38d9=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor');_0x2b38d9!==undefined&&_0x2b38d9['forEach'](_0x30bd8b=>{_0x30bd8b['remove']();});const _0x38497e=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e');_0x38497e!==undefined&&_0x38497e['forEach'](_0x18b69e=>{_0x18b69e['remove']();});}if(this['selected']['ids']['length']>-7361*0x1+0x4*0x291+-1*-4733)this['isToolbar']&&!(this['selected']['ids']['length']===-1*0xe5d+-6537+0x9*0x46f&&!this['isMeasure'])&&(this['selected']['ids']['length']>0x97*0x1+0x26*0xfe+-9802?this['elAligns']['style']['display']!=='inline-fle'+'x'&&(this['elAligns']['style']['display']='inline-fle'+'x'):this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='inline-fle'+'x'&&(this['elMeasure']['style']['display']='inline-fle'+'x')),this['toolbarPla'+'cement']==='float'&&this['setToolbar'+'Position'](),this['elToolbar']['style']['visibility']!=='visible'&&(this['elToolbar']['style']['visibility']='visible')),this['triggerSel'+'ectedLines'+'Vectors']('show');else {this['isToolbar']&&!(this['selected']['ids']['length']===0x1*0x112d+0x2033+0x17f*-33&&!this['isMeasure'])&&(this['elAligns']['style']['display']!=='none'&&(this['elAligns']['style']['display']='none'),this['isMeasure']&&(this['elMeasure']['style']['display']!=='none'&&(this['elMeasure']['style']['display']='none')),this['elToolbar']['style']['visibility']!=='hidden'&&(this['elToolbar']['style']['visibility']='hidden'));this['triggerSel'+'ectedLines'+'Vectors']('hide');const _0x41be7b=new CustomEvent('onSelect',{'detail':{}});this['dispatchEv'+'ent'](_0x41be7b);}this['mouseMoveT'+'ype']='',this['isActions']&&this['triggerAct'+'ions']();}['setToolbar'+'Position'](){const _0x364ca2=window['getCompute'+'dStyle'](this['elToolbar']),_0x142b43=parseFloat(_0x364ca2['width']['replace']('px',''));this['elToolbar']['style']['translate']=this['selected']['x']+this['selected']['width']/(0x6*0x57b+-7274+-1142)-_0x142b43/(0x59*0x2+-3973+-1*-3797)+'px\x20'+(this['selected']['y']-(0x204*0xe+-33*0xbb+-1011))+'px';}['triggerAct'+'ions'](){this['selected']['ids']['length']>0x3a9+0x4*-1822+0x18cf?(this['elActions']['style']['translate']=this['selected']['x']+this['selected']['width']+(0x4e*0x38+-815*0x2+-2732)+'px\x20'+this['selected']['y']+'px',this['elActions']['style']['visibility']='visible',this['elActions']['style']['pointerEve'+'nts']='auto',this['elActions']['addEventLi'+'stener']('click',this['delete'])):(this['elActions']['style']['translate']='0px\x200px',this['elActions']['style']['pointerEve'+'nts']='none',this['elActions']['style']['visibility']='hidden',this['elActions']['removeEven'+'tListener']('click',this['delete']));}['moveElemen'+'ts'](_0x296c6b,_0x163395,_0x237abd){const _0x17aee0=_0x296c6b['x']-_0x163395['x'],_0x27487e=_0x296c6b['y']-_0x163395['y'],_0x35d0bb=_0x17aee0+this['selected']['width'],_0x27266e=_0x27487e+this['selected']['height'],_0x4c6852=this['registered']['main']['x']+this['registered']['main']['width'],_0x2fb52b=this['registered']['main']['x']+this['registered']['main']['height'];this['selected']['x']=_0x17aee0,this['selected']['y']=_0x27487e;_0x17aee0<=0x2*-2725+0x11f2+0x358&&(this['selected']['x']=0x18cc+-7924+0xc5*0x8);_0x35d0bb>=_0x4c6852&&(this['selected']['x']=_0x4c6852-this['selected']['width']);_0x27487e<=0xd45+0x4*-1286+-1*-1747&&(this['selected']['y']=-2*0x5e+0x23cf+0x7b*-73);_0x27266e>=_0x2fb52b&&(this['selected']['y']=_0x2fb52b-this['selected']['height']);this['triggerSel'+'ectedLines'+'Vectors']('hide'),this['elSelected'+'Lines']['l']['style']['translate']=this['selected']['x']-lineSize/(-7271+0x7*-521+0x2aa8)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['r']['style']['translate']=this['selected']['x']+this['selected']['width']-lineSize/(0x1971+-3*-493+-7990)+'px\x20'+this['selected']['y']+'px',this['elSelected'+'Lines']['t']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']-lineSize/(0x1*-9439+0x24fa+-25))+'px',this['elSelected'+'Lines']['b']['style']['translate']=this['selected']['x']+'px\x20'+(this['selected']['y']+this['selected']['height']-lineSize/(0x21d6*-1+0x201d+0x1bb))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=this['selected']['x']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px',this['elSelected'+'Vectors']['br']['style']['translate']=this['selected']['x']+this['selected']['width']-vectorOffset+'px\x20'+(this['selected']['y']+this['selected']['height']-vectorOffset)+'px';for(let _0xbb7051 of this['selected']['ids']){this['selected']['ids']['length']===-6665+-7*0x332+-1*-12392?(_0x237abd[_0xbb7051]['x']=this['selected']['x'],_0x237abd[_0xbb7051]['y']=this['selected']['y']):(_0x237abd[_0xbb7051]['x']=this['registered'][_0xbb7051]['x']-this['latestSele'+'cted']['x']+this['selected']['x'],_0x237abd[_0xbb7051]['y']=this['registered'][_0xbb7051]['y']-this['latestSele'+'cted']['y']+this['selected']['y']);_0x237abd[_0xbb7051]['el']['style']['translate']=_0x237abd[_0xbb7051]['x']+'px\x20'+_0x237abd[_0xbb7051]['y']+'px';const _0x3ca0c1=new CustomEvent('onChange',{'detail':{'id':_0xbb7051,'type':'drag','x':_0x237abd[_0xbb7051]['x'],'y':_0x237abd[_0xbb7051]['y'],'width':_0x237abd[_0xbb7051]['width'],'height':_0x237abd[_0xbb7051]['height']}});this['dispatchEv'+'ent'](_0x3ca0c1);}}['moveLines'](_0x2bffb7,_0x293460,_0x69d059,_0x40ba83,_0x4870d9){let _0x6ee604=0x2ce+-2*0xbfb+0x1528,_0x82bc70=-2443*0x1+0x2393+-7*0x3b8,_0x555e83=-5*0xb4+-1*0x21bb+0x5*0x773,_0x27c85a=-6853+0xa21*-1+-2*-4723;_0x82bc70=_0x4870d9['y']-(_0x4870d9['y']-_0x69d059['y']);const _0xe51c96=_0x4870d9['x']-_0x40ba83['x'],_0x921cd8=_0x4870d9['y']-_0x40ba83['y'],_0x274a0e=_0xe51c96/_0x69d059['width'],_0x3c7465=_0x921cd8/_0x69d059['height'];switch(_0x2bffb7){case 'l':_0x6ee604=_0x69d059['x']+_0xe51c96,_0x555e83=_0x69d059['x']-_0x6ee604+_0x69d059['width'],this['elSelected'+'Lines']['l']['style']['translate']=_0x6ee604-(0x6*0x679+0x10c8+-14236+0.5)+'px\x20'+_0x82bc70+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x555e83+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x6ee604-(0xf5f+0xb89*0x1+0x139*-22+0.5)+'px\x20'+(_0x82bc70-(-8826*-1+0x65e*-4+-144*0x10+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x555e83+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x6ee604-(0x1227+-8607+0x1*0xf7a+0.5)+'px\x20'+(_0x82bc70+_0x69d059['height']-(0x1d84+0x1eb3+-15413+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x6ee604-(0x1e2a+-3027+-4691*0x1)+'px\x20'+(_0x82bc70-vectorOffset)+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x6ee604-(0x7bf+-601*-13+-9792)+'px\x20'+(_0x82bc70+_0x69d059['height']-vectorOffset)+'px';for(const _0x59f382 of _0x69d059['ids']){const _0x331789=this['registered'][_0x59f382],_0x524cb2=_0x331789['width']*(-5841+-12*0x2ea+-569*-26-_0x274a0e),_0x180349=_0x331789['x']+_0xe51c96*(0x3ce*-3+0x2*0xd91+0x1b*-149-(_0x331789['x']-_0x69d059['x'])/_0x69d059['width']);_0x293460[_0x59f382]['x']=_0x180349,_0x293460[_0x59f382]['width']=_0x524cb2,_0x331789['el']['style']['width']=_0x524cb2+'px',_0x331789['el']['style']['translate']=_0x180349+'px\x20'+_0x331789['y']+'px';const _0x853c05=new CustomEvent('onChange',{'detail':{'id':_0x59f382,'type':'resize_lef'+'t','x':_0x293460[_0x59f382]['x'],'y':_0x293460[_0x59f382]['y'],'width':_0x293460[_0x59f382]['width'],'height':_0x293460[_0x59f382]['height']}});this['dispatchEv'+'ent'](_0x853c05);}break;case 'r':_0x6ee604=_0x69d059['x']+_0x69d059['width'];_0x6ee604<=_0x69d059['x']&&(_0x6ee604=_0x69d059['x']);_0x555e83=_0x69d059['width']+_0xe51c96;_0x555e83<0x23ec*-1+0x4f6+0x1ef6&&(_0x555e83=-6810+-295*0xb+0x2747);this['elSelected'+'Lines']['r']['style']['translate']=_0x69d059['x']+_0x69d059['width']+_0xe51c96-(-5833+0x1acc+-25*0x29+0.5)+'px\x20'+_0x82bc70+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x69d059['x']-(-1321+-1932+0xcb7+0.5)+'px\x20'+(_0x82bc70-(0x2178+-8453+-113+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x555e83+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x69d059['x']-(0x147e+0x1464+-10464+0.5)+'px\x20'+(_0x69d059['y']+_0x69d059['height']-(-7857+0x2*0x12fd+-1863+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x555e83+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x69d059['x']+_0x69d059['width']+_0xe51c96-(0x63c+-15*0x4c+-453+0.5)+'px\x20'+(_0x69d059['y']-(-2972*-1+0x143a+0x1fd3*-1+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x69d059['x']+_0x69d059['width']+_0xe51c96-(0x7b9*-5+0x19de+0xcc2+0.5)+'px\x20'+(_0x69d059['y']+_0x69d059['height']-(-14*-387+-2720+-11*0xf5+0.5))+'px';for(const _0x6b6807 of _0x69d059['ids']){const _0x3a08b9=this['registered'][_0x6b6807],_0x3610be=_0x3a08b9['width']*(-4809*0x1+0x2*0xa+0x2*0x95b+_0x274a0e),_0x4f7613=_0x3a08b9['x']+_0xe51c96*((_0x3a08b9['x']-_0x69d059['x'])/_0x69d059['width']);_0x293460[_0x6b6807]['width']=_0x3610be,_0x293460[_0x6b6807]['x']=_0x4f7613,_0x3a08b9['el']['style']['width']=_0x3610be+'px',_0x3a08b9['el']['style']['translate']=_0x4f7613+'px\x20'+_0x3a08b9['y']+'px';const _0x93bd37=new CustomEvent('onChange',{'detail':{'id':_0x6b6807,'type':'resize_rig'+'ht','x':_0x293460[_0x6b6807]['x'],'y':_0x293460[_0x6b6807]['y'],'width':_0x293460[_0x6b6807]['width'],'height':_0x293460[_0x6b6807]['height']}});this['dispatchEv'+'ent'](_0x93bd37);}break;case 't':_0x6ee604=_0x69d059['x'],_0x82bc70=_0x69d059['y']+_0x921cd8;let _0x1fdd68=_0x69d059['height']-_0x921cd8;_0x82bc70>=_0x69d059['y']+_0x69d059['height']&&(_0x82bc70=_0x69d059['y']+_0x69d059['height']);_0x27c85a<=0x1db3+-4567+0x42*-46&&(_0x27c85a=-5439+-9849+0x3bb8);this['elSelected'+'Lines']['t']['style']['translate']=_0x6ee604-(0x1*0x17ef+-6947+0x1*0x336+0.5)+'px\x20'+(_0x82bc70-(0x88a+-9090+0x2*0xd7d+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x6ee604-(-2577+-3859+0x1926+0.5)+'px\x20'+(_0x82bc70-(0x1fc3+-4679*-1+-12808+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x1fdd68+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x69d059['x']+_0x69d059['width']-(-4469+-4987*0x1+0x24f2+0.5)+'px\x20'+(_0x82bc70-(-6e3+-4181*0x1+-17*-599+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x1fdd68+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x6ee604-(-1*0x1d7d+-2554+0x277a+0.5)+'px\x20'+(_0x82bc70-(-409*-14+-8862+-1*-3139+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x69d059['x']+_0x69d059['width']-(0x21eb+0x1*-7321+-1359+0.5)+'px\x20'+(_0x82bc70-(-8730+-2134+0x2a73+0.5))+'px';for(const _0x3eae04 of _0x69d059['ids']){const _0x243716=this['registered'][_0x3eae04],_0xf5173=_0x243716['height']*(0x107*0x1+0x43*0x61+0x1*-6761-_0x3c7465),_0x365c5b=_0x243716['y']+_0x921cd8*(0x260+0x11*0x14+-1*0x3b3-(_0x243716['y']-_0x69d059['y'])/_0x69d059['height']);_0x243716['el']['style']['height']=_0xf5173+'px',_0x243716['el']['style']['translate']=_0x243716['x']+'px\x20'+_0x365c5b+'px',_0x293460[_0x3eae04]['y']=_0x365c5b,_0x293460[_0x3eae04]['height']=_0xf5173;const _0x1f65d7=new CustomEvent('onChange',{'detail':{'id':_0x3eae04,'type':'resize_top','x':_0x293460[_0x3eae04]['x'],'y':_0x293460[_0x3eae04]['y'],'width':_0x293460[_0x3eae04]['width'],'height':_0x293460[_0x3eae04]['height']}});this['dispatchEv'+'ent'](_0x1f65d7);}break;case 'b':_0x82bc70=_0x69d059['y']+_0x69d059['height'];_0x82bc70<=_0x69d059['y']&&(_0x82bc70=_0x69d059['y']);_0x27c85a=_0x69d059['height']+_0x921cd8;_0x27c85a<0x1*-1827+0x1*-4003+0x16c6&&(_0x27c85a=0x1985+0x23c*-6+0x1bb*-7);this['elSelected'+'Lines']['t']['style']['translate']=_0x69d059['x']-(0x5f3*0x1+0x15f2+0xb*-649+0.5)+'px\x20'+(_0x69d059['y']-(0xbc9*0x3+-1696+-3*0x993+0.5))+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x69d059['x']-(0x1aad+0x8db*0x1+0x2386*-1+0.5)+'px\x20'+(_0x69d059['y']-(0x18b0+-1*0x32f+-5503+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x27c85a+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x69d059['x']+_0x69d059['width']-(-4381+0x1*-5867+-5*-2050+0.5)+'px\x20'+(_0x69d059['y']-(0x151f*-1+-6349+0x1*0x2dee+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x27c85a+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x69d059['x']+'px\x20'+(_0x82bc70+_0x921cd8-(0x13*-172+-5*0x727+-5*-2485+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x69d059['x']-(0x12*-314+0x14b4+-71*-5+0.5)+'px\x20'+(_0x82bc70+_0x921cd8-(-1473*-5+0x8f9+0x2e7*-13+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x69d059['x']+_0x69d059['width']-(0x2*-899+-1*-5366+-3565+0.5)+'px\x20'+(_0x82bc70+_0x921cd8-(0x1e1e+-8381+0x2a2+0.5))+'px';for(const _0x4b8b23 of _0x69d059['ids']){const _0x26d399=this['registered'][_0x4b8b23],_0xfc2a35=_0x26d399['height']*(-39*-74+0x242+-3463+_0x3c7465),_0xc7ebdb=_0x26d399['y']+_0x921cd8*((_0x26d399['y']-_0x69d059['y'])/_0x69d059['height']);_0x293460[_0x4b8b23]['height']=_0xfc2a35,_0x293460[_0x4b8b23]['y']=_0xc7ebdb,_0x26d399['el']['style']['height']=_0xfc2a35+'px',_0x26d399['el']['style']['translate']=_0x26d399['x']+'px\x20'+_0xc7ebdb+'px';const _0x37f842=new CustomEvent('onChange',{'detail':{'id':_0x4b8b23,'type':'resize_bot'+'tom','x':_0x293460[_0x4b8b23]['x'],'y':_0x293460[_0x4b8b23]['y'],'width':_0x293460[_0x4b8b23]['width'],'height':_0x293460[_0x4b8b23]['height']}});this['dispatchEv'+'ent'](_0x37f842);}break;}}['moveVector'+'s'](_0x28e0f3,_0xcb800,_0x5cacd8,_0x278318,_0xb26f87,_0x9eed56){let _0x4cb3e9=0x1580+-4256+-1248,_0x37805b=0x8ab*-4+0x22c9*-1+0x4575;const _0x281fea=_0xb26f87['x']-_0x278318['x'],_0x28cbe5=_0x281fea/_0x9eed56,_0x267558=_0x281fea/_0x5cacd8['width'];let _0x24b315=-2*-2267+0xaa*-40+-206*-11;switch(_0x28e0f3){case 'tl':_0x4cb3e9=_0x5cacd8['x']+_0x281fea,_0x37805b=_0x5cacd8['y']+_0x28cbe5,this['elSelected'+'Vectors']['tl']['style']['translate']=_0x4cb3e9-(0xb1b+-8340+0x157c*0x1+0.5)+'px\x20'+(_0x37805b-(0x24ca+0x1079+-213*0x40+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5cacd8['x']+_0x5cacd8['width']-(-2092+0x16*-191+-2099*-3+0.5)+'px\x20'+(_0x37805b-(0x1*-3361+-883+-137*-31+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x4cb3e9-(-121*0x15+0x15*0xe5+0x97*-15+0.5)+'px\x20'+(_0x5cacd8['y']+_0x5cacd8['height']-(0x8b9+0x593*-3+0x803+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x4cb3e9-(-2783*0x2+-73*0x3a+0x152*0x1d+0.5)+'px\x20'+(_0x37805b-(0x1*0xcdf+-1194+-2099*0x1+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x5cacd8['width']-_0x281fea+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x4cb3e9-(-3207*0x1+-2*-164+-67*-43+0.5)+'px\x20'+(_0x5cacd8['y']+_0x5cacd8['height']-(0x51d*0x1+0x8e8+0xe03*-1+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x5cacd8['width']-_0x281fea+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x4cb3e9-(-4304*0x2+-1*0x424+0x25c6+0.5)+'px\x20'+(_0x37805b-(-3329+-7*0x513+0x2*0x1844+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5cacd8['height']-_0x28cbe5+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5cacd8['x']+_0x5cacd8['width']-(-1*-7781+-7973+0xc2+0.5)+'px\x20'+(_0x37805b-(-1008+-7*-620+-1110*0x3+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5cacd8['height']-_0x28cbe5+'px';for(const _0x3e406c of _0x5cacd8['ids']){const _0x5263d3=this['registered'][_0x3e406c],_0x1785f0=_0x5263d3['width']*(0x3*-2952+-9865+0x25*0x1fa-_0x267558),_0x2b106d=_0x5263d3['x']+_0x281fea*(-19*-443+-8301+-1*0x73-(_0x5263d3['x']-_0x5cacd8['x'])/_0x5cacd8['width']),_0x54818e=_0x5263d3['height']*(0xc26+0x152c*-1+0x907-_0x267558),_0xcb299f=_0x5263d3['y']+_0x28cbe5*(-202*-34+0x1*-667+-25*0xf8-(_0x5263d3['y']-_0x5cacd8['y'])/_0x5cacd8['height']);_0x5263d3['el']['style']['translate']=_0x2b106d+'px\x20'+_0xcb299f+'px',_0x5263d3['el']['style']['width']=_0x1785f0+'px',_0x5263d3['el']['style']['height']=_0x54818e+'px',_0xcb800[_0x3e406c]['x']=_0x2b106d,_0xcb800[_0x3e406c]['width']=_0x1785f0,_0xcb800[_0x3e406c]['y']=_0xcb299f,_0xcb800[_0x3e406c]['height']=_0x54818e;const _0x45ed4b=new CustomEvent('onChange',{'detail':{'id':_0x3e406c,'type':'resize_top'+'-left','x':_0xcb800[_0x3e406c]['x'],'y':_0xcb800[_0x3e406c]['y'],'width':_0xcb800[_0x3e406c]['width'],'height':_0xcb800[_0x3e406c]['height']}});this['dispatchEv'+'ent'](_0x45ed4b);}break;case 'tr':_0x24b315=_0x5cacd8['width']+_0x281fea,_0x4cb3e9=_0x5cacd8['x']+_0x24b315,_0x37805b=_0x5cacd8['y']-_0x28cbe5,this['elSelected'+'Vectors']['tr']['style']['translate']=_0x4cb3e9-(-1*-7929+-1*-3457+0x1*-11383+0.5)+'px\x20'+(_0x37805b-(-4648+0x2682+-127*0x29+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x5cacd8['x']-(-143*-5+0x1*-6324+0x15ec+0.5)+'px\x20'+(_0x37805b-(0x3e5*0x1+0x271*0x8+-5994+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x4cb3e9-(0x1202+0x25f1+-14320+0.5)+'px\x20'+(_0x5cacd8['y']+_0x5cacd8['height']-(0xfb7+0x10e2*0x2+-4*0xc5e+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5cacd8['x']-(0xe9*-20+-1*-6526+-1864+0.5)+'px\x20'+(_0x37805b-(0xc72+-2*-3889+-261*0x2a+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x24b315+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5cacd8['x']-(-6147+0x30e+0x14f7+0.5)+'px\x20'+(_0x5cacd8['y']+_0x5cacd8['height']-(-7150+-57*-65+-3447*-1+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x24b315+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5cacd8['x']-(-2437+0xeeb+-4*0x159+0.5)+'px\x20'+(_0x37805b-(0x3d4+-8546+0x1d90+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5cacd8['height']+_0x28cbe5+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5cacd8['x']+_0x24b315-(-6515+0x5f+0x1ee*0xd+0.5)+'px\x20'+(_0x37805b-(0x1*-9521+0xdf3+0x1740+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5cacd8['height']+_0x28cbe5+'px';for(const _0x23b26e of _0x5cacd8['ids']){const _0x3036ca=this['registered'][_0x23b26e],_0x37ff21=_0x3036ca['width']*(0x2*-2772+-1*-2750+0x22f*0x5+_0x267558),_0x368e6e=_0x3036ca['x']+_0x281fea*((_0x3036ca['x']-_0x5cacd8['x'])/_0x5cacd8['width']),_0x456527=_0x3036ca['height']*(-8182+0x1a6d+0x58a+_0x267558),_0x43b1d0=_0x3036ca['y']-_0x28cbe5*(0x19f6+0x1*-7019+-11*-34-(_0x3036ca['y']-_0x5cacd8['y'])/_0x5cacd8['height']);_0x3036ca['el']['style']['translate']=_0x368e6e+'px\x20'+_0x43b1d0+'px',_0x3036ca['el']['style']['width']=_0x37ff21+'px',_0x3036ca['el']['style']['height']=_0x456527+'px',_0xcb800[_0x23b26e]['x']=_0x368e6e,_0xcb800[_0x23b26e]['width']=_0x37ff21,_0xcb800[_0x23b26e]['y']=_0x43b1d0,_0xcb800[_0x23b26e]['height']=_0x456527;const _0x186811=new CustomEvent('onChange',{'detail':{'id':_0x23b26e,'type':'resize_top'+'-right','x':_0xcb800[_0x23b26e]['x'],'y':_0xcb800[_0x23b26e]['y'],'width':_0xcb800[_0x23b26e]['width'],'height':_0xcb800[_0x23b26e]['height']}});this['dispatchEv'+'ent'](_0x186811);}break;case 'bl':_0x4cb3e9=_0x5cacd8['x']+_0x281fea,_0x37805b=_0x5cacd8['y']+_0x5cacd8['height']-_0x28cbe5,this['elSelected'+'Vectors']['bl']['style']['translate']=_0x4cb3e9-(0x3*0xaaf+0x2*0x92f+0xc9a*-4+0.5)+'px\x20'+(_0x37805b-(-3*-1057+0x26a2*-1+0x1a42+0.5))+'px',this['elSelected'+'Vectors']['tl']['style']['translate']=_0x4cb3e9-(0x1f92+0x1494+-13347+0.5)+'px\x20'+(_0x5cacd8['y']-(0x202+0x5*-451+0xda*0x8+0.5))+'px',this['elSelected'+'Vectors']['br']['style']['translate']=_0x5cacd8['x']+_0x5cacd8['width']-(0x3*-37+0x1*-9795+0x9*0x44d+0.5)+'px\x20'+(_0x37805b-(-870+-8953*-1+-8080+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x4cb3e9-(0x1bde+-195*0x17+-1*0xa57+0.5)+'px\x20'+(_0x5cacd8['y']-(-1830+0x4*0x6a2+-10*0x1f0+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x5cacd8['width']-_0x281fea+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x4cb3e9-(0x4e7+-7485+0x1858+0.5)+'px\x20'+(_0x37805b-(-2*0xa3d+0x4a*-128+-4*-3679+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x5cacd8['width']-_0x281fea+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x4cb3e9-(0x1d7a+-3985+0x1*-3559+0.5)+'px\x20'+(_0x5cacd8['y']-(0x2c*0x32+-3740+-771*-2+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5cacd8['height']-_0x28cbe5+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5cacd8['x']+_0x5cacd8['width']-(-8140+0x1*0x100b+0xfc3+0.5)+'px\x20'+(_0x5cacd8['y']-(-6431+-5908+0x3035+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5cacd8['height']-_0x28cbe5+'px';for(const _0x20f167 of _0x5cacd8['ids']){const _0xd5658c=this['registered'][_0x20f167],_0x1b20b5=_0xd5658c['width']*(-149*0x28+-4993+-2*-5477-_0x267558),_0x5f3842=_0xd5658c['x']+_0x281fea*(0x1b7*-9+-1659+-5611*-1-(_0xd5658c['x']-_0x5cacd8['x'])/_0x5cacd8['width']),_0x2bed95=_0xd5658c['height']*(-558+0x151*0x13+-5844-_0x267558),_0x163380=_0xd5658c['y']+_0x28cbe5*((_0x5cacd8['y']-_0xd5658c['y'])/_0x5cacd8['height']);_0xd5658c['el']['style']['translate']=_0x5f3842+'px\x20'+_0x163380+'px',_0xd5658c['el']['style']['width']=_0x1b20b5+'px',_0xd5658c['el']['style']['height']=_0x2bed95+'px',_0xcb800[_0x20f167]['x']=_0x5f3842,_0xcb800[_0x20f167]['width']=_0x1b20b5,_0xcb800[_0x20f167]['y']=_0x163380,_0xcb800[_0x20f167]['height']=_0x2bed95;const _0x1bb381=new CustomEvent('onChange',{'detail':{'id':_0x20f167,'type':'resize_bot'+'tom-left','x':_0xcb800[_0x20f167]['x'],'y':_0xcb800[_0x20f167]['y'],'width':_0xcb800[_0x20f167]['width'],'height':_0xcb800[_0x20f167]['height']}});this['dispatchEv'+'ent'](_0x1bb381);}break;case 'br':_0x24b315=_0x5cacd8['width']+_0x281fea,_0x4cb3e9=_0x5cacd8['x']+_0x24b315,_0x37805b=_0x5cacd8['y']+_0x5cacd8['height']+_0x28cbe5,this['elSelected'+'Vectors']['br']['style']['translate']=_0x4cb3e9-(0x117c*0x2+-8227*-1+0x1c4*-38+0.5)+'px\x20'+(_0x37805b-(0x1*-3037+0x5*0x731+-6165+0.5))+'px',this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5cacd8['x']+_0x5cacd8['width']+_0x281fea-(0x2195+-1*0x41b+-7543+0.5)+'px\x20'+(_0x5cacd8['y']-(-5977+-1*0x954+0x4*0x82c+0.5))+'px',this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5cacd8['x']-(-6624+0x1*-7304+0x366b+0.5)+'px\x20'+(_0x37805b-(0x1078+-3935+0x8b*-2+0.5))+'px',this['elSelected'+'Lines']['t']['style']['translate']=_0x5cacd8['x']-(-7861+-2111+-4987*-2+0.5)+'px\x20'+(_0x5cacd8['y']-(-968+-6578+-4*-1887+0.5))+'px',this['elSelected'+'Lines']['t']['style']['width']=_0x24b315+'px',this['elSelected'+'Lines']['b']['style']['translate']=_0x5cacd8['x']-(-6941+-8*0x4a0+0x401f+0.5)+'px\x20'+(_0x37805b-(0x2355+0xa13*0x1+0xf22*-3+0.5))+'px',this['elSelected'+'Lines']['b']['style']['width']=_0x24b315+'px',this['elSelected'+'Lines']['l']['style']['translate']=_0x5cacd8['x']-(-8500+-115*0x2a+0x3414+0.5)+'px\x20'+(_0x5cacd8['y']-(0xd58+0x1c91+-10727+0.5))+'px',this['elSelected'+'Lines']['l']['style']['height']=_0x5cacd8['height']+_0x28cbe5+'px',this['elSelected'+'Lines']['r']['style']['translate']=_0x5cacd8['x']+_0x24b315-(-553*-3+0x88a*0x3+-8215+0.5)+'px\x20'+(_0x5cacd8['y']-(-6141+0x164e+0x1b1+0.5))+'px',this['elSelected'+'Lines']['r']['style']['height']=_0x5cacd8['height']+_0x28cbe5+'px';for(const _0x453020 of _0x5cacd8['ids']){const _0x4893bf=this['registered'][_0x453020],_0x17f582=_0x4893bf['width']*(0x1*-3605+0x138d+0x577*-1+_0x267558),_0x1d28ab=_0x4893bf['x']+_0x281fea*((_0x4893bf['x']-_0x5cacd8['x'])/_0x5cacd8['width']),_0x2830d9=_0x4893bf['height']*(-8337+-4567+0x1*0x3269+_0x267558),_0x3ef5e5=_0x4893bf['y']+_0x28cbe5*((_0x4893bf['y']-_0x5cacd8['y'])/_0x5cacd8['height']);_0x4893bf['el']['style']['translate']=_0x1d28ab+'px\x20'+_0x3ef5e5+'px',_0x4893bf['el']['style']['width']=_0x17f582+'px',_0x4893bf['el']['style']['height']=_0x2830d9+'px',_0xcb800[_0x453020]['x']=_0x1d28ab,_0xcb800[_0x453020]['width']=_0x17f582,_0xcb800[_0x453020]['y']=_0x3ef5e5,_0xcb800[_0x453020]['height']=_0x2830d9;const _0x4f8eeb=new CustomEvent('onChange',{'detail':{'id':_0x453020,'type':'resize_bot'+'tom-right','x':_0xcb800[_0x453020]['x'],'y':_0xcb800[_0x453020]['y'],'width':_0xcb800[_0x453020]['width'],'height':_0xcb800[_0x453020]['height']}});this['dispatchEv'+'ent'](_0x4f8eeb);}break;}}['referenceA'+'lignLinesV'+'ectors'](_0x9b8433,_0x519f99){let _0x2ea821='',_0x30c53f;for(let _0x5eab99 in _0x9b8433){if(this['selected']['ids']['indexOf'](_0x5eab99)>-1)continue;let _0x1a497c={'x':0x0,'y':0x0};_0x30c53f='';if(Math['abs'](this['selected']['x']+this['selected']['width']-_0x9b8433[_0x5eab99]['x'])<=this['thresholdH'+'orizontal'])_0x30c53f='end',_0x1a497c['x']=this['selected']['x']+this['selected']['width']-_0x9b8433[_0x5eab99]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']/(0x4*-2323+-281*0x10+-7*-1970)))<=this['thresholdH'+'orizontal'])_0x30c53f='end',_0x1a497c['x']=this['selected']['x']+this['selected']['width']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']/(-4530+0x1*0x226d+-4281));else {if(Math['abs'](this['selected']['x']+this['selected']['width']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']))<=this['thresholdH'+'orizontal'])_0x30c53f='end',_0x1a497c['x']=this['selected']['x']+this['selected']['width']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']);else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-6217*0x1+-47*0x29+0x1fd2)-_0x9b8433[_0x5eab99]['x'])<=this['thresholdH'+'orizontal'])_0x30c53f='middle',_0x1a497c['x']=this['selected']['x']+this['selected']['width']/(0x1772+-1354*-5+-12770)-_0x9b8433[_0x5eab99]['x'];else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-2932+0x125e+0x88*-13)-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']/(0x83*0x23+0x15d*0x1a+-1*0x3559)))<=this['thresholdH'+'orizontal'])_0x30c53f='middle',_0x1a497c['x']=this['selected']['x']+this['selected']['width']/(-1*-6531+-1373*0x6+0x6ad*0x1)-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']/(0x2*-2969+0x1*0x1fa6+-2162));else {if(Math['abs'](this['selected']['x']+this['selected']['width']/(-1*-8131+-3017*-1+-11146)-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']))<=this['thresholdH'+'orizontal'])_0x30c53f='middle',_0x1a497c['x']=this['selected']['x']+this['selected']['width']/(0x1fe+-1*0x1e65+0x1*0x1c69)-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']);else {if(Math['abs'](this['selected']['x']-_0x9b8433[_0x5eab99]['x'])<=this['thresholdH'+'orizontal'])_0x30c53f='begin',_0x1a497c['x']=this['selected']['x']-_0x9b8433[_0x5eab99]['x'];else {if(Math['abs'](this['selected']['x']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']/(-6871+-5899+0x31e4)))<=this['thresholdH'+'orizontal'])_0x30c53f='begin',_0x1a497c['x']=this['selected']['x']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']/(-389+0x1*-8317+0x1*0x2204));else Math['abs'](this['selected']['x']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']))<=this['thresholdH'+'orizontal']&&(_0x30c53f='begin',_0x1a497c['x']=this['selected']['x']-(_0x9b8433[_0x5eab99]['x']+_0x9b8433[_0x5eab99]['width']));}}}}}}}_0x30c53f!==''?(_0x2ea821=_0x30c53f,this['snap']('horizontal',_0x1a497c,_0x9b8433),setTimeout(()=>{this['thresholdH'+'orizontal']=0x15e4+-4789*-1+-10391;},-2*0x133b+0x2*-47+0x279c)):this['thresholdH'+'orizontal']===-2*0xb60+0x4a*0x9+0x1428&&(this['thresholdH'+'orizontal']=-1*-268+-2515+0x8cc);}const _0x218239=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-horizo'+'ntal');_0x218239!==undefined&&_0x218239['forEach'](_0x2a62c3=>{_0x2a62c3['remove']();});const _0xb6620a=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-horizont'+'al');_0xb6620a!==undefined&&_0xb6620a['forEach'](_0x129c94=>{_0x129c94['remove']();});_0x2ea821!==''&&(this['triggerAli'+'gnVectors']('horizontal',_0x2ea821,_0x9b8433),this['triggerAli'+'gnLines'](_0x9b8433));_0x2ea821='';for(let _0x13e168 in _0x9b8433){if(this['selected']['ids']['indexOf'](_0x13e168)>-1)continue;let _0x550a9b={'x':0x0,'y':0x0};_0x30c53f='';if(Math['abs'](this['selected']['y']+this['selected']['height']-_0x9b8433[_0x13e168]['y'])<=this['thresholdV'+'ertical'])_0x30c53f='end',_0x550a9b['y']=this['selected']['y']+this['selected']['height']-_0x9b8433[_0x13e168]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']/(0xcd1*-2+0xa7e+0x115*0xe)))<=this['thresholdV'+'ertical'])_0x30c53f='end',_0x550a9b['y']=this['selected']['y']+this['selected']['height']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']/(0xc51*0x1+-1801*0x5+-2927*-2));else {if(Math['abs'](this['selected']['y']+this['selected']['height']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']))<=this['thresholdV'+'ertical'])_0x30c53f='end',_0x550a9b['y']=this['selected']['y']+this['selected']['height']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']);else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*0x8cd+-1423+-828)-_0x9b8433[_0x13e168]['y'])<=this['thresholdV'+'ertical'])_0x30c53f='middle',_0x550a9b['y']=this['selected']['y']+this['selected']['height']/(-499*-3+-305*-32+0x1*-11255)-_0x9b8433[_0x13e168]['y'];else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(-9026+-447+-1*-9475)-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']/(-1*0xa45+0x232d+-6374)))<=this['thresholdV'+'ertical'])_0x30c53f='middle',_0x550a9b['y']=this['selected']['y']+this['selected']['height']/(0x3*0x236+0x21e7+-1*0x2887)-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']/(-3141*-3+0x14ae*-1+0x1*-4127));else {if(Math['abs'](this['selected']['y']+this['selected']['height']/(0x145b+-3*0xc95+-34*-131)-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']))<=this['thresholdV'+'ertical'])_0x30c53f='middle',_0x550a9b['y']=this['selected']['y']+this['selected']['height']/(-3065*-3+0x12bc+-13989)-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']);else {if(Math['abs'](this['selected']['y']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']))<=this['thresholdV'+'ertical'])_0x30c53f='begin',_0x550a9b['y']=this['selected']['y']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']);else {if(Math['abs'](this['selected']['y']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']/(0x6*-1165+-2442+0xb2*0x35)))<=this['thresholdV'+'ertical'])_0x30c53f='begin',_0x550a9b['y']=this['selected']['y']-(_0x9b8433[_0x13e168]['y']+_0x9b8433[_0x13e168]['height']/(-228*0x17+0x79*0x2e+-320));else Math['abs'](this['selected']['y']-_0x9b8433[_0x13e168]['y'])<=this['thresholdV'+'ertical']&&(_0x30c53f='begin',_0x550a9b['y']=this['selected']['y']-_0x9b8433[_0x13e168]['y']);}}}}}}}_0x30c53f!==''?(_0x2ea821=_0x30c53f,this['snap']('vertical',_0x550a9b,_0x9b8433),setTimeout(()=>{this['thresholdH'+'orizontal']=0x2*0x133a+-2217+-1525*0x5;},-19*0x58+-9259+0x2b7b)):this['thresholdV'+'ertical']===-9921*-1+-8870*0x1+-1049&&(this['thresholdV'+'ertical']=0x1801+0x8b*0x3f+-14897);}const _0x4f4893=this['shadowRoot']?.['querySelec'+'torAll']('.align-vec'+'tor-vertic'+'al');_0x4f4893!==undefined&&_0x4f4893['forEach'](_0x2669c1=>{_0x2669c1['remove']();});const _0x32784a=this['shadowRoot']?.['querySelec'+'torAll']('.align-lin'+'e-vertical');_0x32784a!==undefined&&_0x32784a['forEach'](_0x2dd61e=>{_0x2dd61e['remove']();}),_0x2ea821!==''&&(this['triggerAli'+'gnVectors']('vertical',_0x2ea821,_0x9b8433),this['triggerAli'+'gnLines'](_0x9b8433));}['snap'](_0x210a75,_0x3c772b,_0x40f81d){let _0x49ef1b={'x':0x0,'y':0x0};if(_0x210a75==='horizontal'){this['selected']['x']=this['selected']['x']-_0x3c772b['x'];for(const _0x193862 of this['selected']['ids']){const _0x750757=this['getElement'+'TranslateP'+'os'](_0x40f81d[_0x193862]['el']),_0x32258f=_0x750757['x']-_0x3c772b['x'],_0x204025=_0x750757['y'];_0x40f81d[_0x193862]['el']['style']['translate']=_0x32258f+'px\x20'+_0x204025+'px',_0x40f81d[_0x193862]['x']=_0x32258f;}_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x49ef1b['x']-_0x3c772b['x']+'px\x20'+_0x49ef1b['y']+'px';}else {this['selected']['y']=this['selected']['y']-_0x3c772b['y'];for(const _0x6d135e of this['selected']['ids']){const _0x91f7db=this['getElement'+'TranslateP'+'os'](_0x40f81d[_0x6d135e]['el']),_0x369278=_0x91f7db['x'],_0x564f03=_0x91f7db['y']-_0x3c772b['y'];_0x40f81d[_0x6d135e]['el']['style']['translate']=_0x369278+'px\x20'+_0x564f03+'px',_0x40f81d[_0x6d135e]['y']=_0x564f03;}_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['t']),this['elSelected'+'Lines']['t']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['b']),this['elSelected'+'Lines']['b']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['l']),this['elSelected'+'Lines']['l']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Lines']['r']),this['elSelected'+'Lines']['r']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tl']),this['elSelected'+'Vectors']['tl']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['tr']),this['elSelected'+'Vectors']['tr']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['bl']),this['elSelected'+'Vectors']['bl']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px',_0x49ef1b=this['getElement'+'TranslateP'+'os'](this['elSelected'+'Vectors']['br']),this['elSelected'+'Vectors']['br']['style']['translate']=_0x49ef1b['x']+'px\x20'+(_0x49ef1b['y']-_0x3c772b['y'])+'px';}}['getElement'+'TranslateP'+'os'](_0x20a8ed){let _0x465da9={'x':0x0,'y':0x0};if(_0x20a8ed['style']['translate']['indexOf']('\x20')>-1){const _0x21030b=_0x20a8ed['style']['translate']['split']('\x20');_0x465da9['x']=parseFloat(_0x21030b[0x200b*0x1+-4161+-4042]['replace']('px','')),_0x465da9['y']=parseFloat(_0x21030b[0x1681+-151*0x6+-4854]['replace']('px',''));}else _0x465da9['x']=parseFloat(_0x20a8ed['style']['translate']);return _0x465da9;}['generateAl'+'ignVector'](_0x48787c,_0x572229,_0x45b3fb){const _0x30dcd1=document['createElem'+'ent']('div');_0x30dcd1['innerHTML']='\x0a\x20\x20\x20\x20<svg\x20'+'xmlns=\x22htt'+'p://www.w3'+'.org/2000/'+'svg\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20fill=\x22'+colors['red']+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20v'+'iewBox=\x220\x20'+'0\x2024\x2024\x22\x20\x0a'+'\x20\x20\x20\x20\x20\x20stro'+'ke-width=\x22'+'1.5\x22\x20\x0a\x20\x20\x20\x20'+'\x20\x20stroke=\x22'+'currentCol'+'or\x22\x20\x0a\x20\x20\x20\x20\x20'+'\x20class=\x22si'+'ze-6\x22\x20\x0a\x20\x20\x20'+'\x20\x20\x20width=\x22')+vectorSize*(0x205c+-43*-125+0x1*-13657)+('\x22\x20\x0a\x20\x20\x20\x20\x20\x20w'+'idth=\x22')+vectorSize*(-3861+-6595+-3*-3486)+('\x22\x0a\x20\x20\x20\x20>\x0a\x20\x20'+'\x20\x20\x20\x20<path\x20'+'stroke-lin'+'ecap=\x22roun'+'d\x22\x20stroke-'+'linejoin=\x22'+'round\x22\x20d=\x22'+'M6\x2018\x2018\x206'+'M6\x206l12\x2012'+'\x22\x20/>\x0a\x20\x20\x20\x20<'+'/svg>'),_0x30dcd1['classList']['add']('align-vect'+'or'),_0x30dcd1['classList']['add']('align-vect'+'or-'+_0x48787c),_0x30dcd1['classList']['add']('align-vect'+'or-'+_0x48787c+'-'+_0x572229),_0x30dcd1['style']['position']='absolute',_0x30dcd1['style']['left']=_0x45b3fb['x']+'px',_0x30dcd1['style']['top']=_0x45b3fb['y']+'px',this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x30dcd1);}['triggerAli'+'gnVectors'](_0x188e19,_0x43d822,_0x1a4607){let _0x471e90={'hBegin':![],'hMiddle':![],'hEnd':![],'vBegin':![],'vMiddle':![],'vEnd':![]};for(let _0x16d0c0 in _0x1a4607){Math['abs'](this['selected']['x']-_0x1a4607[_0x16d0c0]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hBegin']&&(_0x471e90['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(-3934+0x2700+-6048)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(0x95c+-8287+-83*-71)-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(-7*-1+-1*0x1460+-193*-27)-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hBegin']&&(_0x471e90['hBegin']=!![])),Math['abs'](this['selected']['x']-(_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hBegin']&&(_0x471e90['hBegin']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(0x173f+-4463+-1486*0x1)-_0x1a4607[_0x16d0c0]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hMiddle']&&(_0x471e90['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-6139+-1*0xacf+0x22cc)-(_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(0x2*0x10b1+0x17*0x144+-15996)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(0x1ef3+-1*0x2018+0x127)-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(-6571+0x1c06+0x1*-601)-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hMiddle']&&(_0x471e90['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']/(-1161+-5802*-1+0x1*-4639)-(_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hMiddle']&&(_0x471e90['hMiddle']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-_0x1a4607[_0x16d0c0]['x'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hEnd']&&(_0x471e90['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(0x163f+0x1017+-9812*0x1)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(0x5*-325+0xe5*0x8+0x5*-41)-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']/(-1063*0x1+-8668+0x2605)-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hEnd']&&(_0x471e90['hEnd']=!![])),Math['abs'](this['selected']['x']+this['selected']['width']-(_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['hEnd']&&(_0x471e90['hEnd']=!![])),Math['abs'](this['selected']['y']-_0x1a4607[_0x16d0c0]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),!_0x471e90['vBegin']&&(_0x471e90['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(-2*0x134f+0x260f+0x1*0x91)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(-132*-23+-1*0x2152+-458*-12)-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(0x922+-15*0x142+0x9be)-vectorSize}),!_0x471e90['vBegin']&&(_0x471e90['vBegin']=!![])),Math['abs'](this['selected']['y']-(_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['vBegin']&&(_0x471e90['vBegin']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(-557*-15+-1*0x2420+0x37f)-_0x1a4607[_0x16d0c0]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),!_0x471e90['vMiddle']&&(_0x471e90['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x7*0x373+0x1*0x165e+-11905)-(_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(-708*0x5+-238+-18*-210)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(-2*0xa0b+-7975+-1*-13119)-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(0x6*-1193+-239*0x17+0x3171)-vectorSize}),!_0x471e90['vMiddle']&&(_0x471e90['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']/(0x1*-4934+0x1*-2794+0x1e32)-(_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['vMiddle']&&(_0x471e90['vMiddle']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-_0x1a4607[_0x16d0c0]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']-vectorSize}),!_0x471e90['vEnd']&&(_0x471e90['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(-2*0x2+0xdb*-34+-3*-2484)))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(-5435*0x1+-7132+0x3119)-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']/(0x770+0x1f8e+-20*0x1f3)-vectorSize}),!_0x471e90['vEnd']&&(_0x471e90['vEnd']=!![])),Math['abs'](this['selected']['y']+this['selected']['height']-(_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold']&&this['selected']['ids']['indexOf'](_0x1a4607[_0x16d0c0]['id'])===-1&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':_0x1a4607[_0x16d0c0]['x']+_0x1a4607[_0x16d0c0]['width']-vectorSize,'y':_0x1a4607[_0x16d0c0]['y']+_0x1a4607[_0x16d0c0]['height']-vectorSize}),!_0x471e90['vEnd']&&(_0x471e90['vEnd']=!![]));}_0x471e90['hBegin']&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x471e90['hMiddle']&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']/(-3506+0x2560+-6060)-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']/(-2362*0x2+0x26a0+-5162)-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x471e90['hEnd']&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize})),_0x471e90['vBegin']&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']-vectorSize})),_0x471e90['vMiddle']&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(0xa11*0x2+0xc7a+-8346)-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']/(-1043*0x9+0x1*0x6a2+0x1e0b)-vectorSize})),_0x471e90['vEnd']&&(this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}),this['generateAl'+'ignVector'](_0x188e19,_0x43d822,{'x':this['selected']['x']+this['selected']['width']-vectorSize,'y':this['selected']['y']+this['selected']['height']-vectorSize}));}['generateAl'+'ignLine'](_0x1bf950){const {direction:_0x2b3168,position:_0x2e5c1c,begin:_0x10503d,end:_0x2a4e6a}=_0x1bf950,_0x362e9=document['createElem'+'ent']('div');_0x362e9['classList']['add']('align-line'),_0x362e9['classList']['add']('align-line'+'-'+_0x2b3168),_0x362e9['classList']['add']('align-line'+'-'+_0x2b3168+'-'+_0x2e5c1c),_0x362e9['style']['position']='absolute',_0x362e9['style']['left']=_0x10503d['x']+'px',_0x362e9['style']['top']=_0x10503d['y']+'px',_0x2b3168==='horizontal'?(_0x362e9['style']['width']='1px',_0x362e9['style']['height']=_0x2a4e6a['y']-_0x10503d['y']+'px'):(_0x362e9['style']['width']=_0x2a4e6a['x']-_0x10503d['x']+'px',_0x362e9['style']['height']='1px'),this['shadowRoot']?.['querySelec'+'tor']('.container')?.['appendChil'+'d'](_0x362e9);}['generateLi'+'ne'](_0x29fb5c,_0x93621b){const {direction:_0x1f0735,begin:_0x4d0121,end:_0x14f2b1}=_0x29fb5c,_0x41a8c2=document['createElem'+'ent']('div');if(_0x93621b['length']>-9747+-9391+0x4ac2)for(const _0x5c36c3 of _0x93621b){_0x41a8c2['classList']['add'](_0x5c36c3);}return _0x41a8c2['style']['position']='absolute',_0x41a8c2['style']['left']=_0x4d0121['x']+'px',_0x41a8c2['style']['top']=_0x4d0121['y']+'px',_0x1f0735==='horizontal'?_0x41a8c2['style']['width']=_0x14f2b1['x']-_0x4d0121['x']+'px':_0x41a8c2['style']['height']=_0x14f2b1['y']-_0x4d0121['y']+'px',_0x41a8c2;}['triggerAli'+'gnLines'](_0x3a630f){const _0x47f31b={'direction':'horizontal','position':'begin','begin':{'x':this['selected']['x'],'y':this['selected']['y']},'end':{'x':this['selected']['x'],'y':this['selected']['y']}},_0x43dd70=(_0x554cd6,_0x2c2fd9,_0x39fee8)=>{return _0x554cd6===undefined?(_0x554cd6=_0x5481c7(_0x47f31b),_0x554cd6['end']['y']=_0x554cd6['end']['y']+this['selected']['height'],_0x554cd6['begin']['x']=_0x554cd6['begin']['x']+_0x39fee8,_0x554cd6['end']['x']=_0x554cd6['begin']['x']+_0x39fee8,_0x2c2fd9['y']<_0x554cd6['begin']['y']&&(_0x554cd6['begin']['y']=_0x2c2fd9['y']),_0x2c2fd9['y']+_0x2c2fd9['height']>_0x554cd6['end']['y']&&(_0x554cd6['end']['y']=_0x2c2fd9['y']+_0x2c2fd9['height'])):(_0x2c2fd9['y']<_0x554cd6['begin']['y']&&(_0x554cd6['begin']['y']=_0x2c2fd9['y']),_0x2c2fd9['y']+_0x2c2fd9['height']>_0x554cd6['end']['y']&&(_0x554cd6['end']['y']=_0x2c2fd9['y']+_0x2c2fd9['height'])),_0x554cd6;},_0x310cb7=(_0x3b24a3,_0x5f073e,_0x43663f)=>{return _0x3b24a3===undefined?(_0x3b24a3=_0x5481c7(_0x47f31b),_0x3b24a3['direction']='vertical',_0x3b24a3['end']['x']=_0x3b24a3['end']['x']+this['selected']['width'],_0x3b24a3['begin']['y']=_0x3b24a3['begin']['y']+_0x43663f,_0x3b24a3['end']['y']=_0x3b24a3['end']['y']+_0x43663f,_0x5f073e['x']<_0x3b24a3['begin']['x']&&(_0x3b24a3['begin']['x']=_0x5f073e['x']),_0x5f073e['x']+_0x5f073e['width']>_0x3b24a3['end']['x']&&(_0x3b24a3['end']['x']=_0x5f073e['x']+_0x5f073e['width'])):(_0x5f073e['x']<_0x3b24a3['begin']['x']&&(_0x3b24a3['begin']['x']=_0x5f073e['x']),_0x5f073e['x']+_0x5f073e['width']>_0x3b24a3['end']['x']&&(_0x3b24a3['end']['x']=_0x5f073e['x']+_0x5f073e['width'])),_0x3b24a3;},_0x2aa50f=[];for(let _0x494e1c in _0x3a630f){(this['selected']['x']===_0x3a630f[_0x494e1c]['x']||this['selected']['x']===_0x3a630f[_0x494e1c]['x']+_0x3a630f[_0x494e1c]['width']/(0x4f6+0x1fce+-10*0x3ad)||this['selected']['x']===_0x3a630f[_0x494e1c]['x']+_0x3a630f[_0x494e1c]['width'])&&this['selected']['ids']['indexOf'](_0x3a630f[_0x494e1c]['id'])===-1&&(_0x2aa50f[-202*0x1a+-2939*0x1+-8191*-1]=_0x43dd70(_0x2aa50f[0x27*-14+0x1*0x20eb+-1*0x1ec9],_0x3a630f[_0x494e1c],-107*0x6+0x243f+-1*0x21bd)),(this['selected']['x']+this['selected']['width']/(-8784+-3920+-1*-12706)===_0x3a630f[_0x494e1c]['x']||this['selected']['x']+this['selected']['width']/(0x538+0xca9*-2+-6*-858)===_0x3a630f[_0x494e1c]['x']+_0x3a630f[_0x494e1c]['width']/(-4419+-238+0x611*0x3)||this['selected']['x']+this['selected']['width']/(0x2f7+0x3*0xbf5+-1420*0x7)===_0x3a630f[_0x494e1c]['x']+_0x3a630f[_0x494e1c]['width'])&&this['selected']['ids']['indexOf'](_0x3a630f[_0x494e1c]['id'])===-1&&(_0x2aa50f[-7737+-64*0x3b+0x2cfa]=_0x43dd70(_0x2aa50f[-1802+-7847+-50*-193],_0x3a630f[_0x494e1c],this['selected']['width']/(-251*-4+-4180+0xc6a*0x1))),(this['selected']['x']+this['selected']['width']===_0x3a630f[_0x494e1c]['x']||this['selected']['x']+this['selected']['width']===_0x3a630f[_0x494e1c]['x']+_0x3a630f[_0x494e1c]['width']/(-585+0x1*0x2343+-8440)||this['selected']['x']+this['selected']['width']===_0x3a630f[_0x494e1c]['x']+_0x3a630f[_0x494e1c]['width'])&&this['selected']['ids']['indexOf'](_0x3a630f[_0x494e1c]['id'])===-1&&(_0x2aa50f[0x2085+-2086+0x63*-63]=_0x43dd70(_0x2aa50f[-8798+0x23b1+0x1*-337],_0x3a630f[_0x494e1c],this['selected']['width'])),(Math['abs'](this['selected']['y']-_0x3a630f[_0x494e1c]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x3a630f[_0x494e1c]['y']+_0x3a630f[_0x494e1c]['height']/(0x23b*0x6+0x481+-4577)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']-(_0x3a630f[_0x494e1c]['y']+_0x3a630f[_0x494e1c]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x3a630f[_0x494e1c]['id'])===-1&&(_0x2aa50f[0x1444+-8021+0xb14]=_0x310cb7(_0x2aa50f[-3372+0x13b4+-1*0x685],_0x3a630f[_0x494e1c],0x6c*0x10+-6*0x63+-1134)),(Math['abs'](this['selected']['y']+this['selected']['height']/(-901*-1+-5372+-1*-4473)-_0x3a630f[_0x494e1c]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0xc*0x2ef+0x1cd9+-16395)-(_0x3a630f[_0x494e1c]['y']+_0x3a630f[_0x494e1c]['height']/(-857*-2+0x13eb+0x7*-973)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']/(0x1e9*-2+0xcd6+-2*0x481)-(_0x3a630f[_0x494e1c]['y']+_0x3a630f[_0x494e1c]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x3a630f[_0x494e1c]['id'])===-1&&(_0x2aa50f[-1*-79+-2651*-2+0x1501*-1]=_0x310cb7(_0x2aa50f[-2*-4623+0x11a4+-13758],_0x3a630f[_0x494e1c],this['selected']['height']/(0x1ff3+0x15c4+-3*0x11e7))),(Math['abs'](this['selected']['y']+this['selected']['height']-_0x3a630f[_0x494e1c]['y'])<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x3a630f[_0x494e1c]['y']+_0x3a630f[_0x494e1c]['height']/(0x2669*-1+-2761+0x3134)))<=this['alignVecto'+'rsLinesThr'+'eshold']||Math['abs'](this['selected']['y']+this['selected']['height']-(_0x3a630f[_0x494e1c]['y']+_0x3a630f[_0x494e1c]['height']))<=this['alignVecto'+'rsLinesThr'+'eshold'])&&this['selected']['ids']['indexOf'](_0x3a630f[_0x494e1c]['id'])===-1&&(_0x2aa50f[-4532+-1935+0x1948]=_0x310cb7(_0x2aa50f[0xca4+-41*-193+-11144],_0x3a630f[_0x494e1c],this['selected']['height']));}for(const _0x5b6b9b of _0x2aa50f){if(_0x5b6b9b===undefined)continue;this['generateAl'+'ignLine'](_0x5b6b9b);}}['shortcuts'](_0x4d2bc3,_0x39672a){if(_0x4d2bc3==='horizontal')switch(_0x39672a){case 'begin':for(const _0x356099 of this['selected']['ids']){const _0x37a6f2=this['registered'][_0x356099],{y:_0x1523e1}=this['getTransla'+'tePos'](_0x37a6f2['el']['style']['translate']),_0x4361f1=this['selected']['x'];_0x37a6f2['el']['style']['translate']=_0x4361f1+'px\x20'+_0x1523e1+'px',this['registered'][_0x356099]['x']=_0x4361f1;}break;case 'middle':for(const _0x1c092c of this['selected']['ids']){const _0x288ec1=this['registered'][_0x1c092c],{x:_0x3ba288,y:_0x4f0518}=this['getTransla'+'tePos'](_0x288ec1['el']['style']['translate']),_0x5eaee8=_0x3ba288-(_0x288ec1['x']-(this['selected']['x']+this['selected']['width']/(0x1*-349+0x2669+-9482)))-_0x288ec1['width']/(-9276+0x1*-1807+-739*-15);_0x288ec1['el']['style']['translate']=_0x5eaee8+'px\x20'+_0x4f0518+'px',this['registered'][_0x1c092c]['x']=_0x5eaee8;}break;case 'end':for(const _0x37183e of this['selected']['ids']){const _0x2dc7c3=this['registered'][_0x37183e],{y:_0x569f96}=this['getTransla'+'tePos'](_0x2dc7c3['el']['style']['translate']),_0x23797e=this['selected']['x']+this['selected']['width']-_0x2dc7c3['width'];_0x2dc7c3['el']['style']['translate']=_0x23797e+'px\x20'+_0x569f96+'px',this['registered'][_0x37183e]['x']=this['selected']['x']+this['selected']['width']-_0x2dc7c3['width'];}break;case 'distribute':const _0x5c45f9=this['selected']['ids']['sort']((_0x195f01,_0x26c684)=>this['registered'][_0x195f01]['x']-this['registered'][_0x26c684]['x']);let _0x13a25a=0x789*0x3+-6544+0x2f5;for(const _0xe61c81 of _0x5c45f9){_0x13a25a+=this['registered'][_0xe61c81]['width'];}const _0x3fb7f1=(this['selected']['width']-_0x13a25a)/(_0x5c45f9['length']-(-665+-2564+0xc9e));let _0xf7f643=this['registered'][_0x5c45f9[-373*0xc+0x7f+0x10fd]]['x'];for(let _0x402acc=-7*-632+-5707+0x503;_0x402acc<_0x5c45f9['length'];_0x402acc++){const _0x3ab616=_0x5c45f9[_0x402acc],_0x69af0a=this['registered'][_0x3ab616],{y:_0x25953f}=this['getTransla'+'tePos'](_0x69af0a['el']['style']['translate']);let _0x4d7040=_0xf7f643;_0x69af0a['el']['style']['translate']=_0x4d7040+'px\x20'+_0x25953f+'px',this['registered'][_0x3ab616]['x']=_0x4d7040,_0xf7f643=_0xf7f643+_0x69af0a['width']+_0x3fb7f1;}break;}else {if(_0x4d2bc3==='vertical')switch(_0x39672a){case 'begin':for(const _0x4adbc5 of this['selected']['ids']){const _0x14650b=this['registered'][_0x4adbc5],{x:_0xf7d75f}=this['getTransla'+'tePos'](_0x14650b['el']['style']['translate']),_0x1f9e21=this['selected']['y'];_0x14650b['el']['style']['translate']=_0xf7d75f+'px\x20'+_0x1f9e21+'px',this['registered'][_0x4adbc5]['y']=_0x1f9e21;}break;case 'middle':for(const _0x4a45a0 of this['selected']['ids']){const _0x32c923=this['registered'][_0x4a45a0],{x:_0x674a1f,y:_0x122b85}=this['getTransla'+'tePos'](_0x32c923['el']['style']['translate']),_0x5bc296=_0x122b85-(_0x32c923['y']-(this['selected']['y']+this['selected']['height']/(-3912+0x1*0x2681+0x3*-1981)))-_0x32c923['height']/(0x14d5+-3609+-82*0x15);_0x32c923['el']['style']['translate']=_0x674a1f+'px\x20'+_0x5bc296+'px',this['registered'][_0x4a45a0]['y']=_0x5bc296;}break;case 'end':for(const _0x5c5811 of this['selected']['ids']){const _0x51e7d4=this['registered'][_0x5c5811],{x:_0x3663b2}=this['getTransla'+'tePos'](_0x51e7d4['el']['style']['translate']),_0xe3d5ff=this['selected']['y']+this['selected']['height']-_0x51e7d4['height'];_0x51e7d4['el']['style']['translate']=_0x3663b2+'px\x20'+_0xe3d5ff+'px',this['registered'][_0x5c5811]['y']=this['selected']['y']+this['selected']['height']-_0x51e7d4['height'];}break;case 'distribute':const _0x5800ef=this['selected']['ids']['sort']((_0x5c429e,_0xc305b4)=>this['registered'][_0x5c429e]['y']-this['registered'][_0xc305b4]['y']);let _0x3ec2d8=0x2c7*0x1+-5605+0x131e;for(const _0x1268a8 of _0x5800ef){_0x3ec2d8+=this['registered'][_0x1268a8]['height'];}const _0x1cb00d=(this['selected']['height']-_0x3ec2d8)/(_0x5800ef['length']-(-6394*0x1+0x2*-4794+0x3e6f));let _0x52f438=this['registered'][_0x5800ef[-7457+-6592+0x36e1]]['y'];for(let _0x311312=-1*-5134+0x67*-43+-705;_0x311312<_0x5800ef['length'];_0x311312++){const _0x27a884=_0x5800ef[_0x311312],_0x322cf4=this['registered'][_0x27a884],{x:_0x4d61ff}=this['getTransla'+'tePos'](_0x322cf4['el']['style']['translate']);let _0x3071be=_0x52f438;_0x322cf4['el']['style']['translate']=_0x4d61ff+'px\x20'+_0x3071be+'px',this['registered'][_0x27a884]['y']=_0x3071be,_0x52f438=_0x52f438+_0x322cf4['height']+_0x1cb00d;}break;}else this['elMeasure']?.['classList']['contains']('active')?(this['shadowRoot']?.['removeEven'+'tListener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['remove']('active'),this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']()):(this['shadowRoot']?.['addEventLi'+'stener']('mousemove',this['measure']),this['isToolbar']&&this['elMeasure']?.['classList']['add']('active'));}this['getSelecte'+'dParams'](),this['renderSele'+'ctedRefere'+'nce']();}['measure'](_0x4c656d){if(this['selected']['ids']['length']===-1772*0x3+0x8*0x1ec+0x564*0x1)return;if(this['mouseMoveT'+'ype']==='main')return;let _0x4d6c68=null;_0x4c656d['target']['id']==='main'&&(_0x4d6c68=_0x4c656d['target']);_0x4d6c68===null&&(_0x4d6c68=_0x4c656d['target']['closest']('glide-dnr-'+'item'));if(_0x4d6c68===null)return;this['isToolbar']&&(this['measureTar'+'getId']=_0x4d6c68['id']);if(_0x4d6c68['id']==='main'){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();this['isToolbar']&&(this['measureTar'+'getId']='',this['elMeasureO'+'utline']['style']['width']=0x8d8+0xec7+-6047,this['elMeasureO'+'utline']['style']['height']=0x253e+-1*-8665+0x1*-18199,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none');return;}this['isToolbar']&&this['measureExe'+'cute']();}['measureExe'+'cute'](){if(this['measureTar'+'getId']==='')return;this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();const _0x2e3390=this['measureTar'+'getId'];for(const _0x559f3c of this['selected']['ids']){if(_0x2e3390===_0x559f3c){this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed']();return;}}const _0x4e2515=this['selected']['x']+this['selected']['width'],_0x7ea1cf=this['selected']['x']+this['selected']['width']/(-8202+0x12f8+0xd14),_0x5ec846=this['selected']['y']+this['selected']['height'],_0x25cfaa=this['selected']['y']+this['selected']['height']/(-2999*0x2+-5*-1842+-30*0x6b),_0x35bff9=this['registered'][_0x2e3390]['x']+this['registered'][_0x2e3390]['width'],_0x3c3bae=this['registered'][_0x2e3390]['y']+this['registered'][_0x2e3390]['height'];let _0x22812c=![];if(_0x5ec846<this['registered'][_0x2e3390]['y']){_0x22812c=!![];const _0x837725=this['registered'][_0x2e3390]['y']-_0x5ec846;let _0x25dffb=_0x7ea1cf;_0x7ea1cf===_0x35bff9&&(_0x25dffb-=-1*0xdb5+-1*0x13a8+0x10af*0x2);this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x25dffb+'px\x20'+_0x5ec846+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x837725+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');let _0x38b7ec=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x5f34aa=parseFloat(_0x38b7ec['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x837725);const _0x1af41d=Math['round'](_0x5ec846+_0x837725/(-1*0xc38+-2946*0x3+0x2ec0)-_0x5f34aa/(-9527+-9046+0x488f));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x7ea1cf+(0x1*-4391+-9032+0x3473)+'px\x20'+_0x1af41d+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible',_0x7ea1cf<=this['registered'][_0x2e3390]['x']&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x7ea1cf+'px\x20'+this['registered'][_0x2e3390]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x2e3390]['x']-_0x7ea1cf+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x7ea1cf>=_0x35bff9&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x35bff9+'px\x20'+this['registered'][_0x2e3390]['y']+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x7ea1cf-_0x35bff9+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(_0x5ec846>=this['registered'][_0x2e3390]['y']&&_0x5ec846<=_0x3c3bae){_0x22812c=!![];const _0x190d8e=_0x3c3bae-_0x5ec846;this['elMeasureL'+'ines']['solid_b']['style']['translate']=_0x7ea1cf+'px\x20'+_0x5ec846+'px',this['elMeasureL'+'ines']['solid_b']['style']['height']=_0x190d8e+'px';this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='visible');if(_0x5ec846>=this['registered'][_0x2e3390]['y']&&_0x5ec846<_0x3c3bae){let _0x28bdbb=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberB']);const _0x2628ef=parseFloat(_0x28bdbb['height']['replace']('px',''));this['elMeasureL'+'ines']['numberB']['innerText']=Math['round'](_0x190d8e);const _0x4ec8c5=Math['round'](_0x5ec846+_0x190d8e/(-1511*0x4+0x22c9*0x1+-2859)-_0x2628ef/(-2214+-996+0xc8c));this['elMeasureL'+'ines']['numberB']['style']['translate']=_0x7ea1cf+(0x2493+-2*-2459+-14277)+'px\x20'+_0x4ec8c5+'px',this['elMeasureL'+'ines']['numberB']['style']['visibility']='visible';}_0x7ea1cf<=this['registered'][_0x2e3390]['x']&&_0x5ec846<_0x3c3bae&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x7ea1cf+'px\x20'+(_0x3c3bae-(0x1*-6799+-3152+-622*-16))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=this['registered'][_0x2e3390]['x']-_0x7ea1cf+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible')),_0x7ea1cf>=_0x35bff9&&_0x5ec846<_0x3c3bae&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x35bff9+'px\x20'+(_0x3c3bae-(-542*-3+-1*-2631+-608*0x7))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x7ea1cf-_0x35bff9+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>_0x3c3bae){_0x22812c=!![];const _0x45336a=this['selected']['y']-_0x3c3bae;let _0x49dcfe=_0x7ea1cf;_0x7ea1cf===_0x35bff9&&(_0x49dcfe-=-3220+0x1ac0+-3627);this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x49dcfe+'px\x20'+_0x3c3bae+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x45336a+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x291126=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x13e393=parseFloat(_0x291126['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x45336a);const _0x2dfc71=Math['round'](this['selected']['y']-_0x45336a/(0x2b7*0x4+0x1883+-1*0x235d)-_0x13e393/(-103*0xb+0x25fe+-8591));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x7ea1cf+(0x16a1+-1*0x2089+0x9ec)+'px\x20'+_0x2dfc71+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x7ea1cf<this['registered'][_0x2e3390]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x7ea1cf+'px\x20'+(_0x3c3bae-(0x13a*0x1d+-11*0x53+-8192))+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x2e3390]['x']-_0x7ea1cf+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x7ea1cf>_0x35bff9&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['translate']=_0x35bff9+'px\x20'+(_0x3c3bae-(-37*-183+-4*0x91f+-2*-1285))+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['width']=_0x7ea1cf-_0x35bff9+'px',this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='visible'));}if(this['selected']['y']>this['registered'][_0x2e3390]['y']&&this['selected']['y']<=_0x3c3bae){_0x22812c=!![];const _0x582cbe=this['selected']['y']-this['registered'][_0x2e3390]['y'];this['elMeasureL'+'ines']['solid_t']['style']['translate']=_0x7ea1cf+'px\x20'+this['registered'][_0x2e3390]['y']+'px',this['elMeasureL'+'ines']['solid_t']['style']['height']=_0x582cbe+'px';this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='visible');const _0x10bf53=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberT']),_0x50d072=parseFloat(_0x10bf53['height']['replace']('px',''));this['elMeasureL'+'ines']['numberT']['innerText']=Math['round'](_0x582cbe);const _0x444903=Math['round'](this['selected']['y']-_0x582cbe/(0xc*-389+0x13*-20+0x13ba)-_0x50d072/(0x11*-418+0x105c+0x16d*0x8));this['elMeasureL'+'ines']['numberT']['style']['translate']=_0x7ea1cf+(0x5b*0x4d+-3619+-3384)+'px\x20'+_0x444903+'px',this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='visible'),_0x7ea1cf<this['registered'][_0x2e3390]['x']&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x7ea1cf+'px\x20'+this['registered'][_0x2e3390]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=this['registered'][_0x2e3390]['x']-_0x7ea1cf+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible')),_0x7ea1cf>_0x35bff9&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['translate']=_0x35bff9+'px\x20'+this['registered'][_0x2e3390]['y']+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['width']=_0x7ea1cf-_0x35bff9+'px',this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='visible'));}if(_0x4e2515<this['registered'][_0x2e3390]['x']){_0x22812c=!![];let _0x96201d=_0x25cfaa;_0x25cfaa===_0x3c3bae&&(_0x96201d-=-3165+0x1090+0xb3*-6);this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x4e2515+(0x1f84+0x1*-3299+0x1*-4768)+'px\x20'+_0x96201d+'px';const _0x2ce218=this['registered'][_0x2e3390]['x']-_0x4e2515;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x2ce218+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x2829f0=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x5afec3=parseFloat(_0x2829f0['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x2ce218);const _0x1b9b9c=Math['round'](_0x4e2515+_0x2ce218/(0x3a3*-3+0x16cf+-3044)-_0x5afec3/(-377*-19+-1660+-5501));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x1b9b9c+'px\x20'+(_0x25cfaa+(0x1b13+0x1be6+-1279*0xb))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x25cfaa<=this['registered'][_0x2e3390]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2e3390]['x']+'px\x20'+_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x2e3390]['y']-_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x25cfaa>=_0x3c3bae&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2e3390]['x']+'px\x20'+_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x25cfaa-_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(_0x4e2515>=this['registered'][_0x2e3390]['x']&&_0x4e2515<_0x35bff9){_0x22812c=!![],this['elMeasureL'+'ines']['solid_r']['style']['translate']=_0x4e2515+'px\x20'+_0x25cfaa+'px';const _0x238b07=_0x35bff9-_0x4e2515;this['elMeasureL'+'ines']['solid_r']['style']['width']=_0x238b07+'px';this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='visible');const _0x5466a5=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberR']),_0x257768=parseFloat(_0x5466a5['width']['replace']('px',''));this['elMeasureL'+'ines']['numberR']['innerText']=Math['round'](_0x238b07);const _0x50a5cc=Math['round'](_0x4e2515+_0x238b07/(0x19a7+-736*0xa+0x31b)-_0x257768/(0xa99+-73+0xa4e*-1));this['elMeasureL'+'ines']['numberR']['style']['translate']=_0x50a5cc+'px\x20'+(_0x25cfaa+(-2529+-4357+0x1aea))+'px',this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='visible'),_0x25cfaa<this['registered'][_0x2e3390]['y']&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x35bff9-(0x625*0x1+0x14bc+0x1ae*-16)+'px\x20'+_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=this['registered'][_0x2e3390]['y']-_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible')),_0x25cfaa>_0x3c3bae&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['translate']=_0x35bff9-(0x7be*0x1+0xc90+-5197)+'px\x20'+_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['height']=_0x25cfaa-_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='visible'));}if(this['selected']['x']>_0x35bff9){_0x22812c=!![];let _0x1ece6a=_0x25cfaa;_0x25cfaa===_0x3c3bae&&(_0x1ece6a-=-3575+-4040+0x1c*0x110);this['elMeasureL'+'ines']['solid_l']['style']['translate']=_0x35bff9-(0x1*0x339+-331*-2+0x5ce*-1)+'px\x20'+_0x1ece6a+'px';const _0x59904c=this['selected']['x']-_0x35bff9;this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x59904c+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0xdc0912=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x3d7d50=parseFloat(_0xdc0912['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x59904c);const _0x5ecd42=Math['round'](_0x35bff9+_0x59904c/(-47*-107+-1*-601+-5628)-_0x3d7d50/(0x879+-5193+-2*-1513));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x5ecd42+'px\x20'+(_0x25cfaa+(-8963+0x1*-6389+0x3bfc))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x25cfaa<=this['registered'][_0x2e3390]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x35bff9-(-1103*-9+-3988+-2969*0x2)+'px\x20'+_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x2e3390]['y']-_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x25cfaa>=_0x3c3bae&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=_0x35bff9-(0xabb+0x1*0xdf3+-6317)+'px\x20'+_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x25cfaa-_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}if(this['selected']['x']>this['registered'][_0x2e3390]['x']&&this['selected']['x']<=_0x35bff9){_0x22812c=!![],this['elMeasureL'+'ines']['solid_l']['style']['translate']=this['registered'][_0x2e3390]['x']+'px\x20'+_0x25cfaa+'px';const _0x2ca9e8=this['selected']['x']-this['registered'][_0x2e3390]['x'];this['elMeasureL'+'ines']['solid_l']['style']['width']=_0x2ca9e8+'px';this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='visible');const _0x361cda=window['getCompute'+'dStyle'](this['elMeasureL'+'ines']['numberL']),_0x5f0ca2=parseFloat(_0x361cda['width']['replace']('px',''));this['elMeasureL'+'ines']['numberL']['innerText']=Math['round'](_0x2ca9e8);const _0x570d13=Math['round'](this['registered'][_0x2e3390]['x']+_0x2ca9e8/(-1*-9346+-4726+-2309*0x2)-_0x5f0ca2/(-467*0xf+-1825+0x5c*0x60));this['elMeasureL'+'ines']['numberL']['style']['translate']=_0x570d13+'px\x20'+(_0x25cfaa+(-1143*-3+-3438+0xd))+'px',this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='visible'),_0x25cfaa<=this['registered'][_0x2e3390]['y']&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2e3390]['x']+'px\x20'+_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=this['registered'][_0x2e3390]['y']-_0x25cfaa+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible')),_0x25cfaa>=_0x3c3bae&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['translate']=this['registered'][_0x2e3390]['x']+'px\x20'+_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['height']=_0x25cfaa-_0x3c3bae+'px',this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='visible'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='visible'));}_0x22812c?this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=this['registered'][_0x2e3390]['width']+'px',this['elMeasureO'+'utline']['style']['height']=this['registered'][_0x2e3390]['height']+'px',this['elMeasureO'+'utline']['style']['translate']=this['registered'][_0x2e3390]['x']+'px\x20'+this['registered'][_0x2e3390]['y']+'px',this['elMeasureO'+'utline']['style']['visibility']='visible',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='auto'):(this['hideMeasur'+'eReference'+'s'](),this['hideMeasur'+'eDeshed'](),this['isToolbar']&&(this['elMeasureO'+'utline']['style']['width']=0x1224+0x64f+-6259,this['elMeasureO'+'utline']['style']['height']=0x1*0x6fb+-2202+0x19f,this['elMeasureO'+'utline']['style']['translate']='0px\x200px',this['elMeasureO'+'utline']['style']['visibility']='hidden',this['elMeasureO'+'utline']['style']['pointerEve'+'nts']='none'));}['hideMeasur'+'eReference'+'s'](){this['elMeasureL'+'ines']['solid_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_b']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['solid_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['solid_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberT']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberT']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberB']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberB']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberL']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberL']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['numberR']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['numberR']['style']['visibility']='hidden');}['hideMeasur'+'eDeshed'](){this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_l']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_v_r']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_t']['style']['visibility']='hidden'),this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']!=='hidden'&&(this['elMeasureL'+'ines']['dashed_h_b']['style']['visibility']='hidden');}['triggerSel'+'ectedLines'+'Vectors'](_0x1a4aad){_0x1a4aad==='hide'?this['elSelected'+'Lines']['l']['style']['visibility']!=='hidden'&&(this['elSelected'+'Lines']['l']['style']['visibility']='hidden',this['elSelected'+'Lines']['r']['style']['visibility']='hidden',this['elSelected'+'Lines']['t']['style']['visibility']='hidden',this['elSelected'+'Lines']['b']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['tr']['style']['visibility']='hidden',this['elSelected'+'Vectors']['bl']['style']['visibility']='hidden',this['elSelected'+'Vectors']['br']['style']['visibility']='hidden'):this['elSelected'+'Lines']['l']['style']['visibility']!=='visible'&&(this['elSelected'+'Lines']['l']['style']['visibility']='visible',this['elSelected'+'Lines']['r']['style']['visibility']='visible',this['elSelected'+'Lines']['t']['style']['visibility']='visible',this['elSelected'+'Lines']['b']['style']['visibility']='visible',this['elSelected'+'Vectors']['tl']['style']['visibility']='visible',this['elSelected'+'Vectors']['tr']['style']['visibility']='visible',this['elSelected'+'Vectors']['bl']['style']['visibility']='visible',this['elSelected'+'Vectors']['br']['style']['visibility']='visible');}['delete'](){const _0x559450=new CustomEvent('onActions',{'detail':{'type':'delete','ids':this['selected']['ids']}});this['dispatchEv'+'ent'](_0x559450);}['listenItem'+'Events'](){eventBus['on']('onItemChan'+'ge',({id:_0x43a92e,type:_0x5dfc99,value:_0x5ce2a9})=>{if(!HasOwn(this['registered'],_0x43a92e))return;let _0x347451=-4529*0x1+-6304*-1+-1775,_0x41f257=0x1bfd+0x2*-1641+-1*0xf2b,_0x51ab47='';requestAnimationFrame(()=>{switch(_0x5dfc99){case 'left':_0x51ab47='drag',this['registered'][_0x43a92e]['el']['style']['translate']=_0x5ce2a9+'px\x20'+this['registered'][_0x43a92e]['y']+'px',_0x347451=parseFloat(_0x5ce2a9),_0x41f257=this['registered'][_0x43a92e]['x']-_0x347451,this['registered'][_0x43a92e]['x']=_0x347451;if(this['selected']['ids']['length']>0xd04+0x79f*0x3+-5*0x72d){if(this['selected']['ids']['indexOf'](_0x43a92e)>-1){this['selected']['x']=_0x347451;const _0x4a2c0a=this['getTransla'+'tePos'](this['elSelected'+'Lines']['l']['style']['translate']);this['elSelected'+'Lines']['l']['style']['translate']=_0x4a2c0a['x']-_0x41f257+'px\x20'+_0x4a2c0a['y']+'px';const _0x344d5e=this['getTransla'+'tePos'](this['elSelected'+'Lines']['t']['style']['translate']);this['elSelected'+'Lines']['t']['style']['translate']=_0x344d5e['x']-_0x41f257+'px\x20'+_0x344d5e['y']+'px';const _0xe2a352=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0xe2a352['x']-_0x41f257+'px\x20'+_0xe2a352['y']+'px';const _0xee7ab6=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0xee7ab6['x']-_0x41f257+'px\x20'+_0xee7ab6['y']+'px';const _0x1940cd=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tl']['style']['translate']);this['elSelected'+'Vectors']['tl']['style']['translate']=_0x1940cd['x']-_0x41f257+'px\x20'+_0x1940cd['y']+'px';const _0x5e79de=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x5e79de['x']-_0x41f257+'px\x20'+_0x5e79de['y']+'px';const _0x1ea96f=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x1ea96f['x']-_0x41f257+'px\x20'+_0x1ea96f['y']+'px';const _0x3634c8=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x3634c8['x']-_0x41f257+'px\x20'+_0x3634c8['y']+'px';}}break;case 'top':_0x51ab47='drag',this['registered'][_0x43a92e]['el']['style']['translate']=this['registered'][_0x43a92e]['x']+'px\x20'+_0x5ce2a9+'px',_0x347451=parseFloat(_0x5ce2a9),_0x41f257=this['registered'][_0x43a92e]['y']-_0x347451,this['registered'][_0x43a92e]['y']=_0x347451;if(this['selected']['ids']['length']>0x1afc+-6833*0x1+0xf*-5){if(this['selected']['ids']['indexOf'](_0x43a92e)>-1){this['selected']['y']=_0x347451;const _0x17637b=this['getTransla'+'tePos'](this['elSelected'+'Lines']['l']['style']['translate']);this['elSelected'+'Lines']['l']['style']['translate']=_0x17637b['x']+'px\x20'+(_0x17637b['y']-_0x41f257)+'px';const _0x25e69d=this['getTransla'+'tePos'](this['elSelected'+'Lines']['t']['style']['translate']);this['elSelected'+'Lines']['t']['style']['translate']=_0x25e69d['x']+'px\x20'+(_0x25e69d['y']-_0x41f257)+'px';const _0x19f60a=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x19f60a['x']+'px\x20'+(_0x19f60a['y']-_0x41f257)+'px';const _0x6cbfb0=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x6cbfb0['x']+'px\x20'+(_0x6cbfb0['y']-_0x41f257)+'px';const _0x491093=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tl']['style']['translate']);this['elSelected'+'Vectors']['tl']['style']['translate']=_0x491093['x']+'px\x20'+(_0x491093['y']-_0x41f257)+'px';const _0x21f0fc=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x21f0fc['x']+'px\x20'+(_0x21f0fc['y']-_0x41f257)+'px';const _0x8db548=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x8db548['x']+'px\x20'+(_0x8db548['y']-_0x41f257)+'px';const _0x26df97=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x26df97['x']+'px\x20'+(_0x26df97['y']-_0x41f257)+'px';}}break;case 'width':_0x51ab47='resize_wid'+'th',this['registered'][_0x43a92e]['el']['style']['width']=_0x5ce2a9+'px',_0x347451=parseFloat(_0x5ce2a9),_0x41f257=this['registered'][_0x43a92e]['width']-_0x347451,this['registered'][_0x43a92e]['width']=_0x347451;if(this['selected']['ids']['length']>0x1*-3994+0x6*0x1a0+0x2*0x2ed){if(this['selected']['ids']['indexOf'](_0x43a92e)>-1){this['selected']['width']=this['selected']['width']-_0x41f257,this['elSelected'+'Lines']['t']['style']['width']=parseFloat(this['elSelected'+'Lines']['t']['style']['width'])-_0x41f257+'px',this['elSelected'+'Lines']['b']['style']['width']=parseFloat(this['elSelected'+'Lines']['b']['style']['width'])-_0x41f257+'px';const _0x9e28d5=this['getTransla'+'tePos'](this['elSelected'+'Lines']['r']['style']['translate']);this['elSelected'+'Lines']['r']['style']['translate']=_0x9e28d5['x']-_0x41f257+'px\x20'+_0x9e28d5['y']+'px';const _0x3bd096=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['tr']['style']['translate']);this['elSelected'+'Vectors']['tr']['style']['translate']=_0x3bd096['x']-_0x41f257+'px\x20'+_0x3bd096['y']+'px';const _0x5c8e14=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0x5c8e14['x']-_0x41f257+'px\x20'+_0x5c8e14['y']+'px';}}break;case 'height':_0x51ab47='resize_hei'+'ght',this['registered'][_0x43a92e]['el']['style']['height']=_0x5ce2a9+'px',_0x347451=parseFloat(_0x5ce2a9),_0x41f257=this['registered'][_0x43a92e]['height']-_0x347451,this['registered'][_0x43a92e]['height']=_0x347451;if(this['selected']['ids']['length']>-4*-827+0x792*0x5+-134*0x61){if(this['selected']['ids']['indexOf'](_0x43a92e)>-1){this['selected']['height']=this['selected']['height']-_0x41f257,this['elSelected'+'Lines']['l']['style']['height']=parseFloat(this['elSelected'+'Lines']['l']['style']['height'])-_0x41f257+'px',this['elSelected'+'Lines']['r']['style']['height']=parseFloat(this['elSelected'+'Lines']['r']['style']['height'])-_0x41f257+'px';const _0x2a3dda=this['getTransla'+'tePos'](this['elSelected'+'Lines']['b']['style']['translate']);this['elSelected'+'Lines']['b']['style']['translate']=_0x2a3dda['x']+'px\x20'+(_0x2a3dda['y']-_0x41f257)+'px';const _0x5b0ca8=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['bl']['style']['translate']);this['elSelected'+'Vectors']['bl']['style']['translate']=_0x5b0ca8['x']+'px\x20'+(_0x5b0ca8['y']-_0x41f257)+'px';const _0xf71ce5=this['getTransla'+'tePos'](this['elSelected'+'Vectors']['br']['style']['translate']);this['elSelected'+'Vectors']['br']['style']['translate']=_0xf71ce5['x']+'px\x20'+(_0xf71ce5['y']-_0x41f257)+'px';}}break;}const _0x49cff1=new CustomEvent('onChangeBy'+'Outside',{'detail':{'id':_0x43a92e,'type':_0x51ab47,'x':this['registered'][_0x43a92e]['x'],'y':this['registered'][_0x43a92e]['y'],'width':this['registered'][_0x43a92e]['width'],'height':this['registered'][_0x43a92e]['height']}});this['dispatchEv'+'ent'](_0x49cff1);});});}['init'](){const _0x14b8a6=document['createElem'+'ent']('template');_0x14b8a6['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x14b8a6['content']),this['onSlotChan'+'ge'](),this['handleClic'+'k'](),this['initKeyboa'+'rdEvents'](),this['isModifyOu'+'tside']&&this['listenItem'+'Events']();}}customElements['define']('glide-dnr',GlideDNR);
const properties=['left','top','width','height'];class GlideDNRItem extends HTMLElement{static get['observedAt'+'tributes'](){return properties;}constructor(){super(),Object['defineProp'+'erty'](this,'els',{'enumerable':!![],'configurable':!![],'writable':!![],'value':{}}),this['attachShad'+'ow']({'mode':'open'}),this['init']=this['init']['bind'](this);}['connectedC'+'allback'](){this['init']();}['attributeC'+'hangedCall'+'back'](_0xcd16d2,_0x14b888,_0x5383d9){if(_0x14b888===_0x5383d9)return;let _0x517ab9='';console['log']('prop:\x20',_0xcd16d2),console['log']('newValue:\x20',_0x5383d9);switch(_0xcd16d2){case 'left':_0x517ab9='left';break;case 'top':_0x517ab9='top';break;case 'width':_0x517ab9='width';break;case 'height':_0x517ab9='height';break;}_0x517ab9!==''&&eventBus['emit']('onItemChan'+'ge',{'id':this['id'],'type':_0x517ab9,'value':_0x5383d9});}['disconnect'+'edCallback'](){}['adoptedCal'+'lback'](){}['renderHtml'](){return '\x0a\x20\x20\x20\x20\x20\x20<sl'+'ot></slot>'+'\x0a\x0a\x20\x20\x20\x20\x20\x20<s'+'tyle>\x0a\x20\x20\x20\x20'+'\x20\x20\x20\x20:host\x20'+'{\x0a\x20\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20display:'+'\x20inline-bl'+'ock;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20visib'+'ility:\x20hid'+'den;\x0a\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20\x20displ'+'ay:\x20inline'+'-block;\x0a\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20\x20fl'+'ex-shrink:'+'\x200;\x0a\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20\x20user-s'+'elect:\x20non'+'e;\x0a\x20\x20\x20\x20\x20\x20\x20'+'\x20\x20\x20cursor:'+'\x20auto;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20pos'+'ition:\x20abs'+'olute;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20\x20\x20tra'+'nslate:\x200p'+'x\x200px;\x0a\x20\x20\x20'+'\x20\x20\x20\x20\x20}\x0a\x20\x20\x20'+'\x20\x20\x20</style'+'>\x0a\x20\x20\x20\x20';}['init'](){const _0x303910=document['createElem'+'ent']('template');_0x303910['innerHTML']=this['renderHtml'](),this['shadowRoot']?.['append'](_0x303910['content']),this['onceBindin'+'gs']();}['onceBindin'+'gs'](){const _0xa0dcbd=this['shadowRoot'];if(_0xa0dcbd===null)return;const _0x217008=_0xa0dcbd['querySelec'+'tor']('.glide-dnr'+'_item');_0x217008!==undefined&&(this['els']['container']=_0x217008);}}customElements['define']('glide-dnr-'+'item',GlideDNRItem);export{GlideDNR,GlideDNRItem};