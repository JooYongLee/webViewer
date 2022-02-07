
// https://medium.com/@hongkevin/js-5-es6-map-set-2a9ebf40f96b

const firms = new Map()
    .set(10, 'foo')

console.log(firms)
console.log(firms.get(10))
console.log(firms.get("abc"))
// firms.s')

let setA = new Set();
setA.add('a');
setA.add('b');
setA.add('a');
const someval = [1, 2, 3]
setA.add(someval);
console.log([...setA.keys()]); // ['a', 'b']
console.log([...setA.values()]); // ['a', 'b']
console.log(setA)
console.log(setA.has('a'))
console.log(setA.has('12'))
console.log(setA.has([]))
console.log(setA.has([1, 2, 3]))
console.log(setA.has(someval))
