const uri = process.env.MONGO_URI
const mongoose = require('mongoose')

mongoose.connect(uri)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
	console.log('We\'re connected')
})