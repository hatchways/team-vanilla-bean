const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

const app = express();
let testModel = require("./database");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);


// Example model

// { username: "Bob",
//  new_user: "False",
//  columns: [
//             {col_title: "philo",
//                 cards: ["card1", "card2"]
//         }
//       ]
//     }


//delete table on startup for testing
testModel.deleteMany({}, function(err,removed) {

});


//hardcoded for testing
let msg = new testModel({
  "username": "kulraj",
  "cols": [{"colTitle" : "math", "cards" : ["study"]}]
})
 
msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })

testModel
.find({})
.then(doc => {
  console.log(doc)
})
.catch(err => {
  console.error(err)
})


app.post("/newUserBoard", (req,res) =>{
  // authenticate user
  const username =  req.body.username;
  let userModel = new testModel({
    "username": username,
    "cols": [{"colTitle" : "in progress", "cards" : []},
            {"colTitle" : "completed", "cards" : []} ]
  })
  res.json({ "temp": "temp"})

})


//TODO
app.post("/newColumn", (req,res) =>{
  // authenticate user
  //is username already known at this point?
  const username =  req.body.username;


  let userModel = new testModel({
    "username": username,
    "cols": [{"colTitle" : "in progress", "cards" : []},
            {"colTitle" : "completed", "cards" : []} ]
  })
  res.json({ "temp": "temp"})

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
