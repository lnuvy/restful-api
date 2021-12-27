var express = require('express') // express 관련 모듈 불러오기
var app = express()
var cors = require('cors') // cors 설정
var logger = require('morgan')
var mongoose = require('mongoose')
require('dotenv').config() // api.env 읽어오기
var routes = require('./src/routes')

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

const URL = process.env.REACT_APP_CLOUD;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("mongoDB connected..."))
  .catch(e => console.log(`failed to connect! ${e}`))

app.use(cors(corsOptions))
app.use(express.json()) // 파싱
app.use(logger('tiny')) // Logger

app.use('/api', routes) // api 라우팅

app.use((req, res, next) => {
  res.status(404).send('<h1>Sorry 404</h1>')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("broken on server")
})

app.listen(5000, () => {
  console.log('server running Test...');
})