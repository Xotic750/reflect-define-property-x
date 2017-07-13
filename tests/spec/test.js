'use strict';

var reflectDefineProperty;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  reflectDefineProperty = require('../../index.js');
} else {
  reflectDefineProperty = returnExports;
}

var ifExtensionsPreventibleIt = Object.preventExtensions ? it : xit;

describe('reflectDefineProperty', function () {
  it('is a function', function () {
    expect(typeof reflectDefineProperty).toBe('function');
  });

  it('throws if the target isn’t an object', function () {
    expect(function () {
      return reflectDefineProperty(void 0, 'prop', { value: true });
    }).toThrow();

    expect(function () {
      return reflectDefineProperty(null, 'prop', { value: true });
    }).toThrow();

    expect(function () {
      return reflectDefineProperty(1, 'prop', { value: true });
    }).toThrow();

    expect(function () {
      return reflectDefineProperty('', 'prop', { value: true });
    }).toThrow();

    expect(function () {
      return reflectDefineProperty(true, 'prop', { value: true });
    }).toThrow();
  });

  ifExtensionsPreventibleIt('returns false for non-extensible objects', function () {
    var o = Object.preventExtensions({});

    expect(reflectDefineProperty(o, 'prop', {})).toBe(false);
  });

  it('can return true, even for non-configurable, non-writable properties', function () {
    var o = {};
    var desc = {
      configurable: false,
      enumerable: false,
      value: 13,
      writable: false
    };

    expect(reflectDefineProperty(o, 'prop', desc)).toBe(true);

    // Defined as non-configurable, but descriptor is identical.
    expect(reflectDefineProperty(o, 'prop', desc)).toBe(true);

    desc.value = 37; // Change

    expect(reflectDefineProperty(o, 'prop', desc)).toBe(false);
  });

  it('can change from one property type to another, if configurable', function () {
    var o = {};

    var desc1 = {
      configurable: true,
      set: function () {}
    };

    var desc2 = {
      configurable: false,
      value: 13
    };

    var desc3 = {
      get: function () {
        return void 0;
      }
    };

    expect(reflectDefineProperty(o, 'prop', desc1)).toBe(true);

    expect(reflectDefineProperty(o, 'prop', desc2)).toBe(true);

    expect(reflectDefineProperty(o, 'prop', desc3)).toBe(false);
  });
});
