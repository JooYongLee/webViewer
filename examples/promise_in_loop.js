

const asyncFun5000 = (callback) => setTimeout( () => callback({name:"asyncFun5000"}), 5000)
const asyncFun4000 = (callback) => setTimeout( () => callback({name:"asyncFun4000"}), 4000)
const asyncFun3000 = (callback) => setTimeout( () => callback({name:"asyncFun3000"}), 3000)
const asyncFun2000 = (callback) => setTimeout( () => callback({name:"asyncFun2000"}), 2000)
const asyncFun1000 = (callback) => setTimeout( () => callback({name:"asyncFun1000"}), 1000)

const promiseFun1 = (callback) => {
    return new Promise((resolve, reject) => {
        callback( (val) => {
            resolve(val)
        })
    })
}
const randomInt = (range) => (parseInt((Math.random() * 1e15)) % range)


const callbacks = [
    asyncFun1000,
    asyncFun2000,
    asyncFun3000,
    asyncFun4000,
    asyncFun5000,
]
const documents = []
// Promise.all()
const promiseAll = []
for(var i = 0; i< 10; i++){
    var index = randomInt(5)

    // promiseAll.push(     
    //     promiseFun1(callbacks[index]).then( x => x) )

    promiseAll.push(     
        promiseFun1(callbacks[index]).then( x => {
            // console.log(x)
            documents.push(x)
            return x
        }) )
    
}

console.log(promiseAll)

Promise.all(promiseAll).then( x => console.log(x, documents))
