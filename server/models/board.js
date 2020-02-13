const mongoose = require("mongoose");




// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })


let boardSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true
    },
    "cols" : {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model( "boardSchema", boardSchema)