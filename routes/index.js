const express = require('express')
const router = express.Router()

const restaurants = require('./modules/restaurants')
const home = require('./modules/home')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router