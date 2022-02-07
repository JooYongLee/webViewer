const delay = 2000
const foo1 = (val) => {
    return new Promise((resolve, reject) => {
        console.log("foo1", val)
        setTimeout(() => resolve(val+1), delay)
    })
}

const foo2 = (val) => {
    return new Promise((resolve, reject) => {
        console.log("foo2", val)
        throw new Error("test erorr in foo2")
        setTimeout(() => resolve(val+1), delay)
    })
}

const foo3 = (val) => {
    return new Promise((resolve, reject) => {
        console.log("foo3", val)

        setTimeout(() => resolve(val+1), delay)
    })
}
// async funtion abc(){

// }

async function runsync(val){
    const res1 = await foo1(val)
    const res2 = await foo2(res1)
    const res3 = await foo3(res2)
    return res3
}

// runsync(10).then( res => console.log(res))

async function runSyncList(asyncFuncs, val){
    let final = []
    let res, prev;
    prev = val
    res = val

    // prev = await asyncFuncs[0](val)
    // prev = await asyncFuncs[1](prev)
    for(const func of asyncFuncs){
        res = await func(res)
        console.log("[for][foo]", res)
    }
    return final
}
runSyncList([foo1, foo2, foo3], 10).then( res => console.log(res)).catch( err => console.error(err))