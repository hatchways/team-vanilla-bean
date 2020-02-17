const mongoose = require("mongoose");
const colSchema = require("./col")


let boardsSchema = mongoose.Schema({
  "title": {
      type: String,
      required: true,
      unique: false
  },
  "cols" : 
    [colSchema.schema],
    unique: false
})



module.exports =  mongoose.model( "boardSchema", boardsSchema)