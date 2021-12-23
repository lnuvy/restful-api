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
    res.json({ status: 200, coronas })
  } else {
    coronas = filtered
    res.json({ status: 200, coronas })
  }
})


// post 유효성 검사후 데이터 추가
DataRouter.post('/', (req, res) => {
  console.log(req.body);

  Corona.findOne({ 기준일: req.body.기준일 }, (err, corona) => {
    if (err) throw err;
    if (!corona) {
      const obj = new Corona(req.body);
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
DataRouter.get('/:기준일', (req, res) => {
  console.log("!!!!!!");
  Corona.findOne({ 기준일: req.params.기준일 }, (err, corona) => {
    if (err) throw err;
    res.json({ status: 200, corona })
  })
})

// RESTful put
DataRouter.put('/:기준일', (req, res) => {
  Corona.findByIdAndUpdate(req.params.기준일, req.body, { new: true }, (err, corona) => {
    if (err) throw err;
    res.json({ status: 204, msg: `Corona Data ${req.params.기준일} updated...`, corona })
    console.log(corona);
  })
})

// RESTful delete
DataRouter.delete('/:기준일', (req, res) => {
  Corona.findByIdAndDelete(req.params.기준일, req.body, (err, corona) => {
    if (err) throw err;
    res.json({ status: 204, msg: `Corona Data ${req.params.기준일} removed...`, corona })
  })
})



module.exports = DataRouter