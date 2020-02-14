const mongoose = require("mongoose");


let cardSchema = mongoose.Schema({
  "title": {
      type: String,
      required: false,
      unique: false
  },
  "description" : {
    type: String,
    required: false,
    unique: false
  },
  "date" : {
    type: String,
    required: false,
    unique: false
  },

  "comment" : {
    type: String,
    required: false,
    unique: false
  },

  "colour" : {
    type: String,
    required: false,
    unique: false
  }

})

module.exports =  mongoose.model( "cardSchema", cardSchema)