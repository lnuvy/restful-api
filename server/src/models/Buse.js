const mongoose = require('mongoose')

const buseSchema = new mongoose.Schema({
  "년월": { type: String, require: true, },
  "노선": { type: String, require: false, },
  "구분": { type: String, require: false, },
  "05시": { type: String, require: false, },
  "06시": { type: String, require: false, },
  "07시": { type: String, require: false, },
  "08시": { type: String, require: false, },
  "09시": { type: String, require: false, },
  "10시": { type: String, require: false, },
  "11시": { type: String, require: false, },
  "12시": { type: String, require: false, },
  "13시": { type: String, require: false, },
  "14시": { type: String, require: false, },
  "15시": { type: String, require: false, },
  "16시": { type: String, require: false, },
  "17시": { type: String, require: false, },
  "18시": { type: String, require: false, },
  "19시": { type: String, require: false, },
  "20시": { type: String, require: false, },
  "21시": { type: String, require: false, },
  "22시": { type: String, require: false, },
  "23시": { type: String, require: false, },
  "합계": { type: String, require: false, },
}, { versionKey: false }) // mongoose 버전키 필드 비활성화

const Buse = mongoose.model('Buse', buseSchema, 'buses')
module.exports = Buse