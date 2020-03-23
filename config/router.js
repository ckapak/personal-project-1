const router = require('express').Router()
const gins = require('../controllers/gins')
const users = require('../controllers/auth') 
const secureRoute = require('../lib/secureRoute')

router.route('/gins') 
  .get(gins.index) 
  .post(secureRoute, gins.create) 

router.route('/gins/:id')
  .get(gins.show)
  .put(secureRoute, gins.update) 
  .delete(secureRoute, gins.destroy) 

router.route('/gins/:id/comments')
  .post(secureRoute, gins.commentCreate)

router.route('/gins/:id/comments/:commentId') 
  .delete(secureRoute, gins.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login') 
  .post(users.login) 

router.route('/profile')
  .post(secureRoute, users.profile)

module.exports = router 