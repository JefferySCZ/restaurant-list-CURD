const db = require('../../config/mongoose') // 載入 mongoose

//model
const Restaurant = require('../restaurant')

const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  // database start to create seeder
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
    })
    .catch((err) => console.log(err))
})
