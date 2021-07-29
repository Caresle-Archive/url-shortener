require('dotenv').config()
const uri = process.env.MONGO_URI
const mongoose = require('mongoose')

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
	console.log('We\'re connected')
})