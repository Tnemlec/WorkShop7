const express = require('express')
const bodyParser = require('body-parser')
const db = require('mongodb')

const app = express()
const port = 80

const DATABASE_NAME = 'FiguresDB'
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`

const client = new db.MongoClient(MONGO_URL)

let figureDB = null

try{
  client.connect((error, client) => {
    figureDB = client.db('figures')    
  })
}catch(e){
  console.log(e)
}

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit_figure', (req, res) => {
    console.log(req.body)
    res.status(200).json({
      message: 'OK'
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

