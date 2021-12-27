const mongoose = require('mongoose')

const coronaSchema = new mongoose.Schema({
  "기준일": { type: String, required: true, },
  "확진자 수": { type: String, required: true, },
  "사망자 수": { type: String, required: true, },
  "일일 확진자수": { type: String, required: true, },
  "일일 사망자수": { type: String, required: true, },
}, { versionKey: false }) // mongoose 버전키 필드 비활성화

const Corona = mongoose.model('Corona', coronaSchema, 'coronas')
module.exports = Corona