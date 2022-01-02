import mongoose from 'mongoose'
const BASE_COLLECTION_NAME = 'dbapi'

const dburl = 'mongodb://localhost:27017/' + BASE_COLLECTION_NAME;

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => { console.log('connected to MongoDB')})
.catch( e => { console.error(e)})