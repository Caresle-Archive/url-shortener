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

app.get('/', async (req, res) => {
	const urls = await Url.find()
	console.log(...urls)
	res.render('index', {
		url: [...urls]
	})
})

app.post('/shrink', (req, res) => {
	const newUrl = Url({ fullUrl: req.body.fullUrl })
	newUrl.save().then(() => console.log('saved'))
	res.redirect('/')
})

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})