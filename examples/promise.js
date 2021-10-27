
import xmlhttprequest from 'xmlhttprequest'
new Promise(resolve => resolve("fulfiled"))
    .then(v => console.log(v), e => console.error(e))



// new Promise((resolve, reject) => reject(new Error("rejected")))
// .then( v => console.log(v), e => console.error(e))

// new Promise((resolve, reject) => reject(new Error("rejected")))
// .then( v =>console.log("reolve", v))
// .catch( e => console.log(e))
// .finally( () => console.log("finally"))
// console.log("-->",XMLHttpRequest.XMLHttpRequest)
var XMLHttpRequest = xmlhttprequest.XMLHttpRequest
// console.log( new XMLHttpRequest())
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.send()

        xhr.onload = () => {
            if (xhr.status === 200) {
                // console.log(xhr.responseText)
                resolve(JSON.parse(xhr.responseText))
            }
            else {
                reject(new Error(xhr.status))
            }
        }
    })
}
promiseGet("https://jsonplaceholder.typicode.com/posts/1")
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log("Bye!"))

const url = "https://jsonplaceholder.typicode.com"
const abc = undefined


const delayFun = (value) => setTimeout(() => { console.log("delayFun", value) }, 1000)
const immdeiateFun1 = () => setTimeout(() => console.log("immdeiateFun1"), 20)
const immdeiateFun2 = () => setTimeout(() => console.log("immdeiateFun2"), 1)

const delayFun1 = (val) => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("value=====>", val)
        resolve("immdeiateFun1")
    }, 20)
})

const delayFun2 = (val) => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("value=====>", val)
        resolve("immdeiateFun2")
    }, 20)
})
    // const delayFun2 =  (val) => new Promise((resolve, reject) => {setTimeout(() => 
    //     console.log("val", val) resolve("immdeiateFun2")}, 1))
    // delayFun()
promiseGet(`${url}/posts/1`)
    .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
    .then(userInfo => console.log(userInfo))
    .then( delayFun1 )
    .then( delayFun2 )
    // .then( delayFun1 )
    .then(delayFun)
    .then(immdeiateFun1)
    .then(immdeiateFun2)
    .catch(err => console.error(err))
    .finally(() => console.log("Bye2!"))