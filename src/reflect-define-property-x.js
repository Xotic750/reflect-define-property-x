/**
 * @file Sham for Reflect.defineProperty.
 * @version 2.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-define-property-x
 */

const attempt = require('attempt-x');
const assertIsObject = require('assert-is-object-x');
const $defineProperty = require('object-define-property-x');
const objectKeys = require('attempt-x');
const arrayIncludes = require('array-includes-x');
const has = require('has-own-property-x');
const getOwnPropertyDescriptor = require('object-get-own-property-descriptor-x');
const some = require('array-some-x');

let testObj = $defineProperty({}, 'test', {
  configurable: true,
  enumerable: true,
  value: 'Testing',
  writable: false,
});

let res = attempt(function() {
  testObj.test = true;
});

const supportsWritable = res.threw || testObj.test === 'Testing';

testObj = $defineProperty({}, 'test', {
  configurable: true,
  enumerable: false,
  value: 'Testing',
  writable: true,
});

const supportsEnumerable = arrayIncludes(objectKeys(testObj), 'test') === false;

testObj = $defineProperty({}, 'test', {
  configurable: false,
  enumerable: true,
  value: 'Testing',
  writable: true,
});

res = attempt(function() {
  delete testObj.test;
});

const supportsConfigurable = res.threw || testObj.test === 'Testing';

const toComparableDescriptor = function _toComparableDescriptor(desc) {
  const descriptor = {};

  if (supportsEnumerable) {
    descriptor.enumerable = Boolean(desc.enumerable);
  }

  if (supportsConfigurable) {
    descriptor.configurable = Boolean(desc.configurable);
  }

  if (has(desc, 'value')) {
    descriptor.value = desc.value;
  }

  if (supportsWritable) {
    descriptor.writable = Boolean(desc.writable);
  }

  if (has(desc, 'get')) {
    descriptor.get = desc.get;
  }

  if (has(desc, 'set')) {
    descriptor.set = desc.set;
  }

  return descriptor;
};

const areDescriptorsEqual = function _areDescriptorsEqual(actualObj, atributesObj, propertyKey) {
  const actual = toComparableDescriptor(getOwnPropertyDescriptor(actualObj, propertyKey));
  const requested = toComparableDescriptor(atributesObj);
  const actualKeys = objectKeys(actual);

  if (actualKeys.length !== objectKeys(requested).length) {
    return false;
  }

  return (
    some(actualKeys, function(key) {
      return actual[key] !== requested[key];
    }) === false
  );
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
 * @example
 * var nativeDP = require('reflect-define-property-x');
 * var obj = {};
 * nativeDP(obj, 'x', {value: 7}); // true
 * obj.x; // 7
 */
module.exports = function defineProperty(target, propertyKey, attributes) {
  assertIsObject(target);
  const result = attempt($defineProperty, target, propertyKey, attributes);

  if (result.threw) {
    return false;
  }

  return areDescriptorsEqual(result.value, attributes, propertyKey);
};
