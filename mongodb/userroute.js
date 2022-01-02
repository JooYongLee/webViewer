import express from 'express'

export default function userRoute(app) {
	const router = express.Router()
	router.get('/name', (req, res) => {
        res.send({
            id: "this is good something"
        })
    })
	router.post('/name', (req, res) => {
        res.send( "good")
    })

	app.use('/user', router)
}
