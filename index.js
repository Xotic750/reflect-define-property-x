/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/reflect-define-property-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/reflect-define-property-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/reflect-define-property-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/reflect-define-property-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/reflect-define-property-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/reflect-define-property-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/reflect-define-property-x" title="npm version">
 * <img src="https://badge.fury.io/js/reflect-define-property-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Sham for Reflect.defineProperty.
 *
 * Requires ES3 or above.
 *
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-define-property-x
 */

/* eslint strict: 1, max-statements: 1, id-length: 1 */

/* global module */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var hasReflect = require('has-reflect-support-x');
  var assertIsObject = require('assert-is-object-x');
  var $defineProperty = require('object-define-property-x');
  var reflectDefineProperty = hasReflect && Reflect.defineProperty;

  if (!reflectDefineProperty) {
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
   * @param {*} target The target object on which to define the property.
   * @param {*} propertyKey The name of the property to be defined or modified.
   * @param {*} attributes The attributes for the property being defined or modified.
   * @throws {TypeError} If target is not an Object.
   * @return {Object} A Boolean indicating whether or not the property was successfully defined.
   * @example
   * var reflectDefineProperty = require('reflect-define-property-x');
   * var obj = {};
   * reflectDefineProperty(obj, 'x', {value: 7}); // true
   * obj.x; // 7
   */
  module.exports = reflectDefineProperty;
}());
