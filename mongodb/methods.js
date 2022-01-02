
import Post from './post.js'
import Joi from 'joi'
// export const delete = (req, res) => {
//     console.log('delete')

//     res.send('yes')

// }
export const remove = (req, res) => {
        // console.log('delete')
    const { id } = req.params
    console.log("id", id)

    Post.findByIdAndRemove( id )
    .then( 
        // 성공했지만 응답할 데이터는 없음
        res.status( 204 ).send()
    )
    .catch( e => {
        res.status(400).send({message: 'cannnot founed id'})
    })
}

export const update = (req, res) => {
    const {id} = req.params
    console.log("post:", req.body)
    Post.findByIdAndUpdate( id, req.body, { new:true})
    .then( val =>{
        console.log("update:\n", val)
        res.send('ok update')
    })
    .catch( e => {
        console.log(e)
        res.status(500).send( {message:'update failed'})
    })
    // Post.findByIdAndUpdate
}

export const write = async (req, res) => {
    // Joi.object().
    const {title, body, tags} = req.body

    // const shcema = Joi.object
    console.log(req.body)
    const post = new Post({
        title,
        body,
        tags
    })

    try {
        await post.save()
        res.send('scuess write')
    } catch {
        res.status(500).send({message:'failed'})
    }
    // res.send('yes')
}

export const list = (req, res) => {
    // res.send('yes')
    console.log("list")
    Post.find().then( posts => res.send( posts))
}

export const read = (req, res) => {
    const { id } = req.params
    console.log("read", id)
    Post.findById( id )
    .then( val => {
        res.send(val.toObject())
    })
    .catch( e => {
        res.status(400).send( {message: "failed id"})
    })
}