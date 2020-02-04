const express = require('express') // * importing the express package 
const mongoose = require('mongoose') // * our ORM (middle person) to talk to mongo db for us
const bodyParser = require('body-parser') // * importing the body parser package

const app = express() // * building our express server

const { port, dbURI } = require('./config/environment') // * importing some of our environment variables we need here, these are defined and exported from './config/environment.js'
const logger = require('./lib/logger') // * importing our logger middleware function, defined and exported from './lib/logger.js'
const router = require('./config/router') // * importing our custom router set up, created and exported from './config/router.js'

// * use mongoose to make the connection to the Mongo Database, 
// * it connects using the dbURI address importing from the environment file, 
// * we pass it some options and a callback function that will display any potential error if the connection fails, and a message to let us know it has connected if all goes well
// * what are some issues that could occur here? 
// * 1) ensure Mongo is turned on using the `mongod` command in terminal, 
// * 2) if it is running, check your dbURI connection string for any errors
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json()) // registering body parser as the first peice of middleware, creating `req.body` on any reguest containing data sent in the body, (POST AND PUT REQUESTS), next is called automatically from here

app.use(logger) // next up is the logger middleware, check this out in './lib/logger', is simply console.logs the incoming request method and url, then calls next()

// Remember, calling next() from middleware allows the request to fall through to the next piece of middleware, so in our case here, bodyParser calls next itself to allow the request to fall through to the logger, then in the logger, we call next() to allow the request to fall through to the router.

app.use('/api', router) // Our last piece of middleware, the router, this is where the request will fall through into our custom router, the HTTP verb method and request url will be matched inside the router, and relay that request to its appropriate controller, see more in './config/router.js'

app.use('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(port, () => console.log(`Express is up and running on ${port}`)) // Our call to app.listen to start the process.