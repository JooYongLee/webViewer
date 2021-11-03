

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
// for(var i = 0; i < 10; i++)
//     console.log(randomInt(4))
// asyncFun10( (val) => console.log(val))
// promiseFun1(asyncFun1000).then( x => console.log(x))
// promiseFun1(asyncFun2000).then( x => console.log(x))
// promiseFun1(asyncFun3000).then( x => console.log(x))

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
// var testPromise = [
//     promiseFun1(asyncFun1000),
//     promiseFun1(asyncFun2000),
//     promiseFun1(asyncFun3000),
// ]

// console.log(testPromise)
console.log(promiseAll)
// Promise.all(testPromise).then( x => console.log(x))

Promise.all(promiseAll).then( x => console.log(x, documents))


// console.log(promiseAll)
// Promise.all(promiseAll, ()=>console.log("============= fianal", documents))
// console.log(documents)
// const delayFun1 = (val) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("value=====>", val)
//         resolve("immdeiateFun1")
//     }, 20)
// })

// const delayFun2 = (val) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("value=====>", val)
//         resolve("immdeiateFun2")
//     }, 20)
// })
//     // const delayFun2 =  (val) => new Promise((resolve, reject) => {setTimeout(() => 
//     //     console.log("val", val) resolve("immdeiateFun2")}, 1))
//     // delayFun()
// promiseGet(`${url}/posts/1`)
//     .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
//     .then(userInfo => console.log(userInfo))
//     .then( delayFun1 )
//     .then( delayFun2 )
//     // .then( delayFun1 )
//     .then(delayFun)
//     .then(immdeiateFun1)
//     .then(immdeiateFun2)
//     .catch(err => console.error(err))
//     .finally(() => console.log("Bye2!"))