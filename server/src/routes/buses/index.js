const express = require('express')
const DataRouter = express.Router()
const Buse = require('../../models/Buse')

// /api/buses 전체조회 or 쿼리스트링(select) 조회
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

// post "년월" 과 "노선" 중복이 없을 시 데이터 추가
DataRouter.route('/').post((req, res) => {
  Buse.findOne({ 년월: req.body.년월, 노선: req.body.노선 }, (err, bus) => {
    console.log(bus);
    if (err) throw err;

    if (!bus) {
      const obj = new Buse(req.body);
      console.log(obj);
      obj.save().then(() => {
        res.json({ status: 201, msg: "new data created in mongoDB...", obj })
      })
    } else {
      const msg = `This month already exists in mongoDB!!!`
      res.json({ status: 204, msg })
    }
  })
})

// Restful get
DataRouter.route('/:day').get((req, res) => {
  Buse.find({ 년월: req.params.day }, (err, bus) => {
    if (err) throw err;

    if (bus.length === 0) {
      const msg = 'There is no data !!!'
      res.json({ status: 204, msg })
    } else {
      res.json({ status: 200, bus })
    }
  })
})

//Restful put
DataRouter.route('/:day').put((req, res) => {
  Buse.findOneAndUpdate({ 년월: req.params.day }, req.body, { new: true }, (err, bus) => {
    if (err) throw err;
    res.json({ status: 204, msg: `Bus Data ${req.params.day} updated...`, bus })
  })
})

// RESTful delete
DataRouter.route('/:day/:route').delete((req, res) => {
  console.log(req.params.day, req.params.route, '!!!');
  Buse.findOneAndDelete({ 년월: req.params.day, 노선: req.params.route }, (err, bus) => {
    console.log(bus);
    if (err) throw err;
    res.json({ status: 204, msg: `Bus Data ${req.params.day} removed...` })
  })
})

module.exports = DataRouter