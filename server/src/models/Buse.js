const mongoose = require('mongoose')

const buseSchema = new mongoose.Schema({
  "년월": { type: String, require: true, },
  "노선": { type: String, require: true, },
  "구분": { type: String, require: true, },
  "05시": { type: String, require: true, },
  "06시": { type: String, require: true, },
  "07시": { type: String, require: true, },
  "08시": { type: String, require: true, },
  "09시": { type: String, require: true, },
  "10시": { type: String, require: true, },
  "11시": { type: String, require: true, },
  "12시": { type: String, require: true, },
  "13시": { type: String, require: true, },
  "14시": { type: String, require: true, },
  "15시": { type: String, require: true, },
  "16시": { type: String, require: true, },
  "17시": { type: String, require: true, },
  "18시": { type: String, require: true, },
  "19시": { type: String, require: true, },
  "20시": { type: String, require: true, },
  "21시": { type: String, require: true, },
  "22시": { type: String, require: true, },
  "23시": { type: String, require: true, },
  "합계": { type: String, require: true, },
})

const Buse = mongoose.model('Buse', buseSchema, 'buses')
module.exports = Buse