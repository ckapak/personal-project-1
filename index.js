const express = require('express') // * importing the express package 
const mongoose = require('mongoose') // * our ORM (middle person) to talk to mongo db for us
const bodyParser = require('body-parser') // * importing the body parser package

const app = express() // * building our express server

const { port, dbURI } = require('./config/environment') // * importing some of our environment variables we need here, these are defined and exported from './config/environment.js'
const logger = require('./lib/logger') // * importing our logger middleware function, defined and exported from './lib/logger.js'
const router = require('./config/router') // * importing our custom router set up, created and exported from './config/router.js'
const errorHandler = require('./lib/errorHandler')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json()) // registering body parser as the first peice of middleware, creating `req.body` on any reguest containing data sent in the body, (POST AND PUT REQUESTS), next is called automatically from here

app.use(logger) // next up is the logger middleware, check this out in './lib/logger', is simply console.logs the incoming request method and url, then calls next()

app.use('/api', router) // Our last piece of middleware, the router, this is where the request will fall through into our custom router, the HTTP verb method and request url will be matched inside the router, and relay that request to its appropriate controller, see more in './config/router.js'

app.use(errorHandler)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(port, () => console.log(`Express is up and running on ${port}`)) // Our call to app.listen to start the process.