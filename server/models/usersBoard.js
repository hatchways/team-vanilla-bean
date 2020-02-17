const mongoose = require("mongoose");
const boardSchema = require("./board")

let userBoardSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true,
        unique: false
    },
    "boards" : 
      [boardSchema.schema],
      unique: false
  })
  
module.exports =  mongoose.model( "userBoardSchema", userBoardSchema)