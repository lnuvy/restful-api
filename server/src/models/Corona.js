const mongoose = require('mongoose')

const coronaSchema = new mongoose.Schema({
  "기준일": { type: String, required: true, },
  "확진자 수": { type: String, required: true, },
  "사망자 수": { type: String, required: true, },
  "일일 확진자수": { type: String, required: true, },
  "일일 사망자수": { type: String, required: true, },
})

const Corona = mongoose.model('Corona', coronaSchema, 'coronas')
module.exports = Corona