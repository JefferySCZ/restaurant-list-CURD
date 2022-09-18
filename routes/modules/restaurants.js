const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

//write in new restaurant in index
router.get('/new', (req, res) => {
  return res.render('new')
})

// Create a new restaurant
router.post('/', (req, res) => {
  return Restaurant.create(req.body) // take data from req.body
    .then(() => res.redirect('/')) // back to main page after create
    .catch((err) => console.log(err))
})

// get the details of restaurants
router.get('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantsData) => res.render('show', { restaurantsData }))
    .catch((err) => console.log(err))
})

// Edit a restaurant detail
router.get('/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantsData) => res.render('edit', { restaurantsData }))
    .catch((err) => console.log(err))
})

// Update Restaurant details
router.put('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/${restaurantId}`))
    .catch((err) => console.log(err))
})

// Delete Restaurant
router.delete('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
