const { Schema, model } = require('mongoose')

const urlSchema = new Schema({
	fullUrl: String,
	shrinkUrl: String
})

module.exports = model('Url', urlSchema)

