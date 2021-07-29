require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001

const Url = require('./models/Url')

require('./db')

app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.get('/favicon.ico', (req, res) => res.status(204).end())

app.get('/', async (req, res) => {
	const urls = await Url.find({}).lean()
	res.render('index', {
		url: urls
	})
})

app.post('/shrinkUrl', async (req, res) => {
	await Url.create({ fullUrl: req.body.fullUrl })
	res.redirect('/')
})

app.get('/:shrinkUrl', async (req, res) => {
	const url = await Url.findOne({shrinkUrl: req.params.shrinkUrl})
	res.redirect(url.fullUrl)
})

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})