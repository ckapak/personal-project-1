const jwt = require('jsonwebtoken')  // * to look up a user once the token is decoded
const { secret } = require('../config/environment') // * to help us decode the token, this is the same string it was encoded with
const User = require('../models/user') // * the actual jwt library, we need a method from this to read a token

function secureRoute(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) { // checks if our request has a header of authorization or if it does, does the value of authorizaion begin with the string 'Bearer'. If not we send back 401 error and end the process.
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  const token = req.headers.authorization.replace('Bearer ', '')
  // * Removing the word Bearer from the string to leave us just the token. 
  // * !! THERE IS A SPACE AFTER BEARER !! not including it will make the token invalid

  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if (!user) return res.status(401).json({ message: 'Unauthorized' })
      req.currentUser = user
      next()
    })
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}

module.exports = secureRoute
