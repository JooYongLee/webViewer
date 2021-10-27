async function foo(bar){
    const a = await new Promise( resolve => setTimeout(() => resolve(bar), 100))
    const b = await new Promise( resolve => setTimeout(() => resolve(a + 1), 200))
    const c = await new Promise( resolve => setTimeout(() => resolve(b + 2), 500))
    console.log([a, b, c])
    return c
}
// tick 800ms
foo(10).then( v => console.log(v))
// console.log(val)

async function foo1(bar){
    const res = await Promise.all([
        new Promise( (resolve, reject) => setTimeout(() => resolve(bar), 100)),
        new Promise( (resolve, reject) => setTimeout(() => resolve(bar + 1), 200)),
        new Promise( (resolve, reject) => setTimeout(() => resolve(bar + 2), 500)),
// 
    ])
    // 
    console.log(res)
    // return c
}
// tick 500ms
foo1(2)