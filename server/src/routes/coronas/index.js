const express = require('express')
const DataRouter = express.Router()
const Corona = require('../../models/Corona')


// /api/coronas 전체조회 or 쿼리스트링 조회
DataRouter.route('/').get(async (req, res) => {

  let coronas = await Corona.find()
  let filtered = null;

  if (req.query.start !== undefined) {
    filtered = coronas.filter((corona) => {
      return req.query.start <= corona.기준일
    })
  }
  if (req.query.end !== undefined) {
    if (filtered !== null) {
      filtered = filtered.filter((corona) => {
        return req.query.end >= corona.기준일
      })
    } else {
      filtered = coronas.filter((corona) => {
        return req.query.end >= corona.기준일
      })
    }

  }
  if (filtered === null) {
    coronas.sort();
    res.json({ status: 200, coronas })
  } else {
    coronas = filtered
    coronas.sort();
    res.json({ status: 200, coronas })
  }
})


// post 유효성 검사후 데이터 추가
DataRouter.route('/').post((req, res) => {

  Corona.findOne({ 기준일: req.body.기준일 }, (err, corona) => {
    if (err) throw err;
    if (!corona) {
      const obj = new Corona(req.body);
      console.log(obj);
      obj.save().then(() => {
        res.json({ status: 201, msg: "new data created in mongoDB...", obj })
      })
    } else {
      const msg = 'That date already exists in mongoDB!!!'
      res.json({ status: 204, msg })
    }
  })
})

// RESTful 기준일로 단일데이터 조회
DataRouter.route('/:day').get((req, res) => {
  Corona.findOne({ 기준일: req.params.day }, (err, corona) => {
    if (err) throw err;

    if (corona === null) {
      const msg = 'There is no data !!!'
      res.json({ status: 204, msg })
    } else {
      res.json({ status: 200, corona })
    }
  })
})

// RESTful put
DataRouter.route('/:day').put((req, res) => {
  Corona.findOneAndUpdate({ 기준일: req.params.day }, req.body, { new: true }, (err, corona) => {
    if (err) throw err;
    res.json({ status: 204, msg: `Corona Data ${req.params.day} updated...`, corona })
  })
})

// RESTful delete
DataRouter.route('/:day').delete((req, res) => {
  Corona.findOneAndDelete(req.params.day, (err, corona) => {
    if (err) throw err;
    res.json({ status: 204, msg: `Corona Data ${req.params.day} removed...`, corona })
  })
})



module.exports = DataRouter