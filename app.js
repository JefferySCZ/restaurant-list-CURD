//require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const expbhs = require('express-handlebars')
const Restaurant = require('./models/Restaurant')

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

//require json
const restaurantList = require('./restaurant.json').results

//setting template engine
app.engine('handlebars', expbhs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//routes  setting
/// main page
// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurantList })
// })

app.get('/', (req, res) => {
  Restaurant.find() // get all data from Restaurant model
    .lean() // change mongoose 's model object to clean JS array
    .then((restaurantsData) => res.render('index', { restaurantsData }))
    .catch((err) => console.log(err))
})

///render show by id
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurant = restaurantList.find(
    (restaurant) => restaurant.id.toString() === restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

//search routes
app.get('/search/', (req, res) => {
  const keyword = req.query.keyword.trim()

  const filterRestaurants = restaurantList.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.includes(keyword)
  )

  //result cant find
  if (filterRestaurants.length === 0) {
    res.render('notFound', { keyword })
  } else {
    res.render('index', { restaurants: filterRestaurants, keyword })
  }
})

app.listen(port, () => {
  console.log(`Listening  on http://localhost:${port}`)
})
