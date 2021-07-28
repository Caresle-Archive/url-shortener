require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001

app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
	res.render('index', {
		url: [
			{
				fullUrl: 'https://www.google.com',
				shrinkUrl: '0000'
			},
			{
				fullUrl: 'https://www.youtube.com',
				shrinkUrl: 'tttt' 
			}
		]
	})
})

app.post('/shrink', (req, res) => {
	res.status(200).end()
})

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})