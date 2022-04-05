'use strict'

/* Dependencies */
const express = require('express')
const app = express()
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const ejs = require('ejs')

/* Configure our client */
const client = {
  settings: require('./settings/settings.json'),
  appid: process.env.APPID || 1,
  server: require('http').createServer(app)
}

/* middleware */
app.use(helmet())
app.use(morgan('common'))
app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public'))) // Serve our static files
app.use(bodyParser.json())

/* Socketio Imports */

client.io = require('socket.io')(client.server)

// require('./engine/MongoAdapter.js')(client) //Uncomment this and comment out redis if you want to use the mongodb adapter
require('./engine/RedisAdapter.js')(client)

require('./engine/sockets.js')(client)

/* Routing */
app.use('/', require('./routes/index.js')(client))

app.get('*', (req, res) => {
  res.status(404).send('Endpoint does not exist.')
})

/* Listen on http */
const port = (process.env.PORT || client.settings.defaultPort)

client.server.listen(port, () => {
  console.log(`Instance :: ${client.appid} :: port :: ${port}!`)
})
