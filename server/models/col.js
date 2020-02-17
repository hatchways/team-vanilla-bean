const mongoose = require("mongoose");
const cardSchema = require("./card")

let userColSchema = mongoose.Schema({
    "title": {
        type: String,
        required: false,
        unique: false
    },
    "cards" : [cardSchema.schema],
              unique: false
})


module.exports =  mongoose.model( "colSchema", userColSchema)