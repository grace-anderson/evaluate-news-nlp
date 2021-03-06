const dotenv = require('dotenv');
const express = require('express')
const bodyParser = require("body-parser");
const axios = require('axios')

dotenv.config();

const router = express.Router();

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})

app.post('/summarization', async (req, res) => {
  const API = "http://api.meaningcloud.com/summarization-1.0?key="
  const API_KEY = process.env.API_KEY
  const text = req.body.text
  const number = req.body.number
  const url = req.body.url
  const params = text ? `&txt=${text}&sentences=${number}` : `&url=${url}&sentences=${number}`
  const response = await axios.post(encodeURI(API + API_KEY + params), {})

  try {
    const result = JSON.stringify(response.data.summary)
    res.send(result)
  }
  catch (error) {
    console.log('error', error)
  }

})



/* const dotenv = require('dotenv');
dotenv.config();

console.log('Your API key is ${process.env.API_KEY}');

// API credentials
var textapi = new meaningCloud({
    application_key: process.env.API_KEY
 });

 console.log('Your API key is ${process.env.API_KEY}');

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
}) */
