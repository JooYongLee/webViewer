// An object without Symbol.toPrimitive property.
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ''); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 10;
    }
    if (hint == 'string') {
      return 'hello';
    }
    return true;
  }
};

console.log(+obj2);     // 10        -- hint is "number"
console.log(`${obj2}`); // "hello"   -- hint is "string"
console.log(obj2 + ''); // "true"    -- hint is "default"

class SomeObj{
    constructor(){
        this.name = ''
        this.old = 0
    }
}

/**
 * https://stackoverflow.com/questions/6460604/how-to-describe-object-arguments-in-jsdoc/31573441
 * https://jsdoc.app/tags-type.html 
 */

/**
 * @param {Object.<string, SomeObj>} dict
 */
function foo(dict){
    // dict.some.
}