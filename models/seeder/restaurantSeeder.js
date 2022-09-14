const mongoose = require('mongoose')
//model
const Restaurant = require('../restaurant')
// restaurant.json
const restaurantList = require('../../restaurant.json').results

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running restaurantSeeder script...')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch((err) => console.log(err))
})
