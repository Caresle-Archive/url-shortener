const { Schema, model } = require('mongoose')
const shortId = require('shortid')

const urlSchema = new Schema({
	fullUrl: {
		type: String,
		required: true
	},
	shrinkUrl: {
		type: String,
		required: true,
		default: shortId.generate
	}
})

module.exports = model('Url', urlSchema)

