const Gin = require('../models/gin')

function index(req, res) { 
  Gin 
    .find() // * using the mongoose method .find() on the model, with no arguments this will return all the gins
    .populate('user')
    .then(foundGins => res.status(200).json(foundGins))
    .catch(err => res.json(err)) // * if it fails, console logging the error for now
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Gin 
    .create(req.body) // * using the .create() method, as we're making new gin, this will validate the incoming req.body to make sure it fits the schema for the model, thats the blueprint for how a gin should look defined in './models/gin.js'
    .then(createdGin => res.status(201).json(createdGin)) // * then, if it succesfully finds it, we send them all back in the response as json
    .catch(next) 
}

function show(req, res, next) {
  Gin 
    .findById(req.params.id) // using a method to find a single gin by its mongo id, this will return a single object, not in an array
    .populate('user')
    .then(gin => {
      if (!gin) throw new Error('Not found')
      res.status(200).json(gin)
    })
    .catch(next)
}

function update(req, res, next) {
  Gin
    .findById(req.params.id)
    .then(gin => {
      if (!gin) throw new Error('Not Found')
      if (!gin.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(gin, req.body) 
      return gin.save()  
    })
    .then(updatedGin => res.status(202).json(updatedGin)) 
    .catch(next)
}

function destroy(req, res) {
  Gin
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.json(err))
}

// * POST /gins/:id/comments
function commentCreate(req, res) {
  Gin
    .findById(req.params.id)
    .then(gin => {
      if (!gin) return res.status(404).json({ message: 'Not found ' })
      gin.comments.push(req.body) 
      return gin.save()
    })
    .then(gin => res.status(201).json(gin))
    .catch(err => res.json(err))
}

// * DELETE /gins/:id/comments/:commentId
function commentDelete(req, res) {
  Gin
    .findById(req.params.id)
    .then(gin => {
      if (!gin) return res.status(404).json({ message: 'Not found' })
      const comment = gin.comments.id(req.params.commentId)
      if (!comment) return res.status(404).json({ message: 'Not found' })
      comment.remove()
      return gin.save()
    }) 
    .then(gin => res.status(202).json(gin))
    .catch(err => res.json(err))

}

module.exports = { index, create, show, update, destroy, commentCreate, commentDelete }