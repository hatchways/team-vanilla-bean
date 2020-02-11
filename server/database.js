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

  let colsSchema = new mongoose.Schema({
    "colTitle" : String,
    "cards": Array
})


  let usersSchema = new mongoose.Schema({
    "username": String,
    "cols": [colsSchema]
})

module.exports = mongoose.model( "test", usersSchema)
//module.exports = mongoose.connect;
