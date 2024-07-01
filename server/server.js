const express = require('express')
const cors = require('cors')
const consumer = require('./consumer')
const bodyParser = require('body-parser')

// const fs = require('fs')
// const path = require('path')

// fs.readdir('./transformations', (err, files) => {
//   files.map(file => {
    
//   })
// })

const app = express()
app.use(cors());
app.use(express.static('public'));
// app.use(express.json())
app.use(bodyParser.json())

const port = 3000;

app.get('/', (req, res) => {
  res.send('./public/index.html')
});

app.post('/create_transformation', (req, res) => {
  const body = req.body
  const [sourceTopic, targetTopic] = [body.sourceTopic, body.targetTopic];
  const transformation = require(`../transformations/${body.transformation}`)
  consumer(sourceTopic, targetTopic, transformation);
  res.send(200)
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})