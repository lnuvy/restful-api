const express = require('express')
const router = express.Router()
const buses = require('./buses')
const coronas = require('./coronas')

router.use('/buses', buses)
router.use('/coronas', coronas)

module.exports = router