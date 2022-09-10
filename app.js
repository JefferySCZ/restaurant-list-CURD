//require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const expbhs = require('express-handlebars')
const Restaurant = require('./models/Restaurant')
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

//setting template engine
app.engine('handlebars', expbhs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//routes  setting
/// main page
app.get('/', (req, res) => {
  Restaurant.find() // get all data from Restaurant model
    .lean() // change mongoose 's model object to clean JS array
    .then((restaurantsData) => res.render('index', { restaurantsData }))
    .catch((err) => console.log(err))
})

//write in new restaurant in index
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// get the details of restaurants
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantsData) => res.render('details', { restaurantsData }))
    .catch((err) => console.log(err))
})

// Create a new restaurant
app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body) // take data from req.body
    .then(() => res.redirect('/')) // back to main page after create
    .catch((err) => console.log(err))
})

// Edit a restaurant detail
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantsData) => res.render('edit', { restaurantsData }))
    .catch((err) => console.log(err))
})

// Update Restaurant details
app.post('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch((err) => console.log(err))
})

// Delete Restaurant
app.post('/restaurants/:restaurantId/delete', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndDelete(restaurantId)
    .then((restaurantsData) => restaurantsData.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

//search routes
app.get('/search/', (req, res) => {
  const keyword = req.query.keyword.trim()

  Restaurant.find()
    .lean()
    .then((restaurantsData) => {
      const filterRestaurantsData = restaurantsData.filter((data) =>
        data.name.toLowerCase().includes(keyword)
      )
      res
        .render('index', { restaurantsData: filterRestaurantsData, keyword })
        .catch((err) => console.log(err))
    })
})

app.listen(port, () => {
  console.log(`Listening  on http://localhost:${port}`)
})
