const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)


const baseURL='https://api.meaningcloud.com/sentiment-2.1';
const lang="en";
let key=process.env.MEANINGCLOUD_API_KEY;

app.get('/key',function(req,res) {
    let data={
        key:key,
        lang:lang,
        baseURL:baseURL
    }
    console.log(data);
    res.send(data);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
