//require packages used in the project
const express = require('express')
const expbhs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

//setting template engine
app.engine('handlebars', expbhs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Listening  on http://localhost:${port}`)
})
