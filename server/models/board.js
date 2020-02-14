const mongoose = require("mongoose");

let cardSchema = mongoose.Schema({
    "title": {
        type: String,
        required: false,
        unique: true
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
      unique: true
    },
  
    "colour" : {
      type: String,
      required: false,
      unique: false
    }
  
  })

let userBoardSchema = mongoose.Schema({
    "title": {
        type: String,
        required: false,
        unique: false
    },
    "cards" : [cardSchema]
})


module.exports =  mongoose.model( "boardSchema", userBoardSchema)