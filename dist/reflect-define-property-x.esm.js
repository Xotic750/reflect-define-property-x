var _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import attempt from 'attempt-x';
import assertIsObject from 'assert-is-object-x';
import $defineProperty from 'object-define-property-x';
import objectKeys from 'object-keys-x';
import arrayIncludes from 'array-includes-x';
import has from 'has-own-property-x';
import getOwnPropertyDescriptor from 'object-get-own-property-descriptor-x';
import some from 'array-some-x';
/** @type {BooleanConstructor} */

var castBoolean = true.constructor;
var testObj = $defineProperty({}, 'test', {
  configurable: true,
  enumerable: true,
  value: 'Testing',
  writable: false
});
var res = attempt(function () {
  _newArrowCheck(this, _this);

  testObj.test = true;
}.bind(this));
var supportsWritable = res.threw || testObj.test === 'Testing';
testObj = $defineProperty({}, 'test', {
  configurable: true,
  enumerable: false,
  value: 'Testing',
  writable: true
});
var supportsEnumerable = arrayIncludes(objectKeys(testObj), 'test') === false;
testObj = $defineProperty({}, 'test', {
  configurable: false,
  enumerable: true,
  value: 'Testing',
  writable: true
});
res = attempt(function () {
  _newArrowCheck(this, _this);

  delete testObj.test;
}.bind(this));
var supportsConfigurable = res.threw || testObj.test === 'Testing';

var toComparableDescriptor = function _toComparableDescriptor(desc) {
  var descriptor = {};

  if (supportsEnumerable) {
    descriptor.enumerable = castBoolean(desc.enumerable);
  }

  if (supportsConfigurable) {
    descriptor.configurable = castBoolean(desc.configurable);
  }

  if (has(desc, 'value')) {
    descriptor.value = desc.value;
  }

  if (supportsWritable) {
    descriptor.writable = castBoolean(desc.writable);
  }

  if (has(desc, 'get') || has(desc, 'set')) {
    descriptor.get = desc.get;
    descriptor.set = desc.set;
  }

  return descriptor;
};

var areDescriptorsEqual = function _areDescriptorsEqual(actualObj, atributesObj, propertyKey) {
  var _this2 = this;

  var actual = toComparableDescriptor(getOwnPropertyDescriptor(actualObj, propertyKey));
  var requested = toComparableDescriptor(atributesObj);
  var actualKeys = objectKeys(actual);

  if (actualKeys.length !== objectKeys(requested).length) {
    return false;
  }

  return some(actualKeys, function (key) {
    _newArrowCheck(this, _this2);

    return actual[key] !== requested[key];
  }.bind(this)) === false;
};
/**
 * This method allows precise addition to or modification of a property on an object.
 * For more details see the Object.defineProperty which is similar.
 * Object.defineProperty returns the object or throws a TypeError if the property
 * has not been successfully defined. Reflect.defineProperty, however, simply returns
 * a Boolean indicating whether or not the property was successfully defined.
 *
 * @param {*} target - The target object on which to define the property.
 * @param {*} propertyKey - The name of the property to be defined or modified.
 * @param {*} attributes - The attributes for the property being defined or modified.
 * @throws {TypeError} If target is not an Object.
 * @returns {object} A Boolean indicating whether or not the property was successfully defined.
 */


var defineProperty = function defineProperty(target, propertyKey, attributes) {
  assertIsObject(target);
  var result = attempt($defineProperty, target, propertyKey, attributes);

  if (result.threw) {
    return false;
  }

  return areDescriptorsEqual(result.value, attributes, propertyKey);
};

export default defineProperty;

//# sourceMappingURL=reflect-define-property-x.esm.js.map