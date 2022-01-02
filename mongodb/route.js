import express from 'express'
import * as methods from './methods.js'
const router = express.Router()

/**
 * 
 * @param {express.request} req 
 * @param {express.response} res 
 */
const testsave = (req, res) => {
    console.log(req.body)
    res.send({message: 'success'})
}
export default function initRoute(app) {
    // console.log("routing...")
    router.post('/', methods.write)
    router.get('/', methods.list)
    router.post('/update/:id', methods.update)
    router.get('/delete/:id', methods.remove)
    router.get('/:id', methods.read)
    // router.post('/delete', methods.deletePost)
    // router.get('/save', methods.save)

    // router.get('', (req, res)=>{
    //     req.
    // })
    // app.use()
    app.use( router )
}