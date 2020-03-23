const User = require('../models/user')
const jwt = require('jsonwebtoken')
const  { secret } = require('../config/environment')

function register(req, res) { 
  User
    .create(req.body)
    .then(user => res.status(201).json({ 'message': `Thanks for registering ${user.username}` }))
    .catch(err => res.status(422).json(err))
}

function login(req, res) {
  User
    .findOne({ email: req.body.email }) //* find the user by that email
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' }) 
      res.status(202).json({
        message: `Let the good times beGIN, ${user.username}!`,
        token
      })
    })
    .catch(err => res.status(422).json(err))
    // .catch(err => res.json(err))
}

function profile(req, res) {
  User
    .findById(req.currentUser._id)
    .populate('createdDinosaurs')
    .populate('likedDinosaurs')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(422).json(err))
    // .catch(err => res.json(err))
}

module.exports = { register, login, profile }
