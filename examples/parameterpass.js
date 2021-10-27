const fun1 = (res, req) => {
    console.log("fun1", res, req)
}

const fun2 = ({res, req}) => {
    console.log("fun2", res, req)
}


fun1(10, 20)
fun2(10, 20)
fun2({res:10})
fun2({req:10})