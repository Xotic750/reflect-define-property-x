<a
  href="https://travis-ci.org/Xotic750/reflect-define-property-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/reflect-define-property-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/reflect-define-property-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/reflect-define-property-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/reflect-define-property-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/reflect-define-property-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/reflect-define-property-x"
  title="npm version">
<img src="https://badge.fury.io/js/reflect-define-property-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/reflect-define-property-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/reflect-define-property-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/reflect-define-property-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/reflect-define-property-x?branch=master"
  alt="bettercodehub score" height="18">
</a>

<a name="module_reflect-define-property-x"></a>

## reflect-define-property-x

Sham for Reflect.defineProperty

<a name="exp_module_reflect-define-property-x--module.exports"></a>

### `module.exports(target, propertyKey, attributes)` ⇒ <code>Object</code> ⏏

This method allows precise addition to or modification of a property on an object.
For more details see the Object.defineProperty which is similar.
Object.defineProperty returns the object or throws a TypeError if the property
has not been successfully defined. Reflect.defineProperty, however, simply returns
a Boolean indicating whether or not the property was successfully defined.

**Kind**: Exported function  
**Returns**: <code>Object</code> - A Boolean indicating whether or not the property was successfully defined.  
**Throws**:

- <code>TypeError</code> If target is not an Object.

| Param       | Type            | Description                                                |
| ----------- | --------------- | ---------------------------------------------------------- |
| target      | <code>\*</code> | The target object on which to define the property.         |
| propertyKey | <code>\*</code> | The name of the property to be defined or modified.        |
| attributes  | <code>\*</code> | The attributes for the property being defined or modified. |

**Example**

```js
import reflectDefineProperty from 'reflect-define-property-x';

const obj = {};
reflectDefineProperty(obj, 'x', {value: 7}); // true
console.log(obj.x); // 7
```
