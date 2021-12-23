const express = require('express')
const DataRouter = express.Router()
const Buse = require('../../models/Buse')

DataRouter.route('/').get(async (req, res) => {
  let buses = await Buse.find()
  let filtered = null;

  if (req.query.select !== undefined) {
    filtered = buses.filter((bus) => {
      return req.query.select === bus.년월
    })
  }
  if (filtered === null) {
    res.json({ status: 200, buses })
  } else {
    buses = filtered
    res.json({ status: 200, buses })
  }
})



module.exports = DataRouter