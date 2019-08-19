import attempt from 'attempt-x';
import assertIsObject from 'assert-is-object-x';
import $defineProperty from 'object-define-property-x';
import objectKeys from 'object-keys-x';
import arrayIncludes from 'array-includes-x';
import has from 'has-own-property-x';
import getOwnPropertyDescriptor from 'object-get-own-property-descriptor-x';
import some from 'array-some-x';
import toBoolean from 'to-boolean-x';

const testSupportsWritable = function testSupportsWritable() {
  const testObj = $defineProperty({}, 'test', {
    configurable: true,
    enumerable: true,
    value: 'Testing',
    writable: false,
  });

  const res = attempt(function attemptee() {
    testObj.test = true;
  });

  return res.threw || testObj.test === 'Testing';
};

const supportsWritable = testSupportsWritable();

const testSupportsEnumerable = function testSupportsEnumerable() {
  const testObj = $defineProperty({}, 'test', {
    configurable: true,
    enumerable: false,
    value: 'Testing',
    writable: true,
  });

  return arrayIncludes(objectKeys(testObj), 'test') === false;
};

const supportsEnumerable = testSupportsEnumerable();

const testSupportsConfigurable = function testSupportsConfigurable() {
  const testObj = $defineProperty({}, 'test', {
    configurable: false,
    enumerable: true,
    value: 'Testing',
    writable: true,
  });

  const res = attempt(function attemptee() {
    delete testObj.test;
  });

  return res.threw || testObj.test === 'Testing';
};

const supportsConfigurable = testSupportsConfigurable();

const toComparableDescriptor = function toComparableDescriptor(desc) {
  const descriptor = {};

  if (supportsEnumerable) {
    descriptor.enumerable = toBoolean(desc.enumerable);
  }

  if (supportsConfigurable) {
    descriptor.configurable = toBoolean(desc.configurable);
  }

  if (has(desc, 'value')) {
    descriptor.value = desc.value;
  }

  if (supportsWritable) {
    descriptor.writable = toBoolean(desc.writable);
  }

  if (has(desc, 'get') || has(desc, 'set')) {
    descriptor.get = desc.get;
    descriptor.set = desc.set;
  }

  return descriptor;
};

const areDescriptorsEqual = function areDescriptorsEqual(obj) {
  const {actualObj, attributesObj, propertyKey} = obj;
  const actual = toComparableDescriptor(getOwnPropertyDescriptor(actualObj, propertyKey));
  const requested = toComparableDescriptor(attributesObj);
  const actualKeys = objectKeys(actual);

  if (actualKeys.length !== objectKeys(requested).length) {
    return false;
  }

  return (
    some(actualKeys, function iteratee(key) {
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
 */
const defineProperty = function defineProperty(target, propertyKey, attributes) {
  assertIsObject(target);
  const result = attempt($defineProperty, target, propertyKey, attributes);

  if (result.threw) {
    return false;
  }

  return areDescriptorsEqual({actualObj: result.value, attributesObj: attributes, propertyKey});
};

export default defineProperty;
