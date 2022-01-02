import express from 'express'
import bodyParser from 'body-parser'

import './mongo.js'
// import {} from './mongo.js'
import initRoute from './route.js'
import userRoute from './userroute.js'
const app = express()

const port = 3000

// https://velog.io/@yejinh/express-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-bodyParser-%EB%AA%A8%EB%93%88
// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false} ))

// parse application/json
app.use( bodyParser.json() )

// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.post('/test', (req, res) => {
    // console.log(req.body)
    // console.log(Object.keys(req))
    // console.log(Object.keys(req))
    // console.log(req.data)
    // console.log(req.headers)
    console.log(req.body)
    // console.log(req)
    res.send('sucess')
})

initRoute(app)
userRoute(app)
var server = app.listen(port, () => {
    console.log(`express server start on port ${port}`)
})