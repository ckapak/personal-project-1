// * This is custom middleware we have written to log the method and url of incoming requests

function logger(req, res, next) { // * receives the default auguments for express middleware
  console.log(`Incoming ${req.method} to ${req.url}`) // * logs some information about the request
  next()
  // * calls next() so the request object can fall through to the next piece of middleware, 
  // * in our case, the router, see 'index.js' to see why the router is considered 'next'
}

module.exports = logger // * exporting it so we can use it in index.js