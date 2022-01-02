import Joi from 'joi'

const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    old: Joi.number().required()
})

const foo = {
    title: "yosi",
    body: "this is",
    old: 'sdfd'
}


const result = schema.validate( foo )
// Joi.
// const result =  Joi.validate( foo, schema)

if( result.error ){
    console.log(result.error)
} else {
    console.log( result.value )
}