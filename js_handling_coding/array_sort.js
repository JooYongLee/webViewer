const foo = [5, 3, 10, 0]

// const res = foo.sort()
const res = foo

console.log(res)
console.log(foo)
const res1 = foo.sort( (first, second) => second - first)
console.log(res1)

const res2 = foo.find( (val, idx) => {console.log(val, idx); return val < 7})

console.log(res2)

