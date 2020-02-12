const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

  let boardSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "boards" : {
      type: Array,
      required: true,
      unique: true
  }
})


module.exports = mongoose.model( "boardSchema", boardSchema)