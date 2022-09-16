const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

/// main page
router.get('/', (req, res) => {
  Restaurant.find() // get all data from Restaurant model
    .lean() // change mongoose 's model object to clean JS array
    .then((restaurantsData) => res.render('index', { restaurantsData }))
    .catch((err) => console.log(err))
})

//search routes
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  Restaurant.find()
    .lean()
    .then((restaurantsData) => {
      const filterRestaurantsData = restaurantsData.filter((data) =>
        data.name.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurantsData: filterRestaurantsData, keyword })
    })
    .catch((err) => console.log(err))
})

module.exports = router
