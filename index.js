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
var cloneDeep = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);/**
 * 判断对象是否有属性
 *
 * @param obj 对象
 * @param property 属性名
 * @returns
 */
const HasOwn = (obj, property) => {
    // 非对象类型
    if (typeof obj !== 'object')
        return false;
    // null 或 数组
    if (obj === null || Array.isArray(obj))
        return false;
    return Object.prototype.hasOwnProperty.call(obj, property);
};class EventBus {
    constructor() {
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    // subscribe event
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    // publish event
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
    // cancel event
    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
}
const eventBus = new EventBus();const properties$1 = ["toolbar", "measure", "toolbar-placement", "actions", "modify-outside", "color-primary"];
// 通过 _window 获取全局参数
const _window = window;
const lineSize = 5;
const vectorSize = 5;
const colors = {
    primary: "#4907DA",
    red: "#FB2C36",
    redActive: "#E7110C"
};
let dragBeginPos = {
    x: -1,
    y: -1
};
// 顶点的偏移值，保证位置正确
const vectorOffset = vectorSize / 2 + 1;
const originSelected = {
    ids: [],
    x: 0,
    y: 0,
    width: 0,
    height: 0
};
// 为避免自定义组件与 web component 组件名称冲突，所有组件默认加上 V 前缀
// 例如：Image -> VImage，html tag 将转换成 v-image
class GlideDNR extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return properties$1;
    }
    constructor() {
        super();
        Object.defineProperty(this, "isToolbar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isMeasure", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isActions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isModifyOutside", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "toolbarPlacement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'float'
        }); // "float" | "top"
        Object.defineProperty(this, "colorPrimary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: colors.primary
        });
        Object.defineProperty(this, "loadingItems", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                general: {
                    total: 0,
                    loaded: 0
                },
                image: {
                    total: 0,
                    loaded: 0
                },
            }
        });
        // 选中元素 id（点击 or 框选）
        Object.defineProperty(this, "selected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cloneDeep(originSelected)
        });
        // 注册的组件
        Object.defineProperty(this, "registered", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "requestAnimation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // r: reference 
        // reference lines 选中参考线：四边
        Object.defineProperty(this, "elSelectedLines", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        // reference vectors 选中参考线：四个顶点
        Object.defineProperty(this, "elSelectedVectors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        // reference drags 拖拽框选参考线
        Object.defineProperty(this, "rDrags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // private elContainer: any = null
        // toolbar 外框
        Object.defineProperty(this, "elToolbar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // toolbar 测量按钮
        Object.defineProperty(this, "elMeasure", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // toolbar 对齐按钮
        Object.defineProperty(this, "elAligns", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // actions 删除按钮
        Object.defineProperty(this, "elActions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // 测量对比项的外框
        Object.defineProperty(this, "elMeasureOutline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "measureTargetId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        // 点击时复制一份选中元素的参数
        Object.defineProperty(this, "latestSelected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cloneDeep(originSelected)
        });
        // 上一次点击时间，用来判断双击
        Object.defineProperty(this, "lastClickTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        // 标识鼠标是否双击
        // private isDoubleClick = false
        // 用来控制初始化一次的操作
        Object.defineProperty(this, "isInit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // 鼠标移动的类型：main | measure
        Object.defineProperty(this, "mouseMoveType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        // 记录鼠标按下是是否已经存在选中元素，用于在鼠标移动时判断，是否移动选中还是框选
        Object.defineProperty(this, "hasSelected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // 标识鼠标按下后，有没有 move 过
        Object.defineProperty(this, "hasMoved", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // 判断鼠标点击的点，在不在选中元素矩形内部，用于判断是否拖拽移动选中元素
        Object.defineProperty(this, "isInSelected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // 鼠标点击元素的对象
        Object.defineProperty(this, "mouseTarget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        // 对齐吸附阈值
        // 这个值采用动态值，5 和 2，当首次吸附到后，改为 2，进行精确移动吸附
        // 将两个阀值分开, 可以避免一方方向吸附后动态调整阀值, 影响另一方向的吸附效果
        // 垂直移动时的吸附阀值
        Object.defineProperty(this, "thresholdHorizontal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        // 水平移动时的吸附阀值
        Object.defineProperty(this, "thresholdVertical", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        // 吸附对齐会出现小数位，导致使用绝对相等来判断会失败，观察值小数位在 0.000 位上，这里设置为 0.0 位上
        Object.defineProperty(this, "alignVectorsLinesThreshold", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.1
        });
        Object.defineProperty(this, "elMeasureLines", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
            // solid_t: null, // #measure-line_solid_top
            // solid_b: null, // #measure-line_solid_bottom
            // solid_l: null, // #measure-line_solid_left
            // solid_r: null, // #measure-line_solid_right
            // dashed_h_t: null, // #measure-line_dashed_top
            // dashed_h_b: null, // #measure-line_dashed_bottom
            // dashed_v_l: null, // #measure-line_dashed_left
            // dashed_v_r: null, // #measure-line_dashed_right
            }
        });
        this.attachShadow({ mode: 'open' });
        this.measure = this.measure.bind(this); // 为 measure 方法绑定 this
        this.delete = this.delete.bind(this);
    }
    // connect component
    connectedCallback() {
        this.init();
    }
    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (property) {
            case "toolbar":
                if (newValue === "") {
                    this.isToolbar = true;
                }
                break;
            case "measure":
                if (newValue === "") {
                    this.isMeasure = true;
                }
                break;
            case 'toolbar-placement':
                this.toolbarPlacement = newValue;
                break;
            case "actions":
                if (newValue === "") {
                    this.isActions = true;
                }
                break;
            case "modify-outside":
                if (newValue === "") {
                    this.isModifyOutside = true;
                }
                break;
            case "color-primary":
                this.colorPrimary = newValue;
                break;
        }
    }
    disconnectedCallback() {
        // console.log('disconnected');
    }
    adoptedCallback() {
        // console.log('adopted');
    }
    renderHtml() {
        return /*html*/ `
      <div class="container" id="container">
        <div class="main" id="main">
          <slot class="slot"></slot>
        </div>
        <div class="reference-lines_align"></div>
        <div class="reference-lines_drag"></div>
        <div class="reference-lines_selected">
          <!-- line -->
          <div
            class="line left"
            style="
            translate: ${this.selected.x - lineSize / 2}px ${this.selected.y}px;
            width: ${lineSize}px;
            height: ${this.selected.height}px;
            "
          ></div>

          <div
            class="line right"
            style="
              translate: ${this.selected.x + this.selected.width - lineSize / 2}px ${this.selected.y}px;
              width: ${lineSize}px;
              height: ${this.selected.height}px;
            "
          ></div>

          <div
            class="line top"
            style="
              translate: ${this.selected.x}px ${this.selected.y - lineSize / 2}px;
              width: ${this.selected.width}px;
              height: ${lineSize}px;
            "
          ></div>

          <div
            class="line bottom"
            style="
              translate: ${this.selected.x}px ${this.selected.y + this.selected.height - lineSize / 2}px;
              width: ${this.selected.width}px;
              height: ${lineSize}px;
            "
          ></div>

          <!-- vector -->
          <div
            class="vector top-left"
            style="
              translate: ${this.selected.x - vectorOffset}px ${this.selected.y - vectorOffset}px;"
          ></div>

          <div
            class="vector top-right"
            style="
              translate: ${this.selected.x + this.selected.width - vectorOffset}px ${this.selected.y - vectorOffset}px;"
          ></div>

          <div
            class="vector bottom-left"
            style="
              translate: ${this.selected.x - vectorOffset}px ${this.selected.y + this.selected.height - vectorOffset}px;"
          ></div>

          <div
            class="vector bottom-right"
            style="
              translate: ${this.selected.x + this.selected.width - vectorOffset}px ${this.selected.y + this.selected.height - vectorOffset}px;"
          ></div>
        </div>

        <!-- 测距离参考线 和 数字 -->
        <div class="measure-lines">

          <!-- 实线：选中项 -->
          <div class="solid">
            <div class="item top"></div>
            <div class="item bottom"></div>
            <div class="item left"></div>
            <div class="item right"></div>
          </div>

          <!-- 虚线：目标项 -->
          <div class="dashed">
            <div class="item horizontal-top"></div>
            <div class="item horizontal-bottom"></div>
            <div class="item vertical-left"></div>
            <div class="item vertical-right"></div>
          </div>

          <div class="number number-top">283</div>
          <div class="number number-bottom">222</div>
          <div class="number number-left">333</div>
          <div class="number number-right">444</div>
        </div>

        <div class="measure-target-outline"></div>

        ${this.isToolbar ? /*html*/ `
        <div class="toolbar">

          <div class="inner">
            <div class="group aligns" id="aligns">
              
              <div class="toolbar-item horizontal-left">
                <svg svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M145.39-100q-12.77 0-21.39-8.62-8.61-8.61-8.61-21.38v-700q0-12.77 8.61-21.38 8.62-8.62 21.39-8.62 12.77 0 21.38 8.62 8.62 8.61 8.62 21.38v700q0 12.77-8.62 21.38-8.61 8.62-21.38 8.62Zm171.92-193.85q-20.77 0-35.58-14.8-14.8-14.81-14.8-35.58 0-20.77 14.8-35.58 14.81-14.8 35.58-14.8h236.92q20.77 0 35.58 14.8 14.8 14.81 14.8 35.58 0 20.77-14.8 35.58-14.81 14.8-35.58 14.8H317.31Zm0-271.54q-20.77 0-35.58-14.8-14.8-14.81-14.8-35.58 0-20.77 14.8-35.58 14.81-14.8 35.58-14.8h476.92q20.77 0 35.58 14.8 14.8 14.81 14.8 35.58 0 20.77-14.8 35.58-14.81 14.8-35.58 14.8H317.31Z"/></svg>
              </div>
              <div class="toolbar-item horizontal-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M450-130v-163.85H310.39q-20.77 0-35.58-14.8Q260-323.46 260-344.23q0-20.77 14.81-35.58 14.81-14.8 35.58-14.8H450v-170.78H190.39q-20.77 0-35.58-14.8Q140-595 140-615.77q0-20.77 14.81-35.58 14.81-14.8 35.58-14.8H450V-830q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q510-842.75 510-830v163.85h259.61q20.77 0 35.58 14.8Q820-636.54 820-615.77q0 20.77-14.81 35.58-14.81 14.8-35.58 14.8H510v170.78h139.61q20.77 0 35.58 14.8Q700-365 700-344.23q0 20.77-14.81 35.58-14.81 14.8-35.58 14.8H510V-130q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63-12.76 0-21.37-8.63Q450-117.25 450-130Z"/></svg>
              </div>
              <div class="toolbar-item horizontal-right">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M814.61-100q-12.77 0-21.38-8.62-8.62-8.61-8.62-21.38v-700q0-12.77 8.62-21.38 8.61-8.62 21.38-8.62t21.39 8.62q8.61 8.61 8.61 21.38v700q0 12.77-8.61 21.38-8.62 8.62-21.39 8.62ZM405.77-293.85q-20.77 0-35.58-14.8-14.8-14.81-14.8-35.58 0-20.77 14.8-35.58 14.81-14.8 35.58-14.8h236.92q20.77 0 35.58 14.8 14.8 14.81 14.8 35.58 0 20.77-14.8 35.58-14.81 14.8-35.58 14.8H405.77Zm-240-271.54q-20.77 0-35.58-14.8-14.8-14.81-14.8-35.58 0-20.77 14.8-35.58 14.81-14.8 35.58-14.8h476.92q20.77 0 35.58 14.8 14.8 14.81 14.8 35.58 0 20.77-14.8 35.58-14.81 14.8-35.58 14.8H165.77Z"/></svg>
              </div>

              <div class="divider"></div>
              
              <div class="toolbar-item vertical-top">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M344.23-110q-20.77 0-35.58-14.81-14.8-14.81-14.8-35.58v-488.07q0-20.77 14.8-35.58 14.81-14.8 35.58-14.8 20.77 0 35.58 14.8 14.8 14.81 14.8 35.58v488.07q0 20.77-14.8 35.58Q365-110 344.23-110Zm271.54-240q-20.77 0-35.58-14.81-14.8-14.81-14.8-35.58v-248.07q0-20.77 14.8-35.58 14.81-14.8 35.58-14.8 20.77 0 35.58 14.8 14.8 14.81 14.8 35.58v248.07q0 20.77-14.8 35.58Q636.54-350 615.77-350ZM130-790.38q-12.77 0-21.38-8.62-8.62-8.61-8.62-21.38t8.62-21.39q8.61-8.61 21.38-8.61h700q12.77 0 21.38 8.61 8.62 8.62 8.62 21.39 0 12.77-8.62 21.38-8.61 8.62-21.38 8.62H130Z"/></svg>
              </div>
              <div class="toolbar-item vertical-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M342.31-140q-20.77 0-35.58-14.81-14.81-14.81-14.81-35.58V-450H130q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q117.25-510 130-510h161.92v-259.61q0-20.77 14.81-35.58Q321.54-820 342.31-820q20.77 0 35.57 14.81 14.81 14.81 14.81 35.58V-510h174.62v-139.61q0-20.77 14.81-35.58Q596.92-700 617.69-700t35.58 14.81q14.81 14.81 14.81 35.58V-510H830q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q842.75-450 830-450H668.08v139.61q0 20.77-14.81 35.58Q638.46-260 617.69-260q-20.77 0-35.57-14.81-14.81-14.81-14.81-35.58V-450H392.69v259.61q0 20.77-14.81 35.58Q363.08-140 342.31-140Z"/></svg>
              </div>
              <div class="toolbar-item vertical-bottom">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M130-110q-12.77 0-21.38-8.62Q100-127.23 100-140t8.62-21.39Q117.23-170 130-170h700q12.77 0 21.38 8.61Q860-152.77 860-140q0 12.77-8.62 21.38Q842.77-110 830-110H130Zm214.23-151.54q-20.77 0-35.58-14.81-14.8-14.81-14.8-35.57V-800q0-20.77 14.8-35.57 14.81-14.81 35.58-14.81 20.77 0 35.58 14.81 14.8 14.8 14.8 35.57v488.08q0 20.76-14.8 35.57-14.81 14.81-35.58 14.81Zm271.54 0q-20.77 0-35.58-14.81-14.8-14.81-14.8-35.57V-560q0-20.77 14.8-35.57 14.81-14.81 35.58-14.81 20.77 0 35.58 14.81 14.8 14.8 14.8 35.57v248.08q0 20.76-14.8 35.57-14.81 14.81-35.58 14.81Z"/></svg>
              </div>

              <div class="divider"></div>
              
              <div class="toolbar-item horizontal-distribute">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M129.99-100q-12.76 0-21.37-8.63Q100-117.25 100-130v-700q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q160-842.75 160-830v700q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63Zm350.06-190q-20.82 0-35.43-14.58Q430-319.17 430-340v-280q0-20.83 14.57-35.42Q459.14-670 479.95-670q20.82 0 35.43 14.58Q530-640.83 530-620v280q0 20.83-14.57 35.42Q500.86-290 480.05-290Zm349.94 190q-12.76 0-21.37-8.63Q800-117.25 800-130v-700q0-12.75 8.63-21.37 8.63-8.63 21.38-8.63 12.76 0 21.37 8.63Q860-842.75 860-830v700q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63Z"/></svg>
              </div>

              <div class="toolbar-item vertical-distribute">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#030713"><path d="M130-100q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q117.25-160 130-160h700q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q842.75-100 830-100H130Zm210-330q-20.83 0-35.42-14.57Q290-459.14 290-479.95q0-20.82 14.58-35.43Q319.17-530 340-530h280q20.83 0 35.42 14.57Q670-500.86 670-480.05q0 20.82-14.58 35.43Q640.83-430 620-430H340ZM130-800q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37Q117.25-860 130-860h700q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q842.75-800 830-800H130Z"/></svg>
              </div>

              ${this.isMeasure ? /*html*/ `
                <div class="divider"></div>
              ` : ""}
            </div>
            
            ${this.isMeasure ? /*html*/ `
            <div class="group measure" id="measure">
              <div class="toolbar-item">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="#030713"><path d="M172.31-260Q142-260 121-281q-21-21-21-51.44v-295.12Q100-658 121-679q21-21 51.31-21h615.38Q818-700 839-679q21 21 21 51.44v295.12Q860-302 839-281q-21 21-51.31 21H172.31Zm0-60h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-295.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H670v114.61q0 12.75-8.63 21.38-8.63 8.62-21.38 8.62-12.76 0-21.37-8.62-8.62-8.63-8.62-21.38V-640H510v114.61q0 12.75-8.63 21.38-8.63 8.62-21.38 8.62-12.76 0-21.37-8.62-8.62-8.63-8.62-21.38V-640H350v114.61q0 12.75-8.63 21.38-8.63 8.62-21.38 8.62-12.76 0-21.37-8.62-8.62-8.63-8.62-21.38V-640H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v295.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM320-495.39Zm160 0Zm160 0ZM480-480Z"/></svg>
              </div>
            </div>
            ` : ""}
          </div>
        </div>
        ` : ""}

        <div class="actions" id="actions">
          <div class="actions-item">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>
          </div>
        </div>

        <div class="loading">
          <div class="inner"></div>
        </div>
      </div>

      <style>
        /* 定义旋转动画 */
        @keyframes rotate360 {
          from {
              transform: rotate(0deg);
          }
          to {
              transform: rotate(360deg);
          }
        }
        
        :host {
          display: block;
          width: calc(100% - 1px);
          height: calc(100% - 1px);

          .container {
            width: 100%;
            height: 100%;
            position: relative;

            .main {
              width: 100%;
              height: 100%;

              ::slotted(glide-dnr-item) {
                position: absolute;
                display: inline-block;
                flex-shrink: 0;
                user-select: none;
                cursor: auto;
              }
            }

            .align-vector {
              color: ${colors.red};
              font-size: 12px;
              line-height: 0;
              z-index: 100004;
            }
            
            .align-line {
              z-index: 100004;
            }
 
            .align-line-vertical {
              border-top: solid 1px ${colors.red};
            }
            
            .align-line-horizontal {
              border-left: solid 1px ${colors.red};
            }

            .reference-lines_selected {
              position: absolute;
              left: 0;
              top: 0;

              .line {
                position: absolute;
                z-index: 100002;
                visibility: hidden;

                &.left, &.right {

                  &:hover {
                    cursor: ew-resize;
                  }

                  &::before {
                    content: '';
                    position: absolute;
                    left: ${Math.floor(lineSize / 2)}px;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background: ${this.colorPrimary};
                  }
                }

                &.top, &.bottom {

                  &:hover {
                    cursor: ns-resize;
                  }

                  &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: ${Math.floor(lineSize / 2)}px;
                    width: 100%;
                    height: 1px;
                    background: ${this.colorPrimary};
                  }
                }
              }

              .vector {
                position: absolute;
                display: inline-block;
                width: ${vectorSize}px;
                height: ${vectorSize}px;
                border: solid 1px ${this.colorPrimary};
                background: #ffffff;
                z-index: 100003;
                visibility: hidden;

                &.top-left, &.bottom-right {

                  &:hover {
                    cursor: se-resize;
                  }
                }

                &.top-right, &.bottom-left {

                  &:hover {
                    cursor: nesw-resize;
                  }
                }
              }
            }

            .reference-lines_drag {
              position: absolute;
              width: 0px;
              height: 0px;
              top: 0px;
              left: 0px;
              border: solid 1px ${this.colorPrimary};
              z-index: 11;
              background: rgba(73, 7, 218, .05);
              visibility: hidden;
            }

            .toolbar {
              display: ${this.toolbarPlacement === 'float' ? "inline" : "block"};
              position: absolute;
              top: ${this.toolbarPlacement === 'float' ? 0 : "10px"};
              left: 0;
              ${this.toolbarPlacement === 'float' ? "" : "width: 100%;"}
              visibility: hidden;
              text-align: center;
              ponter-events: none;
              z-index: 100005;

              .inner {
                display: inline-flex;
                justify-content: center;
                gap: 4px;
                padding: 4px;
                border-radius: 8px;
                translate: 0px 0px;
                background: rgba(255,255,255,.5);
                backdrop-filter: blur(25px);
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                z-index: 100004;
                ponter-events: auto;

                .group {
                  display: none;
                  gap: 4px;
                  align-items: center;
                
                  .divider {
                    width: 1px;
                    height: 12px;
                    background: #D1D5DC;
                  }

                  .toolbar-item {
                    display: inline-flex;
                    padding: 4px;
                    border-radius: 8px;
                    cursor: pointer;

                    &:hover {
                      background: #F3F4F6;
                    }
                    
                    &:active {
                      background: #E5E7EB;
                    }
                  }

                  &.active {

                    .toolbar-item {

                      background: ${this.colorPrimary};

                      svg {
                        fill: #ffffff;
                      }
                    }
                  }
                }
              }

            }

            .measure-lines {
              z-index: 100006;
              position: absolute;
              top: 0;
              left: 0;

              .solid {

                .item {
                  visibility: hidden;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 100005;

                  &.top {
                    width: 1px;
                    background-size: 4px 12px;
                    background-repeat: repeat-y;
                    background-image: linear-gradient(to bottom, ${colors.red} 0%, ${colors.red} 100%);
                  }

                  &.bottom {
                    width: 1px;
                    background-size: 4px 12px;
                    background-repeat: repeat-y;
                    background-image: linear-gradient(to bottom, ${colors.red} 0%, ${colors.red} 100%);
                  }

                  &.left {
                    height: 1px;
                    background-size: 12px 4px;
                    background-repeat: repeat-x;
                    background-image: linear-gradient(to right, ${colors.red} 0%, ${colors.red} 100%);
                  }

                  &.right {
                    height: 1px;
                    background-size: 12px 4px;
                    background-repeat: repeat-x;
                    background-image: linear-gradient(to right, ${colors.red} 0%, ${colors.red} 100%);
                  }
                }
              }

              .dashed {

                .item {
                  visibility: hidden;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 100005;

                  &.horizontal-top {
                    height: 1px;
                    background-size: 12px 4px;
                    background-repeat: repeat-x;
                    background-image: linear-gradient(to right, ${colors.red} 0%, ${colors.red} 65%, transparent 35%);
                  }

                  &.horizontal-bottom {
                    height: 1px;
                    background-size: 12px 4px;
                    background-repeat: repeat-x;
                    background-image: linear-gradient(to right, ${colors.red} 0%, ${colors.red} 65%, transparent 35%);
                  }

                  &.vertical-left {
                    width: 1px;
                    background-size: 4px 12px;
                    background-repeat: repeat-y;
                    background-image: linear-gradient(to bottom, ${colors.red} 0%, ${colors.red} 65%, transparent 35%);
                  }

                  &.vertical-right {
                    width: 1px;
                    background-size: 4px 12px;
                    background-repeat: repeat-y;
                    background-image: linear-gradient(to bottom, ${colors.red} 0%, ${colors.red} 65%, transparent 35%);
                  }
                }
              }

              .number {
                visibility: hidden;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 10px;
                padding:2px 4px;
                background: ${colors.red};
                border-radius: 4px;
                color: #FFFFFF;
              }
            }

            .measure-target-outline {
              visibility: hidden;
              border: solid 1px ${colors.red};
              box-sizing: border-box;
              position: absolute;
              top: 0;
              left: 0;
              pointer-events: none !important;
              z-index: 100006;
            }

            .actions {
              position: absolute;
              left: 0;
              top: 0;
              visibility: hidden;

              .actions-item {
                padding: 4px;
                border-radius: 8px;
                translate: 0px 0px;
                backdrop-filter: blur(25px);
                z-index: 100004;
                line-height: 0;
                cursor: pointer;

                svg {
                  fill: ${colors.red};
                }

                &:hover {
                  background: ${colors.red};
                  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

                  svg {
                    fill: #FFFFFF;
                  }
                }

                &:active {
                  background: ${colors.redActive};
                  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

                  svg {
                    fill: #FFFFFF;
                  }
                }
              }
            }

            .loading {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(255,255,255,.5);
              backdrop-filter: blur(25px);
              display: flex;
              align-items: center;
              justify-content: center;

              z-index: 100007;

              .inner {
                position: relative;
                width: 30px;
                height: 30px;
                border: 2px solid #4907DA;
                border-top-color: rgba(0, 0, 0, 0.2);
                border-right-color: rgba(0, 0, 0, 0.2);
                border-bottom-color: rgba(0, 0, 0, 0.2);
                border-radius: 100%;

                animation: rotate360 infinite 0.75s linear;
              }
            }
          }
        }

        .slot {}
      </style>
    `;
    }
    /**
     * 一次性绑定元素，后期直接使用
     */
    onceBindings() {
        const root = this.shadowRoot;
        if (root === null)
            return;
        let el = root.querySelector(".main");
        if (el !== null && el !== undefined) {
            const { width, height } = el.getBoundingClientRect();
            // 把容器注册
            this.registered['main'] = {
                id: "main",
                el: el,
                x: 0, // 这里须要是 0，renderDragSelectReferenceLine 中才能正常
                y: 0, // 这里须要是 0，renderDragSelectReferenceLine 中才能正常
                width,
                height,
                type: "main"
            };
        }
        if (this.isToolbar) {
            el = root.querySelector(".toolbar");
            if (el !== null) {
                this.elToolbar = el;
            }
            el = root.querySelector(".aligns");
            if (el !== null) {
                this.elAligns = el;
            }
            el = root.querySelector(".measure");
            if (el !== null) {
                this.elMeasure = el;
            }
            el = root.querySelector(".measure-target-outline");
            if (el !== null) {
                this.elMeasureOutline = el;
            }
            // measure lines
            // solid
            el = root.querySelector(".measure-lines .top");
            if (el !== null) {
                this.elMeasureLines.solid_t = el;
            }
            el = root.querySelector(".measure-lines .bottom");
            if (el !== null) {
                this.elMeasureLines.solid_b = el;
            }
            el = root.querySelector(".measure-lines .left");
            if (el !== null) {
                this.elMeasureLines.solid_l = el;
            }
            el = root.querySelector(".measure-lines .right");
            if (el !== null) {
                this.elMeasureLines.solid_r = el;
            }
            // dashed
            el = root.querySelector(".measure-lines .horizontal-top");
            if (el !== null) {
                this.elMeasureLines.dashed_h_t = el;
            }
            el = root.querySelector(".measure-lines .horizontal-bottom");
            if (el !== null) {
                this.elMeasureLines.dashed_h_b = el;
            }
            el = root.querySelector(".measure-lines .vertical-left");
            if (el !== null) {
                this.elMeasureLines.dashed_v_l = el;
            }
            el = root.querySelector(".measure-lines .vertical-right");
            if (el !== null) {
                this.elMeasureLines.dashed_v_r = el;
            }
            el = root.querySelector(".measure-lines  .number-top");
            if (el !== null) {
                this.elMeasureLines.numberT = el;
            }
            el = root.querySelector(".measure-lines  .number-bottom");
            if (el !== null) {
                this.elMeasureLines.numberB = el;
            }
            el = root.querySelector(".measure-lines  .number-left");
            if (el !== null) {
                this.elMeasureLines.numberL = el;
            }
            el = root.querySelector(".measure-lines  .number-right");
            if (el !== null) {
                this.elMeasureLines.numberR = el;
            }
        }
        el = root.querySelector(".left");
        if (el !== null && !HasOwn(this.elSelectedLines, "l")) {
            this.elSelectedLines.l = el;
        }
        el = root.querySelector(".right");
        if (el !== null && !HasOwn(this.elSelectedLines, "r")) {
            this.elSelectedLines.r = el;
        }
        el = root.querySelector(".top");
        if (el !== null && !HasOwn(this.elSelectedLines, "t")) {
            this.elSelectedLines.t = el;
        }
        el = root.querySelector(".bottom");
        if (el !== null && !HasOwn(this.elSelectedLines, "b")) {
            this.elSelectedLines.b = el;
        }
        el = root.querySelector(".top-left");
        if (el !== null && !HasOwn(this.elSelectedLines, "tl")) {
            this.elSelectedVectors.tl = el;
        }
        el = root.querySelector(".top-right");
        if (el !== null && !HasOwn(this.elSelectedLines, "tr")) {
            this.elSelectedVectors.tr = el;
        }
        el = root.querySelector(".bottom-left");
        if (el !== null && !HasOwn(this.elSelectedLines, "bl")) {
            this.elSelectedVectors.bl = el;
        }
        el = root.querySelector(".bottom-right");
        if (el !== null && !HasOwn(this.elSelectedLines, "br")) {
            this.elSelectedVectors.br = el;
        }
        el = root.querySelector(".reference-lines_drag");
        if (el !== null && this.rDrags === null) {
            this.rDrags = el;
        }
        el = root.querySelector("#actions");
        if (el !== null) {
            this.elActions = el;
        }
    }
    /**
     * 获取 slot 加载元素的数量
     */
    countLoadingItems() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (slot === null || slot === undefined)
            return;
        const assignedNodes = slot.assignedNodes({ flatten: false });
        // 遍历 slot 内一层元素
        for (const n in assignedNodes) {
            const node = assignedNodes[n];
            if (node.nodeType !== Node.ELEMENT_NODE)
                continue;
            // 获取类型
            const type = node.getAttribute("type");
            // 图片元素
            if (type === "image") {
                this.loadingItems.image.total++;
            }
            // 普通元素
            if (type === null || type === "general") {
                this.loadingItems.general.total++;
            }
        }
    }
    hideLoading() {
        console.log('this.loadingItems.general.loaded: ', this.loadingItems.general.loaded);
        console.log('this.loadingItems.general.total: ', this.loadingItems.general.total);
        console.log('this.loadingItems.image.loaded: ', this.loadingItems.image.loaded);
        console.log('this.loadingItems.image.total: ', this.loadingItems.image.total);
        // 文字元素加载完 && 如果图片元素也加载完
        if (this.loadingItems.general.loaded === this.loadingItems.general.total && this.loadingItems.image.loaded === this.loadingItems.image.total) {
            const elLoading = this.shadowRoot?.querySelector(".loading");
            if (elLoading !== null && elLoading !== undefined) {
                elLoading.style.display = "none";
            }
        }
    }
    /**
     * 渲染 slot 下元素，为每个元素添加包裹层
     */
    renderItems() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (slot === null || slot === undefined)
            return;
        const assignedNodes = slot.assignedNodes({ flatten: false });
        // 遍历 slot 内一层元素
        for (const n in assignedNodes) {
            const node = assignedNodes[n];
            if (node.nodeType !== Node.ELEMENT_NODE) {
                this.hideLoading();
                continue;
            }
            // 获取类型
            const type = node.getAttribute("type");
            // 加载 general 类型
            if (type === null || type === "general") {
                this.renderItem(node);
                this.hideLoading();
            }
            // 加载 图片 类型
            if (type === "image") {
                // 将 image 内的 img 替换为 canvas，解决图片变化浏览器重排导致卡顿的问题
                // 检查是否已经存在 canvas，如果已经存在 canvas，跳过处理
                if (node.querySelector("canvas"))
                    continue;
                this.renderImageItem(node).then(() => {
                    this.hideLoading();
                });
            }
        }
    }
    /**
     * 处理 general 元素
     */
    renderItem(node) {
        // 获取宽高
        const rect = node.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;
        // 获取标签上的参数
        const propLeft = node.getAttribute("left");
        const propTop = node.getAttribute("top");
        const propWidth = node.getAttribute("width");
        const propHeight = node.getAttribute("height");
        let x = 0;
        let y = 0;
        if (propLeft !== null) {
            x = propLeft;
        }
        if (propTop !== null) {
            y = propTop;
        }
        if (propWidth !== null) {
            width = propWidth;
        }
        if (propHeight !== null) {
            height = propHeight;
        }
        // 获取元素本身的参数
        // 这里是为外部更换图片时，保持 x,y 位置
        if (node.style.translate !== '') {
            const style = window.getComputedStyle(node);
            const elTranslatePos = this.getTranslatePos(style.translate);
            x = elTranslatePos.x;
            y = elTranslatePos.y;
        }
        x = Math.round(x);
        y = Math.round(y);
        width = Math.round(width);
        height = Math.round(height);
        this.registered[node.id] = {
            id: node.id,
            el: node,
            x,
            y,
            width,
            height,
            type: "general"
        };
        this.loadingItems.general.loaded++;
        node.style.visibility = "visible";
        node.style.translate = `${x}px ${y}px`;
        node.style.width = `${width}px`;
        node.style.height = `${height}px`;
    }
    /**
     * 处理 image 类型元素
     */
    renderImageItem(node) {
        return new Promise((resolve) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const elCanvas = document.createElement("canvas");
                elCanvas.style.cssText = `width: 100%; height: 100%;`;
                const ctx = elCanvas.getContext("2d");
                const elImg = node.querySelector("img");
                // 创建图片对象
                const img = new Image();
                img.src = elImg.src; // 获取图片 src
                // old img
                const elImgs = node.getElementsByTagName("img");
                Array.from(elImgs).forEach((elImg) => {
                    elImg.remove();
                });
                // 图片加载完成后绘制到 Canvas
                img.onload = () => {
                    let x = 0;
                    let y = 0;
                    // 获取标签上的参数
                    const propLeft = node.getAttribute("left");
                    const propTop = node.getAttribute("top");
                    const propWidth = node.getAttribute("width");
                    const propHeight = node.getAttribute("height");
                    if (propLeft !== null) {
                        x = propLeft;
                    }
                    if (propTop !== null) {
                        y = propTop;
                    }
                    // 获取元素本身的参数
                    // 这里是为外部更换图片时，保持 x,y 位置
                    if (node.style.translate !== '') {
                        const style = window.getComputedStyle(node);
                        const elTranslatePos = this.getTranslatePos(style.translate);
                        x = elTranslatePos.x;
                        y = elTranslatePos.y;
                    }
                    // 宽高比
                    const ratio = img.width / img.height;
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    if (propWidth !== null && propHeight !== null) {
                        // 设置了宽和高 或 修改图片
                        imgWidth = propWidth;
                        imgHeight = imgWidth / ratio;
                        node.style.width = `${Math.round(imgWidth)}px`;
                        node.style.height = `${Math.round(imgHeight)}px`;
                    }
                    else if (propWidth !== null && propHeight === null) {
                        // 设置宽, 未设置高
                        imgWidth = propWidth;
                        imgHeight = imgWidth / ratio;
                        node.style.width = `${Math.round(imgWidth)}px`;
                        node.style.height = `${Math.round(imgHeight)}px`;
                    }
                    else if (propWidth === null && propHeight !== null) {
                        // 未设置宽, 设置了高
                        imgHeight = propHeight;
                        imgWidth = imgHeight * ratio;
                        node.style.width = `${Math.round(imgWidth)}px`;
                        node.style.height = `${Math.round(imgHeight)}px`;
                    }
                    else {
                        // 未设置宽和高
                        node.style.width = `${Math.round(imgWidth)}px`;
                        node.style.height = `${Math.round(imgHeight)}px`;
                    }
                    x = Math.round(x);
                    y = Math.round(y);
                    imgWidth = Math.round(imgWidth);
                    imgHeight = Math.round(imgHeight);
                    this.registered[node.id] = {
                        id: node.id,
                        el: node,
                        x: x,
                        y: y,
                        width: imgWidth,
                        height: imgHeight,
                        type: "image"
                    };
                    // 计算缩放比例
                    const scale = Math.min(window.innerWidth / img.width, window.innerHeight / img.height);
                    const displayWidth = Math.round(img.width * scale);
                    const displayHeight = Math.round(img.height * scale);
                    // 设置 Canvas 大小
                    elCanvas.width = displayWidth;
                    elCanvas.height = displayHeight;
                    ctx?.drawImage(img, 0, 0, displayWidth, displayHeight); // 在 (0, 0) 位置绘制图片
                    // node.innerHTML = ""
                    node.appendChild(elCanvas);
                    if (this.selected.ids.length > 0) {
                        // 更新选中元素组成后的参数
                        this.getSelectedParams();
                        this.renderSelectedReference();
                    }
                    this.loadingItems.image.loaded++;
                    node.style.visibility = "visible";
                    node.style.translate = `${x}px ${y}px`;
                    node.style.width = `${imgWidth}px`;
                    node.style.height = `${imgHeight}px`;
                    resolve("");
                };
            }
        });
    }
    initKeyboardEvents() {
        // 绑定键盘事件
        document.addEventListener("keydown", (e) => {
            requestAnimationFrame(() => {
                switch (e.keyCode) {
                    case 37: // 左
                        if (this.hasSelected && this.isInSelected) {
                            // 移动内部元素
                            for (let id of this.selected.ids) {
                                this.registered[id].x--;
                                // 当 translate y 为空时，就只有 x 值
                                this.registered[id].el.style.translate = `${this.registered[id].x}px ${this.registered[id].y}px`;
                            }
                            this.selected.x--;
                        }
                        break;
                    case 38: // 上
                        if (this.hasSelected && this.isInSelected) {
                            // 移动内部元素
                            for (let id of this.selected.ids) {
                                this.registered[id].y--;
                                // 当 translate y 为空时，就只有 x 值
                                this.registered[id].el.style.translate = `${this.registered[id].x}px ${this.registered[id].y}px`;
                            }
                            this.selected.y--;
                        }
                        break;
                    case 39: // 右
                        if (this.hasSelected && this.isInSelected) {
                            // 移动内部元素
                            for (let id of this.selected.ids) {
                                this.registered[id].x++;
                                // 当 translate y 为空时，就只有 x 值
                                this.registered[id].el.style.translate = `${this.registered[id].x}px ${this.registered[id].y}px`;
                            }
                            this.selected.x++;
                        }
                        break;
                    case 40: // 下
                        if (this.hasSelected && this.isInSelected) {
                            // 移动内部元素
                            for (let id of this.selected.ids) {
                                this.registered[id].y++;
                                // 当 translate y 为空时，就只有 x 值
                                this.registered[id].el.style.translate = `${this.registered[id].x}px ${this.registered[id].y}px`;
                            }
                            this.selected.y++;
                        }
                        break;
                }
                this.renderSelectedReference();
                this.measureExecute();
                if (this.toolbarPlacement === 'float') {
                    this.setToolbarPosition();
                }
                // emit
                const customEvent = new CustomEvent('onChange', {
                    detail: {
                        ...this.selected
                    },
                });
                this.dispatchEvent(customEvent);
            });
        });
    }
    /**
     * 监听 slot 改变值后重新渲染 items
     */
    onSlotChange() {
        const slot = this.shadowRoot?.querySelector("slot");
        if (slot === null || slot === undefined)
            return;
        slot?.addEventListener("slotchange", () => {
            // console.log('slot changed')
            this.countLoadingItems();
            this.renderItems();
            if (!this.isInit) {
                this.onceBindings();
                this.isInit = true;
            }
        });
    }
    // 算了组件后，计算选中元素组成形状的参数
    getSelectedParams() {
        let posBegin = {
            x: 0,
            y: 0,
        };
        let posEnd = {
            x: 0,
            y: 0,
        };
        // 遍历每个选中元素
        // 拿到最小的 [X0,Y0], 和最大的 [X1,Y1]
        for (let i = 0; i < this.selected.ids.length; i++) {
            const id = this.selected.ids[i];
            if (i === 0) {
                posBegin = {
                    x: this.registered[id].x,
                    y: this.registered[id].y,
                };
                posEnd = {
                    x: this.registered[id].x + this.registered[id].width,
                    y: this.registered[id].y + this.registered[id].height,
                };
            }
            else {
                const posBeginX = this.registered[id].x;
                const posBeginY = this.registered[id].y;
                posBegin = {
                    x: posBeginX < posBegin.x ? posBeginX : posBegin.x,
                    y: posBeginY < posBegin.y ? posBeginY : posBegin.y,
                };
                const posEndX = this.registered[id].x + this.registered[id].width;
                const posEndY = this.registered[id].y + this.registered[id].height;
                posEnd = {
                    x: posEndX >= posEnd.x ? posEndX : posEnd.x,
                    y: posEndY >= posEnd.y ? posEndY : posEnd.y,
                };
            }
        }
        // 计算宽高: X1 - X0, Y1 - Y0
        const width = posEnd.x - posBegin.x;
        const height = posEnd.y - posBegin.y;
        this.selected = { ...this.selected, ...{ x: posBegin.x, y: posBegin.y, width, height } };
    }
    // 显示 / 隐藏 选中参考线和顶点
    renderSelectedReference() {
        // line left
        this.elSelectedLines.l.style.translate = `${this.selected.x - lineSize / 2}px ${this.selected.y}px`;
        this.elSelectedLines.l.style.height = `${this.selected.height}px`;
        // line right
        this.elSelectedLines.r.style.translate = `${this.selected.x + this.selected.width - lineSize / 2}px ${this.selected.y}px`;
        this.elSelectedLines.r.style.height = `${this.selected.height}px`;
        // line top
        this.elSelectedLines.t.style.translate = `${this.selected.x}px ${this.selected.y - lineSize / 2}px`;
        this.elSelectedLines.t.style.width = `${this.selected.width}px`;
        // line bottom
        this.elSelectedLines.b.style.translate = `${this.selected.x}px ${this.selected.y + this.selected.height - lineSize / 2}px`;
        this.elSelectedLines.b.style.width = `${this.selected.width}px`;
        // vector top left
        this.elSelectedVectors.tl.style.translate = `${this.selected.x - vectorOffset}px ${this.selected.y - vectorOffset}px`;
        // vector top rgiht
        this.elSelectedVectors.tr.style.translate = `${this.selected.x + this.selected.width - vectorOffset}px ${this.selected.y - vectorOffset}px`;
        // vector bottom left
        this.elSelectedVectors.bl.style.translate = `${this.selected.x - vectorOffset}px ${this.selected.y + this.selected.height - vectorOffset}px`;
        // vector bottom right
        this.elSelectedVectors.br.style.translate = `${this.selected.x + this.selected.width - vectorOffset}px ${this.selected.y + this.selected.height - vectorOffset}px`;
        // const references = /*html*/`
        // <div>
        // </div>
        // `
        // const parser = new DOMParser();
        // const newHTML = parser.parseFromString(references, 'text/html')
        // if (newHTML.body.firstChild === null) return
        // elWrapper.appendChild(newHTML.body.firstChild)
    }
    isSelectedItem(item, wrapper) {
        const item4Points = [
            {
                // top left
                x: item.x,
                y: item.y,
            },
            {
                // top right
                x: item.x + item.width,
                y: item.y,
            },
            {
                // bottom left
                x: item.x,
                y: item.y + item.height,
            },
            {
                // bottom right
                x: item.x + item.width,
                y: item.y + item.height,
            },
        ];
        // 判断 element 四个点任一点，在选框内就认为被选中
        // TODO: 优化：当鼠标点移入元素内部也会选中
        for (let r = 0; r < item4Points.length; r++) {
            const point = item4Points[r];
            if (this.isPointInRectangle(point, wrapper)) {
                return true;
            }
        }
        return false;
    }
    // 拖拽框选 显示 / 隐藏 选中拖拽框选参考线
    renderDragSelectReferenceLine(e, rootRect) {
        const root = this.shadowRoot;
        if (root === null)
            return;
        // 显示参考线元素
        const dragStyle = _window.getComputedStyle(this.rDrags);
        if (dragStyle.visibility !== "visible") {
            this.rDrags.style.visibility = "visible";
        }
        // 记录开始坐标位置
        if (dragBeginPos.x === -1) {
            dragBeginPos.x = e.clientX;
            dragBeginPos.y = e.clientY;
        }
        // 记录开始坐标位置
        const beginPos = {
            x: dragBeginPos.x,
            y: dragBeginPos.y,
        };
        const rectangle = {
            x: -1,
            y: -1,
            width: 0,
            height: 0,
        };
        // 根据初始点和移动点坐标位置，画框
        // 当鼠标点击后，向不同方向移动时，移动坐标值可能大于/小于初始值
        if (e.clientX > beginPos.x) {
            rectangle.x = beginPos.x - rootRect.x;
            rectangle.width = e.clientX - beginPos.x;
        }
        else {
            rectangle.x = e.clientX - rootRect.x;
            rectangle.width = beginPos.x - e.clientX;
        }
        if (e.clientY > beginPos.y) {
            rectangle.y = beginPos.y - rootRect.y;
            rectangle.height = e.clientY - beginPos.y;
        }
        else {
            rectangle.y = e.clientY - rootRect.y;
            rectangle.height = beginPos.y - e.clientY;
        }
        this.rDrags.style.translate = `${rectangle.x}px ${rectangle.y}px`;
        this.rDrags.style.width = `${rectangle.width}px`;
        this.rDrags.style.height = `${rectangle.height}px`;
        const slot = root.querySelector('slot');
        if (slot === null)
            return;
        // 根据移动画框判断选中项
        const registered = Object.values(cloneDeep(this.registered));
        for (let i = 0; i < registered.length; i++) {
            if (this.isSelectedItem(registered[i], rectangle)) {
                // 避免选中容器框
                if (registered[i].id === "main")
                    continue;
                // 选中
                if (this.selected.ids.indexOf(registered[i].id) === -1) {
                    this.selected.ids.push(registered[i].id);
                }
            }
            else {
                // 取消选中
                // 获取删除项的索引
                const idx = this.selected.ids.indexOf(registered[i].id);
                if (idx !== -1) {
                    this.selected.ids.splice(idx, 1);
                }
            }
        }
        if (this.selected.ids.length > 0) {
            // 显示选中框和顶点
            this.triggerSelectedLinesVectors("show");
        }
        else {
            // 隐藏选中框和顶点
            this.triggerSelectedLinesVectors("hide");
        }
        const detail = this.selected.ids.map((id) => {
            return {
                id,
                type: this.registered[id].type
            };
        });
        const customEvent = new CustomEvent("onSelect", {
            detail,
        });
        this.dispatchEvent(customEvent);
        // 更新选中元素组成后的参数
        this.getSelectedParams();
        this.renderSelectedReference();
    }
    /**
     * 判断某个点是否在矩形范围内
     */
    isPointInRectangle(point, rectangle) {
        if (point.x > rectangle.x &&
            point.x < rectangle.x + rectangle.width &&
            point.y > rectangle.y &&
            point.y < rectangle.y + rectangle.height) {
            return true;
        }
        return false;
    }
    handleClick() {
        const root = this.shadowRoot;
        if (root === null)
            return;
        // 全局点击：判断点击到了组件外部，执行 click out side
        // document.body.addEventListener("mousedown", (e: any) => {
        //   if (!this.contains(e.target)) {
        //     // click out side
        //     console.log('click out side')
        //     // 清空选中记录
        //     if (this.selected.ids.length > 0) {
        //       this.selected = cloneDeep(originSelected)
        //       // 关闭选中参考线
        //       this.renderSelectedReference()
        //     }
        //   }
        // })
        // 组件内点击
        root.addEventListener("mousedown", (e) => {
            e.preventDefault();
            const root = this.shadowRoot;
            if (root === null)
                return;
            // emit
            const customEvent = new CustomEvent('onMouseDown', {
                detail: {
                    ...this.selected
                },
            });
            this.dispatchEvent(customEvent);
            // this.isDoubleClick = false
            this.hasMoved = false;
            this.hasSelected = false;
            // 貌似和 _selected 重复了
            this.latestSelected = cloneDeep(this.selected);
            // 容器宽高
            const rootRect = this.getBoundingClientRect();
            const movingPos = {
                x: e.clientX - rootRect.x,
                y: e.clientY - rootRect.y
            };
            const elItem = e.target.closest('glide-dnr-item');
            let type = "";
            if (this.isToolbar) {
                // 隐藏测量距离选中外框
                this.elMeasureOutline.style.width = 0;
                this.elMeasureOutline.style.height = 0;
                this.elMeasureOutline.style.translate = "0px 0px";
                this.elMeasureOutline.style.visibility = "hidden";
                this.elMeasureOutline.style.pointerEvents = "none";
            }
            if (this.isActions) {
                this.elActions.style.visibility = "hidden";
                this.elActions.style.translate = "0px 0px";
                this.elActions.style.pointerEvents = "none";
                this.elActions.removeEventListener("click", this.delete);
            }
            // 点击了元素
            if (elItem) {
                this.mouseTarget = "elements";
                this.mouseDownElement(elItem);
            }
            else if (e.target.closest(".line")) {
                // 点击了参考线
                this.mouseTarget = "line";
                // left
                if (e.target.classList.contains("left")) {
                    type = "l";
                }
                else if (e.target.classList.contains("right")) {
                    // right
                    type = "r";
                }
                else if (e.target.classList.contains("top")) {
                    // top
                    type = "t";
                }
                else if (e.target.classList.contains("bottom")) {
                    // bottom
                    type = "b";
                }
            }
            else if (e.target.closest(".vector")) {
                // 点击了参考线
                this.mouseTarget = "vector";
                // top left
                if (e.target.classList.contains("top-left")) {
                    type = "tl";
                }
                else if (e.target.classList.contains("top-right")) {
                    // top right
                    type = "tr";
                }
                else if (e.target.classList.contains("bottom-left")) {
                    // bottom left
                    type = "bl";
                }
                else if (e.target.classList.contains("bottom-right")) {
                    // bottom right
                    type = "br";
                }
            }
            else if (e.target.closest(".actions-item")) {
                this.triggerActions();
            }
            else if (e.target.closest(".toolbar-item")) {
                // 水平：左对齐
                if (e.target.closest(".horizontal-left")) {
                    this.shortcuts('horizontal', 'begin');
                }
                // 水平：居中对齐
                if (e.target.closest(".horizontal-center")) {
                    this.shortcuts('horizontal', 'middle');
                }
                // 水平：右对齐
                if (e.target.closest(".horizontal-right")) {
                    this.shortcuts('horizontal', 'end');
                }
                // 水平：分散对齐
                if (e.target.closest(".horizontal-distribute")) {
                    this.shortcuts('horizontal', 'distribute');
                }
                // 垂直：上对齐
                if (e.target.closest(".vertical-top")) {
                    this.shortcuts('vertical', 'begin');
                }
                // 垂直：居中对齐
                if (e.target.closest(".vertical-center")) {
                    this.shortcuts('vertical', 'middle');
                }
                // 垂直：下对齐
                if (e.target.closest(".vertical-bottom")) {
                    this.shortcuts('vertical', 'end');
                }
                // 垂直：分散对齐
                if (e.target.closest(".vertical-distribute")) {
                    this.shortcuts('vertical', 'distribute');
                }
                // 测量距离
                if (e.target.closest(".measure")) {
                    this.shortcuts('', 'measure');
                }
            }
            else if (rootRect) {
                this.mouseTarget = "elements";
                // 点击了组件容器层
                this.isInSelected = this.isPointInRectangle(movingPos, this.selected);
                if (!this.isInSelected) {
                    // 清空选中记录
                    this.selected = cloneDeep(originSelected);
                    // 关闭选中参考线
                    this.renderSelectedReference();
                }
            }
            if (this.selected.ids.length > 0) {
                this.hasSelected = true;
            }
            // 鼠标点击到元素后的 offset
            const mouseElementOffsets = {
                x: Math.round(e.clientX - this.selected.x),
                y: Math.round(e.clientY - this.selected.y),
            };
            const mouseStartPos = {
                x: Math.round(e.clientX),
                y: Math.round(e.clientY)
            };
            const _selected = cloneDeep(this.selected);
            const _registered = cloneDeep(this.registered);
            // 宽 / 高比
            const ratio = _selected.width / _selected.height;
            document.onmousemove = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.mouseMoveType = "main";
                this.hasMoved = true;
                // 使用 requestAnimationFrame 减少更新频率
                if (this.requestAnimation) {
                    cancelAnimationFrame(this.requestAnimation);
                }
                this.requestAnimation = requestAnimationFrame(() => {
                    if (this.isToolbar) {
                        // 隐藏 toolbar
                        if (this.elToolbar.style.visibility !== "hidden") {
                            this.elToolbar.style.visibility = 'hidden';
                        }
                    }
                    const mousePos = {
                        x: Math.round(e.clientX),
                        y: Math.round(e.clientY)
                    };
                    switch (this.mouseTarget) {
                        case "elements":
                            // Begin 拖拽元素
                            if (this.hasSelected && this.isInSelected) {
                                // 移动选中元素
                                // 有选中元素 且 鼠标在选中范围内
                                this.moveElements({
                                    x: Math.round(e.clientX),
                                    y: Math.round(e.clientY),
                                }, mouseElementOffsets, _registered);
                                this.referenceAlignLinesVectors(_registered, _selected);
                            }
                            else {
                                // 框选操作
                                // 无选中元素，或者不在选中范围内
                                this.renderDragSelectReferenceLine(e, rootRect);
                            }
                            // End 拖拽元素
                            break;
                        case "line":
                            this.moveLines(type, _registered, _selected, mouseStartPos, mousePos);
                            break;
                        case "vector":
                            this.moveVectors(type, _registered, _selected, mouseStartPos, mousePos, ratio);
                            break;
                    }
                });
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                // 使用 requestAnimationFrame 减少更新频率
                if (this.requestAnimation) {
                    cancelAnimationFrame(this.requestAnimation);
                }
                // elItem, 
                this.mouseUpElement(_registered);
                // emit
                const customEvent = new CustomEvent('onMouseUp', {
                    detail: {
                        ...this.selected
                    },
                });
                this.dispatchEvent(customEvent);
            };
        });
    }
    getTranslatePos(translateString) {
        let x = -1;
        let y = -1;
        // 获得字符串上两个参数：x坐标px y坐标px
        if (translateString !== "none") {
            if (translateString.indexOf(" ") > -1) {
                const pos = translateString.split(" ");
                x = parseFloat(pos[0].replace("px", ""));
                y = parseFloat(pos[1].replace("px", ""));
            }
            else {
                // 获得字符串上 1 个参数：x坐标px
                x = parseFloat(translateString.replace("px", ""));
            }
        }
        return { x, y };
    }
    mouseDownElement(elItem) {
        // 加入选中组件
        if (this.selected.ids.indexOf(elItem.id) === -1) {
            // 未按 ctrl 单选
            this.selected.ids = [elItem.id];
            const detail = this.selected.ids.map((id) => {
                return {
                    id,
                    type: this.registered[id].type
                };
            });
            const customEvent = new CustomEvent('onSelect', {
                detail,
            });
            this.dispatchEvent(customEvent);
            // TODO: 按住了 ctrl 多选
            // 更新选中元素组成后的参数
            this.getSelectedParams();
            this.renderSelectedReference();
        }
        this.isInSelected = true;
        // 识别鼠标双击
        if (this.lastClickTime === -1) {
            this.lastClickTime = (new Date).getTime();
        }
        else {
            const gap = (new Date).getTime() - this.lastClickTime;
            if (gap > 175) {
                this.lastClickTime = (new Date).getTime();
            }
            else {
                // 两次点击时间间隔小于 175 毫秒
                // this.isDoubleClick = true
                this.lastClickTime = -1;
                // 加入选中组件
                if (this.selected.ids.indexOf(elItem.id) > -1) {
                    // 未按 ctrl 单选
                    this.selected.ids = [elItem.id];
                    const detail = this.selected.ids.map((id) => {
                        return {
                            id,
                            type: this.registered[id].type
                        };
                    });
                    const customEvent = new CustomEvent('onSelect', {
                        detail,
                    });
                    this.dispatchEvent(customEvent);
                    // TODO: 按住了 ctrl 多选
                    // 更新选中元素组成后的参数
                    this.getSelectedParams();
                    this.renderSelectedReference();
                }
            }
        }
    }
    // elItem: HTMLDivElement, 
    mouseUpElement(_registered) {
        // 移动过元素后,清空点击时间,恢复鼠标双击初始状态
        if (this.hasMoved) {
            this.lastClickTime = -1;
            // Begin 拖拽元素结束后
            // 隐藏拖拽选中参考线元素
            dragBeginPos = { x: -1, y: -1 };
            this.rDrags.style.visibility = "hidden";
            this.rDrags.style.translate = `-1px -1px`;
            this.rDrags.style.width = "0";
            this.rDrags.style.height = "0";
            // 更新选中元素的 x, y，对齐 moveElements() 过程中更新值
            if (this.mouseTarget === 'elements') {
                for (let id of this.selected.ids) {
                    this.registered[id].x = _registered[id].x;
                    this.registered[id].y = _registered[id].y;
                }
            }
            if (this.mouseTarget === 'line' || this.mouseTarget === 'vector') {
                this.registered = cloneDeep(_registered);
                this.getSelectedParams();
            }
            // End 拖拽元素结束后
            // 移除已添加的点
            const elVectors = this.shadowRoot?.querySelectorAll(`.align-vector`);
            if (elVectors !== undefined) {
                // 遍历找到的所有元素，并逐个从 DOM 中移除
                elVectors.forEach(el => {
                    el.remove();
                });
            }
            // 移除已添加的线
            const elLines = this.shadowRoot?.querySelectorAll(`.align-line`);
            if (elLines !== undefined) {
                // 遍历找到的所有元素，并逐个从 DOM 中移除
                elLines.forEach(el => {
                    el.remove();
                });
            }
        }
        // 如果有选中项超过 2 个，就显示快捷操作菜单
        if (this.selected.ids.length > 0) {
            if (this.isToolbar && !(this.selected.ids.length === 1 && !this.isMeasure)) {
                if (this.selected.ids.length > 1) {
                    if (this.elAligns.style.display !== "inline-flex") {
                        this.elAligns.style.display = "inline-flex";
                    }
                }
                else {
                    if (this.elAligns.style.display !== "none") {
                        this.elAligns.style.display = "none";
                    }
                }
                if (this.isMeasure) {
                    if (this.elMeasure.style.display !== "inline-flex") {
                        this.elMeasure.style.display = "inline-flex";
                    }
                }
                if (this.toolbarPlacement === 'float') {
                    this.setToolbarPosition();
                }
                if (this.elToolbar.style.visibility !== "visible") {
                    this.elToolbar.style.visibility = "visible";
                }
            }
            // 恢复显示移动中隐藏的选中框和顶点
            this.triggerSelectedLinesVectors("show");
        }
        else {
            if (this.isToolbar && !(this.selected.ids.length === 1 && !this.isMeasure)) {
                if (this.elAligns.style.display !== "none") {
                    this.elAligns.style.display = "none";
                }
                if (this.isMeasure) {
                    if (this.elMeasure.style.display !== "none") {
                        this.elMeasure.style.display = "none";
                    }
                }
                if (this.elToolbar.style.visibility !== "hidden") {
                    this.elToolbar.style.visibility = "hidden";
                }
            }
            // 隐藏选中框和顶点
            this.triggerSelectedLinesVectors("hide");
            const customEvent = new CustomEvent("onSelect", {
                detail: {},
            });
            this.dispatchEvent(customEvent);
        }
        this.mouseMoveType = "";
        if (this.isActions) {
            this.triggerActions();
        }
    }
    setToolbarPosition() {
        const elToolbarStyle = window.getComputedStyle(this.elToolbar);
        const elToobarWidth = parseFloat(elToolbarStyle.width.replace("px", ""));
        // 快捷操作区：宽度:290、高度：34(向上移动 8 个px = 40)
        this.elToolbar.style.translate = `${this.selected.x + this.selected.width / 2 - elToobarWidth / 2}px ${this.selected.y - 42}px`;
    }
    triggerActions() {
        if (this.selected.ids.length > 0) {
            this.elActions.style.translate = `${this.selected.x + this.selected.width + 6}px ${this.selected.y}px`;
            this.elActions.style.visibility = "visible";
            this.elActions.style.pointerEvents = "auto";
            this.elActions.addEventListener("click", this.delete);
        }
        else {
            this.elActions.style.translate = "0px 0px";
            this.elActions.style.pointerEvents = "none";
            this.elActions.style.visibility = "hidden";
            this.elActions.removeEventListener("click", this.delete);
        }
    }
    /**
     * 移动选中的元素、参考线和顶点
     */
    moveElements(movingPos, offsets, _registered) {
        // 正常的移动偏移参数
        const mouseXOffset = movingPos.x - offsets.x;
        const mouseYOffset = movingPos.y - offsets.y;
        // Begin 判断元素是否移到了容器边沿，控制不超过边沿
        // 选中项右边 x 值
        const selectX = mouseXOffset + this.selected.width;
        // 选中项下边 y 值
        const selectY = mouseYOffset + this.selected.height;
        // 容器右边 x 值
        const mainX = this.registered.main.x + this.registered.main.width;
        // 容器下边 y 值
        const mainY = this.registered.main.x + this.registered.main.height;
        this.selected.x = mouseXOffset;
        this.selected.y = mouseYOffset;
        if (mouseXOffset <= 0) {
            this.selected.x = 0;
        }
        if (selectX >= mainX) {
            this.selected.x = mainX - this.selected.width;
        }
        if (mouseYOffset <= 0) {
            this.selected.y = 0;
        }
        if (selectY >= mainY) {
            this.selected.y = mainY - this.selected.height;
        }
        // End 判断元素是否移到了容器边沿，控制不超过边沿
        // 移动时隐藏选中线和顶点
        this.triggerSelectedLinesVectors("hide");
        // 移动线
        this.elSelectedLines.l.style.translate = `${this.selected.x - lineSize / 2}px ${this.selected.y}px`;
        this.elSelectedLines.r.style.translate = `${this.selected.x + this.selected.width - lineSize / 2}px ${this.selected.y}px`;
        this.elSelectedLines.t.style.translate = `${this.selected.x}px ${this.selected.y - lineSize / 2}px`;
        this.elSelectedLines.b.style.translate = `${this.selected.x}px ${this.selected.y + this.selected.height - lineSize / 2}px`;
        // 移动顶点
        // 移动时隐藏显示
        this.elSelectedVectors.tl.style.translate = `${this.selected.x - vectorOffset}px ${this.selected.y - vectorOffset}px`;
        this.elSelectedVectors.tr.style.translate = `${this.selected.x + this.selected.width - vectorOffset}px ${this.selected.y - vectorOffset}px`;
        this.elSelectedVectors.bl.style.translate = `${this.selected.x - vectorOffset}px ${this.selected.y + this.selected.height - vectorOffset}px`;
        this.elSelectedVectors.br.style.translate = `${this.selected.x + this.selected.width - vectorOffset}px ${this.selected.y + this.selected.height - vectorOffset}px`;
        // 移动内部元素
        for (let id of this.selected.ids) {
            if (this.selected.ids.length === 1) {
                _registered[id].x = this.selected.x;
                _registered[id].y = this.selected.y;
            }
            else {
                _registered[id].x = this.registered[id].x - this.latestSelected.x + this.selected.x;
                _registered[id].y = this.registered[id].y - this.latestSelected.y + this.selected.y;
            }
            // 当 translate y 为空时，就只有 x 值
            _registered[id].el.style.translate = `${_registered[id].x}px ${_registered[id].y}px`;
            // emit
            const customEvent = new CustomEvent('onChange', {
                detail: {
                    id,
                    type: "drag",
                    x: _registered[id].x,
                    y: _registered[id].y,
                    width: _registered[id].width,
                    height: _registered[id].height,
                },
            });
            this.dispatchEvent(customEvent);
        }
    }
    moveLines(type, _registered, _selected, mouseStartPos, mousePos) {
        let x = 0;
        let y = 0;
        let newWidth = 0;
        let newHeight = 0;
        y = mousePos.y - (mousePos.y - _selected.y);
        const deltaX = mousePos.x - mouseStartPos.x;
        const deltaY = mousePos.y - mouseStartPos.y;
        const rateX = deltaX / _selected.width;
        const rateY = deltaY / _selected.height;
        switch (type) {
            case "l":
                x = _selected.x + deltaX;
                newWidth = _selected.x - x + _selected.width;
                // 线：左
                this.elSelectedLines.l.style.translate = `${x - 2.5}px ${y}px`;
                // 线：上
                this.elSelectedLines.t.style.width = `${newWidth}px`;
                this.elSelectedLines.t.style.translate = `${x - 2.5}px ${y - 2.5}px`;
                // 线：下
                this.elSelectedLines.b.style.width = `${newWidth}px`;
                this.elSelectedLines.b.style.translate = `${x - 2.5}px ${y + _selected.height - 2.5}px`;
                // 顶点: 上左
                this.elSelectedVectors.tl.style.translate = `${x - 4}px ${y - vectorOffset}px`;
                // 顶点：下左
                this.elSelectedVectors.bl.style.translate = `${x - 4}px ${y + _selected.height - vectorOffset}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elWidth = el.width * (1 - rateX);
                    const elX = el.x + deltaX * (1 - (el.x - _selected.x) / _selected.width);
                    _registered[id].x = elX;
                    _registered[id].width = elWidth;
                    el.el.style.width = `${elWidth}px`;
                    el.el.style.translate = `${elX}px ${el.y}px`;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_left",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
            case "r":
                x = _selected.x + _selected.width;
                // 鼠标往左超过左边点（控制不超过左边点）
                if (x <= _selected.x) {
                    x = _selected.x;
                }
                newWidth = _selected.width + deltaX;
                // 鼠标超过左边点（控制不能小于 0）
                if (newWidth < 0) {
                    newWidth = 0;
                }
                // 批量更新样式以减少重排
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + _selected.width + deltaX - 2.5}px ${y}px`;
                // 边：上
                this.elSelectedLines.t.style.translate = `${_selected.x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.t.style.width = `${newWidth}px`;
                // 边：下
                this.elSelectedLines.b.style.translate = `${_selected.x - 2.5}px ${_selected.y + _selected.height - 2.5}px`;
                this.elSelectedLines.b.style.width = `${newWidth}px`;
                // 顶点：上右
                this.elSelectedVectors.tr.style.translate = `${_selected.x + _selected.width + deltaX - 3.5}px ${_selected.y - 3.5}px`;
                // 顶点：下右
                this.elSelectedVectors.br.style.translate = `${_selected.x + _selected.width + deltaX - 3.5}px ${_selected.y + _selected.height - 3.5}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elWidth = el.width * (1 + rateX);
                    const elX = el.x + deltaX * ((el.x - _selected.x) / _selected.width);
                    _registered[id].width = elWidth;
                    _registered[id].x = elX;
                    el.el.style.width = `${elWidth}px`;
                    el.el.style.translate = `${elX}px ${el.y}px`;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_right",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
            case "t":
                x = _selected.x;
                y = _selected.y + deltaY;
                let newHeihgt = _selected.height - deltaY;
                // 鼠标往上超过上边点（控制不超过下边点）
                if (y >= _selected.y + _selected.height) {
                    y = _selected.y + _selected.height;
                }
                // 鼠标超过上边点（控制不能小于 0）
                if (newHeight <= 0) {
                    newHeight = 0;
                }
                // 边:上
                this.elSelectedLines.t.style.translate = `${x - 2.5}px ${y - 2.5}px`;
                // 边：左
                this.elSelectedLines.l.style.translate = `${x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.l.style.height = `${newHeihgt}px`;
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + _selected.width - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.r.style.height = `${newHeihgt}px`;
                // 顶点（右上、右下）
                this.elSelectedVectors.tl.style.translate = `${x - 3.5}px ${y - 3.5}px`;
                this.elSelectedVectors.tr.style.translate = `${_selected.x + _selected.width - 3.5}px ${y - 3.5}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elHeight = el.height * (1 - rateY);
                    const elY = el.y + deltaY * (1 - (el.y - _selected.y) / _selected.height);
                    el.el.style.height = `${elHeight}px`;
                    el.el.style.translate = `${el.x}px ${elY}px`;
                    _registered[id].y = elY;
                    _registered[id].height = elHeight;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_top",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
            case "b":
                y = _selected.y + _selected.height;
                // 鼠标往左超过左边点（控制不超过左边点）
                if (y <= _selected.y) {
                    y = _selected.y;
                }
                newHeight = _selected.height + deltaY;
                // 鼠标超过左边点（控制不能小于 0）
                if (newHeight < 0) {
                    newHeight = 0;
                }
                // 边：上
                this.elSelectedLines.t.style.translate = `${_selected.x - 2.5}px ${_selected.y - 2.5}px`;
                // 边：左
                this.elSelectedLines.l.style.translate = `${_selected.x - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.l.style.height = `${newHeight}px`;
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + _selected.width - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.r.style.height = `${newHeight}px`;
                // 边：下
                this.elSelectedLines.b.style.translate = `${_selected.x}px ${y + deltaY - 2.5}px`;
                // 顶点：下左
                this.elSelectedVectors.bl.style.translate = `${_selected.x - 3.5}px ${y + deltaY - 3.5}px`;
                // 顶点：下右
                this.elSelectedVectors.br.style.translate = `${_selected.x + _selected.width - 3.5}px ${y + deltaY - 3.5}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elHeight = el.height * (1 + rateY);
                    const elY = el.y + deltaY * ((el.y - _selected.y) / _selected.height);
                    _registered[id].height = elHeight;
                    _registered[id].y = elY;
                    el.el.style.height = `${elHeight}px`;
                    el.el.style.translate = `${el.x}px ${elY}px`;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_bottom",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
        }
    }
    moveVectors(type, _registered, _selected, mouseStartPos, mousePos, ratio) {
        let x = 0;
        let y = 0;
        const deltaX = mousePos.x - mouseStartPos.x;
        const deltaY = deltaX / ratio;
        const rate = deltaX / _selected.width;
        let newWidth = 0;
        switch (type) {
            case "tl":
                // 顶点 上左
                x = _selected.x + deltaX;
                y = _selected.y + deltaY;
                this.elSelectedVectors.tl.style.translate = `${x - 3.5}px ${y - 3.5}px`;
                // 顶点：上右
                this.elSelectedVectors.tr.style.translate = `${_selected.x + _selected.width - 3.5}px ${y - 3.5}px`;
                // 顶点：左下
                this.elSelectedVectors.bl.style.translate = `${x - 3.5}px ${_selected.y + _selected.height - 3.5}px`;
                // 边:上
                this.elSelectedLines.t.style.translate = `${x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.t.style.width = `${_selected.width - deltaX}px`;
                // 边：下
                this.elSelectedLines.b.style.translate = `${x - 2.5}px ${_selected.y + _selected.height - 2.5}px`;
                this.elSelectedLines.b.style.width = `${_selected.width - deltaX}px`;
                // 边：左
                this.elSelectedLines.l.style.translate = `${x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.l.style.height = `${_selected.height - deltaY}px`;
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + _selected.width - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.r.style.height = `${_selected.height - deltaY}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elWidth = el.width * (1 - rate);
                    const elX = el.x + deltaX * (1 - (el.x - _selected.x) / _selected.width);
                    const elHeight = el.height * (1 - rate);
                    const elY = el.y + deltaY * (1 - (el.y - _selected.y) / _selected.height);
                    // 改变内部元素位置宽高
                    el.el.style.translate = `${elX}px ${elY}px`;
                    el.el.style.width = `${elWidth}px`;
                    el.el.style.height = `${elHeight}px`;
                    // 更新 registerd
                    _registered[id].x = elX;
                    _registered[id].width = elWidth;
                    _registered[id].y = elY;
                    _registered[id].height = elHeight;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_top-left",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
            case "tr":
                // 顶点 上右
                newWidth = _selected.width + deltaX;
                x = _selected.x + newWidth;
                y = _selected.y - deltaY;
                // 顶点：上右
                this.elSelectedVectors.tr.style.translate = `${x - 3.5}px ${y - 3.5}px`;
                // 顶点：上左
                this.elSelectedVectors.tl.style.translate = `${_selected.x - 3.5}px ${y - 3.5}px`;
                // 顶点：下右
                this.elSelectedVectors.br.style.translate = `${x - 3.5}px ${_selected.y + _selected.height - 3.5}px`;
                // 边:上
                this.elSelectedLines.t.style.translate = `${_selected.x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.t.style.width = `${newWidth}px`;
                // 边：下
                this.elSelectedLines.b.style.translate = `${_selected.x - 2.5}px ${_selected.y + _selected.height - 2.5}px`;
                this.elSelectedLines.b.style.width = `${newWidth}px`;
                // 边：左
                this.elSelectedLines.l.style.translate = `${_selected.x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.l.style.height = `${_selected.height + deltaY}px`;
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + newWidth - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.r.style.height = `${_selected.height + deltaY}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elWidth = el.width * (1 + rate);
                    const elX = el.x + deltaX * ((el.x - _selected.x) / _selected.width);
                    const elHeight = el.height * (1 + rate);
                    const elY = el.y - deltaY * (1 - (el.y - _selected.y) / _selected.height);
                    // 改变内部元素位置宽高
                    el.el.style.translate = `${elX}px ${elY}px`;
                    el.el.style.width = `${elWidth}px`;
                    el.el.style.height = `${elHeight}px`;
                    // 更新 registerd
                    _registered[id].x = elX;
                    _registered[id].width = elWidth;
                    _registered[id].y = elY;
                    _registered[id].height = elHeight;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_top-right",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
            case "bl":
                // 顶点 上左
                x = _selected.x + deltaX;
                y = _selected.y + _selected.height - deltaY;
                this.elSelectedVectors.bl.style.translate = `${x - 3.5}px ${y - 3.5}px`;
                // 顶点：上左
                this.elSelectedVectors.tl.style.translate = `${x - 3.5}px ${_selected.y - 3.5}px`;
                // 顶点：下右
                this.elSelectedVectors.br.style.translate = `${_selected.x + _selected.width - 3.5}px ${y - 3.5}px`;
                // 边:上
                this.elSelectedLines.t.style.translate = `${x - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.t.style.width = `${_selected.width - deltaX}px`;
                // 边：下
                this.elSelectedLines.b.style.translate = `${x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.b.style.width = `${_selected.width - deltaX}px`;
                // 边：左
                this.elSelectedLines.l.style.translate = `${x - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.l.style.height = `${_selected.height - deltaY}px`;
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + _selected.width - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.r.style.height = `${_selected.height - deltaY}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elWidth = el.width * (1 - rate);
                    const elX = el.x + deltaX * (1 - (el.x - _selected.x) / _selected.width);
                    const elHeight = el.height * (1 - rate);
                    const elY = el.y + deltaY * ((_selected.y - el.y) / _selected.height);
                    // 改变内部元素位置宽高
                    el.el.style.translate = `${elX}px ${elY}px`;
                    el.el.style.width = `${elWidth}px`;
                    el.el.style.height = `${elHeight}px`;
                    // 更新 registerd
                    _registered[id].x = elX;
                    _registered[id].width = elWidth;
                    _registered[id].y = elY;
                    _registered[id].height = elHeight;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_bottom-left",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
            case "br":
                newWidth = _selected.width + deltaX;
                x = _selected.x + newWidth;
                y = _selected.y + _selected.height + deltaY;
                // 顶点：下右
                this.elSelectedVectors.br.style.translate = `${x - 3.5}px ${y - 3.5}px`;
                // 顶点：上右
                this.elSelectedVectors.tr.style.translate = `${_selected.x + _selected.width + deltaX - 3.5}px ${_selected.y - 3.5}px`;
                // 顶点：下左
                this.elSelectedVectors.bl.style.translate = `${_selected.x - 3.5}px ${y - 3.5}px`;
                // 边:上
                this.elSelectedLines.t.style.translate = `${_selected.x - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.t.style.width = `${newWidth}px`;
                // 边：下
                this.elSelectedLines.b.style.translate = `${_selected.x - 2.5}px ${y - 2.5}px`;
                this.elSelectedLines.b.style.width = `${newWidth}px`;
                // 边：左
                this.elSelectedLines.l.style.translate = `${_selected.x - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.l.style.height = `${_selected.height + deltaY}px`;
                // 边：右
                this.elSelectedLines.r.style.translate = `${_selected.x + newWidth - 2.5}px ${_selected.y - 2.5}px`;
                this.elSelectedLines.r.style.height = `${_selected.height + deltaY}px`;
                // 内部元素
                for (const id of _selected.ids) {
                    const el = this.registered[id];
                    const elWidth = el.width * (1 + rate);
                    const elX = el.x + deltaX * ((el.x - _selected.x) / _selected.width);
                    const elHeight = el.height * (1 + rate);
                    const elY = el.y + deltaY * ((el.y - _selected.y) / _selected.height);
                    // 改变内部元素位置宽高
                    el.el.style.translate = `${elX}px ${elY}px`;
                    el.el.style.width = `${elWidth}px`;
                    el.el.style.height = `${elHeight}px`;
                    // 更新 registerd
                    _registered[id].x = elX;
                    _registered[id].width = elWidth;
                    _registered[id].y = elY;
                    _registered[id].height = elHeight;
                    // emit
                    const customEvent = new CustomEvent('onChange', {
                        detail: {
                            id,
                            type: "resize_bottom-right",
                            x: _registered[id].x,
                            y: _registered[id].y,
                            width: _registered[id].width,
                            height: _registered[id].height,
                        },
                    });
                    this.dispatchEvent(customEvent);
                }
                break;
        }
    }
    /**
     * 对齐吸附、参考线和点
     *
     * 思路：
     * 第 1 步：通过对比选中拖拽选中元素组成矩形的 6 条边（左中右 |||、上中下 三），与所有未选中的元素对应的 6 条边，及容器框对应的 6 条边距离，是否小于等于某个阈值（0px，或 3px），获取参与对齐的元素；
     * 第 2 步：根据参与对齐的位置，获取要对齐的边长/宽，及靠近对齐边元素的顶点参数；
     * 第 3 步：渲染对齐边与顶点
     * 第 4 步：根据吸附阈值，移动选中矩形、顶点及内部元素的位置
     *
     */
    referenceAlignLinesVectors(_registered, _selected) {
        let outterPosition = "";
        let position;
        // 遍历所有注册元素
        for (let r in _registered) {
            // 跳过已选中的元素
            if (this.selected.ids.indexOf(r) > -1)
                continue;
            let gapH = { x: 0, y: 0 };
            position = "";
            if (Math.abs(this.selected.x + this.selected.width - _registered[r].x) <= this.thresholdHorizontal) {
                // 1. 选中【右】vs 所有【左】
                position = "end";
                gapH.x = this.selected.x + this.selected.width - _registered[r].x;
            }
            else if (Math.abs(this.selected.x + this.selected.width - (_registered[r].x + _registered[r].width / 2)) <= this.thresholdHorizontal) {
                // 2. 选中【右】vs 所有【中】
                position = "end";
                gapH.x = this.selected.x + this.selected.width - (_registered[r].x + _registered[r].width / 2);
            }
            else if (Math.abs(this.selected.x + this.selected.width - (_registered[r].x + _registered[r].width)) <= this.thresholdHorizontal) {
                // 3. 选中【右】vs 所有【右】
                position = "end";
                gapH.x = this.selected.x + this.selected.width - (_registered[r].x + _registered[r].width);
            }
            else if (Math.abs(this.selected.x + this.selected.width / 2 - _registered[r].x) <= this.thresholdHorizontal) {
                // 4. 选中【中】vs 所有【左】
                position = "middle";
                gapH.x = this.selected.x + this.selected.width / 2 - _registered[r].x;
            }
            else if (Math.abs(this.selected.x + this.selected.width / 2 - (_registered[r].x + _registered[r].width / 2)) <= this.thresholdHorizontal) {
                // 5. 选中【中】vs 所有【中】
                position = "middle";
                gapH.x = this.selected.x + this.selected.width / 2 - (_registered[r].x + _registered[r].width / 2);
            }
            else if (Math.abs(this.selected.x + this.selected.width / 2 - (_registered[r].x + _registered[r].width)) <= this.thresholdHorizontal) {
                // 6. 选中【中】vs 所有【右】
                position = "middle";
                gapH.x = this.selected.x + this.selected.width / 2 - (_registered[r].x + _registered[r].width);
            }
            else if (Math.abs(this.selected.x - _registered[r].x) <= this.thresholdHorizontal) {
                // 7. 选中【左】vs 所有【左】
                position = "begin";
                gapH.x = this.selected.x - _registered[r].x;
            }
            else if (Math.abs(this.selected.x - (_registered[r].x + _registered[r].width / 2)) <= this.thresholdHorizontal) {
                // 8. 选中【左】vs 所有【中】
                position = "begin";
                gapH.x = this.selected.x - (_registered[r].x + _registered[r].width / 2);
            }
            else if (Math.abs(this.selected.x - (_registered[r].x + _registered[r].width)) <= this.thresholdHorizontal) {
                // 9. 选中【左】vs 所有【右】
                position = "begin";
                gapH.x = this.selected.x - (_registered[r].x + _registered[r].width);
            }
            // 执行吸附
            if (position !== "") {
                outterPosition = position;
                this.snap("horizontal", gapH, _registered);
                setTimeout(() => {
                    this.thresholdHorizontal = 2;
                }, 200);
            }
            else {
                if (this.thresholdHorizontal === 2) {
                    this.thresholdHorizontal = 5;
                }
            }
        }
        // 移除已添加的顶点
        const elVectorsH = this.shadowRoot?.querySelectorAll(`.align-vector-horizontal`);
        if (elVectorsH !== undefined) {
            // 遍历找到的所有元素，并逐个从 DOM 中移除
            elVectorsH.forEach(el => {
                el.remove();
            });
        }
        // 移除已添加的线
        const elLinesH = this.shadowRoot?.querySelectorAll(`.align-line-horizontal`);
        if (elLinesH !== undefined) {
            // 遍历找到的所有元素，并逐个从 DOM 中移除
            elLinesH.forEach(el => {
                el.remove();
            });
        }
        // 渲染对齐线上的点
        if (outterPosition !== "") {
            this.triggerAlignVectors("horizontal", outterPosition, _registered);
            // 渲染对齐线上的点
            this.triggerAlignLines(_registered);
        }
        outterPosition = "";
        for (let r in _registered) {
            // 跳过已选中的元素
            if (this.selected.ids.indexOf(r) > -1)
                continue;
            let gapV = { x: 0, y: 0 };
            position = "";
            // 1. 选中【下】vs 所有【上】
            if (Math.abs(this.selected.y + this.selected.height - _registered[r].y) <= this.thresholdVertical) {
                position = "end";
                gapV.y = this.selected.y + this.selected.height - _registered[r].y;
            }
            else if (Math.abs(this.selected.y + this.selected.height - (_registered[r].y + _registered[r].height / 2)) <= this.thresholdVertical) {
                // 2. 选中【下】vs 所有【中】
                position = "end";
                gapV.y = this.selected.y + this.selected.height - (_registered[r].y + _registered[r].height / 2);
            }
            else if (Math.abs(this.selected.y + this.selected.height - (_registered[r].y + _registered[r].height)) <= this.thresholdVertical) {
                // 3. 选中【下】vs 所有【下】
                position = "end";
                gapV.y = this.selected.y + this.selected.height - (_registered[r].y + _registered[r].height);
            }
            else if (Math.abs(this.selected.y + this.selected.height / 2 - _registered[r].y) <= this.thresholdVertical) {
                // 4. 选中【中】vs 所有【上】
                position = "middle";
                gapV.y = this.selected.y + this.selected.height / 2 - _registered[r].y;
            }
            else if (Math.abs(this.selected.y + this.selected.height / 2 - (_registered[r].y + _registered[r].height / 2)) <= this.thresholdVertical) {
                // 5. 选中【中】vs 所有【中】
                position = "middle";
                gapV.y = this.selected.y + this.selected.height / 2 - (_registered[r].y + _registered[r].height / 2);
            }
            else if (Math.abs(this.selected.y + this.selected.height / 2 - (_registered[r].y + _registered[r].height)) <= this.thresholdVertical) {
                // 6. 选中【中】vs 所有【下】
                position = "middle";
                gapV.y = this.selected.y + this.selected.height / 2 - (_registered[r].y + _registered[r].height);
            }
            else if (Math.abs(this.selected.y - (_registered[r].y + _registered[r].height)) <= this.thresholdVertical) {
                // 7. 选中【上】vs 所有【下】
                position = "begin";
                gapV.y = this.selected.y - (_registered[r].y + _registered[r].height);
            }
            else if (Math.abs(this.selected.y - (_registered[r].y + _registered[r].height / 2)) <= this.thresholdVertical) {
                // 8. 选中【上】vs 所有【中】
                position = "begin";
                gapV.y = this.selected.y - (_registered[r].y + _registered[r].height / 2);
            }
            else if (Math.abs(this.selected.y - _registered[r].y) <= this.thresholdVertical) {
                // 9. 选中【上】vs 所有【上】
                position = "begin";
                gapV.y = this.selected.y - _registered[r].y;
            }
            if (position !== "") {
                outterPosition = position;
                this.snap("vertical", gapV, _registered);
                setTimeout(() => {
                    this.thresholdHorizontal = 2;
                }, 200);
            }
            else {
                if (this.thresholdVertical === 2) {
                    this.thresholdVertical = 5;
                }
            }
        }
        // 移除已添加的顶点
        const elVectors = this.shadowRoot?.querySelectorAll(`.align-vector-vertical`);
        if (elVectors !== undefined) {
            // 遍历找到的所有元素，并逐个从 DOM 中移除
            elVectors.forEach(el => {
                el.remove();
            });
        }
        // 移除已添加的线
        const elLines = this.shadowRoot?.querySelectorAll(`.align-line-vertical`);
        if (elLines !== undefined) {
            // 遍历找到的所有元素，并逐个从 DOM 中移除
            elLines.forEach(el => {
                el.remove();
            });
        }
        // 渲染对齐线上的点
        if (outterPosition !== "") {
            this.triggerAlignVectors("vertical", outterPosition, _registered);
            // 渲染对齐线上的点
            this.triggerAlignLines(_registered);
        }
    }
    // 吸附移动选中框及其内部元素
    /**
     *
     * @param direction
     * @param position 拖拽中，选中项的：左中右或上中下
     * @param _registered
     * @returns
     */
    snap(direction, gap, _registered) {
        let rPos = { x: 0, y: 0 };
        if (direction === "horizontal") {
            this.selected.x = this.selected.x - gap.x;
            // 移动内部元素
            for (const id of this.selected.ids) {
                const elPos = this.getElementTranslatePos(_registered[id].el);
                const elX = elPos.x - gap.x;
                const elY = elPos.y;
                _registered[id].el.style.translate = `${elX}px ${elY}px`;
                _registered[id].x = elX;
            }
            // 移动选中框四边
            // 选中框：上边
            rPos = this.getElementTranslatePos(this.elSelectedLines.t);
            this.elSelectedLines.t.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 选中框：下边
            rPos = this.getElementTranslatePos(this.elSelectedLines.b);
            this.elSelectedLines.b.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 选中框：左边
            rPos = this.getElementTranslatePos(this.elSelectedLines.l);
            this.elSelectedLines.l.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 选中框：右边
            rPos = this.getElementTranslatePos(this.elSelectedLines.r);
            this.elSelectedLines.r.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 移动选中框四个顶点
            // 顶点：上左
            rPos = this.getElementTranslatePos(this.elSelectedVectors.tl);
            this.elSelectedVectors.tl.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 顶点：上右
            rPos = this.getElementTranslatePos(this.elSelectedVectors.tr);
            this.elSelectedVectors.tr.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 顶点：下左
            rPos = this.getElementTranslatePos(this.elSelectedVectors.bl);
            this.elSelectedVectors.bl.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
            // 顶点：下右
            rPos = this.getElementTranslatePos(this.elSelectedVectors.br);
            this.elSelectedVectors.br.style.translate = `${rPos.x - gap.x}px ${rPos.y}px`;
        }
        else {
            this.selected.y = this.selected.y - gap.y;
            // 移动内部元素
            for (const id of this.selected.ids) {
                const elPos = this.getElementTranslatePos(_registered[id].el);
                const elX = elPos.x;
                const elY = elPos.y - gap.y;
                _registered[id].el.style.translate = `${elX}px ${elY}px`;
                _registered[id].y = elY;
            }
            // 移动选中框四边
            // 选中框：上边
            rPos = this.getElementTranslatePos(this.elSelectedLines.t);
            this.elSelectedLines.t.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 选中框：下边
            rPos = this.getElementTranslatePos(this.elSelectedLines.b);
            this.elSelectedLines.b.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 选中框：左边
            rPos = this.getElementTranslatePos(this.elSelectedLines.l);
            this.elSelectedLines.l.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 选中框：右边
            rPos = this.getElementTranslatePos(this.elSelectedLines.r);
            this.elSelectedLines.r.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 移动选中框四个顶点
            // 顶点：上左
            rPos = this.getElementTranslatePos(this.elSelectedVectors.tl);
            this.elSelectedVectors.tl.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 顶点：上右
            rPos = this.getElementTranslatePos(this.elSelectedVectors.tr);
            this.elSelectedVectors.tr.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 顶点：下左
            rPos = this.getElementTranslatePos(this.elSelectedVectors.bl);
            this.elSelectedVectors.bl.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
            // 顶点：下右
            rPos = this.getElementTranslatePos(this.elSelectedVectors.br);
            this.elSelectedVectors.br.style.translate = `${rPos.x}px ${rPos.y - gap.y}px`;
        }
    }
    getElementTranslatePos(el) {
        let pos = {
            x: 0,
            y: 0
        };
        // 当 translate y 为空时，就只有 x 值，所以区分处理
        if (el.style.translate.indexOf(" ") > -1) {
            const elPos = el.style.translate.split(" ");
            pos.x = parseFloat(elPos[0].replace("px", ""));
            pos.y = parseFloat(elPos[1].replace("px", ""));
        }
        else {
            pos.x = parseFloat(el.style.translate);
        }
        return pos;
    }
    generateAlignVector(direction, position, pos) {
        // 生成参考线上的点
        const el = document.createElement("div");
        el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
      fill="${colors.red}" 
      viewBox="0 0 24 24" 
      stroke-width="1.5" 
      stroke="currentColor" 
      class="size-6" 
      width="${vectorSize * 2}" 
      width="${vectorSize * 2}"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`;
        el.classList.add(`align-vector`);
        el.classList.add(`align-vector-${direction}`);
        el.classList.add(`align-vector-${direction}-${position}`);
        el.style.position = "absolute";
        el.style.left = `${pos.x}px`;
        el.style.top = `${pos.y}px`;
        this.shadowRoot?.querySelector(".container")?.appendChild(el);
    }
    triggerAlignVectors(direction, position, _registered) {
        let hasVectors = {
            hBegin: false,
            hMiddle: false,
            hEnd: false,
            vBegin: false,
            vMiddle: false,
            vEnd: false,
        };
        // 遍历所有注册元素
        for (let r in _registered) {
            // 选中【水平左】 = 元素【水平左】
            if (Math.abs(this.selected.x - _registered[r].x) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hBegin) {
                    hasVectors.hBegin = true;
                }
            }
            // 选中【水平左】 = 元素【水平中】
            if (Math.abs(this.selected.x - (_registered[r].x + _registered[r].width / 2)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width / 2 - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width / 2 - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hBegin) {
                    hasVectors.hBegin = true;
                }
            }
            // 选中【水平左】 = 元素【水平右】
            if (Math.abs(this.selected.x - (_registered[r].x + _registered[r].width)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hBegin) {
                    hasVectors.hBegin = true;
                }
            }
            // 选中【水平中】 = 元素【水平左】
            if (Math.abs(this.selected.x + this.selected.width / 2 - _registered[r].x) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hMiddle) {
                    hasVectors.hMiddle = true;
                }
            }
            // 选中【水平中】 = 元素【水平中】
            if (Math.abs(this.selected.x + this.selected.width / 2 - (_registered[r].x + _registered[r].width / 2)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width / 2 - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width / 2 - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hMiddle) {
                    hasVectors.hMiddle = true;
                }
            }
            // 选中【水平中】 = 元素【水平右】
            if (Math.abs(this.selected.x + this.selected.width / 2 - (_registered[r].x + _registered[r].width)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hMiddle) {
                    hasVectors.hMiddle = true;
                }
            }
            // 选中【水平右】 = 元素【水平左】
            if (Math.abs(this.selected.x + this.selected.width - _registered[r].x) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hEnd) {
                    hasVectors.hEnd = true;
                }
            }
            // 选中【水平右】 = 元素【水平中】
            if (Math.abs(this.selected.x + this.selected.width - (_registered[r].x + _registered[r].width / 2)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width / 2 - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width / 2 - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hEnd) {
                    hasVectors.hEnd = true;
                }
            }
            // 选中【水平右】 = 元素【水平右】
            if (Math.abs(this.selected.x + this.selected.width - (_registered[r].x + _registered[r].width)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.hEnd) {
                    hasVectors.hEnd = true;
                }
            }
            // 选中【垂直上】 = 元素【垂直上】
            if (Math.abs(this.selected.y - _registered[r].y) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                if (!hasVectors.vBegin) {
                    hasVectors.vBegin = true;
                }
            }
            // 选中【垂直上】 = 元素【垂直中】
            if (Math.abs(this.selected.y - (_registered[r].y + _registered[r].height / 2)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height / 2 - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height / 2 - vectorSize
                });
                if (!hasVectors.vBegin) {
                    hasVectors.vBegin = true;
                }
            }
            // 选中【垂直上】 = 元素【垂直下】
            if (Math.abs(this.selected.y - (_registered[r].y + _registered[r].height)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.vBegin) {
                    hasVectors.vBegin = true;
                }
            }
            // 选中【垂直中】 = 元素【垂直上】
            if (Math.abs(this.selected.y + this.selected.height / 2 - _registered[r].y) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                if (!hasVectors.vMiddle) {
                    hasVectors.vMiddle = true;
                }
            }
            // 选中【垂直中】 = 元素【垂直中】
            if (Math.abs((this.selected.y + this.selected.height / 2) - (_registered[r].y + _registered[r].height / 2)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height / 2 - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height / 2 - vectorSize
                });
                if (!hasVectors.vMiddle) {
                    hasVectors.vMiddle = true;
                }
            }
            // 选中【垂直中】 = 元素【垂直下】
            if (Math.abs((this.selected.y + this.selected.height / 2) - (_registered[r].y + _registered[r].height)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.vMiddle) {
                    hasVectors.vMiddle = true;
                }
            }
            // 选中【垂直下】 = 元素【垂直上】
            if (Math.abs(this.selected.y + this.selected.height - _registered[r].y) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y - vectorSize
                });
                if (!hasVectors.vEnd) {
                    hasVectors.vEnd = true;
                }
            }
            // 选中【垂直下】 = 元素【垂直中】
            if (Math.abs((this.selected.y + this.selected.height) - (_registered[r].y + _registered[r].height / 2)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height / 2 - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height / 2 - vectorSize
                });
                if (!hasVectors.vEnd) {
                    hasVectors.vEnd = true;
                }
            }
            // 选中【垂直下】 = 元素【垂直下】
            if (Math.abs((this.selected.y + this.selected.height) - (_registered[r].y + _registered[r].height)) <= this.alignVectorsLinesThreshold
                && this.selected.ids.indexOf(_registered[r].id) === -1) {
                // 生成参考线上的点
                // 就是元素的开始和结束点
                // 开始点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                // 结束点
                this.generateAlignVector(direction, position, {
                    x: _registered[r].x + _registered[r].width - vectorSize,
                    y: _registered[r].y + _registered[r].height - vectorSize
                });
                if (!hasVectors.vEnd) {
                    hasVectors.vEnd = true;
                }
            }
        }
        // 将选中项坐标加入
        // 水平左
        if (hasVectors.hBegin) {
            // 开始点
            this.generateAlignVector(direction, position, {
                x: this.selected.x - vectorSize,
                y: this.selected.y - vectorSize
            });
            // 结束点
            this.generateAlignVector(direction, position, {
                x: this.selected.x - vectorSize,
                y: this.selected.y + this.selected.height - vectorSize
            });
        }
        // 水平中
        if (hasVectors.hMiddle) {
            // 开始点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width / 2 - vectorSize,
                y: this.selected.y - vectorSize
            });
            // 结束点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width / 2 - vectorSize,
                y: this.selected.y + this.selected.height - vectorSize
            });
        }
        // 水平右
        if (hasVectors.hEnd) {
            // 开始点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width - vectorSize,
                y: this.selected.y - vectorSize
            });
            // 结束点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width - vectorSize,
                y: this.selected.y + this.selected.height - vectorSize
            });
        }
        // 垂直上
        if (hasVectors.vBegin) {
            // 开始点
            this.generateAlignVector(direction, position, {
                x: this.selected.x - vectorSize,
                y: this.selected.y - vectorSize
            });
            // 结束点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width - vectorSize,
                y: this.selected.y - vectorSize
            });
        }
        // 垂直中
        if (hasVectors.vMiddle) {
            // 开始点
            this.generateAlignVector(direction, position, {
                x: this.selected.x - vectorSize,
                y: this.selected.y + this.selected.height / 2 - vectorSize
            });
            // 结束点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width - vectorSize,
                y: this.selected.y + this.selected.height / 2 - vectorSize
            });
        }
        // 垂直下
        if (hasVectors.vEnd) {
            // 开始点
            this.generateAlignVector(direction, position, {
                x: this.selected.x - vectorSize,
                y: this.selected.y + this.selected.height - vectorSize
            });
            // 结束点
            this.generateAlignVector(direction, position, {
                x: this.selected.x + this.selected.width - vectorSize,
                y: this.selected.y + this.selected.height - vectorSize
            });
        }
    }
    // 生成线
    generateAlignLine(line) {
        const { direction, position, begin, end } = line;
        const elLine = document.createElement("div");
        elLine.classList.add(`align-line`);
        elLine.classList.add(`align-line-${direction}`);
        elLine.classList.add(`align-line-${direction}-${position}`);
        elLine.style.position = "absolute";
        elLine.style.left = `${begin.x}px`;
        elLine.style.top = `${begin.y}px`;
        if (direction === "horizontal") {
            elLine.style.width = "1px";
            elLine.style.height = `${end.y - begin.y}px`;
        }
        else {
            elLine.style.width = `${end.x - begin.x}px`;
            elLine.style.height = "1px";
        }
        this.shadowRoot?.querySelector(".container")?.appendChild(elLine);
    }
    generateLine(line, classNames) {
        const { direction, begin, end } = line;
        const elLine = document.createElement("div");
        if (classNames.length > 0) {
            for (const className of classNames) {
                elLine.classList.add(className);
            }
        }
        elLine.style.position = "absolute";
        elLine.style.left = `${begin.x}px`;
        elLine.style.top = `${begin.y}px`;
        if (direction === "horizontal") {
            elLine.style.width = `${end.x - begin.x}px`;
        }
        else {
            elLine.style.height = `${end.y - begin.y}px`;
        }
        return elLine;
    }
    /**
     * 生成对齐线
     *
     * @param direction
     * @param position 拖拽中，选中项的：左中右或上中下
     * @param _registered
     * @returns
     */
    triggerAlignLines(_registered) {
        const _selected = {
            direction: "horizontal",
            position: "begin",
            begin: {
                x: this.selected.x,
                y: this.selected.y
            },
            end: {
                x: this.selected.x,
                y: this.selected.y
            }
        };
        const getLineH = (line, registeredItem, size) => {
            if (line === undefined) {
                line = cloneDeep(_selected);
                line.end.y = line.end.y + this.selected.height;
                line.begin.x = line.begin.x + size;
                line.end.x = line.begin.x + size;
                if (registeredItem.y < line.begin.y) {
                    line.begin.y = registeredItem.y;
                }
                if (registeredItem.y + registeredItem.height > line.end.y) {
                    line.end.y = registeredItem.y + registeredItem.height;
                }
            }
            else {
                if (registeredItem.y < line.begin.y) {
                    line.begin.y = registeredItem.y;
                }
                if (registeredItem.y + registeredItem.height > line.end.y) {
                    line.end.y = registeredItem.y + registeredItem.height;
                }
            }
            return line;
        };
        const getLineV = (line, registeredItem, size) => {
            if (line === undefined) {
                line = cloneDeep(_selected);
                line.direction = "vertical";
                line.end.x = line.end.x + this.selected.width;
                line.begin.y = line.begin.y + size;
                line.end.y = line.end.y + size;
                if (registeredItem.x < line.begin.x) {
                    line.begin.x = registeredItem.x;
                }
                if (registeredItem.x + registeredItem.width > line.end.x) {
                    line.end.x = registeredItem.x + registeredItem.width;
                }
            }
            else {
                if (registeredItem.x < line.begin.x) {
                    line.begin.x = registeredItem.x;
                }
                if (registeredItem.x + registeredItem.width > line.end.x) {
                    line.end.x = registeredItem.x + registeredItem.width;
                }
            }
            return line;
        };
        // 可生成线的开始和结束点，每两个点组成 1 条线，不管开始结束，只管方向
        const lines = [];
        // 遍历所有注册元素
        for (let r in _registered) {
            // 水平左 对齐 元素左、中、右
            if ((this.selected.x === _registered[r].x ||
                this.selected.x === _registered[r].x + _registered[r].width / 2 ||
                this.selected.x === _registered[r].x + _registered[r].width) &&
                this.selected.ids.indexOf(_registered[r].id) === -1) {
                lines[0] = getLineH(lines[0], _registered[r], 0);
            }
            // 水平中 对齐 元素左、中、右
            if ((this.selected.x + this.selected.width / 2 === _registered[r].x ||
                this.selected.x + this.selected.width / 2 === _registered[r].x + _registered[r].width / 2 ||
                this.selected.x + this.selected.width / 2 === _registered[r].x + _registered[r].width) &&
                this.selected.ids.indexOf(_registered[r].id) === -1) {
                lines[1] = getLineH(lines[1], _registered[r], this.selected.width / 2);
            }
            // 水平右 对齐 元素左、中、右
            if ((this.selected.x + this.selected.width === _registered[r].x ||
                this.selected.x + this.selected.width === _registered[r].x + _registered[r].width / 2 ||
                this.selected.x + this.selected.width === _registered[r].x + _registered[r].width) &&
                this.selected.ids.indexOf(_registered[r].id) === -1) {
                lines[2] = getLineH(lines[2], _registered[r], this.selected.width);
            }
            // 垂直上 对齐 元素上、中、下
            if ((Math.abs(this.selected.y - _registered[r].y) <= this.alignVectorsLinesThreshold ||
                Math.abs(this.selected.y - (_registered[r].y + _registered[r].height / 2)) <= this.alignVectorsLinesThreshold ||
                Math.abs(this.selected.y - (_registered[r].y + _registered[r].height)) <= this.alignVectorsLinesThreshold) &&
                this.selected.ids.indexOf(_registered[r].id) === -1) {
                lines[3] = getLineV(lines[3], _registered[r], 0);
            }
            // 垂直中 对齐 元素上、中、下
            if ((Math.abs(this.selected.y + this.selected.height / 2 - _registered[r].y) <= this.alignVectorsLinesThreshold ||
                Math.abs((this.selected.y + this.selected.height / 2) - (_registered[r].y + _registered[r].height / 2)) <= this.alignVectorsLinesThreshold ||
                Math.abs((this.selected.y + this.selected.height / 2) - (_registered[r].y + _registered[r].height)) <= this.alignVectorsLinesThreshold) &&
                this.selected.ids.indexOf(_registered[r].id) === -1) {
                lines[4] = getLineV(lines[4], _registered[r], this.selected.height / 2);
            }
            // 垂直下 对齐 元素上、中、下
            if ((Math.abs(this.selected.y + this.selected.height - _registered[r].y) <= this.alignVectorsLinesThreshold ||
                Math.abs((this.selected.y + this.selected.height) - (_registered[r].y + _registered[r].height / 2)) <= this.alignVectorsLinesThreshold ||
                Math.abs((this.selected.y + this.selected.height) - (_registered[r].y + _registered[r].height)) <= this.alignVectorsLinesThreshold) &&
                this.selected.ids.indexOf(_registered[r].id) === -1) {
                lines[5] = getLineV(lines[5], _registered[r], this.selected.height);
            }
        }
        for (const line of lines) {
            if (line === undefined)
                continue;
            this.generateAlignLine(line);
        }
    }
    shortcuts(direction, position) {
        if (direction === "horizontal") {
            switch (position) {
                case "begin":
                    for (const id of this.selected.ids) {
                        const item = this.registered[id];
                        const { y } = this.getTranslatePos(item.el.style.translate);
                        const elX = this.selected.x;
                        item.el.style.translate = `${elX}px ${y}px`;
                        this.registered[id].x = elX;
                    }
                    break;
                case "middle":
                    for (const id of this.selected.ids) {
                        const item = this.registered[id];
                        const { x, y } = this.getTranslatePos(item.el.style.translate);
                        const elX = x - (item.x - (this.selected.x + this.selected.width / 2)) - item.width / 2;
                        item.el.style.translate = `${elX}px ${y}px`;
                        this.registered[id].x = elX;
                    }
                    break;
                case "end":
                    for (const id of this.selected.ids) {
                        const item = this.registered[id];
                        const { y } = this.getTranslatePos(item.el.style.translate);
                        const elX = this.selected.x + this.selected.width - item.width;
                        item.el.style.translate = `${elX}px ${y}px`;
                        this.registered[id].x = this.selected.x + this.selected.width - item.width;
                    }
                    break;
                case "distribute":
                    // - 沿 x 轴，对选中项进行排序
                    const rankedIds = this.selected.ids.sort((a, b) => this.registered[a].x - this.registered[b].x);
                    // - 计算每个元素间距
                    let itemsWidth = 0;
                    for (const id of rankedIds) {
                        itemsWidth += this.registered[id].width;
                    }
                    // 元素间距
                    const gap = (this.selected.width - itemsWidth) / (rankedIds.length - 1);
                    // 每个元素的位移，是个动态值，前一个元素移动后再将其值赋值，留给后一个元素用
                    let offset = this.registered[rankedIds[0]].x;
                    for (let i = 0; i < rankedIds.length; i++) {
                        const id = rankedIds[i];
                        const item = this.registered[id];
                        const { y } = this.getTranslatePos(item.el.style.translate);
                        let elX = offset;
                        item.el.style.translate = `${elX}px ${y}px`;
                        this.registered[id].x = elX;
                        offset = offset + item.width + gap;
                    }
                    break;
            }
        }
        else if (direction === "vertical") {
            switch (position) {
                case "begin":
                    // console.log('begin')
                    for (const id of this.selected.ids) {
                        const item = this.registered[id];
                        const { x } = this.getTranslatePos(item.el.style.translate);
                        const elY = this.selected.y;
                        item.el.style.translate = `${x}px ${elY}px`;
                        this.registered[id].y = elY;
                    }
                    break;
                case "middle":
                    // console.log('middle')
                    for (const id of this.selected.ids) {
                        const item = this.registered[id];
                        const { x, y } = this.getTranslatePos(item.el.style.translate);
                        const elY = y - (item.y - (this.selected.y + this.selected.height / 2)) - item.height / 2;
                        item.el.style.translate = `${x}px ${elY}px`;
                        this.registered[id].y = elY;
                    }
                    break;
                case "end":
                    // console.log('end')
                    for (const id of this.selected.ids) {
                        const item = this.registered[id];
                        const { x } = this.getTranslatePos(item.el.style.translate);
                        const elY = this.selected.y + this.selected.height - item.height;
                        item.el.style.translate = `${x}px ${elY}px`;
                        this.registered[id].y = this.selected.y + this.selected.height - item.height;
                    }
                    break;
                case "distribute":
                    // console.log('distribute')
                    // - 沿 x 轴，对选中项进行排序
                    const rankedIds = this.selected.ids.sort((a, b) => this.registered[a].y - this.registered[b].y);
                    // - 计算每个元素间距
                    let itemsHeight = 0;
                    for (const id of rankedIds) {
                        itemsHeight += this.registered[id].height;
                    }
                    // 元素间距
                    const gap = (this.selected.height - itemsHeight) / (rankedIds.length - 1);
                    // 每个元素的位移，是个动态值，前一个元素移动后再将其值赋值，留给后一个元素用
                    let offset = this.registered[rankedIds[0]].y;
                    // 移动元素
                    for (let i = 0; i < rankedIds.length; i++) {
                        const id = rankedIds[i];
                        const item = this.registered[id];
                        const { x } = this.getTranslatePos(item.el.style.translate);
                        let elY = offset;
                        item.el.style.translate = `${x}px ${elY}px`;
                        this.registered[id].y = elY;
                        offset = offset + item.height + gap;
                    }
                    break;
            }
        }
        else {
            // 测量距离
            if (this.elMeasure?.classList.contains("active")) {
                this.shadowRoot?.removeEventListener("mousemove", this.measure);
                if (this.isToolbar) {
                    this.elMeasure?.classList.remove("active");
                }
                // 隐藏参考线
                this.hideMeasureReferences();
                this.hideMeasureDeshed();
            }
            else {
                this.shadowRoot?.addEventListener("mousemove", this.measure);
                if (this.isToolbar) {
                    this.elMeasure?.classList.add("active");
                }
            }
        }
        // 更新选中元素组成后的参数
        this.getSelectedParams();
        this.renderSelectedReference();
    }
    measure(e) {
        // 过滤鼠标框选的移动事件
        if (this.selected.ids.length === 0)
            return;
        // 过滤框选
        if (this.mouseMoveType === "main")
            return;
        let elTarget = null;
        if (e.target.id === "main") {
            elTarget = e.target;
        }
        if (elTarget === null) {
            elTarget = e.target.closest("glide-dnr-item");
        }
        // 过滤
        if (elTarget === null) {
            return;
        }
        if (this.isToolbar) {
            this.measureTargetId = elTarget.id;
        }
        // 过滤 main 容器
        if (elTarget.id === "main") {
            // 隐藏参考线
            this.hideMeasureReferences();
            this.hideMeasureDeshed();
            if (this.isToolbar) {
                this.measureTargetId = "";
                // 隐藏测量距离选中外框
                this.elMeasureOutline.style.width = 0;
                this.elMeasureOutline.style.height = 0;
                this.elMeasureOutline.style.translate = "0px 0px";
                this.elMeasureOutline.style.visibility = "hidden";
                this.elMeasureOutline.style.pointerEvents = "none";
            }
            return;
        }
        if (this.isToolbar) {
            this.measureExecute();
        }
    }
    measureExecute() {
        if (this.measureTargetId === "")
            return;
        // 隐藏参考线
        this.hideMeasureReferences();
        this.hideMeasureDeshed();
        const targetId = this.measureTargetId;
        // 过滤自身
        for (const id of this.selected.ids) {
            if (targetId === id) {
                // 隐藏参考线
                this.hideMeasureReferences();
                this.hideMeasureDeshed();
                return;
            }
        }
        const selectX = this.selected.x + this.selected.width;
        const selectXHalf = this.selected.x + this.selected.width / 2;
        const selectY = this.selected.y + this.selected.height;
        const selectYHalf = this.selected.y + this.selected.height / 2;
        const targetX = this.registered[targetId].x + this.registered[targetId].width;
        const targetY = this.registered[targetId].y + this.registered[targetId].height;
        // 思路：对比选中项与测量目标元素的水平和垂直位置
        // - 选中项上下左右会在中线位置产生沿边垂直的实线
        // - 测量元素的四个顶点位置产生延长边水平的虚线
        // - 实线位置中间位置产生数字显示距离
        let isMatched = false;
        // 参考
        //  selected    target
        //    |------||----|--------||
        //    |      ||    |        ||
        //    |------||----|--------||
        //  selected    target
        //    |-------||----|-------||
        //    |       ||    |       ||
        //    |-------||----|-------||
        //  selected    target
        //    ||----|------|--------||
        //    ||    |      |        ||
        //    ||----|------|--------||
        //  selected    target
        //    |----||-------|-------||
        //    |    ||       |       ||
        //    |----||-------|-------||
        //  target           selected
        //  ||------------|| |--------|
        //  ||            || |        |
        //  ||------------|| |--------|
        // Begin 选中项垂直位置移动时，上下实线
        // 选中项下 < 测量项上
        if (selectY < this.registered[targetId].y) {
            isMatched = true;
            const solidBHeight = this.registered[targetId].y - selectY;
            // Begin solid: bottom
            let solidX = selectXHalf;
            // y 矫正 1 px，让 dashed 线与 measure outline 相应边重合
            if (selectXHalf === targetX) {
                solidX -= 1;
            }
            this.elMeasureLines.solid_b.style.translate = `${solidX}px ${selectY}px`;
            this.elMeasureLines.solid_b.style.height = `${solidBHeight}px`;
            if (this.elMeasureLines.solid_b.style.visibility !== "visible") {
                this.elMeasureLines.solid_b.style.visibility = "visible";
            }
            // End solid: bottom
            // Begin number bottom
            // numberT 数值
            let elStyle = window.getComputedStyle(this.elMeasureLines.numberB);
            const elNumberBHeight = parseFloat(elStyle.height.replace('px', ""));
            this.elMeasureLines.numberB.innerText = Math.round(solidBHeight);
            // numberB 位置
            const elNumberBottomY = Math.round(selectY + solidBHeight / 2 - elNumberBHeight / 2);
            this.elMeasureLines.numberB.style.translate = `${selectXHalf + 4}px ${elNumberBottomY}px`;
            this.elMeasureLines.numberB.style.visibility = "visible";
            // End number bottom
            if (selectXHalf <= this.registered[targetId].x) {
                // Begin dashed: horizontal bottom
                this.elMeasureLines.dashed_h_b.style.translate = `${selectXHalf}px ${this.registered[targetId].y}px`;
                this.elMeasureLines.dashed_h_b.style.width = `${this.registered[targetId].x - selectXHalf}px`;
                if (this.elMeasureLines.dashed_h_b.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_b.style.visibility = "visible";
                }
                // End dashed: horizontal bottom
            }
            if (selectXHalf >= targetX) {
                // Begin dashed: horizontal bottom
                this.elMeasureLines.dashed_h_b.style.translate = `${targetX}px ${this.registered[targetId].y}px`;
                this.elMeasureLines.dashed_h_b.style.width = `${selectXHalf - targetX}px`;
                if (this.elMeasureLines.dashed_h_b.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_b.style.visibility = "visible";
                }
                // End dashed: horizontal bottom
            }
        }
        // 选中项上 > 测量项上 && 选中项上 <= 测量项下
        if (selectY >= this.registered[targetId].y &&
            selectY <= targetY) {
            isMatched = true;
            const solidBHeight = targetY - selectY;
            // const gap = solidBHeight - Math.floor(solidBHeight)
            // Begin solid: bottom
            this.elMeasureLines.solid_b.style.translate = `${selectXHalf}px ${selectY}px`;
            this.elMeasureLines.solid_b.style.height = `${solidBHeight}px`;
            // console.log('gap: ', gap)
            // console.log('solidBHeight: ', solidBHeight)
            if (this.elMeasureLines.solid_b.style.visibility !== "visible") {
                this.elMeasureLines.solid_b.style.visibility = "visible";
            }
            // End solid: bottom
            if (selectY >= this.registered[targetId].y && selectY < targetY) {
                // Begin number bottom
                // numberT 数值
                let elStyle = window.getComputedStyle(this.elMeasureLines.numberB);
                const elNumberBHeight = parseFloat(elStyle.height.replace('px', ""));
                this.elMeasureLines.numberB.innerText = Math.round(solidBHeight);
                // numberB 位置
                const elNumberBottomY = Math.round(selectY + solidBHeight / 2 - elNumberBHeight / 2);
                this.elMeasureLines.numberB.style.translate = `${selectXHalf + 4}px ${elNumberBottomY}px`;
                this.elMeasureLines.numberB.style.visibility = "visible";
                // End number bottom
            }
            if (selectXHalf <= this.registered[targetId].x && selectY < targetY) {
                // Begin dashed: horizontal bottom
                // y 矫正 1 px，让 dashed 线与 measure outline 相应边重合
                this.elMeasureLines.dashed_h_b.style.translate = `${selectXHalf}px ${targetY - 1}px`;
                this.elMeasureLines.dashed_h_b.style.width = `${this.registered[targetId].x - selectXHalf}px`;
                if (this.elMeasureLines.dashed_h_b.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_b.style.visibility = "visible";
                }
                // End dashed: horizontal bottom
            }
            if (selectXHalf >= targetX && selectY < targetY) {
                // Begin dashed: horizontal bottom
                // y 矫正 1 px，让 dashed 线与 measure outline 相应边重合
                this.elMeasureLines.dashed_h_b.style.translate = `${targetX}px ${targetY - 1}px`;
                this.elMeasureLines.dashed_h_b.style.width = `${selectXHalf - targetX}px`;
                if (this.elMeasureLines.dashed_h_b.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_b.style.visibility = "visible";
                }
                // End dashed: horizontal bottom
            }
        }
        // 选中项上 > 测量项下
        if (this.selected.y > targetY) {
            isMatched = true;
            const solidTHeight = this.selected.y - targetY;
            // Begin solid: top
            let solidX = selectXHalf;
            // y 矫正 1 px，让 dashed 线与 measure outline 相应边重合
            if (selectXHalf === targetX) {
                solidX -= 1;
            }
            this.elMeasureLines.solid_t.style.translate = `${solidX}px ${targetY}px`;
            this.elMeasureLines.solid_t.style.height = `${solidTHeight}px`;
            if (this.elMeasureLines.solid_t.style.visibility !== "visible") {
                this.elMeasureLines.solid_t.style.visibility = "visible";
            }
            // End solid: top
            // Begin number: top
            // numberT 数值
            const elStyle = window.getComputedStyle(this.elMeasureLines.numberT);
            const elNumberTHeight = parseFloat(elStyle.height.replace('px', ""));
            this.elMeasureLines.numberT.innerText = Math.round(solidTHeight);
            // numberT 位置
            const elNumberTopY = Math.round(this.selected.y - solidTHeight / 2 - elNumberTHeight / 2);
            this.elMeasureLines.numberT.style.translate = `${selectXHalf + 4}px ${elNumberTopY}px`;
            if (this.elMeasureLines.numberT.style.visibility !== "visible") {
                this.elMeasureLines.numberT.style.visibility = "visible";
            }
            // End number: top
            if (selectXHalf < this.registered[targetId].x) {
                // Begin dashed: horizontal top
                this.elMeasureLines.dashed_h_t.style.translate = `${selectXHalf}px ${targetY - 1}px`;
                this.elMeasureLines.dashed_h_t.style.width = `${this.registered[targetId].x - selectXHalf}px`;
                if (this.elMeasureLines.dashed_h_t.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_t.style.visibility = "visible";
                }
                // End dashed: horizontal top
            }
            if (selectXHalf > targetX) {
                // Begin dashed: horizontal bottom
                this.elMeasureLines.dashed_h_b.style.translate = `${targetX}px ${targetY - 1}px`;
                this.elMeasureLines.dashed_h_b.style.width = `${selectXHalf - targetX}px`;
                if (this.elMeasureLines.dashed_h_b.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_b.style.visibility = "visible";
                }
                // End dashed: horizontal bottom
            }
        }
        if (this.selected.y > this.registered[targetId].y && this.selected.y <= targetY) {
            isMatched = true;
            const solidTHeight = this.selected.y - this.registered[targetId].y;
            // Begin solid: top
            this.elMeasureLines.solid_t.style.translate = `${selectXHalf}px ${this.registered[targetId].y}px`;
            this.elMeasureLines.solid_t.style.height = `${solidTHeight}px`;
            if (this.elMeasureLines.solid_t.style.visibility !== "visible") {
                this.elMeasureLines.solid_t.style.visibility = "visible";
            }
            // End solid: top
            // Begin number: top
            // numberT 数值
            const elStyle = window.getComputedStyle(this.elMeasureLines.numberT);
            const elNumberTHeight = parseFloat(elStyle.height.replace('px', ""));
            this.elMeasureLines.numberT.innerText = Math.round(solidTHeight);
            // numberT 位置
            const elNumberTopY = Math.round(this.selected.y - solidTHeight / 2 - elNumberTHeight / 2);
            this.elMeasureLines.numberT.style.translate = `${selectXHalf + 4}px ${elNumberTopY}px`;
            if (this.elMeasureLines.numberT.style.visibility !== "visible") {
                this.elMeasureLines.numberT.style.visibility = "visible";
            }
            // End number: top
            if (selectXHalf < this.registered[targetId].x) {
                // Begin dashed: horizontal top
                this.elMeasureLines.dashed_h_t.style.translate = `${selectXHalf}px ${this.registered[targetId].y}px`;
                this.elMeasureLines.dashed_h_t.style.width = `${this.registered[targetId].x - selectXHalf}px`;
                if (this.elMeasureLines.dashed_h_t.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_t.style.visibility = "visible";
                }
                // End dashed: horizontal top
            }
            if (selectXHalf > targetX) {
                // Begin dashed: horizontal top
                this.elMeasureLines.dashed_h_t.style.translate = `${targetX}px ${this.registered[targetId].y}px`;
                this.elMeasureLines.dashed_h_t.style.width = `${selectXHalf - targetX}px`;
                if (this.elMeasureLines.dashed_h_t.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_h_t.style.visibility = "visible";
                }
                // End dashed: horizontal top
            }
        }
        // End 选中项垂直位置移动时，上下实线
        // Begin 选中项水平位置移动时，左右实线
        if (selectX < this.registered[targetId].x) {
            isMatched = true;
            // Begin solid: right
            let solidY = selectYHalf;
            // y 矫正 1 px，让 dashed 线与 measure outline 相应边重合
            if (selectYHalf === targetY) {
                solidY -= 1;
            }
            this.elMeasureLines.solid_r.style.translate = `${selectX + 1}px ${solidY}px`;
            const solidRWidth = this.registered[targetId].x - selectX;
            this.elMeasureLines.solid_r.style.width = `${solidRWidth}px`;
            if (this.elMeasureLines.solid_r.style.visibility !== "visible") {
                this.elMeasureLines.solid_r.style.visibility = "visible";
            }
            // End solid: right
            // Begin number: right
            // numberR 数值
            const elStyle = window.getComputedStyle(this.elMeasureLines.numberR);
            const elNumberRWidth = parseFloat(elStyle.width.replace('px', ""));
            this.elMeasureLines.numberR.innerText = Math.round(solidRWidth);
            // numberR 位置
            const elNumberTopX = Math.round(selectX + solidRWidth / 2 - elNumberRWidth / 2);
            this.elMeasureLines.numberR.style.translate = `${elNumberTopX}px ${selectYHalf + 4}px`;
            if (this.elMeasureLines.numberR.style.visibility !== "visible") {
                this.elMeasureLines.numberR.style.visibility = "visible";
            }
            // End number: right
            if (selectYHalf <= this.registered[targetId].y) {
                // Begin dashed: vertical left
                this.elMeasureLines.dashed_v_l.style.translate = `${this.registered[targetId].x}px ${selectYHalf}px`;
                this.elMeasureLines.dashed_v_l.style.height = `${this.registered[targetId].y - selectYHalf}px`;
                if (this.elMeasureLines.dashed_v_l.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_l.style.visibility = "visible";
                }
                // End dashed: vertical left
            }
            if (selectYHalf >= targetY) {
                // Begin dashed: vertical left
                this.elMeasureLines.dashed_v_l.style.translate = `${this.registered[targetId].x}px ${targetY}px`;
                this.elMeasureLines.dashed_v_l.style.height = `${selectYHalf - targetY}px`;
                if (this.elMeasureLines.dashed_v_l.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_l.style.visibility = "visible";
                }
                // End dashed: vertical left
            }
        }
        if (selectX >= this.registered[targetId].x &&
            selectX < targetX) {
            isMatched = true;
            // Begin solid: right
            this.elMeasureLines.solid_r.style.translate = `${selectX}px ${selectYHalf}px`;
            const solidRWidth = targetX - selectX;
            this.elMeasureLines.solid_r.style.width = `${solidRWidth}px`;
            if (this.elMeasureLines.solid_r.style.visibility !== "visible") {
                this.elMeasureLines.solid_r.style.visibility = "visible";
            }
            // End solid: right
            // Begin number: right
            // numberR 数值
            const elStyle = window.getComputedStyle(this.elMeasureLines.numberR);
            const elNumberRWidth = parseFloat(elStyle.width.replace('px', ""));
            this.elMeasureLines.numberR.innerText = Math.round(solidRWidth);
            // numberR 位置
            const elNumberTopX = Math.round(selectX + solidRWidth / 2 - elNumberRWidth / 2);
            this.elMeasureLines.numberR.style.translate = `${elNumberTopX}px ${selectYHalf + 4}px`;
            if (this.elMeasureLines.numberR.style.visibility !== "visible") {
                this.elMeasureLines.numberR.style.visibility = "visible";
            }
            // End number: right
            if (selectYHalf < this.registered[targetId].y) {
                // Begin dashed: vertical right
                // x 矫正 1 px，让 dashed 线与 measure outline 相应边重合
                this.elMeasureLines.dashed_v_r.style.translate = `${targetX - 1}px ${selectYHalf}px`;
                this.elMeasureLines.dashed_v_r.style.height = `${this.registered[targetId].y - selectYHalf}px`;
                if (this.elMeasureLines.dashed_v_r.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_r.style.visibility = "visible";
                }
                // End dashed: vertical right
            }
            if (selectYHalf > targetY) {
                // Begin dashed: vertical right
                this.elMeasureLines.dashed_v_r.style.translate = `${targetX - 1}px ${targetY}px`;
                this.elMeasureLines.dashed_v_r.style.height = `${selectYHalf - targetY}px`;
                if (this.elMeasureLines.dashed_v_r.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_r.style.visibility = "visible";
                }
                // End dashed: vertical right
            }
        }
        if (this.selected.x > targetX) {
            isMatched = true;
            // Begin solid: left
            let solidY = selectYHalf;
            if (selectYHalf === targetY) {
                solidY -= 1;
            }
            this.elMeasureLines.solid_l.style.translate = `${targetX - 1}px ${solidY}px`;
            const solidRWidth = this.selected.x - targetX;
            this.elMeasureLines.solid_l.style.width = `${solidRWidth}px`;
            if (this.elMeasureLines.solid_l.style.visibility !== "visible") {
                this.elMeasureLines.solid_l.style.visibility = "visible";
            }
            // End solid: left
            // Begin number: left
            // numberL 数值
            const elStyle = window.getComputedStyle(this.elMeasureLines.numberL);
            const elNumberLWidth = parseFloat(elStyle.width.replace('px', ""));
            this.elMeasureLines.numberL.innerText = Math.round(solidRWidth);
            // numberL 位置
            const elNumberTopX = Math.round(targetX + solidRWidth / 2 - elNumberLWidth / 2);
            this.elMeasureLines.numberL.style.translate = `${elNumberTopX}px ${selectYHalf + 4}px`;
            if (this.elMeasureLines.numberL.style.visibility !== "visible") {
                this.elMeasureLines.numberL.style.visibility = "visible";
            }
            // End number: left
            if (selectYHalf <= this.registered[targetId].y) {
                // Begin dashed: vertical left
                // x 矫正 1 px，让 dashed 线与 measure outline 相应边重合
                this.elMeasureLines.dashed_v_l.style.translate = `${targetX - 1}px ${selectYHalf}px`;
                this.elMeasureLines.dashed_v_l.style.height = `${this.registered[targetId].y - selectYHalf}px`;
                if (this.elMeasureLines.dashed_v_l.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_l.style.visibility = "visible";
                }
                // End dashed: vertical left
            }
            if (selectYHalf >= targetY) {
                // Begin dashed: vertical left
                // x 矫正 1 px，让 dashed 线与 measure outline 相应边重合
                this.elMeasureLines.dashed_v_l.style.translate = `${targetX - 1}px ${targetY}px`;
                this.elMeasureLines.dashed_v_l.style.height = `${selectYHalf - targetY}px`;
                if (this.elMeasureLines.dashed_v_l.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_l.style.visibility = "visible";
                }
                // End dashed: vertical left
            }
        }
        if (this.selected.x > this.registered[targetId].x &&
            this.selected.x <= targetX) {
            isMatched = true;
            // Begin solid: left
            this.elMeasureLines.solid_l.style.translate = `${this.registered[targetId].x}px ${selectYHalf}px`;
            const solidRWidth = this.selected.x - this.registered[targetId].x;
            this.elMeasureLines.solid_l.style.width = `${solidRWidth}px`;
            if (this.elMeasureLines.solid_l.style.visibility !== "visible") {
                this.elMeasureLines.solid_l.style.visibility = "visible";
            }
            // End solid: left
            // Begin number: left
            // numberL 数值
            const elStyle = window.getComputedStyle(this.elMeasureLines.numberL);
            const elNumberLWidth = parseFloat(elStyle.width.replace('px', ""));
            this.elMeasureLines.numberL.innerText = Math.round(solidRWidth);
            // numberL 位置
            const elNumberTopX = Math.round(this.registered[targetId].x + solidRWidth / 2 - elNumberLWidth / 2);
            this.elMeasureLines.numberL.style.translate = `${elNumberTopX}px ${selectYHalf + 4}px`;
            if (this.elMeasureLines.numberL.style.visibility !== "visible") {
                this.elMeasureLines.numberL.style.visibility = "visible";
            }
            // End number: left
            if (selectYHalf <= this.registered[targetId].y) {
                // Begin dashed: vertical left
                this.elMeasureLines.dashed_v_l.style.translate = `${this.registered[targetId].x}px ${selectYHalf}px`;
                this.elMeasureLines.dashed_v_l.style.height = `${this.registered[targetId].y - selectYHalf}px`;
                if (this.elMeasureLines.dashed_v_l.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_l.style.visibility = "visible";
                }
                // End dashed: vertical left
            }
            if (selectYHalf >= targetY) {
                // Begin dashed: vertical left
                this.elMeasureLines.dashed_v_l.style.translate = `${this.registered[targetId].x}px ${targetY}px`;
                this.elMeasureLines.dashed_v_l.style.height = `${selectYHalf - targetY}px`;
                if (this.elMeasureLines.dashed_v_l.style.visibility !== "visible") {
                    this.elMeasureLines.dashed_v_l.style.visibility = "visible";
                }
                // End dashed: vertical left
            }
        }
        // End 选中项水平位置移动时，左右实线
        // 隐藏 main 框对比的线
        // if (elTarget.id === "main") {
        //   isMatched = false
        // }
        if (isMatched) {
            if (this.isToolbar) {
                // 显示选中外框
                this.elMeasureOutline.style.width = `${this.registered[targetId].width}px`;
                this.elMeasureOutline.style.height = `${this.registered[targetId].height}px`;
                this.elMeasureOutline.style.translate = `${this.registered[targetId].x}px ${this.registered[targetId].y}px`;
                this.elMeasureOutline.style.visibility = "visible";
                this.elMeasureOutline.style.pointerEvents = "auto";
            }
        }
        else {
            // 隐藏参考线
            this.hideMeasureReferences();
            this.hideMeasureDeshed();
            if (this.isToolbar) {
                // 隐藏选中外框
                this.elMeasureOutline.style.width = 0;
                this.elMeasureOutline.style.height = 0;
                this.elMeasureOutline.style.translate = "0px 0px";
                this.elMeasureOutline.style.visibility = "hidden";
                this.elMeasureOutline.style.pointerEvents = "none";
            }
        }
    }
    hideMeasureReferences() {
        // Begin 隐藏测量参考线和数字
        if (this.elMeasureLines.solid_r.style.visibility !== "hidden") {
            this.elMeasureLines.solid_r.style.visibility = "hidden";
        }
        if (this.elMeasureLines.solid_t.style.visibility !== "hidden") {
            this.elMeasureLines.solid_t.style.visibility = "hidden";
        }
        if (this.elMeasureLines.solid_b.style.visibility !== "hidden") {
            this.elMeasureLines.solid_b.style.visibility = "hidden";
        }
        if (this.elMeasureLines.solid_l.style.visibility !== "hidden") {
            this.elMeasureLines.solid_l.style.visibility = "hidden";
        }
        if (this.elMeasureLines.numberT.style.visibility !== "hidden") {
            this.elMeasureLines.numberT.style.visibility = "hidden";
        }
        if (this.elMeasureLines.numberB.style.visibility !== "hidden") {
            this.elMeasureLines.numberB.style.visibility = "hidden";
        }
        if (this.elMeasureLines.numberL.style.visibility !== "hidden") {
            this.elMeasureLines.numberL.style.visibility = "hidden";
        }
        if (this.elMeasureLines.numberR.style.visibility !== "hidden") {
            this.elMeasureLines.numberR.style.visibility = "hidden";
        }
    }
    hideMeasureDeshed() {
        if (this.elMeasureLines.dashed_v_l.style.visibility !== "hidden") {
            this.elMeasureLines.dashed_v_l.style.visibility = "hidden";
        }
        if (this.elMeasureLines.dashed_v_r.style.visibility !== "hidden") {
            this.elMeasureLines.dashed_v_r.style.visibility = "hidden";
        }
        if (this.elMeasureLines.dashed_h_t.style.visibility !== "hidden") {
            this.elMeasureLines.dashed_h_t.style.visibility = "hidden";
        }
        if (this.elMeasureLines.dashed_h_b.style.visibility !== "hidden") {
            this.elMeasureLines.dashed_h_b.style.visibility = "hidden";
        }
    }
    triggerSelectedLinesVectors(type) {
        if (type === "hide") {
            if (this.elSelectedLines.l.style.visibility !== "hidden") {
                this.elSelectedLines.l.style.visibility = "hidden";
                this.elSelectedLines.r.style.visibility = "hidden";
                this.elSelectedLines.t.style.visibility = "hidden";
                this.elSelectedLines.b.style.visibility = "hidden";
                this.elSelectedVectors.tl.style.visibility = "hidden";
                this.elSelectedVectors.tr.style.visibility = "hidden";
                this.elSelectedVectors.bl.style.visibility = "hidden";
                this.elSelectedVectors.br.style.visibility = "hidden";
            }
        }
        else {
            if (this.elSelectedLines.l.style.visibility !== "visible") {
                this.elSelectedLines.l.style.visibility = "visible";
                this.elSelectedLines.r.style.visibility = "visible";
                this.elSelectedLines.t.style.visibility = "visible";
                this.elSelectedLines.b.style.visibility = "visible";
                this.elSelectedVectors.tl.style.visibility = "visible";
                this.elSelectedVectors.tr.style.visibility = "visible";
                this.elSelectedVectors.bl.style.visibility = "visible";
                this.elSelectedVectors.br.style.visibility = "visible";
            }
        }
    }
    /**
     * 删除元素
     * 因为元素是外部通过 slot 添加的，所以只能外部来处理，然后自动触发 slotChanged
     */
    delete() {
        const customEvent = new CustomEvent("onActions", {
            detail: {
                type: "delete",
                ids: this.selected.ids
            },
        });
        this.dispatchEvent(customEvent);
    }
    listenItemEvents() {
        eventBus.on("onItemChange", ({ id, type, value }) => {
            if (!HasOwn(this.registered, id))
                return;
            let numbValue = 0;
            let offset = 0;
            let eventType = "";
            requestAnimationFrame(() => {
                switch (type) {
                    case "left":
                        eventType = "drag";
                        this.registered[id].el.style.translate = `${value}px ${this.registered[id].y}px`;
                        numbValue = parseFloat(value);
                        offset = this.registered[id].x - numbValue;
                        this.registered[id].x = numbValue;
                        if (this.selected.ids.length > 0) {
                            if (this.selected.ids.indexOf(id) > -1) {
                                this.selected.x = value;
                                // 移动线
                                const lL = this.getTranslatePos(this.elSelectedLines.l.style.translate);
                                this.elSelectedLines.l.style.translate = `${lL.x - offset}px ${lL.y}px`;
                                const lT = this.getTranslatePos(this.elSelectedLines.t.style.translate);
                                this.elSelectedLines.t.style.translate = `${lT.x - offset}px ${lT.y}px`;
                                const lR = this.getTranslatePos(this.elSelectedLines.r.style.translate);
                                this.elSelectedLines.r.style.translate = `${lR.x - offset}px ${lR.y}px`;
                                const lB = this.getTranslatePos(this.elSelectedLines.b.style.translate);
                                this.elSelectedLines.b.style.translate = `${lB.x - offset}px ${lB.y}px`;
                                // 移动顶点
                                const vTL = this.getTranslatePos(this.elSelectedVectors.tl.style.translate);
                                this.elSelectedVectors.tl.style.translate = `${vTL.x - offset}px ${vTL.y}px`;
                                const vTR = this.getTranslatePos(this.elSelectedVectors.tr.style.translate);
                                this.elSelectedVectors.tr.style.translate = `${vTR.x - offset}px ${vTR.y}px`;
                                const vBL = this.getTranslatePos(this.elSelectedVectors.bl.style.translate);
                                this.elSelectedVectors.bl.style.translate = `${vBL.x - offset}px ${vBL.y}px`;
                                const vBR = this.getTranslatePos(this.elSelectedVectors.br.style.translate);
                                this.elSelectedVectors.br.style.translate = `${vBR.x - offset}px ${vBR.y}px`;
                            }
                        }
                        break;
                    case "top":
                        eventType = "drag";
                        this.registered[id].el.style.translate = `${this.registered[id].x}px ${value}px`;
                        numbValue = parseFloat(value);
                        offset = this.registered[id].y - numbValue;
                        this.registered[id].y = numbValue;
                        if (this.selected.ids.length > 0) {
                            if (this.selected.ids.indexOf(id) > -1) {
                                this.selected.y = value;
                                // 移动线
                                const lL = this.getTranslatePos(this.elSelectedLines.l.style.translate);
                                this.elSelectedLines.l.style.translate = `${lL.x}px ${lL.y - offset}px`;
                                const lT = this.getTranslatePos(this.elSelectedLines.t.style.translate);
                                this.elSelectedLines.t.style.translate = `${lT.x}px ${lT.y - offset}px`;
                                const lR = this.getTranslatePos(this.elSelectedLines.r.style.translate);
                                this.elSelectedLines.r.style.translate = `${lR.x}px ${lR.y - offset}px`;
                                const lB = this.getTranslatePos(this.elSelectedLines.b.style.translate);
                                this.elSelectedLines.b.style.translate = `${lB.x}px ${lB.y - offset}px`;
                                // 移动顶点
                                const vTL = this.getTranslatePos(this.elSelectedVectors.tl.style.translate);
                                this.elSelectedVectors.tl.style.translate = `${vTL.x}px ${vTL.y - offset}px`;
                                const vTR = this.getTranslatePos(this.elSelectedVectors.tr.style.translate);
                                this.elSelectedVectors.tr.style.translate = `${vTR.x}px ${vTR.y - offset}px`;
                                const vBL = this.getTranslatePos(this.elSelectedVectors.bl.style.translate);
                                this.elSelectedVectors.bl.style.translate = `${vBL.x}px ${vBL.y - offset}px`;
                                const vBR = this.getTranslatePos(this.elSelectedVectors.br.style.translate);
                                this.elSelectedVectors.br.style.translate = `${vBR.x}px ${vBR.y - offset}px`;
                            }
                        }
                        break;
                    case "width":
                        eventType = "resize_width";
                        this.registered[id].el.style.width = `${value}px`;
                        numbValue = parseFloat(value);
                        offset = this.registered[id].width - numbValue;
                        this.registered[id].width = numbValue;
                        if (this.selected.ids.length > 0) {
                            if (this.selected.ids.indexOf(id) > -1) {
                                this.selected.width = this.selected.width - offset;
                                // 移动线
                                this.elSelectedLines.t.style.width = `${parseFloat(this.elSelectedLines.t.style.width) - offset}px`;
                                this.elSelectedLines.b.style.width = `${parseFloat(this.elSelectedLines.b.style.width) - offset}px`;
                                const lR = this.getTranslatePos(this.elSelectedLines.r.style.translate);
                                this.elSelectedLines.r.style.translate = `${lR.x - offset}px ${lR.y}px`;
                                // 移动顶点
                                const vTR = this.getTranslatePos(this.elSelectedVectors.tr.style.translate);
                                this.elSelectedVectors.tr.style.translate = `${vTR.x - offset}px ${vTR.y}px`;
                                const vBR = this.getTranslatePos(this.elSelectedVectors.br.style.translate);
                                this.elSelectedVectors.br.style.translate = `${vBR.x - offset}px ${vBR.y}px`;
                            }
                        }
                        break;
                    case "height":
                        eventType = "resize_height";
                        this.registered[id].el.style.height = `${value}px`;
                        numbValue = parseFloat(value);
                        offset = this.registered[id].height - numbValue;
                        this.registered[id].height = numbValue;
                        if (this.selected.ids.length > 0) {
                            if (this.selected.ids.indexOf(id) > -1) {
                                this.selected.height = this.selected.height - offset;
                                // 移动线
                                this.elSelectedLines.l.style.height = `${parseFloat(this.elSelectedLines.l.style.height) - offset}px`;
                                this.elSelectedLines.r.style.height = `${parseFloat(this.elSelectedLines.r.style.height) - offset}px`;
                                const lB = this.getTranslatePos(this.elSelectedLines.b.style.translate);
                                this.elSelectedLines.b.style.translate = `${lB.x}px ${lB.y - offset}px`;
                                // 移动顶点
                                const vBL = this.getTranslatePos(this.elSelectedVectors.bl.style.translate);
                                this.elSelectedVectors.bl.style.translate = `${vBL.x}px ${vBL.y - offset}px`;
                                const vBR = this.getTranslatePos(this.elSelectedVectors.br.style.translate);
                                this.elSelectedVectors.br.style.translate = `${vBR.x}px ${vBR.y - offset}px`;
                            }
                        }
                        break;
                }
                const customEvent = new CustomEvent('onChange', {
                    detail: {
                        id,
                        type: eventType,
                        x: this.registered[id].x,
                        y: this.registered[id].y,
                        width: this.registered[id].width,
                        height: this.registered[id].height,
                    },
                });
                this.dispatchEvent(customEvent);
            });
        });
    }
    init() {
        const template = document.createElement('template');
        template.innerHTML = this.renderHtml();
        this.shadowRoot?.append(template.content);
        this.onSlotChange();
        this.handleClick();
        this.initKeyboardEvents();
        if (this.isModifyOutside) {
            this.listenItemEvents();
        }
    }
}
// register component
customElements.define('glide-dnr', GlideDNR);const properties = ["left", "top", "width", "height"];
// 通过 _window 获取全局参数
// const _window = window as any
// 为避免自定义组件与 web component 组件名称冲突，所有组件默认加上 V 前缀
// 例如：Image -> VImage，html tag 将转换成 v-image
class GlideDNRItem extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return properties;
    }
    constructor() {
        super();
        Object.defineProperty(this, "els", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        this.attachShadow({ mode: 'open' });
        this.init = this.init.bind(this);
    }
    // connect component
    connectedCallback() {
        this.init();
    }
    // attribute change
    attributeChangedCallback(prop, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        let type = "";
        switch (prop) {
            case "left":
                type = 'left';
                break;
            case "top":
                type = 'top';
                break;
            case "width":
                type = 'width';
                break;
            case "height":
                type = 'height';
                break;
        }
        if (type !== "") {
            eventBus.emit("onItemChange", {
                id: this.id,
                type,
                value: newValue
            });
        }
    }
    disconnectedCallback() {
        // console.log('disconnected');
    }
    adoptedCallback() {
        // console.log('adopted');
    }
    renderHtml() {
        return /*html*/ `
      <slot></slot>

      <style>
        :host {
          display: inline-block;
          visibility: hidden;
          display: inline-block;
          flex-shrink: 0;
          user-select: none;
          cursor: auto;
          position: absolute;
          translate: 0px 0px;
        }
      </style>
    `;
    }
    /**
     * 一次性绑定元素，后期直接使用
     */
    init() {
        const template = document.createElement('template');
        template.innerHTML = this.renderHtml();
        this.shadowRoot?.append(template.content);
        this.onceBindings();
    }
    /**
     * 一次性绑定元素，后期直接使用
     */
    onceBindings() {
        const root = this.shadowRoot;
        if (root === null)
            return;
        const el = root.querySelector(".glide-dnr_item");
        if (el !== undefined) {
            this.els.container = el;
        }
    }
}
// register component
customElements.define('glide-dnr-item', GlideDNRItem);export{GlideDNR,GlideDNRItem};