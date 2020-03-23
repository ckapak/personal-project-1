const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 100 }
}, {
  timestamps: true
})

const ginSchema = new mongoose.Schema({ //* created a schema for our collection, (blueprint)
  name: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},{
  timestamps: true // * gives us createdAt and updatedAt fields for free
})

// * When the gins create controller is used to attempt to make a new Gin, 
// * the object sent must pass all the validations, or it will be rejected

ginSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Gin', ginSchema) // * registered our schema to a model and exported it