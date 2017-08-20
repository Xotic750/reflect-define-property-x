/**
 * @file Sham for Reflect.defineProperty
 * @version 1.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-define-property-x
 */

'use strict';

var hasReflect = require('has-reflect-support-x');
var reflectDefineProperty = hasReflect && Reflect.defineProperty;
if (reflectDefineProperty) {
  try {
    var obj = {};
    if (reflectDefineProperty(obj, 'x', { value: 7 }) !== true || obj.x !== 7) {
      throw new Error('Inavlid result');
    }
  } catch (ignore) {
    reflectDefineProperty = null;
  }
}

if (Boolean(reflectDefineProperty) === false) {
  var assertIsObject = require('assert-is-object-x');
  var $defineProperty = require('object-define-property-x');
  reflectDefineProperty = function defineProperty(target, propertyKey, attributes) {
    assertIsObject(target);
    try {
      $defineProperty(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  };
}

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
 * @returns {Object} A Boolean indicating whether or not the property was successfully defined.
 * @example
 * var reflectDefineProperty = require('reflect-define-property-x');
 * var obj = {};
 * reflectDefineProperty(obj, 'x', {value: 7}); // true
 * obj.x; // 7
 */
module.exports = reflectDefineProperty;
