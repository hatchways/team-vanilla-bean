const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

const app = express();
let simpleModel = require("./database");
//const simpleModel = require("../models/boardSchema")

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);


//delete table on startup for testing
// simpleModel.deleteMany({}, function(err,removed) {

// });

app.get("/allBoards", async (req,res) =>{
  // authenticate user
  try {
    var lookupUsername = req.query.username
    const boards = await simpleModel.find({username : lookupUsername});
    res.json(boards)
  } catch (err){
    res.json({message: err})
  }
});



app.post("/createBoard", (req,res) =>{
  simpleModel.findOneAndUpdate({username: req.body.username},

    {$push: {boards: {title: req.body.newBoardName, cards: []}}},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        res.json({ "temp": "temp"})
        }
    }
  );
});


app.delete("/deleteBoard", (req,res) =>{

  db.temp.update(
    { username: req.body.username },
    {$pull : {"boards" : {"name": req.body.boardName}}},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        res.json({ "temp": "temp"})
        }
    }
  );
});





app.post("/createCard", (req,res) =>{
  simpleModel.update(
    { username: req.body.username, "boards.title": req.body.boardName},
    { "$push": 
        {"boards.$.cards": 
            {
                "name": req.body.newCardName
            }
        }
    },     
    function(err, doc) {
      if(err){
      console.log(err);
      }else{
      //do stuff
      res.json({ "temp": "temp"})
      }
  }
)
});


app.delete("/deleteCard", (req,res) =>{
  simpleModel.update(
    { username: req.body.username, "boards.title": req.body.boardName},
    { "$pull": 
        {"boards.$.cards": 
            {
                "name": req.body.newCardName
            }
        }
    },     
    function(err, doc) {
      if(err){
      console.log(err);
      }else{
      //do stuff
      res.json({ "temp": "temp"})
      }
  }
)
});



app.post("/initialUserBoard", async (req,res) =>{
  // authenticate user

  //ADD try catch for unique handler
  const newBoard = new simpleModel({
        username: req.body.username,
        boards: [{title: "in progress", cards: []},
              {title: "completed", cards: []}]
  })
  newBoard.save()
  res.json({ "temp": "temp"})
});




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
